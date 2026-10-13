# humAIne emails — the Modern version (Zyn Global website language)

Abhishek loves the hand-made set (now called **Creative**, in the repo root) and wants a second version, **Modern**, in the design
language of the new Zyn Global website, https://zynglobal.vercel.app. The viewer toggles between them. Modern files live in `modern/`
with the SAME file names, subjects, preheaders, copy facts and merge tags as their Creative twins. Only the design differs.

## Goldens — read these in full first
- `modern/02-security-alert.html` + `tools/collage/m-02-security-alert.html` — dawn hero, numbered record card, three numbered columns, finale.
- `modern/28-payment-receipt.html` + `tools/collage/m-28-payment-receipt.html` — no hero; a bento "mission card" with a gradient figure and
  the clay icon, a numbered record card, two numbered columns.
- `modern/40-weekly-briefing.html` + `tools/collage/m-40-weekly-briefing.html` — contents bento card, stories as numbered blocks.
- Shared marks: `tools/collage/m-00-shared.html` → `img/modern/marks/` (wordmark.png, dot.png pink, dot-green/coral/violet.png, arrow.png, rule.png).
- The kit's `K.dawn(...)` in `tools/collage/kit.js` (the site's planet-limb horizon with a rising sun) and `K.finish(stage, {canvas:'#06080F'})`.
- Your email's Creative twin (repo root `<stem>.html`) for the copy, merge tags, footer wording and the signature idea.

## The website's language (what makes it Modern)
- Canvas `#06080F`. Ink `#F5F0FA`; secondary ink `#B2AFB8`; muted `#87858E`; legal `#57575F`; dim headline tail `#6A6972`;
  kicker `#91829A`; violet kicker/numbers `#DFB6EC`; links `#EED3F6`; hairlines `#2B2834` (strong) / `#1D1C26` (soft).
