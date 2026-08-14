/* ============================================================
   SCSLAI - LOAN APPLICATION FILL-OUT ON IMAGE (form.js)
   ------------------------------------------------------------
   Positions inputs & checkboxes measured from the official
   "Supreme Court (SC) Loan Application Form_page-0001.png"
   (1275 x 2100 px). Image-pixel coords -> % so overlays scale
   exactly with the rendered PNG. Fonts scale with --form-scale.
   ============================================================ */
(function () {
  "use strict";

  var IMG_W = 1275; // measured image width  (px)
  var IMG_H = 2100; // measured image height (px)

  /* ---- MEASURED TEXT FIELD COORDS (top-left, image pixels) ---- */
  var FORM_FIELDS = {
    // receivedDate:  { x: 940,  y: 266, w: 266, h: 24, fs: 13 },
    applicantName: { x: 140,  y: 452, w: 472, h: 20, fs: 14 },
    others:        { x: 182,  y: 382, w: 204, h: 16, fs: 12 },
    amountWords:   { x: 170,  y: 476, w: 340, h: 20, fs: 13 },
    loanAmount:    { x: 610,  y: 476, w: 132, h: 20, fs: 13 },
    payableYears:  { x: 832,  y: 476, w: 94,  h: 20, fs: 13 },
    edpNumber:     { x: 58,   y: 572, w: 270, h: 22, fs: 14 },
    tin:           { x: 340,  y: 572, w: 330, h: 22, fs: 13 },
    birthdate:     { x: 685,  y: 572, w: 238, h: 22, fs: 13 },
    placeOfBirth:  { x: 932,  y: 572, w: 296, h: 22, fs: 13 },
    lastName:      { x: 88,  y: 622, w: 202, h: 30, fs: 14 },
    firstName:     { x: 308,  y: 622, w: 299, h: 30, fs: 14 },
    middleName:    { x: 622,  y: 622, w: 212, h: 30, fs: 14 },
    suffix:        { x: 842,  y: 622, w: 94, h: 30, fs: 14 },
    // signature:     { x: 952,  y: 654, w: 244, h: 15, fs: 12 },
    officeStation: { x: 58,   y: 680, w: 472, h: 22, fs: 14 },
    position:      { x: 535,  y: 680, w: 155, h: 22, fs: 14 },
    appointment:   { x: 695,  y: 680, w: 306, h: 22, fs: 14 },
    homeAddress:   { x: 58,   y: 728, w: 692, h: 19, fs: 14 },
    zipCode:       { x: 762,  y: 728, w: 240, h: 19, fs: 14 },
    printedName:   { x: 952,  y: 723, w: 247, h: 15, fs: 10 },
    contactNumber: { x: 61,   y: 783, w: 482, h: 22, fs: 14 },
    emailAddress:  { x: 563,  y: 783, w: 444, h: 22, fs: 13 }
  };

  /* ---- PAGE 2 (PROMISSORY NOTE + CONSENT) TEXT FIELDS ---- */
  var PAGE2_FIELDS = {
    pnNumber:         { x: 120, y: 61,  w: 232, h: 18, fs: 13 },
    pnAmountWords:    { x: 388, y: 155, w: 392, h: 20, fs: 13 },
    pnAmountFigures:  { x: 812, y: 155, w: 148, h: 20, fs: 13 },
    pnInterestRate:   { x: 276, y: 179, w: 84, h: 20, fs: 13 },
    pnInstallments:   { x: 488, y: 180, w: 84,  h: 20, fs: 13 },
    pnInstallmentAmt: { x: 728, y: 180, w: 75,  h: 20, fs: 13 },
    pnAddlRate:       { x: 803, y: 348, w: 84, h: 20, fs: 13 },
    pnPrintedName:    { x: 112, y: 878, w: 305, h: 20, fs: 13 },
    // pnSignature:      { x: 488, y: 878, w: 300, h: 20, fs: 13 },
    // pnSignature2:     { x: 855, y: 878, w: 300, h: 20, fs: 13 },
    pnDate:           { x: 132, y: 938, w: 176, h: 20, fs: 13 }
  };

  /* ---- MEASURED CHECKBOX CENTERS (cx, cy, image pixels) ----
     Regular: cols x=123,249,411  |  Special: cols x=632,812 ---- */
  var FORM_CHECKBOXES = {
    business:      { cx: 123, cy: 287, w: 10, h: 12, category: "regular" },
    emergencyRata: { cx: 249, cy: 287, w: 10, h: 12, category: "regular" },
    maxi:          { cx: 411, cy: 287, w: 10, h: 12, category: "regular" },
    character:     { cx: 123, cy: 307, w: 10, h: 12, category: "regular" },
    help:          { cx: 249, cy: 307, w: 10, h: 12, category: "regular" },
    meal:          { cx: 411, cy: 307, w: 10, h: 12, category: "regular" },
    educational:   { cx: 123, cy: 327, w: 10, h: 12, category: "regular" },
    housing:       { cx: 249, cy: 327, w: 10, h: 12, category: "regular" },
    multiPurpose:  { cx: 411, cy: 327, w: 10, h: 12, category: "regular" },
    equitable:     { cx: 123, cy: 348, w: 10, h: 13, category: "regular" },
    jdfAllowance:  { cx: 249, cy: 348, w: 10, h: 13, category: "regular" },
    petty:         { cx: 411, cy: 348, w: 10, h: 13, category: "regular" },
    equity:        { cx: 123, cy: 368, w: 10, h: 13, category: "regular" },
    longTerm:      { cx: 249, cy: 368, w: 10, h: 13, category: "regular" },
    subsistence:   { cx: 411, cy: 368, w: 10, h: 13, category: "regular" },
    deeaApril:     { cx: 632, cy: 322, w: 10, h: 13, category: "special" },
    eeaOctober:    { cx: 812, cy: 322, w: 10, h: 13, category: "special" },
    midYear:       { cx: 632, cy: 342, w: 10, h: 13, category: "special" },
    yearEnd:       { cx: 812, cy: 342, w: 10, h: 13, category: "special" },
    anniversary:   { cx: 632, cy: 362, w: 10, h: 13, category: "special" },
    cashGift:      { cx: 812, cy: 362, w: 10, h: 13, category: "special" },
    newLoan:       { cx: 374, cy: 417, w: 12, h: 15, category: "application" },
    consolidate:   { cx: 518, cy: 417, w: 13, h: 15, category: "application" },
    deliveryAtm:    { cx: 509, cy: 1547, w: 12, h: 17, category: "delivery" },
    deliveryPickup: { cx: 887, cy: 1547, w: 12, h: 17, category: "delivery" }
  };

  /* Friendly label per checkbox (matches the printed loan type) */
  var CHECKBOX_LABELS = {
    business: "Business", emergencyRata: "Emergency RATA", maxi: "Maxi",
    character: "Character", help: "HELP", meal: "MEAL",
    educational: "Educational", housing: "Housing", multiPurpose: "Multi Purpose",
    equitable: "Equitable", jdfAllowance: "JDF/Allowance", petty: "Petty",
    equity: "Equity", longTerm: "Long term", subsistence: "Subsistence",
    deeaApril: "DEEA (April)", eeaOctober: "EEA (October)", midYear: "Mid Year",
    yearEnd: "Year End", anniversary: "Anniversary", cashGift: "Cash Gift",
    newLoan: "New Loan", consolidate: "Consolidate",
    deliveryAtm: "By ATM Payroll Account (LBP)",
    deliveryPickup: "Personal Pick-up of crossed check"
  };

  var modal = document.getElementById("loanModal");
  var canvases = document.querySelectorAll(".loan-form-canvas");
  var form = document.getElementById("loanApplicationForm");
  var closeBtn = document.getElementById("closeLoanModal");
  var cancelBtn = document.getElementById("cancelLoanModal");
  var openBtns = document.querySelectorAll("[data-open-loan-form]");
  var body = document.body;

  /* ---------------- Scale = canvas width / 1275 -------- */
  function getScaleFor(cv) {
    if (!cv) return 1;
    var img = cv.querySelector(".loan-form-background");
    var cw = img ? img.getBoundingClientRect().width : 0;
    if (cw <= 0) cw = cv.getBoundingClientRect().width;
    return cw / IMG_W;
  }

  function updateFormScale() {
    canvases.forEach(function (cv) {
      cv.style.setProperty("--form-scale", getScaleFor(cv));
    });
  }

  /* --------------- Position every overlay (in %) ---------------- */
  function positionOverlays() {
    canvases.forEach(function (cv) {
      var isPage2 = cv.getAttribute("data-page") === "2";
      var map = isPage2 ? PAGE2_FIELDS : FORM_FIELDS;
      var scale = getScaleFor(cv);
      var inputs = cv.querySelectorAll(".form-input");
      var i, el, f;
      for (i = 0; i < inputs.length; i++) {
        el = inputs[i];
        f = map[el.id];
        if (!f) continue;
        el.style.left = (f.x / IMG_W) * 100 + "%";
        el.style.top = (f.y / IMG_H) * 100 + "%";
        el.style.width = (f.w / IMG_W) * 100 + "%";
        el.style.height = (f.h / IMG_H) * 100 + "%";
        el.style.fontSize = Math.round(f.fs * scale) + "px";
        el.style.lineHeight = "normal";
      }
      if (!isPage2) {
        var boxes = cv.querySelectorAll(".form-checkbox");
        var c;
        for (i = 0; i < boxes.length; i++) {
          el = boxes[i];
          c = FORM_CHECKBOXES[el.id];
          if (!c) continue;
          el.style.left = ((c.cx - c.w / 2) / IMG_W) * 100 + "%";
          el.style.top = ((c.cy - c.h / 2) / IMG_H) * 100 + "%";
          el.style.width = (c.w / IMG_W) * 100 + "%";
          el.style.height = (c.h / IMG_H) * 100 + "%";
        }
      }
      cv.style.setProperty("--form-scale", scale);
    });
  }

  /* --------------- Modal open / close -------------------------- */
  function openModal() {
    if (!modal) return;
    modal.classList.add("active");
    body.classList.add("loan-modal-open");
    modal.setAttribute("aria-hidden", "false");
    requestAnimationFrame(positionOverlays);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    body.classList.remove("loan-modal-open");
    modal.setAttribute("aria-hidden", "true");
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });

  /* --------------- Loan-type categories: single choice --------- */
  function wireCheckboxGroups() {
    var boxes = document.querySelectorAll(".loan-form-canvas .form-checkbox");
    Array.prototype.forEach.call(boxes, function (box) {
      box.addEventListener("change", function () {
        var meta = FORM_CHECKBOXES[this.id];
        var cat = meta ? meta.category : null;
        if (!cat || !this.checked) return;
        Array.prototype.forEach.call(boxes, function (other) {
          var om = FORM_CHECKBOXES[other.id];
          if (om && om.category === cat && other.id !== this.id) {
            other.checked = false;
          }
        }, this);
      });
    });
  }

  /* --------------- Validation helpers -------------------------- */
  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function checkedOf(category) {
    var list = [];
    var key, el;
    for (key in FORM_CHECKBOXES) {
      if (!Object.prototype.hasOwnProperty.call(FORM_CHECKBOXES, key)) continue;
      if (FORM_CHECKBOXES[key].category !== category) continue;
      el = document.getElementById(key);
      if (el && el.checked) list.push({ id: key, label: CHECKBOX_LABELS[key] || key });
    }
    return list;
  }

  /* --------------- Submit: gather + validate -------------------- */
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var edpNumber = getVal("edpNumber"),
          lastName = getVal("lastName"),
          firstName = getVal("firstName"),
          birthdate = getVal("birthdate"),
          placeOfBirth = getVal("placeOfBirth"),
          homeAddress = getVal("homeAddress"),
          zipCode = getVal("zipCode"),
          officeStation = getVal("officeStation"),
          position = getVal("position"),
          appointment = getVal("appointment"),
          contactNumber = getVal("contactNumber"),
          emailAddress = getVal("emailAddress"),
          loanAmount = getVal("loanAmount"),
          amountWords = getVal("amountWords"),
          payableYears = getVal("payableYears"),
          others = getVal("others");

      var regs = checkedOf("regular");
      var specs = checkedOf("special");
      var apps = checkedOf("application");

      var missing = [];
      if (!edpNumber) missing.push("EDP Number");
      if (!lastName) missing.push("Last Name");
      if (!firstName) missing.push("First Name");
      if (!birthdate) missing.push("Birthdate");
      if (!placeOfBirth) missing.push("Place of Birth");
      if (!homeAddress) missing.push("Home Address");
      if (!zipCode) missing.push("ZIP Code");
      if (!officeStation) missing.push("Office / Station");
      if (!position) missing.push("Position");
      if (!appointment) missing.push("Status of Appointment");
      if (!contactNumber) missing.push("Contact Number");
      if (!emailAddress) missing.push("Email Address");
      if (!loanAmount) missing.push("Loan Amount");
      if (regs.length === 0 && specs.length === 0) missing.push("Type of Loan");
      if (apps.length === 0) missing.push("Application Type (New Loan / Consolidate)");

      if (missing.length) {
        alert("Please complete the following:\n- " + missing.join("\n- "));
        return;
      }
      if (!/^[0-9]+$/.test(edpNumber)) {
        alert("EDP Number must contain numbers only."); return;
      }
      if (zipCode && !/^[0-9]{4}$/.test(zipCode)) {
        alert("Please enter a valid 4-digit ZIP Code."); return;
      }
      var mobile = contactNumber ? contactNumber.replace(/[\s-]/g, "") : "";
      if (mobile && !/^(09|\+639)[0-9]{9}$/.test(mobile)) {
        alert("Please enter a valid Philippine mobile number (e.g. 09XXXXXXXXX)."); return;
      }
      if (emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
        alert("Please enter a valid email address."); return;
      }
      if (birthdate) {
        var d = new Date(birthdate);
        if (isNaN(d.getTime()) || d >= new Date()) {
          alert("Birthdate cannot be today or a future date."); return;
        }
      }

      var selectedLoans = regs.concat(specs).map(function (x) { return x.label; });
      var loanCategory = specs.length > 0 ? "Special Loan" : "Regular Loan";

      var result = {
        loanCategory: loanCategory,
        loanType: selectedLoans[0] || "",
        loanTypes: selectedLoans,
        otherLoanType: others,
        applicationType: apps.length ? apps[0].label : "",
        loanAmount: loanAmount,
        amountInWords: amountWords,
        payableYears: payableYears,
        receivedDate: getVal("receivedDate"),
        applicantName: getVal("applicantName"),
        edpNumber: edpNumber,
        tin: getVal("tin"),
        lastName: lastName,
        firstName: firstName,
        middleName: getVal("middleName"),
        suffix: getVal("suffix"),
        birthdate: birthdate,
        placeOfBirth: placeOfBirth,
        officeStation: officeStation,
        position: position,
        appointment: appointment,
        homeAddress: homeAddress,
        zipCode: zipCode,
        printedName: getVal("printedName"),
        contactNumber: contactNumber,
        emailAddress: emailAddress,
        signature: getVal("signature"),
        modeOfDelivery: checkedOf("delivery").map(function (x) { return x.label; }),
        promissoryNote: {
          pnNumber: getVal("pnNumber"),
          amountWords: getVal("pnAmountWords"),
          amountFigures: getVal("pnAmountFigures"),
          interestRate: getVal("pnInterestRate"),
          installments: getVal("pnInstallments"),
          installmentAmount: getVal("pnInstallmentAmt"),
          additionalRate: getVal("pnAddlRate"),
          printedName: getVal("pnPrintedName"),
          signature: getVal("pnSignature"),
          signature2: getVal("pnSignature2"),
          date: getVal("pnDate")
        }
      };

      closeModal();
      console.log("SCSLAI Loan Application:", result);
      window.__loanApplicationData = result;
      generatePDF();
    });
  }

  /* --------------- Generate PDF on completion ------------------- */
  function imageToDataURL(img) {
    var c = document.createElement("canvas");
    c.width = img.naturalWidth || IMG_W;
    c.height = img.naturalHeight || IMG_H;
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/png");
  }

  async function getImageInput(img) {
    try {
      var resp = await fetch(img.src);
      if (resp.ok) return await resp.arrayBuffer();
    } catch (e) { /* fall through to canvas */ }
    return imageToDataURL(img);
  }

  async function generatePDF() {
    if (!window.PDFLib) {
      alert("PDF library not loaded. Please check your internet connection and try again.");
      return;
    }
    try {
      var PDFLib = window.PDFLib;
      var doc = await PDFLib.PDFDocument.create();
      var font = await doc.embedFont(PDFLib.StandardFonts.TimesRoman);
      var rgb = PDFLib.rgb;
      var pages = document.querySelectorAll(".loan-form-canvas");
      var p, cv, isPage2, map, img, png, page, id, f, el, val, c, cy, half;
      for (p = 0; p < pages.length; p++) {
        cv = pages[p];
        isPage2 = cv.getAttribute("data-page") === "2";
        map = isPage2 ? PAGE2_FIELDS : FORM_FIELDS;
        img = cv.querySelector(".loan-form-background");
        png = await doc.embedPng(await getImageInput(img));
        page = doc.addPage([IMG_W, IMG_H]);
        page.drawImage(png, { x: 0, y: 0, width: IMG_W, height: IMG_H });
        for (id in map) {
          if (!Object.prototype.hasOwnProperty.call(map, id)) continue;
          el = document.getElementById(id);
          val = el ? el.value : "";
          if (!val) continue;
          f = map[id];
          page.drawText(val, {
            x: f.x,
            y: IMG_H - f.y - f.h,
            size: f.fs,
            font: font,
            color: rgb(0, 0, 0)
          });
        }
        if (!isPage2) {
          for (id in FORM_CHECKBOXES) {
            if (!Object.prototype.hasOwnProperty.call(FORM_CHECKBOXES, id)) continue;
            el = document.getElementById(id);
            if (!el || !el.checked) continue;
            c = FORM_CHECKBOXES[id];
            cy = IMG_H - c.cy;
            half = c.w * 0.55;
            page.drawLine({ start: { x: c.cx - half, y: cy + half }, end: { x: c.cx + half, y: cy - half }, thickness: 1.5, color: rgb(0, 0, 0) });
            page.drawLine({ start: { x: c.cx - half, y: cy - half }, end: { x: c.cx + half, y: cy + half }, thickness: 1.5, color: rgb(0, 0, 0) });
          }
        }
      }
      var bytes = await doc.save();
      var blob = new Blob([bytes], { type: "application/pdf" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      var lastName = (document.getElementById("lastName") || {}).value || "";
      a.href = url;
      a.download = "SCSLAI-Loan-Application" + (lastName ? "-" + lastName.trim() : "") + ".pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      alert("Your loan application has been completed. The PDF has been generated and downloaded. Please save it in FORMS/generated.");
    } catch (err) {
      alert("PDF generation failed: " + (err && err.message ? err.message : err));
    }
  }

  /* --------------- Init ----------------------------------------- */
  function init() {
    positionOverlays();
    wireCheckboxGroups();
    updateFormScale();
    window.addEventListener("resize", positionOverlays);
    canvases.forEach(function (cv) {
      var img = cv.querySelector(".loan-form-background");
      if (img && !img.complete) img.addEventListener("load", updateFormScale);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
