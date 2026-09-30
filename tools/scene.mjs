// Hero-scene generator for the HumAIne emails.
//
// Composes a clay icon into a planetary starfield using the HumAIne app's own
// tokens (glows, planet shading, orbit rings), and fades every edge into the
// email canvas (#090B14) so the image blends into the page instead of sitting
// in a box.
//
//   cd tools && npm i && node scene.mjs            # all scenes
//   node scene.mjs 07-welcome 11-password-changed  # just these
//
// One scene per file in scenes/<name>.json. Output: ../img/hero/<name>.jpg at 2x.

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BG = '#090B14';

// Planet palettes, lifted from the app's CSS: radial-gradient(circle at 34% 30%, a, b 60%, c)
const PALETTES = {
  blue:  [['#CFD6FF', 1], ['#8B93E8', 1], ['#5B62B4', 1]],
  pink:  [['#F6D3EE', 1], ['#E08FD0', 1], ['#A8548F', 1]],
  cyan:  [['#DCFBFF', 1], ['#4FD6EA', 1], ['#2B8FA8', 1]],
  lilac: [['#F0D6F8', 1], ['#C48DD8', 1], ['#8E56A8', 1]],
  glass: [['#C7CAFF', 0.55], ['#607EFF', 0.22], ['#28326E', 0.12]],
  dark:  [['#2A2C37', 1], ['#16181F', 1], ['#0A0C1A', 1]],
};

function rng(seed) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

async function iconDataUri(file, size) {
  const abs = path.resolve(ROOT, file);
  const input = file.endsWith('.svg') ? sharp(abs, { density: 384 }) : sharp(abs);
  const buf = await input.resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return 'data:image/png;base64,' + buf.toString('base64');
}

function planetSvg(p, i) {
  const pal = PALETTES[p.type] || PALETTES.blue;
  const id = `pl${i}`;
  const { x, y, r } = p;
  const tilt = p.tilt ?? -18;
  const rx = r * (p.ringScale ?? 2.1), ry = r * 0.5;
  const ringStroke = p.type === 'dark' ? 'rgba(181,183,246,0.18)' : 'rgba(181,183,246,0.32)';
  const defs = `
    <radialGradient id="${id}" cx="34%" cy="30%" r="72%">
      <stop offset="0" stop-color="${pal[0][0]}" stop-opacity="${pal[0][1]}"/>
      <stop offset="0.6" stop-color="${pal[1][0]}" stop-opacity="${pal[1][1]}"/>
      <stop offset="1" stop-color="${pal[2][0]}" stop-opacity="${pal[2][1]}"/>
    </radialGradient>
    <radialGradient id="${id}s" cx="68%" cy="74%" r="70%">
      <stop offset="0" stop-color="#05060F" stop-opacity="0"/>
      <stop offset="0.55" stop-color="#05060F" stop-opacity="0"/>
      <stop offset="1" stop-color="#05060F" stop-opacity="0.5"/>
    </radialGradient>
    <radialGradient id="${id}a" cx="50%" cy="50%" r="50%">
      <stop offset="0.55" stop-color="${pal[1][0]}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${pal[1][0]}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="${id}f"><rect x="${x - rx - 6}" y="${y}" width="${2 * rx + 12}" height="${ry + 8}"/></clipPath>`;
  const ring = (clip) => p.ring ? `
    <g transform="rotate(${tilt} ${x} ${y})"${clip ? ` clip-path="url(#${id}f)"` : ''}>
      <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${ringStroke}" stroke-width="${Math.max(1.5, r / 16)}"/>
      <ellipse cx="${x}" cy="${y}" rx="${rx * 0.86}" ry="${ry * 0.8}" fill="none" stroke="${ringStroke}" stroke-opacity="0.55" stroke-width="${Math.max(1, r / 24)}"/>
    </g>` : '';
  const body = `
    <circle cx="${x}" cy="${y}" r="${r * 1.45}" fill="url(#${id}a)"/>
    ${ring(false)}
    <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}s)"/>
    <circle cx="${x}" cy="${y}" r="${r - 0.75}" fill="none" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="1.5"/>
    ${ring(true)}`;
  return { defs, body };
}

