import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from './seo-runtime/node_modules/playwright/index.mjs';

const base = process.env.SEO_TEST_URL || 'http://127.0.0.1:3100';
const entries = [
  ['customSoftware', 'software-a-medida', 'custom-software'],
  ['automation', 'automatizacion-de-procesos', 'process-automation'],
  ['traceability', 'trazabilidad', 'traceability'],
  ['dataIntegration', 'integracion-de-sistemas', 'system-integration'],
];
const sections = ['problem', 'solution', 'example', 'scope', 'preparation'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const titles = new Set(); const descriptions = new Set(); const bodies = new Set();
  for (const locale of ['es', 'en']) {
    const messages = JSON.parse(readFileSync(new URL(`../messages/${locale}/index.json`, import.meta.url), 'utf8'));
    for (const [id, es, en] of entries) {
      const route = `/${locale}/${locale === 'es' ? 'servicios/' + es : 'services/' + en}`;
      const copy = messages.servicePages.services[id];
      const page = await context.newPage();
      assert.equal((await page.goto(base + route, { waitUntil: 'domcontentloaded' })).status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('h1').textContent(), messages.solutions.features[id].title);
      const metadata = await page.evaluate(() => ({
        title: document.title, description: document.querySelector('meta[name="description"]').content,
        og: document.querySelector('meta[property="og:description"]').content,
        twitter: document.querySelector('meta[name="twitter:description"]').content,
        graph: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'],
      }));
      assert.equal(metadata.title, messages.solutions.features[id].seoTitle);
      for (const description of [metadata.description, metadata.og, metadata.twitter]) assert.equal(description, copy.intro);
      assert.equal(await page.locator('main > p').textContent(), copy.intro);
      for (const node of metadata.graph.filter((node) => ['WebPage', 'Service'].includes(node['@type']))) assert.equal(node.description, copy.intro);
      titles.add(metadata.title); descriptions.add(copy.intro);
      assert.equal(await page.locator('main section[aria-labelledby^="service-"]').count(), 5);
      for (const section of sections) {
        const region = page.locator(`section[aria-labelledby="service-${section}"]`);
        assert.equal(await region.locator('h2').textContent(), copy[section].heading);
        assert.equal(await region.locator('p').first().textContent(), copy[section].body);
        assert.ok(await region.locator('h2').isVisible()); bodies.add(copy[section].body);
      }
      assert.match(copy.example.heading, locale === 'es' ? /Ejemplo ilustrativo/ : /Illustrative example/);
      assert.equal(await page.locator('[aria-labelledby="service-example"] p').last().textContent(), messages.servicePages.exampleNote);
      assert.equal(await page.locator(`main > a[href="/${locale}#contact"]`).textContent(), messages.servicePages.contact);
      assert.equal(await page.locator('#related-services + ul a').count(), 3);
      await page.evaluate(() => document.fonts.ready);
      for (const width of [320, 360, 390, 768, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} overflow at ${width}`);
      }
      results.push({ route, sections: 5, serverContentReadback: true, descriptionLength: copy.intro.length, widths: [320, 360, 390, 768, 1280] });
      await page.close();
    }
  }
  assert.equal(titles.size, 8); assert.equal(descriptions.size, 8); assert.equal(bodies.size, 40);
  console.log(JSON.stringify({ base, results, uniqueSectionBodies: bodies.size, illustrativeExamples: 8 }, null, 2));
} finally { await browser.close(); }