- Headlines: Hahmlet **400** (light), 50px / 1.02 / letter-spacing -1.8px, left-aligned; mobile 40px. Two-tone: the main phrase in ink
  and the tail in dim `#6A6972` (the site's "Bold enough *to be different.*"), OR one key word in the gradient accent (`<span class="acc"
  style="color:#E6CFF5;">…</span>` — solid lilac fallback, gradient only where `@supports background-clip:text`). One device per email.
  Headlines end with a full stop, like the site (lint allows it in Modern).
- Body and UI: Helvetica Neue (system font, no web font). Lede 17px/1.62 `#B2AFB8`, max-width ~460px.
- Kickers: Helvetica Neue 700, 10.5–11px, uppercase, letter-spacing 2–2.4px. Never uppercase the brand: write `hum<span>AI</span>ne`.
- Eyebrow pill above the headline: hairline pill, glowing dot (pink info/release, green success, coral alert, violet neutral), uppercase text.
- Buttons: fully rounded pills. Primary = gradient `#768AFF → #FA81D6` (solid `#9A86EC` fallback, VML roundrect arcsize 50%), 52px tall,
  15px bold, label + "&nbsp;&nbsp;&rarr;" (or &darr; for downloads). Optional ghost pill (1.5px `#725F7E` border) ONLY for a link the
  email already has. On mobile the ghost wraps under with no left margin (see goldens' `.btn2`).
- Cards ("pillars"): `#0D0F16` with gradient `#101219 → #090B12`, 1px `#1D1C26`, radius 24px, padding 26–28px. Violet kicker inside.
- Numbered rows inside a card: `01`/`02`/`03` in violet, an uppercase label, the value in Hahmlet 22px; soft hairlines between rows.
- Numbered columns (the site's "We believe" grid): 2 or 3 columns, each with a top hairline, "01 &nbsp;LABEL" kicker, bold lead + body;
  `.col` stacks them on mobile.
- Big figures: Hahmlet 400, 44–56px, letter-spacing -1.4px, in the gradient accent.
- Finale: centred — a fading rule, "ASK hum<span>AI</span>ne" kicker, the prompt as a 34px serif line with the accent on its key word,
  and the hairline "Open the chat" pill with the gradient arrow disc. Emails without an Ask card (24, 25, 36) close with a centred
  one-line statement in the same style instead (no chat link).
- Footer: copy the goldens (lockup + tagline left, uppercase links right, legal paragraph, the outlined ZYN GLOBAL wordmark image,
  "© … humAIne is a Zyn Global product." / "Intelligence Evolved"). Keep THIS email's own links and legal wording from its Creative twin.
- Nothing hand-made: no handwriting, marker marks, paper, tape, stamps, die-cut stickers, tilt or grain overlays in Modern.

## Translating the Creative signature blocks
| Creative | Modern |
|----------|--------|
| Torn paper receipt / credit note / record slip / code sheet / document / clipping / notice | Bento card (kicker + big gradient figure or serif title + meta) and/or a numbered record card |
| Ticket, pass, coupon (perforated) | One card split by a soft hairline: the main value above, 2–3 small meta columns below |
| Ink stamp | The eyebrow pill's dot + text, or the card kicker ("Receipt · paid") |
| Notepad page, checklist, to-do | Numbered columns or numbered rows |
| Calendar page | A card with the day huge in Hahmlet (accent) and month + year dim beside or under it |
| Before → after with a strike | Old value in dim `#6A6972` (line-through ok) → violet "&rarr;" → new value in ink, inside a card |
| Ringed or underlined figure | Big figure in the gradient accent |
| App notification row | Numbered record card |
| Hand-drawn timeline | Numbered rows labelled Done / Now / Next (current step in ink + accent, future steps dim) |
| Status ribbon (15, 25, 36) | Keep a full-width band under the masthead pill: `#0B0D14`, hairline `#2B2834`, a coral/green dot image + uppercase text |
| Zine | Numbered story blocks (as 40) |

## Artwork (one per email)
About half the emails get a **dawn hero** (`tools/collage/m-<stem>.html` → `img/modern/hero/<stem>.jpg`, 600 wide, 240–300 tall): stars,
optionally the big faint dark planet, `K.dawn` across the bottom 150px, and the email's clay icon rising over the horizon with the sun
behind it. Vary it: sun position (`sunX` 300–1140 in the 1440 frame), icon position and size (120–170px), planet or no planet. The other
half get a **bento icon** (`img/modern/marks/<nn>-icon.png`, the clay icon on a soft violet glow, transparent, 180×180 box — copy
`m-28`) inside a mission card. Use the same clay icon as the Creative twin (its collage page `tools/collage/<stem>.html` names it).
Neighbours alternate. Render only your own pages: `cd tools && node collage.mjs m-13 m-14`.

## Rules
- Same merge tags as the Creative twin, exactly (lint checks it). Same subject line. Same preheader. Facts and copy from the Creative twin;
  re-arrange and trim to fit (keep the "Button not working? Paste this link:" fallback for every button, and the footer wording).
- Email-safe only: tables, inline styles, no `position`/`transform`/flex/negative margins/`<script>`. Background images are progressive.
- Copy rules still apply (`tools/briefs/zyn-vibe.md`): British English, no chatbot phrases, at most one em dash, no exclamation marks.

## Verify
1. `cd tools && node collage.mjs m-<nn> …` then `node review.mjs --modern <scratch dir> <nn> …` → zero flags; read every desktop and mobile PNG.
2. `python3 lint.py --modern <nn> …` → 0 errors, 0 warnings.
3. Self-check against the website: would this email sit naturally next to zynglobal.vercel.app? Calm, editorial, a lot of air, light serif.

## Files you may write
`modern/<stem>.html`, `tools/collage/m-<stem>.html`, `img/modern/hero/<stem>.jpg`, `img/modern/marks/<nn>-*.png`. Nothing else
(not the kit, shared pages, tools, samples.json, index.html, README, briefs, Creative files or other agents' files). Never commit or push.

## Report
Per email: artwork (dawn / bento), signature block, headline device (dim tail / accent word), anything unresolved.
