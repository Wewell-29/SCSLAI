// ===============================
// LOAN APPLICATION MODAL
// ===============================

const loanModal = document.getElementById("loanModal");

const openLoanModal = document.getElementById("openLoanModal");

const closeLoanModal = document.getElementById("closeLoanModal");

const cancelLoanModal = document.getElementById("cancelLoanModal");

const loanForm = document.getElementById(
    "loanApplicationForm"
);

const loanPdfTemplate = "FORMS/Lower Court (LC) Loan Application Form1 (1).pdf";

let activeLoanPreviewWindow = null;
window.__loanPreviewLastOpened = null;

const pdfFieldMap = {
    loanCategory: { page: 0, x: 170, y: 740, size: 9, maxCharsPerLine: 24, lineSpacing: 12, align: "left" },
    loanType: { page: 0, x: 425, y: 740, size: 9, maxCharsPerLine: 24, lineSpacing: 12, align: "left" },
    applicationType: { page: 0, x: 170, y: 713, size: 9, maxCharsPerLine: 24, lineSpacing: 12, align: "left" },
    lastName: { page: 0, x: 114, y: 676, size: 9, maxCharsPerLine: 30, lineSpacing: 12, align: "left" },
    firstName: { page: 0, x: 350, y: 676, size: 9, maxCharsPerLine: 28, lineSpacing: 12, align: "left" },
    middleName: { page: 0, x: 114, y: 640, size: 9, maxCharsPerLine: 24, lineSpacing: 12, align: "left" },
    suffix: { page: 0, x: 350, y: 640, size: 9, maxCharsPerLine: 12, lineSpacing: 12, align: "left" },
    edpNumber: { page: 0, x: 114, y: 604, size: 9, maxCharsPerLine: 18, lineSpacing: 12, align: "left" },
    tin: { page: 0, x: 350, y: 604, size: 9, maxCharsPerLine: 18, lineSpacing: 12, align: "left" },
    birthdate: { page: 0, x: 114, y: 568, size: 9, maxCharsPerLine: 20, lineSpacing: 12, align: "left" },
    placeOfBirth: { page: 0, x: 350, y: 568, size: 9, maxCharsPerLine: 22, lineSpacing: 12, align: "left" },
    homeAddress: { page: 0, x: 114, y: 497, size: 9, maxCharsPerLine: 42, lineSpacing: 12, align: "left" },
    zipCode: { page: 0, x: 428, y: 497, size: 9, maxCharsPerLine: 10, lineSpacing: 12, align: "left" },
    officeStation: { page: 0, x: 114, y: 435, size: 9, maxCharsPerLine: 28, lineSpacing: 12, align: "left" },
    region: { page: 0, x: 350, y: 435, size: 9, maxCharsPerLine: 20, lineSpacing: 12, align: "left" },
    position: { page: 0, x: 114, y: 399, size: 9, maxCharsPerLine: 28, lineSpacing: 12, align: "left" },
    appointment: { page: 0, x: 350, y: 399, size: 9, maxCharsPerLine: 24, lineSpacing: 12, align: "left" },
    contactNumber: { page: 0, x: 114, y: 337, size: 9, maxCharsPerLine: 20, lineSpacing: 12, align: "left" },
    emailAddress: { page: 0, x: 350, y: 337, size: 9, maxCharsPerLine: 30, lineSpacing: 12, align: "left" }
};

