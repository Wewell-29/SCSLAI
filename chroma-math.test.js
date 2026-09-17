// chroma-math.test.js — validates the book-opening chroma key math in isolation
// Mirrors the exact functions from FRONT/script.js (kept in sync manually).

const CHROMA_KEY_CONFIG = {
  hueTolerance: 20,
  hueFeather: 24,
  despillRange: 30,
  saturationFloor: 0.18,
  valueFloor: 0.10,
  fallbackKeyHue: 120
};

function hueDistanceTo(hue, keyHue) {
  const diff = Math.abs(hue - keyHue) % 360;
  return diff > 180 ? 360 - diff : diff;
}

function computeHue(r, g, b, max, delta) {
  if (delta === 0) return 0;
  let hue;
  if (max === r) hue = 60 * (((g - b) / delta) % 6);
  else if (max === g) hue = 60 * ((b - r) / delta + 2);
  else hue = 60 * ((r - g) / delta + 4);
  return hue < 0 ? hue + 360 : hue;
}

function keyPixel(r8, g8, b8, keyHue) {
  const data = [r8, g8, b8, 255];
  const r = r8 / 255, g = g8 / 255, b = b8 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const saturation = max === 0 ? 0 : delta / max;
  if (saturation < CHROMA_KEY_CONFIG.saturationFloor || max < CHROMA_KEY_CONFIG.valueFloor) {
    return { alpha: 255, spilled: false };
  }
  const hue = computeHue(r, g, b, max, delta);
  const distance = hueDistanceTo(hue, keyHue);
  const innerBound = CHROMA_KEY_CONFIG.hueTolerance;
  const outerBound = innerBound + CHROMA_KEY_CONFIG.hueFeather;
  const despillBound = outerBound + CHROMA_KEY_CONFIG.despillRange;
  if (distance <= innerBound) return { alpha: 0, spilled: false };
  if (distance >= outerBound) {
    // Despill zone: keep the pixel opaque but neutralize its green cast.
    if (distance < despillBound && g > r && g > b) {
      data[1] = Math.round(Math.max(r, b) * 255);
      return { alpha: 255, spilled: true, outGreen: data[1] };
    }
    return { alpha: 255, spilled: false };
  }
  let alpha = Math.round(((distance - innerBound) / CHROMA_KEY_CONFIG.hueFeather) * 255);
  let spilled = false;
  if (alpha <= 0) return { alpha: 0, spilled: false };
  if (g > r && g > b) {
    data[1] = Math.round(Math.max(r, b) * 255);
    spilled = true;
  }
  return { alpha, spilled, outGreen: data[1] };
}

function sampleEdgeMeanHue(pixels) {
  let sumCos = 0, sumSin = 0, samples = 0;
  for (const [r8, g8, b8] of pixels) {
    const r = r8 / 255, g = g8 / 255, b = b8 / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const delta = max - min;
    if (max === 0 || max < 0.06 || delta / max < 0.15) continue;
    const hue = computeHue(r, g, b, max, delta);
    if (hue < 70 || hue > 170) continue;
    const radians = (hue * Math.PI) / 180;
    sumCos += Math.cos(radians);
    sumSin += Math.sin(radians);
    samples++;
  }
  if (samples < 10) return null;
  let mean = (Math.atan2(sumSin, sumCos) * 180) / Math.PI;
  if (mean < 0) mean += 360;
  return mean;
}

let failures = 0;
function check(name, condition, details) {
  if (condition) console.log(`PASS  ${name}`);
  else { failures++; console.log(`FAIL  ${name} ${details || ''}`); }
}

