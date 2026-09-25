/* SCSLAI — SC Capital Contribution Declaration Form (CCDF)
   Single page 2550x4200. Image identical to LC copy. */
(function(){
"use strict";

SCSLAI.register({
key:"ccdfSc",
title:"SC Capital Contribution Declaration Form",
fieldLabels:{
lastName:"Surname",firstName:"First Name",middleName:"Middle Name",
office:"Office",edpNumber:"EDP No.",accountNo:"Account No.",
mobileNumber:"Mobile No.",officeLandline:"Office Landline",
dateToday:"Date Today"
},
width:2550, height:4200,
hasPage2:false, hasCheckboxes:false, useUppercase:true,
mobileField:"mobileNumber",
pdfPrefix:"SC-Capital-Contribution-Declaration-",
pdfSuffix:"Form",
images:["FORMS/CCDF - SC.png"],

fields:{
/* MEMBER'S PROFILE — name line (Surname / First Name / Middle Name) */
lastName:{x:240,y:664,w:932,h:50,fs:24},
firstName:{x:850,y:664,w:920,h:50,fs:24},
middleName:{x:1700,y:664,w:492,h:50,fs:24},
office:{x:436,y:770,w:1828,h:50,fs:24},
edpNumber:{x:434,y:875,w:680,h:50,fs:24},
accountNo:{x:1825,y:875,w:425,h:50,fs:24},
mobileNumber:{x:525,y:928,w:604,h:50,fs:24},
officeLandline:{x:1753,y:928,w:502,h:50,fs:24},


},

validate:function(vals,miss){
if(!vals.lastName)miss.push("Surname");
if(!vals.firstName)miss.push("First Name");
if(!vals.office)miss.push("Office");
if(!vals.edpNumber)miss.push("EDP No.");
if(!vals.mobileNumber)miss.push("Mobile No.");
if(!vals.accountNo)miss.push("Account No.");

},

getResult:function(vals){
return{form:"ccdfSc",fields:vals};
}

});

})();