const pdfSelectionMap = {
    "Regular Loan": { page: 0, x: 132, y: 742, size: 9, boxWidth: 8, boxHeight: 8 },
    "Special Loan": { page: 0, x: 334, y: 742, size: 9, boxWidth: 8, boxHeight: 8 },
    "MAXI LOAN": { page: 0, x: 132, y: 715, size: 9, boxWidth: 8, boxHeight: 8 },
    "Housing Loan": { page: 0, x: 334, y: 715, size: 9, boxWidth: 8, boxHeight: 8 },
    "Emergency Loan": { page: 0, x: 132, y: 688, size: 9, boxWidth: 8, boxHeight: 8 },
    "Special Housing Loan": { page: 0, x: 132, y: 660, size: 9, boxWidth: 8, boxHeight: 8 },
    "Special Salary Loan": { page: 0, x: 334, y: 660, size: 9, boxWidth: 8, boxHeight: 8 },
    "Special Emergency Loan": { page: 0, x: 132, y: 633, size: 9, boxWidth: 8, boxHeight: 8 },
    "New Loan": { page: 0, x: 132, y: 563, size: 9, boxWidth: 8, boxHeight: 8 },
    "Consolidate": { page: 0, x: 334, y: 563, size: 9, boxWidth: 8, boxHeight: 8 }
};


const loanCategoryField = document.getElementById("loanCategory");

const loanTypeField = document.getElementById("loanType");

const applicationTypeField = document.getElementById("applicationType");


const loanTypeOptions = {
    "Regular Loan": [
        "MAXI LOAN",
        "Housing Loan",
        "Emergency Loan"
    ],
    "Special Loan": [
        "Special Housing Loan",
        "Special Salary Loan",
        "Special Emergency Loan"
    ]
};


function populateLoanTypes(selectedCategory) {

    if (!loanTypeField) {

        return;

    }

    const options = loanTypeOptions[selectedCategory] || [];

    loanTypeField.innerHTML = "<option value=''>Select Type of Loan</option>";

    options.forEach((optionLabel) => {

        const option = document.createElement("option");

        option.value = optionLabel;

        option.textContent = optionLabel;

        loanTypeField.appendChild(option);

    });

}


function getFormValue(elementId) {

    const field = document.getElementById(elementId);

    return field ? field.value.trim() : "";

}


function wrapPdfText(text, maxCharsPerLine) {

    const words = text.split(/\s+/).filter(Boolean);

    if (words.length === 0) {

        return [""];

    }

    const lines = [];

    let currentLine = "";

    words.forEach((word) => {

        const candidate = currentLine
            ? `${currentLine} ${word}`
            : word;

        if (candidate.length <= maxCharsPerLine) {

            currentLine = candidate;

        } else {

            lines.push(currentLine);

            currentLine = word;

        }

    });

    if (currentLine) {

        lines.push(currentLine);

    }

    return lines;

}


function drawPdfText(page, value, position, font) {

    const wrappedLines = wrapPdfText(
        value,
        position.maxCharsPerLine || 24
    );

    wrappedLines.forEach((line, index) => {

        const lineSpacing = position.lineSpacing || (position.size + 2);

        page.drawText(line, {
            x: position.x,
            y: position.y - (index * lineSpacing),
            size: position.size,
            font,
            color: PDFLib.rgb(0, 0, 0)
        });

    });

}


function markPdfSelection(page, selection, font) {

    const boxWidth = selection.boxWidth || 8;
    const boxHeight = selection.boxHeight || 8;
    const x = selection.x;
    const y = selection.y;

    page.drawRectangle({
        x: x - 2,
        y: y - 2,
        width: boxWidth + 4,
        height: boxHeight + 4,
        borderColor: PDFLib.rgb(0, 0, 0),
        borderWidth: 1,
        color: PDFLib.rgb(1, 1, 1)
    });

    page.drawText("X", {
        x: x,
        y: y,
        size: selection.size,
        font,
        color: PDFLib.rgb(0, 0, 0)
    });

}


