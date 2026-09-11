/* SCSLAI — SC Loan Application Form Config */
(function(){
"use strict";

SCSLAI.register({
key:"sc",
title:"Loan Application",
fieldLabels:{
others:"Others",applicantName:"Applicant Name",amountWords:"Amount in Words",
loanAmount:"Loan Amount",payableYearsWords:"Payable Years in Words",payableYears:"Payable Years",
edpNumber:"EDP Number",tin:"TIN",birthdate:"Birthdate",placeOfBirth:"Place of Birth",
lastName:"Last Name",firstName:"First Name",middleName:"Middle Name",suffix:"Suffix",
officeStation:"Office / Station",position:"Position",appointment:"Status of Appointment",
homeAddress:"Home Address",zipCode:"ZIP Code",printedName:"Printed Name",
contactNumber:"Contact Number",emailAddress:"Email Address",
pnNumber:"PN Number",pnAmountWords:"PN Amount in Words",pnAmountFigures:"PN Amount",
pnInterestRate:"Interest Rate",pnRatePercent:"Rate Percent",
pnInstallments:"Number of Installments",pnInstallmentAmt:"Installment Amount",
pnAddlRate:"Additional Rate",pnPrintedName:"Printed Name"
},
width:1275, height:2100,
hasPage2:true, hasCheckboxes:true, useUppercase:true,
pdfPrefix:"",
pdfSuffix:"Loan-Application",
images:[
"FORMS/Supreme Court (SC) Loan Application Form_page-0001.png",
"FORMS/Supreme Court (SC) Loan Application Form_page-0002.png"
],

fields:{



applicantName:{x:350,y:450,w:420,h:20,fs:14},
amountWords:{x:300,y:476,w:360,h:20,fs:13},
loanAmount:{x:650,y:476,w:132,h:20,fs:13},
payableYearsWords:{x:850,y:480,w:75,h:18,fs:12},
payableYears:{x:920,y:480,w:45,h:22,fs:12},
edpNumber:{x:58,y:572,w:270,h:22,fs:14},
tin:{x:340,y:572,w:330,h:22,fs:13},
birthdate:{x:685,y:572,w:238,h:22,fs:13},
placeOfBirth:{x:932,y:572,w:296,h:22,fs:13},
lastName:{x:118,y:635,w:292,h:30,fs:15},
firstName:{x:415,y:635,w:202,h:30,fs:15},
middleName:{x:622,y:635,w:212,h:30,fs:15},
suffix:{x:842,y:635,w:80,h:30,fs:14},

officeStation:{x:58,y:680,w:472,h:22,fs:14},
position:{x:535,y:680,w:155,h:22,fs:14},
appointment:{x:695,y:680,w:200,h:22,fs:14},
homeAddress:{x:58,y:728,w:692,h:19,fs:14},
zipCode:{x:762,y:728,w:150,h:19,fs:14},

contactNumber:{x:61,y:783,w:482,h:22,fs:14},
emailAddress:{x:563,y:783,w:350,h:22,fs:13}
},



checkboxes:{
business:{cx:123,cy:287,w:15,h:25,category:"regular"},
emergencyRata:{cx:249,cy:287,w:15,h:25,category:"regular"},
maxi:{cx:411,cy:287,w:15,h:25,category:"regular"},
character:{cx:123,cy:307,w:15,h:25,category:"regular"},
help:{cx:249,cy:307,w:15,h:25,category:"regular"},
meal:{cx:411,cy:307,w:15,h:25,category:"regular"},
educational:{cx:123,cy:327,w:15,h:25,category:"regular"},
housing:{cx:249,cy:327,w:15,h:25,category:"regular"},
multiPurpose:{cx:411,cy:327,w:15,h:25,category:"regular"},
equitable:{cx:123,cy:348,w:15,h:25,category:"regular"},
jdfAllowance:{cx:249,cy:348,w:15,h:25,category:"regular"},
petty:{cx:411,cy:348,w:15,h:25,category:"regular"},
equity:{cx:123,cy:368,w:15,h:25,category:"regular"},
longTerm:{cx:249,cy:368,w:15,h:25,category:"regular"},
subsistence:{cx:411,cy:368,w:15,h:25,category:"regular"},
deeaApril:{cx:632,cy:322,w:15,h:25,category:"special"},
eeaOctober:{cx:812,cy:322,w:15,h:25,category:"special"},
midYear:{cx:632,cy:342,w:15,h:25,category:"special"},
yearEnd:{cx:812,cy:342,w:15,h:25,category:"special"},
anniversary:{cx:632,cy:362,w:15,h:25,category:"special"},
cashGift:{cx:812,cy:362,w:15,h:25,category:"special"},
newLoan:{cx:374,cy:417,w:15,h:25,category:"application"},
consolidate:{cx:518,cy:417,w:15,h:25,category:"application"},
deliveryAtm:{cx:509,cy:1547,w:15,h:25,category:"delivery"},
deliveryPickup:{cx:887,cy:1547,w:15,h:25,category:"delivery"}
},

labels:{
business:"Business",emergencyRata:"Emergency RATA",maxi:"Maxi",
character:"Character",help:"HELP",meal:"MEAL",
educational:"Educational",housing:"Housing",multiPurpose:"Multi Purpose",
equitable:"Equitable",jdfAllowance:"JDF/Allowance",petty:"Petty",
equity:"Equity",longTerm:"Long term",subsistence:"Subsistence",
deeaApril:"DEEA (April)",eeaOctober:"EEA (October)",midYear:"Mid Year",
yearEnd:"Year End",anniversary:"Anniversary",cashGift:"Cash Gift",
newLoan:"New Loan",consolidate:"Consolidate",
deliveryAtm:"By ATM Payroll Account (LBP)",
deliveryPickup:"Personal Pick-up of crossed check"
},


validate:function(vals,miss){
if(!vals.edpNumber)miss.push("EDP Number");
if(!vals.lastName)miss.push("Last Name");
if(!vals.firstName)miss.push("First Name");
if(!vals.birthdate)miss.push("Birthdate");
if(!vals.placeOfBirth)miss.push("Place of Birth");
if(!vals.appointment)miss.push("Status of Appointment");
if(!vals.homeAddress)miss.push("Home Address");
if(!vals.zipCode)miss.push("ZIP Code");
if(!vals.officeStation)miss.push("Office");
if(!vals.position)miss.push("Position");
if(!vals.contactNumber)miss.push("Contact Number");
if(!vals.emailAddress)miss.push("Email Address");
if(!vals.loanAmount)miss.push("Loan Amount");
if(!vals.payableYears)miss.push("Payable Years");
if(!vals.tin)miss.push("TIN");

}, 

getResult:function(vals,checkedOf){ var regs=checkedOf("regular"),specs=checkedOf("special"),apps=checkedOf("application");
return{form:"sc",fields:vals,
loanTypes:regs.concat(specs).map(function(x){return x.label;}),
applicationType:apps.length?apps[0].label:"",
modeOfDelivery:checkedOf("delivery").map(function(x){return x.label;})};
}

});

})();