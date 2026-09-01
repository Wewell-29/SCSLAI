// ===========================
// Premium yearbook library
// ===========================

// 2022 Edition - Using scslaicares images
const pages2022 = [
  'images/gallery/silungan/SCSLAI.png',
  'images/gallery/silungan/1S.jpg',
  'images/gallery/silungan/2S.jpg',
  'images/gallery/silungan/3S.jpg',
  'images/gallery/silungan/4S.jpg',
  'images/gallery/silungan/5S.jpg',
  'images/gallery/silungan/6S.jpg',
  'images/gallery/silungan/7S.jpg',
  'images/gallery/silungan/8S.jpg'
  
];

// 2024 Edition - Using outreach images
const pages2024 = [
  'images/gallery/Tree planting/tree-planting.jpg',
  'images/gallery/Tree planting/1T.jpg',
  'images/gallery/Tree planting/2T.jpg',
  'images/gallery/Tree planting/3T.jpg',
  'images/gallery/Tree planting/4T.jpg',
  'images/gallery/Tree planting/5T.jpg',
  'images/gallery/Tree planting/6T.jpg',
  'images/gallery/Tree planting/7T.jpg',
  'images/gallery/Tree planting/8T.jpg',
  'images/gallery/Tree planting/9T.jpg',
  'images/gallery/Tree planting/10T.jpg',
  'images/gallery/Tree planting/11T.jpg',
  'images/gallery/Tree planting/12T.jpg',
  'images/gallery/Tree planting/13T.jpg',
  'images/gallery/Tree planting/14T.jpg',
  'images/gallery/Tree planting/15T.jpg',
  'images/gallery/Tree planting/16T.jpg'
  
];

// 2025 Edition - Using Tree planting images
const pages2025 = [
  'images/gallery/outreach/OUTREACH.png',
  'images/gallery/outreach/1.jpg',
  'images/gallery/outreach/2.jpg',
  'images/gallery/outreach/3.jpg',
  'images/gallery/outreach/4.jpg',
  'images/gallery/outreach/5.jpg',
  'images/gallery/outreach/6.jpg',
  'images/gallery/outreach/7.jpg',
  'images/gallery/outreach/8.jpg',
  'images/gallery/outreach/9.jpg',
  'images/gallery/outreach/10.jpg',
  'images/gallery/outreach/11.jpg',
  'images/gallery/outreach/12.jpg',
  'images/gallery/outreach/13.jpg',
  'images/gallery/outreach/14.jpg',
  'images/gallery/outreach/15.jpg',
  'images/gallery/outreach/16.jpg',
  'images/gallery/outreach/17.jpg',
  'images/gallery/outreach/18.jpg',
  'images/gallery/outreach/19.jpg',
  'images/gallery/outreach/20.jpg',
  'images/gallery/outreach/21.jpg',
  'images/gallery/outreach/22.jpg',
  'images/gallery/outreach/24.jpg', 
  'images/gallery/outreach/25.jpg',
  'images/gallery/outreach/26.jpg',
  'images/gallery/outreach/27.jpg',
  'images/gallery/outreach/28.jpg',
  'images/gallery/outreach/29.jpg',
  'images/gallery/outreach/30.jpg',
  'images/gallery/outreach/31.jpg',
  'images/gallery/outreach/32.jpg',
  'images/gallery/outreach/33.jpg',
  'images/gallery/outreach/34.jpg',
  'images/gallery/outreach/35.jpg',
  'images/gallery/outreach/36.jpg',
  'images/gallery/outreach/37.jpg'

];

function buildPageRecords(year, imageList) {
  return imageList.map((image, index) => ({
    image,
    pageNumber: index + 1,
    // Optional: keep a simple title for alt text
    activityTitle: `${year} Activity ${index + 1}`
  }));
}

const yearbookData = [
  {
    year: 2022,
    badge: 'Silungan ng Pag-asa',
    title: '2022-2023 Edition',
    summary: 'A community initiative focused on providing support, care, and a safe place for individuals and families in need.',
    pages: buildPageRecords(2022 , pages2022),
    editionDetails: {
        activityTitle: 'Silungan ng Pag-asa',
        caption: 'An SCSLAI initiative that extends compassion and assistance to individuals and families in need through community support and outreach.',
        narrative: 'Silungan ng Pag-asa reflects SCSLAI’s commitment to serving the community by providing support and assistance to people facing difficult circumstances. The initiative aims to offer hope, care, and meaningful help to beneficiaries while strengthening the spirit of compassion and solidarity among SCSLAI members and community partners.',
        date: '2022-2023',
        venue: 'Unit-K, 3rd Floor, PJM Building, Belen Street, beside Paco Park in Paco, Manila',
        participants: 'SCSLAI members, volunteers, beneficiaries, and community partners',
        photographer: 'SCSLAI Documentation Team',
        album: 'Silungan ng Pag-asa Collection',
        remarks: 'A meaningful community initiative that provided support and hope to beneficiaries in need.',
        tags: ['2022-2023', 'Silungan ng Pag-asa', 'community', 'outreach', 'support', 'hope']
    }
},
  
{
    year: 2024,
    badge: 'Growing a Greener Future',
    title: '2024 Edition',
    summary: 'Growing a Greener Future.',
    pages: buildPageRecords(2024, pages2024),
    editionDetails: {
        activityTitle: '2024 Tree Planting Activity',
        caption: 'SCSLAI members and volunteers came together in Rizal to help protect the environment and promote a greener future through tree planting.',
        narrative: 'The tree planting activity brought together SCSLAI members, volunteers, and community partners in an effort to contribute to environmental conservation. Through planting and caring for trees, the activity promoted environmental awareness, community participation, and a shared commitment to creating a healthier and greener environment for future generations.',
        date: '2024',
        venue: 'Rizal Province',
        participants: 'SCSLAI members, volunteers, and community partners',
        photographer: 'SCSLAI Documentation Team',
        album: '2024 Tree Planting Activity Collection',
        remarks: 'A meaningful environmental initiative that encouraged community involvement and contributed to the preservation and restoration of green spaces.',
        tags: ['2024', 'tree planting', 'Rizal', 'environment', 'conservation', 'community']
    }
},
 {
    year: 2025,
    badge: 'Serving with Compassion',
    title: '2025 Edition',
    summary: 'Serving with Compassion',
    pages: buildPageRecords(2025, pages2025),
    editionDetails: {
        activityTitle: '2025 Outreach Program for the Aeta Community',
        caption: 'SCSLAI extended care and support to the Aeta community in Calumpang, Pampanga through a meaningful community outreach program.',
        narrative: 'The outreach program brought SCSLAI members, volunteers, and community partners together to extend assistance and support to the Aeta community in Calumpang, Pampanga. The initiative reflects SCSLAI’s commitment to community service by reaching underserved communities, promoting compassion, and strengthening partnerships through meaningful outreach activities.',
        date: '2025',
        venue: 'Calumpang, Pampanga',
        participants: 'SCSLAI members, volunteers, community partners, and Aeta community beneficiaries',
        photographer: 'SCSLAI Documentation Team',
        album: '2025 Aeta Community Outreach Collection',
        remarks: 'A meaningful outreach initiative that strengthened SCSLAI’s commitment to serving and supporting communities in need.',
        tags: ['2025', 'outreach', 'Aeta community', 'Calumpang', 'Pampanga', 'community service']
    }
}
];

