/* ============================================================
   SCSLAI — FORM FILL-OUT ENGINE (engine.js)
   Shared framework: modal, positioning, PDF, validation.
   Form-specific configs registered by per-form scripts.
   ============================================================ */
(function () {
  "use strict";

  var configs = {};
  var active = "sc";
  var modal, body, closeBtn;

  function register(cfg) { if (cfg && cfg.key) configs[cfg.key] = cfg; }
  function cfg() { return configs[active] || {}; }

  /* Buttons */
  function bindButtons() {
    var btns = document.querySelectorAll("[data-open-loan-form]");
    Array.prototype.forEach.call(btns, function (btn) {
      var k = btn.getAttribute("data-form") || "sc";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (configs[k]) { active = k; openModal(); }
      });
    });
  }

  function getWidth()  { return cfg().width  || 1275; }
  function getHeight() { return cfg().height || 2100; }
  /* Per-page dimensions: a form may declare width2/height2 when its second
     page image has a different size than the first. Falls back to the main
     width/height so existing single-size forms are unaffected. */
  function pageDims(pg2) {
    if (pg2 && cfg().width2 && cfg().height2) return { w: cfg().width2, h: cfg().height2 };
    return { w: getWidth(), h: getHeight() };
  }
  function hasPage2()  { return !!cfg().hasPage2; }
  function hasBoxes()  { return !!cfg().hasCheckboxes; }
  function useUpper()  { return cfg().useUppercase !== false; }

  function getScale(cv) {
    if (!cv) return 1;
    var img = cv.querySelector(".loan-form-background");
    var cw = img ? img.getBoundingClientRect().width : 0;
    if (cw <= 0) cw = cv.getBoundingClientRect().width;
    var dims = pageDims(cv.getAttribute("data-page") === "2");
    return cw / dims.w;
  }

  function updateScale() {
    document.querySelectorAll(".loan-form-canvas").forEach(function (cv) {
      cv.style.setProperty("--form-scale", getScale(cv));
    });
  }

  /* Positioning */
  function positionOverlays() {
    document.querySelectorAll(".loan-form-canvas").forEach(function (cv) {
      var pg2 = cv.getAttribute("data-page") === "2";
      var map = pg2 ? (cfg().page2Fields || {}) : (cfg().fields || {});
      if (!map) return;
      var dims = pageDims(pg2), scale = getScale(cv), aw = dims.w, ah = dims.h;
      var inputs = cv.querySelectorAll(".form-input"), i, el, f;
      for (i = 0; i < inputs.length; i++) {
        el = inputs[i]; f = map[el.id]; if (!f) continue;
        el.style.left = (f.x/aw)*100+"%";
        el.style.top = (f.y/ah)*100+"%";
        el.style.width = (f.w/aw)*100+"%";
        el.style.height = (f.h/ah)*100+"%";
        el.style.fontSize = Math.round(f.fs*scale)+"px";
        el.style.lineHeight = "normal";
        if (!pg2 && useUpper()) { el.style.color = "#003399"; el.style.textTransform = "uppercase"; }
      }
      if (!pg2 && hasBoxes()) {
        var boxes = cv.querySelectorAll(".form-checkbox"), cbMap = cfg().checkboxes || {}, c;
        for (i = 0; i < boxes.length; i++) {
          el = boxes[i]; c = cbMap[el.id]; if (!c) continue;
          el.style.left = ((c.cx-c.w/2)/aw)*100+"%";
          el.style.top = ((c.cy-c.h/2)/ah)*100+"%";
          el.style.width = (c.w/aw)*100+"%";
          el.style.height = (c.h/ah)*100+"%";
        }
      }
      cv.style.setProperty("--form-scale", scale);
    });
  }

  /* HTML generation */
  function fieldHTML(map) {
    return Object.keys(map).map(function (id) {
      if (id === "payableYears") {
        var opts = []; for (var n=1;n<=30;n++) opts.push('<option value="'+n+'">'+n+'</option>');
        return '<select id="payableYears" class="form-input form-select"><option value="">-</option>'+opts.join("")+'</select>';
      }
      if (id === "payableYearsWords") return '<input type="text" id="payableYearsWords" class="form-input" maxlength="30">';
      return '<input type="text" id="'+id+'" class="form-input" maxlength="80">';
    }).join("");
  }

  function checkboxHTML() {
    return Object.keys(cfg().checkboxes || {}).map(function (id) {
      return '<input type="checkbox" id="'+id+'" class="form-checkbox">';
    }).join("");
  }

  function rebuildCanvases() {
    var bd = document.querySelector(".loan-modal-body");
    if (!bd) return;
    var pages = hasPage2() ? [1,2] : [1];
    var imgs = cfg().images || [];
    var html = pages.map(function (n) {
      var isP2 = n === 2;
      var map = isP2 ? (cfg().page2Fields||{}) : (cfg().fields||{});
      if (n>1 && !hasPage2()) return "";
      return '<div class="loan-form-canvas"'+(isP2?' data-page="2"':'')+'>'+
        '<img class="loan-form-background" src="'+(imgs[n-1]||"")+'" alt="Page '+n+'">'+
        fieldHTML(map)+(isP2?"":(hasBoxes()?checkboxHTML():""))+'</div>';
    }).join("");
    var form = bd.querySelector("#loanApplicationForm");
    if (form) form.innerHTML = html+'<div class="modal-actions"><button type="button" id="cancelLoanModal">Cancel</button><button type="submit">Complete</button></div>';
    var cb = document.getElementById("cancelLoanModal"); if (cb) cb.addEventListener("click",closeModal);
  }

  function openModal() {
    if (!modal) return;
    var h2 = modal.querySelector(".loan-modal-header h2");
    if (h2) h2.textContent = cfg().title || "Loan Application";
    rebuildCanvases();
    modal.classList.add("active");
    body.classList.add("loan-modal-open");
    modal.setAttribute("aria-hidden","false");
    requestAnimationFrame(function(){ positionOverlays(); if(hasBoxes()){ wireCheckboxGroups(); wirePayableAutoFill(); } });
  }

  function closeModal() {
    if(!modal)return;
    modal.classList.remove("active");
    body.classList.remove("loan-modal-open");
    modal.setAttribute("aria-hidden","true");
  }

  function wireCheckboxGroups() {
    var boxes = document.querySelectorAll(".loan-form-canvas .form-checkbox");
    var cbMap = cfg().checkboxes||{};
    Array.prototype.forEach.call(boxes,function(box){
      box.addEventListener("change",function(){
        var cat = (cbMap[this.id]||{}).category;
        if(!cat||!this.checked)return;
        Array.prototype.forEach.call(boxes,function(o){
          var om=cbMap[o.id]||{};
          if(om.category===cat&&o.id!==this.id)o.checked=false;
        },this);
      });
    });
  }

  var numW=["","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","TEN","ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN","SIXTEEN","SEVENTEEN","EIGHTEEN","NINETEEN"];
  var tenW=["","","TWENTY","THIRTY","FORTY","FIFTY","SIXTY","SEVENTY","EIGHTY","NINETY"];
  function n2w(n){var x=parseInt(n,10);if(isNaN(x)||x<1||x>30)return"";if(x<20)return numW[x];return tenW[Math.floor(x/10)]+(x%10?"-"+numW[x%10]:"");}

  function wirePayableAutoFill(){
    var p=document.getElementById("payableYears");if(!p)return;
    p.onchange=function(){var w=document.getElementById("payableYearsWords");if(w)w.value=n2w(this.value)||"";};
  }

  function getVal(id){var el=document.getElementById(id);return el?el.value.trim():"";}

  function checkedOf(cat){
    var cbMap=cfg().checkboxes||{},labels=cfg().labels||{},list=[],key,el;
    for(key in cbMap){if(!Object.prototype.hasOwnProperty.call(cbMap,key))continue;if(cbMap[key].category!==cat)continue;el=document.getElementById(key);if(el&&el.checked)list.push({id:key,label:labels[key]||key});}
    return list;
  }

  function img2url(img){
    var c=document.createElement("canvas");
    c.width=img.naturalWidth||getWidth();c.height=img.naturalHeight||getHeight();
    var ctx=c.getContext("2d");ctx.drawImage(img,0,0,c.width,c.height);
    return c.toDataURL("image/png");
  }

  async function generatePDF(){
    if(!window.PDFLib){alert("PDF library not loaded.");return;}
    try{
      var L=window.PDFLib,doc=await L.PDFDocument.create(),font=await doc.embedFont(L.StandardFonts.TimesRoman),rgb=L.rgb;
      var pgs=document.querySelectorAll(".loan-form-canvas"),p,cv,isP2,map,img,png,page,id,f,el,val,c,cy,hl;
      for(p=0;p<pgs.length;p++){
        cv=pgs[p];isP2=cv.getAttribute("data-page")==="2";
        map=isP2?(cfg().page2Fields||{}):(cfg().fields||{});if(!map)continue;
        img=cv.querySelector(".loan-form-background");
        try{var rp=await fetch(img.src);if(rp.ok)png=await doc.embedPng(await rp.arrayBuffer());else throw"fetch";}catch(e){png=await doc.embedPng(await img2url(img));}
        var dims=pageDims(isP2),aw=dims.w,ah=dims.h;
        page=doc.addPage([aw,ah]);page.drawImage(png,{x:0,y:0,width:aw,height:ah});
        for(id in map){if(!Object.prototype.hasOwnProperty.call(map,id))continue;el=document.getElementById(id);val=el?el.value:"";if(!val)continue;f=map[id];page.drawText(val.toUpperCase(),{x:f.x,y:ah-f.y-f.h,size:f.fs,font:font,color:isP2?rgb(0,0,0):(hasBoxes()?rgb(0,0.2,0.6):rgb(0,0,0))});}
        if(!isP2&&hasBoxes()){
          var cbMap=cfg().checkboxes||{};
          for(id in cbMap){if(!Object.prototype.hasOwnProperty.call(cbMap,id))continue;el=document.getElementById(id);if(!el||!el.checked)continue;c=cbMap[id];cy=ah-c.cy;hl=c.w*0.55;
            page.drawLine({start:{x:c.cx-hl,y:cy+hl},end:{x:c.cx+hl,y:cy-hl},thickness:1.5,color:rgb(0,0,0)});
            page.drawLine({start:{x:c.cx-hl,y:cy-hl},end:{x:c.cx+hl,y:cy+hl},thickness:1.5,color:rgb(0,0,0)});
          }
        }
      }
      var by=await doc.save(),bl=new Blob([by],{type:"application/pdf"}),url=URL.createObjectURL(bl),a=document.createElement("a");
      a.href=url;a.download="SCSLAI-"+(cfg().pdfPrefix||"")+(cfg().pdfSuffix||"Loan-Application")+(getVal("lastName")?"-"+getVal("lastName"):"")+".pdf";
      document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(url);},1000);
      alert("PDF generated. Saved to your Downloads folder.");
    }catch(err){alert("PDF generation failed: "+(err&&err.message?err.message:err));}
  }

  function wireSubmit(){
    var fe=document.getElementById("loanApplicationForm");if(!fe)return;
    fe.addEventListener("submit",function(e){
      e.preventDefault();
      var fld=cfg().fields||{},vals={},id;
      for(id in fld){if(Object.prototype.hasOwnProperty.call(fld,id))vals[id]=getVal(id);}
      var miss=[];
      if(typeof cfg().validate==="function")cfg().validate(vals,miss);
      /* Loan-category checkbox validation only applies to forms that actually
         declare regular/special/application checkboxes (loan & withdrawal
         forms); other checkbox forms (e.g. civil status) skip it. */
      var needsLoanCats=false,cbm=cfg().checkboxes||{},cbk,cbg;
      for(cbk in cbm){if(!Object.prototype.hasOwnProperty.call(cbm,cbk))continue;cbg=cbm[cbk].category;if(cbg==="regular"||cbg==="special"||cbg==="application"){needsLoanCats=true;break;}}
      if(needsLoanCats){var regs=checkedOf("regular"),specs=checkedOf("special"),apps=checkedOf("application");if(regs.length===0&&specs.length===0)miss.push("Type of Loan");if(apps.length===0)miss.push("Application Type (New Loan / Consolidate)");}
      if(vals.edpNumber&&!/^[0-9]+$/.test(vals.edpNumber)){alert("EDP Number must be numbers only.");return;}
      if(vals.zipCode&&!/^[0-9]{4}$/.test(vals.zipCode)){alert("Please enter a valid 4-digit ZIP Code.");return;}
      var mr=cfg().mobileField?vals[cfg().mobileField]:vals.contactNumber;
      var mob=mr?mr.replace(/[\s-]/g,""):"";
      if(mob&&!/^(09|\+639)[0-9]{9}$/.test(mob)){alert("Please enter a valid Philippine mobile number.");return;}
      if(vals.emailAddress&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.emailAddress)){alert("Please enter a valid email address.");return;}
      if(vals.birthdate){var d=new Date(vals.birthdate);if(isNaN(d.getTime())||d>=new Date()){alert("Birthdate cannot be today or a future date.");return;}}
      if(miss.length){alert("Please complete:\n- "+miss.join("\n- "));return;}
      var result;
      if(typeof cfg().getResult==="function")result=cfg().getResult(vals,checkedOf);
      else result={form:active,fields:vals};
      closeModal();console.log("SCSLAI:",result);window.__loanApplicationData=result;generatePDF();
    });
  }

  function init(){
    modal=document.getElementById("loanModal");
    body=document.body;
    closeBtn=document.getElementById("closeLoanModal");
    bindButtons();
    wireSubmit();
    if(closeBtn)closeBtn.addEventListener("click",closeModal);
    if(modal)modal.addEventListener("click",function(e){if(e.target===modal)closeModal();});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&modal&&modal.classList.contains("active"))closeModal();});
    positionOverlays();updateScale();
    window.addEventListener("resize",positionOverlays);
  }

  window.SCSLAI = { register: register };
  document.addEventListener("DOMContentLoaded", init);
})();
