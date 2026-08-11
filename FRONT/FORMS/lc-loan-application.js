const form = document.getElementById("lcLoanForm");
const resetBtn = document.getElementById("resetFormBtn");
const printBtn = document.getElementById("printFormBtn");

const PDF_TEMPLATE_PATH = "./Lower Court (LC) Loan Application Form1 (1).pdf";

// Global calibration offsets in PDF points.
// Increase x to move right, increase y to move up.
const PDF_TEXT_OFFSET = { x: 0, y: 0 };
const PDF_CHECK_OFFSET = { x: 0, y: 0 };

const checkPositions = {
    "Business": { x: 38, y: 708 },
    "Educational": { x: 38, y: 694 },
    "Emergency RATA": { x: 38, y: 680 },
    "Housing": { x: 38, y: 666 },
    "Help Loan": { x: 123, y: 708 },
    "JDF/Allowance": { x: 123, y: 694 },
    "Maxi": { x: 123, y: 680 },
    "Others": { x: 123, y: 666 },
    "Multi Purpose": { x: 210, y: 708 },
    "MEAL": { x: 210, y: 694 },
    "Salary": { x: 210, y: 680 },
    "DEEA (April)": { x: 286, y: 708 },
    "Mid Year": { x: 286, y: 694 },
    "Anniversary": { x: 286, y: 680 },
    "DEEA (October)": { x: 376, y: 708 },
    "Year End": { x: 376, y: 694 },
    "Cash Gift": { x: 376, y: 680 },
    "New Loan": { x: 190, y: 650 },
    "Consolidate": { x: 270, y: 650 },
    "Without Pending Case": { x: 68, y: 465 },
    "With Pending Case": { x: 68, y: 450 },
    "Delivery LBP": { x: 186, y: 222 }
};

const textMap = {
    receivedDate: { x: 472, y: 742, maxChars: 20 },
    applicantFullName: { x: 92, y: 661, maxChars: 34 },
    loanAmount: { x: 338, y: 661, maxChars: 18 },
    loanYears: { x: 512, y: 661, maxChars: 5 },

    edpNumber: { x: 114, y: 604, maxChars: 20 },
    tin: { x: 350, y: 604, maxChars: 20 },
    birthdate: { x: 114, y: 568, maxChars: 12 },
    placeOfBirth: { x: 350, y: 568, maxChars: 20 },

    lastName: { x: 114, y: 676, maxChars: 22 },
    firstName: { x: 350, y: 676, maxChars: 22 },
    middleName: { x: 114, y: 640, maxChars: 18 },
    suffix: { x: 350, y: 640, maxChars: 10 },

    homeAddress: { x: 114, y: 497, maxChars: 40 },
    zipCode: { x: 428, y: 497, maxChars: 8 },
    signature: { x: 505, y: 525, maxChars: 24 },
    printedName: { x: 505, y: 488, maxChars: 24 },

    officeStation: { x: 114, y: 435, maxChars: 24 },
    region: { x: 350, y: 435, maxChars: 15 },
    position: { x: 430, y: 435, maxChars: 18 },

    appointmentStatus: { x: 114, y: 399, maxChars: 24 },
    contactNumber: { x: 350, y: 337, maxChars: 16 },
    emailAddress: { x: 430, y: 337, maxChars: 26 },

    endorserSignature: { x: 48, y: 332, maxChars: 28 },
    endorserMobile: { x: 206, y: 332, maxChars: 16 },
    endorserDesignation: { x: 315, y: 332, maxChars: 16 },
    endorserEdp: { x: 460, y: 332, maxChars: 16 },

    jibBy: { x: 42, y: 274, maxChars: 20 },
    leaveAsOf: { x: 203, y: 302, maxChars: 10 },
    vacationLeave: { x: 225, y: 287, maxChars: 14 },
    sickLeave: { x: 225, y: 273, maxChars: 14 },
    leaveTotal: { x: 225, y: 258, maxChars: 14 },
    leaveBy: { x: 225, y: 242, maxChars: 14 },
    edpAsOf: { x: 420, y: 302, maxChars: 10 },
    takeHomePay: { x: 443, y: 287, maxChars: 14 },
    monthlySalary: { x: 443, y: 273, maxChars: 14 },
    edpBy: { x: 443, y: 242, maxChars: 14 },

    totalDeductions: { x: 434, y: 106, maxChars: 16 },
    takeHomeAfterDeductions: { x: 434, y: 94, maxChars: 16 },

    sblSalary: { x: 42, y: 74, maxChars: 18 },
    sblAllowances: { x: 42, y: 63, maxChars: 18 },
    sblCapitalContribution: { x: 42, y: 52, maxChars: 18 },
    sblOthers: { x: 42, y: 41, maxChars: 18 },
    sblValue: { x: 42, y: 30, maxChars: 18 },

    remarks: { x: 280, y: 72, maxChars: 42, lineSpacing: 10 },
    loanProcessor: { x: 456, y: 26, maxChars: 26 },
    approvedBy: { x: 42, y: 26, maxChars: 30 },
    confirmedBy: { x: 242, y: 26, maxChars: 30 },
    otherRegularLoanType: { x: 194, y: 686, maxChars: 16 }
};

