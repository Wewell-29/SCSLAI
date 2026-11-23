/* =========================================================================
   SCSLAI — WELCOME / PROMO POPUP  (behaviour)
   -------------------------------------------------------------------------
   The front-door banners shown before the visitor uses the site. Each one is
   its own individual popup, presented in the same card, one at a time:

     • Welcome ........... the "A new way to connect with us" card
     • Annual Report ..... SCSLAI Annual Report 2025 (opens the report)
     • Yearbook .......... SCSLAI Cares Yearbook 2025 (opens the yearbook)

   Closing a banner (×, the dark area, the ESC key, or a click on a banner
   without a link) moves on to the next one that has not been seen yet this
   visit. Opening a linked banner's page also counts that banner as "seen".

   Settings ........ CONFIG below
   Colours / sizes . welcome-popup.css
   Artwork ......... images/welcome/*.webp (+ .jpg fallback)

   Testing: add ?welcome=1 to the URL to force every banner (ignores the
            "already seen" memory), ?welcome=<banner id> to show just one
            (?welcome=yearbook), or ?welcome=0 to switch them all off.
   ========================================================================= */

(function () {
    'use strict';

    if (window.__SCSLAI_WELCOME_INIT__) { return; }
    window.__SCSLAI_WELCOME_INIT__ = true;

    /* Never render inside another iframe (prevents nested popups). */
    try {
        if (window.top !== window.self) { return; }
    } catch (err) {
        return;
    }

    /* ------------------------------------------------------------------
       SETTINGS
       ------------------------------------------------------------------ */

    var CONFIG = {
        /* Shown in this order. Each banner is independent: dismissing (or
           opening) one never dismisses the others.

           id ........... used by ?welcome=<id> and the per-banner memory key
           key .......... storage key (the welcome banner keeps its original
                          key for backwards compatibility)
           webp / jpg ... artwork next to this script (images/welcome/)
           width/height . the artwork's own pixel size, so the card can keep
                          its shape while the picture downloads
           href ......... page opened when that banner is clicked
                          (omit it and a click simply closes the popup)
           label ........ spoken name of the banner
           alt .......... description of the artwork */
        banners: [
            {
                id: 'welcome',
                key: 'scslai-welcome-dismissed',
                webp: 'images/welcome/welcome-banner.webp',
                jpg: 'images/welcome/welcome-banner.jpg',
                width: 1671,
                height: 941,
                label: 'Welcome to SCSLAI — enter the site',
                alt: 'Welcome to SCSLAI — a new way to connect with us. Explore our ' +
                     'online services: information and updates, services online, loan ' +
                     'checking and application forms. Together, we grow.'
            },
            {
                id: 'annual-report',
                webp: 'images/welcome/promo-annual-report.webp',
                jpg: 'images/welcome/promo-annual-report.jpg',
                width: 1536,
                height: 1024,
                href: 'reports/2025-annual-report.html',
                label: 'SCSLAI Annual Report 2025 — view the report',
                alt: 'SCSLAI Cares Annual Report 2025 is now available. ' +
                     'Together in Service, Stronger for Tomorrow. View Now.'
            },
            {
                id: 'yearbook',
                webp: 'images/welcome/promo-yearbook.webp',
                jpg: 'images/welcome/promo-yearbook.jpg',
                width: 1536,
                height: 1024,
                href: 'scslaicares.html',
                label: 'SCSLAI Cares Yearbook — view the yearbook',
                alt: 'SCSLAI Cares Yearbook 2025 — a chronicle of our shared ' +
                     'journey. View Now.'
            }
        ],

        /* 'session' = once per browser session (default)
           'local'   = once per browser, ever
           'none'    = every time the home page is opened */
        remember: 'session',

        delay: 350,       /* ms after a banner is ready to show */
        loaderDelay: 250, /* ms of waiting for that banner before the card opens
                             with the coin loader in it (loading/coin-loader.js) */
        nextDelay: 450    /* ms of breathing room between two banners */
    };

    var STORAGE_PREFIX = 'scslai-banner-seen-';
    var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2.6" stroke-linecap="round" aria-hidden="true" focusable="false">' +
        '<path d="M6 6l12 12M18 6L6 18"/></svg>';

    /* Captured while this file executes: lets the artwork be found next to
       this script, so the popup also works from /reports/ and other folders. */
    var SELF_SRC = '';
    try {
        SELF_SRC = (document.currentScript && document.currentScript.src) || '';
    } catch (err) {
        SELF_SRC = '';
    }

    var modal = null;
    var card = null;
    var picture = null;
    var closeButton = null;
    var bannerLoader = null;
    var currentBanner = null;
    var queue = [];
    var lastFocus = null;
    var scrollLock = null;
    var closing = false;
    var shown = false;

    /* ------------------------------------------------------------------
       Small helpers
       ------------------------------------------------------------------ */

    function assetUrl(path) {
        if (!SELF_SRC) { return path; }
        var base = SELF_SRC.replace(/[?#].*$/, '').replace(/[^/]*$/, '');
        return base + path;
    }

    function escapeAttr(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function ratioOf(banner) {
        return (banner && banner.height) ? (banner.width / banner.height) : 1.7758;
    }

    function bannerById(id) {
        var wanted = String(id || '').toLowerCase();
        for (var i = 0; i < CONFIG.banners.length; i += 1) {
            if (String(CONFIG.banners[i].id).toLowerCase() === wanted) {
                return CONFIG.banners[i];
            }
        }
        return null;
    }

    function bannerKey(banner) {
        return banner.key || (STORAGE_PREFIX + banner.id);
    }

    /* ?welcome=1 forces every banner, ?welcome=0 hides them, no value = null. */
    function queryValue(name) {
        try {
            return new URLSearchParams(window.location.search).get(name);
        } catch (err) {
            return null;
        }
    }

    function queryFlag(name) {
        var value = queryValue(name);
        if (value === null) { return null; }
        if (value === '0' || value === 'false' || value === 'off') { return false; }
        if (value === '1' || value === 'true' || value === 'on' || value === '') { return true; }
        /* Any other value is the banner id the popup should show alone. */
        return value;
    }

    function storageArea() {
        try {
            if (CONFIG.remember === 'local') { return window.localStorage; }
            if (CONFIG.remember === 'session') { return window.sessionStorage; }
        } catch (err) { /* storage can be blocked — treat as "never seen" */ }
        return null;
    }

    function isBannerSeen(banner) {
        var area = storageArea();
        if (!area) { return false; }
        try { return area.getItem(bannerKey(banner)) === '1'; } catch (err) { return false; }
    }

    function rememberBanner(banner) {
        if (!banner) { return; }
        var area = storageArea();
        if (!area) { return; }
        try { area.setItem(bannerKey(banner), '1'); } catch (err) { /* ignore */ }
    }

    function reducedMotion() {
        try {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (err) {
            return false;
        }
    }

    /* ------------------------------------------------------------------
       Markup (built fresh for each individual banner)
       ------------------------------------------------------------------ */

    function removeModal() {
        if (modal && modal.parentNode) { modal.parentNode.removeChild(modal); }
        modal = null;
        card = null;
        picture = null;
        closeButton = null;
        bannerLoader = null;
    }

    function build(banner) {
        removeModal();

        modal = document.createElement('div');
        modal.id = 'scslai-welcome';
        modal.className = 'scslai-welcome';
        modal.hidden = true;
        /* Keeps the card's shape in sync with the artwork (see the CSS). */
        modal.style.setProperty('--scslai-welcome-ratio', String(ratioOf(banner)));

        /* A banner without a link closes the popup when clicked (the welcome
           card); a banner with one opens its page. */
        var art =
            '<picture>' +
                '<source srcset="' + escapeAttr(assetUrl(banner.webp)) + '" type="image/webp">' +
                '<img class="scslai-welcome__image" draggable="false" ' +
                    'src="' + escapeAttr(assetUrl(banner.jpg)) + '" ' +
                    'width="' + banner.width + '" height="' + banner.height + '" ' +
                    'alt="' + escapeAttr(banner.alt) + '"' +
                    (banner.href ? '' : ' data-scslai-welcome-close="true"') + '>' +
            '</picture>';

        if (banner.href) {
            art = '<a class="scslai-welcome__link" ' +
                'href="' + escapeAttr(assetUrl(banner.href)) + '" ' +
                'data-scslai-welcome-leave="true">' + art + '</a>';
        }

        modal.innerHTML =
            '<div class="scslai-welcome__backdrop" data-scslai-welcome-close="true"></div>' +
            '<div class="scslai-welcome__card" role="dialog" aria-modal="true" ' +
                'aria-label="' + escapeAttr(banner.label) + '">' +
                '<button type="button" class="scslai-welcome__close" ' +
                    'aria-label="Close the banner">' + ICON_CLOSE + '</button>' +
                art +
            '</div>';

        card = modal.querySelector('.scslai-welcome__card');
        picture = modal.querySelector('picture');
        closeButton = modal.querySelector('.scslai-welcome__close');

        closeButton.addEventListener('click', function () { close(true); });
        modal.addEventListener('click', handleClick);

        return modal;
    }

    /* Clicks inside the popup: the dark area and the close button dismiss the
       banner; a linked banner remembers itself before the browser follows its
       href. */
    function handleClick(event) {
        var el = event.target;
        if (!el || !el.closest) { return; }

        if (el.closest('[data-scslai-welcome-leave]')) {
            rememberBanner(currentBanner);
            return;
        }

        if (el.closest('[data-scslai-welcome-close]')) { close(true); }
    }

    /* ------------------------------------------------------------------
       Coin loader for the banner download
       ------------------------------------------------------------------ */

    /* The card is opened early with the coin loader inside it, so a slow
       banner is a visible wait instead of nothing at all. The picture fades in
       as the loader goes (see .scslai-welcome--loading in welcome-popup.css). */
    function startBannerLoader() {
        if (!modal) { return null; }

        modal.classList.add('scslai-welcome--loading');

        if (!window.SCSLAILoader) { return null; }

        return window.SCSLAILoader.inline(card || modal, {
            label: 'Loading\u2026',
            delay: 0            /* the wait already happened — show it now */
        });
    }

    function stopBannerLoader() {
        if (bannerLoader) {
            bannerLoader.hide();
            bannerLoader = null;
        }

        if (modal) { modal.classList.remove('scslai-welcome--loading'); }
    }

    /* ------------------------------------------------------------------
       Wait for the artwork, then reveal
       ------------------------------------------------------------------ */

    function whenPictureReady(done) {
        var img = picture ? picture.querySelector('img') : null;
        var settled = false;

        function finish(ok) {
            if (settled) { return; }
            settled = true;
            done(ok);
        }

        if (!img) { finish(false); return; }
        if (img.complete && img.naturalWidth > 0) { finish(true); return; }

        img.addEventListener('load', function () { finish(true); });
        /* A missing picture is no reason to block the site — just skip it. */
        img.addEventListener('error', function () { finish(false); });
        /* Slow connection: show the card anyway, the picture fills in. */
        setTimeout(function () { finish(true); }, 5000);
    }

    /* ------------------------------------------------------------------
       Open / close
       ------------------------------------------------------------------ */

    function show() {
        if (!modal || shown || closing) { return; }
        shown = true;

        if (!document.body.contains(modal)) { document.body.appendChild(modal); }

        lastFocus = document.activeElement;
        modal.hidden = false;
        lockScroll(true);

        /* Two frames so the browser paints the start state first and the
           entrance transition actually runs. */
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                if (modal && !modal.hidden) { modal.classList.add('is-visible'); }
            });
        });

        if (closeButton && closeButton.focus) {
            try { closeButton.focus(); } catch (err) {}
        }

        document.addEventListener('keydown', handleKeydown, true);
    }

    function close(returnFocus) {
        if (!modal || modal.hidden || closing) { return; }
        closing = true;
        shown = false;

        /* A dismissed banner stays out of the way for this visit. */
        rememberBanner(currentBanner);

        modal.classList.remove('is-visible');
        document.removeEventListener('keydown', handleKeydown, true);

        var wait = reducedMotion() ? 0 : 260;

        setTimeout(function () {
            if (modal) { modal.hidden = true; }
            lockScroll(false);
            closing = false;

            /* The next unseen banner (if any) is its own popup. */
            scheduleNext();
        }, wait);

        if (returnFocus !== false) {
            var target = (lastFocus && lastFocus !== document.body && document.body.contains(lastFocus))
                ? lastFocus
                : null;
            if (target && target.focus) {
                try { target.focus(); } catch (err) {}
            }
        }

        lastFocus = null;
    }

    function handleKeydown(event) {
        if (!modal || modal.hidden) { return; }

        if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            event.stopPropagation();
            close(true);
            return;
        }

        if (event.key !== 'Tab') { return; }

        /* Keep the keyboard inside the popup while it is open. */
        var focusables = modal.querySelectorAll('button:not([disabled]), a[href]');
        if (!focusables.length) { return; }

        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    /* ------------------------------------------------------------------
       Page scroll lock (only while a popup is open)
       ------------------------------------------------------------------ */

    function lockScroll(lock) {
        var html = document.documentElement;
        var body = document.body;

        if (lock) {
            if (scrollLock) { return; }

            /* Compensate the scrollbar so the page behind does not jump. */
            var gap = Math.max(0, window.innerWidth - html.clientWidth);
            scrollLock = { paddingRight: body.style.paddingRight };

            body.classList.add('scslai-welcome-open');
            if (gap > 0) { body.style.paddingRight = gap + 'px'; }
            return;
        }

        if (!scrollLock) { return; }

        body.classList.remove('scslai-welcome-open');
        body.style.paddingRight = scrollLock.paddingRight;
        scrollLock = null;
    }

    /* ------------------------------------------------------------------
       The banner queue (each announcement is its own individual popup)
       ------------------------------------------------------------------ */

    function next() {
        if (!queue.length) {
            currentBanner = null;
            removeModal();
            return;
        }

        var banner = queue.shift();
        currentBanner = banner;

        build(banner);
        document.body.appendChild(modal);

        /* A big banner on a slow connection would otherwise leave the visitor
           staring at the site with no sign that anything is coming: open the
           card with the coin loader in it after `loaderDelay`, then swap in the
           artwork the moment it lands. */
        var loaderTimer = window.setTimeout(function () {
            loaderTimer = 0;
            bannerLoader = startBannerLoader();
            show();
        }, CONFIG.loaderDelay);

        whenPictureReady(function (ready) {
            if (loaderTimer) {
                window.clearTimeout(loaderTimer);
                loaderTimer = 0;
            }

            if (!ready) {
                /* A missing picture is no reason to block the site — and if the
                   card is already on screen, take it away again. */
                stopBannerLoader();
                if (shown) { close(false); }
                return;
            }

            stopBannerLoader();
            setTimeout(show, CONFIG.delay);
        });
    }

    function scheduleNext() {
        if (queue.length) {
            window.setTimeout(next, CONFIG.nextDelay);
        } else {
            removeModal();
        }
    }

    /* ------------------------------------------------------------------
       Start
       ------------------------------------------------------------------ */

    function boot() {
        var forced = queryFlag('welcome');

        if (forced === false) { return; }

        var list;
        if (forced === true) {
            /* Force every banner, ignoring the "already seen" memory. */
            list = CONFIG.banners.slice();
        } else if (typeof forced === 'string') {
            var only = bannerById(forced);
            list = only ? [only] : CONFIG.banners.slice();
        } else {
            /* The usual rules: show whichever banners this visit has not seen. */
            list = CONFIG.banners.filter(function (banner) {
                return !isBannerSeen(banner);
            });
        }

        if (!list.length) { return; }

        queue = list.slice();
        next();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();