/* SCSLAI — LC Capital Contribution Declaration Form (CCDF)
   Single page 2550x4200. Image identical to SC copy; same coordinates. */
(function(){
"use strict";

SCSLAI.register({
key:"ccdfLc",
title:"LC Capital Contribution Declaration Form",
width:2550, height:4200,
hasPage2:false, hasCheckboxes:false, useUppercase:true,
mobileField:"mobileNumber",
pdfPrefix:"LC-Capital-Contribution-Declaration-",
pdfSuffix:"Form",
images:["FORMS/CCDF - LC.png"],

fields:{
/* MEMBER'S PROFILE — name line (Surname / First Name / Middle Name) */
lastName:{x:240,y:664,w:2032,h:50,fs:24},
firstName:{x:850,y:664,w:920,h:50,fs:24},
middleName:{x:1780,y:664,w:492,h:50,fs:24},
office:{x:436,y:770,w:1828,h:50,fs:24},
edpNumber:{x:434,y:875,w:680,h:50,fs:24},
accountNo:{x:1825,y:875,w:425,h:50,fs:24},
mobileNumber:{x:525,y:928,w:604,h:50,fs:24},
officeLandline:{x:1753,y:928,w:502,h:50,fs:24},

/* DECLARATION — signature / date / committee confirmation */
signatureOverName:{x:390,y:2717,w:706,h:50,fs:24},
dateToday:{x:1678,y:2717,w:297,h:50,fs:24},
confirmedBy:{x:1440,y:3086,w:706,h:50,fs:24}
},

validate:function(vals,miss){
if(!vals.lastName)miss.push("Surname");
if(!vals.firstName)miss.push("First Name");
if(!vals.office)miss.push("Office");
if(!vals.edpNumber)miss.push("EDP No.");
if(!vals.mobileNumber)miss.push("Mobile No.");
if(!vals.signatureOverName)miss.push("Signature Over Printed Name");
},

getResult:function(vals){
return{form:"ccdfLc",fields:vals};
}

});

})();