const outstandingLoanRows = [
    "SALARY", "MULTI-PURPOSE", "EDUCATIONAL", "MAXI", "BUSINESS", "HELP", "EMERGENCY RATA",
    "MEAL", "HOUSING", "JDF/ALLOWANCE", "EEA APRIL", "MID YEAR", "ANNIVERSARY", "EEA OCTOBER", "YEAR END", "CASH GIFT"
];

function sanitizeNumbersOnly(input) {
    input.value = input.value.replace(/[^0-9]/g, "");
}

function sanitizeMoney(input) {
    const cleaned = input.value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    input.value = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;
}

function formatDateMMDDYYYY(dateValue) {
    if (!dateValue) return "";
    const [y, m, d] = dateValue.split("-");
    if (!y || !m || !d) return "";
    return `${m}${d}${y}`;
}

function formatDateMMDDYYYYSlashed(dateValue) {
    if (!dateValue) return "";
    const [y, m, d] = dateValue.split("-");
    if (!y || !m || !d) return "";
    return `${m}/${d}/${y}`;
}

function wrapText(text, maxChars) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    if (!words.length) return [""];

    const lines = [];
    let current = "";
    words.forEach((word) => {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length <= maxChars) {
            current = candidate;
        } else {
            if (current) lines.push(current);
            current = word;
        }
    });

    if (current) lines.push(current);
    return lines;
}

function drawText(page, text, cfg, font, size = 9) {
    const lines = wrapText(text, cfg.maxChars || 26);
    const lineSpacing = cfg.lineSpacing || 11;
    lines.forEach((line, index) => {
        page.drawText(line, {
            x: cfg.x + PDF_TEXT_OFFSET.x,
            y: cfg.y + PDF_TEXT_OFFSET.y - index * lineSpacing,
            size,
            font,
            color: PDFLib.rgb(0, 0, 0)
        });
    });
}

function markX(page, key, font) {
    const pos = checkPositions[key];
    if (!pos) return;

    page.drawText("X", {
        x: pos.x + PDF_CHECK_OFFSET.x,
        y: pos.y + PDF_CHECK_OFFSET.y,
        size: 9,
        font,
        color: PDFLib.rgb(0, 0, 0)
    });
}

function getSelectedCheckboxValue(name) {
    const checked = Array.from(document.querySelectorAll(`input[name=\"${name}\"]:checked`));
    return checked.map((item) => item.value);
}

function enforceSingleSelection(groupName, target) {
    document.querySelectorAll(`input[name=\"${groupName}\"]`).forEach((input) => {
        if (input !== target) input.checked = false;
    });
}

function gatherOutstandingLoans() {
    const rows = [];
    const trs = document.querySelectorAll("#outstandingLoansTable tbody tr");
    trs.forEach((tr) => {
        const inputs = tr.querySelectorAll("input");
        rows.push({
            amount: inputs[0]?.value || "",
            dateGranted: inputs[1]?.value || "",
            balance: inputs[2]?.value || "",
            currentDeduction: inputs[3]?.value || "",
            newDeduction: inputs[4]?.value || ""
        });
    });
    return rows;
}

