p = r"c:\Users\PC\Desktop\SCSLAI\FRONT\scslaicares.html"
b = open(p, "rb").read()
print("before:", repr(b[-30:]))
trimmed = b.rstrip(b"\r\n") + b"\r\n"
if trimmed != b:
    open(p, "wb").write(trimmed)
print("after :", repr(open(p, "rb").read()[-30:]))
