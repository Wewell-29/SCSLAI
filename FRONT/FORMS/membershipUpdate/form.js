/* SCSLAI — Membership Update Form Config */
(function(){
"use strict";

SCSLAI.register({
key:"membershipUpdate",
title:"Membership Update Form",
width:2550, height:4200,
hasPage2:false, hasCheckboxes:false, useUppercase:true,
mobileField:"mobileNumber",
pdfPrefix:"Membership-Update-",
pdfSuffix:"Form",
images:["FORMS/MEMBERSHIP FORM UPDATE 2025 V2.png"],

fields:{
/* PERSONAL INFORMATION */
lastName:{x:303,y:947,w:539,h:52,fs:24},
firstName:{x:932,y:947,w:664,h:52,fs:24},
middleName:{x:1691,y:947,w:581,h:52,fs:24},
birthdate:{x:409,y:1064,w:415,h:52,fs:24},
placeOfBirth:{x:1168,y:1064,w:436,h:52,fs:24},
nationality:{x:1879,y:1064,w:415,h:52,fs:24},
gender:{x:319,y:1123,w:477,h:52,fs:24},
civilStatus:{x:1127,y:1123,w:498,h:52,fs:24},
spouseName:{x:469,y:1181,w:623,h:52,fs:24},
spouseBirth:{x:1617,y:1181,w:373,h:52,fs:24},
motherMaiden:{x:597,y:1240,w:871,h:52,fs:24},
homeAddress:{x:579,y:1298,w:1577,h:52,fs:24},
telephone:{x:431,y:1357,w:664,h:52,fs:24},
mobileNumber:{x:1430,y:1357,w:726,h:52,fs:24},
emailAddress:{x:443,y:1415,w:1079,h:52,fs:24},
permanentAddr:{x:638,y:1474,w:1515,h:52,fs:24},

/* OFFICE / EMPLOYMENT INFORMATION */
officeDivision:{x:468,y:1684,w:594,h:52,fs:24},
rankPosition:{x:1503,y:1684,w:411,h:52,fs:24},
gsisId:{x:390,y:1748,w:411,h:52,fs:24},
tin:{x:1007,y:1748,w:616,h:52,fs:24},
edpNumber:{x:1832,y:1748,w:457,h:52,fs:24},
officeAddress:{x:880,y:1813,w:1483,h:52,fs:24},
monthlySalary:{x:474,y:1877,w:571,h:52,fs:24},
lengthService:{x:1413,y:1877,w:571,h:52,fs:24},
appointment:{x:616,y:1941,w:434,h:52,fs:24},
dateAppoint:{x:1467,y:1941,w:365,h:52,fs:24},
officeTel:{x:2107,y:1941,w:251,h:52,fs:22},
incomeSource:{x:1493,y:2006,w:868,h:52,fs:24},

/* LEGAL HEIRS / BENEFICIARY (3 rows) */
ben1Name:{x:162,y:2436,w:528,h:46,fs:20},
ben1Dob:{x:706,y:2436,w:572,h:46,fs:20},
ben1Rel:{x:1295,y:2436,w:572,h:46,fs:20},
ben1Contact:{x:1885,y:2436,w:510,h:46,fs:18},
ben2Name:{x:162,y:2502,w:528,h:46,fs:20},
ben2Dob:{x:706,y:2502,w:572,h:46,fs:20},
ben2Rel:{x:1295,y:2502,w:572,h:46,fs:20},
ben2Contact:{x:1885,y:2502,w:510,h:46,fs:18},
ben3Name:{x:162,y:2569,w:528,h:46,fs:20},
ben3Dob:{x:706,y:2569,w:572,h:46,fs:20},
ben3Rel:{x:1295,y:2569,w:572,h:46,fs:20},
ben3Contact:{x:1885,y:2569,w:510,h:46,fs:18},

/* SPECIMEN SIGNATURE CARD */
sig1:{x:270,y:2960,w:1060,h:52,fs:26},
sig2:{x:270,y:3088,w:1060,h:52,fs:26},
sig3:{x:270,y:3219,w:1060,h:52,fs:26},
signatureOverName:{x:1470,y:3489,w:880,h:52,fs:22}
},

validate:function(vals,miss){
if(!vals.lastName)miss.push("Last Name");
if(!vals.firstName)miss.push("First Name");
if(!vals.birthdate)miss.push("Date of Birth");
if(!vals.homeAddress)miss.push("Present Home Address");
if(!vals.mobileNumber)miss.push("Mobile No.");
if(!vals.edpNumber)miss.push("EDP No.");
if(!vals.ben1Name)miss.push("Beneficiary #1 Name");
},

getResult:function(vals){
return{form:"membershipUpdate",fields:vals};
}

});

})();