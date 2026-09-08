/* SCSLAI — Withdrawal Form Config */
(function(){
"use strict";

SCSLAI.register({
key:"withdrawal",
title:"Withdrawal Form",
width:2550, height:4200,
hasPage2:true, hasCheckboxes:true, useUppercase:true,
mobileField:"mobileNumber",
pdfPrefix:"Withdrawal-",
pdfSuffix:"Form",
images:[
"FORMS/WITHDRAWAL 01.png",
"FORMS/WITHDRAWAL 02.png"
],

fields:{
date:{x:2141,y:479,w:370,h:46,fs:22},
othersReason:{x:1086,y:583,w:277,h:46,fs:22},
amountWords:{x:1002,y:1204,w:824,h:50,fs:24},
amountFigures:{x:1863,y:1204,w:324,h:50,fs:24},
office:{x:501,y:1444,w:602,h:46,fs:22},
printedName:{x:1500,y:1650,w:600,h:46,fs:22},
appointment:{x:886,y:1495,w:220,h:46,fs:22},
edpNumber:{x:519,y:1547,w:600,h:46,fs:22},
mobileNumber:{x:591,y:1599,w:525,h:46,fs:22},
homeAddress1:{x:925,y:1650,w:185,h:46,fs:22},
homeAddress2:{x:337,y:1702,w:787,h:50,fs:24},

},

checkboxes:{
reasonPersonal:{cx:45,cy:610,w:30,h:50,category:"reason"},
reasonInvestment:{cx:460,cy:610,w:30,h:50,category:"reason"},
reasonOthers:{cx:915,cy:610,w:30,h:50,category:"reason"},
memberSeparated:{cx:50,cy:765,w:30,h:50,category:"memberStatus"},
memberRetired:{cx:500,cy:765,w:30,h:50,category:"memberStatus"}
},

labels:{
reasonPersonal:"Personal",
reasonInvestment:"For Investment",
reasonOthers:"Others",
memberActive:"Active Regular Member",
memberSeparated:"Separated",
memberRetired:"Retired"
},

validate:function(vals,miss){
if(!vals.printedName)miss.push("Applicant's Printed Name");
if(!vals.office)miss.push("Office");
if(!vals.appointment)miss.push("Status of Appointment");
if(!vals.edpNumber)miss.push("EDP No.");
if(!vals.mobileNumber)miss.push("Mobile No.");
if(!vals.homeAddress2)miss.push("Complete Home Address");
if(!vals.amountFigures)miss.push("Amount to be Withdrawn");
var reason = ["reasonPersonal","reasonInvestment","reasonOthers"].some(function(id){
var el=document.getElementById(id); return el && el.checked;
});
if(!reason) miss.push("Reason for Withdrawal");
},

getResult:function(vals,checkedOf){
return{form:"withdrawal",fields:vals,
reason:checkedOf("reason").map(function(x){return x.label;}),
memberStatus:checkedOf("memberStatus").map(function(x){return x.label;})};
}

});

})();
