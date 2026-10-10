# humAIne emails — the hand-made system ("margin notes")

Direction from Abhishek: the earlier set felt "generic and AI generated". Make it **expressive and imperfect**, **keep it centred**,
and "the new receipt tear style rocks". So: precise app data, with a human hand drawn over it. Same app canvas, palette, fonts and
clay icons; new texture: handwritten margin notes, marker underlines, hand-drawn rings and arrows, ink stamps, torn paper, tape,
die-cut stickers, monospace logs.

## Goldens — read all of these first, in full
- `02-security-alert.html` + `tools/collage/02-security-alert.html` — collage hero, mono kicker, swash under a phrase, mono log with a
  value ringed by hand, handwritten pointer down to a centred auto-width button, chat-bubble Ask, centred footer under a hand-drawn rule.
- `28-payment-receipt.html` + `tools/collage/28-payment-receipt.html` — die-cut clay sticker instead of a hero scene, the torn, taped,
  stamped paper receipt (the move Abhishek loves), ink note on paper.
- `40-weekly-briefing.html` + `tools/collage/40-weekly-briefing.html` — paper-clippings collage hero, a word ringed by hand in the
  headline, centred zine entries with big numerals.
- The kit: `tools/collage/kit.css`, `tools/collage/kit.js`, `tools/collage/00-shared.html` (shared marks), renderer `tools/collage.mjs`.
- Facts and copy rules still apply: `tools/briefs/product-facts.md`, `tools/briefs/zyn-vibe.md`, `tools/briefs/footers.md`.

