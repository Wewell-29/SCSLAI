import io

s = io.open("FORMS/engine.js", encoding="utf-8").read()
pairs = {")": "(", "}": "{", "]": "["}
stack = []
ok = True
line = 1
for ch in s:
    if ch == "\n":
        line += 1
    if ch in "([{":
        stack.append((ch, line))
    elif ch in ")]}":
        if not stack or stack[-1][0] != pairs[ch]:
            ok = False
            print("MISMATCH line", line, repr(ch), stack[-3:])
            break
        stack.pop()
print("balanced:", ok, "| unclosed:", stack[-3:])
print("ensureHtml2Canvas occurrences:", s.count("ensureHtml2Canvas"))
print("html2canvasPromise occurrences:", s.count("html2canvasPromise"))
print("canRasterize occurrences:", s.count("canRasterize"))
print("HTML2CANVAS_SRC occurrences:", s.count("HTML2CANVAS_SRC"))
print("lines:", s.count("\n") + 1)
