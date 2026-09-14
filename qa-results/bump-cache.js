// bump-cache.js — stamps a ?v= query onto the shared style.css / script.js /
// scslaicares.css references in every FRONT page, so browsers (especially
// phones) drop stale cached copies after a layout update. Mirrors the
// existing convention already used by download.html (loanForm.css?v=5).
// Usage: node qa-results/bump-cache.js [stamp]
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'FRONT');
const stamp = process.argv[2] || '20260903';

const files = [];
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.css'))) {
    files.push(path.join(root, entry.name));
  }
}
const reportsDir = path.join(root, 'reports');
if (fs.existsSync(reportsDir)) {
  for (const entry of fs.readdirSync(reportsDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path.join(reportsDir, entry.name));
  }
}

const rules = [
  [/(href="(?:\.\.\/)?style\.css)(?:\?v=[0-9A-Za-z-]+)?"/g, `$1?v=${stamp}"`],
  [/(src="(?:\.\.\/)?script\.js)(?:\?v=[0-9A-Za-z-]+)?"/g, `$1?v=${stamp}"`],
  [/(href="scslaicares\.css)(?:\?v=[0-9A-Za-z-]+)?"/g, `$1?v=${stamp}"`],
  [/(@import url\("style\.css)(?:\?v=[0-9A-Za-z-]+)?"\)/g, `$1?v=${stamp}")`]
];

let touched = 0;
for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  let out = src;
  for (const [rule, repl] of rules) {
    out = out.replace(rule, repl);
  }
  if (out !== src) {
    fs.writeFileSync(file, out, 'utf8');
    touched += 1;
    console.log('stamped', path.relative(root, file));
  }
}
console.log(`[bump-cache] done. ${touched} file(s) updated with ?v=${stamp}`);