function buildLoanPreviewPopupHtml() {

    const templatePath = new URL(loanPdfTemplate, window.location.href).href;

    const overlayRows = [
        ["Loan Category", getFormValue("loanCategory")],
        ["Type of Loan", getFormValue("loanType")],
        ["Application Type", getFormValue("applicationType")],
        ["Last Name", getFormValue("lastName")],
        ["First Name", getFormValue("firstName")],
        ["Middle Name", getFormValue("middleName")],
        ["Suffix", getFormValue("suffix")],
        ["EDP #", getFormValue("edpNumber")],
        ["TIN", getFormValue("tin")],
        ["Birthdate", getFormValue("birthdate")],
        ["Place of Birth", getFormValue("placeOfBirth")],
        ["Home Address", getFormValue("homeAddress")],
        ["ZIP Code", getFormValue("zipCode")],
        ["Office Station", getFormValue("officeStation")],
        ["Region", getFormValue("region")],
        ["Position", getFormValue("position")],
        ["Appointment", getFormValue("appointment")],
        ["Contact Number", getFormValue("contactNumber")],
        ["Email Address", getFormValue("emailAddress")]
    ].map(([label, value]) => {

        const safeLabel = (label || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeValue = (value || "-").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        return `<div class="field-row"><span class="field-label">${safeLabel}</span><span class="field-value">${safeValue}</span></div>`;

    }).join("");

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Loan Application Preview</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f2f2f2;
        }
        .preview-shell {
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
        }
        .preview-canvas {
            position: relative;
            width: 900px;
            max-width: 100%;
            background: white;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
            margin: 0 auto;
        }
        .preview-canvas iframe {
            width: 100%;
            height: 1180px;
            border: 0;
            display: block;
        }
        .overlay {
            position: absolute;
            inset: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 32px;
            padding: 120px 72px 40px 72px;
            align-content: start;
            font-size: 12px;
            line-height: 1.45;
            color: #111;
            pointer-events: none;
        }
        .field-row {
            display: flex;
            align-items: flex-start;
            gap: 6px;
        }
        .field-label {
            font-weight: 700;
            min-width: 110px;
        }
        .field-value {
            word-break: break-word;
        }
        .print-button {
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 10;
            padding: 10px 16px;
            border: none;
            border-radius: 6px;
            background: #0b6b3a;
            color: white;
            cursor: pointer;
        }
        @media print {
            body { background: white; }
            .print-button { display: none; }
            .preview-canvas {
                box-shadow: none;
                width: 100%;
            }
            .preview-canvas iframe {
                height: 100vh;
            }
        }
    </style>
</head>
<body>
    <button class="print-button" onclick="window.print()">Print Preview</button>
    <div class="preview-shell">
        <div class="preview-canvas">
            <iframe src="${templatePath}"></iframe>
            <div class="overlay">${overlayRows}</div>
        </div>
    </div>
</body>
</html>`;

}


function syncPdfPreview() {

    if (!loanForm) {

        return;

    }

    try {

        if (activeLoanPreviewWindow && !activeLoanPreviewWindow.closed) {

            activeLoanPreviewWindow.close();

        }

        activeLoanPreviewWindow = window.open(
            "",
            "_blank",
            "width=1100,height=900,noopener,noreferrer"
        );

        window.__loanPreviewLastOpened = activeLoanPreviewWindow;

        if (!activeLoanPreviewWindow) {

            alert("Please allow pop-up windows for the loan preview.");
            return;

        }

        activeLoanPreviewWindow.document.open();
        activeLoanPreviewWindow.document.write(buildLoanPreviewPopupHtml());
        activeLoanPreviewWindow.document.close();
        activeLoanPreviewWindow.focus();

    } catch (error) {

        console.error("PDF sync failed:", error);

    }

}


if (openLoanModal) {

    openLoanModal.addEventListener("click", () => {

        loanModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

}


// CLOSE MODAL FUNCTION
function closeModal() {

    loanModal.classList.remove("active");

    document.body.style.overflow = "auto";

}


// CLOSE USING X BUTTON
if (closeLoanModal) {

    closeLoanModal.addEventListener(
        "click",
        closeModal
    );

}


// CLOSE USING CANCEL BUTTON
if (cancelLoanModal) {

    cancelLoanModal.addEventListener(
        "click",
        closeModal
    );

}


// CLOSE WHEN CLICKING OUTSIDE THE MODAL
/*loanModal.addEventListener(
    "click",
    function (event) {

        if (event.target === loanModal) {

            closeModal();

        }

    }
);*/


// CLOSE USING ESCAPE KEY
document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            loanModal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);

// ==============================
// FORM VALIDATION
// ==============================

if (loanCategoryField) {

    loanCategoryField.addEventListener("change", () => {

        populateLoanTypes(loanCategoryField.value);

    });

}


if (loanForm) {

    loanForm.querySelectorAll("input, select").forEach(
        (field) => {

            field.addEventListener("input", () => {

                if (field.id === "loanCategory") {

                    populateLoanTypes(field.value);

                }

            });

        }
    );

}


if (loanForm) {

    loanForm.addEventListener(
        "submit",
        async function (event) {

        event.preventDefault();


        // GET INPUT VALUES
        const loanCategory = getFormValue("loanCategory");
        const loanType = getFormValue("loanType");
        const applicationType = getFormValue("applicationType");
        const lastName = getFormValue("lastName");
        const firstName = getFormValue("firstName");
        const middleName = getFormValue("middleName");
        const suffix = getFormValue("suffix");
        const edpNumber = getFormValue("edpNumber");
        const tin = getFormValue("tin");
        const birthdate = document.getElementById("birthdate")?.value || "";
        const placeOfBirth = getFormValue("placeOfBirth");
        const homeAddress = getFormValue("homeAddress");
        const zipCode = getFormValue("zipCode");
        const officeStation = getFormValue("officeStation");
        const region = getFormValue("region");
        const position = getFormValue("position");
        const appointment = getFormValue("appointment");
        const contactNumber = getFormValue("contactNumber");
        const emailAddress = getFormValue("emailAddress");


        // REQUIRED FIELD VALIDATION
        if (
            !lastName ||
            !firstName ||
            !edpNumber ||
            !birthdate ||
            !placeOfBirth ||
            !homeAddress ||
            !zipCode ||
            !officeStation ||
            !region ||
            !position ||
            !appointment ||
            !contactNumber ||
            !emailAddress
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        // NAME VALIDATION
        const namePattern =
            /^[A-Za-zÀ-ÿ\s'-]+$/;


        if (
            !namePattern.test(lastName) ||
            !namePattern.test(firstName)
        ) {

            alert(
                "Please enter a valid name."
            );

            return;

        }


        // EDP NUMBER VALIDATION
        const edpPattern =
            /^[0-9]+$/;


        if (
            !edpPattern.test(edpNumber)
        ) {

            alert(
                "EDP # must contain numbers only."
            );

            return;

        }


        // ZIP CODE VALIDATION
        const zipPattern =
            /^[0-9]{4}$/;


        if (
            !zipPattern.test(zipCode)
        ) {

            alert(
                "Please enter a valid 4-digit ZIP Code."
            );

            return;

        }


        // CONTACT NUMBER VALIDATION
        const phonePattern =
            /^(09|\+639)[0-9]{9}$/;


        if (
            !phonePattern.test(contactNumber)
        ) {

            alert(
                "Please enter a valid Philippine mobile number."
            );

            return;

        }


        // EMAIL VALIDATION
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(emailAddress)
        ) {

            alert(
                "Please enter a valid email address."
            );

            return;

        }


        // BIRTHDATE VALIDATION
        const selectedDate =
            new Date(birthdate);


        const today =
            new Date();


        if (
            selectedDate >= today
        ) {

            alert(
                "Birthdate cannot be today or a future date."
            );

            return;

        }


        // SUCCESS
        closeModal();
        syncPdfPreview();

        alert(
            "All information is valid!"
        );

        console.log({

            loanCategory,

            loanType,

            applicationType,

            lastName,

            firstName,

            edpNumber,

            birthdate,

            placeOfBirth,

            homeAddress,

            zipCode,

            officeStation,

            region,

            position,

            appointment,

            contactNumber,

            emailAddress

        });

        }

    );

}