function preloadBasePages() {
  if (preloadPromise) return preloadPromise;

  // Combine all image sources for preloading
  const sourcesToPreload = [
    ...pages2022, 
    ...pages2024, 
    ...pages2025
  ];
  
  preloadPromise = Promise.all(sourcesToPreload.map((src) => new Promise(async (resolve) => {
    const resolvedSrc = await preloadImageBlobUrl(src);
    const img = new Image();
    img.decoding = 'sync';
    img.loading = 'eager';

    const finish = () => {
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {}).finally(resolve);
        return;
      }
      resolve();
    };

    img.src = resolvedSrc;
    if (img.complete) {
      finish();
      return;
    }
    img.onload = finish;
    img.onerror = () => resolve();
  })));

  return preloadPromise;
}

const yearbookButtons = document.querySelectorAll('.yearbook-book');
const yearbookReader = document.getElementById('yearbook-reader');
const readerBadge = document.querySelector('[data-reader-badge]');
const readerTitle = document.querySelector('[data-reader-title]');
const readerSummary = document.querySelector('[data-reader-summary]');
const pageFlipHost = document.getElementById('page-flip-host');
let flipbookElement = document.getElementById('flipbook');
const closeReaderButtons = document.querySelectorAll('[data-close-reader]');
const bookOpening = document.getElementById('book-opening');
const bookOpeningLabel = document.querySelector('[data-book-opening-label]');

const detailBindings = {
  activityTitle: document.querySelector('[data-activity-title]'),
  caption: document.querySelector('[data-activity-caption]'),
  narrative: document.querySelector('[data-activity-narrative]'),
  date: document.querySelector('[data-meta-date]'),
  venue: document.querySelector('[data-meta-venue]'),
  participants: document.querySelector('[data-meta-participants]'),
  photographer: document.querySelector('[data-meta-photographer]'),
  album: document.querySelector('[data-meta-album]'),
  remarks: document.querySelector('[data-meta-remarks]'),
  tags: document.querySelector('[data-meta-tags]')
};

let activeYearbookIndex = -1;
let singlePageMode = false;
let activePages = [];
let resizeRaf = null;
let preloadPromise = null;
const resolvedImageSources = new Map();
let flipLock = false;
let currentSpreadStart = 0;
let currentSpreadPage = 1;
let bookOpeningSequence = 0;
let isBookOpening = false;

function getResolvedImageSource(src) {
  return resolvedImageSources.get(src) || src;
}

