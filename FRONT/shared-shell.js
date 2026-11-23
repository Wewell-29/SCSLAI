(function () {
  'use strict';

  const isInReportsFolder = window.location.pathname.replace(/\\/g, '/').includes('/reports/');
  const base = isInReportsFolder ? '../' : '';

  const stylesheetHref = `${base}shared-shell.css?v=20261123a`;
  if (!document.querySelector(`link[href^="${base}shared-shell.css"]`)) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = stylesheetHref;
    document.head.appendChild(stylesheet);
  }

  const navigation = [
    { label: 'HOME', href: 'index.html' },
    {
      label: 'ABOUT US',
      dropdown: [
        { label: 'History', href: 'about-history.html' },
        { label: 'Mission & Vision', href: 'about-mission-vision.html' },
        { label: 'Core Values', href: 'about-core-values.html' },
        { label: 'SCSLAI Framework', href: 'about-framework.html' },
        { label: 'Annual Report', href: 'about-annual-report.html' },
        { label: 'Data Protection Policy', href: 'about-data-protection-policy.html' }
      ]
    },
    { label: 'MEMBERSHIP', href: 'membership.html' },
    { label: 'DOWNLOAD APPLICATION', href: 'download.html' },
    { label: 'CONTACT US', href: 'contact.html' },
    { label: 'LOANS', href: 'loans.html' },
    { label: 'CALCULATOR', href: 'calculator.html' },
    { label: 'SCSLAICares', href: 'scslaicares.html' }
  ];

  const header = document.querySelector('header');
  if (header) {
    const navItems = navigation.map((item) => {
      if (!item.dropdown) {
        return `<a href="${base}${item.href}">${item.label}</a>`;
      }

      const submenu = item.dropdown.map((child) =>
        `<a href="${base}${child.href}" role="menuitem">${child.label}</a>`
      ).join('');

      return `
        <div class="dropdown">
          <button class="dropbtn" aria-haspopup="true" aria-expanded="false">${item.label}</button>
          <div class="dropdown-content" role="menu" aria-label="${item.label.toLowerCase()} submenu">
            ${submenu}
          </div>
        </div>`;
    }).join('');

    header.innerHTML = `
      <div class="logo">
        <img src="${base}images/logoW.png" alt="SCSLAI Logo">
        <div class="logo-text">
          <h3>SUPREME COURT</h3>
          <p>SAVINGS AND LOAN ASSOCIATION, INC.</p>
        </div>
      </div>
      <nav id="site-navigation">${navItems}</nav>`;
  }

  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-section footer-logo-section">
          <img src="${base}images/81stW.png" alt="SCSLAI Logo" class="footer-logo" loading="lazy" decoding="async">
        </div>
        <div class="footer-section">
          <h4>About SCSLAI</h4>
          <p>At Supreme Court Savings and Loan Association, Inc., our priority is the financial well-being of our members. We provide dependable financial solutions designed to support their growth and security.</p>
        </div>
        <div class="footer-section">
          <h4>Contact Info</h4>
          <p>
            <i class="fas fa-envelope"></i>
            <a href="mailto:supremecourtslainc@gmail.com">supremecourtslainc@gmail.com</a>
          </p>
          <p>
            <i class="fas fa-mobile-alt"></i>
            +63 929 337 1781
            &nbsp; | &nbsp;
            <i class="fas fa-phone"></i>
            (8) 236-0487
          </p>
          <p>
            <i class="fab fa-facebook"></i>
            <a href="https://www.facebook.com/profile.php?id=100083113309397" target="_blank" rel="noopener">
              Supreme Court Savings and Loan Association, Inc.
            </a>
          </p>
          <p>
            <i class="fas fa-location-dot"></i>
            <a href="https://www.google.com/maps/place/Supreme+Court+of+the+Philippines,+Padre+Faura+St,+Ermita,+Manila,+Philippines" target="_blank" rel="noopener">
              Supreme Court of the Philippines, Padre Faura St. Ermita, Manila, Philippines 1000
            </a>
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} SCSLAI. All rights reserved.</p>
      </div>`;
  }
})();
