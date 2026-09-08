/* SCSLAI — Readmission Form Config */
(function(){
"use strict";

SCSLAI.register({
key:"readmission",
title:"Readmission Form",
width:2550, height:4200,
hasPage2:false, hasCheckboxes:false, useUppercase:false,
mobileField:"mobile",
pdfPrefix:"Readmission-",
pdfSuffix:"Membership-Readmission",
images:["FORMS/MEMBERSHIP RE-ADMISSION 2025 Edition.png"],

fields:{
lastName:{x:300,y:1287,w:550,h:55,fs:28},
firstName:{x:920,y:1287,w:700,h:55,fs:28},
middleName:{x:1650,y:1287,w:650,h:55,fs:28},
birthdate:{x:420,y:1411,w:450,h:48,fs:26},
placeOfBirth:{x:1180,y:1411,w:490,h:48,fs:26},
nationality:{x:1890,y:1411,w:450,h:48,fs:26},
gender:{x:335,y:1473,w:580,h:48,fs:26},
civilStatus:{x:1140,y:1473,w:560,h:48,fs:26},
spouseName:{x:480,y:1529,w:740,h:48,fs:26},
spouseBirth:{x:1625,y:1529,w:500,h:48,fs:26},
motherMaiden:{x:610,y:1585,w:850,h:48,fs:26},
homeAddress:{x:590,y:1648,w:1700,h:48,fs:25},
telephone:{x:440,y:1705,w:780,h:48,fs:26},
mobile:{x:1440,y:1705,w:750,h:48,fs:26},
emailAddress:{x:460,y:1762,w:1200,h:48,fs:26},
permanentAddr:{x:650,y:1823,w:1500,h:48,fs:25},
officeStation:{x:480,y:2000,w:740,h:52,fs:26},
position:{x:1515,y:2000,w:700,h:52,fs:26},
gsisId:{x:400,y:2078,w:510,h:48,fs:25},
tin:{x:1025,y:2078,w:640,h:48,fs:25},
edpNumber:{x:1845,y:2078,w:550,h:48,fs:25},
officeAddress:{x:895,y:2140,w:1500,h:48,fs:25},
monthlySalary:{x:495,y:2200,w:560,h:48,fs:25},
lengthService:{x:1430,y:2200,w:600,h:48,fs:25},
appointment:{x:630,y:2265,w:420,h:48,fs:25},
dateAppoint:{x:1475,y:2265,w:370,h:48,fs:25},
officeTel:{x:2100,y:2265,w:300,h:48,fs:25},
incomeSource:{x:1505,y:2330,w:900,h:44,fs:24}
},

validate:function(vals,miss){
if(!vals.edpNumber)miss.push("EDP Number");
if(!vals.lastName)miss.push("Last Name");
if(!vals.firstName)miss.push("First Name");
if(!vals.birthdate)miss.push("Birthdate");
if(!vals.placeOfBirth)miss.push("Place of Birth");
if(!vals.nationality)miss.push("Nationality");
if(!vals.gender)miss.push("Gender");
if(!vals.civilStatus)miss.push("Civil Status");
if(!vals.homeAddress)miss.push("Home Address");
if(!vals.telephone)miss.push("Telephone Number");
if(!vals.mobile)miss.push("Mobile Number");
if(!vals.emailAddress)miss.push("Email Address");
if(!vals.permanentAddr)miss.push("Permanent Address");
if(!vals.officeStation)miss.push("Office / Station");
if(!vals.position)miss.push("Position");
if(!vals.gsisId)miss.push("GSIS ID No.");
if(!vals.tin)miss.push("TIN");
if(!vals.officeAddress)miss.push("Office Address");
if(!vals.monthlySalary)miss.push("Monthly Salary");
if(!vals.lengthService)miss.push("Length of Service");
if(!vals.appointment)miss.push("Status of Appointment");
},

getResult:function(vals){
return{form:"readmission",fields:vals};
}

});

})();