## Page skeleton (centred, 600px, dark only, inline styles, Outlook-safe)
1. Masthead: official lockup centred, 144×36 (copy from the goldens).
2. Status ribbon, only if the email already has one (15, 25, 36) — keep its current markup.
3. Artwork — ONE of: **collage hero** (`img/hero/<stem>.jpg`, 600 wide, 300–400 tall, edges fade into #090B14) or a **die-cut sticker**
   (`img/marks/<stem>-sticker.png`, shown at 150×150 centred, the email's clay icon tilted 6–10° with `filter:url(#diecut)`).
4. Kicker: centred mono status line (replaces the old chip): DM Mono 11px, letter-spacing 1.6px, uppercase, colour by state —
   alert #FCA5A5 (glyph &#9679;), success #4ADE80 (&#10003;), info #C4B5FD (none or &#10022;), release #F9A8D4. Never uppercase the brand
   name (write "humAIne", not in an uppercase run).
5. Headline: centred Hahmlet 500, 44px / line-height 1.08–1.12 / letter-spacing -1.2px, class `h1`; mobile 34px. At most ONE hand mark in
   it: a swash under a short phrase (span with `white-space:nowrap` and the swash background, as in 02/28) or a ring round one word (as in 40).
   Keep merge-tag phrases unbreakable with a nowrap span when they hold dates or ranges. No trailing full stop.
6. Lead: centred DM Sans 16px #B4B5C4.
7. The signature block (see per-email table) — the focal point, rendered in the hand-made language.
8. Handwritten pointer (optional) → centred auto-width primary button (VML width ≈ label width + 56px; `display:inline-block`, radius 14,
   line-height 52, padding 0 28px, label + "&nbsp;&rarr;" or "&darr;" for downloads). One primary button per email.
9. Secondary line / link, centred, 14px.
10. Ask humAIne chat bubble, centred (copy 02's markup exactly; keep the email's current prompt unless it wraps). 24, 25, 36 have none.
11. Fine print, centred 12.5px (keep the "Button not working? Paste this link:" fallback for every button).
12. Hand-drawn divider (`marks/divider.png`) then the centred footer — copy 02's footer structure, but keep THIS email's current footer
    wording, links and variant exactly (security / account / billing / updates / optin / lifecycle / admin / support).

Media query block (copy from 02, then add only what your email needs):
`.px{padding-left:24px!important;padding-right:24px!important;} .h1{font-size:34px!important;line-height:1.1!important;letter-spacing:-0.8px!important;} .lead{font-size:15px!important;}`

## Marks (shared, in `img/marks/`, all 2×)
| Mark | Use |
|------|-----|
| `swash.png` | under a headline phrase: `background-image:url(…/swash.png);background-repeat:no-repeat;background-position:0 96%;background-size:100% 0.3em;` |
| `ring.png` | round a value or word: on a shrink-wrapped `<td>` or span, `background-size:100% 100%`, padding ~9px 16px |
| `strike.png` | over an OLD value (before → after): td background `background-size:100% 100%;background-position:center` on dimmed #565869 text |
| `arrow-right.png` (84×40) / `arrow-down.png` (40×72) | before → after, or stacked on mobile; show at half size |
| `check.png` / `cross.png` | done / not available lists (show at 22×20 / 20×20) |
| `dot-done.png` / `dot-now.png` / `dot-next.png` | timeline dots, show at 14×14 |
| `divider.png` | section rules and the footer rule |
| `paper-top.png`, `paper-top-taped.png`, `paper-teeth.png`, `paper-bottom.png`, `paper-perf.png` | paper cards, 520 wide, exact colour #EEE8F6 |

Paper card recipe (the receipt look): edge image (top) → `<table width=100% bgcolor="#EEE8F6" style="background-color:#EEE8F6;">` content →
edge image (bottom). Edge images `width="520"` with `style="display:block;width:100%;max-width:520px;height:auto;"`. On paper: ink #1B1730,
mono labels #6E6790, dashed rules #B8AFD3, wordmark "hum<span style="color:#5B62B4">AI</span>ne" in Hahmlet 600 #2B2350. Mobile: class to
drop paper side padding to 18px. Variants — make yours different from your neighbours': receipt (taped top + teeth), ticket/pass/coupon
(`paper-perf.png` row inside the card), notepad page (torn top, faint ruled lines via border-bottom #DCD4EA), calendar page (torn top,
coloured month band), clipping (torn top + torn bottom), code slip (taped top + perforation), record slip (torn bottom).

Per-email marks you make yourself in `tools/collage/<stem>.html` → `img/marks/<stem>-<name>.png`: the sticker, handwritten notes, stamps,
anything bespoke. Stamps: `<div class="stamp green|coral|violet|pink">WORD</div>` rotated -6…-12°, box big enough that the outer outline
isn't clipped (see 28). Put the stamp inside the paper card's header row, right-aligned, ~120–130px wide.

## Handwriting (the one human line, literally)
- At most two pieces per email: one in the hero (part of the JPG) and one pointer in the body (PNG). Many emails need only one.
- Static text only — never a merge tag in an image. Lowercase, ≤ 6 words, specific to this email, calm. Font: Covered By Your Grace (kit `.note`).
- Serious emails (15 sign-in paused, 24 deleted, 25 suspended, 30 payment failed, 36 ended): functional pointers only ("start here"-type),
  or none. Never a joke about money, lockouts, suspension or deletion.
- Don't reuse a line from another email. Taken: "never seen this one before", "wasn't you? start here", "for your records", "start with this one".
- Every handwritten image has alt text: `Handwritten: <the words>`.
- On a paper card, write in ink (#4B3F8F) not lilac.

## Collage heroes
Compose your own; don't copy 02's layout. Use the email's clay icon (each collage page names it; the icons live in `img/src/icons/` and `img/src/app/`). Ingredients: the kit's
glows, planets (`.planet blue|pink|cyan|lilac|glass|dark`), `K.stars`, a hand-drawn orbit or ring (`K.ellipse`), doodles (`K.doodle`), tape
and paper scraps, a die-cut icon, the hero note + arrow (`K.line … arrow:true`). Keep everything ≥ 40px inside the left/right edges (they
fade), notes ≥ 30px font so they survive 390px phones. Finish with `K.finish(stage, {...})`. Seed `K.init(<email number × 101>)`.
Always render only your own pages: `cd tools && node collage.mjs 13 14` — never with no arguments.

## Email-client rules
No `position`, `transform`, negative margins, `<script>` or flexbox in the EMAIL HTML (all of that lives only in collage pages that become
images). Background images on spans/tds are progressive: the email must read fine without them. VML buttons stay. Images carry nothing
essential (alt text covers them). Keep every merge tag the email uses today; don't add new ones (if you truly need one, say so in your report).

## Verify before you report
1. `cd tools && node collage.mjs <your stems>` then `node review.mjs <your scratch dir> <your stems>` — renders with realistic sample data at
   640 and 390 and flags overflow, missing images, unfilled tags, a wrapping Ask prompt or a one-word last headline line. Zero flags.
2. Read every desktop AND mobile PNG. Check: centred composition, the signature block is the focal point, marks line up (rings round their
   value, strikes over their value), paper edges meet the paper with no seam, notes legible on mobile, nothing generic.
3. `python3 tools/lint.py <your numbers>` → 0 errors, 0 warnings.
4. Self-check: "could this have come out of a generic 'dark SaaS email' prompt?" If yes, push the hand-made layer further.

## Report
Per email: hero type (collage / sticker), signature block, handwriting used (exact words), stamps/paper used, anything you couldn't resolve.
