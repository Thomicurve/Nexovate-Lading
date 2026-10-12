import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { chromium } from './seo-runtime/node_modules/playwright/index.mjs';

const base = process.env.SEO_TEST_URL || 'http://127.0.0.1:3100';
const embedScript = 'https://app.cal.com/embed/embed.js';
const require = createRequire(import.meta.url);
const results = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const mockEmbed = `(() => {
  const old = window.Cal.ns['15min']; const handlers = {}; const commands = [];
  function api(action, options) {
    commands.push(action);
    if (action === 'on') (handlers[options.action] ||= new Set()).add(options.callback);
    if (action === 'off') handlers[options.action]?.delete(options.callback);
    if (action === 'inline') { const iframe = document.createElement('iframe'); iframe.src = 'about:blank'; options.elementOrSelector.append(iframe); }
  }
  const queued = [...old.q]; old.q.push = (args) => { api(...args); return 0; };
  function root() {} root.loaded = true; root.ns = { '15min': api }; window.Cal = root;
  window.seoCal = { commands, emit: (action) => handlers[action]?.forEach((callback) => callback({ detail: {} })) };
  queued.forEach((args) => api(...args));
})();`;

async function mockPage(mode, locale = 'es') {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await page.clock.install();
  const traffic = [];
  page.on('request', (request) => { if (/\.(?:cal\.com)(?:\/|$)/.test(new URL(request.url()).hostname + '/')) traffic.push(request.url()); });
  await page.route(embedScript, (route) => mode === 'script-error' ? route.abort() : route.fulfill({ contentType: 'application/javascript', body: mockEmbed }));
  await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' });
  const calendar = page.locator('[data-calendar-state]');
  assert.equal(await calendar.getAttribute('data-calendar-state'), 'idle');
  assert.equal(traffic.length, 0);
  await calendar.scrollIntoViewIfNeeded();
  return { page, calendar, traffic };
}

