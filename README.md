# HumAIne Email Templates

Nine production-ready HTML email templates for HumAIne (Zyn Global), plus a browser-based preview viewer.

**Live preview:** [humaine-email.vercel.app](https://humaine-email.vercel.app)

---

## The templates

| # | File | Type | Purpose |
|---|------|------|---------|
| 01 | `01-early-access.html` | Marketing | Early-access invitation |
| 02 | `02-security-alert.html` | Transactional | New-device sign-in alert |
| 03 | `03-team-invite.html` | Transactional | Workspace invitation |
| 04 | `04-password-reset.html` | Transactional | Password reset link |
| 05 | `05-pin-reset.html` | Transactional | Device PIN reset |
| 06 | `06-mfa-change.html` | Transactional | Two-factor change confirmation |
| 07 | `07-welcome.html` | Lifecycle | Post-signup welcome |
| 08 | `08-otp-code.html` | Transactional | One-time sign-in code |
| 09 | `09-onboarding-abandoned.html` | Lifecycle | Abandoned-setup re-engagement |

**Transactional** templates have no unsubscribe link — they're service messages tied to an active account, and suppressing them would break account security. **Marketing** and **lifecycle** templates carry unsubscribe + preferences links and the postal address block, which CAN-SPAM and equivalents require.

---

## Merge tags

Written in `{{snake_case}}`. Handlebars/Mustache-style, so they work as-is in Customer.io, Braze, Sendgrid, Postmark, and Resend. For Mailchimp or Salesforce Marketing Cloud, find-and-replace with that platform's syntax.

### Used in every template

| Tag | Example |
|-----|---------|
| `{{first_name}}` | `Abhishek` |
| `{{recipient_email}}` | `abhishek@zynglobal.ai` |
| `{{company_name}}` | `Zyn Global Pte. Ltd.` |
| `{{company_address}}` | Registered postal address — **legally required** on marketing sends |
| `{{current_year}}` | `2026` |
| `{{help_url}}`, `{{privacy_url}}`, `{{terms_url}}` | Footer links |

Marketing and lifecycle templates (01, 07, 09) also use `{{unsubscribe_url}}` and `{{preferences_url}}`.
Security templates (02, 04, 05, 06, 08) also use `{{security_url}}` and `{{support_email}}`.

### Per template

| Template | Tags |
|----------|------|
| 01 Early access | `{{activation_url}}`, `{{expiry_date}}` |
| 02 Security alert | `{{signin_date}}`, `{{signin_time}}`, `{{timezone}}`, `{{device_name}}`, `{{browser_name}}`, `{{city}}`, `{{country}}`, `{{ip_address}}`, `{{secure_account_url}}`, `{{sessions_url}}` |
| 03 Team invite | `{{inviter_name}}`, `{{inviter_email}}`, `{{workspace_name}}`, `{{workspace_initial}}`, `{{member_count}}`, `{{role_name}}`, `{{expiry_date}}`, `{{accept_invite_url}}` |
| 04 Password reset | `{{reset_password_url}}`, `{{expiry_minutes}}` |
| 05 PIN reset | `{{set_pin_url}}`, `{{device_name}}`, `{{expiry_minutes}}` |
| 06 MFA change | `{{confirm_change_url}}`, `{{reject_change_url}}`, `{{request_date}}`, `{{request_time}}`, `{{device_name}}`, `{{city}}`, `{{country}}`, `{{current_mfa_method}}`, `{{expiry_minutes}}` |
| 07 Welcome | `{{workspace_url}}` |
| 08 OTP code | `{{otp_code}}`, `{{expiry_minutes}}`, `{{device_name}}`, `{{city}}`, `{{country}}`, `{{request_time}}`, `{{timezone}}`, `{{secure_account_url}}` |
| 09 Abandoned setup | `{{resume_onboarding_url}}`, `{{book_setup_url}}`, `{{percent_complete}}`, `{{completed_steps}}`, `{{total_steps}}`, `{{minutes_remaining}}`, `{{days_saved}}` |

### Two things to wire up by hand

**09's progress bar** is a two-cell table with the filled cell hard-coded to `width="50%"`. Set it from `{{percent_complete}}` in your ESP's templating, and mark the matching checklist rows done — the four steps are static markup, not a loop.

**Subject lines** live in each file's `<title>`. Most ESPs set the subject separately, so copy them across. The preheader (the grey text after the subject in an inbox list) is the hidden `<div>` immediately after `<body>`.

---

## Client support

Built table-based with fully inline styles.

- **Outlook (Windows)** — buttons are VML `<v:roundrect>` fallbacks, so they render as real rounded buttons rather than collapsing. `mso-line-height-rule: exactly` keeps line heights honest.
- **Webfonts** — Jura, Manrope, and Roboto load via Google Fonts where supported, and fall back to Trebuchet MS / Segoe UI / Arial in Outlook and anywhere else that strips `<link>`.
- **Gradients** — every gradient (top bar, brand wordmark, accent words) has a solid-colour fallback underneath, so clients that drop `background-image` still get brand colour rather than a blank strip.
- **Mobile** — single breakpoint at 620px; columns stack, padding tightens, display type scales down.
- **Dark backgrounds** — worth a real-inbox test before launch. Some Gmail and Outlook dark-mode implementations force-invert colours, and deep plum is exactly the kind of background they target.

## Light and dark

Templates are **dark by default** — that's the brand, and it's what sends. Each file also carries a light-theme override block plus a small script that the preview viewer drives, so you can check both looks in the browser.

Email clients strip `<script>`, so sent mail is always dark. If you need a genuine light-mode variant, promote the `html.theme-light` rules to the base inline styles.

Preview a single template in light mode directly: `04-password-reset.html?theme=light`

## Preview viewer

`index.html` is an inbox-style browser: sidebar grouped by Lifecycle and Account, live preview pane, Dark/Light toggle, arrow-key navigation, and deep links (`index.html#04`).

Run it locally:

```bash
npx serve
```

## Design system

| Token | Value |
|-------|-------|
| Page background | `#14081E` |
| Card | `#180A24` |
| Surface | `#221230` |
| Hairline border | `#2F2444` |
| Primary / CTA | `#5271FF` |
| Secondary | `#B5B7F6` |
| Accent lilac | `#E5C3F0` |
| Accent mint | `#ACE1E4` |
| Alert | `#E07A85` |
| Text | `#F5F0FA` |
| Text muted | `#A99FBB` |
| Text dim | `#6F6383` |
| Brand gradient | `135deg, #5271FF → #B5B7F6 → #E5C3F0` |

Jura for headlines, Manrope for body and buttons, Roboto for the letterspaced eyebrow labels. The gradient is reserved for one moment per email — an accent word or the top bar — so it stays worth looking at.
