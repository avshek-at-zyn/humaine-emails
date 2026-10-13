// Collage kit: seeded hand-drawn marks (wobbly orbits, arrows, marker swashes, circles, stars, grain).
// Pages call K.init(seed), draw with K.*, then set window.KIT_READY = true (K.done()).
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  let R = Math.random;
  const K = {};
  K.init = seed => {
    let s = (seed * 2654435761) >>> 0 || 1;
    R = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
    defs();
  };
  const rand = (a, b) => a + (b - a) * R();
  const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const noise = (n = 4, amp = 1) => { const c = [...Array(n)].map((_, i) => ({ a: R() / (i + 1), f: i + 1, p: R() * 6.283 })); return t => amp * c.reduce((s, q) => s + q.a * Math.sin(q.f * t + q.p), 0); };

  // Catmull-Rom through points -> cubic Bezier path
  const path = (pts, closed) => {
    if (pts.length < 2) return '';
    const P = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${P[1][0].toFixed(1)},${P[1][1].toFixed(1)}`;
    for (let i = 1; i < P.length - 2; i++) {
      const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };

  let gid = 0;
  function defs() {
    if (document.getElementById('kit-defs')) return;
    const svg = el('svg', { id: 'kit-defs', width: 0, height: 0, style: 'position:absolute;width:0;height:0' }, document.body);
    const d = el('defs', {}, svg);
    // dry marker: rough edges + a few skips
    d.insertAdjacentHTML('beforeend', `
      <filter id="marker" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/>
        <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="9" result="n2"/>
        <feColorMatrix in="n2" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.5 0 0 0 1.62" result="holes"/>
        <feComposite in="d" in2="holes" operator="in"/>
      </filter>
      <filter id="ink" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="2" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" result="d"/>
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="n2"/>
        <feColorMatrix in="n2" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -2.6 0 0 0 2.05" result="holes"/>
        <feComposite in="d" in2="holes" operator="in"/>
      </filter>
      <filter id="diecut" x="-20%" y="-20%" width="140%" height="140%">
        <feComponentTransfer in="SourceAlpha" result="solid"><feFuncA type="discrete" tableValues="0 0 1 1 1"/></feComponentTransfer>
        <feMorphology in="solid" operator="dilate" radius="7" result="d"/>
        <feFlood flood-color="#F7F3FB"/><feComposite in2="d" operator="in" result="edge"/>
        <feGaussianBlur in="d" stdDeviation="6" result="sb"/><feOffset in="sb" dx="0" dy="8" result="so"/>
        <feFlood flood-color="#000" flood-opacity=".5"/><feComposite in2="so" operator="in" result="shadow"/>
        <feMerge><feMergeNode in="shadow"/><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>`);
  }

  const grad = (svg, stops, x1 = 0, y1 = 0, x2 = 1, y2 = 0) => {
    const id = 'kg' + (gid++);
    const g = el('linearGradient', { id, x1, y1, x2, y2, gradientUnits: 'objectBoundingBox' }, svg.querySelector('defs') || el('defs', {}, svg));
    stops.forEach((c, i) => el('stop', { offset: i / (stops.length - 1), 'stop-color': c }, g));
    return `url(#${id})`;
  };
  const paint = (svg, color) => Array.isArray(color) ? grad(svg, color) : color;

  // Wobbly hand-drawn ellipse (an orbit, a ring round a value). Two passes, like going round twice with a pen.
  K.ellipse = (svg, o) => {
    const { cx, cy, rx, ry, rot = 0, loops = 1.12, wobble = 0.035, width = 2.4, color = ['#B5B7F6', '#F9A8D4'], opacity = 0.9, passes = 2, front = null } = o;
    const g = el('g', { filter: 'url(#marker)', opacity }, svg);
    const stroke = paint(svg, color);
    for (let p = 0; p < passes; p++) {
      const n = noise(4, wobble), start = rand(0, 6.283), off = p ? rand(-0.03, 0.03) : 0;
      const pts = [];
      const steps = Math.round(72 * loops);
      for (let i = 0; i <= steps; i++) {
        const t = start + (i / steps) * 6.283 * loops;
        const s = 1 + n(t) + off + (i / steps) * (p ? 0.02 : -0.015);
        let x = rx * s * Math.cos(t), y = ry * s * Math.sin(t);
        const a = rot * Math.PI / 180;
        pts.push([cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a), Math.sin(t)]);
      }
      // optional: only draw the front half (y > 0 in orbit space) so an icon can sit "inside" the orbit
      let use = pts;
      if (front === 'back') use = pts.filter(q => q[2] < 0.05);
      el('path', { d: path(use.map(q => [q[0], q[1]])), fill: 'none', stroke, 'stroke-width': p ? width * 0.55 : width, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: p ? 0.55 : 1 }, g);
    }
    return g;
  };

  // Freehand line through points, optional arrowhead at the end.
  K.line = (svg, o) => {
    const { points, jitter = 1.6, width = 2.6, color = '#C4B5FD', arrow = false, head = 13, opacity = 1 } = o;
    const g = el('g', { filter: 'url(#marker)', opacity }, svg);
    const stroke = paint(svg, color);
    const dense = [];
    for (let i = 0; i < points.length - 1; i++) {
      const [a, b] = [points[i], points[i + 1]];
      const n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 14));
      for (let k = 0; k < n; k++) dense.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
    }
    dense.push(points[points.length - 1]);
    const nz = noise(3, jitter);
    const pts = dense.map((q, i) => [q[0] + nz(i * 0.7), q[1] + nz(i * 0.7 + 2)]);
    el('path', { d: path(pts), fill: 'none', stroke, 'stroke-width': width, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    if (arrow) {
      const [p1, p2] = [pts[pts.length - 3] || pts[0], pts[pts.length - 1]];
      const ang = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
      for (const side of [-1, 1]) {
        const a = ang + Math.PI + side * rand(0.42, 0.58);
        const l = head * rand(0.85, 1.15);
        const mid = [p2[0] + Math.cos(a) * l * 0.5 + rand(-1, 1), p2[1] + Math.sin(a) * l * 0.5 + rand(-1, 1)];
        el('path', { d: path([p2, mid, [p2[0] + Math.cos(a) * l, p2[1] + Math.sin(a) * l]]), fill: 'none', stroke: Array.isArray(color) ? color[color.length - 1] : color, 'stroke-width': width, 'stroke-linecap': 'round' }, g);
      }
    }
    return g;
  };

  // Tapered marker swash (underlines, highlights).
  K.swash = (svg, o) => {
    const { x, y, w, h = 9, curve = 3, tilt = -1.2, color = ['#8B7CF0', '#E879B9'], opacity = 0.95, hook = true } = o;
    const g = el('g', { filter: 'url(#marker)', opacity }, svg);
    const n = noise(3, 1), steps = 40, top = [], bot = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const cx = x + w * t, cy = y + Math.sin(t * Math.PI) * -curve + t * tilt * w / 40 + n(t * 6) * 0.8;
      const hw = h * (0.25 + 0.75 * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.15 + 0.02)), 0.5)) * (1 + 0.12 * n(t * 9 + 3)) / 2;
      top.push([cx, cy - hw]); bot.push([cx, cy + hw]);
    }
    let d = path(top) + ' L' + path(bot.reverse()).slice(1) + ' Z';
    el('path', { d, fill: paint(svg, color) }, g);
    if (hook) { // the little flick back at the end of a fast underline
      const ex = x + w, ey = y + tilt * w / 40;
      el('path', { d: path([[ex - 2, ey], [ex - w * 0.12, ey + h * 0.9], [ex - w * 0.32, ey + h * 1.25]]), fill: 'none', stroke: Array.isArray(color) ? color[color.length - 1] : color, 'stroke-width': h * 0.32, 'stroke-linecap': 'round' }, g);
    }
    return g;
  };

  // Star field + a few four-point sparkles.
  K.stars = (svg, o) => {
    const { w, h, count = 60, sparkles = 4, avoid = [] } = o;
    const g = el('g', {}, svg);
    const ok = (x, y) => avoid.every(([ax, ay, ar]) => Math.hypot(x - ax, y - ay) > ar);
    for (let i = 0; i < count; i++) {
      const x = rand(0, w), y = rand(0, h);
      if (!ok(x, y)) continue;
      el('circle', { cx: x, cy: y, r: rand(0.35, 1.15), fill: R() < 0.2 ? '#F9A8D4' : '#DCD8FF', opacity: rand(0.25, 0.85) }, g);
    }
    for (let i = 0; i < sparkles; i++) {
      const x = rand(20, w - 20), y = rand(20, h - 20), s = rand(3, 7);
      if (!ok(x, y)) continue;
      el('path', { d: `M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s}Z`, fill: '#EDE9FF', opacity: rand(0.5, 0.9) }, g);
    }
    return g;
  };

  // Scribbled doodles: asterisk / star / check / cross.
  K.doodle = (svg, o) => {
    const { kind = 'asterisk', x, y, s = 14, color = '#F9A8D4', width = 2.4 } = o;
    if (kind === 'asterisk') for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3 + rand(-0.2, 0.2); K.line(svg, { points: [[x - Math.cos(a) * s, y - Math.sin(a) * s], [x + Math.cos(a) * s, y + Math.sin(a) * s]], color, width, jitter: 0.6 }); }
    if (kind === 'check') K.line(svg, { points: [[x - s, y], [x - s * 0.35, y + s * 0.7], [x + s, y - s * 0.9]], color, width, jitter: 0.8 });
    if (kind === 'cross') { K.line(svg, { points: [[x - s, y - s], [x + s, y + s]], color, width, jitter: 0.8 }); K.line(svg, { points: [[x + s, y - s * 0.9], [x - s * 1.05, y + s]], color, width, jitter: 0.8 }); }
    if (kind === 'star') { const pts = []; for (let i = 0; i <= 5; i++) { const a = -Math.PI / 2 + i * 4 * Math.PI / 5; pts.push([x + Math.cos(a) * s * rand(0.9, 1.1), y + Math.sin(a) * s * rand(0.9, 1.1)]); } K.line(svg, { points: pts, color, width, jitter: 0.7 }); }
  };

  // Film grain over a stage (soft-light), and edge fades into the email canvas.
  K.finish = (stage, o = {}) => {
    const { grain = 0.22, top = 0.12, bottom = 0.26, sides = 0.07, canvas = '#090B14' } = o;
    const [cr, cg, cb] = [1, 3, 5].map(i => parseInt(canvas.slice(i, i + 2), 16)), clear = `rgba(${cr},${cg},${cb},0)`;
    const w = stage.offsetWidth, h = stage.offsetHeight;
    const svg = el('svg', { width: w, height: h, style: `left:0;top:0;mix-blend-mode:soft-light;opacity:${grain}` }, stage);
    el('rect', { width: w, height: h, filter: 'url(#grain)' }, svg);
    const fade = document.createElement('div');
    fade.style.cssText = `left:0;top:0;width:${w}px;height:${h}px;pointer-events:none;background:
      linear-gradient(to bottom, ${canvas} 0, ${clear} ${top * 100}%, ${clear} ${(1 - bottom) * 100}%, ${canvas} 100%),
      linear-gradient(to right, ${canvas} 0, ${clear} ${sides * 100}%, ${clear} ${(1 - sides) * 100}%, ${canvas} 100%);`;
    stage.appendChild(fade);
  };

  // Torn paper edge (top) and receipt teeth (bottom), filled with the paper colour.
  K.tornTop = (svg, o) => {
    const { w, h, y = h - 14, fill = '#EEE8F6', amp = 2.2 } = o;
    const pts = [[0, h], [0, y + rand(-amp, amp)]];
    for (let x = 6; x < w; x += rand(5, 11)) pts.push([x, y + rand(-amp, amp) + (R() < 0.08 ? rand(-5, -2) : 0)]);
    pts.push([w, y + rand(-amp, amp)], [w, h]);
    el('path', { d: 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z', fill }, svg);
  };
  K.teeth = (svg, o) => {
    const { w, h, fill = '#EEE8F6', size = 9 } = o;
    const pts = [[0, 0], [w, 0]];
    const n = Math.round(w / size);
    for (let i = n; i >= 0; i--) pts.push([i * w / n, i % 2 ? h - rand(0, 2) : h * 0.35 + rand(-1, 1)]);
    el('path', { d: 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z', fill }, svg);
  };

  K.tornBottom = (svg, o) => {
    const { w, h, y = 14, fill = '#EEE8F6', amp = 2.2 } = o;
    const pts = [[0, 0], [0, y + rand(-amp, amp)]];
    for (let x = 6; x < w; x += rand(5, 11)) pts.push([x, y + rand(-amp, amp) + (R() < 0.08 ? rand(2, 5) : 0)]);
    pts.push([w, y + rand(-amp, amp)], [w, 0]);
    el('path', { d: 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z', fill }, svg);
  };
  // Ticket perforation across a paper card: notches at both ends, a dashed tear line.
  K.perforation = (svg, o) => {
    const { w, h, fill = '#EEE8F6', canvas = '#090B14', line = '#B8AFD3', r = 10 } = o;
    el('rect', { x: 0, y: 0, width: w, height: h, fill }, svg);
    el('circle', { cx: 0, cy: h / 2, r, fill: canvas }, svg);
    el('circle', { cx: w, cy: h / 2, r, fill: canvas }, svg);
    el('line', { x1: r + 8, y1: h / 2, x2: w - r - 8, y2: h / 2, stroke: line, 'stroke-width': 1.6, 'stroke-dasharray': '5 6', 'stroke-linecap': 'round' }, svg);
  };

  // The Zyn Global "dawn": a planet's limb at the bottom of the frame with a warm sun rising behind it
  // (lifted from zynglobal.vercel.app's hero SVG). Coordinates are in a 1440x360 frame, scaled to fit.
  K.dawn = (parent, o = {}) => {
    const { w = 600, h = 240, sunX = 1010, sunY = 306, sunR = 150, limbCy = 1290, rx = 1560, ry = 1000, air = 0.34, id = 'd' + (gid++) } = o;
    parent.insertAdjacentHTML('beforeend', `<svg width="${w}" height="${h}" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" style="left:0;bottom:0;position:absolute">
      <defs>
        <linearGradient id="${id}l" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#BFD4FF" stop-opacity="0"/><stop offset=".5" stop-color="#F4F7FF" stop-opacity=".95"/><stop offset=".82" stop-color="#FFE9CC" stop-opacity=".9"/><stop offset="1" stop-color="#BFD4FF" stop-opacity="0"/></linearGradient>
        <radialGradient id="${id}s"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".1" stop-color="#FFF6E8" stop-opacity=".95"/><stop offset=".34" stop-color="#FFDDB0" stop-opacity=".28"/><stop offset="1" stop-color="#FFDDB0" stop-opacity="0"/></radialGradient>
        <filter id="${id}b" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
      </defs>
      <ellipse cx="720" cy="${limbCy}" rx="${rx}" ry="${ry}" fill="none" stroke="rgba(150,186,255,${air})" stroke-width="46" filter="url(#${id}b)"/>
      <circle cx="${sunX}" cy="${sunY}" r="${sunR}" fill="url(#${id}s)"/>
      <ellipse cx="720" cy="${limbCy}" rx="${rx}" ry="${ry}" fill="#04060C"/>
      <ellipse cx="720" cy="${limbCy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#${id}l)" stroke-width="1.6"/>
    </svg>`);
  };

  K.svg = (parent, w, h, style = 'left:0;top:0') => { const s = el('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}`, style }); el('defs', {}, s); parent.appendChild(s); return s; };
  K.done = () => document.fonts.ready.then(() => requestAnimationFrame(() => { window.KIT_READY = true; }));
  window.K = K;
})();
