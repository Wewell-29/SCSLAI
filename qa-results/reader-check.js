// reader-check.js — validates the yearbook reader layout: the same two-page
// spread on mobile (scaled to the phone width) and desktop. Temporary harness;
// results + screenshots land in qa-results/.
// Usage: node qa-results/reader-check.js "C:\path\to\chrome.exe"
const puppeteer = require('puppeteer-core');
const express = require('express');
const fs = require('fs');
const path = require('path');

const chromePath = process.argv[2];
if (!chromePath || !fs.existsSync(chromePath)) {
  console.error('Chrome not found. Pass the executable path as argument.');
  process.exit(1);
}

const root = path.join(__dirname, '..');
const outDir = __dirname;
const qaCopyPath = path.join(root, 'FRONT', 'scslaicares-qa.html');
const srcHtml = fs.readFileSync(path.join(root, 'FRONT', 'scslaicares.html'), 'utf8');
const embed = fs.readFileSync(path.join(__dirname, 'reader-embed.js'), 'utf8');

fs.writeFileSync(qaCopyPath, srcHtml.replace('</body>', '<script>' + embed + '</scr' + 'ipt></body>'));

const receiver = express();
receiver.use(express.static(root));
receiver.use(express.text({ type: () => true, limit: '30mb' }));
receiver.post('/shot', (req, res) => {
  const name = String(req.query.name || 'shot').replace(/[^a-z0-9-]/gi, '-');
  const base64 = String(req.body || '').split(',')[1] || '';
  if (base64) fs.writeFileSync(path.join(outDir, `reader-${name}.png`), Buffer.from(base64, 'base64'));
  res.json({ ok: true });
});
const server = receiver.listen(8125, () => console.log('[reader-check] serving on 8125'));

const runBrowser = async (width, height, tag) => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      `--window-size=${width},${height}`,
      '--autoplay-policy=no-user-gesture-required',
      '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      '--disable-gpu-sandbox', '--no-sandbox'
    ]
  });
  const page = await browser.newPage();
  page.on('console', (msg) => { const t = msg.text(); if (t.startsWith('RC>')) console.log(`[${tag}]`, t.slice(0, 300)); });
  page.on('pageerror', (err) => console.error(`[${tag}][pageerror]`, String(err).slice(0, 300)));
  await page.setViewport({ width, height });
  await page.goto(`http://127.0.0.1:8125/FRONT/scslaicares-qa.html`, { waitUntil: 'load', timeout: 90000 });
  // Freeze the panel pop-in so geometry reads are not taken mid-animation.
  await page.addStyleTag({ content: '.yearbook-reader.is-visible .reader-panel{animation:none !important}' });
  await page.waitForFunction(() => window.__RC_READY__ !== undefined, { timeout: 60000, polling: 40 });
  // Let the embed measure the flip arc undisturbed; afterwards run a second
  // flip purely to capture a mid-turn screenshot.
  await page.waitForFunction(() => window.__RC_LINES__ !== undefined, { timeout: 90000, polling: 250 });
  const lines = await page.evaluate(() => window.__RC_LINES__);
  const canFlip = await page.evaluate(() => typeof window.__RC_CLICK_FLIP__ === 'function');
  if (canFlip) {
    await page.evaluate(() => window.__RC_CLICK_FLIP__());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 420)));
    await page.screenshot({ path: path.join(outDir, `reader-${tag}-midflip.png`) }).catch(() => {});
    // Let the turn finish and the ghost overlay fade before the final shot.
    await page.evaluate(() => new Promise((r) => setTimeout(r, 1400)));
  }
  await page.screenshot({ path: path.join(outDir, `reader-${tag}.png`) }).catch(() => {});
  fs.writeFileSync(path.join(outDir, `reader-${tag}.txt`), lines.join('\n') + '\n');
  await browser.close();
  return lines;
};

(async () => {
  const only = process.argv[3] || '';
  const runs = [
    ['mobile-390', 390, 844],
    ['mobile-360', 360, 740],
    ['desktop-1440', 1440, 900]
  ].filter(([tag]) => !only || tag === only);
  for (const [tag, w, h] of runs) {
    console.log(`[reader-check] run (${tag} ${w}x${h})`);
    await runBrowser(w, h, tag);
  }
  server.close();
  fs.rmSync(qaCopyPath, { force: true });
  console.log('[reader-check] done. Screenshots + metrics in qa-results/.');
  process.exit(0);
})();
