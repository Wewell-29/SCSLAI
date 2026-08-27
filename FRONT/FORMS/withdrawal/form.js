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
station:{x:1509,y:1444,w:579,h:46,fs:22},
appointment:{x:886,y:1495,w:185,h:46,fs:22},
edpNumber:{x:519,y:1547,w:301,h:46,fs:22},
mobileNumber:{x:591,y:1599,w:301,h:46,fs:22},
homeAddress1:{x:925,y:1650,w:185,h:46,fs:22},
homeAddress2:{x:1458,y:1650,w:648,h:46,fs:22},
printedName:{x:337,y:1702,w:787,h:50,fs:24},
signature:{x:37,y:1753,w:2456,h:46,fs:22},

ccCurrent:{x:900,y:1961,w:442,h:46,fs:22},
ccFixedCapital:{x:1654,y:1961,w:349,h:46,fs:22},
ccBuffer:{x:2150,y:1961,w:348,h:46,fs:22},
ccLess:{x:897,y:2016,w:442,h:46,fs:22},
ccAvailable:{x:931,y:2071,w:394,h:46,fs:22},
ccAvailableBuffer:{x:2186,y:2071,w:301,h:46,fs:22},

loanAsOfDate:{x:1684,y:2219,w:203,h:44,fs:20},

characterAmt:{x:937,y:2312,w:256,h:44,fs:20},
characterDate:{x:1216,y:2312,w:301,h:44,fs:20},
characterBalance:{x:1541,y:2312,w:396,h:44,fs:20},
characterDeduction:{x:1949,y:2312,w:326,h:44,fs:20},
educationalAmt:{x:937,y:2364,w:256,h:44,fs:20},
educationalDate:{x:1216,y:2364,w:301,h:44,fs:20},
educationalBalance:{x:1541,y:2364,w:396,h:44,fs:20},
educationalDeduction:{x:1949,y:2364,w:326,h:44,fs:20},
judicialAmt:{x:937,y:2416,w:256,h:44,fs:20},
judicialDate:{x:1216,y:2416,w:301,h:44,fs:20},
judicialBalance:{x:1541,y:2416,w:396,h:44,fs:20},
judicialDeduction:{x:1949,y:2416,w:326,h:44,fs:20},
longTermAmt:{x:937,y:2467,w:256,h:44,fs:20},
longTermDate:{x:1216,y:2467,w:301,h:44,fs:20},
longTermBalance:{x:1541,y:2467,w:396,h:44,fs:20},
longTermDeduction:{x:1949,y:2467,w:326,h:44,fs:20},
multiPurposeAmt:{x:937,y:2519,w:256,h:44,fs:20},
multiPurposeDate:{x:1216,y:2519,w:301,h:44,fs:20},
multiPurposeBalance:{x:1541,y:2519,w:396,h:44,fs:20},
multiPurposeDeduction:{x:1949,y:2519,w:326,h:44,fs:20},
pettyAmt:{x:937,y:2571,w:256,h:44,fs:20},
pettyDate:{x:1216,y:2571,w:301,h:44,fs:20},
pettyBalance:{x:1541,y:2571,w:396,h:44,fs:20},
pettyDeduction:{x:1949,y:2571,w:326,h:44,fs:20},
salaryAmt:{x:937,y:2623,w:256,h:44,fs:20},
salaryDate:{x:1216,y:2623,w:301,h:44,fs:20},
salaryBalance:{x:1541,y:2623,w:396,h:44,fs:20},
salaryDeduction:{x:1949,y:2623,w:326,h:44,fs:20},
subsistenceAmt:{x:937,y:2674,w:256,h:44,fs:20},
subsistenceDate:{x:1216,y:2674,w:301,h:44,fs:20},
subsistenceBalance:{x:1541,y:2674,w:396,h:44,fs:20},
subsistenceDeduction:{x:1949,y:2674,w:326,h:44,fs:20},
allowanceAmt:{x:937,y:2726,w:256,h:44,fs:20},
allowanceDate:{x:1216,y:2726,w:301,h:44,fs:20},
allowanceBalance:{x:1541,y:2726,w:396,h:44,fs:20},
allowanceDeduction:{x:1949,y:2726,w:326,h:44,fs:20},
emergencyRataAmt:{x:937,y:2778,w:256,h:44,fs:20},
emergencyRataDate:{x:1216,y:2778,w:301,h:44,fs:20},
emergencyRataBalance:{x:1541,y:2778,w:396,h:44,fs:20},
emergencyRataDeduction:{x:1949,y:2778,w:326,h:44,fs:20},
equityAmt:{x:937,y:2829,w:256,h:44,fs:20},
equityDate:{x:1216,y:2829,w:301,h:44,fs:20},
equityBalance:{x:1541,y:2829,w:396,h:44,fs:20},
equityDeduction:{x:1949,y:2829,w:326,h:44,fs:20},
equitableAmt:{x:937,y:2881,w:256,h:44,fs:20},
equitableDate:{x:1216,y:2881,w:301,h:44,fs:20},
equitableBalance:{x:1541,y:2881,w:396,h:44,fs:20},
equitableDeduction:{x:1949,y:2881,w:326,h:44,fs:20},
housingAmt:{x:937,y:2933,w:256,h:44,fs:20},
housingDate:{x:1216,y:2933,w:301,h:44,fs:20},
housingBalance:{x:1541,y:2933,w:396,h:44,fs:20},
housingDeduction:{x:1949,y:2933,w:326,h:44,fs:20},
businessAmt:{x:937,y:2984,w:256,h:44,fs:20},
businessDate:{x:1216,y:2984,w:301,h:44,fs:20},
businessBalance:{x:1541,y:2984,w:396,h:44,fs:20},
businessDeduction:{x:1949,y:2984,w:326,h:44,fs:20},
mealAmt:{x:937,y:3036,w:256,h:44,fs:20},
mealDate:{x:1216,y:3036,w:301,h:44,fs:20},
mealBalance:{x:1541,y:3036,w:396,h:44,fs:20},
mealDeduction:{x:1949,y:3036,w:326,h:44,fs:20},

