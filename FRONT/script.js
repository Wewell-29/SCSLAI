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
  {src: 'images/Annoncements/ANNOUNCEMENT1.png', alt: 'Announcement 2'}
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

nextButton?.addEventListener('click', () => {
  nextSlide();
  resetCarousel();
});

prevButton?.addEventListener('click', () => {
  prevSlide();
  resetCarousel();
});
