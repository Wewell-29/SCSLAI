from PIL import Image
import numpy as np
import io
from rapidocr_onnxruntime import RapidOCR

p = 'FRONT/FORMS/Lower Court (LC) Loan Application Form1_page-0002.png'
im = Image.open(p).convert('RGB')
a = np.array(Image.open(p).convert('L'))
print('size', im.size)

ocr = RapidOCR()
result, _ = ocr(np.asarray(im))

out = io.StringIO()
items = []
for box, text, score in result:
    xs = [p[0] for p in box]; ys = [p[1] for p in box]
    items.append((int(min(ys)), int(min(xs)), int(max(xs)), int(max(ys)), round(float(score), 2), text))
items.sort(key=lambda t: (t[0]//12, t[1]))
for y0, x0, x1, y1, sc, t in items:
    out.write('y=%4d-%4d x=%4d-%4d s=%s | %s\n' % (y0, y1, x0, x1, sc, t))
open('FRONT/_lc2_ocr.txt', 'w', encoding='utf-8').write(out.getvalue())
print('done, lines:', len(items))

dark = a < 150
out2 = io.StringIO()
for y in range(40, 2100):
    row = dark[y, 40:1240]
    runs = []; s = None
    for i, v in enumerate(row):
        if v and s is None: s = i
        elif not v and s is not None: runs.append((40+s, 40+i)); s = None
    if s is not None: runs.append((40+s, 40+1239))
    parts = [(r0, r1) for (r0, r1) in runs if r1-r0 >= 40]
    if parts:
        out2.write('y=%d:' % y + ' | '.join('x=%d-%d len=%d' % (r0, r1, r1-r0) for (r0, r1) in parts) + '\n')
open('FRONT/_lc2_lines.txt', 'w', encoding='utf-8').write(out2.getvalue())
print('lines done')