function starsSvg(W, H, rand, count, avoid) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const x = rand() * W, y = rand() * H * 0.9;
    if (avoid && Math.hypot(x - avoid.x, y - avoid.y) < avoid.r) continue;
    const big = rand() < 0.1;
    const r = big ? 1.6 + rand() * 1.1 : 0.6 + rand() * 1.0;
    const o = big ? 0.55 + rand() * 0.35 : 0.12 + rand() * 0.45;
    const c = rand() < 0.14 ? '#C4B5FD' : '#FFFFFF';
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${c}" fill-opacity="${o.toFixed(2)}"/>`;
  }
  return out;
}

function sparkle(x, y, s, color = '#E9E2FF', o = 0.9) {
  const p = `M${x} ${y - s} C${x + s * 0.12} ${y - s * 0.12} ${x + s * 0.12} ${y - s * 0.12} ${x + s} ${y} C${x + s * 0.12} ${y + s * 0.12} ${x + s * 0.12} ${y + s * 0.12} ${x} ${y + s} C${x - s * 0.12} ${y + s * 0.12} ${x - s * 0.12} ${y + s * 0.12} ${x - s} ${y} C${x - s * 0.12} ${y - s * 0.12} ${x - s * 0.12} ${y - s * 0.12} ${x} ${y - s}Z`;
  return `<circle cx="${x}" cy="${y}" r="${s * 1.4}" fill="url(#spkglow)"/><path d="${p}" fill="${color}" fill-opacity="${o}"/>`;
}