async function preloadImageBlobUrl(src) {
  if (resolvedImageSources.has(src)) return resolvedImageSources.get(src);

  try {
    const response = await fetch(src, { cache: 'force-cache' });
    if (!response.ok) {
      resolvedImageSources.set(src, src);
      return src;
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    resolvedImageSources.set(src, objectUrl);
    return objectUrl;
  } catch (error) {
    resolvedImageSources.set(src, src);
    return src;
  }
}

function isSinglePageMode() {
  return window.innerWidth <= 820;
}

function getFlipSize() {
  const maxWidth = Math.min(1100, Math.floor(window.innerWidth * 0.86));
  if (singlePageMode) {
    return {
      width: Math.max(300, Math.floor(maxWidth * 0.52)),
      height: Math.max(420, Math.floor(maxWidth * 0.52 * 1.38))
    };
  }

  const spreadWidth = Math.max(600, maxWidth);
  return {
    width: spreadWidth,
    height: Math.max(420, Math.floor(spreadWidth * 0.43))
  };
}

function setActiveDetails(pageNumber) {
  const page = activePages[Math.max(0, Math.min(activePages.length - 1, pageNumber - 1))];
  if (!page) return;

  detailBindings.activityTitle.textContent = page.activityTitle;
  detailBindings.caption.textContent = page.caption;
  detailBindings.narrative.textContent = page.narrative;
  detailBindings.date.textContent = page.date;
  detailBindings.venue.textContent = page.venue;
  detailBindings.participants.textContent = page.participants;
  detailBindings.photographer.textContent = page.photographer;
  detailBindings.album.textContent = page.album;
  detailBindings.remarks.textContent = page.remarks;
  detailBindings.tags.textContent = page.tags.join(', ');
}

function currentLogicalPage() {
  return currentSpreadPage;
}

function updateReaderStatus() {
  const page = currentLogicalPage();
  setActiveDetails(page);
}

function getPageAt(index) {
  if (index < 0 || index >= activePages.length) return null;
  return activePages[index];
}

function pageMarkup(page) {
  if (!page) {
    return '<section class="album-page"><article class="print-layout blank-page"></article></section>';
  }

  return `
    <section class="album-page ${page.pageNumber % 2 === 0 ? 'album-page-right' : 'album-page-left'}" data-page-number="${page.pageNumber}">
      <article class="print-layout">
        <h3 class="layout-title"></h3>
        <figure class="scrap-card">
          <span class="tape tape-tl" aria-hidden="true"></span>
          <span class="tape tape-tr" aria-hidden="true"></span>
          <span class="tape tape-bl" aria-hidden="true"></span>
          <span class="tape tape-br" aria-hidden="true"></span>
          <div class="photo-mat">
            <img src="${getResolvedImageSource(page.image)}" alt="${page.activityTitle}" loading="eager" decoding="sync" fetchpriority="high" draggable="false">
          </div>
        </figure>
        
        <p class="layout-page-number">Page ${page.pageNumber} of ${activePages.length}</p>
      </article>
    </section>
  `;
}

function buildBookShell() {
  const size = getFlipSize();
  flipbookElement.style.width = `${size.width}px`;
  flipbookElement.style.height = `${size.height}px`;

  flipbookElement.innerHTML = `
    <div class="book3d" data-book3d>
      <div class="book-half left" data-static-left></div>
      <div class="book-half right" data-static-right></div>
      <div class="turn-sheet" data-turn-sheet hidden>
        <div class="turn-face turn-front" data-turn-front></div>
        <div class="turn-face turn-back" data-turn-back></div>
        <div class="turn-shadow" data-turn-shadow></div>
      </div>
    </div>
  `;
}

function renderStaticSpread() {
  const left = getPageAt(currentSpreadStart);
  const right = getPageAt(currentSpreadStart + 1);

  const leftEl = flipbookElement.querySelector('[data-static-left]');
  const rightEl = flipbookElement.querySelector('[data-static-right]');
  if (!leftEl || !rightEl) return;

  leftEl.innerHTML = pageMarkup(left);
  rightEl.innerHTML = pageMarkup(right);

  currentSpreadPage = (left?.pageNumber || right?.pageNumber || 1);
  // updateReaderStatus(); // Removed - details are now set per-edition, not per-page
}

function animateForwardTurn() {
  if (flipLock) return;
  const right = getPageAt(currentSpreadStart + 1);
  const nextLeft = getPageAt(currentSpreadStart + 2);
  const nextRight = getPageAt(currentSpreadStart + 3);
  if (!right || !nextLeft) return;

  flipLock = true;

  const rightEl = flipbookElement.querySelector('[data-static-right]');
  const sheet = flipbookElement.querySelector('[data-turn-sheet]');
  const front = flipbookElement.querySelector('[data-turn-front]');
  const back = flipbookElement.querySelector('[data-turn-back]');
  if (!rightEl || !sheet || !front || !back) {
    flipLock = false;
    return;
  }

  rightEl.innerHTML = pageMarkup(nextRight);
  front.innerHTML = pageMarkup(right);
  back.innerHTML = pageMarkup(nextLeft);

  sheet.hidden = false;
  sheet.classList.remove('turn-backward', 'animate');
  sheet.classList.add('turn-forward');

  void sheet.offsetWidth;
  sheet.classList.add('animate');

  window.setTimeout(() => {
    currentSpreadStart += 2;
    renderStaticSpread();
    sheet.hidden = true;
    sheet.classList.remove('turn-forward', 'animate');
    flipLock = false;
  }, 1120);
}

function animateBackwardTurn() {
  if (flipLock) return;
  const left = getPageAt(currentSpreadStart);
  const prevLeft = getPageAt(currentSpreadStart - 2);
  const prevRight = getPageAt(currentSpreadStart - 1);
  if (!left || !prevLeft || !prevRight) return;

  flipLock = true;

  const leftEl = flipbookElement.querySelector('[data-static-left]');
  const sheet = flipbookElement.querySelector('[data-turn-sheet]');
  const front = flipbookElement.querySelector('[data-turn-front]');
  const back = flipbookElement.querySelector('[data-turn-back]');
  if (!leftEl || !sheet || !front || !back) {
    flipLock = false;
    return;
  }

  leftEl.innerHTML = pageMarkup(prevLeft);
  front.innerHTML = pageMarkup(left);
  back.innerHTML = pageMarkup(prevRight);

  sheet.hidden = false;
  sheet.classList.remove('turn-forward', 'animate');
  sheet.classList.add('turn-backward');

  void sheet.offsetWidth;
  sheet.classList.add('animate');

  window.setTimeout(() => {
    currentSpreadStart -= 2;
    renderStaticSpread();
    sheet.hidden = true;
    sheet.classList.remove('turn-backward', 'animate');
    flipLock = false;
  }, 1120);
}

function initTurnJs(pages, startPage) {
  if (!flipbookElement) return;

  singlePageMode = isSinglePageMode();
  pageFlipHost.classList.toggle('single-page', singlePageMode);
  activePages = pages.slice();

  const safeStart = Math.max(1, Math.min(activePages.length, startPage || 1));
  currentSpreadStart = Math.max(0, safeStart - 1);
  if (currentSpreadStart % 2 !== 0) {
    currentSpreadStart -= 1;
  }

  buildBookShell();
  renderStaticSpread();
}

function setActiveYearbookCard(index) {
  yearbookButtons.forEach((button, idx) => {
    button.classList.toggle('is-selected', idx === index);
  });
}

async function openReader(index, startPage) {
  const edition = yearbookData[index];
  if (!edition || !yearbookReader) return;

  await preloadBasePages();

  activeYearbookIndex = index;
  readerBadge.textContent = `SCSLAI CARES ${edition.year}`;
  readerTitle.textContent = edition.title;
  readerSummary.textContent = edition.summary;
  setActiveYearbookCard(index);

  // Set edition-level details once (NEW CODE)
  if (edition.editionDetails) {
    detailBindings.activityTitle.textContent = edition.editionDetails.activityTitle;
    detailBindings.caption.textContent = edition.editionDetails.caption;
    detailBindings.narrative.textContent = edition.editionDetails.narrative;
    detailBindings.date.textContent = edition.editionDetails.date;
    detailBindings.venue.textContent = edition.editionDetails.venue;
    detailBindings.participants.textContent = edition.editionDetails.participants;
    detailBindings.photographer.textContent = edition.editionDetails.photographer;
    detailBindings.album.textContent = edition.editionDetails.album;
    detailBindings.remarks.textContent = edition.editionDetails.remarks;
    detailBindings.tags.textContent = edition.editionDetails.tags.join(', ');
  }

  initTurnJs(edition.pages, startPage || 1);
  yearbookReader.hidden = false;
  yearbookReader.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
}

function hasReducedMotionPreference() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function cancelBookOpening() {
  if (!isBookOpening) return;

  bookOpeningSequence += 1;
  isBookOpening = false;
  bookOpening?.classList.remove('is-playing');
  if (bookOpening) {
    bookOpening.hidden = true;
    bookOpening.setAttribute('aria-hidden', 'true');
  }
  yearbookButtons.forEach((button) => button.classList.remove('is-opening'));
  setActiveYearbookCard(-1);
  document.body.style.overflow = '';
}

async function openReaderAfterBookOpening(index, startPage) {
  const edition = yearbookData[index];
  if (!edition || !yearbookReader) return;

  if (!bookOpening) {
    openReader(index, startPage);
    return;
  }

  if (isBookOpening) return;

  const sequence = ++bookOpeningSequence;
  isBookOpening = true;
  setActiveYearbookCard(index);
  const selectedBook = yearbookButtons[index];
  selectedBook?.classList.add('is-opening');

  const cardTransitionDuration = hasReducedMotionPreference() ? 0 : 560;
  await new Promise((resolve) => window.setTimeout(resolve, cardTransitionDuration));

  if (sequence !== bookOpeningSequence) {
    selectedBook?.classList.remove('is-opening');
    return;
  }

  selectedBook?.classList.remove('is-opening');
  if (bookOpeningLabel) {
    bookOpeningLabel.textContent = `Opening ${edition.title}`;
  }

  bookOpening.hidden = false;
  bookOpening.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  bookOpening.classList.remove('is-playing');
  void bookOpening.offsetWidth;
  bookOpening.classList.add('is-playing');

  const animationDuration = hasReducedMotionPreference() ? 0 : 5700;
  await Promise.all([
    preloadBasePages(),
    new Promise((resolve) => window.setTimeout(resolve, animationDuration))
  ]);

  if (sequence !== bookOpeningSequence) return;

  isBookOpening = false;
  bookOpening.classList.remove('is-playing');
  bookOpening.hidden = true;
  bookOpening.setAttribute('aria-hidden', 'true');
  await openReader(index, startPage);
}

function closeReader() {
  if (!yearbookReader) return;
  yearbookReader.hidden = true;
  yearbookReader.classList.remove('is-visible');
  document.body.style.overflow = '';
}

function resizeActiveFlipbook() {
  if (yearbookReader?.hidden) return;
  if (!flipbookElement) return;

  const nextSingleMode = isSinglePageMode();
  if (nextSingleMode !== singlePageMode) {
    singlePageMode = nextSingleMode;
  }

  const size = getFlipSize();
  flipbookElement.style.width = `${size.width}px`;
  flipbookElement.style.height = `${size.height}px`;
}

function turnNext() {
  animateForwardTurn();
}

function turnPrevious() {
  animateBackwardTurn();
}

function turnFromSide(side) {
  if (side === 'right') turnNext();
  if (side === 'left') turnPrevious();
}

function setupPageNavigation() {
  if (!pageFlipHost) return;

  let lastTouchTime = 0;

  const handleHostTurn = (clientX, clientY) => {
    const rect = pageFlipHost.getBoundingClientRect();
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;

    const localX = clientX - rect.left;
    if (localX > rect.width * 0.5) {
      turnFromSide('right');
    } else {
      turnFromSide('left');
    }
  };

  pageFlipHost.addEventListener('click', (event) => {
    if (Date.now() - lastTouchTime < 450) return;
    handleHostTurn(event.clientX, event.clientY);
  }, true);

  let touchStartX = 0;
  let touchStartY = 0;
  pageFlipHost.addEventListener('touchstart', (event) => {
    lastTouchTime = Date.now();
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true, capture: true });

  pageFlipHost.addEventListener('touchend', (event) => {
    lastTouchTime = Date.now();
    const delta = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(delta) < 18 && Math.abs(deltaY) < 18) {
      handleHostTurn(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
      return;
    }
    if (Math.abs(delta) < 40) return;
    if (delta < 0) turnNext();
    if (delta > 0) turnPrevious();
  }, { passive: true, capture: true });

  document.addEventListener('keydown', (event) => {
    if (yearbookReader?.hidden) return;
    if (event.key === 'Escape') {
      closeReader();
      return;
    }
    if (event.key === 'ArrowRight') {
      turnNext();
      event.preventDefault();
    }
    if (event.key === 'ArrowLeft') {
      turnPrevious();
      event.preventDefault();
    }
  });
}

yearbookButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const index = Number(button.getAttribute('data-yearbook-index'));
    openReaderAfterBookOpening(index, 1);
  });
});

