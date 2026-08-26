JS = r'''/* SCSLAI - Fill-Out on image. SC + LC, both pages. */
(function () {
  "use strict";
  var IMG_W = 1275, IMG_H = 2100;
  var activeForm = "sc";

  var SC_FIELDS = {
    receivedDate:  { x: 940, y: 266, w: 266, h: 24, fs: 13 },
    applicantName: { x: 285, y: 464, w: 405, h: 20, fs: 14 },
    others:        { x: 182, y: 382, w: 204, h: 16, fs: 12 },
    amountWords:   { x: 170, y: 476, w: 340, h: 20, fs: 13 },
    loanAmount:    { x: 610, y: 476, w: 132, h: 20, fs: 13 },
    payableYearsWords: { x: 830, y: 488, w: 75, h: 18, fs: 12 },
    payableYears:  { x: 910, y: 488, w: 45, h: 22, fs: 12 },
    edpNumber:     { x: 58, y: 572, w: 270, h: 22, fs: 14 },
    tin:           { x: 340, y: 572, w: 330, h: 22, fs: 13 },
    birthdate:     { x: 685, y: 572, w: 238, h: 22, fs: 13 },
    placeOfBirth:  { x: 932, y: 572, w: 296, h: 22, fs: 13 },
    lastName:      { x: 118, y: 622, w: 292, h: 30, fs: 15 },
    firstName:     { x: 415, y: 622, w: 202, h: 30, fs: 15 },
    middleName:    { x: 622, y: 622, w: 212, h: 30, fs: 15 },
    suffix:        { x: 842, y: 622, w: 164, h: 30, fs: 14 },
    signature:     { x: 952, y: 654, w: 244, h: 15, fs: 12 },
    officeStation: { x: 58, y: 680, w: 472, h: 22, fs: 14 },
    position:      { x: 535, y: 680, w: 155, h: 22, fs: 14 },
    appointment:   { x: 695, y: 680, w: 306, h: 22, fs: 14 },
    homeAddress:   { x: 58, y: 728, w: 692, h: 19, fs: 14 },
    zipCode:       { x: 762, y: 728, w: 240, h: 19, fs: 14 },
    printedName:   { x: 952, y: 723, w: 244, h: 15, fs: 12 },
    contactNumber: { x: 61, y: 783, w: 482, h: 22, fs: 14 },
    emailAddress:  { x: 563, y: 783, w: 444, h: 22, fs: 13 }
  };
  var SC2_FIELDS = {
    pnNumber:         { x: 120, y: 61, w: 232, h: 18, fs: 13 },
    pnAmountWords:    { x: 388, y: 155, w: 392, h: 20, fs: 13 },
    pnAmountFigures:  { x: 812, y: 155, w: 148, h: 20, fs: 13 },
    pnInterestRate:   { x: 276, y: 179, w: 84, h: 20, fs: 13 },
    pnInstallments:   { x: 488, y: 180, w: 84, h: 20, fs: 13 },
    pnInstallmentAmt: { x: 728, y: 180, w: 75, h: 20, fs: 13 },
    pnAddlRate:       { x: 801, y: 366, w: 130, h: 20, fs: 13 },
    pnPrintedName:    { x: 112, y: 878, w: 305, h: 20, fs: 13 },
    pnSignature:      { x: 488, y: 878, w: 300, h: 20, fs: 13 },
    pnSignature2:     { x: 855, y: 878, w: 300, h: 20, fs: 13 },
    pnDate:           { x: 132, y: 938, w: 176, h: 20, fs: 13 }
  };
  var SC_CHECKBOXES = {
    business: { cx: 123, cy: 287, w: 10, h: 12, category: "regular" },
    emergencyRata: { cx: 249, cy: 287, w: 10, h: 12, category: "regular" },
    maxi: { cx: 411, cy: 287, w: 10, h: 12, category: "regular" },
    character: { cx: 123, cy: 307, w: 10, h: 12, category: "regular" },
    help: { cx: 249, cy: 307, w: 10, h: 12, category: "regular" },
    meal: { cx: 411, cy: 307, w: 10, h: 12, category: "regular" },
    educational: { cx: 123, cy: 327, w: 10, h: 12, category: "regular" },
    housing: { cx: 249, cy: 327, w: 10, h: 12, category: "regular" },
    multiPurpose: { cx: 411, cy: 327, w: 10, h: 12, category: "regular" },
    equitable: { cx: 123, cy: 348, w: 10, h: 13, category: "regular" },
    jdfAllowance: { cx: 249, cy: 348, w: 10, h: 13, category: "regular" },
    petty: { cx: 411, cy: 348, w: 10, h: 13, category: "regular" },
    equity: { cx: 123, cy: 368, w: 10, h: 13, category: "regular" },
    longTerm: { cx: 249, cy: 368, w: 10, h: 13, category: "regular" },
    subsistence: { cx: 411, cy: 368, w: 10, h: 13, category: "regular" },
    deeaApril: { cx: 632, cy: 322, w: 10, h: 13, category: "special" },
    eeaOctober: { cx: 812, cy: 322, w: 10, h: 13, category: "special" },
    midYear: { cx: 632, cy: 342, w: 10, h: 13, category: "special" },
    yearEnd: { cx: 812, cy: 342, w: 10, h: 13, category: "special" },
    anniversary: { cx: 632, cy: 362, w: 10, h: 13, category: "special" },
    cashGift: { cx: 812, cy: 362, w: 10, h: 13, category: "special" },
    newLoan: { cx: 374, cy: 417, w: 12, h: 15, category: "application" },
    consolidate: { cx: 518, cy: 417, w: 13, h: 15, category: "application" },
    deliveryAtm: { cx: 509, cy: 1547, w: 12, h: 17, category: "delivery" },
    deliveryPickup: { cx: 887, cy: 1547, w: 12, h: 17, category: "delivery" }
  };
  var SC_LABELS = {
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
'''
open('FRONT/FORMS/_chunk1.txt', 'w', encoding='utf-8').write(JS)
print('chunk1 ok', len(JS))
