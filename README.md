# humAIne Email Templates

Twelve production-ready HTML emails for **humAIne** (a Zyn Global product), designed to feel native to the humAIne app — same canvas, type, clay illustrations and planetary backdrop — plus a browser-based preview viewer.

**Live preview:** [humaine-email.vercel.app](https://humaine-email.vercel.app) · **Design reference:** the humAIne app, [humaine-personal-mobile.vercel.app](https://humaine-personal-mobile.vercel.app)

---

## The templates

| # | File | Type | Purpose |
|---|------|------|---------|
| 01 | `01-early-access.html` | Marketing | Early access approved |
| 02 | `02-security-alert.html` | Transactional | New-device sign-in alert |
| 03 | `03-document-shared.html` | Transactional | Someone shared a generated document |
| 04 | `04-password-reset.html` | Transactional | Forgot-password link |
| 05 | `05-pin-reset.html` | Transactional | Device PIN reset |
| 06 | `06-mfa-change.html` | Transactional | Two-factor change confirmation |
| 07 | `07-welcome.html` | Lifecycle | Registration confirmed / welcome |
| 08 | `08-otp-code.html` | Transactional | One-time sign-in code |
| 09 | `09-onboarding-abandoned.html` | Lifecycle | Signup abandoned midway |
| 10 | `10-org-invite.html` | Transactional | Invitation to join an organisation |
| 11 | `11-password-changed.html` | Transactional | Confirmation after a password change |
| 12 | `12-product-update.html` | Marketing | Release announcement — new features & version |

Copy is written against humAIne's actual surface — **chat, news, and document generation**. Organisations exist; there is no workspace, dashboard, team or data-source concept anywhere in these templates.

**Transactional** templates have no unsubscribe link — they're service messages tied to an active account, and suppressing them would break account security. **Marketing** and **lifecycle** templates (01, 07, 09, 12) carry unsubscribe + preferences links and the postal-address block that CAN-SPAM and equivalents require.

## Jira coverage

| Ticket | Scope | Template |
|--------|-------|----------|
| HL26-40 | Invitation email after user registers | `01-early-access.html` |
| HL26-41 | Invitation from Organization | `10-org-invite.html` |
| HL26-42 | Forgot password confirmation email | `04-password-reset.html` |
| HL26-48 | New password set email | `11-password-changed.html` |
| HL26-47 | Reset MFA | `06-mfa-change.html` |
| HL26-43 | Change PIN information email | `05-pin-reset.html` |
| HL26-44 | New Device notification | `02-security-alert.html` |
| HL26-46 | New Updates email — features & version | `12-product-update.html` |
| HL26-49 | Confirmation that the user has registered | `07-welcome.html` |
| HL26-71 | User abandons the journey midway of signup | `09-onboarding-abandoned.html` |

Not on the board but in the set: `03-document-shared.html` and `08-otp-code.html`.

---

## Design system — lifted from the app

Every value below was read from the humAIne app's own CSS, so an email and the screen it links to look like one product.

| Token | Value | App source |
|-------|-------|------------|
| Canvas | `#090B14` | body background |
| Glass card | `#15171F`, 1px `#23252E`, 16px radius | `rgba(255,255,255,.05)` surface + `.10` hairline |
| Headline | `#FFFFFF`, **Hahmlet** 500 | the chat greeting ("Good morning …") |
| Body | `#B4B5C4`, **DM Sans** | app UI font |
| Muted / legal | `#7D7F8F` / `#565869` | `rgba(255,255,255,.45)` / `.30` |
| Link | `#A78BFA` | violet accent |
| Primary CTA | `linear-gradient(90deg, #768AFF, #FA81D6)`, 16px radius, 52px | "Login with email" button |
| Secondary CTA | `#1B1D26`, 1px `#2E3040`, 14px radius | glass buttons |
| Status chips | success `#4ADE80` · info `#C4B5FD` · alert `#FCA5A5` · release `#F9A8D4` | "Active" chip pattern |

Headlines fall back to Georgia (keeps the serif character in Gmail and Outlook, which don't load web fonts); body falls back to Helvetica/Arial.

**Structure.** Official lockup → hero scene → status chip → Hahmlet headline → lead → glass cards (details, callouts) → CTA → **Ask humAIne** card → footer with the identifier and *"Disruptively Human . Trust Co-created."*

**Ask humAIne.** Every email ends with a card suggesting a relevant chat prompt (*"Is my account secure?"*, *"Summarise this document for me"* …), linking to `{{chat_url}}`. The product is an AI you talk to; the email hands the reader straight to it. To pre-fill the prompt, have your ESP append it to the chat deep link.

**Dark only.** The app is dark-first and so are these. Each file declares `color-scheme: dark` so Apple Mail and iOS don't try to recolour it.

## Brand assets — `img/brand/`

| File | What |
|------|------|
| `identifier-mark.png` | The humAIne head mark (identical to the app's `assets/identifier-mark.png`) |
| `identifier.png` | Full identifier: mark + wordmark + tagline (the app's chat-home lockup) |
| `lockup@2x.png` | Masthead: mark + wordmark, cropped from `identifier.png`, shown at 144×36 |
| `mark.png`, `mark-96.png` | Trimmed mark, and a 96px version for the footer and Ask card |
| `wordmark.png`, `tagline.png` | Crops of the official wordmark and tagline |

The wordmark and tagline are crops of the app's own artwork — nothing redrawn.

## Illustration — `img/hero/`, `img/src/`

Each hero is a **clay icon floating in a planetary scene**, matching the app:

- **Clay icons** use the app's illustration recipe — every shape is three stacked fills (lilac body `#F0D6F8 → #E5C3F0 → #C48DD8 → #8E56A8`, a plum shade `#3A1850` at the bottom, a white specular highlight top-left), a soft floor shadow, and one accent badge (white disc with a violet glyph, glossy green success, or glossy coral alert).
  - App originals, reused as-is: `img/src/app/` (password-reset-success, invitation-mail-sent, administrator-icon, chat-history, export-data, …).
  - New icons drawn to the same recipe: `img/src/icons/`.
- **Planets** use the app's exact sphere shading — `radial-gradient(circle at 34% 30%, …)` in blue `#CFD6FF→#8B93E8→#5B62B4`, pink `#F6D3EE→#E08FD0→#A8548F`, cyan `#DCFBFF→#4FD6EA→#2B8FA8` and glass — with the app's ring and orbit strokes, star field and violet nebula glow.
- **Edges fade into the canvas** (left/right 10%, top 36%, bottom 28%) so the scene blends into the email instead of sitting in a box.

Heroes are 1200px wide (2× for crisp display at 600px), JPEG, ~30–60 KB. Emails reference them absolutely (`https://humaine-email.vercel.app/img/…`). Every hero has descriptive alt text and no information lives only in an image, so blocked-image clients lose nothing.

## Tools — `tools/`

```bash
cd tools && npm install
node scene.mjs                      # render every hero from tools/scenes/*.json
node scene.mjs 04-password-reset    # just one
node shot.mjs 04-password-reset.html   # desktop + mobile screenshots (uses local Chrome)
```

- **`scene.mjs`** — the hero generator. One JSON file per email in `tools/scenes/` declares the icon, planets (type, position, size, ring), orbit, sparkles and glows. Edit the JSON, re-run, done.
- **`shot.mjs`** — headless screenshots at 640px and 390px. Requests for production image URLs are served from the repo, so you can check an email before deploying. Prints `MISSING ASSETS` if any image 404s.

---

## Merge tags

Written in `{{snake_case}}` — Handlebars/Mustache-style, so they work as-is in Customer.io, Braze, SendGrid, Postmark and Resend. For Mailchimp or Salesforce Marketing Cloud, find-and-replace with that platform's syntax.

<!-- MERGE-TAGS:START -->
### Used in every template

| Tag | Notes |
|-----|-------|
| `{{first_name}}` | Recipient first name |
| `{{chat_url}}` | Deep link into humAIne chat (Ask humAIne card) |
| `{{help_url}}` | Help centre |
| `{{privacy_url}}` | Privacy policy |
| `{{recipient_email}}` | Recipient address |
| `{{current_year}}` | e.g. 2026 |
| `{{company_name}}` | e.g. Zyn Global Pte. Ltd. |
| `{{company_address}}` | Registered postal address — **legally required** on marketing sends |

Marketing and lifecycle templates (01, 07, 09, 12) also use `{{preferences_url}}`, `{{terms_url}}`, `{{unsubscribe_url}}`.

### Per template

| Template | Tags |
|----------|------|
| 01 Early access | `{{expiry_date}}`, `{{activation_url}}` |
| 02 Security alert | `{{city}}`, `{{signin_date}}`, `{{signin_time}}`, `{{timezone}}`, `{{device_name}}`, `{{browser_name}}`, `{{country}}`, `{{ip_address}}`, `{{secure_account_url}}`, `{{sessions_url}}`, `{{support_email}}`, `{{security_url}}` |
| 03 Document shared | `{{sharer_name}}`, `{{document_title}}`, `{{sharer_email}}`, `{{document_type}}`, `{{page_count_label}}`, `{{generated_date}}`, `{{share_message}}`, `{{document_url}}`, `{{terms_url}}` |
| 04 Password reset | `{{expiry_minutes}}`, `{{reset_password_url}}`, `{{app_url}}`, `{{support_email}}`, `{{security_url}}` |
| 05 Pin reset | `{{device_name}}`, `{{expiry_minutes}}`, `{{set_pin_url}}`, `{{support_email}}`, `{{security_url}}` |
| 06 Mfa change | `{{device_name}}`, `{{request_date}}`, `{{request_time}}`, `{{timezone}}`, `{{city}}`, `{{country}}`, `{{current_mfa_method}}`, `{{confirm_change_url}}`, `{{reject_change_url}}`, `{{expiry_minutes}}`, `{{support_email}}`, `{{security_url}}` |
| 07 Welcome | `{{app_url}}` |
| 08 Otp code | `{{otp_code}}`, `{{expiry_minutes}}`, `{{request_time}}`, `{{timezone}}`, `{{device_name}}`, `{{city}}`, `{{country}}`, `{{secure_account_url}}`, `{{support_email}}`, `{{security_url}}` |
| 09 Onboarding abandoned | `{{minutes_remaining}}`, `{{resume_onboarding_url}}`, `{{book_setup_url}}`, `{{days_saved}}` |
| 10 Org invite | `{{inviter_name}}`, `{{org_name}}`, `{{expiry_date}}`, `{{inviter_email}}`, `{{role_name}}`, `{{accept_invite_url}}`, `{{support_email}}`, `{{terms_url}}` |
| 11 Password changed | `{{change_date}}`, `{{change_time}}`, `{{device_name}}`, `{{timezone}}`, `{{city}}`, `{{country}}`, `{{recover_account_url}}`, `{{support_email}}`, `{{security_url}}` |
| 12 Product update | `{{version_number}}`, `{{feature_1_title}}`, `{{feature_1_description}}`, `{{feature_2_title}}`, `{{feature_2_description}}`, `{{feature_3_title}}`, `{{feature_3_description}}`, `{{changelog_url}}` |
<!-- MERGE-TAGS:END -->

### Things to wire up by hand

**09 is the "stopped before the first question" variant.** The checklist (two done, "You're here" on *Ask your first question*, one to go), the segmented bar and the "halfway there" chip are static markup, so the copy and the art always agree. Only `{{minutes_remaining}}` and `{{days_saved}}` are dynamic. If people drop off at other steps too, duplicate the file per drop-off point and move the "You're here" row and the bar fill — don't drive the rows from merge tags. Swap the four step names if the real signup flow differs.

**03's share note** is wrapped in Handlebars `{{#if share_message}} … {{/if}}`, so an empty note renders no quote marks. If your ESP uses a different conditional syntax (Liquid, AMPscript), translate those two markers. `{{page_count_label}}` is the full phrase, e.g. `8 pages` or `1 page`, so the plural is always right.

**Subject lines** live in each file's `<title>`; most ESPs set the subject separately, so copy them across. The **preheader** (the grey text after the subject in an inbox list) is the hidden `<div>` right after `<body>`.

---

## Client support

Table-based, fully inline styles, solid-colour fallbacks throughout.

- **Outlook (Windows)** — buttons are VML `<v:roundrect>` with a VML gradient fill, so the gradient CTA survives; content is wrapped in an MSO 600px ghost table; `mso-line-height-rule: exactly` keeps line heights honest.
- **Gradients** — the CTA carries a solid `#9A86EC` under its CSS gradient, so clients that drop `background-image` still show a branded button.
- **Web fonts** — Hahmlet and DM Sans load via Google Fonts where supported (Apple Mail, iOS); elsewhere they fall back to Georgia and Helvetica/Arial.
- **Mobile** — single breakpoint at 620px; padding tightens and the headline steps down. Buttons are already full-width.
- **Dark mode** — the templates are designed dark and declare it. Still worth a real-inbox test: some Gmail and Outlook apps apply their own dark-mode adjustments.

## Preview viewer

`index.html` is an inbox-style browser in the app's look: sidebar grouped into Lifecycle and Transactional with hero thumbnails, subjects and preheaders read live from each template, a **Desktop / Mobile** width toggle, arrow-key navigation and deep links (`index.html#04`).

```bash
npx serve
```