closeReaderButtons.forEach((button) => {
  button.addEventListener('click', closeReader);
});

yearbookReader?.addEventListener('click', (event) => {
  if (event.target === yearbookReader || event.target.classList.contains('reader-overlay')) {
    closeReader();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isBookOpening) {
    cancelBookOpening();
  }
});

window.addEventListener('resize', () => {
  if (resizeRaf) {
    window.cancelAnimationFrame(resizeRaf);
  }
  resizeRaf = window.requestAnimationFrame(() => {
    resizeActiveFlipbook();
    resizeRaf = null;
  });
});

setupPageNavigation();
preloadBasePages();

const slides = document.querySelectorAll('.carousel-slide');
const nextButton = document.querySelector('.carousel-control.next');
const prevButton = document.querySelector('.carousel-control.prev');
let currentIndex = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function startCarousel() {
  slideInterval = setInterval(nextSlide, 10000);
}

function resetCarousel() {
  clearInterval(slideInterval);
  startCarousel();
}

if (slides.length > 0) {
  showSlide(0);
  startCarousel();
}

const announcementImages = [
  {src: 'images/Annoncements/calamity-loan-2.png', alt: 'Final Educational Poster'},
  {src: 'images/Annoncements/Authority-to-deduct.jpg', alt: 'Announcement 1'},
  {src: 'images/Annoncements/TLA.jpg', alt: 'Announcement 3'},
  {src: 'images/Annoncements/STD-FINAL.png', alt: 'Announcement 2'},
  {src: 'images/Annoncements/anniv.png', alt: 'ANNIVERSARY'}
];
const announcementImg = document.querySelector('.announcement-posters img');
let announcementIndex = 0;

function showAnnouncement(index) {
  if (!announcementImg) return;
  announcementImg.classList.remove('slide-up');
  announcementImg.style.animation = 'none';
  announcementImg.offsetWidth;
  announcementImg.style.animation = '';
  announcementImg.src = announcementImages[index].src;
  announcementImg.alt = announcementImages[index].alt;
  announcementImg.classList.add('slide-up');
  announcementIndex = index;
}

function nextAnnouncement() {
  const nextIndex = (announcementIndex + 1) % announcementImages.length;
  showAnnouncement(nextIndex);
}

if (announcementImg) {
  announcementImg.classList.add('slide-up');
  setInterval(nextAnnouncement, 15000);
}

const galleryItems = document.querySelectorAll('.gallery-item');
let galleryOverlay = document.querySelector('.gallery-overlay');
let galleryHideTimer;
let activeGalleryImage = null;

if (!galleryOverlay) {
  galleryOverlay = document.createElement('div');
  galleryOverlay.className = 'gallery-overlay';
  galleryOverlay.innerHTML = '<img alt=""><div class="gallery-overlay-text">Click outside to close</div>';
  document.body.appendChild(galleryOverlay);
}

const galleryOverlayImage = galleryOverlay.querySelector('img');

function showGalleryOverlay(image) {
  clearTimeout(galleryHideTimer);
  galleryOverlayImage.src = image.src;
  galleryOverlayImage.alt = image.alt;
  galleryOverlay.classList.add('visible');
  activeGalleryImage = image;
}

function hideGalleryOverlay() {
  clearTimeout(galleryHideTimer);
  galleryOverlay.classList.remove('visible');
  activeGalleryImage = null;
}

galleryItems.forEach((item) => {
  const image = item.querySelector('img');
  if (!image) return;

  item.addEventListener('click', () => {
    if (activeGalleryImage === image && galleryOverlay.classList.contains('visible')) {
      hideGalleryOverlay();
      return;
    }

    showGalleryOverlay(image);
  });
});

galleryOverlay.addEventListener('click', (event) => {
  if (event.target === galleryOverlay) {
    hideGalleryOverlay();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideGalleryOverlay();
  }
});

nextButton?.addEventListener('click', () => {
  nextSlide();
  resetCarousel();
});

prevButton?.addEventListener('click', () => {
  prevSlide();
  resetCarousel();
});

// Mobile navigation toggle
const siteHeader = document.querySelector('header');
const siteNav = document.querySelector('header nav');
let navToggle = null;
const NAV_BREAKPOINT = 1100;

if (siteHeader && siteNav) {
  if (!siteNav.id) {
    siteNav.id = 'site-navigation';
  }

  navToggle = document.createElement('button');
  navToggle.type = 'button';
  navToggle.className = 'nav-toggle';
  navToggle.setAttribute('aria-label', 'Toggle navigation menu');
  navToggle.setAttribute('aria-controls', siteNav.id);
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

  siteHeader.appendChild(navToggle);

  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = siteHeader.classList.toggle('nav-open');
    navToggle?.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > NAV_BREAKPOINT || !siteHeader.classList.contains('nav-open')) {
      return;
    }

    if (!siteHeader.contains(event.target)) {
      siteHeader.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > NAV_BREAKPOINT) {
      siteHeader.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

// Dropdown should always open when ABOUT US is clicked
const dropbtn = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');

if (dropbtn && dropdown) {
  dropbtn.addEventListener('click', (e) => {
    e.stopPropagation();

    const isMobile = window.innerWidth <= NAV_BREAKPOINT;
    const willOpen = isMobile ? !dropdown.classList.contains('open') : true;

    dropdown.classList.toggle('open', willOpen);
    dropbtn.setAttribute('aria-expanded', String(willOpen));
  });

  document.addEventListener('click', (e) => {
    const isClickInsideDropdown = dropdown.contains(e.target);
    if (!isClickInsideDropdown && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      dropbtn.setAttribute('aria-expanded', 'false');
    }
  });

  dropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      dropdown.classList.remove('open');
      dropbtn.setAttribute('aria-expanded', 'false');

      if (window.innerWidth <= NAV_BREAKPOINT && siteHeader?.classList.contains('nav-open')) {
        siteHeader.classList.remove('nav-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

siteNav?.querySelectorAll(':scope > a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= NAV_BREAKPOINT && siteHeader?.classList.contains('nav-open')) {
      siteHeader.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Close dropdown on Escape
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    if (dropdown && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      dropbtn?.setAttribute('aria-expanded', 'false');
      dropbtn?.focus();
    }

    if (siteHeader?.classList.contains('nav-open')) {
      siteHeader.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.focus();
    }
  }
});

// Calculator popup
const calculatorLinks = document.querySelectorAll('a[href="calculator.html"]');
let calculatorModal = document.querySelector('[data-calculator-modal]');
let openCalculatorButton = document.querySelector('[data-open-calculator]');
let closeCalculatorButton = document.querySelector('[data-close-calculator]');
let calculatorTabs = document.querySelectorAll('[data-court-tab]');
let calculatorPanels = document.querySelectorAll('[data-court-panel]');
let supremeLoanType = document.querySelector('[data-loan-type]');
let supremeLoanAmount = document.querySelector('[data-loan-amount]');
let supremeDesiredLoanAmount = document.querySelector('[data-desired-loan-amount]');
let supremeLoanTerm = document.querySelector('[data-loan-term]');
let supremeTakeHomePay = document.querySelector('[data-take-home-pay]');
let supremeEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay]');
let supremeComputeButton = document.querySelector('[data-compute-supreme]');
let supremeResult = document.querySelector('[data-supreme-result]');
let lowerLoanType = document.querySelector('[data-loan-type-lower]');
let lowerLoanAmount = document.querySelector('[data-loan-amount-lower]');
let lowerDesiredLoanAmount = document.querySelector('[data-desired-loan-amount-lower]');
let lowerLoanTerm = document.querySelector('[data-loan-term-lower]');
let lowerTakeHomePay = document.querySelector('[data-take-home-pay-lower]');
let lowerEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay-lower]');
let lowerComputeButton = document.querySelector('[data-compute-lower]');
let lowerResult = document.querySelector('[data-lower-result]');

