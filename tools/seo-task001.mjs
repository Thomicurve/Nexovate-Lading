import assert from 'node:assert/strict';
import { chromium } from './seo-runtime/node_modules/playwright/index.mjs';

const base = process.env.SEO_TEST_URL || 'http://127.0.0.1:3100';
const origin = 'https://www.nexovate.com.ar';
const alternates = { es: `${origin}/es`, en: `${origin}/en`, 'x-default': `${origin}/es` };
const results = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  // Disabled JS also proves that metadata and language links arrive in server HTML.
  const context = await browser.newContext({ javaScriptEnabled: false });
  for (const locale of ['es', 'en']) {
    const page = await context.newPage();
    const response = await page.goto(`${base}/${locale}`, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200);
    assert.equal((await response.allHeaders()).link, undefined);
    const head = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      alternates: Object.fromEntries([...document.querySelectorAll('link[hreflang]')].map((link) => [link.hreflang, link.href])),
      ogUrl: document.querySelector('meta[property="og:url"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      twitterImage: document.querySelector('meta[name="twitter:image"]')?.content,
      localeLinks: [...document.querySelectorAll('a[href]')].map((link) => link.getAttribute('href')),
    }));
    assert.equal(head.lang, locale);
    assert.equal(head.canonical, `${origin}/${locale}`);
    assert.deepEqual(head.alternates, alternates);
    assert.equal(head.ogUrl, head.canonical);
    assert.equal(head.ogImage, `${origin}/images/brand/nexovate-logo.png`);
    assert.equal(head.twitterImage, head.ogImage);
    assert.ok(head.localeLinks.includes(locale === 'es' ? '/en' : '/es'));
    results.push({ path: `/${locale}`, status: response.status(), canonical: head.canonical, alternates: head.alternates, languageLinks: true });
    await page.close();
  }

  const preferences = [
    ['absent', {}, 'es'],
    ['Spanish', { 'Accept-Language': 'es-AR,es;q=0.9' }, 'es'],
    ['English', { 'Accept-Language': 'en-US,en;q=0.9' }, 'en'],
    ['unknown', { 'Accept-Language': 'ja-JP' }, 'es'],
    ['invalid header', { 'Accept-Language': 'not_a_language' }, 'es'],
    ['cookie wins', { 'Accept-Language': 'es', Cookie: 'NEXT_LOCALE=en' }, 'en'],
    ['Spanish cookie', { 'Accept-Language': 'en', Cookie: 'NEXT_LOCALE=es' }, 'es'],
    ['invalid cookie', { 'Accept-Language': 'ja', Cookie: 'NEXT_LOCALE=fr' }, 'es'],
    ['invalid cookie with English', { 'Accept-Language': 'en', Cookie: 'NEXT_LOCALE=fr' }, 'en'],
  ];
  for (const [preference, headers, locale] of preferences) {
    const response = await fetch(`${base}/`, { headers, redirect: 'manual' });
    assert.equal(response.status, 307);
    assert.equal(new URL(response.headers.get('location'), base).pathname, `/${locale}`);
    results.push({ preference, status: response.status, destination: `/${locale}` });
  }

  const explicit = await fetch(`${base}/es`, { headers: { 'Accept-Language': 'en', Cookie: 'NEXT_LOCALE=en', Host: 'preview.example.test' } });
  assert.equal(explicit.status, 200);
  assert.match(await explicit.text(), /rel="canonical" href="https:\/\/www\.nexovate\.com\.ar\/es"/);
  for (const path of ['/es/seo-nonexistent', '/en/seo-nonexistent', '/fr', '/seo-nonexistent']) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 404);
    results.push({ path, status: response.status });
  }

  const robots = await fetch(`${base}/robots.txt`);
  assert.equal(robots.status, 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /User-Agent: \*/i);
  assert.match(robotsText, /Allow: \//);
  assert.ok(robotsText.includes(`Sitemap: ${origin}/sitemap.xml`));
  const sitemap = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get('content-type'), /xml/);
  const xml = await sitemap.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  assert.equal(entries.length, 2);
  assert.deepEqual(entries.map((entry) => entry.match(/<loc>(.*?)<\/loc>/)[1]).sort(), [`${origin}/en`, `${origin}/es`]);
  for (const entry of entries) {
    const languages = Object.fromEntries([...entry.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((match) => [match[1], match[2]]));
    assert.deepEqual(languages, alternates);
  }
  assert.ok(!`${xml}${robotsText}`.includes('nexovate.net'));
  results.push({ robots: robots.status, sitemap: sitemap.status, sitemapEntries: entries.length, alternatesMatch: true, previewHostIgnored: true });
  console.log(JSON.stringify({ base, results }, null, 2));
} finally {
  await browser.close();
}
