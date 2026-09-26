/*
 * Produces the web versions of the worksite photographs from the PNG masters.
 * Applies the treatment in assets/photos/USAGE.md: a slightly cooler white balance and
 * about 12 per cent less saturation in high-visibility yellow and green, leaving skin,
 * timber and concrete alone. Next.js then serves AVIF/WebP at responsive widths.
 *
 * Run with: npm run photos
 */
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('assets/photos');
const masters = path.join(dir, 'masters');

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Weight between 0 and 1 for how "high-visibility" a pixel is: saturated yellow to lime. */
function hiVisWeight(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0 || max === min) return 0;
  const sat = (max - min) / max;
  let hue;
  if (max === r) hue = 60 * (((g - b) / (max - min)) % 6);
  else if (max === g) hue = 60 * ((b - r) / (max - min) + 2);
  else hue = 60 * ((r - g) / (max - min) + 4);
  if (hue < 0) hue += 360;
  const hueMask = smooth(42, 52, hue) * (1 - smooth(95, 110, hue));
  return hueMask * smooth(0.3, 0.5, sat);
}

for (const file of (await readdir(masters)).filter((f) => f.endsWith('.png'))) {
  const { data, info } = await sharp(path.join(masters, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    let r = data[i] * 0.985;
    const g = data[i + 1];
    let b = Math.min(255, data[i + 2] * 1.02);
    const k = 1 - 0.12 * hiVisWeight(r, g, b);
    if (k < 1) {
      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      data[i + 1] = Math.round(l + (g - l) * k);
      r = l + (r - l) * k;
      b = l + (b - l) * k;
    }
    data[i] = Math.round(r);
    data[i + 2] = Math.round(b);
  }
  const out = path.join(dir, file.replace(/\.png$/, '.jpg'));
  await sharp(data, { raw: info }).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
  console.log('graded', path.relative(process.cwd(), out));
}
