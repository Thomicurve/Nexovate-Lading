import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from './seo-runtime/node_modules/playwright/index.mjs';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const componentModule = { exports: {} };
const source = readFileSync(new URL('../components/structured-data.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
new Function('require', 'module', 'exports', compiled)(require, componentModule, componentModule.exports);
const payload = { text: '</script><script>alert("injection")</script><!-- <tag>' };
const serialized = componentModule.exports.serializeJsonLd(payload);
assert.ok(!serialized.includes('<'));
assert.deepEqual(JSON.parse(serialized), payload);
const rendered = require('react-dom/server').renderToStaticMarkup(require('react').createElement(componentModule.exports.default, { data: payload }));
assert.equal((rendered.match(/<script/g) || []).length, 1);
assert.equal((rendered.match(/<\/script>/g) || []).length, 1);

const base = process.env.SEO_TEST_URL || 'http://127.0.0.1:3100';
const origin = 'https://www.nexovate.com.ar';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const assets = new Set();
try {
  const serverContext = await browser.newContext({ javaScriptEnabled: false });
  const titles = new Set();
  const descriptions = new Set();
  for (const locale of ['es', 'en']) {
    const page = await serverContext.newPage();
    const response = await page.goto(`${base}/${locale}`, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200);
    const metadata = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]').content,
      scripts: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent)),
      assets: [document.querySelector('meta[property="og:image"]').content, ...[...document.querySelectorAll('link[rel="icon"]')].map((icon) => icon.getAttribute('href'))],
    }));
    titles.add(metadata.title); descriptions.add(metadata.description);
    assert.match(metadata.description, /Argentina/);
    assert.equal(metadata.scripts.length, 1);
    const graph = metadata.scripts[0];
    assert.equal(graph['@context'], 'https://schema.org');
    assert.equal(graph['@graph'].length, 3);
    const [organization, website, webpage] = graph['@graph'];
    assert.deepEqual(organization, { '@type': 'Organization', '@id': `${origin}/#organization`, name: 'Nexovate', url: `${origin}/`, logo: `${origin}/images/brand/nexovate-logo.png` });
    assert.equal(website['@type'], 'WebSite'); assert.equal(website['@id'], `${origin}/#website`);
    assert.deepEqual(website.publisher, { '@id': organization['@id'] });
    assert.deepEqual(website.inLanguage, ['es', 'en']);
    assert.equal(webpage['@type'], 'WebPage'); assert.equal(webpage['@id'], `${origin}/${locale}#webpage`);
    assert.equal(webpage.url, `${origin}/${locale}`); assert.equal(webpage.inLanguage, locale);
    assert.equal(webpage.name, metadata.title); assert.equal(webpage.description, metadata.description);
    assert.deepEqual(webpage.isPartOf, { '@id': website['@id'] }); assert.deepEqual(webpage.about, { '@id': organization['@id'] });
    assert.equal(new Set(graph['@graph'].map((node) => node['@id'])).size, 3);
    for (const field of ['sameAs', 'address', 'email', 'aggregateRating', 'review']) assert.ok(!JSON.stringify(graph).includes(`"${field}"`));
    metadata.assets.forEach((asset) => assets.add(new URL(asset, origin).href));
    results.push({ locale, serverJsonLd: true, ids: graph['@graph'].map((node) => node['@id']) });
    await page.close();

    const interactive = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await interactive.route('https://**/*', (route) => route.abort());
    await interactive.goto(`${base}/${locale}`, { waitUntil: 'domcontentloaded' });
    const label = locale === 'es' ? 'Proceso: Ver cómo trabajamos' : 'Process: See how we work';
    const processLink = interactive.getByRole('link', { name: label, exact: true });
    assert.ok(await processLink.isVisible());
    await interactive.keyboard.press('Tab');
    assert.ok(await interactive.locator('.skip-to-content').evaluate((link) => link === document.activeElement));
    await interactive.keyboard.press('Enter');
    assert.ok(await interactive.locator('#main-content').evaluate((main) => main === document.activeElement));
    await interactive.setViewportSize({ width: 390, height: 844 });
    const trigger = interactive.getByRole('button', { name: locale === 'es' ? 'Abrir menú' : 'Open menu', exact: true });
    await trigger.focus(); await interactive.keyboard.press('Enter');
    const dialog = interactive.locator('#mobile-menu');
    await dialog.waitFor({ state: 'visible' });
    assert.ok(await dialog.evaluate((element) => element.contains(document.activeElement)));
    const last = dialog.locator('a').last(); await last.focus(); await interactive.keyboard.press('Tab');
    assert.ok(await dialog.locator('button').evaluate((button) => button === document.activeElement));
    await interactive.keyboard.press('Escape'); await dialog.waitFor({ state: 'hidden' });
    assert.ok(await trigger.evaluate((button) => button === document.activeElement));
    await interactive.keyboard.press('Enter'); await dialog.waitFor({ state: 'visible' });
    const mobileProcess = dialog.getByRole('link', { name: label, exact: true });
    assert.equal((await mobileProcess.textContent()).trim(), locale === 'es' ? 'Proceso' : 'Process');
    await mobileProcess.focus(); await interactive.keyboard.press('Enter'); await dialog.waitFor({ state: 'hidden' });
    assert.ok(await interactive.locator('#process').evaluate((section) => section === document.activeElement));
    results.push({ locale, desktopMobileLabels: true, skipLink: true, keyboardMenuFocusNavigation: true });
    await interactive.close();
  }
  assert.equal(titles.size, 2); assert.equal(descriptions.size, 2);
  for (const asset of assets) {
    assert.equal(new URL(asset).origin, origin);
    const response = await fetch(asset, { method: 'HEAD' });
    assert.equal(response.status, 200);
    results.push({ asset, status: response.status, type: response.headers.get('content-type') });
  }
  console.log(JSON.stringify({ base, escapeInjection: true, results }, null, 2));
} finally { await browser.close(); }