// Source: UPDATED LOAN MATRIX.xlsx, Sheet1. Zero/blank cells in the workbook
// mean that the corresponding term is not available.
const loanMatrix = {
  supreme: {
    regular: [
      { id: 'allowanceCasual', label: 'Allowance Loan (Casual)', rates: { 1: 12, 2: 12 }, max: 40000 },
      { id: 'allowance', label: 'Allowance Loan', rates: { 1: 12, 2: 12, 3: 12, 4: 12, 5: 12 }, max: 130000 },
      { id: 'business', label: 'Business Loan', rates: { 1: 12, 2: 12, 3: 12, 4: 12, 5: 12 } },
      { id: 'character', label: 'Character Loan', rates: { 1: 12, 2: 12, 3: 15 } },
      { id: 'educationalCasual', label: 'Educational Loan (Casual)', rates: { 1: 12, 2: 12 }, max: 200000 },
      { id: 'educational', label: 'Educational Loan', rates: { 1: 12, 2: 12, 3: 15, 4: 15, 5: 15 }, max: 200000 },
      { id: 'emergencyRata', label: 'Emergency RATA Loan', rates: { 1: 12, 2: 12 } },
      { id: 'equitable', label: 'Equitable Loan', rates: { 1: 10 } },
      { id: 'equity', label: 'Equity Loan', rates: { 1: 12, 2: 12, 3: 15, 4: 15, 5: 15 } },
      { id: 'healthEmergency', label: 'Health Emergency Loan PR', rates: { 1: 12, 2: 12, 3: 12 }, max: 400000 },
      { id: 'help', label: 'Help Loan DIR', rates: { 1: 12, 2: 12, 3: 12 } },
      { id: 'housing', label: 'Housing Loan', rates: { 1: 8, 2: 8, 3: 8, 4: 8, 5: 8 }, min: 600000, max: 2000000 },
      { id: 'longTerm', label: 'Long Term Loan', rates: { 1: 12, 2: 12, 3: 15, 4: 15, 5: 15 } },
      { id: 'maxi', label: 'Maxi Loan', rates: { 1: 6, 2: 8, 3: 10, 4: 12, 5: 14 }, min: 100000, max: 550000 },
      { id: 'mealCasual', label: 'MEAL (Casual)', rates: { 1: 8, 2: 8 }, max: 50000 },
      { id: 'meal', label: 'MEAL', rates: { 2: 8, 3: 10 }, min: 50000, max: 300000 },
      { id: 'salaryEmergency', label: 'Salary Emergency Loan', rates: { 2: 12 } },
      { id: 'multiPurpose', label: 'Multi-Purpose Loan', rates: { 1: 12, 2: 12, 3: 15 }, max: 100000 },
      { id: 'motorcycle', label: 'Motorcycle Loan', rates: { 4: 18, 5: 18 } },
      { id: 'petty', label: 'Petty Loan', rates: { 1: 5 }, max: 150000 },
      { id: 'subsistence', label: 'Subsistence Loan', rates: { 1: 12, 2: 12 }, max: 100000 }
    ],
    special: [
      { id: 'anniversary', label: 'Anniversary Loan', monthlyRate: 1, max: 10000 },
      { id: 'cashGift', label: 'Cash Gift', monthlyRate: 1, max: 10000 },
      { id: 'economicAssistance1', label: 'Emergency Economic Assistance 1', monthlyRate: 1 },
      { id: 'economicAssistance2', label: 'Emergency Economic Assistance 2', monthlyRate: 1 },
      { id: 'midYearBonus', label: 'Mid Year Bonus', monthlyRate: 1 },
      { id: 'yearEndBonus', label: 'Year End Bonus', monthlyRate: 1 }
    ],
    occasional: [
      { id: 'calamity2', label: 'Calamity Loan II', rates: { 1: 5, 2: 5, 3: 5 }, min: 50000, max: 150000 },
      { id: 'calamity-2 Casual', label: 'Calamity Loan II (Casual)', rates: { 1: 5, 2: 5 }, min: 50000, max: 150000 },
      { id: 'inflationAssistance', label: 'Inflation Assistance Loan', rates: { 1: 5, 2: 5, 3: 5 }, min: 20000, max: 120000 }
    ]
  },
  lower: {
    regular: [
      { id: 'allowance', label: 'Allowance Loan', rates: { 1: 12, 2: 12, 3: 12, 4: 12, 5: 12 }, max: 130000 },
      { id: 'allowanceCasual', label: 'Allowance Loan (Casual)', rates: { 1: 12, 2: 12 }, max: 40000 },
      { id: 'business', label: 'Business Loan', rates: { 1: 12, 2: 12, 3: 12, 4: 12, 5: 12 } },
      { id: 'educational', label: 'Educational Loan', rates: { 1: 12, 2: 12, 3: 15, 4: 15, 5: 15 } },
      { id: 'educationalCasual', label: 'Educational Loan (Casual)', rates: { 1: 12, 2: 12 }, max: 200000 },
      { id: 'emergencyRata', label: 'Emergency RATA Loan', rates: { 1: 12, 2: 12 } },
      { id: 'healthEmergency', label: 'Health Emergency Loan PR', rates: { 1: 12, 2: 12, 3: 12 }, max: 400000 },
      { id: 'housing', label: 'Housing Loan', rates: { 1: 8, 2: 8, 3: 8, 4: 8, 5: 8 }, min: 600000, max: 2000000 },
      { id: 'maxi', label: 'Maxi Loan', rates: { 1: 6, 2: 8, 3: 10, 4: 12, 5: 14 }, max: 500000 },
      { id: 'meal', label: 'MEAL', rates: { 2: 8, 3: 10 }, min: 50000, max: 150000 },
      { id: 'mealCasual', label: 'MEAL (Casual)', rates: { 1: 8, 2: 8 }, max: 40000 },
      { id: 'salaryEmergency', label: 'Salary Emergency Loan', rates: { 2: 12 } },
      { id: 'multiPurpose', label: 'Multi-Purpose Loan', rates: { 1: 12, 2: 12, 3: 15 }, max: 100000 },
      { id: 'salary', label: 'Salary Loan', rates: { 1: 12, 2: 12, 3: 15, 4: 15, 5: 15 } }
    ],
    special: [
      { id: 'anniversary', label: 'Anniversary Loan', monthlyRate: 1, max: 10000 },
      { id: 'cashGift', label: 'Cash Gift', monthlyRate: 1, max: 10000 },
      { id: 'economicAssistance1', label: 'Emergency Economic Assistance 1', monthlyRate: 1 },
      { id: 'economicAssistance2', label: 'Emergency Economic Assistance 2', monthlyRate: 1 },
      { id: 'midYearBonus', label: 'Mid Year Bonus', monthlyRate: 1 },
      { id: 'yearEnd', label: 'Year End', monthlyRate: 1 }
    ],
    occasional: [
      { id: 'calamity2', label: 'Calamity Loan II', rates: { 1: 5, 2: 5, 3: 5 }, min: 50000, max: 150000 },
      { id: 'calamity2Casual', label: 'Calamity Loan II (Casual)', rates: { 1: 5, 2: 5 }, min: 50000, max: 150000 },
      { id: 'inflationAssistance', label: 'Inflation Assistance Loan', rates: { 1: 5, 2: 5, 3: 5 }, min: 20000, max: 120000 }
    ]
  }
};

