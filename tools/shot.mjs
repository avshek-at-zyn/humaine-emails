// Headless screenshots of an email template, using the locally installed Chrome.
// Requests for https://humaine-email.vercel.app/* are served from this repo, so
// images render before they are deployed.
//
//   node shot.mjs 11-password-changed.html [outDir]
//   -> <outDir>/11-password-changed.desktop.png (640px wide, full page)
//      <outDir>/11-password-changed.mobile.png  (390px wide, full page)

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PROD = 'https://humaine-email.vercel.app/';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TYPES = { '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.html': 'text/html' };

const file = process.argv[2];
const outDir = path.resolve(process.argv[3] || path.join(ROOT, 'tools/.shots'));
if (!file) { console.error('usage: node shot.mjs <template.html> [outDir]'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--hide-scrollbars'] });
try {
  for (const [label, width] of [['desktop', 640], ['mobile', 390]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.setRequestInterception(true);
    page.on('request', req => {
      const url = req.url();
      if (url.startsWith(PROD)) {
        const local = path.join(ROOT, decodeURIComponent(url.slice(PROD.length).split('?')[0]));
        if (fs.existsSync(local)) {
          return req.respond({ status: 200, contentType: TYPES[path.extname(local)] || 'application/octet-stream', body: fs.readFileSync(local) });
        }
        return req.respond({ status: 404, body: 'missing: ' + local });
      }
      req.continue();
    });
    const missing = [];
    page.on('response', r => { if (r.status() >= 400) missing.push(`${r.status()} ${r.url()}`); });
    await page.goto('file://' + path.resolve(ROOT, file), { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(outDir, `${path.basename(file, '.html')}.${label}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log(out);
    if (missing.length) console.log('MISSING ASSETS:\n  ' + missing.join('\n  '));
    await page.close();
  }
} finally {
  await browser.close();
}