totalAmount:{x:1537,y:3139,w:395,h:44,fs:20},
totalDeduction:{x:1945,y:3139,w:326,h:44,fs:20},
totalBalance:{x:1537,y:3243,w:395,h:44,fs:20},

ledgerPersonnel1:{x:1133,y:3346,w:417,h:46,fs:22},
ledgerPersonnel2:{x:1296,y:3346,w:417,h:46,fs:22},
ledgerDate:{x:1861,y:3346,w:347,h:46,fs:22},
ledgerSignature:{x:1019,y:3700,w:509,h:46,fs:22},

approval1a:{x:666,y:3796,w:509,h:46,fs:22},
approval1b:{x:1373,y:3796,w:509,h:46,fs:22},
approval2a:{x:666,y:3892,w:509,h:46,fs:22},
approval2b:{x:1373,y:3892,w:509,h:46,fs:22},
approval3a:{x:666,y:3987,w:509,h:46,fs:22},
approval3b:{x:1373,y:3987,w:509,h:46,fs:22}
},

page2Fields:{
evaluatedBy1:{x:300,y:2957,w:484,h:46,fs:20},
evaluatedBy2:{x:1350,y:2957,w:484,h:46,fs:20}
},

checkboxes:{
reasonPersonal:{cx:56,cy:594,w:18,h:18,category:"reason"},
reasonInvestment:{cx:432,cy:594,w:18,h:18,category:"reason"},
reasonOthers:{cx:905,cy:594,w:18,h:18,category:"reason"},
memberActive:{cx:350,cy:696,w:18,h:18,category:"memberStatus"},
memberSeparated:{cx:56,cy:749,w:18,h:18,category:"memberStatus"},
memberRetired:{cx:483,cy:749,w:18,h:18,category:"memberStatus"}
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
