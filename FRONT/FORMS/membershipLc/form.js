/* SCSLAI — LC Membership Application Form Config (FORM 21)
   Page 1 image: 2550x4200, Page 2 (checklist): 2550x3300. */
(function(){
"use strict";

SCSLAI.register({
key:"membershipLc",
title:"LC Membership Application Form",
width:2550, height:4200,
width2:2550, height2:3300,
hasPage2:true, hasCheckboxes:false, useUppercase:true,
mobileField:"mobileNumber",
pdfPrefix:"LC-Membership-Application-",
pdfSuffix:"Form",
images:[
"FORMS/LOWER COURT MEMBERSHIP APPLICATION FORM 01.png",
"FORMS/LOWER COURT MEMBERSHIP APPLICATION FORM 02.png"
],

fields:{
/* PERSONAL INFORMATION */
lastName:{x:308,y:1286,w:536,h:50,fs:24},
firstName:{x:936,y:1286,w:660,h:50,fs:24},
middleName:{x:1696,y:1286,w:578,h:50,fs:24},
birthdate:{x:414,y:1402,w:412,h:50,fs:24},
placeOfBirth:{x:1174,y:1402,w:432,h:50,fs:24},
nationality:{x:1884,y:1402,w:410,h:50,fs:24},
gender:{x:324,y:1462,w:474,h:50,fs:24},
civilStatus:{x:1132,y:1462,w:494,h:50,fs:24},
spouseName:{x:474,y:1520,w:618,h:50,fs:24},
spouseBirth:{x:1622,y:1520,w:370,h:50,fs:24},
motherMaiden:{x:602,y:1579,w:868,h:50,fs:24},
homeAddress:{x:584,y:1637,w:1572,h:50,fs:24},
telephone:{x:436,y:1696,w:660,h:50,fs:24},
mobileNumber:{x:1434,y:1696,w:724,h:50,fs:24},
emailAddress:{x:448,y:1754,w:1076,h:50,fs:24},
permanentAddr:{x:642,y:1813,w:1512,h:50,fs:24},

/* SERVICE / EMPLOYMENT INFORMATION */
officeDivision:{x:474,y:2002,w:590,h:50,fs:24},
rankPosition:{x:1510,y:2002,w:406,h:50,fs:24},
gsisId:{x:396,y:2066,w:408,h:50,fs:24},
tin:{x:1014,y:2066,w:612,h:50,fs:24},
edpNumber:{x:1838,y:2066,w:452,h:50,fs:24},
officeAddress:{x:886,y:2131,w:1480,h:50,fs:24},
monthlySalary:{x:480,y:2196,w:568,h:50,fs:24},
lengthService:{x:1418,y:2196,w:568,h:50,fs:24},
appointment:{x:622,y:2260,w:430,h:50,fs:24},
dateAppoint:{x:1472,y:2260,w:362,h:50,fs:24},
officeTel:{x:2114,y:2260,w:246,h:50,fs:20},
incomeSource:{x:1500,y:2324,w:864,h:50,fs:24},

/* LEGAL HEIRS / BENEFICIARY (4 table rows) */
ben1Name:{x:154,y:2616,w:572,h:64,fs:20},
ben1Dob:{x:734,y:2616,w:592,h:64,fs:20},
ben1Rel:{x:1334,y:2616,w:594,h:64,fs:20},
ben1Contact:{x:1936,y:2616,w:510,h:64,fs:18},
ben2Name:{x:154,y:2690,w:572,h:64,fs:20},
ben2Dob:{x:734,y:2690,w:592,h:64,fs:20},
ben2Rel:{x:1334,y:2690,w:594,h:64,fs:20},
ben2Contact:{x:1936,y:2690,w:510,h:64,fs:18},
ben3Name:{x:154,y:2766,w:572,h:64,fs:20},
ben3Dob:{x:734,y:2766,w:592,h:64,fs:20},
ben3Rel:{x:1334,y:2766,w:594,h:64,fs:20},
ben3Contact:{x:1936,y:2766,w:510,h:64,fs:18},
ben4Name:{x:154,y:2838,w:572,h:68,fs:20},
ben4Dob:{x:734,y:2838,w:592,h:68,fs:20},
ben4Rel:{x:1334,y:2838,w:594,h:68,fs:20},
ben4Contact:{x:1936,y:2838,w:510,h:68,fs:18},

/* SPECIMEN SIGNATURE + SIGNATURE OVER PRINTED NAME */
sig1:{x:222,y:3114,w:568,h:50,fs:24},
sig2:{x:972,y:3114,w:568,h:50,fs:24},
sig3:{x:1802,y:3114,w:498,h:50,fs:24},
signatureOverName:{x:1700,y:3320,w:658,h:50,fs:22}
},

page2Fields:{
clName:{x:334,y:400,w:894,h:50,fs:24},
clStation:{x:334,y:486,w:894,h:50,fs:24},
clPhone:{x:1910,y:486,w:414,h:50,fs:24}
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
return{form:"membershipLc",fields:vals};
}

});

})();