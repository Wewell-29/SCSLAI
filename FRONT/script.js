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

// Calculator popup
const calculatorLinks = document.querySelectorAll('a[href="calculator.html"]');
let calculatorModal = document.querySelector('[data-calculator-modal]');
let openCalculatorButton = document.querySelector('[data-open-calculator]');
let closeCalculatorButton = document.querySelector('[data-close-calculator]');
let calculatorTabs = document.querySelectorAll('[data-court-tab]');
let calculatorPanels = document.querySelectorAll('[data-court-panel]');
let supremeLoanType = document.querySelector('[data-loan-type]');
let supremeLoanAmount = document.querySelector('[data-loan-amount]');
let supremeLoanTerm = document.querySelector('[data-loan-term]');
let supremeTakeHomePay = document.querySelector('[data-take-home-pay]');
let supremeEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay]');
let supremeComputeButton = document.querySelector('[data-compute-supreme]');
let supremeResult = document.querySelector('[data-supreme-result]');
let lowerLoanType = document.querySelector('[data-loan-type-lower]');
let lowerLoanAmount = document.querySelector('[data-loan-amount-lower]');
let lowerLoanTerm = document.querySelector('[data-loan-term-lower]');
let lowerTakeHomePay = document.querySelector('[data-take-home-pay-lower]');
let lowerEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay-lower]');
let lowerComputeButton = document.querySelector('[data-compute-lower]');
let lowerResult = document.querySelector('[data-lower-result]');

const supremeLoanRates = {
  educational: { 1: 12, 2: 12, 3: 15, 4: 15, 5: 15 },
  housing: { 1: 8, 2: 8, 3: 8, 4: 8, 5: 8 },
  multiPurpose: { 1: 12, 2: 12, 3: 15 },
  business: { 1: 12, 2: 12, 3: 12, 4: 12, 5: 12 },
  healthEmergency: { 1: 12, 2: 12, 3: 12 }
};

const lowerLoanRates = {
  educational: { 1: 12, 2: 12, 3: 15, 4: 15, 5: 15 },
  housing: { 1: 8, 2: 8, 3: 8, 4: 8, 5: 8 },
  multiPurpose: { 1: 12, 2: 12, 3: 15 },
  business: { 1: 12, 2: 12, 3: 12, 4: 12, 5: 12 },
  healthEmergency: { 1: 12, 2: 12, 3: 12 }
};