function validateForm() {
    const requiredIds = [
        "loanAmount", "loanYears", "edpNumber", "birthdate", "placeOfBirth", "lastName", "firstName", "homeAddress", "zipCode",
        "officeStation", "region", "position", "appointmentStatus", "contactNumber", "emailAddress", "signature", "printedName"
    ];

    for (const id of requiredIds) {
        const el = document.getElementById(id);
        if (el && !el.value.trim()) {
            return `Please fill out required field: ${id}`;
        }
    }

    if (!getSelectedCheckboxValue("applicationType").length) {
        return "Please select application type (New Loan or Consolidate).";
    }

    const hasLoanType = getSelectedCheckboxValue("regularLoanType").length || getSelectedCheckboxValue("specialLoanType").length;
    if (!hasLoanType) {
        return "Please select at least one loan type.";
    }

    const phone = document.getElementById("contactNumber").value.trim();
    if (!/^(09|\+639)[0-9]{9}$/.test(phone)) {
        return "Please enter a valid Philippine mobile number.";
    }

    const email = document.getElementById("emailAddress").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Please enter a valid email address.";
    }

    const zip = document.getElementById("zipCode").value.trim();
    if (!/^[0-9]{4}$/.test(zip)) {
        return "Please enter a valid 4-digit ZIP Code.";
    }

    const dob = document.getElementById("birthdate").value;
    if (!dob) return "Please enter Date of Birth.";

    const dobDate = new Date(dob);
    const now = new Date();
    dobDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    if (dobDate >= now) {
        return "Date of Birth cannot be today or a future date.";
    }

    return "";
}