// 1. Pure green #00FF00 with sampled key 120 → transparent
check('pure #00FF00 -> alpha 0', keyPixel(0, 255, 0, 120).alpha === 0);
// 2. Slightly different greens (shades) -> removed
check('dark green  #0A6E1E -> alpha 0', keyPixel(10, 110, 30, 120).alpha === 0);
check('yellow-green #55C22D -> alpha 0', keyPixel(85, 194, 45, 120).alpha === 0);
check('deep green #0E7F2A -> alpha 0', keyPixel(14, 127, 42, 120).alpha === 0);
// 3. Video-like real green screen shades
check('camcorder green #23B14D -> alpha 0', keyPixel(35, 177, 77, 120).alpha === 0);
check('dim green #12300F -> alpha 0', keyPixel(18, 48, 15, 120).alpha === 0);
// 4. Book/neutral pixels survive
check('white page #F5F1E8 stays', keyPixel(245, 241, 232, 120).alpha === 255);
check('red cover #B03A2E stays', keyPixel(176, 58, 46, 120).alpha === 255);
check('blue accent #2E5FB0 stays', keyPixel(46, 95, 176, 120).alpha === 255);
check('near-black spine #0D0D0C stays', keyPixel(13, 13, 12, 120).alpha === 255);
check('beige paper #E8DFC8 stays', keyPixel(232, 223, 200, 120).alpha === 255);
// 5. Feather band produces intermediate alpha + spill suppression.
//    (90,205,148) is hue 150 -> distance 30 -> inside the 20..44 feather band.
const edgePixel = keyPixel(90, 205, 148, 120);
check('feather band alpha is partial', edgePixel.alpha > 0 && edgePixel.alpha < 255, JSON.stringify(edgePixel));
check('feather band spill suppressed', edgePixel.spilled === true && edgePixel.outGreen <= Math.round(Math.max(90, 148)), JSON.stringify(edgePixel));
// 5b. Teal-shifted edge green (hue ~83.5, distance ~36.5) must be softened, not kept opaque.
const tealEdge = keyPixel(14, 127, 83, 120);
check('teal-shifted edge green is feathered', tealEdge.alpha > 0 && tealEdge.alpha < 255, JSON.stringify(tealEdge));
check('teal-shifted edge green spill suppressed', tealEdge.spilled === true, JSON.stringify(tealEdge));
// 5c. Hair/screen blend pixels keep their opacity but lose the green cast.
//     (140,150,20): hue ~64.6 -> distance ~55 -> inside the despill zone (44..74).
const hairBlendInside = keyPixel(140, 150, 20, 120);
check('hair blend in despill zone stays opaque', hairBlendInside.alpha === 255, JSON.stringify(hairBlendInside));
check('hair blend in despill zone despilled', hairBlendInside.spilled === true && hairBlendInside.outGreen <= Math.round(Math.max(140, 20)), JSON.stringify(hairBlendInside));
//     (150,170,90): hue ~75 -> distance ~45 -> despill zone.
const hairBlendOutside = keyPixel(150, 170, 90, 120);
check('hair blend 2 stays opaque', hairBlendOutside.alpha === 255, JSON.stringify(hairBlendOutside));
check('hair blend 2 despilled', hairBlendOutside.spilled === true && hairBlendOutside.outGreen <= Math.round(Math.max(150, 90)), JSON.stringify(hairBlendOutside));
// 5d. Warm foreground well beyond the despill zone must never be recolored.
const warmHair = keyPixel(139, 94, 60, 120); // brown hair hue ~35 -> distance ~85 -> untouched
check('warm hair far outside despill untouched', warmHair.alpha === 255 && warmHair.spilled === false, JSON.stringify(warmHair));
// 6. Complementary side of the hue circle must NOT be treated as close
check('magenta far from green stays', keyPixel(200, 40, 160, 120).alpha === 255);
// 7. Hue-distance wrap-around
check('wrap: hue 355 vs key 120 handled', hueDistanceTo(355, 120) === 125);
check('wrap: hue 5 vs key 355 = 10', hueDistanceTo(5, 355) === 10);
// 8. Edge sampling: mixed green shades converge near the true key hue
const sampled = sampleEdgeMeanHue([
  [0, 255, 0], [10, 110, 30], [35, 177, 77], [14, 127, 83],
  [85, 194, 45], [18, 48, 15], [0, 230, 20], [30, 160, 60],
  [60, 200, 70], [24, 140, 40]
]);
check('sampled key hue close to 120', sampled !== null && Math.abs(sampled - 120) < 12, `sampled=${sampled}`);
// 9. Non-green edges (e.g. book touching frame edge) -> sampling not trusted -> fallback kept
const sampledBook = sampleEdgeMeanHue([
  [245, 241, 232], [176, 58, 46], [232, 223, 200], [13, 13, 12], [46, 95, 176]
]);
check('book-only edges -> no trusted sample', sampledBook === null, `sampled=${sampledBook}`);

console.log(failures === 0 ? '\nALL CHROMA MATH TESTS PASSED' : `\n${failures} TEST(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);