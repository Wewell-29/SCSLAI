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
  slideInterval = setInterval(nextSlide, 4000);
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
  {src: 'images/Annoncements/final-educational-poster.jpg', alt: 'Final Educational Poster'},
  {src: 'images/Annoncements/HOUSING LOAN.png', alt: 'Announcement 2'},
  {src: 'images/Annoncements/anniv.png', alt: 'ANNIVERSARY'},
  {src: 'images/Annoncements/INDIPENDENCE.png', alt: 'INDEPENDENCE DAY'}
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
  setInterval(nextAnnouncement, 5000);
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

// Dropdown should always open when ABOUT US is clicked
const dropbtn = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');

if (dropbtn && dropdown) {
  dropbtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.add('open');
    dropbtn.setAttribute('aria-expanded', 'true');
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
    }
  });
}

// Close dropdown on Escape
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    if (dropdown && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      dropbtn?.setAttribute('aria-expanded', 'false');
      dropbtn?.focus();
    }
  }
});