async function renderScene(sc) {
  const W = 1200, H = sc.height ?? 600;
  const rand = rng(sc.seed ?? 7);
  const icon = sc.icon ? { size: sc.iconSize ?? 300, x: sc.iconX ?? W / 2, y: sc.iconY ?? H * 0.49 } : null;

  const planets = (sc.planets || []).map(planetSvg);
  const iconHref = icon ? await iconDataUri(sc.icon, icon.size) : null;
  const extras = [];
  for (const layer of sc.layers || []) {
    const href = await iconDataUri(layer.src, layer.size);
    extras.push(`<image x="${layer.x - layer.size / 2}" y="${layer.y - layer.size / 2}" width="${layer.size}" height="${layer.size}" href="${href}" opacity="${layer.opacity ?? 1}"/>`);
  }

  const glowX = icon ? icon.x : W / 2, glowY = icon ? icon.y : H * 0.45;
  const glowR = sc.glowRadius ?? (icon ? icon.size * 1.15 : 320);
  const orbit = sc.orbit && icon ? (() => {
    const rx = icon.size * (sc.orbit.scale ?? 1.28), ry = icon.size * 0.34;
    const tilt = sc.orbit.tilt ?? -10;
    const t = (sc.orbit.moonAt ?? 0.18) * Math.PI * 2;
    const mx = icon.x + rx * Math.cos(t), my = icon.y + ry * Math.sin(t);
    const moon = sc.orbit.moon ? planetSvg({ type: sc.orbit.moon, x: 0, y: 0, r: sc.orbit.moonR ?? 9 }, 'm') : null;
    return {
      back: `<g transform="rotate(${tilt} ${icon.x} ${icon.y})"><ellipse cx="${icon.x}" cy="${icon.y}" rx="${rx}" ry="${ry}" fill="none" stroke="rgba(181,183,246,0.16)" stroke-width="1.6"/></g>`,
      moonDefs: moon ? moon.defs : '',
      moon: moon ? `<g transform="rotate(${tilt} ${icon.x} ${icon.y}) translate(${mx} ${my})">${moon.body}</g>` : '',
    };
  })() : null;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="topband" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#A78BFA" stop-opacity="0.16"/>
      <stop offset="0.12" stop-color="#9B7DFF" stop-opacity="0.09"/>
      <stop offset="0.25" stop-color="#7C3AED" stop-opacity="0.045"/>
      <stop offset="0.45" stop-color="#7C3AED" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="topglow" cx="50%" cy="0%" r="60%">
      <stop offset="0" stop-color="#C4B5FD" stop-opacity="0.34"/>
      <stop offset="0.7" stop-color="#C4B5FD" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="iconglow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#5C72F5" stop-opacity="0.45"/>
      <stop offset="0.4" stop-color="#5264DC" stop-opacity="0.20"/>
      <stop offset="0.7" stop-color="#5264DC" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="violetglow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#633CDC" stop-opacity="0.42"/>
      <stop offset="0.5" stop-color="#8B5CF6" stop-opacity="0.12"/>
      <stop offset="0.75" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="pinkglow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#FA81D6" stop-opacity="0.16"/>
      <stop offset="0.7" stop-color="#FA81D6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="spkglow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#C4B5FD" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#C4B5FD" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeB" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="fadeT" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BG}" stop-opacity="1"/>
      <stop offset="0.25" stop-color="${BG}" stop-opacity="0.8"/>
      <stop offset="0.6" stop-color="${BG}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeX" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${BG}" stop-opacity="1"/>
      <stop offset="0.1" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="0.9" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="shoot" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#D6DCFF" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#D6DCFF" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#D6DCFF" stop-opacity="0"/>
    </linearGradient>
    ${planets.map(p => p.defs).join('')}
    ${orbit ? orbit.moonDefs : ''}
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#topband)"/>
  <ellipse cx="${W / 2}" cy="0" rx="${W * 0.62}" ry="${H * 0.55}" fill="url(#topglow)"/>
  ${sc.pinkGlow ? `<circle cx="${sc.pinkGlow.x}" cy="${sc.pinkGlow.y}" r="${sc.pinkGlow.r ?? 260}" fill="url(#pinkglow)"/>` : ''}
  ${starsSvg(W, H, rand, sc.stars ?? 110, icon ? { x: icon.x, y: icon.y, r: icon.size * 0.55 } : null)}
  ${(sc.sparkles || []).map(s => sparkle(s[0], s[1], s[2] ?? 7)).join('')}
  ${sc.shootingStar ? `<g transform="rotate(${sc.shootingStar.angle ?? -16} ${sc.shootingStar.x} ${sc.shootingStar.y})"><rect x="${sc.shootingStar.x - (sc.shootingStar.len ?? 160) / 2}" y="${sc.shootingStar.y - 1}" width="${sc.shootingStar.len ?? 160}" height="2" fill="url(#shoot)"/></g>` : ''}
  <circle cx="${glowX}" cy="${glowY}" r="${glowR}" fill="url(#violetglow)"/>
  <circle cx="${glowX}" cy="${glowY}" r="${glowR * 0.85}" fill="url(#iconglow)"/>
  ${planets.map(p => p.body).join('')}
  ${orbit ? orbit.back : ''}
  ${extras.join('')}
  ${icon ? `<image x="${icon.x - icon.size / 2}" y="${icon.y - icon.size / 2}" width="${icon.size}" height="${icon.size}" href="${iconHref}"/>` : ''}
  ${orbit ? orbit.moon : ''}
  <rect width="${W}" height="${H * 0.36}" fill="url(#fadeT)"/>
  <rect y="${H * (sc.fadeFrom ?? 0.72)}" width="${W}" height="${H * (1 - (sc.fadeFrom ?? 0.72)) + 1}" fill="url(#fadeB)"/>
  <rect width="${W}" height="${H}" fill="url(#fadeX)"/>
</svg>`;

  const out = path.join(ROOT, 'img/hero', `${sc.name}.jpg`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (process.env.KEEP_SVG) fs.writeFileSync(out.replace(/\.jpg$/, '.svg'), svg);
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(out);
  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`${sc.name}.jpg  ${W}x${H}  ${kb} KB`);
}

const sceneDir = path.join(import.meta.dirname, 'scenes');
const scenes = fs.readdirSync(sceneDir).filter(f => f.endsWith('.json')).sort()
  .map(f => JSON.parse(fs.readFileSync(path.join(sceneDir, f), 'utf8')));
const only = process.argv.slice(2);
for (const sc of scenes) {
  if (only.length && !only.includes(sc.name)) continue;
  await renderScene(sc);
}
