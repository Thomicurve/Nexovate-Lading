import assert from 'node:assert/strict';
import { chromium } from './seo-runtime/node_modules/playwright/index.mjs';

const base = process.env.SEO_TEST_URL || 'http://127.0.0.1:3100';
const results = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const path of ['/es', '/en', '/robots.txt', '/sitemap.xml', '/es/seo-nonexistent']) {
    const response = await fetch(`${base}${path}`);
    const headers = Object.fromEntries(response.headers);
    assert.equal(response.status, path.includes('nonexistent') ? 404 : 200);
    assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin');
    assert.equal(headers['permissions-policy'], 'camera=(), microphone=(), geolocation=()');
    assert.equal(headers['cross-origin-opener-policy'], 'same-origin-allow-popups');
    assert.equal(headers['x-content-type-options'], 'nosniff'); assert.equal(headers['x-frame-options'], 'DENY');
    assert.equal(headers['x-xss-protection'], undefined); assert.equal(headers['content-security-policy'], undefined);
    assert.ok(headers['content-security-policy-report-only'].includes("frame-src https://app.cal.com"));
    assert.ok(!/unsafe-eval|report-uri|report-to|\*/.test(headers['content-security-policy-report-only']));
    results.push({ path, status: response.status, headers: Object.fromEntries(Object.entries(headers).filter(([name]) => /policy|x-frame|x-content/.test(name))) });
  }
  const secureResponse = await fetch(`${base}/en`, { headers: { 'Accept-Language': 'es', 'X-Forwarded-Proto': 'https' } });
  const cookieHeader = secureResponse.headers.get('set-cookie');
  assert.match(cookieHeader, /NEXT_LOCALE=en/i); assert.match(cookieHeader, /; Secure/i); assert.match(cookieHeader, /SameSite=lax/i); assert.match(cookieHeader, /Path=\//i);

  // A browser HTTPS origin proxies the local production response. No deployed/TLS-server claim.
  const secureContext = await browser.newContext({ javaScriptEnabled: false, locale: 'es-AR' });
  await secureContext.route('https://seo-local.test/**', async (route) => {
    const target = new URL(route.request().url());
    const response = await route.fetch({ url: `${base}${target.pathname}${target.search}`, maxRedirects: 0 });
    const headers = response.headers();
    if (headers.location) headers.location = new URL(new URL(headers.location, base).pathname, 'https://seo-local.test').href;
    await route.fulfill({ response, headers });
  });
  const securePage = await secureContext.newPage(); await securePage.goto('https://seo-local.test/en');
  let cookie = (await secureContext.cookies()).find((cookie) => cookie.name === 'NEXT_LOCALE');
  assert.equal(cookie.value, 'en'); assert.equal(cookie.secure, true); assert.equal(cookie.sameSite, 'Lax');
  let preference = await fetch(`${base}/`, { redirect: 'manual', headers: { Cookie: `NEXT_LOCALE=${cookie.value}`, 'Accept-Language': 'es' } });
  assert.equal(preference.status, 307);
  assert.equal(new URL(preference.headers.get('location'), base).pathname, '/en');
  await securePage.locator('header a[hreflang="es"]').click();
  cookie = (await secureContext.cookies()).find((cookie) => cookie.name === 'NEXT_LOCALE'); assert.equal(cookie.value, 'es'); assert.equal(cookie.secure, true);
  preference = await fetch(`${base}/`, { redirect: 'manual', headers: { Cookie: `NEXT_LOCALE=${cookie.value}`, 'Accept-Language': 'en' } });
  assert.equal(preference.status, 307);
  assert.equal(new URL(preference.headers.get('location'), base).pathname, '/es');
  results.push({ secureProductionCookieHeader: cookieHeader, simulatedHttpsBrowserCookieStorageAndServerPreference: true }); await secureContext.close();

  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const responses = []; const consoleMessages = [];
  page.on('response', (response) => { if (/cal\.com|insights/.test(response.url())) responses.push({ url: response.url(), status: response.status() }); });
  page.on('console', (message) => { if (/Content Security|violat|policy/i.test(message.text())) consoleMessages.push(message.text().slice(0, 500)); });
  await page.addInitScript(() => {
    window.seoViolations = [];
    document.addEventListener('securitypolicyviolation', (event) => window.seoViolations.push({ blockedURI: event.blockedURI, directive: event.effectiveDirective, disposition: event.disposition }));
  });
  await page.goto(`${base}/es`, { waitUntil: 'networkidle' });
  assert.ok(await page.evaluate(() => document.fonts.status === 'loaded' && performance.getEntriesByType('resource').some((entry) => /\/_next\/static\/media\/.+\.woff/.test(entry.name))));
  assert.ok(await page.locator('header img[alt="Nexovate"]').first().evaluate((image) => image.complete && image.naturalWidth > 0));
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click(); await page.locator('#mobile-menu').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape'); await page.locator('#mobile-menu').waitFor({ state: 'hidden' });
  await page.locator('[data-calendar-state]').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('[data-calendar-state]').dataset.calendarState === 'ready', undefined, { timeout: 20000 });
  const cleanViolations = await page.evaluate(() => window.seoViolations);
  assert.deepEqual(cleanViolations, []);
  results.push({ realCalReady: true, nextNavigationLogoFonts: true, parentCspViolationsBeforeProbe: cleanViolations,
    observedProviderResponses: responses.filter((response) => /\/embed\/embed.js|\/15min\/embed|\/_vercel\/insights\/script/.test(response.url)),
    providerOrigins: [...new Set(responses.map((response) => new URL(response.url).origin))], consolePolicyMessagesBeforeProbe: [...consoleMessages] });

  for (const target of ['https://cal.com/nexovate-o7uzwd/15min', 'https://wa.me/message/QEX2LSMCN5A6D1']) {
    await page.context().route(target, (route) => route.fulfill({ contentType: 'text/html', body: '<title>External navigation test</title>' }));
    const link = page.locator(`a[href="${target}"]`); assert.match(await link.getAttribute('rel'), /noopener/);
    const popupPromise = page.waitForEvent('popup'); await link.click(); const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded'); assert.equal(popup.url(), target); assert.equal(await popup.evaluate(() => window.opener), null);
    results.push({ popupTarget: target, navigationMocked: true, openerNull: true }); await popup.close();
  }

  await page.route('https://seo-csp-probe.invalid/probe.js', (route) => route.fulfill({ contentType: 'application/javascript', body: 'window.seoCspProbe = true;' }));
  await page.evaluate(() => new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = 'https://seo-csp-probe.invalid/probe.js'; script.onload = resolve; script.onerror = reject; document.head.append(script); }));
  await page.waitForFunction(() => window.seoViolations.some((event) => event.blockedURI.includes('seo-csp-probe.invalid')));
  const probe = await page.evaluate(() => ({ executed: window.seoCspProbe, violations: window.seoViolations }));
  assert.equal(probe.executed, true); assert.ok(probe.violations.every((violation) => violation.disposition === 'report'));
  results.push({ negativeCspProbe: probe, consolePolicyMessagesAfterProbe: [...consoleMessages], remoteReportEndpoint: false }); await page.close();

  const analyticsPage = await browser.newPage();
  await analyticsPage.addInitScript(() => { window.seoViolations = []; document.addEventListener('securitypolicyviolation', (event) => window.seoViolations.push(event.effectiveDirective)); });
  await analyticsPage.route('**/_vercel/insights/script.js', (route) => route.fulfill({ contentType: 'application/javascript', body: "window.seoAnalyticsMock=true;fetch('/_vercel/insights/view',{method:'POST',body:'{}'}).then(()=>window.seoAnalyticsSent=true);" }));
  await analyticsPage.route('**/_vercel/insights/view', (route) => route.fulfill({ status: 204, body: '' }));
  await analyticsPage.goto(`${base}/en`, { waitUntil: 'networkidle' }); await analyticsPage.waitForFunction(() => window.seoAnalyticsSent === true);
  assert.deepEqual(await analyticsPage.evaluate(() => window.seoViolations), []);
  results.push({ analyticsPathsCompatibility: 'mocked script and POST, no CSP violations', realLocalScriptStatus: responses.find((response) => response.url.includes('/_vercel/insights/script.js'))?.status });
  await analyticsPage.close();
  const publishedAnalytics = await fetch('https://www.nexovate.com.ar/_vercel/insights/script.js');
  results.push({ existingPublishedAnalyticsScriptStatus: publishedAnalytics.status, deploymentOfCandidate: false });
  console.log(JSON.stringify({ base, results }, null, 2));
} finally { await browser.close(); }