const minimumRetainedTakeHomePay = 5000;

function clearCalculatedLoanAmount(court) {
  const elements = getLoanElements(court);

  if (!elements.loanAmount) return;

  elements.loanAmount.value = '';
  elements.loanAmount.placeholder = 'Calculated from eligible take-home pay';
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2
  }).format(value);
}

function parseAmountInput(value) {
  if (typeof value !== 'string') return Number.NaN;
  const cleaned = value.replace(/,/g, '').trim();
  return cleaned ? Number(cleaned) : Number.NaN;
}

function formatAmountInput(value) {
  const cleaned = String(value || '').replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  const integerPart = (parts[0] || '').replace(/^0+(?=\d)/, '');
  const decimalPart = parts.slice(1).join('');
  const grouped = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (parts.length > 1) {
    return `${grouped || '0'}.${decimalPart}`;
  }

  return grouped;
}

function pmt(annualRate, years, loanAmount) {
  const monthlyRate = annualRate / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }

  return (monthlyRate * loanAmount) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
}

function getFactorRate(annualRate, years) {
  return pmt(annualRate, years, 1);
}

function createCalculatorModal() {
  if (calculatorModal) return calculatorModal;

  const modal = document.createElement('div');
  modal.className = 'calculator-modal';
  modal.setAttribute('data-calculator-modal', '');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="calculator-dialog" role="dialog" aria-modal="true" aria-labelledby="calculator-title">
      <button class="calculator-close" type="button" aria-label="Close calculator" data-close-calculator>&times;</button>

      <div class="calculator-dialog-header">
        <p class="calculator-eyebrow">SCSLAI Calculator</p>
        <h2 id="calculator-title">Select your member type</h2>
      </div>

      <div class="calculator-tabs" role="tablist" aria-label="Member type">
        <button class="calculator-tab active" type="button" data-court-tab="supreme" aria-selected="true">SUPREME COURT</button>
        <button class="calculator-tab" type="button" data-court-tab="lower" aria-selected="false">LOWER COURT</button>
      </div>

      <div class="calculator-panel active" data-court-panel="supreme">
        <div class="calculator-grid">
          <div class="calculator-field calculator-field--full">
            <label for="supreme-take-home-pay">Current Take-Home Pay</label>
            <input id="supreme-take-home-pay" type="text" inputmode="decimal" placeholder="Enter current take-home pay" data-take-home-pay>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="supreme-eligible-take-home-pay">Eligible Take-Home Pay</label>
            <input id="supreme-eligible-take-home-pay" type="text" readonly placeholder="Calculated from current take-home pay" data-eligible-take-home-pay>
          </div>

          <div class="calculator-field">
            <label for="supreme-loan-type">Loan Type</label>
            <select id="supreme-loan-type" data-loan-type></select>
          </div>

          <div class="calculator-field">
            <label for="supreme-loan-amount">Eligible Loan Amount</label>
            <input id="supreme-loan-amount" type="text" readonly placeholder="Calculated from eligible take-home pay" data-loan-amount>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="supreme-desired-loan-amount">Desired Loan Amount (Optional)</label>
            <input id="supreme-desired-loan-amount" type="text" inputmode="decimal" placeholder="Enter desired amount" data-desired-loan-amount>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="supreme-loan-term">Loan Term</label>
            <select id="supreme-loan-term" data-loan-term></select>
          </div>
        </div>

        <div class="calculator-actions">
          <button class="calculator-compute" type="button" data-compute-supreme>Compute</button>
        </div>

        <div class="calculator-result" data-supreme-result>
          <strong>Loan Amortization</strong>
          <span>Your eligible loan amount appears here.</span>
        </div>

        <div class="calculator-note">
          <strong>Note:</strong>
          <span>The calculation is based on the information you provide. To determine your Eligible Loan Amount, ₱5,000 is deducted from your take-home pay to ensure that your remaining pay does not fall below ₱5,000.</span>

          <div class="calculator-notice">
            <strong>Privacy Notice:</strong>
            <span>The information you enter into this calculator is used only to calculate your estimated loan amount. The website does not store, collect, or save any information you provide.</span>
          </div>
          
        </div>

      </div>

      <div class="calculator-panel" data-court-panel="lower">
        <div class="calculator-lower-copy">
        </div>

        <div class="calculator-grid">
          <div class="calculator-field calculator-field--full">
            <label for="lower-take-home-pay">Current Take-Home Pay</label>
            <input id="lower-take-home-pay" type="text" inputmode="decimal" placeholder="Enter current take-home pay" data-take-home-pay-lower>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="lower-eligible-take-home-pay">Eligible Take-Home Pay</label>
            <input id="lower-eligible-take-home-pay" type="text" readonly placeholder="Calculated from current take-home pay" data-eligible-take-home-pay-lower>
          </div>

          <div class="calculator-field">
            <label for="lower-loan-type">Loan Type</label>
            <select id="lower-loan-type" data-loan-type-lower></select>
          </div>

          <div class="calculator-field">
            <label for="lower-loan-amount">Eligible Loan Amount</label>
            <input id="lower-loan-amount" type="text" readonly placeholder="Calculated from eligible take-home pay" data-loan-amount-lower>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="lower-desired-loan-amount">Desired Loan Amount (Optional)</label>
            <input id="lower-desired-loan-amount" type="text" inputmode="decimal" placeholder="Enter desired amount" data-desired-loan-amount-lower>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="lower-loan-term">Loan Term</label>
            <select id="lower-loan-term" data-loan-term-lower></select>
          </div>
        </div>

        <div class="calculator-actions">
          <button class="calculator-compute" type="button" data-compute-lower>Compute</button>
        </div>

        <div class="calculator-result calculator-result-muted" data-lower-result>
          <strong>Loan Amortization</strong>
          <span>Your eligible loan amount appears here.</span>
        </div>

        <div class="calculator-note">
          <strong>Note:</strong>
          <span>The calculation is based on the information you provide. To determine your Eligible Loan Amount, ₱5,000 is deducted from your take-home pay to ensure that your remaining pay does not fall below ₱5,000.</span>

          <div class="calculator-notice">
            <strong>Privacy Notice:</strong>
            <span>The information you enter into this calculator is used only to calculate your estimated loan amount. The website does not store, collect, or save any information you provide.</span>
          </div>
          
        </div>
        
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}

function getLoanDefinitions(court) {
  return Object.values(loanMatrix[court]).flat();
}

function getLoanDefinition(court, loanType) {
  return getLoanDefinitions(court).find((loan) => loan.id === loanType);
}

