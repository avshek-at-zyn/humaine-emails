# Zyn vibe — NOT generic, NOT AI-generated  (new direction from Abhishek — overrides anything softer in system.md)

The problem: 43 emails stamped from one template (centred hero → chip → two-beat headline → glass card → "Wasn't you?" callout →
Ask card), with recycled quips, reads as AI-generated. Zyn emails must feel designed by a senior team for THIS product:
exact, calm, confident, quietly futuristic — Cred/Revolut grade. Keep the system (canvas, masthead, type, colours, footer, buttons,
Outlook plumbing). Change the shape of the content so every email has ONE distinct, memorable detail that comes from its own data.

## 1. Signature move — exactly one per email (your assignment names it)
Build it with email-safe tables + inline styles, solid colours, mobile-safe (390px), Outlook-safe. It becomes the focal point; the
rest of the email gets quieter around it.
- **big-figure** — the email's key value as the hero inside the content: Hahmlet 44–56px (mobile 32–36px via a class), with a small
  label above and a quiet unit/meta line below. Merge tags at display size must fit 520px desktop and wrap sanely on mobile.
- **before-after** — old value dim (#565869, optionally struck through) → a violet arrow → new value bright white; one row per change.
- **timeline** — 3–4 steps on a hairline: done steps = small filled lilac dots, the current step = a ringed dot + bold label, future =
  hollow dim dots; dates/times under each step. Horizontal on desktop is fine if it stacks or stays legible at 390px; vertical is safest.
- **notification** — render the event exactly like the app's own in-app notification row: a 36px tinted icon tile (e.g. bg #1C1A30
  border #383159 with a simple glyph), bold title, meta line ("Leicester Square, London · 192.168.1.47"), timestamp on the right.
- **date-tile** — a calendar block as the focal point: small month label, big day number, year — next to one line of what happens on that date.
- **artefact** — show the thing itself, masked: a card face (brand · •••• 4242 · exp 12/26), a backup-code sheet (2×4 grid of
  "•••• ••••"), PIN cells (6 filled + 2 optional), a file row (name · format · size), a mini invoice "paper", a masked phone or email pill.
- **editorial-index** — magazine contents layout: big numerals (Hahmlet 28–32px #A78BFA or gradient-text with solid fallback),
  hairline separators, a small source/tag chip per row.
- **split-hero** — no full-width scene: an asymmetric two-column block with copy left (~60%) and a compact square scene right
  (~40%), stacking on mobile. Render the compact scene with the generator using `"width": 560, "height": 560` in your scene JSON.
- **status-ribbon** — a full-width thin band right under the masthead (alert: bg #26171F, text #FCA5A5; success: bg #08241F, text
  #4ADE80; info: bg #1C1A30, text #C4B5FD) with one line of status + time, then a smaller hero.
If the move replaces the hero image (split-hero), you may also shrink or drop the full-width scene. Otherwise keep the hero but
consider a shorter scene (height 440–520) so the signature move sits higher.

## 2. Copy — voice of Zyn, not of a chatbot
- Write like a security lead talking to another security lead. Short declaratives. Specifics over adjectives: name the device, the
  city, the time, the amount, the date. British English (organisation, centre, authorise, colour) — the app is British (£, "Leicester Square, London").
- One human line per email, maximum. A wink, never a joke. Never cute about money, lockouts, suspension or deletion.
- Headlines and card titles never end with a full stop (no heading in the app does). Use `text-wrap:balance` on the h1.
- Headlines: say what happened, plainly and specifically ("Your PIN was changed on Tuesday", "£99.00 received"). Don't use the
  two-beat "X. Y." formula or rhetorical questions unless it's the single best line — and never in two emails of the same category.
- Vary the "if this wasn't you" moment: a single sentence with an inline link, a row in the details card, a callout, or a secondary
  button — never the same "Wasn't you?" card in two neighbouring emails.
- Em dashes: at most one per email. Prefer full stops. No exclamation marks, no emoji.
- BANNED (AI tells): "No judgement", "Happens to everyone", "Nothing to see here", "Rest assured", "Don't worry", "We've got you
  covered", "Seamless", "Effortless", "Unlock", "Elevate", "Journey", "Dive in", "Welcome aboard", "We're excited", "Exciting news",
  "Stay tuned", "Simply", "Just" (as filler), "Game-changer", "Supercharge", "Harness", "Empower", "Leverage", "Here's the thing",
  "Pro tip", "Spoiler", "no lecture", "we'll pretend this never happened", meta-jokes about the email itself ("you've just finished the
  whole email"), "precisely nothing", "on duty", "takes the keys", "bolt the door", "saved you a seat" style idioms used more than once.
- Every sentence must earn its place: if deleting it loses nothing, delete it. Most emails need 2–4 short paragraphs total.

## 3. Final self-check (do it on your screenshots)
"Could this exact email have come out of a generic prompt for 'dark mode SaaS email'?" If yes, the signature move isn't strong
enough or the copy is too general — fix the concept, not the colours. Also check that your email doesn't share its focal-move shape,
headline formula or callout pattern with the other emails in your batch.
