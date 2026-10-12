import assert from 'node:assert/strict';
import { chromium } from './seo-runtime/node_modules/playwright/index.mjs';

const base = process.env.SEO_TEST_URL || 'http://127.0.0.1:3100';
const origin = 'https://www.nexovate.com.ar';
const pairs = [
  ['software-a-medida', 'custom-software'],
  ['automatizacion-de-procesos', 'process-automation'],
  ['trazabilidad', 'traceability'],
  ['integracion-de-sistemas', 'system-integration'],
];
const path = (locale, pair) => `/${locale}/${locale === 'es' ? 'servicios' : 'services'}/${pair[locale === 'es' ? 0 : 1]}`;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const titles = new Set();
  const descriptions = new Set();
  const expectedUrls = new Set([`${origin}/es`, `${origin}/en`]);
  for (const pair of pairs) for (const locale of ['es', 'en']) {
    const route = path(locale, pair);
    const url = origin + route;
    expectedUrls.add(url);
    const page = await noJs.newPage();
    assert.equal((await page.goto(base + route, { waitUntil: 'domcontentloaded' })).status(), 200);
    const data = await page.evaluate(() => ({
      title: document.title, h1: [...document.querySelectorAll('h1')].map((el) => el.textContent),
      description: document.querySelector('meta[name="description"]').content,
      canonical: document.querySelector('link[rel="canonical"]').href,
      alternates: Object.fromEntries([...document.querySelectorAll('link[hreflang]')].map((el) => [el.hreflang, el.href])),
      og: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map((el) => [el.getAttribute('property'), el.content])),
      twitter: Object.fromEntries([...document.querySelectorAll('meta[name^="twitter:"]')].map((el) => [el.name, el.content])),
      graph: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'],
      links: [...document.querySelectorAll('a')].map((el) => el.getAttribute('href')),
    }));
    assert.equal(data.h1.length, 1); assert.ok(data.h1[0]);
    titles.add(data.title); descriptions.add(data.description);
    assert.equal(data.canonical, url);
    assert.deepEqual(data.alternates, { es: origin + path('es', pair), en: origin + path('en', pair), 'x-default': origin + path('es', pair) });
    assert.equal(data.og['og:url'], url); assert.equal(data.og['og:title'], data.title);
    assert.equal(data.og['og:description'], data.description); assert.equal(data.twitter['twitter:title'], data.title);
    assert.equal(data.twitter['twitter:description'], data.description); assert.match(data.og['og:image'], /nexovate-logo\.png$/);
    assert.deepEqual(data.graph.map((node) => node['@type']), ['Organization', 'WebSite', 'WebPage', 'Service', 'BreadcrumbList']);
    const [org, site, webpage, service, breadcrumb] = data.graph;
    assert.equal(new Set(data.graph.map((node) => node['@id'])).size, 5);
    assert.equal(org['@id'], origin + '/#organization'); assert.equal(site['@id'], origin + '/#website');
    assert.equal(webpage['@id'], url + '#webpage'); assert.equal(webpage.url, url); assert.equal(webpage.inLanguage, locale);
    assert.deepEqual(webpage.about, { '@id': url + '#service' }); assert.deepEqual(webpage.breadcrumb, { '@id': url + '#breadcrumb' });
    assert.equal(service.url, url); assert.equal(service.name, data.h1[0]); assert.equal(service.description, data.description);
    assert.deepEqual(service.provider, { '@id': org['@id'] });
    assert.deepEqual(breadcrumb.itemListElement.map((item) => item.item), [origin + '/' + locale, url]);
    for (const field of ['sameAs', 'email', 'address', 'aggregateRating', 'offers', 'review']) assert.ok(!JSON.stringify(data.graph).includes(`"${field}"`));
    for (const otherPair of pairs) assert.ok(data.links.includes(path(locale, otherPair)));
    for (const section of ['hero', 'solutions', 'about', 'process', 'contact']) assert.ok(data.links.includes(`/${locale}#${section}`));
    results.push({ route, noJs: true, canonical: url, graphNodes: 5 });
    await page.close();
  }
  assert.equal(titles.size, 8); assert.equal(descriptions.size, 8);
  for (const locale of ['es', 'en']) {
    const home = await noJs.newPage(); await home.goto(`${base}/${locale}`);
    for (const pair of pairs) assert.equal(await home.locator(`a[href="${path(locale, pair)}"]`).count(), 2);
    await home.close();
  }
  const xml = await (await noJs.request.get(base + '/sitemap.xml')).text();
  const sitemapUrls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(sitemapUrls.length, 10); assert.deepEqual(new Set(sitemapUrls), expectedUrls);
  for (const pair of pairs) for (const locale of ['es', 'en']) {
    const entry = xml.split('<url>').find((chunk) => chunk.includes(`<loc>${origin + path(locale, pair)}</loc>`));
    for (const language of ['es', 'en']) assert.ok(entry.includes(`hreflang="${language}" href="${origin + path(language, pair)}"`));
  }
  const invalid = ['/es/services/custom-software', '/en/servicios/software-a-medida', '/es/servicios/custom-software', '/en/services/software-a-medida', '/es/servicios/unknown', '/en/services/unknown', '/es/servicios/software-a-medida.extra', '/en/services/custom-software.extra', '/es/servicios', '/en/services', '/es/servicios/software-a-medida/extra'];
  for (const route of invalid) assert.equal((await noJs.request.get(base + route)).status(), 404, route);
  const interactive = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await interactive.route('https://**/*', (route) => route.abort());
  for (const locale of ['es', 'en']) {
    const route = path(locale, pairs[0]); const other = locale === 'es' ? 'en' : 'es';
    await interactive.setViewportSize({ width: 1280, height: 900 });
    await interactive.goto(base + route, { waitUntil: 'networkidle' });
    const selector = interactive.locator(`header a[hreflang="${other}"]`);
    assert.equal(await selector.getAttribute('href'), path(other, pairs[0]));
    await selector.focus(); await interactive.keyboard.press('Enter');
    await interactive.waitForURL(base + path(other, pairs[0]));
    await interactive.goto(base + route, { waitUntil: 'networkidle' });
    await interactive.locator(`header nav a[href="/${locale}#process"]`).click();
    await interactive.waitForURL(`${base}/${locale}#process`); assert.equal(await interactive.locator('#process').count(), 1);
    for (const width of [320, 360, 390, 768, 1280]) {
      await interactive.setViewportSize({ width, height: 900 });
      for (const location of [route, `/${locale}`]) {
        await interactive.goto(base + location, { waitUntil: 'networkidle' });
        assert.ok(await interactive.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${location} overflow ${width}`);
        const logo = await interactive.locator('header img').boundingBox(); assert.ok(logo.width > 0);
      }
    }
    await interactive.setViewportSize({ width: 390, height: 844 });
    for (const target of ['process', 'contact']) {
      await interactive.goto(base + route, { waitUntil: 'networkidle' });
      const trigger = interactive.locator('header button'); await trigger.focus(); await interactive.keyboard.press('Enter');
      const dialog = interactive.locator('#mobile-menu'); await dialog.waitFor({ state: 'visible' });
      const link = dialog.locator(`a[href="/${locale}#${target}"]`); await link.focus(); await interactive.keyboard.press('Enter');
      await interactive.waitForURL(`${base}/${locale}#${target}`);
      assert.equal(await interactive.locator('#' + target).count(), 1);
      await interactive.locator('#mobile-menu').waitFor({ state: 'hidden' });
      assert.notEqual(await interactive.locator('body').evaluate((body) => body.style.overflow), 'hidden');
    }
    await interactive.goto(base + route, { waitUntil: 'networkidle' });
    await interactive.locator('header button').click(); await interactive.locator('#mobile-menu').waitFor({ state: 'visible' });
    await interactive.locator(`#mobile-menu a[hreflang="${other}"]`).click();
    await interactive.waitForURL(base + path(other, pairs[0]));
    await interactive.goto(base + route, { waitUntil: 'networkidle' });
    const contact = interactive.locator(`main > a[href="/${locale}#contact"]`); await contact.focus(); await interactive.keyboard.press('Enter');
    await interactive.waitForURL(`${base}/${locale}#contact`);
    results.push({ locale, desktopMobileLocaleNavigation: true, keyboardHomeNavigation: true, cta: true, widths: [320, 360, 390, 768, 1280] });
  }
  console.log(JSON.stringify({ base, results, sitemapUrls: 10, invalid404: invalid.length, uniqueTitlesDescriptions: 8 }, null, 2));
} finally { await browser.close(); }
