// qa-screenshot.js — headless Chrome validation of the book-opening chroma key
// Creates a throwaway QA copy of scslaicares.html (original is never touched),
// serves the workspace over HTTP, drives headless Chrome via puppeteer-core at
// desktop + mobile sizes, and collects alpha stats, screenshots and reports
// into qa-results/. Usage: node qa-screenshot.js "C:\path\to\chrome.exe"
const puppeteer = require('puppeteer-core');
const express = require('express');
const fs = require('fs');
const path = require('path');

const chromePath = process.argv[2];
if (!chromePath || !fs.existsSync(chromePath)) {
  console.error('Chrome not found. Pass the executable path as argument.');
  process.exit(1);
}

const root = __dirname;
const outDir = path.join(root, 'qa-results');
fs.mkdirSync(outDir, { recursive: true });
fs.rmSync(path.join(outDir), { force: true, recursive: true });
fs.mkdirSync(outDir, { recursive: true });

// Temporary QA copy (git-ignored, deleted after the run).
const srcHtml = fs.readFileSync(path.join(root, 'FRONT', 'scslaicares.html'), 'utf8');
const qaCopyPath = path.join(root, 'FRONT', 'scslaicares-qa.html');
fs.writeFileSync(qaCopyPath, srcHtml.replace('</body>', '<script src="../qa-embed.js"></scr' + 'ipt></body>'));

// Serve the workspace root over HTTP: same-origin video keeps the canvas
// untainted, which mirrors how the site is really served (HTTP/Pages/Live
// Server). Root (not FRONT/) so the ../qa-embed.js tag resolves correctly.
const receiver = express();
receiver.use(express.static(root));
receiver.use((req, res, next) => { res.setHeader('Access-Control-Allow-Origin', '*'); next(); });
receiver.use(express.text({ type: () => true, limit: '30mb' }));
receiver.post('/shot', (req, res) => {
  const tag = String(req.query.tag || 'run').replace(/[^a-z0-9-]/gi, '-');
  const name = String(req.query.name || 'shot').replace(/[^a-z0-9-]/gi, '-');
  const dataUrl = String(req.body || '');
  const base64 = dataUrl.split(',')[1] || '';
  if (base64) {
    fs.writeFileSync(path.join(outDir, `${tag}-${name}.png`), Buffer.from(base64, 'base64'));
    console.log('[receiver] saved', `${tag}-${name}.png`);
  }
  res.json({ ok: true });
});
receiver.post('/report', (req, res) => {
  const tag = String(req.query.tag || 'run').replace(/[^a-z0-9-]/gi, '-');
  const stage = String(req.query.stage || 'final').replace(/[^a-z0-9-]/gi, '-');
  fs.writeFileSync(path.join(outDir, `${tag}-report-${stage}.txt`), String(req.body || ''));
  console.log('[receiver] report saved:', `${tag}-report-${stage}.txt`);
  res.json({ ok: true });
});
const server = receiver.listen(8124, () => console.log('[receiver] serving workspace on 8124'));

const runBrowser = async (width, height, tag) => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      `--window-size=${width},${height}`,
      '--autoplay-policy=no-user-gesture-required',
      '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      '--disable-gpu-sandbox', '--no-sandbox',
      '--disable-features=MediaRouter'
    ]
  });
  const page = await browser.newPage();
  page.on('console', (msg) => {
    const text = msg.text();
    if (text.startsWith('QA>')) console.log(`[${tag}]`, text.slice(0, 300));
    if (/error/i.test(msg.type()) && !text.includes('net::')) console.error(`[${tag}][console.error]`, text.slice(0, 300));
  });
  page.on('pageerror', (err) => console.error(`[${tag}][pageerror]`, String(err).slice(0, 300)));
  await page.setViewport({ width, height });
  await page.goto(`http://127.0.0.1:8124/FRONT/scslaicares-qa.html?qatag=${tag}`, { waitUntil: 'load', timeout: 30000 });
  // Wait for the embed to finish (it sets window.__QA_RESULT__ at the end).
  await page.waitForFunction(() => window.__QA_RESULT__ !== undefined, { timeout: 150000, polling: 500 });
  const result = await page.evaluate(() => window.__QA_RESULT__);
  const lines = Array.isArray(result) ? result : null;
  if (lines) {
    fs.writeFileSync(path.join(outDir, `${tag}-report.txt`), lines.join('\n') + '\n');
    console.log(`[${tag}] captured ${lines.length} QA lines via bridge`);
  }
  await page.screenshot({ path: path.join(outDir, `${tag}-viewport-end.png`) }).catch(() => {});
  await browser.close();
  return lines;
};

(async () => {
  console.log('[runner] desktop run (1440x900)');
  const desktop = await runBrowser(1440, 900, 'desktop');
  console.log('[runner] mobile run (390x844)');
  const mobile = await runBrowser(390, 844, 'mobile');
  server.close();
  fs.rmSync(qaCopyPath, { force: true });
  const ok = Array.isArray(desktop) && Array.isArray(mobile) &&
    desktop.concat(mobile).some((l) => l === 'QA_RESULT: PASS');
  console.log('[runner] done. QA copy removed. Results in qa-results/. PASS:', ok);
  process.exit(0);
})();

