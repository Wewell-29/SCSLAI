# -*- coding: utf-8 -*-
import io, re, sys

p = r"c:\Users\PC\Desktop\SCSLAI\FRONT\FORMS\authorityLc\form.js"
s = io.open(p, encoding="utf-8").read()

# Strip comments and string literals, then check brace/bracket/paren balance.
code = re.sub(r"//[^\n]*|/\*.*?\*/|'[^'\\]*(?:\\.[^'\\]*)*'|\"[^\"\\]*(?:\\.[^\"\\]*)*\"", "", s, flags=re.S)

stack = []
pairs = {")": "(", "]": "[", "}": "{"}
ok = True
for i, ch in enumerate(code):
    if ch in "([{":
        stack.append(ch)
    elif ch in ")]}":
        if not stack or stack[-1] != pairs[ch]:
            ok = False
            print("MISMATCH near offset", i, "found", repr(ch), "top", stack[-1:] )
            break
        stack.pop()
print("balanced:", ok, "| unclosed:", stack)

for tok in ("signatureOverName", "dearSir", "processedBy", "checkedOf", "civilStatus"):
    print(tok, "occurrences:", s.count(tok))

bad = [(i, hex(ord(c))) for i, c in enumerate(s) if ord(c) > 127]
print("non-ascii count:", len(bad), "positions:", bad)

print("lines:", s.count("\n") + 1)
print("has ',}' closing fields block after permanentAddr:", "permanentAddr:{x:886,y:2855,w:634,h:50,fs:22}\n}," in s)
print("tail ok:", s.rstrip().endswith("});\n})();"))