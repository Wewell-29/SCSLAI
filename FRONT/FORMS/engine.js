(function () {

    "use strict";

    /* =========================================================
       GLOBAL VARIABLES
       ========================================================= */

    var configs = {};
    var active = "sc";

    var modal = null;
    var body = document.body;
    var closeBtn = null;

    var currentValues = {};
    var currentSelections = {};


    /* =========================================================
       REGISTER FORM CONFIGURATION
       ========================================================= */

    function register(cfg) {

        if (cfg && cfg.key) {

            configs[cfg.key] = cfg;

        }

    }


    function cfg() {

        return configs[active] || {};

    }


    /* =========================================================
       BUTTONS
       ========================================================= */

    function bindButtons() {

        var btns =
            document.querySelectorAll(
                "[data-open-loan-form]"
            );

        Array.prototype.forEach.call(
            btns,
            function (btn) {

                btn.addEventListener(
                    "click",
                    function (e) {

                        e.preventDefault();

                        var key =
                            btn.getAttribute(
                                "data-form"
                            ) || "sc";


                        if (!configs[key]) {

                            console.warn(
                                "SCSLAI form configuration not found:",
                                key
                            );

                            return;

                        }


                        active = key;

                        currentValues = {};

                        currentSelections = {};


                        openModal();

                    }
                );

            }
        );

    }


    /* =========================================================
       FORM DIMENSIONS
       ========================================================= */

    function getWidth() {

        return cfg().width || 1275;

    }


    function getHeight() {

        return cfg().height || 2100;

    }


    function pageDims(pg2) {

        var c = cfg();

        if (pg2) {

            return {
                w: Number(c.width2 || c.width || 1275),
                h: Number(c.height2 || c.height || 2100)
            };

        }

        return {
            w: Number(c.width || 1275),
            h: Number(c.height || 2100)
        };

    }


    function hasPage2() {

        return !!cfg().hasPage2;

    }


    function hasBoxes() {

        return !!cfg().hasCheckboxes;

    }


    function useUpper() {

        return cfg().useUppercase !== false;

    }


    /* =========================================================
       INK COLOR
       ========================================================= */

    function inkColor() {

        return cfg().inkColor || "#003f91";

    }


    function hexToRgb(hex) {

        var h =
            String(
                hex || "#003f91"
            ).replace(
                "#",
                ""
            );

        if (h.length === 3) {

            h = h.replace(
                /./g,
                function (ch) {
                    return ch + ch;
                }
            );

        }

        var n =
            parseInt(
                h,
                16
            );

        if (isNaN(n)) {

            n = 0x003f91;

        }

        return {

            r: (
                (n >> 16) & 255
            ) / 255,

            g: (
                (n >> 8) & 255
            ) / 255,

            b: (
                n & 255
            ) / 255

        };

    }


    /* =========================================================
       PDF PAPER SIZE
       ========================================================= */

    function pdfPageSize(dims) {

        var aw =
            Number(dims.w) || 1275;

        var ah =
            Number(dims.h) || 2100;

        var c =
            cfg();

        var L =
            window.PDFLib;


        /* -----------------------------------------------
           EXPLICIT OVERRIDE — points
           ----------------------------------------------- */

        if (
            Number(c.paperWidth) > 0 &&
            Number(c.paperHeight) > 0
        ) {

            return {

                w: Number(c.paperWidth),

                h: Number(c.paperHeight)

            };

        }


        /* -----------------------------------------------
           NAMED OVERRIDE — "A4" | "LETTER" | "LEGAL"
           ----------------------------------------------- */

        var name =
            String(
                c.paperSize || ""
            ).toUpperCase();

        if (
            L &&
            L.PageSizes &&
            L.PageSizes[name]
        ) {

            return {

                w: L.PageSizes[name][0],

                h: L.PageSizes[name][1]

            };

        }


        /* -----------------------------------------------
           AUTO — match the nearest standard paper size
           by aspect ratio (scans are Letter / Legal / A4)
           ----------------------------------------------- */

        var aspect =
            aw / ah;

        var candidates = [
            "A4",
            "LETTER",
            "LEGAL"
        ];

        var pick =
            null;

        var bestDiff =
            9999;


        candidates.forEach(
            function (key) {

                if (
                    !L ||
                    !L.PageSizes ||
                    !L.PageSizes[key]
                ) {

                    return;

                }

                var p =
                    L.PageSizes[key];

                var diff =
                    Math.abs(
                        (p[0] / p[1]) -
                        aspect
                    );

                if (
                    diff < bestDiff
                ) {

                    bestDiff =
                        diff;

                    pick = {

                        w: p[0],

                        h: p[1]

                    };

                }

            }
        );


        /* -----------------------------------------------
           FALLBACK — use the design pixels as points
           ----------------------------------------------- */

        return (
            pick || {
                w: aw,
                h: ah
            }
        );

    }


    /* =========================================================
       INPUT FIELD LABELS
       ========================================================= */

    var fieldLabels = {

        others: "Others",

        applicantName: "Applicant Name",

        amountWords: "Amount in Words",

        loanAmount: "Loan Amount",

        payableYearsWords: "Payable Years in Words",

        payableYears: "Payable Years",

        edpNumber: "EDP Number",

        tin: "TIN",

        birthdate: "Birthdate",

        placeOfBirth: "Place of Birth",

        lastName: "Last Name",

        firstName: "First Name",

        middleName: "Middle Name",

        suffix: "Suffix",

        officeStation: "Office / Station",

        position: "Position",

        appointment: "Status of Appointment",

        homeAddress: "Home Address",

        zipCode: "ZIP Code",

        printedName: "Printed Name",

        contactNumber: "Contact Number",

        emailAddress: "Email Address",

        pnNumber: "PN Number",

        pnAmountWords: "PN Amount in Words",

        pnAmountFigures: "PN Amount",

        pnInterestRate: "Interest Rate",

        pnRatePercent: "Rate Percent",

        pnInstallments: "Number of Installments",

        pnInstallmentAmt: "Installment Amount",

        pnAddlRate: "Additional Rate",

        pnPrintedName: "Printed Name"

    };


    function getFieldLabel(id) {

        var custom =
            cfg().fieldLabels || {};

        if (custom[id]) {

            return custom[id];

        }

        if (fieldLabels[id]) {

            return fieldLabels[id];

        }


        return id

            .replace(
                /([A-Z])/g,
                " $1"
            )

            .replace(
                /^./,
                function (s) {
                    return s.toUpperCase();
                }
            );

    }


    /* =========================================================
       FIELD HTML
       ========================================================= */

    function fieldHTML(map) {

        return Object.keys(map).map(
            function (id) {

                var label =
                    getFieldLabel(id);

                var input = "";


                /* =================================================
                   PAYABLE YEARS
                   ================================================= */

                if (id === "payableYears") {

                    var opts = [];


                    for (
                        var n = 1;
                        n <= 30;
                        n++
                    ) {

                        opts.push(

                            '<option value="' +
                                n +
                            '">' +

                                n +

                                ' Year' +

                                (
                                    n > 1
                                        ? "s"
                                        : ""
                                ) +

                            '</option>'

                        );

                    }


                    input =

                        '<select ' +

                            'id="' +
                                id +
                            '" ' +

                            'class="loan-input">' +

                            '<option value="">' +
                                'Select' +
                            '</option>' +

                            opts.join("") +

                        '</select>';

                }


                /* =================================================
                   PAYABLE YEARS WORDS
                   ================================================= */

                else if (
                    id === "payableYearsWords"
                ) {

                    input =

                        '<input ' +

                            'type="text" ' +

                            'id="' +
                                id +
                            '" ' +

                            'class="loan-input" ' +

                            'readonly>';


                }


                /* =================================================
                   BIRTHDATE
                   ================================================= */

                else if (
                    id === "birthdate"
                ) {

                    input =

                        '<input ' +

                            'type="date" ' +

                            'id="' +
                                id +
                            '" ' +

                            'class="loan-input">';

                }


                /* =================================================
                   EMAIL
                   ================================================= */

                else if (
                    id === "emailAddress"
                ) {

                    input =

                        '<input ' +

                            'type="email" ' +

                            'id="' +
                                id +
                            '" ' +

                            'class="loan-input" ' +

                            'placeholder="example@email.com">';

                }


                /* =================================================
                   LOAN AMOUNT
                   ================================================= */

                else if (
                    id === "loanAmount"
                ) {

                    input =

                        '<input ' +

                            'type="number" ' +

                            'id="' +
                                id +
                            '" ' +

                            'class="loan-input" ' +

                            'min="0" ' +

                            'step="0.01" ' +

                            'placeholder="Enter loan amount">';

                }


                /* =================================================
                   NORMAL TEXT
                   ================================================= */

                else {

                    input =

                        '<input ' +

                            'type="text" ' +

                            'id="' +
                                id +
                            '" ' +

                            'class="loan-input" ' +

                            'maxlength="80">';

                }


                return (

                    '<div class="loan-field">' +

                        '<label for="' +
                            id +
                        '">' +

                            label +

                        '</label>' +

                        input +

                    '</div>'

                );

            }
        ).join("");

    }


    /* =========================================================
       CHECKBOX / RADIO HTML
       ========================================================= */

    function checkboxHTMLByCategory(category) {

        var cbMap =
            cfg().checkboxes || {};

        var labels =
            cfg().labels || {};


        return Object.keys(cbMap).map(
            function (id) {

                if (
                    cbMap[id].category !== category
                ) {

                    return "";

                }


                var radioName;


                /*
                 * REGULAR + SPECIAL
                 * share one radio group.
                 */

                if (
                    category === "regular" ||
                    category === "special"
                ) {

                    radioName =
                        "loan_type";

                }

                else {

                    radioName =
                        "loan_" +
                        category;

                }


                return (

                    '<label ' +

                        'class="modal-checkbox-item">' +


                        '<input ' +

                            'type="radio" ' +

                            'id="' +
                                id +
                            '" ' +

                            'name="' +
                                radioName +
                            '" ' +

                            'class="form-checkbox" ' +

                            'data-category="' +
                                category +
                            '" ' +

                            'value="' +
                                id +
                            '">' +


                        '<span>' +

                            (
                                labels[id] ||
                                id
                            ) +

                        '</span>' +


                    '</label>'

                );

            }
        ).join("");

    }


    /* =========================================================
       CHECKBOX / RADIO SECTION
       ========================================================= */

    function checkboxHTML() {

        if (!hasBoxes()) {

            return "";

        }


        return (

            '<div class="modal-checkbox-section">' +


                /* =================================================
                   TYPE OF LOAN
                   ================================================= */

                '<div class="modal-checkbox-group">' +

                    '<h3>Type of Loan</h3>' +

                    '<div class="loan-checkbox-list">' +

                        checkboxHTMLByCategory(
                            "regular"
                        ) +

                    '</div>' +

                '</div>' +


                /* =================================================
                   SPECIAL LOAN
                   ================================================= */

                '<div class="modal-checkbox-group">' +

                    '<h3>Special Loan</h3>' +

                    '<div class="loan-checkbox-list">' +

                        checkboxHTMLByCategory(
                            "special"
                        ) +

                    '</div>' +

                '</div>' +


                /* =================================================
                   APPLICATION TYPE
                   ================================================= */

                '<div class="modal-checkbox-group">' +

                    '<h3>Application Type</h3>' +

                    '<div class="loan-checkbox-list">' +

                        checkboxHTMLByCategory(
                            "application"
                        ) +

                    '</div>' +

                '</div>' +


                /* =================================================
                   MODE OF DELIVERY
                   ================================================= */

                '<div class="modal-checkbox-group">' +

                    '<h3>Mode of Delivery</h3>' +

                    '<div class="loan-checkbox-list">' +

                        checkboxHTMLByCategory(
                            "delivery"
                        ) +

                    '</div>' +

                '</div>' +


            '</div>'

        );

    }


    /* =========================================================
       REBUILD FORM
       ========================================================= */

    function rebuildCanvases() {

        var bd =
            document.querySelector(
                ".loan-modal-body"
            );


        if (!bd) {

            console.warn(
                ".loan-modal-body not found."
            );

            return;

        }


        var pages =
            hasPage2()
                ? [1, 2]
                : [1];


        var html = "";


        pages.forEach(
            function (n) {

                var isP2 =
                    n === 2;


                var map =
                    isP2
                        ? (
                            cfg().page2Fields ||
                            {}
                        )
                        : (
                            cfg().fields ||
                            {}
                        );


                html +=

                    '<div class="loan-form-page">' +


                        (
                            hasPage2()
                                ? (

                                    '<div class="loan-page-title">' +

                                        'Page ' +
                                        n +

                                    '</div>'

                                )
                                : ""
                        ) +


                        (
                            !isP2 &&
                            hasBoxes()

                                ? checkboxHTML()

                                : ""
                        ) +


                        '<div class="loan-form-fields">' +

                            fieldHTML(map) +

                        '</div>' +


                    '</div>';

            }
        );


        /* =================================================
           ACTION BUTTONS
           ================================================= */

        html +=

            '<div class="modal-actions">' +


                '<button ' +

                    'type="button" ' +

                    'id="cancelLoanModal">' +

                    'Cancel' +

                '</button>' +


                '<button ' +

                    'type="submit" ' +

                    'id="completeLoanModal">' +

                    'Complete' +

                '</button>' +


            '</div>';


        var form =
            document.getElementById(
                "loanApplicationForm"
            );


        if (!form) {

            console.error(
                "#loanApplicationForm was not found."
            );

            return;

        }


        form.innerHTML =
            html;


        /* =================================================
           CANCEL
           ================================================= */

        var cancel =
            document.getElementById(
                "cancelLoanModal"
            );


        if (cancel) {

            cancel.addEventListener(
                "click",
                closeModal
            );

        }


        /* =================================================
           PAYABLE YEARS
           ================================================= */

        wirePayableAutoFill();


        /* =================================================
           RESTORE VALUES
           ================================================= */

        if (
            Object.keys(currentValues).length ||
            Object.keys(currentSelections).length
        ) {

            restoreValues();

        }

    }


    /* =========================================================
       OPEN MODAL
       ========================================================= */

    function openModal() {

        if (!modal) {

            console.warn(
                "#loanModal was not found."
            );

            return;

        }


        var h2 =
            modal.querySelector(
                ".loan-modal-header h2"
            );


        if (h2) {

            h2.textContent =
                cfg().title ||
                "Loan Application";

        }


        rebuildCanvases();


        modal.classList.add(
            "active"
        );


        body.classList.add(
            "loan-modal-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        var modalBody =
            modal.querySelector(
                ".loan-modal-body"
            );


        if (modalBody) {

            modalBody.scrollTop = 0;

        }


        body.style.overflow =
            "hidden";

    }


    /* =========================================================
       CLOSE MODAL
       ========================================================= */

    function closeModal() {

        if (!modal) {

            return;

        }


        modal.classList.remove(
            "active"
        );


        body.classList.remove(
            "loan-modal-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        body.style.overflow = "";

    }


    /* =========================================================
       NUMBER TO WORDS
       ========================================================= */

    var numW = [

        "",

        "ONE",

        "TWO",

        "THREE",

        "FOUR",

        "FIVE",

        "SIX",

        "SEVEN",

        "EIGHT",

        "NINE",

        "TEN",

        "ELEVEN",

        "TWELVE",

        "THIRTEEN",

        "FOURTEEN",

        "FIFTEEN",

        "SIXTEEN",

        "SEVENTEEN",

        "EIGHTEEN",

        "NINETEEN"

    ];


    var tenW = [

        "",

        "",

        "TWENTY",

        "THIRTY",

        "FORTY",

        "FIFTY",

        "SIXTY",

        "SEVENTY",

        "EIGHTY",

        "NINETY"

    ];


    function n2w(n) {

        var x =
            parseInt(
                n,
                10
            );


        if (
            isNaN(x) ||
            x < 1 ||
            x > 30
        ) {

            return "";

        }


        if (x < 20) {

            return numW[x];

        }


        return (

            tenW[
                Math.floor(
                    x / 10
                )
            ] +

            (
                x % 10

                    ? "-" +
                        numW[x % 10]

                    : ""
            )

        );

    }


    /* =========================================================
       PAYABLE YEARS AUTO FILL
       ========================================================= */

    function wirePayableAutoFill() {

        var p =
            document.getElementById(
                "payableYears"
            );


        var w =
            document.getElementById(
                "payableYearsWords"
            );


        if (!p || !w) {

            return;

        }


        p.addEventListener(
            "change",
            function () {

                w.value =
                    n2w(
                        this.value
                    );

            }
        );

    }


    /* =========================================================
       GET VALUE
       ========================================================= */

    function getVal(id) {

        var el =
            document.getElementById(id);


        if (!el) {

            return "";

        }


        return String(
            el.value || ""
        ).trim();

    }


    /* =========================================================
       GET CHECKED ITEMS
       ========================================================= */

    function checkedOf(cat) {

        var cbMap =
            cfg().checkboxes || {};

        var labels =
            cfg().labels || {};

        var list = [];


        Object.keys(cbMap).forEach(
            function (key) {

                if (
                    cbMap[key].category !== cat
                ) {

                    return;

                }


                var el =
                    document.getElementById(
                        key
                    );


                if (
                    el &&
                    el.checked
                ) {

                    list.push({

                        id: key,

                        label:
                            labels[key] ||
                            key

                    });

                }

            }
        );


        return list;

    }


    /* =========================================================
       COLLECT FORM DATA
       ========================================================= */

    function collectValues() {

        var fields =
            Object.assign(
                {},
                cfg().fields || {},
                cfg().page2Fields || {}
            );


        var vals = {};


        Object.keys(fields).forEach(
            function (id) {

                var el =
                    document.getElementById(
                        id
                    );


                if (el) {

                    vals[id] =
                        String(
                            el.value || ""
                        ).trim();

                }

                else {

                    vals[id] = "";

                }

            }
        );


        return vals;

    }


    /* =========================================================
       ESCAPE HTML
       ========================================================= */

    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =========================================================
    SHOW PREVIEW
    ========================================================= */

    function showPreview(vals, selections) {

        console.log(
            "Opening preview for:",
            active,
            cfg()
        );

        currentValues =
            vals || {};

        currentSelections =
            selections || {};


        /* =====================================================
        REMOVE OLD PREVIEW
        ===================================================== */

        var existing =
            document.getElementById(
                "scslaiFormPreview"
            );

        if (existing) {
            existing.remove();
        }


        /* =====================================================
        CREATE PREVIEW
        ===================================================== */

        var preview =
            document.createElement("div");

        preview.id =
            "scslaiFormPreview";

        preview.className =
            "loan-preview-overlay";


        var formConfig =
            cfg();

        var pages =
            formConfig.hasPage2
                ? [1, 2]
                : [1];

        var images =
            formConfig.images || [];


        var html = "";


        /* =====================================================
        FIT WIDTH
        Scale the page so the WHOLE form is visible in the
        preview without cropping and without distortion.
        The aspect ratio is preserved — no shrinkage.
        ===================================================== */

        var viewW =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            1280;

        var winW =
            Math.min(
                1200,
                viewW - 30
            );

        var bodyW =
            Math.max(
                320,
                winW - 50
            );


        html +=
            '<div class="loan-preview-window">' +

                '<div class="loan-preview-header">' +

                    '<h2>' +
                        escapeHTML(
                            formConfig.title ||
                            "Form Preview"
                        ) +
                    '</h2>' +

                    '<button ' +
                        'type="button" ' +
                        'id="closePreview">' +
                        '&times;' +
                    '</button>' +

                '</div>' +

                '<div class="loan-preview-body">';


        /* =====================================================
        BUILD PAGES
        ===================================================== */

        pages.forEach(function(pageNumber) {

            var isPage2 =
                pageNumber === 2;


            var map =
                isPage2
                    ? (
                        formConfig.page2Fields ||
                        {}
                    )
                    : (
                        formConfig.fields ||
                        {}
                    );


            var dims =
                pageDims(isPage2);


            var fit =
                Math.min(
                    1,
                    bodyW / dims.w
                );


            var pageW =
                Math.round(
                    dims.w * fit
                );


            var pageH =
                Math.round(
                    dims.h * fit
                );


            var imageSrc =
                images[pageNumber - 1] || "";


            if (!imageSrc) {

                console.warn(
                    "No image configured for page " +
                    pageNumber +
                    " of form " +
                    active
                );

            }


            /* =================================================
            PAGE CONTAINER
            ================================================= */

            html +=

                '<div ' +

                    'class="preview-page" ' +

                    'data-page="' +
                        pageNumber +
                    '" ' +

                    'data-form="' +
                        escapeHTML(active) +
                    '" ' +

                    'style="' +

                        'position:relative;' +

                        'width:' +
                            pageW +
                            'px;' +

                        'height:' +
                            pageH +
                            'px;' +

                        'overflow:hidden;' +

                    '">' +


                    /* =================================================
                    BACKGROUND IMAGE
                    ================================================= */

                    '<img ' +

                        'src="' +
                            escapeHTML(imageSrc) +
                        '" ' +

                        'class="preview-background" ' +

                        'alt="Form page ' +
                            pageNumber +
                        '" ' +

                        'style="' +

                            'position:absolute;' +

                            'left:0;' +

                            'top:0;' +

                            'width:100%;' +

                            'height:100%;' +

                            'display:block;' +

                            'object-fit:fill;' +

                            'z-index:0;' +

                        '">' ;


            /* =====================================================
            TEXT FIELDS
            ===================================================== */

            Object.keys(map).forEach(function(id) {

                var f =
                    map[id];


                if (!f) {
                    return;
                }


                var value =
                    currentValues[id];


                if (
                    value === undefined ||
                    value === null ||
                    String(value).trim() === ""
                ) {

                    return;

                }


                var left =
                    (
                        Number(f.x) /
                        dims.w
                    ) * 100;


                var top =
                    (
                        Number(f.y) /
                        dims.h
                    ) * 100;


                var width =
                    (
                        Number(f.w) /
                        dims.w
                    ) * 100;


                var height =
                    (
                        Number(f.h) /
                        dims.h
                    ) * 100;


                var fontSize =
                    (
                        Number(f.fs) || 12
                    ) * fit;


                var text =
                    useUpper()
                        ? String(value).toUpperCase()
                        : String(value);


                html +=

                    '<div ' +

                        'class="preview-value" ' +

                        'data-field="' +
                            escapeHTML(id) +
                        '" ' +

                        'style="' +

                            'position:absolute;' +

                            'left:' +
                                left +
                            '%;' +

                            'top:' +
                                top +
                            '%;' +

                            'width:' +
                                width +
                            '%;' +

                            'height:' +
                                height +
                            '%;' +

                            'font-size:' +
                                fontSize +
                            'px;' +

                            'line-height:1.2;' +

                            'white-space:pre-wrap;' +

                            'overflow:hidden;' +

                            'z-index:2;' +

                            'color:' +
                                inkColor() +
                                ';' +

                            'font-family:Arial,sans-serif;' +

                        '">' +

                        escapeHTML(text) +

                    '</div>';

            });


            /* =====================================================
            CHECKBOX MARKS
            ===================================================== */

            if (
                !isPage2 &&
                formConfig.hasCheckboxes
            ) {

                var cbMap =
                    formConfig.checkboxes || {};


                Object.keys(cbMap).forEach(function(id) {

                    var item =
                        cbMap[id];


                    if (
                        !currentSelections[id]
                    ) {

                        return;

                    }


                    var cx =
                        Number(item.cx) || 0;


                    var cy =
                        Number(item.cy) || 0;


                    var cw =
                        Number(item.w) || 15;


                    var ch =
                        Number(item.h) || 15;


                    var left =
                        (
                            (cx - cw / 2) /
                            dims.w
                        ) * 100;


                    var top =
                        (
                            (cy - ch / 2) /
                            dims.h
                        ) * 100;


                    var width =
                        (
                            cw /
                            dims.w
                        ) * 100;


                    var height =
                        (
                            ch /
                            dims.h
                        ) * 100;


                    html +=

                        '<div ' +

                            'class="preview-check" ' +

                            'data-checkbox="' +
                                escapeHTML(id) +
                            '" ' +

                            'style="' +

                                'position:absolute;' +

                                'left:' +
                                    left +
                                '%;' +

                                'top:' +
                                    top +
                                '%;' +

                                'width:' +
                                    width +
                                '%;' +

                                'height:' +
                                    height +
                                '%;' +

                                'display:flex;' +

                                'align-items:center;' +

                                'justify-content:center;' +

                                'font-size:' +
                                    (
                                        Math.max(
                                            12,
                                            Math.min(
                                                cw,
                                                ch
                                            )
                                        ) * fit
                                    ) +
                                    'px;' +

                                'font-weight:bold;' +

                                'color:' +
                                    inkColor() +
                                    ';' +

                                'z-index:3;' +

                            '">' +

                            '✓' +

                        '</div>';

                });

            }


            html +=
                '</div>';

        });


        /* =====================================================
        FOOTER
        ===================================================== */

        html +=

                '</div>' +

                '<div class="loan-preview-footer">' +

                    '<button ' +

                        'type="button" ' +

                        'id="editLoanForm">' +

                        'Edit Information' +

                    '</button>' +

                    '<button ' +

                        'type="button" ' +

                        'id="downloadLoanPDF">' +

                        '<i class="fas fa-print"></i> ' +

                        'Print / Download' +

                    '</button>' +

                '</div>' +

            '</div>';


        preview.innerHTML =
            html;


        document.body.appendChild(
            preview
        );


        /* =====================================================
        CLOSE
        ===================================================== */

        var close =
            document.getElementById(
                "closePreview"
            );


        if (close) {

            close.addEventListener(
                "click",
                function() {

                    preview.remove();

                }
            );

        }


        /* =====================================================
        EDIT
        ===================================================== */

        var edit =
            document.getElementById(
                "editLoanForm"
            );


        if (edit) {

            edit.addEventListener(
                "click",
                function() {

                    preview.remove();

                    openModal();

                    restoreValues();

                }
            );

        }


        /* =====================================================
        PRINT / DOWNLOAD
        ===================================================== */

        var download =
            document.getElementById(
                "downloadLoanPDF"
            );


        if (download) {

            download.addEventListener(
                "click",
                function() {

                    generatePDF(
                        currentValues,
                        currentSelections
                    );

                }
            );

        }

    }


    /* =========================================================
       RESTORE VALUES
       ========================================================= */

    function restoreValues() {

        /* =================================================
           RESTORE TEXT INPUTS
           ================================================= */

        Object.keys(
            currentValues || {}
        ).forEach(
            function (id) {

                var el =
                    document.getElementById(
                        id
                    );


                if (!el) {

                    return;

                }


                el.value =
                    currentValues[id];

            }
        );


        /* =================================================
           RESTORE RADIO BUTTONS
           ================================================= */

        Object.keys(
            currentSelections || {}
        ).forEach(
            function (id) {

                var el =
                    document.getElementById(
                        id
                    );


                if (el) {

                    el.checked =
                        !!currentSelections[id];

                }

            }
        );


        /* =================================================
           RESTORE PAYABLE YEARS WORDS
           ================================================= */

        var payable =
            document.getElementById(
                "payableYears"
            );


        var payableWords =
            document.getElementById(
                "payableYearsWords"
            );


        if (
            payable &&
            payableWords
        ) {

            payableWords.value =
                n2w(
                    payable.value
                );

        }

    }


    /* =========================================================
       IMAGE TO DATA URL
       ========================================================= */

    function img2url(img) {

        var c =
            document.createElement(
                "canvas"
            );


        c.width =
            img.naturalWidth ||
            getWidth();


        c.height =
            img.naturalHeight ||
            getHeight();


        var ctx =
            c.getContext(
                "2d"
            );


        ctx.drawImage(
            img,
            0,
            0,
            c.width,
            c.height
        );


        return c.toDataURL(
            "image/png"
        );

    }


    /* =========================================================
       SAVE PDF DOCUMENT
       ========================================================= */

    async function savePdfDocument(
        doc,
        values
    ) {

        var bytes =
            await doc.save();

        var blob =
            new Blob(
                [bytes],
                {
                    type:
                        "application/pdf"
                }
            );

        var url =
            URL.createObjectURL(
                blob
            );

        var a =
            document.createElement(
                "a"
            );

        var lastName =
            values &&
            values.lastName
                ? String(values.lastName)
                : "";

        a.href =
            url;

        a.download =

            "SCSLAI-" +

            (
                cfg().pdfPrefix ||
                ""
            ) +

            (
                cfg().pdfSuffix ||
                "Loan-Application"
            ) +

            (
                lastName
                    ? "-" + lastName
                    : ""
            ) +

            ".pdf";

        document.body.appendChild(
            a
        );

        a.click();

        document.body.removeChild(
            a
        );

        setTimeout(
            function () {

                URL.revokeObjectURL(
                    url
                );

            },
            1000
        );

    }


    /* =========================================================
       RASTERIZE PREVIEW PAGE
       Renders one .preview-page DOM element (the exact HTML
       the user sees) to a canvas at full design resolution,
       so the PDF matches the preview pixel-for-pixel.
       ========================================================= */

    async function rasterizePreviewPage(
        doc,
        el
    ) {

        var pageNumber =
            Number(
                el.getAttribute(
                    "data-page"
                )
            ) || 1;

        var dims =
            pageDims(
                pageNumber === 2
            );

        var paper =
            pdfPageSize(
                dims
            );

        var scaleRatio =
            dims.w /
            (el.offsetWidth || dims.w);

        var canvas =
            await window.html2canvas(
                el,
                {
                    scale:
                        Math.max(1, scaleRatio),
                    backgroundColor:
                        "#ffffff",
                    logging:
                        false,
                    useCORS:
                        true
                }
            );

        var png =
            await doc.embedPng(
                canvas.toDataURL(
                    "image/png"
                )
            );

        var page =
            doc.addPage(
                [paper.w, paper.h]
            );

        page.drawImage(
            png,
            {
                x: 0,
                y: 0,
                width: paper.w,
                height: paper.h
            }
        );

    }


    /* =========================================================
       RASTERIZE PREVIEW DOCUMENT
       Builds the whole PDF from the preview DOM pages.
       Returns null when not possible (fallback to vector).
       ========================================================= */

    async function rasterizePreviewDocument(
        L
    ) {

        var els =
            Array.prototype.slice.call(
                document.querySelectorAll(
                    ".loan-preview-overlay .preview-page"
                )
            );

        if (!els.length) {

            return null;

        }

        var d =
            await L.PDFDocument.create();

        try {

            for (
                var i = 0;
                i < els.length;
                i++
            ) {

                await rasterizePreviewPage(
                    d,
                    els[i]
                );

            }

            return d;

        }

        catch (err) {

            console.warn(
                "Preview rasterization failed — using vector drawing:",
                err
            );

            return null;

        }

    }


    /* =========================================================
       GENERATE PDF
       ========================================================= */

    async function generatePDF(
        values,
        selections
    ) {

        if (!window.PDFLib) {

            alert(
                "PDF library not loaded."
            );

            return;

        }


        values =
            values || currentValues;


        selections =
            selections ||
            currentSelections;


        try {

            var L =
                window.PDFLib;


            var doc =
                await L.PDFDocument.create();


            var font =
                await doc.embedFont(
                    L.StandardFonts.Helvetica
                );


            var rgb =
                L.rgb;


            var ink =
                hexToRgb(
                    inkColor()
                );


            var images =
                cfg().images || [];


            var pages =
                hasPage2()
                    ? [1, 2]
                    : [1];


            /* =================================================
               PREFER EXACT PREVIEW SNAPSHOT
               If the preview overlay is open and the html2canvas
               library is available, render the preview's DOM
               pages directly into the PDF. This guarantees the
               print looks exactly like the preview (same fonts,
               same scaling, same positions). If anything fails,
               fall back to the vector drawing below.
               ================================================= */

            if (
                window.html2canvas &&
                document.getElementById(
                    "scslaiFormPreview"
                )
            ) {

                var snapDoc =
                    await rasterizePreviewDocument(
                        L
                    );

                if (snapDoc) {

                    await savePdfDocument(
                        snapDoc,
                        values
                    );

                    return;

                }

            }


            for (
                var p = 0;
                p < pages.length;
                p++
            ) {

                var pageNumber =
                    pages[p];


                var isPage2 =
                    pageNumber === 2;


                var map =
                    isPage2
                        ? (
                            cfg().page2Fields ||
                            {}
                        )
                        : (
                            cfg().fields ||
                            {}
                        );


                var imageSrc =
                    images[
                        pageNumber - 1
                    ];


                if (!imageSrc) {

                    throw new Error(
                        "Form image not found for page " +
                        pageNumber
                    );

                }


                var img =
                    new Image();


                img.src =
                    imageSrc;


                await new Promise(
                    function (
                        resolve,
                        reject
                    ) {

                        img.onload =
                            resolve;

                        img.onerror =
                            reject;

                    }
                );


                var png;


                try {

                    var rp =
                        await fetch(
                            imageSrc
                        );


                    if (!rp.ok) {

                        throw new Error(
                            "Fetch failed"
                        );

                    }


                    png =
                        await doc.embedPng(
                            await rp.arrayBuffer()
                        );

                }

                catch (e) {

                    png =
                        await doc.embedPng(
                            img2url(img)
                        );

                }


                var dims =
                    pageDims(
                        isPage2
                    );


                var paper =
                    pdfPageSize(
                        dims
                    );


                var aw =
                    paper.w;


                var ah =
                    paper.h;


                var scale =
                    aw / dims.w;


                var page =
                    doc.addPage(
                        [aw, ah]
                    );


                /* =================================================
                   BACKGROUND
                   ================================================= */

                page.drawImage(
                    png,
                    {

                        x: 0,

                        y: 0,

                        width: aw,

                        height: ah

                    }
                );


                /* =================================================
                   TEXT
                   ================================================= */

                Object.keys(map)
                    .forEach(
                        function (id) {

                            var value =
                                values[id];


                            if (
                                value === undefined ||
                                value === null ||
                                String(value).trim() === ""
                            ) {

                                return;

                            }


                            var f =
                                map[id];


                            var text =
                                String(value);


                            page.drawText(

                                useUpper()

                                    ? text.toUpperCase()

                                    : text,

                                {

                                    x:
                                        Number(
                                            f.x
                                        ) *
                                        scale,

                                    y:
                                        ah -
                                        (
                                            Number(
                                                f.y
                                            ) +
                                            (
                                                Number(
                                                    f.fs
                                                ) || 12
                                            ) *
                                            0.9
                                        ) *
                                        scale,

                                    size:
                                        (
                                            Number(
                                                f.fs
                                            ) || 12
                                        ) *
                                        scale,

                                    font:
                                        font,

                                    color:
                                        rgb(
                                            ink.r,
                                            ink.g,
                                            ink.b
                                        )

                                }

                            );

                        }
                    );


                /* =================================================
                   CHECKBOXES
                   ================================================= */

                if (
                    !isPage2 &&
                    hasBoxes()
                ) {

                    var cbMap =
                        cfg().checkboxes ||
                        {};


                    Object.keys(cbMap)
                        .forEach(
                            function (id) {

                                if (
                                    !selections[id]
                                ) {

                                    return;

                                }


                                var c =
                                    cbMap[id];


                                var cx =
                                    Number(
                                        c.cx
                                    );


                                var cy =
                                    Number(
                                        c.cy
                                    );


                                var cw =
                                    Number(
                                        c.w
                                    );


                                var ch =
                                    Number(
                                        c.h
                                    );


                                var xc =
                                    cx * scale;


                                var yc =
                                    ah -
                                    cy * scale;


                                var size =
                                    Math.min(
                                        cw,
                                        ch
                                    ) *
                                    0.55 *
                                    scale;


                                page.drawLine({

                                    start: {

                                        x:
                                            xc -
                                            size,

                                        y:
                                            yc -
                                            size

                                    },

                                    end: {

                                        x:
                                            xc +
                                            size,

                                        y:
                                            yc +
                                            size

                                    },

                                    thickness:
                                        1.5 *
                                        scale,

                                    color:
                                        rgb(
                                            ink.r,
                                            ink.g,
                                            ink.b
                                        )

                                });


                                page.drawLine({

                                    start: {

                                        x:
                                            xc -
                                            size,

                                        y:
                                            yc +
                                            size

                                    },

                                    end: {

                                        x:
                                            xc +
                                            size,

                                        y:
                                            yc -
                                            size

                                    },

                                    thickness:
                                        1.5 *
                                        scale,

                                    color:
                                        rgb(
                                            ink.r,
                                            ink.g,
                                            ink.b
                                        )

                                });

                            }
                        );

                }

            }


            /* =================================================
               SAVE PDF
               ================================================= */

            await savePdfDocument(
                doc,
                values
            );

        }

        catch (err) {

            console.error(
                "PDF generation error:",
                err
            );


            alert(

                "PDF generation failed: " +

                (
                    err &&
                    err.message
                        ? err.message
                        : err
                )

            );

        }

    }


    /* =========================================================
       SUBMIT FORM
       ========================================================= */

    function wireSubmit() {

        var form =
            document.getElementById(
                "loanApplicationForm"
            );


        if (!form) {

            console.warn(
                "loanApplicationForm not found."
            );

            return;

        }


        /*
         * Prevent duplicate submit listeners.
         */

        if (
            form.dataset.submitBound === "true"
        ) {

            return;

        }


        form.dataset.submitBound =
            "true";


        form.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                e.stopPropagation();


                console.log(
                    "Loan form submitted."
                );


                /* =================================================
                   COLLECT VALUES
                   ================================================= */

                var vals =
                    collectValues();


                console.log(
                    "Collected values:",
                    vals
                );


                var miss = [];


                /* =================================================
                   CUSTOM VALIDATION
                   ================================================= */

                if (
                    typeof cfg().validate ===
                    "function"
                ) {

                    try {

                        cfg().validate(
                            vals,
                            miss
                        );

                    }

                    catch (err) {

                        console.error(
                            "Validation error:",
                            err
                        );


                        alert(
                            "There was an error validating the form."
                        );


                        return;

                    }

                }


                /* =================================================
                   CHECKBOX VALIDATION
                   ================================================= */

                var cbm =
                    cfg().checkboxes ||
                    {};


                var hasRegular =
                    false;


                var hasSpecial =
                    false;


                var hasApplication =
                    false;


                Object.keys(cbm).forEach(
                    function (key) {

                        var category =
                            cbm[key].category;


                        if (
                            category ===
                            "regular"
                        ) {

                            hasRegular =
                                true;

                        }


                        if (
                            category ===
                            "special"
                        ) {

                            hasSpecial =
                                true;

                        }


                        if (
                            category ===
                            "application"
                        ) {

                            hasApplication =
                                true;

                        }

                    }
                );


                var regs =
                    checkedOf(
                        "regular"
                    );


                var specs =
                    checkedOf(
                        "special"
                    );


                var apps =
                    checkedOf(
                        "application"
                    );


                var totalLoanSelections =
                    regs.length +
                    specs.length;


                if (
                    hasRegular ||
                    hasSpecial
                ) {

                    if (
                        totalLoanSelections === 0
                    ) {

                        miss.push(
                            "Please select a Loan Type or Special Loan."
                        );

                    }


                    if (
                        totalLoanSelections > 1
                    ) {

                        miss.push(
                            "Please select only ONE Loan Type or Special Loan."
                        );

                    }

                }


                /* =================================================
                   APPLICATION TYPE
                   ================================================= */

                if (
                    hasApplication &&
                    apps.length === 0
                ) {

                    miss.push(
                        "Application Type"
                    );

                }


                /* =================================================
                   EDP NUMBER
                   ================================================= */

                if (
                    vals.edpNumber &&
                    !/^[0-9]+$/.test(
                        vals.edpNumber
                    )
                ) {

                    alert(
                        "EDP Number must contain numbers only."
                    );

                    return;

                }


                /* =================================================
                   ZIP CODE
                   ================================================= */

                if (
                    vals.zipCode &&
                    !/^[0-9]{4}$/.test(
                        vals.zipCode
                    )
                ) {

                    alert(
                        "Please enter a valid 4-digit ZIP Code."
                    );

                    return;

                }


                /* =================================================
                   MOBILE NUMBER
                   ================================================= */

                var mobile =
                    cfg().mobileField

                        ? vals[
                            cfg().mobileField
                        ]

                        : vals.contactNumber;


                var mob =
                    mobile

                        ? String(
                            mobile
                        ).replace(
                            /[\s-]/g,
                            ""
                        )

                        : "";


                if (
                    mob &&
                    !/^(09|\+639)[0-9]{9}$/.test(
                        mob
                    )
                ) {

                    alert(
                        "Please enter a valid Philippine mobile number."
                    );

                    return;

                }


                /* =================================================
                   EMAIL
                   ================================================= */

                if (
                    vals.emailAddress &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        vals.emailAddress
                    )
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                /* =================================================
                   BIRTHDATE
                   ================================================= */

                if (
                    vals.birthdate
                ) {

                    var birth =
                        new Date(
                            vals.birthdate +
                            "T00:00:00"
                        );


                    var today =
                        new Date();


                    today.setHours(
                        0,
                        0,
                        0,
                        0
                    );


                    if (
                        isNaN(
                            birth.getTime()
                        ) ||
                        birth >= today
                    ) {

                        alert(
                            "Birthdate cannot be today or a future date."
                        );

                        return;

                    }

                }


                /* =================================================
                   REQUIRED FIELDS
                   ================================================= */

                if (
                    miss.length > 0
                ) {

                    alert(

                        "Please complete:\n\n- " +

                        miss.join(
                            "\n- "
                        )

                    );

                    return;

                }


                /* =================================================
                   GET RESULT
                   ================================================= */

                var result;


                try {

                    if (
                        typeof cfg().getResult ===
                        "function"
                    ) {

                        result =
                            cfg().getResult(
                                vals,
                                checkedOf
                            );

                    }

                    else {

                        result = {

                            form:
                                active,

                            fields:
                                vals

                        };

                    }

                }

                catch (err) {

                    console.error(
                        "getResult error:",
                        err
                    );


                    alert(
                        "Unable to process the loan application."
                    );


                    return;

                }


                /* =================================================
                   ENSURE OBJECT
                   ================================================= */

                if (
                    !result ||
                    typeof result !== "object"
                ) {

                    result = {

                        form:
                            active,

                        fields:
                            vals

                    };

                }


                /* =================================================
                   SAVE RADIO VALUES
                   ================================================= */

                result.checkboxValues =
                    {};


                Object.keys(cbm)
                    .forEach(
                        function (id) {

                            var el =
                                document.getElementById(
                                    id
                                );


                            result.checkboxValues[id] =
                                !!(
                                    el &&
                                    el.checked
                                );

                        }
                    );


                /* =================================================
                   SAVE CURRENT DATA
                   ================================================= */

                currentValues =
                    Object.assign(
                        {},
                        vals
                    );


                currentSelections =
                    Object.assign(
                        {},
                        result.checkboxValues
                    );


                window.__loanApplicationData =
                    result;


                console.log(
                    "Loan data:",
                    result
                );


                /* =================================================
                   CLOSE FORM
                   ================================================= */

                closeModal();


                /* =================================================
                   OPEN PREVIEW
                   ================================================= */

                setTimeout(
                    function () {

                        showPreview(
                            currentValues,
                            currentSelections
                        );

                    },
                    100
                );

            }
        );

    }


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    function init() {

        modal =
            document.getElementById(
                "loanModal"
            );


        body =
            document.body;


        closeBtn =
            document.getElementById(
                "closeLoanModal"
            );


        if (!modal) {

            console.warn(
                "#loanModal not found."
            );

        }


        bindButtons();


        wireSubmit();


        /* =================================================
           CLOSE BUTTON
           ================================================= */

        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                closeModal
            );

        }
        /* =================================================
           ESCAPE KEY
           ================================================= */

        document.addEventListener(
            "keydown",
            function (e) {

                if (
                    e.key === "Escape" &&
                    modal &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal();

                }

            }
        );

    }


    /* =========================================================
       PUBLIC API
       ========================================================= */

    window.SCSLAI = {

        register:
            register

    };


    /* =========================================================
       START
       ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else {

        init();

    }


})();