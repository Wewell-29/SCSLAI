/* SCSLAI — SC Loan Application Form Config */
(function(){
"use strict";

SCSLAI.register({
key:"sc",
title:"Loan Application",
width:1275, height:2100,
hasPage2:true, hasCheckboxes:true, useUppercase:true,
pdfPrefix:"",
pdfSuffix:"Loan-Application",
images:[
"FORMS/Supreme Court (SC) Loan Application Form_page-0001.png",
"FORMS/Supreme Court (SC) Loan Application Form_page-0002.png"
],

fields:{


others:{x:182,y:378,w:204,h:16,fs:12},
applicantName:{x:250,y:450,w:420,h:20,fs:14},
amountWords:{x:170,y:476,w:360,h:20,fs:13},
loanAmount:{x:620,y:476,w:132,h:20,fs:13},
payableYearsWords:{x:830,y:478,w:75,h:18,fs:12},
payableYears:{x:915,y:478,w:45,h:22,fs:12},
edpNumber:{x:58,y:572,w:270,h:22,fs:14},
tin:{x:340,y:572,w:330,h:22,fs:13},
birthdate:{x:685,y:572,w:238,h:22,fs:13},
placeOfBirth:{x:932,y:572,w:296,h:22,fs:13},
lastName:{x:118,y:622,w:292,h:30,fs:15},
firstName:{x:415,y:622,w:202,h:30,fs:15},
middleName:{x:622,y:622,w:212,h:30,fs:15},
suffix:{x:842,y:622,w:80,h:30,fs:14},

officeStation:{x:58,y:680,w:472,h:22,fs:14},
position:{x:535,y:680,w:155,h:22,fs:14},
appointment:{x:695,y:680,w:200,h:22,fs:14},
homeAddress:{x:58,y:728,w:692,h:19,fs:14},
zipCode:{x:762,y:728,w:150,h:19,fs:14},
printedName:{x:952,y:710,w:244,h:15,fs:12},
contactNumber:{x:61,y:783,w:482,h:22,fs:14},
emailAddress:{x:563,y:783,w:350,h:22,fs:13}
},

page2Fields:{
pnNumber:{x:120,y:60,w:232,h:18,fs:13},
pnAmountWords:{x:388,y:150,w:392,h:20,fs:13},
pnAmountFigures:{x:812,y:150,w:148,h:20,fs:13},
pnInterestRate:{x:77,y:175,w:126,h:20,fs:13},
pnRatePercent:{x:278,y:175,w:76,h:20,fs:13},
pnInstallments:{x:488,y:175,w:84,h:20,fs:13},
pnInstallmentAmt:{x:728,y:175,w:75,h:20,fs:13},
pnAddlRate:{x:801,y:350,w:130,h:20,fs:13},
pnPrintedName:{x:112,y:875,w:305,h:20,fs:13},
pnSignature:{x:488,y:875,w:300,h:20,fs:13},
pnSignature2:{x:855,y:875,w:300,h:20,fs:13},
pnDate:{x:132,y:935,w:126,h:20,fs:13}
},

checkboxes:{
business:{cx:123,cy:287,w:10,h:12,category:"regular"},
emergencyRata:{cx:249,cy:287,w:10,h:12,category:"regular"},
maxi:{cx:411,cy:287,w:10,h:12,category:"regular"},
character:{cx:123,cy:307,w:10,h:12,category:"regular"},
help:{cx:249,cy:307,w:10,h:12,category:"regular"},
meal:{cx:411,cy:307,w:10,h:12,category:"regular"},
educational:{cx:123,cy:327,w:10,h:12,category:"regular"},
housing:{cx:249,cy:327,w:10,h:12,category:"regular"},
multiPurpose:{cx:411,cy:327,w:10,h:12,category:"regular"},
equitable:{cx:123,cy:348,w:10,h:13,category:"regular"},
jdfAllowance:{cx:249,cy:348,w:10,h:13,category:"regular"},
petty:{cx:411,cy:348,w:10,h:13,category:"regular"},
equity:{cx:123,cy:368,w:10,h:13,category:"regular"},
longTerm:{cx:249,cy:368,w:10,h:13,category:"regular"},
subsistence:{cx:411,cy:368,w:10,h:13,category:"regular"},
deeaApril:{cx:632,cy:322,w:10,h:13,category:"special"},
eeaOctober:{cx:812,cy:322,w:10,h:13,category:"special"},
midYear:{cx:632,cy:342,w:10,h:13,category:"special"},
yearEnd:{cx:812,cy:342,w:10,h:13,category:"special"},
anniversary:{cx:632,cy:362,w:10,h:13,category:"special"},
cashGift:{cx:812,cy:362,w:10,h:13,category:"special"},
newLoan:{cx:374,cy:417,w:12,h:15,category:"application"},
consolidate:{cx:518,cy:417,w:13,h:15,category:"application"},
deliveryAtm:{cx:509,cy:1547,w:12,h:17,category:"delivery"},
deliveryPickup:{cx:887,cy:1547,w:12,h:17,category:"delivery"}
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
},

getResult:function(vals,checkedOf){ var regs=checkedOf("regular"),specs=checkedOf("special"),apps=checkedOf("application");
return{form:"sc",fields:vals,
loanTypes:regs.concat(specs).map(function(x){return x.label;}),
applicationType:apps.length?apps[0].label:"",
modeOfDelivery:checkedOf("delivery").map(function(x){return x.label;})};
}

});

})();

