// Builds the mark and lockup SVGs with every letter as an outline, so they
// look the same without the font installed. Geometry matches the site's mark
// (mruspace/website, src/components/MarkSvg.astro): a 100-unit box, ring r34,
// orbit 30 x 14 at -22 degrees, an M set in Jost 500 at 16 units.
// Run `npm run build`, then `scripts/png.sh` for the PNGs.
import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';
import colors from '../colors.json' with { type: 'json' };

const buf = readFileSync(new URL('../fonts/jost-500.ttf', import.meta.url));
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const r = (n) => Math.round(n * 1000) / 1000;

/** Outline of `text` at `size`, centred on x = cx, with its baseline at `y`. */
function centred(text, size, cx, y) {
  const w = font.getAdvanceWidth(text, size);
  return font.getPath(text, cx - w / 2, y, size).toPathData(3);
}

// The mark: the M baseline sits at 55.6, as on the site.
const markBody = (ink) => `
  <circle cx="50" cy="50" r="34" fill="none" stroke="${ink}" stroke-width="2.4"/>
  <ellipse cx="50" cy="50" rx="30" ry="14" fill="none" stroke="${ink}" stroke-width="1.4" transform="rotate(-22 50 50)"/>
  <path fill="${ink}" d="${centred('M', 16, 50, 55.6)}"/>`;

// The lockup, as in the site header: a 43 px mark, a 10 px gap and "Mru" at
// 24 px, centred on the mark. In mark units, 1 px = 100 / 43.
const px = 100 / 43;
const size = 24 * px;
const gap = 10 * px;
const word = 'Mru';
const width = font.getAdvanceWidth(word, size);
const bb = font.getPath(word, 0, 0, size).getBoundingBox();
// Centre the capital height on the mark's centre line.
const cap = (font.tables.os2.sCapHeight / font.unitsPerEm) * size;
const baseline = 50 + cap / 2;
const wordX = 100 + gap;
// Trim the lockup to the ring's outer edge and the end of the word.
const edge = 50 - 34 - 1.2;
const lockW = r(wordX + bb.x2 - edge);
const lockH = r(100 - 2 * edge);
const wordPath = font.getPath(word, wordX, baseline, size).toPathData(3);

const svg = (box, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.join(' ')}" width="${r(box[2] * 4)}" height="${r(box[3] * 4)}" role="img" aria-label="${label}">${body}
</svg>
`;

for (const [name, ink] of [
  ['light', colors.light.ink],
  ['dark', colors.dark.ink],
]) {
  // "light" art is for light backgrounds (dark ink), "dark" art for dark ones.
  writeFileSync(new URL(`../mark/mru-mark-on-${name}.svg`, import.meta.url), svg([0, 0, 100, 100], markBody(ink), 'Mru mark'));
  writeFileSync(
    new URL(`../lockup/mru-lockup-on-${name}.svg`, import.meta.url),
    svg([r(edge), r(edge), lockW, lockH], `${markBody(ink)}\n  <path fill="${ink}" d="${wordPath}"/>`, 'Mru'),
  );
}
console.log(`mark and lockup written (lockup ${lockW} x ${lockH}, word ${r(width)} wide)`);