const loanLimits = {
  educational: {
    min: 0,
    max: 200000
  },
  housing: {
    min: 0,
    max: 2000000
  },
  multiPurpose: {
    min: 0,
    max: 100000
  },
  business: {
    min: 0,
    max: 500000
  },
  healthEmergency: {
    min: 0,
    max: 400000
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
            <input id="supreme-take-home-pay" type="number" min="0" step="0.01" placeholder="Enter current take-home pay" data-take-home-pay>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="supreme-eligible-take-home-pay">Eligible Take-Home Pay</label>
            <input id="supreme-eligible-take-home-pay" type="text" readonly placeholder="Calculated from current take-home pay" data-eligible-take-home-pay>
          </div>

          <div class="calculator-field">
            <label for="supreme-loan-type">Loan Type</label>
            <select id="supreme-loan-type" data-loan-type>
              <option value="educational">Educational Loan</option>
              <option value="housing">Housing Loan</option>
              <option value="multiPurpose">Multi-Purpose Loan</option>
              <option value="business">Business Loan</option>
              <option value="healthEmergency">SCSLA Health Emergency Loan PR</option>
            </select>
          </div>

          <div class="calculator-field">
            <label for="supreme-loan-amount">Eligible Loan Amount</label>
            <input id="supreme-loan-amount" type="text" readonly placeholder="Calculated from eligible take-home pay" data-loan-amount>
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
          <strong>Loan Eligibility</strong>
          <span>Your eligible loan amount appears here.</span>
        </div>

        <div class="calculator-note">
          <strong>Note:</strong>
          <span>Eligible monthly payment = current take-home pay - &#8369;5,000. Loan amount = eligible monthly payment / factor rate.</span>
        </div>

      </div>

      <div class="calculator-panel" data-court-panel="lower">
        <div class="calculator-lower-copy">
        </div>

        <div class="calculator-grid">
          <div class="calculator-field calculator-field--full">
            <label for="lower-take-home-pay">Current Take-Home Pay</label>
            <input id="lower-take-home-pay" type="number" min="0" step="0.01" placeholder="Enter current take-home pay" data-take-home-pay-lower>
          </div>

          <div class="calculator-field calculator-field--full">
            <label for="lower-eligible-take-home-pay">Eligible Take-Home Pay</label>
            <input id="lower-eligible-take-home-pay" type="text" readonly placeholder="Calculated from current take-home pay" data-eligible-take-home-pay-lower>
          </div>

          <div class="calculator-field">
            <label for="lower-loan-type">Loan Type</label>
            <select id="lower-loan-type" data-loan-type-lower>
              <option value="educational">Educational Loan</option>
              <option value="housing">Housing Loan</option>
              <option value="multiPurpose">Multi-Purpose Loan</option>
              <option value="business">Business Loan</option>
              <option value="healthEmergency">SCSLA Health Emergency Loan PR</option>
            </select>
          </div>

          <div class="calculator-field">
            <label for="lower-loan-amount">Eligible Loan Amount</label>
            <input id="lower-loan-amount" type="text" readonly placeholder="Calculated from eligible take-home pay" data-loan-amount-lower>
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
          <strong>Loan Eligibility</strong>
          <span>Your eligible loan amount appears here.</span>
        </div>

        <div class="calculator-note">
          <strong>Note:</strong>
          <span>Eligible monthly payment = current take-home pay - &#8369;5,000. Loan amount = eligible monthly payment / factor rate.</span>
        </div>
        
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}

function getSupremeTermsForType(loanType) {
  return Object.keys(supremeLoanRates[loanType] || {}).map(Number).sort((a, b) => a - b);
}

function getLoanRates(court) {
  return court === 'lower' ? lowerLoanRates : supremeLoanRates;
}

function getLoanElements(court) {
  return court === 'lower'
    ? {
        loanType: lowerLoanType,
        loanAmount: lowerLoanAmount,
        loanTerm: lowerLoanTerm,
        takeHomePay: lowerTakeHomePay,
        eligibleTakeHomePay: lowerEligibleTakeHomePay,
        result: lowerResult
      }
    : {
        loanType: supremeLoanType,
        loanAmount: supremeLoanAmount,
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

  const takeHomePay = Number(elements.takeHomePay.value);
  elements.eligibleTakeHomePay.value = Number.isFinite(takeHomePay) && takeHomePay > 0
    ? formatCurrency(getEligibleMonthlyAmortization(takeHomePay))
    : '';
}

function updateLoanTerms(court, loanType) {
  const elements = getLoanElements(court);
  if (!elements.loanTerm) return;

  const rates = getLoanRates(court);
  const terms = Object.keys(rates[loanType] || {}).map(Number).sort((a, b) => a - b);
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
  supremeLoanTerm = document.querySelector('[data-loan-term]');
  supremeTakeHomePay = document.querySelector('[data-take-home-pay]');
  supremeEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay]');
  supremeComputeButton = document.querySelector('[data-compute-supreme]');
  supremeResult = document.querySelector('[data-supreme-result]');
  lowerLoanType = document.querySelector('[data-loan-type-lower]');
  lowerLoanAmount = document.querySelector('[data-loan-amount-lower]');
  lowerLoanTerm = document.querySelector('[data-loan-term-lower]');
  lowerTakeHomePay = document.querySelector('[data-take-home-pay-lower]');
  lowerEligibleTakeHomePay = document.querySelector('[data-eligible-take-home-pay-lower]');
  lowerComputeButton = document.querySelector('[data-compute-lower]');
  lowerResult = document.querySelector('[data-lower-result]');

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
  const rates = getLoanRates(court);

  if (!elements.loanType || !elements.loanAmount || !elements.loanTerm || !elements.takeHomePay || !elements.eligibleTakeHomePay || !elements.result) return;

  const loanType = elements.loanType.value;
  const termYears = Number(elements.loanTerm.value);
  const takeHomePay = Number(elements.takeHomePay.value);

  const rate = rates[loanType]?.[termYears];

  if (!Number.isFinite(takeHomePay) || takeHomePay <= 0) {
    clearCalculatedLoanAmount(court);
    elements.result.innerHTML = '<strong>Loan Eligibility</strong><span>Please enter a valid current take-home pay.</span>';
    return;
  }

  if (typeof rate !== 'number') {
    clearCalculatedLoanAmount(court);
    elements.result.innerHTML = '<strong>Loan Eligibility</strong><span>The selected term is not available for this loan type.</span>';
    return;
  }

  const eligibleMonthlyAmortization = getEligibleMonthlyAmortization(takeHomePay);
  elements.eligibleTakeHomePay.value = formatCurrency(eligibleMonthlyAmortization);

  if (eligibleMonthlyAmortization <= 0) {
    clearCalculatedLoanAmount(court);
    elements.result.innerHTML = `<strong>Loan Eligibility</strong><span>Current take-home pay must be greater than ${formatCurrency(minimumRetainedTakeHomePay)} to provide a loan payment.</span>`;
    return;
  }

  const factorRate = getFactorRate(rate / 100, termYears);
  const calculatedLoanAmount = eligibleMonthlyAmortization / factorRate;
  const loanLimit = loanLimits[loanType]?.max;
  const loanAmount = typeof loanLimit === 'number'
    ? Math.min(calculatedLoanAmount, loanLimit)
    : calculatedLoanAmount;
  const monthlyAmortization = loanAmount * factorRate;
  const remainingTakeHomePay = takeHomePay - monthlyAmortization;

  elements.loanAmount.value = formatCurrency(loanAmount);

  elements.result.innerHTML = `
    <strong>Loan Eligibility</strong>
    <span>Monthly amortization: ${formatCurrency(monthlyAmortization)}</span>
    <span>Take-home pay after the payment: ${formatCurrency(remainingTakeHomePay)}</span>
    ${loanAmount < calculatedLoanAmount
      ? `<span>Loan amount is capped at ${formatCurrency(loanLimit)} for this loan type.</span>`
      : ''}
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

  if (calculatorModal && event.target === calculatorModal) {
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
    updateEligibleTakeHomePay('supreme');
    clearCalculatedLoanAmount('supreme');
  }

  if (event.target?.matches?.('[data-take-home-pay-lower]')) {
    updateEligibleTakeHomePay('lower');
    clearCalculatedLoanAmount('lower');
  }
});

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