try {
  const geometryPage = await browser.newPage({ reducedMotion: 'reduce' });
  await geometryPage.route(embedScript, (route) => route.abort());
  await geometryPage.goto(`${base}/es`, { waitUntil: 'networkidle' });
  for (const width of [320, 360, 390, 768, 1280]) {
    await geometryPage.setViewportSize({ width, height: 844 });
    await geometryPage.locator('footer img[alt="Nexovate"]').scrollIntoViewIfNeeded();
    await geometryPage.waitForFunction(() => [...document.querySelectorAll('img[alt="Nexovate"]')].filter((image) => image.getBoundingClientRect().width > 0).every((image) => image.complete && image.currentSrc));
    const geometry = await geometryPage.evaluate(() => ({
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      logos: [...document.querySelectorAll('img[alt="Nexovate"]')].map((image) => {
        const frame = image.parentElement.getBoundingClientRect(); const rect = image.getBoundingClientRect();
        return { frameWidth: frame.width, frameHeight: frame.height, imageWidth: rect.width, left: rect.x - frame.x, top: rect.y - frame.y, overflow: getComputedStyle(image.parentElement).overflow, sizes: image.sizes, src: image.currentSrc };
      }).filter((logo) => logo.frameWidth > 0),
    }));
    assert.ok(geometry.scrollWidth <= width);
    for (const logo of geometry.logos) {
      assert.ok(Math.abs(logo.imageWidth / logo.frameWidth - 2172 / 1924) < 0.005);
      assert.ok(Math.abs(logo.left + logo.frameWidth * 129 / 1924) < 1);
      assert.ok(Math.abs(logo.top + logo.frameHeight / 2) < 1);
      assert.equal(logo.overflow, 'hidden'); assert.ok(logo.sizes); assert.match(logo.src, /\/_next\/image\?/);
    }
    results.push({ geometry });
  }
  const original = await fetch(`${base}/images/brand/nexovate-logo.png`);
  assert.equal((await original.arrayBuffer()).byteLength, 373654);
  for (const width of [192, 256, 384, 480]) {
    for (const accept of ['image/avif', 'image/webp']) {
      const response = await fetch(`${base}/_next/image?url=%2Fimages%2Fbrand%2Fnexovate-logo.png&w=${width}&q=75`, { headers: { Accept: accept } });
      const bytes = (await response.arrayBuffer()).byteLength;
      assert.equal(response.status, 200); assert.equal(response.headers.get('content-type'), accept); assert.ok(bytes < 373654);
      results.push({ imageWidth: width, mime: accept, bytes, originalBytes: 373654 });
    }
  }
  await geometryPage.close();

  for (const [mode, locale] of [['ready', 'es'], ['ready', 'en'], ['link-error', 'es'], ['script-error', 'es'], ['timeout', 'en']]) {
    const { page, calendar, traffic } = await mockPage(mode, locale);
    if (mode === 'script-error') {
      await page.waitForFunction(() => document.querySelector('[data-calendar-state]').dataset.calendarState === 'error');
    } else {
      await page.waitForFunction(() => window.seoCal?.commands.includes('inline'));
      assert.equal(await calendar.getAttribute('data-calendar-state'), 'loading');
      if (mode === 'timeout') await page.clock.fastForward(15001);
      else await page.evaluate((action) => window.seoCal.emit(action), mode === 'ready' ? 'linkReady' : 'linkFailed');
      const expected = mode === 'ready' ? 'ready' : mode === 'timeout' ? 'timeout' : 'error';
      await page.waitForFunction((state) => document.querySelector('[data-calendar-state]').dataset.calendarState === state, expected);
      if (mode === 'ready') { await page.clock.fastForward(16000); assert.equal(await calendar.getAttribute('data-calendar-state'), 'ready'); }
      await page.evaluate(() => scrollTo(0, 0)); await calendar.scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => window.seoCal.commands.filter((action) => action === 'inline').length), 1);
    }
    assert.equal(traffic.filter((url) => url === embedScript).length, 1);
    const direct = calendar.locator('a[href="https://cal.com/nexovate-o7uzwd/15min"]');
    assert.ok(await direct.isVisible()); await direct.focus();
    assert.ok(await direct.evaluate((link) => link === document.activeElement));
    results.push({ calendarMode: mode, locale, finalState: await calendar.getAttribute('data-calendar-state'), scriptRequests: 1, keyboardDirect: true });
    await page.close();
  }

  const noJs = await browser.newPage({ javaScriptEnabled: false });
  await noJs.goto(`${base}/es`, { waitUntil: 'domcontentloaded' });
  assert.ok(await noJs.getByText(require('../messages/es/index.json').contact.calendar.noScript, { exact: true }).isVisible());
  assert.equal(await noJs.locator('.calendar-embed iframe').count(), 0);
  assert.ok(await noJs.locator('[data-calendar-state] a').isVisible()); await noJs.close();

  // Mount the actual component in isolation to observe cleanup before and after starting.
  const fixture = await browser.newPage();
  await fixture.setContent('<div id="fixture"></div>');
  await fixture.addScriptTag({ content: readFileSync(join(dirname(require.resolve('react/package.json')), 'umd/react.development.js'), 'utf8') });
  await fixture.addScriptTag({ content: readFileSync(join(dirname(require.resolve('react-dom/package.json')), 'umd/react-dom.development.js'), 'utf8') });
  const compiled = require('typescript').transpileModule(readFileSync(new URL('../components/calendar.tsx', import.meta.url), 'utf8'), { compilerOptions: { module: 1, jsx: 4 } }).outputText;
  await fixture.evaluate((source) => {
    const observers = []; const listeners = new Set(); const cleared = []; let calendarTimer;
    window.IntersectionObserver = class { constructor(callback) { this.callback = callback; observers.push(this); } observe() {} disconnect() { this.disconnectCalls = (this.disconnectCalls || 0) + 1; } };
    const setTimer = window.setTimeout.bind(window); const clearTimer = window.clearTimeout.bind(window);
    window.setTimeout = (callback, delay, ...args) => { const id = setTimer(callback, delay, ...args); if (delay === 15000) calendarTimer = id; return id; };
    window.clearTimeout = (id) => { cleared.push(id); clearTimer(id); };
    const add = window.addEventListener.bind(window); const remove = window.removeEventListener.bind(window); const errors = new Set();
    window.addEventListener = (type, callback, capture) => { if (type === 'error' && capture === true) errors.add(callback); add(type, callback, capture); };
    window.removeEventListener = (type, callback, capture) => { errors.delete(callback); remove(type, callback, capture); };
    const api = (action, options) => { if (action === 'on') listeners.add(options.callback); if (action === 'off') listeners.delete(options.callback); };
    const mocks = { react: window.React, 'react/jsx-runtime': { jsx: (type, props) => React.createElement(type, props), jsxs: (type, props) => React.createElement(type, props) },
      'next-intl': { useTranslations: () => (key) => key }, '@calcom/embed-react': { default: () => null, getCalApi: async () => api },
      '@phosphor-icons/react': { ArrowUpRightIcon: () => null, CalendarBlankIcon: () => null }, '@/components/ui/button': { buttonVariants: () => '' } };
    const module = { exports: {} }; new Function('require', 'module', 'exports', source)((name) => mocks[name], module, module.exports);
    const root = ReactDOM.createRoot(document.getElementById('fixture')); root.render(React.createElement(module.exports.default));
    window.seoFixture = { observers, listeners, errors, cleared, root, Component: module.exports.default, timer: () => calendarTimer };
  }, compiled);
  await fixture.locator('[data-calendar-state="idle"]').waitFor();
  await fixture.waitForFunction(() => window.seoFixture.observers.length === 1);
  await fixture.evaluate(() => window.seoFixture.observers[0].callback([{ isIntersecting: true }]));
  await fixture.waitForFunction(() => window.seoFixture.listeners.size === 2);
  await fixture.evaluate(() => window.seoFixture.root.unmount());
  const cleanup = await fixture.evaluate(() => ({ observerDisconnectCalls: window.seoFixture.observers[0].disconnectCalls, apiListeners: window.seoFixture.listeners.size, errorListeners: window.seoFixture.errors.size, timerCleared: window.seoFixture.cleared.includes(window.seoFixture.timer()) }));
  assert.deepEqual(cleanup, { observerDisconnectCalls: 2, apiListeners: 0, errorListeners: 0, timerCleared: true });
  results.push({ cleanup }); await fixture.close();

  const realPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const realTraffic = []; realPage.on('request', (request) => { if (request.url().includes('cal.com')) realTraffic.push(request.url()); });
  await realPage.goto(`${base}/es`, { waitUntil: 'networkidle' }); assert.equal(realTraffic.length, 0);
  await realPage.locator('[data-calendar-state]').scrollIntoViewIfNeeded();
  let realOutcome;
  try { await realPage.waitForFunction(() => document.querySelector('[data-calendar-state]').dataset.calendarState === 'ready', undefined, { timeout: 20000 }); realOutcome = 'ready'; }
  catch { realOutcome = await realPage.locator('[data-calendar-state]').getAttribute('data-calendar-state'); }
  results.push({ realCal: realOutcome, scriptRequests: realTraffic.filter((url) => url === embedScript).length, iframeUrls: await realPage.locator('.calendar-embed iframe').evaluateAll((frames) => frames.map((frame) => frame.src)) });
  await realPage.close();
  console.log(JSON.stringify({ base, results }, null, 2));
} finally { await browser.close(); }