function getLoanTypeOptions(court) {
  const categoryLabels = {
    regular: 'Regular Loans',
    special: 'Special Loans (1% per month)',
    occasional: 'Occasional Loans'
  };

  return Object.entries(loanMatrix[court])
    .map(([category, loans]) => {
      const options = loans
        .map((loan) => `<option value="${loan.id}">${loan.label}</option>`)
        .join('');
      return `<optgroup label="${categoryLabels[category]}">${options}</optgroup>`;
    })
    .join('');
}

function getLoanElements(court) {
  return court === 'lower'
    ? {
        loanType: lowerLoanType,
        loanAmount: lowerLoanAmount,
        desiredLoanAmount: lowerDesiredLoanAmount,
        loanTerm: lowerLoanTerm,
        takeHomePay: lowerTakeHomePay,
        eligibleTakeHomePay: lowerEligibleTakeHomePay,
        result: lowerResult
      }
    : {
        loanType: supremeLoanType,
        loanAmount: supremeLoanAmount,
        desiredLoanAmount: supremeDesiredLoanAmount,
        loanTerm: supremeLoanTerm,
        takeHomePay: supremeTakeHomePay,
        eligibleTakeHomePay: supremeEligibleTakeHomePay,
        result: supremeResult
      };
}

function getEligibleMonthlyAmortization(takeHomePay) {
  return Math.max(takeHomePay - minimumRetainedTakeHomePay, 0);
}

function updateEligibleTakeHomePay(court) {
  const elements = getLoanElements(court);
  if (!elements.takeHomePay || !elements.eligibleTakeHomePay) return;

  const takeHomePay = parseAmountInput(elements.takeHomePay.value);
  elements.eligibleTakeHomePay.value = Number.isFinite(takeHomePay) && takeHomePay > 0
    ? formatCurrency(getEligibleMonthlyAmortization(takeHomePay))
    : '';
}

function updateLoanTerms(court, loanType) {
  const elements = getLoanElements(court);
  if (!elements.loanTerm) return;

  const loan = getLoanDefinition(court, loanType);
  const terms = Object.keys(loan?.rates || {}).map(Number).sort((a, b) => a - b);

  if (terms.length === 0) {
    elements.loanTerm.disabled = true;
    elements.loanTerm.innerHTML = '<option value="">Term not listed in the updated matrix</option>';
    return;
  }

  elements.loanTerm.disabled = false;
  elements.loanTerm.innerHTML = terms
    .map((term) => `<option value="${term}">${term} Year${term > 1 ? 's' : ''}</option>`)
    .join('');
}

function openCalculator() {
  calculatorModal = createCalculatorModal();
  openCalculatorButton = document.querySelector('[data-open-calculator]');
  closeCalculatorButton = document.querySelector('[data-close-calculator]');
  calculatorTabs = document.querySelectorAll('[data-court-tab]');
  calculatorPanels = document.querySelectorAll('[data-court-panel]');
  supremeLoanType = document.querySelector('[data-loan-type]');
  supremeLoanAmount = document.querySelector('[data-loan-amount]');
  supremeDesiredLoanAmount = document.querySelector('[data-desired-loan-amount]');
  supremeLoanTerm = document.querySelector('[data-loan-term]');
  supremeTakeHomePay = document.querySelector('[data-take-home-pay]');
  supremeEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay]');
  supremeComputeButton = document.querySelector('[data-compute-supreme]');
  supremeResult = document.querySelector('[data-supreme-result]');
  lowerLoanType = document.querySelector('[data-loan-type-lower]');
  lowerLoanAmount = document.querySelector('[data-loan-amount-lower]');
  lowerDesiredLoanAmount = document.querySelector('[data-desired-loan-amount-lower]');
  lowerLoanTerm = document.querySelector('[data-loan-term-lower]');
  lowerTakeHomePay = document.querySelector('[data-take-home-pay-lower]');
  lowerEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay-lower]');
  lowerComputeButton = document.querySelector('[data-compute-lower]');
  lowerResult = document.querySelector('[data-lower-result]');

  if (supremeLoanType) {
    supremeLoanType.innerHTML = getLoanTypeOptions('supreme');
  }

  if (lowerLoanType) {
    lowerLoanType.innerHTML = getLoanTypeOptions('lower');
  }

  if (!calculatorModal) return;
  calculatorModal.classList.add('open');
  document.body.classList.add('calculator-modal-open');
  calculatorModal.setAttribute('aria-hidden', 'false');

  if (supremeLoanType && supremeLoanTerm) {
    updateLoanTerms('supreme', supremeLoanType.value);
    clearCalculatedLoanAmount('supreme');

    if (supremeTakeHomePay) {
      supremeTakeHomePay.value = '';
    }

    if (supremeEligibleTakeHomePay) {
      supremeEligibleTakeHomePay.value = '';
    }

    if (supremeDesiredLoanAmount) {
      supremeDesiredLoanAmount.value = '';
    }
  }

  if (lowerLoanType && lowerLoanTerm) {
    updateLoanTerms('lower', lowerLoanType.value);
    clearCalculatedLoanAmount('lower');

    if (lowerTakeHomePay) {
      lowerTakeHomePay.value = '';
    }

    if (lowerEligibleTakeHomePay) {
      lowerEligibleTakeHomePay.value = '';
    }

    if (lowerDesiredLoanAmount) {
      lowerDesiredLoanAmount.value = '';
    }
  }
}

function closeCalculator() {
  if (!calculatorModal) return;
  calculatorModal.classList.remove('open');
  document.body.classList.remove('calculator-modal-open');
  calculatorModal.setAttribute('aria-hidden', 'true');
}

function setCalculatorCourt(court) {
  calculatorTabs.forEach((tab) => {
    const isActive = tab.dataset.courtTab === court;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  calculatorPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.courtPanel === court);
  });
}

