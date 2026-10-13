// Renders hand-made collage pieces (heroes, handwritten notes, stamps, scribbles) from tools/collage/<name>.html.
// Each element with data-out="<path under img/>" is captured at 2x: .jpg for heroes, .png (transparent) for marks.
// Add data-exact to keep a PNG's colours exact (paper edges that must match an HTML background).
//
//   node collage.mjs                 # every page in tools/collage/
//   node collage.mjs 02 28           # pages whose name starts with these

import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'tools/collage');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const picks = process.argv.slice(2);
const pages = fs.readdirSync(DIR).filter(f => f.endsWith('.html')).sort().filter(f => !picks.length || picks.some(p => f.startsWith(p)));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--allow-file-access-from-files'] });
try {
  for (const file of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 2 });
    page.on('pageerror', e => console.log(`  ${file}: ${e.message}`));
    await page.goto('file://' + path.join(DIR, file), { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForFunction('window.KIT_READY === true', { timeout: 20000 });
    const outs = await page.$$('[data-out]');
    for (const handle of outs) {
      const [out, exact] = await handle.evaluate(n => [n.dataset.out, n.hasAttribute('data-exact')]);
      const dest = path.join(ROOT, 'img', out);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const jpg = out.endsWith('.jpg');
      const buf = await handle.screenshot({ omitBackground: !jpg, type: 'png' });
      if (jpg) await sharp(buf).flatten({ background: out.startsWith('modern/') ? '#06080F' : '#090B14' }).jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
      else await sharp(buf).png(exact ? { compressionLevel: 9 } : { compressionLevel: 9, palette: true, quality: 92, effort: 8 }).toFile(dest);
      const { width, height } = await sharp(dest).metadata();
      console.log(`${out}  ${width}x${height}  ${(fs.statSync(dest).size / 1024).toFixed(0)} KB`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
