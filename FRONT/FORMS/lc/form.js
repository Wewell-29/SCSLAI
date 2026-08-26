/* SCSLAI — LC Loan Application Form Config */
(function(){
"use strict";

SCSLAI.register({
key:"lc",
title:"LC Loan Application",
width:1275, height:2100,
hasPage2:true, hasCheckboxes:true, useUppercase:true,
pdfPrefix:"LC-",
pdfSuffix:"Loan-Application",
images:[
"FORMS/Lower Court (LC) Loan Application Form1_page-0001.png",
"FORMS/Lower Court (LC) Loan Application Form1_page-0002.png"
],

fields:{
receivedDate:{x:940,y:266,w:266,h:24,fs:13},
others:{x:216,y:382,w:140,h:16,fs:12},
amountWords:{x:138,y:486,w:338,h:20,fs:13},
loanAmount:{x:608,y:486,w:82,h:20,fs:12},
payableYearsWords:{x:832,y:486,w:80,h:18,fs:12},
payableYears:{x:912,y:486,w:50,h:22,fs:12},
applicantName:{x:285,y:464,w:420,h:20,fs:14},
edpNumber:{x:58,y:575,w:230,h:22,fs:14},
tin:{x:300,y:575,w:290,h:22,fs:13},
birthdate:{x:660,y:575,w:218,h:22,fs:13},
placeOfBirth:{x:920,y:575,w:250,h:22,fs:13},
lastName:{x:118,y:628,w:292,h:30,fs:15},
firstName:{x:415,y:628,w:202,h:30,fs:15},
middleName:{x:622,y:628,w:212,h:30,fs:15},
suffix:{x:842,y:628,w:164,h:30,fs:14},
homeAddress:{x:58,y:678,w:730,h:24,fs:14},
zipCode:{x:800,y:678,w:170,h:24,fs:14},
officeStation:{x:58,y:728,w:435,h:24,fs:14},
region:{x:498,y:728,w:100,h:24,fs:13},
position:{x:602,y:728,w:162,h:24,fs:14},
appointment:{x:58,y:778,w:300,h:24,fs:14},
contactNumber:{x:365,y:778,w:230,h:24,fs:13},
emailAddress:{x:605,y:778,w:320,h:24,fs:13},
signature:{x:950,y:690,w:244,h:15,fs:12},
printedName:{x:950,y:760,w:244,h:15,fs:12}
},

page2Fields:{
pnNumber:{x:174,y:60,w:230,h:18,fs:13},
pnAmountWords:{x:388,y:155,w:395,h:20,fs:13},
pnAmountFigures:{x:812,y:155,w:135,h:20,fs:13},
pnInterestRate:{x:77,y:178,w:135,h:22,fs:13},
pnInstallments:{x:488,y:178,w:88,h:22,fs:13},
pnInstallmentAmt:{x:720,y:178,w:82,h:22,fs:13},
pnAddlRate:{x:801,y:357,w:130,h:20,fs:13},
pnPrintedName:{x:106,y:885,w:310,h:20,fs:13},
pnSignature:{x:493,y:885,w:300,h:20,fs:13},
pnSignature2:{x:861,y:885,w:300,h:20,fs:13},
pnDate:{x:102,y:918,w:130,h:20,fs:13}
},

checkboxes:{
business:{cx:93,cy:315,w:10,h:12,category:"regular"},
helpLoan:{cx:273,cy:315,w:10,h:12,category:"regular"},
multiPurpose:{cx:453,cy:315,w:10,h:12,category:"regular"},
educational:{cx:93,cy:340,w:10,h:12,category:"regular"},
jdfAllowance:{cx:273,cy:340,w:10,h:12,category:"regular"},
meal:{cx:453,cy:340,w:10,h:12,category:"regular"},
emergencyRata:{cx:93,cy:365,w:10,h:12,category:"regular"},
salary:{cx:273,cy:365,w:10,h:12,category:"regular"},
housing:{cx:93,cy:385,w:10,h:12,category:"regular"},
eeaApril:{cx:632,cy:322,w:10,h:13,category:"special"},
eeaOctober:{cx:812,cy:322,w:10,h:13,category:"special"},
midYear:{cx:632,cy:342,w:10,h:13,category:"special"},
yearEnd:{cx:812,cy:342,w:10,h:13,category:"special"},
anniversary:{cx:632,cy:362,w:10,h:13,category:"special"},
cashGift:{cx:812,cy:362,w:10,h:13,category:"special"},
newLoan:{cx:375,cy:418,w:12,h:15,category:"application"},
consolidate:{cx:519,cy:418,w:13,h:15,category:"application"},
deliveryAtm:{cx:545,cy:1580,w:12,h:17,category:"delivery"},
deliveryPickup:{cx:910,cy:1580,w:12,h:17,category:"delivery"}
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
},

getResult:function(vals,checkedOf){ var regs=checkedOf("regular"),specs=checkedOf("special"),apps=checkedOf("application");
return{form:"lc",fields:vals,
loanTypes:regs.concat(specs).map(function(x){return x.label;}),
applicationType:apps.length?apps[0].label:"",
modeOfDelivery:checkedOf("delivery").map(function(x){return x.label;})};
}

});

})();

