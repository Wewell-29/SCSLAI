(async () => {
  const q = (s) => document.querySelector(s);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const lines = [];
  const log = (m) => { lines.push(m); console.log('RC>' + m); };
  try {
    // QA-only: freeze the panel pop-in so geometry reads never land on the
    // scale(0.98) first keyframe (production pages don't include this embed).
    const freeze = document.createElement('style');
    freeze.textContent = '.yearbook-reader.is-visible .reader-panel{animation:none !important}';
    document.head.appendChild(freeze);
    const books = document.querySelectorAll('.yearbook-book');
    log('books: ' + books.length + ' viewport: ' + innerWidth + 'x' + innerHeight);
    books[2].click();
    const overlay = q('#book-opening');
    const t0 = Date.now();
    while (!overlay || overlay.hidden) { await wait(100); if (Date.now() - t0 > 8000) break; }
    await wait(300);
    q('#book-opening-video').dispatchEvent(new Event('ended'));
    const reader = q('#yearbook-reader');
    const t1 = Date.now();
    while (reader.hidden) { await wait(100); if (Date.now() - t1 > 8000) break; }
    await wait(600);
    const fb = q('#flipbook');
    const half = fb.querySelector('[data-static-left]');
    const right = fb.querySelector('[data-static-right]');
    const page = fb.querySelector('.album-page');
    const img = fb.querySelector('.album-page img');
    const imgLoaded = img && img.complete && img.naturalWidth > 0;
    const fbRect = fb.getBoundingClientRect();
    const halfRect = half.getBoundingClientRect();
    const pageRect = page.getBoundingClientRect();
    log('flipbook: ' + Math.round(fbRect.width) + 'x' + Math.round(fbRect.height) +
        ' | ratio ' + (fbRect.width / fbRect.height).toFixed(2) +
        ' | inViewport: ' + (fbRect.right <= innerWidth + 1 && fbRect.left >= -1));
    log('left-half: ' + Math.round(halfRect.width) + 'x' + Math.round(halfRect.height) +
        ' | ratio ' + (halfRect.width / halfRect.height).toFixed(2) +
        ' | right-half display: ' + getComputedStyle(right).display);
    log('album-page: ' + Math.round(pageRect.width) + 'x' + Math.round(pageRect.height) +
        ' | img loaded: ' + imgLoaded +
        (imgLoaded ? ' | natural ' + img.naturalWidth + 'x' + img.naturalHeight +
          ' | box ' + Math.round(img.getBoundingClientRect().width) + 'x' + Math.round(img.getBoundingClientRect().height) : ''));
    const panelEl = q('.reader-panel');
    const detailsEl = q('.reader-details');
    const stageRect = q('.reader-stage').getBoundingClientRect();
    const panelRect = panelEl.getBoundingClientRect();
    const readerEl = q('.yearbook-reader');
    const readerRect = readerEl.getBoundingClientRect();
    const panelCS = getComputedStyle(panelEl);
    const readerCS = getComputedStyle(readerEl);
    log('readerShell: ' + Math.round(readerRect.width) + 'x' + Math.round(readerRect.height) +
        ' @(' + Math.round(readerRect.left) + ',' + Math.round(readerRect.top) + ')' +
        ' | pad=' + readerCS.padding + ' | overflow=' + readerCS.overflow);
    log('panelCS: align-self=' + panelCS.alignSelf + ' | height=' + panelCS.height +
        ' | animation=' + panelCS.animationName + ' ' + panelCS.animationDuration +
        ' | transform=' + panelCS.transform);
    log('panel: ' + Math.round(panelRect.width) + 'x' + Math.round(panelRect.height) +
        ' | panelFits: ' + (panelRect.height <= innerHeight) +
        ' | flushTop: ' + (panelRect.top <= 1) +
        ' | flushBottom: ' + (Math.abs(panelRect.bottom - innerHeight) <= 2) +
        ' | panelScrolls: ' + (panelEl.scrollHeight > panelEl.clientHeight + 2) +
        ' | detailsScrollable: ' + (detailsEl.scrollHeight > detailsEl.clientHeight + 2));
    const toolbarRect = q('.reader-toolbar').getBoundingClientRect();
    const closeRect = q('.reader-close').getBoundingClientRect();
    const introRect = q('.reader-intro').getBoundingClientRect();
    log('toolbarRow: ' + (Math.abs(closeRect.top - introRect.top) < 60 ? 'single-row' : 'stacked') +
        ' | toolbarHeight: ' + Math.round(toolbarRect.height) +
        ' | closeInToolbar: ' + (closeRect.top >= toolbarRect.top - 2 && closeRect.bottom <= toolbarRect.bottom + 2));
    log('bookInPanel: ' + (fbRect.top >= panelRect.top && fbRect.bottom <= panelRect.bottom) +
        ' | bookInStage: ' + (fbRect.top >= stageRect.top - 2 && fbRect.bottom <= stageRect.bottom + 2) +
        ' | firstPage: ' + (fb.querySelector('[data-page-number]')?.getAttribute('data-page-number')));
    const before = fb.querySelector('[data-page-number]').getAttribute('data-page-number');
    const host = q('#page-flip-host');
    const r = host.getBoundingClientRect();
    // --- 3D flip verification -------------------------------------------
    const fbStyle = getComputedStyle(fb);
    log('flip3dStyle: flipbook.transformStyle=' + fbStyle.transformStyle +
        ' | perspective(parent)=' + getComputedStyle(fb.parentElement).perspective);
    // Expose a trigger so the harness can run its own flip for screenshots
    // AFTER sampling completes (no interference with the measured arc).
    window.__RC_CLICK_FLIP__ = () => host.dispatchEvent(
      new MouseEvent('click', { bubbles: true, clientX: r.left + r.width * 0.8, clientY: r.top + r.height * 0.5 })
    );
    window.__RC_READY__ = true;
    const tGo = Date.now();
    host.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: r.left + r.width * 0.8, clientY: r.top + r.height * 0.5 }));
    const sheetEl = fb.querySelector('[data-turn-sheet]');
    log('flip3dStyle: sheet.transformStyle=' + getComputedStyle(sheetEl).transformStyle +
        ' | sheet.hidden=' + sheetEl.hidden);
    const samples = [];
    for (let i = 0; i < 14; i++) {
      await wait(100);
      let angle = null;
      const cs = getComputedStyle(sheetEl);
      if (cs.transform && cs.transform !== 'none') {
        const m = new DOMMatrix(cs.transform);
        angle = Math.round(Math.atan2(-m.m31 || 0, m.m11 || 1) * 180 / Math.PI);
      }
      samples.push(angle);
    }
    const angles = samples.filter((a) => a !== null);
    log('flip3d: rotateY samples=' + JSON.stringify(samples) +
        ' | maxRotation=' + (angles.length ? Math.max(...angles.map((a) => Math.abs(a))) : 0) + 'deg');
    await wait(1300);
    log('ghostPagesRemaining: ' + fb.querySelectorAll('.ghost-page').length);
    const after = fb.querySelector('[data-page-number]').getAttribute('data-page-number');
    log('flip step: ' + before + ' -> ' + after);
    log('RC_RESULT: DONE');
  } catch (e) {
    log('RC ERROR: ' + e.message);
  } finally {
    window.__RC_LINES__ = lines;
  }
})();