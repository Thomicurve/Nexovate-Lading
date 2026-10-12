import assert from 'node:assert/strict';
import { chromium } from './seo-runtime/node_modules/playwright/index.mjs';

const base = process.env.SEO_TEST_URL || 'http://127.0.0.1:3100';
const origin = 'https://www.nexovate.com.ar';
const pairs = [
  ['/es', '/en'],
  ['/es/servicios/software-a-medida', '/en/services/custom-software'],
  ['/es/servicios/automatizacion-de-procesos', '/en/services/process-automation'],
  ['/es/servicios/trazabilidad', '/en/services/traceability'],
  ['/es/servicios/integracion-de-sistemas', '/en/services/system-integration'],
];
const pages = new Map(); const titles = new Set(); const descriptions = new Set();
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext({ javaScriptEnabled: false });
  for (const pair of pairs) for (const route of pair) {
    const locale = route.split('/')[1];
    const page = await context.newPage();
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200); assert.equal((await response.allHeaders()).link, undefined);
    const data = await page.evaluate(() => ({
      lang: document.documentElement.lang, title: document.title,
      description: document.querySelector('meta[name="description"]').content,
      canonical: document.querySelector('link[rel="canonical"]').href,
      alternates: Object.fromEntries([...document.querySelectorAll('link[hreflang]')].map((el) => [el.hreflang, el.href])),
      h1: document.querySelectorAll('h1').length,
      ids: [...document.querySelectorAll('[id]')].map((el) => el.id),
      links: [...document.querySelectorAll('a[href]')].map((el) => el.getAttribute('href')),
      graph: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'],
    }));
    assert.equal(data.lang, locale); assert.equal(data.h1, 1); assert.equal(data.canonical, origin + route);
    assert.deepEqual(data.alternates, { es: origin + pair[0], en: origin + pair[1], 'x-default': origin + pair[0] });
    assert.ok(data.links.includes(pair[locale === 'es' ? 1 : 0]));
    assert.equal(new Set(data.graph.map((node) => node['@id'])).size, data.graph.length);
    const webpage = data.graph.find((node) => node['@type'] === 'WebPage');
    assert.equal(webpage.url, data.canonical); assert.equal(webpage.name, data.title); assert.equal(webpage.description, data.description);
    assert.equal(webpage.inLanguage, locale); assert.equal(webpage['@id'], data.canonical + '#webpage');
    assert.ok(!JSON.stringify(data.graph).includes('nexovate.net'));
    titles.add(data.title); descriptions.add(data.description); pages.set(route, data);
    await page.close();
  }
  assert.equal(titles.size, 10); assert.equal(descriptions.size, 10);
  let internalLinks = 0; let fragments = 0;
  for (const [route, data] of pages) for (const href of data.links) {
    const destination = new URL(href, origin + route);
    if (destination.origin !== origin) continue;
    const target = pages.get(destination.pathname);
    assert.ok(target, `${route}: unknown internal destination ${href}`); internalLinks++;
    if (destination.hash) {
      assert.ok(target.ids.includes(decodeURIComponent(destination.hash.slice(1))), `${route}: missing fragment ${href}`); fragments++;
    }
  }
  const xml = await (await context.request.get(base + '/sitemap.xml')).text();
  assert.deepEqual(new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])), new Set([...pages.keys()].map((route) => origin + route)));
  for (const [route, data] of pages) {
    const entry = xml.split('<url>').find((entry) => entry.includes(`<loc>${origin + route}</loc>`));
    for (const [language, url] of Object.entries(data.alternates)) assert.ok(entry.includes(`hreflang="${language}" href="${url}"`));
  }
  // Follow up the audit's aborted RSC fetches without masking the original evidence.
  const rscProbes = [];
  for (const route of ['/es?_rsc=acfth', '/es?_rsc=n91o1', '/es?_rsc=35xwm', '/en?_rsc=momlv', '/en?_rsc=8ni9d']) {
    const response = await context.request.get(base + route, { headers: { RSC: '1' } });
    assert.equal(response.status(), 200); assert.match(response.headers()['content-type'], /text\/x-component/);
    rscProbes.push({ route, status: response.status() });
  }
  const liveFailures = []; const httpErrors = [];
  for (const pair of pairs.slice(1)) for (const route of pair) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('requestfailed', (request) => liveFailures.push({ page: route, url: request.url(), error: request.failure().errorText }));
    page.on('response', (response) => { if (response.status() >= 400) httpErrors.push({ page: route, url: response.url(), status: response.status() }); });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const locale = route.split('/')[1];
    await page.locator(`header a[href="/${locale}#hero"]`).click();
    await page.waitForURL(`${base}/${locale}#hero`); await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#hero h1').count(), 1);
    page.removeAllListeners('requestfailed'); page.removeAllListeners('response'); await page.close();
  }
  assert.ok(httpErrors.every((error) => new URL(error.url).pathname === '/_vercel/insights/script.js' && error.status === 404));
  console.log(JSON.stringify({ base, routes: [...pages.keys()], serverHtml: true, uniqueTitlesDescriptions: 10, internalLinks, validFragments: fragments, sitemapUrls: 10, rscProbes, hydratedServiceToHome: 8, liveFailures, httpErrors }, null, 2));
} finally { await browser.close(); }
