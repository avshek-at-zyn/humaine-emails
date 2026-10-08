// QA renders with sample data: fills every {{merge_tag}} from samples.json, then screenshots
// desktop (640) and mobile (390) full pages and builds contact sheets of the mobile renders.
// Flags horizontal overflow, missing images, unfilled tags, an Ask prompt that wraps and a one-word last headline line.
//
//   node review.mjs [outDir] [stem-prefixes...]     e.g. node review.mjs /tmp/qa 27 28 29
//   -> <outDir>/<stem>.desktop.png, <stem>.mobile.png, sheet-<n>.png (4 mobile renders per sheet, top 1800px)

import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PROD = 'https://humaine-email.vercel.app/';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TYPES = { '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.html': 'text/html' };

const outDir = path.resolve(process.argv[2] || path.join(ROOT, 'tools/.shots/review'));
const picks = process.argv.slice(3);
fs.mkdirSync(outDir, { recursive: true });
const samples = JSON.parse(fs.readFileSync(path.join(ROOT, 'samples.json'), 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const files = fs.readdirSync(ROOT).filter(f => /^\d\d-.*\.html$/.test(f)).sort()
  .filter(f => !picks.length || picks.some(p => f.startsWith(p)));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--hide-scrollbars'] });
const mobiles = [];
try {
  for (const file of files) {
    const stem = path.basename(file, '.html');
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k) => k in samples ? esc(samples[k]) : m);
    const left = [...new Set(html.match(/\{\{\s*\w+\s*\}\}/g) || [])];
    for (const [label, width] of [['desktop', 640], ['mobile', 390]]) {
      const page = await browser.newPage();
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      await page.setRequestInterception(true);
      const missing = [];
      page.on('request', req => {
        const url = req.url();
        if (url.startsWith(PROD)) {
          const local = path.join(ROOT, decodeURIComponent(url.slice(PROD.length).split('?')[0]));
          if (fs.existsSync(local)) return req.respond({ status: 200, contentType: TYPES[path.extname(local)] || 'application/octet-stream', body: fs.readFileSync(local) });
          missing.push(url);
          return req.respond({ status: 404, body: 'missing' });
        }
        req.continue();
      });
      await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      // Ask humAIne prompt should sit on one line; the headline's last line shouldn't be a single word.
      const fit = await page.evaluate(() => {
        const label = [...document.querySelectorAll('p')].find(p => p.textContent.trim() === 'Ask humAIne');
        const a = label && label.parentElement.querySelector('a');
        const askWraps = a ? a.getClientRects().length > 1 : false;
        const h1 = document.querySelector('h1');
        let orphan = false;
        if (h1) {
          const words = [];
          const walk = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
          for (let n; (n = walk.nextNode());) {
            let off = 0;
            for (const part of n.textContent.split(/(\s+)/)) {
              if (part.trim()) { const r = document.createRange(); r.setStart(n, off); r.setEnd(n, off + part.length); words.push(Math.round(r.getBoundingClientRect().top)); }
              off += part.length;
            }
          }
          const last = Math.max(...words);
          orphan = new Set(words).size > 1 && words.filter(t => Math.abs(t - last) < 4).length === 1;
        }
        return { askWraps, orphan };
      });
      const out = path.join(outDir, `${stem}.${label}.png`);
      await page.screenshot({ path: out, fullPage: true });
      if (label === 'mobile') mobiles.push(out);
      const notes = [missing.length && `MISSING ${missing.join(', ')}`, overflow > 0 && `OVERFLOW +${overflow}px`, left.length && label === 'desktop' && `UNFILLED ${left.join(' ')}`,
        fit.askWraps && 'ASK PROMPT WRAPS', fit.orphan && 'HEADLINE ORPHAN'].filter(Boolean);
      console.log(`${stem} ${label}${notes.length ? '  ' + notes.join('  ') : ''}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}

// Contact sheets: 4 mobile renders side by side, top 1800px each, labelled.
const CELL_W = 390, CELL_H = 1800, GAP = 24, LABEL = 40;
for (let i = 0; i < mobiles.length; i += 4) {
  const group = mobiles.slice(i, i + 4);
  const W = group.length * CELL_W + (group.length + 1) * GAP, H = CELL_H + LABEL + GAP * 2;
  const layers = [];
  for (const [j, file] of group.entries()) {
    const meta = await sharp(file).metadata();
    const img = await sharp(file).extract({ left: 0, top: 0, width: Math.min(CELL_W, meta.width), height: Math.min(CELL_H, meta.height) }).toBuffer();
    const x = GAP + j * (CELL_W + GAP);
    const name = path.basename(file, '.mobile.png');
    const svg = `<svg width="${CELL_W}" height="${LABEL}" xmlns="http://www.w3.org/2000/svg"><text x="0" y="26" font-family="Helvetica" font-size="20" font-weight="700" fill="#C4B5FD">${name}</text><text x="${CELL_W}" y="26" text-anchor="end" font-family="Helvetica" font-size="15" fill="#7D7F8F">${meta.height}px</text></svg>`;
    layers.push({ input: Buffer.from(svg), left: x, top: GAP }, { input: img, left: x, top: GAP + LABEL });
  }
  const out = path.join(outDir, `sheet-${String(i / 4 + 1).padStart(2, '0')}.png`);
  await sharp({ create: { width: W, height: H, channels: 3, background: '#1A1B24' } }).composite(layers).png().toFile(out);
  console.log(out);
}