async function generatePdf() {
    const templateBytes = await fetch(PDF_TEMPLATE_PATH).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

    const values = {
        receivedDate: formatDateMMDDYYYYSlashed(document.getElementById("receivedDate").value),
        applicantFullName: document.getElementById("applicantFullName").value.trim(),
        loanAmount: document.getElementById("loanAmount").value.trim(),
        loanYears: document.getElementById("loanYears").value.trim(),
        edpNumber: document.getElementById("edpNumber").value.trim(),
        tin: document.getElementById("tin").value.trim(),
        birthdate: formatDateMMDDYYYY(document.getElementById("birthdate").value),
        placeOfBirth: document.getElementById("placeOfBirth").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        firstName: document.getElementById("firstName").value.trim(),
        middleName: document.getElementById("middleName").value.trim(),
        suffix: document.getElementById("suffix").value.trim(),
        homeAddress: document.getElementById("homeAddress").value.trim(),
        zipCode: document.getElementById("zipCode").value.trim(),
        officeStation: document.getElementById("officeStation").value.trim(),
        region: document.getElementById("region").value.trim(),
        position: document.getElementById("position").value.trim(),
        appointmentStatus: document.getElementById("appointmentStatus").value.trim(),
        contactNumber: document.getElementById("contactNumber").value.trim(),
        emailAddress: document.getElementById("emailAddress").value.trim(),
        signature: document.getElementById("signature").value.trim(),
        printedName: document.getElementById("printedName").value.trim(),
        endorserSignature: document.getElementById("endorserSignature").value.trim(),
        endorserMobile: document.getElementById("endorserMobile").value.trim(),
        endorserDesignation: document.getElementById("endorserDesignation").value.trim(),
        endorserEdp: document.getElementById("endorserEdp").value.trim(),
        jibBy: document.getElementById("jibBy").value.trim(),
        leaveAsOf: formatDateMMDDYYYYSlashed(document.getElementById("leaveAsOf").value),
        vacationLeave: document.getElementById("vacationLeave").value.trim(),
        sickLeave: document.getElementById("sickLeave").value.trim(),
        leaveTotal: document.getElementById("leaveTotal").value.trim(),
        leaveBy: document.getElementById("leaveBy").value.trim(),
        edpAsOf: formatDateMMDDYYYYSlashed(document.getElementById("edpAsOf").value),
        takeHomePay: document.getElementById("takeHomePay").value.trim(),
        monthlySalary: document.getElementById("monthlySalary").value.trim(),
        edpBy: document.getElementById("edpBy").value.trim(),
        totalDeductions: document.getElementById("totalDeductions").value.trim(),
        takeHomeAfterDeductions: document.getElementById("takeHomeAfterDeductions").value.trim(),
        sblSalary: document.getElementById("sblSalary").value.trim(),
        sblAllowances: document.getElementById("sblAllowances").value.trim(),
        sblCapitalContribution: document.getElementById("sblCapitalContribution").value.trim(),
        sblOthers: document.getElementById("sblOthers").value.trim(),
        sblValue: document.getElementById("sblValue").value.trim(),
        remarks: document.getElementById("remarks").value.trim(),
        loanProcessor: document.getElementById("loanProcessor").value.trim(),
        approvedBy: document.getElementById("approvedBy").value.trim(),
        confirmedBy: document.getElementById("confirmedBy").value.trim(),
        otherRegularLoanType: document.getElementById("otherRegularLoanType").value.trim()
    };

    Object.entries(textMap).forEach(([key, cfg]) => {
        if (values[key]) drawText(page, values[key], cfg, font, 9);
    });

    const regularTypes = getSelectedCheckboxValue("regularLoanType");
    const specialTypes = getSelectedCheckboxValue("specialLoanType");
    const appType = getSelectedCheckboxValue("applicationType");

    [...regularTypes, ...specialTypes, ...appType].forEach((value) => markX(page, value, font));

    if (document.getElementById("withoutPendingCase").checked) markX(page, "Without Pending Case", font);
    if (document.getElementById("withPendingCase").checked) markX(page, "With Pending Case", font);
    if (document.getElementById("deliveryLbp").checked) markX(page, "Delivery LBP", font);

    const outstanding = gatherOutstandingLoans();
    const startY = 208;
    const rowGap = 10;
    outstanding.forEach((row, index) => {
        if (index >= outstandingLoanRows.length) return;
        const y = startY - index * rowGap;
        if (row.amount) drawText(page, row.amount, { x: 190, y, maxChars: 14 }, font, 8);
        if (row.dateGranted) drawText(page, formatDateMMDDYYYYSlashed(row.dateGranted), { x: 254, y, maxChars: 12 }, font, 8);
        if (row.balance) drawText(page, row.balance, { x: 333, y, maxChars: 14 }, font, 8);
        if (row.currentDeduction) drawText(page, row.currentDeduction, { x: 414, y, maxChars: 12 }, font, 8);
        if (row.newDeduction) drawText(page, row.newDeduction, { x: 486, y, maxChars: 12 }, font, 8);
    });

    const bytes = await pdfDoc.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "LC-Loan-Application-Filled.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 20000);
}

function setupInputFormatting() {
    document.querySelectorAll("input[inputmode='numeric']").forEach((input) => {
        input.addEventListener("input", () => sanitizeNumbersOnly(input));
    });

    document.querySelectorAll(".money").forEach((input) => {
        input.addEventListener("input", () => sanitizeMoney(input));
    });

    document.getElementById("contactNumber").addEventListener("blur", (event) => {
        const value = event.target.value.replace(/\s+/g, "");
        if (value.startsWith("639") && value.length === 12) {
            event.target.value = `+${value}`;
        }
    });

    document.querySelectorAll("input[name='applicationType']").forEach((checkbox) => {
        checkbox.addEventListener("change", () => enforceSingleSelection("applicationType", checkbox));
    });

    document.getElementById("withoutPendingCase").addEventListener("change", (event) => {
        if (event.target.checked) document.getElementById("withPendingCase").checked = false;
    });

    document.getElementById("withPendingCase").addEventListener("change", (event) => {
        if (event.target.checked) document.getElementById("withoutPendingCase").checked = false;
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
        alert(validationError);
        return;
    }

    try {
        await generatePdf();
    } catch (error) {
        console.error(error);
        alert("Unable to generate PDF. Please verify the template file and try again.");
    }
});

resetBtn.addEventListener("click", () => {
    form.reset();
});

printBtn.addEventListener("click", () => {
    window.print();
});

setupInputFormatting();
