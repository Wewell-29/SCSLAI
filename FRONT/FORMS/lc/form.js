/* SCSLAI — LC Loan Application Form Config */
(function(){
"use strict";

SCSLAI.register({
key:"lc",
title:"LC Loan Application",
fieldLabels:{
others:"Others",applicantName:"Applicant Name",amountWords:"Amount in Words",
loanAmount:"Loan Amount",payableYearsWords:"Payable Years in Words",payableYears:"Payable Years",
edpNumber:"EDP Number",tin:"TIN",birthdate:"Birthdate",placeOfBirth:"Place of Birth",
lastName:"Last Name",firstName:"First Name",middleName:"Middle Name",suffix:"Suffix",
homeAddress:"Home Address",zipCode:"ZIP Code",officeStation:"Office / Station",region:"Region",
position:"Position",appointment:"Status of Appointment",contactNumber:"Contact Number",
emailAddress:"Email Address",printedName:"Printed Name",
pnNumber:"PN Number",pnAmountWords:"PN Amount in Words",pnAmountFigures:"PN Amount",
pnInterestRate:"Interest Rate",pnInstallments:"Number of Installments",
pnInstallmentAmt:"Installment Amount",pnAddlRate:"Additional Rate",pnPrintedName:"Printed Name"
},
width:1275, height:2100,
hasPage2:true, hasCheckboxes:true, useUppercase:true,
pdfPrefix:"LC-",
pdfSuffix:"Loan-Application",
images:[
"FORMS/Lower Court (LC) Loan Application Form1_page-0001.png",
"FORMS/Lower Court (LC) Loan Application Form1_page-0002.png"
],

fields:{


amountWords:{x:100,y:481,w:500,h:20,fs:13},
loanAmount:{x:625,y:481,w:200,h:20,fs:12},
payableYearsWords:{x:960,y:482,w:80,h:18,fs:12},
payableYears:{x:1060,y:481,w:50,h:22,fs:12},
applicantName:{x:130,y:460,w:600,h:20,fs:14},
edpNumber:{x:58,y:573,w:230,h:22,fs:14},
tin:{x:300,y:573,w:290,h:22,fs:13},
birthdate:{x:660,y:573,w:218,h:22,fs:13},
placeOfBirth:{x:930,y:573,w:285,h:22,fs:13},
lastName:{x:60,y:625,w:320,h:30,fs:12},
firstName:{x:380,y:625,w:235,h:30,fs:12},
middleName:{x:600,y:625,w:250,h:30,fs:12},
suffix:{x:842,y:625,w:80,h:30,fs:14},
homeAddress:{x:58,y:678,w:730,h:24,fs:14},
zipCode:{x:800,y:678,w:130,h:24,fs:14},
officeStation:{x:58,y:728,w:435,h:24,fs:14},
region:{x:505,y:728,w:100,h:24,fs:13},
position:{x:600,y:728,w:320,h:24,fs:14},
appointment:{x:58,y:778,w:300,h:24,fs:14},
contactNumber:{x:365,y:778,w:230,h:24,fs:13},
emailAddress:{x:605,y:778,w:320,h:24,fs:13},

printedName:{x:950,y:740,w:244,h:15,fs:12}
},



checkboxes:{
business:{cx:95,cy:315,w:15,h:25,category:"regular"},
helpLoan:{cx:273,cy:315,w:15,h:25,category:"regular"},
multiPurpose:{cx:453,cy:315,w:15,h:25,category:"regular"},
educational:{cx:93,cy:340,w:15,h:25,category:"regular"},
jdfAllowance:{cx:273,cy:340,w:15,h:25,category:"regular"},
meal:{cx:453,cy:340,w:15,h:25,category:"regular"},
emergencyRata:{cx:93,cy:365,w:15,h:25,category:"regular"},
salary:{cx:273,cy:365,w:15,h:25,category:"regular"},
housing:{cx:93,cy:385,w:15,h:25,category:"regular"},
eeaApril:{cx:636,cy:322,w:15,h:25,category:"special"},
eeaOctober:{cx:818,cy:322,w:15,h:25,category:"special"},
midYear:{cx:636,cy:342,w:15,h:25,category:"special"},
yearEnd:{cx:818,cy:342,w:15,h:25,category:"special"},
anniversary:{cx:636,cy:362,w:15,h:25,category:"special"},
cashGift:{cx:818,cy:362,w:15,h:25,category:"special"},
newLoan:{cx:375,cy:418,w:15,h:25,category:"application"},
consolidate:{cx:519,cy:418,w:15,h:25,category:"application"},
deliveryAtm:{cx:545,cy:1580,w:15,h:25,category:"delivery"},
deliveryPickup:{cx:910,cy:1580,w:15,h:25,category:"delivery"}
},

labels:{
business:"Business",helpLoan:"Help Loan",multiPurpose:"Multi Purpose",
educational:"Educational",jdfAllowance:"JDF/Allowance",meal:"MEAL",
emergencyRata:"Emergency RATA",salary:"Salary",housing:"Housing",
eeaApril:"EEA (April)",eeaOctober:"EEA (October)",midYear:"Mid Year",
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
if(!vals.region)miss.push("Region");
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
return{form:"lc",fields:vals,
loanTypes:regs.concat(specs).map(function(x){return x.label;}),
applicationType:apps.length?apps[0].label:"",
modeOfDelivery:checkedOf("delivery").map(function(x){return x.label;})};
}

});

})();