function computeLoan(court) {
  const elements = getLoanElements(court);

  if (!elements.loanType || !elements.loanAmount || !elements.loanTerm || !elements.takeHomePay || !elements.eligibleTakeHomePay || !elements.result) return;

  const loanType = elements.loanType.value;
  const termYears = Number(elements.loanTerm.value);
  const takeHomePay = parseAmountInput(elements.takeHomePay.value);
  const loan = getLoanDefinition(court, loanType);

  if (!loan) {
    clearCalculatedLoanAmount(court);
    elements.result.innerHTML = '<strong>Loan Eligibility</strong><span>The selected loan type is not available in the updated matrix.</span>';
    return;
  }

  if (!Number.isFinite(takeHomePay) || takeHomePay <= 0) {
    clearCalculatedLoanAmount(court);
    elements.result.classList.add('error-result');
    elements.result.innerHTML = '<strong>Loan Eligibility</strong><span>Please enter a valid current take-home pay.</span>';
    return;
  }

    elements.result.classList.remove('error-result');
    elements.result.innerHTML = '<strong>Loan Eligibility</strong><span>Your eligible loan amount appears here.</span>';

  if (typeof loan.monthlyRate === 'number') {
    clearCalculatedLoanAmount(court);
    elements.result.innerHTML = `<strong>Loan Eligibility</strong><span>${loan.label} has a 1% monthly interest rate in the updated matrix, but no repayment term is listed. An eligible loan amount cannot be calculated.</span>`;
    return;
  }

  const rate = loan.rates?.[termYears];

  if (typeof rate !== 'number') {
    clearCalculatedLoanAmount(court);
    elements.result.innerHTML = '<strong>Loan Eligibility</strong><span>The selected term is not available for this loan type.</span>';
    return;
  }

  const eligibleMonthlyAmortization = getEligibleMonthlyAmortization(takeHomePay);
  elements.eligibleTakeHomePay.value = formatCurrency(eligibleMonthlyAmortization);

  if (eligibleMonthlyAmortization <= 0) {
  clearCalculatedLoanAmount(court);

  elements.result.classList.add('error-result');

  elements.result.innerHTML = `
    <strong>Loan Eligibility</strong>
    <span>Current take-home pay must be greater than ${formatCurrency(minimumRetainedTakeHomePay)} to provide a loan payment.</span>
  `;

    return;
  }

  const factorRate = getFactorRate(rate / 100, termYears);
  const calculatedLoanAmount = eligibleMonthlyAmortization / factorRate;
  if (typeof loan.min === 'number' && calculatedLoanAmount < loan.min) {
    clearCalculatedLoanAmount(court);
    elements.result.innerHTML = `<strong>Loan Eligibility</strong><span>The income-based amount is below this loan type's matrix minimum of ${formatCurrency(loan.min)}.</span>`;
    return;
  }

  const eligibleLoanAmount = typeof loan.max === 'number'
    ? Math.min(calculatedLoanAmount, loan.max)
    : calculatedLoanAmount;
  const desiredLoanAmountInput = parseAmountInput(elements.desiredLoanAmount?.value || '');
  let amortizationBaseAmount = eligibleLoanAmount;

  if (Number.isFinite(desiredLoanAmountInput)) {
    if (desiredLoanAmountInput <= 0) {
      clearCalculatedLoanAmount(court);
      elements.result.innerHTML = '<strong>Loan Eligibility</strong><span>Please enter a valid desired loan amount.</span>';
      return;
    }

    if (typeof loan.min === 'number' && desiredLoanAmountInput < loan.min) {
      clearCalculatedLoanAmount(court);
      elements.result.innerHTML = `<strong>Loan Eligibility</strong><span>Desired amount is below this loan type\'s matrix minimum of ${formatCurrency(loan.min)}.</span>`;
      return;
    }

    // INVALID
  if (desiredLoanAmountInput > eligibleLoanAmount) {
    clearCalculatedLoanAmount(court);

    elements.result.classList.add('error-result');

    elements.result.innerHTML = `
      <strong>Loan Eligibility</strong>
      <span>Your maximum eligible amount is ${formatCurrency(eligibleLoanAmount)}. Please enter a desired amount within eligibility.</span>
    `;

    return;
  }

    // VALID
    elements.result.classList.remove('error-result');

    elements.result.innerHTML = `
      <strong>Loan Eligibility</strong>
      <span>Your eligible loan amount is ${formatCurrency(eligibleLoanAmount)}.</span>
    `;

      amortizationBaseAmount = desiredLoanAmountInput;
    }

  const monthlyAmortization = amortizationBaseAmount * factorRate;

  elements.loanAmount.value = formatCurrency(eligibleLoanAmount);

  elements.result.innerHTML = `
    <strong>Loan Amortization</strong>
    <span>Monthly amortization: ${formatCurrency(monthlyAmortization)}</span>
  `;
}

if (calculatorModal) {
  // no-op: modal is created on demand
}

calculatorLinks.forEach((link) => {
  link.setAttribute('role', 'button');
  link.setAttribute('aria-haspopup', 'dialog');
  link.setAttribute('aria-expanded', 'false');
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openCalculator();
    link.setAttribute('aria-expanded', 'true');
  });
});

document.addEventListener('click', (event) => {
  if (event.target?.matches?.('[data-open-calculator]')) {
    openCalculator();
  }

  if (event.target?.matches?.('[data-close-calculator]')) {
    closeCalculator();
  }

  if (event.target?.matches?.('[data-court-tab]')) {
    setCalculatorCourt(event.target.dataset.courtTab);
  }

  if (event.target?.matches?.('[data-compute-supreme]')) {
    computeLoan('supreme');
  }

  if (event.target?.matches?.('[data-compute-lower]')) {
    computeLoan('lower');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && calculatorModal?.classList.contains('open')) {
    closeCalculator();
  }
});

document.addEventListener('input', (event) => {
  if (event.target?.matches?.('[data-take-home-pay]')) {
    event.target.value = formatAmountInput(event.target.value);
    updateEligibleTakeHomePay('supreme');
    clearCalculatedLoanAmount('supreme');
  }

  if (event.target?.matches?.('[data-take-home-pay-lower]')) {
    event.target.value = formatAmountInput(event.target.value);
    updateEligibleTakeHomePay('lower');
    clearCalculatedLoanAmount('lower');
  }

  if (event.target?.matches?.('[data-desired-loan-amount], [data-desired-loan-amount-lower]')) {
    event.target.value = formatAmountInput(event.target.value);
  }
});

document.addEventListener('blur', (event) => {
  if (event.target?.matches?.('[data-take-home-pay], [data-take-home-pay-lower], [data-desired-loan-amount], [data-desired-loan-amount-lower]')) {
    event.target.value = formatAmountInput(event.target.value);
  }
}, true);

document.addEventListener('change', (event) => {
  if (event.target?.matches?.('[data-loan-type]')) {
    updateLoanTerms('supreme', event.target.value);
    clearCalculatedLoanAmount('supreme');
  }

  if (event.target?.matches?.('[data-loan-type-lower]')) {
    updateLoanTerms('lower', event.target.value);
    clearCalculatedLoanAmount('lower');
  }
});

if (document.querySelector('.calculator-page')) {
  openCalculator();
}

// Annual report book reader
const reportBook = document.querySelector('[data-report-book]');

if (reportBook) {
  const pages = Array.from(reportBook.querySelectorAll('.book-page'));
  const previousPageButton = reportBook.querySelector('[data-report-prev]');
  const nextPageButton = reportBook.querySelector('[data-report-next]');
  const currentPageLabel = reportBook.querySelector('[data-report-current]');
  const totalPageLabel = reportBook.querySelector('[data-report-total]');
  let reportPageIndex = 0;

  function showReportPage(index) {
    reportPageIndex = Math.max(0, Math.min(index, pages.length - 1));

    pages.forEach((page, pageIndex) => {
      const isActive = pageIndex === reportPageIndex;
      page.classList.toggle('active', isActive);
      page.setAttribute('aria-hidden', String(!isActive));
    });

    if (currentPageLabel) currentPageLabel.textContent = String(reportPageIndex + 1);
    if (totalPageLabel) totalPageLabel.textContent = String(pages.length);
    if (previousPageButton) previousPageButton.disabled = reportPageIndex === 0;
    if (nextPageButton) nextPageButton.disabled = reportPageIndex === pages.length - 1;
  }

  previousPageButton?.addEventListener('click', () => {
    showReportPage(reportPageIndex - 1);
  });

  nextPageButton?.addEventListener('click', () => {
    showReportPage(reportPageIndex + 1);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      showReportPage(reportPageIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      showReportPage(reportPageIndex + 1);
    }
  });

  showReportPage(0);
}

/* SCSLAIcares Gallery Lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox && lightboxImg) {
  document.querySelectorAll(
      ".cares-featured-image img, .cares-photo-grid img"
  ).forEach(img => {
      img.addEventListener("click", () => {
          lightboxImg.src = img.src;
          lightbox.classList.add("show");

          // Prevent page from scrolling while open
          document.body.style.overflow = "hidden";
      });
  });

  // Close when clicking the dark overlay
  lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
          lightbox.classList.remove("show");
          document.body.style.overflow = "";
      }
  });

  // Optional: close with Esc
  document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
          lightbox.classList.remove("show");
          document.body.style.overflow = "";
      }
  });
}
