# humAIne email system — build brief

REPO: /Users/abhishek/Desktop/email-template  (static HTML emails, auto-deployed to https://humaine-email.vercel.app on push — DO NOT push or commit)

The emails look like the humAIne app itself. The GOLDEN TEMPLATE is `11-password-changed.html` — read it in full first. Its skeleton,
tokens, spacing, components and Outlook plumbing are the spec. Every email must read as its sibling: same masthead lockup, hero row,
status chip, Hahmlet headline, lead, glass cards, CTA, Ask humAIne card and footer. Change content, not the system.
Also skim 2–3 other finished emails for range (e.g. 02-security-alert.html, 08-otp-code.html, 09-onboarding-abandoned.html).

## Hard rules
- DARK ONLY. No light-mode CSS, no theme classes, no `<script>` at all. Keep `<meta name="color-scheme" content="dark">`.
- Copy says **humAIne** (never HumAIne/Humaine). Facts must match `brief/product-facts.md` exactly — read it.
- Voice: confident, warm, a little witty ("Zyn" voice) but never flippant about money or security. Short sentences. No emoji, no
  placeholder AI copy ("Welcome aboard!", "We're excited…"). Security = calm confidence, not alarm.
- Every dynamic value is a `{{snake_case}}` merge tag; every URL is a merge tag. Never hardcode example names, prices, dates, devices.
- Subject line = the `<title>`. Preheader = the hidden div right after `<body>` (keep the `&nbsp;&zwnj;` padding).
- Only write the files your assignment lists (your emails, their `tools/scenes/<stem>.json`, your icon SVGs in `img/src/icons/`,
  and `img/hero/<stem>.jpg` via the generator). Never edit other emails, `index.html`, `README.md`, `tools/scene.mjs`,
  `tools/shot.mjs`, anything in `img/brand/` or `img/src/app/`. Never commit or push.
- Scratch space: `/private/tmp/claude-501/-Users-abhishek-Desktop-email-template/215a9a59-6885-4d83-a4e5-975e2e527111/scratchpad/agents/<your-agent-name>/`

## Tokens (solid colours only — Outlook ignores rgba)
canvas #090B14 · glass card #15171F + 1px #23252E, radius 16px · row divider #1F2129 · headline #FFFFFF · body #B4B5C4 ·
labels/muted #7D7F8F · legal #565869 · links #A78BFA · Ask card bg #12131C border #2A2547 label #8E86C9 · emphasis-in-card #C4B5FD
Fonts: headlines `'Hahmlet',Georgia,'Times New Roman',serif` (500, 31px, line-height 1.25, centred) · everything else
`'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif`.

## Status chip (golden markup, swap colours + glyph)
- success: bg #08241F border #0B5236 text #4ADE80 glyph &#10003; — something completed in the user's favour
- info:    bg #1C1A30 border #383159 text #C4B5FD glyph &#10022; — neutral notice / request
- alert:   bg #26171F border #5D2F35 text #FCA5A5 glyph &#9679; — needs attention / risk / money not taken
- release: bg #26192B border #5A3358 text #F9A8D4 glyph &#10022; — product releases and offers only

## Buttons
PRIMARY (app CTA, full width):
```html
<tr><td class="px" style="padding:28px 40px 0;">
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{URL}}" style="height:52px;v-text-anchor:middle;width:520px;" arcsize="31%" stroke="f" fillcolor="#768AFF">
    <v:fill type="gradient" color="#768AFF" color2="#FA81D6" angle="90"/>
    <w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">LABEL</center>
  </v:roundrect>
  <![endif]-->
  <!--[if !mso]><!-->
  <a href="{{URL}}" style="display:block;background-color:#9A86EC;background-image:linear-gradient(90deg,#768AFF 0%,#FA81D6 100%);border-radius:16px;color:#FFFFFF;font-family:'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;line-height:52px;text-align:center;text-decoration:none;">LABEL</a>
  <!--<![endif]-->
</td></tr>
```
SECONDARY: copy the golden's "Recover my account" pattern (VML width 520 at page level, 474 inside a card).
If an email has a CTA, add the plain-link fallback in the fine print, formatted exactly: `Button not working? Paste this link:<br><a href="{{URL}}" style="color:#A78BFA;word-break:break-all;">{{URL}}</a>`

## Cards
- Details card = golden receipt card (stacked rows: 12px muted label over 15px/500 white value, #1F2129 dividers).
- Callout card = golden "Wasn't you?" card (title 15px/600 white, body 14px #B4B5C4, optional secondary button).
- Optional coloured status line inside a card (golden's green "Every other session…" line): success #4ADE80, alert #FCA5A5, info #C4B5FD.
- Money: show amounts as `{{amount}}` etc. — right-aligned label/value rows are fine for receipts (label left #7D7F8F, value right white), but keep the card styling.

## Ask humAIne card
Copy the golden's card exactly; change only the quoted prompt (given per email). Keep prompts to 190px or less in Hahmlet 16px (the prompt column at 390px wide): about 20 characters, fewer with wide letters like W and m. Character count alone isn't enough. Link `{{chat_url}}`.

## Footers — use `brief/footers.md` (pick the variant your assignment names; do not invent new ones).

## Hero scene
Generator: `cd /Users/abhishek/Desktop/email-template/tools && node scene.mjs <stem>` renders `tools/scenes/<stem>.json` →
`img/hero/<stem>.jpg` (1200px, 2x). Read 3 existing scene JSONs first (e.g. 11-password-changed, 02-security-alert, 12-product-update).
Fields: name (= file stem), icon (repo path .svg or alpha .png), iconSize (280–320), iconX/iconY (default centre / 49% height),
height (always 600), seed (your email number), planets [{type: glass|blue|pink|cyan|lilac|dark, x, y, r, ring, tilt, ringScale}],
orbit {scale, ry, tilt, moon, moonR, moonAt}, pinkGlow {x,y,r}, shootingStar {x,y,len,angle}, sparkles [[x,y,size]], layers, glowRadius, stars.
The generator fades the left/right ~20%, top 36% and bottom 28%. Keep planets within x 160–1040 and y 90–440, ≥230px from the icon
centre; 2–4 planets, asymmetric, at least one ringed, mixed sizes (r 10–56). COMPOSE YOUR OWN LAYOUT — look at
`img/hero/*.jpg` and don't repeat another email's arrangement. Hero row in the HTML (exact):
`<tr><td><img src="https://humaine-email.vercel.app/img/hero/<stem>.jpg" width="600" alt="DESCRIPTIVE ALT" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>`

## Clay icons (app illustration recipe)
Reuse an app original from `img/src/app/` when your assignment says so. Otherwise author `img/src/icons/<name>.svg` in the app's
exact style. Study `img/src/app/administrator-icon.svg` (small, complete), `password-reset-success.svg`, `invitation-mail-sent.svg`,
`thankyou-bubble.svg`, and the house icons already made to this recipe in `img/src/icons/` (keypad.svg, lock-clock.svg,
device-alert.svg, shield-alert.svg, doc-shared.svg, code-bubble.svg, rocket.svg). Recipe:
- every clay shape = THREE stacked fills of the same path: (1) base radialGradient lit from top-left, lilac stops
  #F0D6F8 → #E5C3F0 (0.3) → #C48DD8 (0.7) → #8E56A8 (1) (bodies may use #E5C3F0 → #D4A2E6 → #B570CC → #7A3E96);
  (2) bottom shade radialGradient: transparent to 0.65, then #3A1850 / #472858 at opacity 0.5; (3) small white specular top-left, 0.6–0.7 → 0.
- secondary parts may use the violet ramp #D8D4FA → #B5B7F6 → #8A7EE8 → #6E60C8 (sparingly — the set reads lilac).
- a soft floor shadow ellipse under the object (black, opacity 0.22–0.32, optional blur).
- ONE accent badge overlapping an edge, 30–38% of the object's width: white disc (radial #FFFFFF → #F0EDF8 → #D6D1EA + highlight)
  with a violet-gradient glyph; OR the glossy green success badge (copy from password-reset-success.svg); OR the glossy coral alert
  badge (copy from shield-alert.svg).
- chunky, soft, matte, rounded; no outlines, no text, transparent background, viewBox ≈ 0 0 232 235.
- Families: when two of your emails share a base object, draw the base once and vary only the badge — and make each variant a
  separate file.
PROVE each new icon: render it with sharp (`tools/node_modules`) beside administrator-icon.svg and password-reset-success.svg on
#090B14, Read the PNG, compare material/lighting/palette/softness/shadow/badge size, iterate until it could ship in the app.

## Verify before you finish
`cd /Users/abhishek/Desktop/email-template/tools && node shot.mjs <stem>.html <scratch>/<stem>` → desktop (640) + mobile (390)
full-page PNGs (repo images served locally; prints MISSING ASSETS on 404). Read both. Fix: missing images, broken braces, overflow,
hero seam, weak hierarchy, cramped mobile, style drift from the golden, a prompt that wraps, a headline that orphans a word.
Grep your files: no `<script>`, no `theme-light`, no `HumAIne`, no hardcoded example values, balanced `{{`/`}}`.

## What to return
A short report per email: file, subject, preheader, icon file (app/new), chip variant, footer variant, merge tags used, and anything
you could not resolve. Keep it factual.
