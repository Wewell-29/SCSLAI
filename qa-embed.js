// qa-embed.js — runs inside the page via ?qa= query; validates the whole flow.
(async () => {
  if (window.__QA_EMBED_RAN__) return;
  window.__QA_EMBED_RAN__ = true;
  const qaTag = new URLSearchParams(location.search).get('qatag') || 'run';
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const q = (s) => document.querySelector(s);
  const lines = [];
  const log = (m) => { lines.push(m); console.log('QA>' + m); };

  const send = async (url, body) => {
    // text/plain keeps this a CORS-safelisted request (no preflight) from file://
    try {
      await fetch(url, { method: 'POST', body, headers: { 'Content-Type': 'text/plain' } });
      return true;
    } catch (e) {
      try {
        navigator.sendBeacon(url, new Blob([body], { type: 'text/plain' }));
        return true;
      } catch (e2) { return false; }
    }
  };

  const sleepUntil = async (fn, timeout, label) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      let ok = false;
      try { ok = fn(); } catch (e) {}
      if (ok) return true;
      await wait(100);
    }
    log('TIMEOUT waiting for: ' + label);
    return false;
  };

  function alphaStats(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    try {
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0, partial = 0, opaque = 0, greenOpaque = 0;
      const total = d.length / 4;
      for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3];
        if (a === 0) transparent++;
        else if (a < 255) partial++;
        else {
          opaque++;
          if (d[i + 1] > 100 && d[i + 1] > d[i] * 1.6 && d[i + 1] > d[i + 2] * 1.6) greenOpaque++;
        }
      }
      return {
        transparentPct: +(100 * transparent / total).toFixed(1),
        partialPct: +(100 * partial / total).toFixed(1),
        opaquePct: +(100 * opaque / total).toFixed(1),
        greenOpaquePixels: greenOpaque
      };
    } catch (e) {
      return null; // tainted canvas etc.
    }
  }

  async function saveComposite(canvas, name) {
    // Composite the live keyed canvas over magenta so transparency is provable.
    try {
      const out = document.createElement('canvas');
      out.width = canvas.width; out.height = canvas.height;
      const octx = out.getContext('2d');
      octx.fillStyle = 'magenta';
      octx.fillRect(0, 0, out.width, out.height);
      octx.drawImage(canvas, 0, 0);
      const png = out.toDataURL('image/png');
      await send('http://127.0.0.1:8124/shot?tag=' + qaTag + '&name=' + name, png);
    } catch (e) {
      log('composite skipped: ' + e.message);
    }
  }
  try {
    const overlay = q('#book-opening');
    const video = q('#book-opening-video');
    const book = q('.yearbook-book');
    log('page: ' + location.pathname.split('/').pop() + ' viewport: ' + innerWidth + 'x' + innerHeight);
    await send('http://127.0.0.1:8124/report?tag=' + qaTag + '&stage=start', 'embed started on ' + qaTag);
    log('book found: ' + !!book + ' | video: ' + !!video + ' | source: ' + video?.querySelector('source')?.getAttribute('src'));
    log('overlay hidden initially: ' + overlay.hidden + ' | scrollW/H: ' + document.documentElement.scrollWidth + '/' + document.documentElement.scrollHeight);
    const gridTopBefore = book.offsetTop;

    book.click();
    log('--- book clicked ---');
    await sleepUntil(() => !overlay.hidden, 5000, 'overlay visible');
    log('overlay visible: ' + !overlay.hidden + ' | classes: ' + overlay.className);
    await sleepUntil(() => q('canvas.book-opening-canvas'), 5000, 'canvas created');
    const canvas = q('canvas.book-opening-canvas');
    const canvases = document.querySelectorAll('canvas.book-opening-canvas').length;
    log('canvas count: ' + canvases + ' (must be 1) | backing: ' + canvas.width + 'x' + canvas.height);
    await sleepUntil(() => video.readyState >= 2 && video.videoWidth > 0, 8000, 'video decoding');
    log('video: readyState=' + video.readyState + ' ' + video.videoWidth + 'x' + video.videoHeight +
        ' duration=' + (video.duration || 0).toFixed(2) + 's muted=' + video.muted + ' paused=' + video.paused);

    // Keying is only proven when real content exists: transparency present,
    // the book itself visible as opaque pixels, and almost no opaque green.
    const keyed = await sleepUntil(() => canvas.width > 0 && (() => {
      const s = alphaStats(canvas);
      return !!s && s.transparentPct > 15 && s.opaquePct > 1 &&
        s.greenOpaquePixels < canvas.width * canvas.height * 0.005;
    })(), 20000, 'chroma key producing transparency');
    const stats = keyed ? alphaStats(canvas) : alphaStats(canvas);
    log('ALPHA STATS: ' + JSON.stringify(stats) + (keyed ? ' (KEYED OK)' : ' (KEYING FAILED)'));
    await saveComposite(canvas, 'anim-composite-mid');
    log('layout stable during anim: ' + (book.offsetTop === gridTopBefore) + ' | is-chroma on overlay: ' + overlay.classList.contains('is-chroma'));
    log('video element hidden during chroma: ' + getComputedStyle(video).visibility);
    log('canvas visible during chroma: ' + getComputedStyle(canvas).visibility);

    await sleepUntil(() => { const r = q('#yearbook-reader'); return r && !r.hidden; }, 45000, 'reader open');
    const reader = q('#yearbook-reader');
    log('--- reader open: ' + String(!reader.hidden) + ' | classes after end: ' + overlay.className);
    log('overlay hidden after end: ' + overlay.hidden + ' | is-chroma removed: ' + !overlay.classList.contains('is-chroma'));
    log('flipbook present: ' + !!q('#flipbook') + ' | pages rendered: ' + document.querySelectorAll('#flipbook .album-page').length);
    await wait(500);

    // Restart cycle: close reader, open again, cancel with Escape.
    const closeBtn = q('[data-close-reader]');
    if (closeBtn) { closeBtn.click(); log('reader closed for restart test'); }
    await wait(300);
    book.click();
    await sleepUntil(() => !overlay.hidden && overlay.classList.contains('is-chroma'), 8000, 'second opening chroma active');
    log('--- second opening active | canvas count still: ' + document.querySelectorAll('canvas.book-opening-canvas').length);
    await wait(1200);
    const stats2 = alphaStats(canvas);
    log('second run ALPHA STATS: ' + JSON.stringify(stats2));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await wait(400);
    log('--- Escape pressed | overlay hidden: ' + overlay.hidden + ' | classes: ' + overlay.className);
    log('scrollbars: scrollW=' + document.documentElement.scrollWidth + ' clientW=' + document.documentElement.clientWidth);

    const pass = keyed && canvases === 1 && !overlay.classList.contains('is-chroma') && overlay.hidden;
    log(pass ? 'QA_RESULT: PASS' : 'QA_RESULT: FAIL');
  } catch (e) {
    log('EMBED ERROR: ' + e.message);
    log('QA_RESULT: FAIL');
  } finally {
    await send('http://127.0.0.1:8124/report?tag=' + qaTag, JSON.stringify(lines, null, 2));
    // Bridge for the puppeteer runner: it awaits this instead of kill timers.
    window.__QA_RESULT__ = lines;
  }
})();