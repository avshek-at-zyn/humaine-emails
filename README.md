# humAIne Email Templates

**43 production-ready HTML emails** for **humAIne** (a Zyn Global product) — every email the product's flows need, designed to feel native to the humAIne app: same canvas, type, clay illustrations and planetary backdrop. Plus a browser-based preview viewer.

**Live preview:** [humaine-email.vercel.app](https://humaine-email.vercel.app) · **Design and flow reference:** the humAIne app, [humaine-personal-mobile.vercel.app](https://humaine-personal-mobile.vercel.app)

---

## How the catalogue was built

The set comes from an audit of the live app: every screen, settings page, policy, FAQ answer, in-app notification and the forgot-password "demo inbox" the app uses to show its own emails. Every email maps to something the product actually does, and its copy uses the app's own wording and rules — 16–64 character passwords, a 6–8 digit Unique PIN, reset links that expire in 30 minutes, three failed attempts before sign-in pauses, conversations kept for 90 days, account deletion that is immediate.

The app's notification settings define four email categories, and the templates follow them:

| Category | What it covers (app copy) | Email |
|----------|---------------------------|-------|
| **Security updates** | "A new sign-in, a device added, a password or PIN changed, and anything that looks like someone else getting in." | Always on |
| **App updates** | "A version worth updating to, a feature being retired, and planned work that will interrupt you." | Always on |
| **News & PR** | "Briefings on what has happened in security this week, and anything written about the organisations you follow." | Opt-in |
| **Promotions** | "Offers, plan news, and the occasional thing we think you would want." | Opt-in, off by default |

The app's rule — *"A sign-in you did not make, a change to your account and anything you are charged for always reach you, by push and by email"* — is why security, account and billing emails carry no unsubscribe link.

## The templates

### Onboarding
| File | Sent when | Footer |
|------|-----------|--------|
| `13-verify-email.html` | An account is created on the web and the address needs confirming | account |
| `01-early-access.html` | Early access is approved | lifecycle |
| `07-welcome.html` | Registration is complete | lifecycle |
| `09-onboarding-abandoned.html` | Signup stalls before the first question | lifecycle |

### Sign-in & recovery
| File | Sent when | Footer |
|------|-----------|--------|
| `04-password-reset.html` | Forgot password — reset link (30-minute expiry in the app) | security |
| `11-password-changed.html` | A password was changed | security |
| `05-pin-reset.html` | Forgot Unique PIN — reset link | security |
| `14-pin-changed.html` | The Unique PIN was changed in Security Settings | security |
| `08-otp-code.html` | A recovery method sends a sign-in code by email | security |
| `15-sign-in-paused.html` | Three failed attempts paused sign-in | security |
| `16-recovery-admin-requested.html` | The user asked their administrator for recovery help | security |
| `17-recovery-admin-alert.html` | **To the administrator:** a member can't get back in | admin |

### Security updates
| File | Sent when | Footer |
|------|-----------|--------|
| `02-security-alert.html` | A new device signed in | security |
| `06-mfa-change.html` | The authenticator was reset (re-paired) | security |
| `18-backup-codes-new.html` | Backup codes were regenerated | security |
| `19-backup-codes-viewed.html` | Backup codes were opened | security |
| `20-recovery-phone-updated.html` | A recovery phone was added or changed | security |
| `21-alternate-email-verify.html` | **To the new address:** code to verify an alternate email | account |
| `22-alternate-email-updated.html` | The alternate email was changed | security |
| `23-address-updated.html` | The registered address (used to verify identity) was changed | security |

### Account & data
| File | Sent when | Footer |
|------|-----------|--------|
| `10-org-invite.html` | An organisation invites someone | account |
| `03-document-shared.html` | Someone shares a generated document | account |
| `26-data-export-ready.html` | A data export is ready to download | account |
| `24-account-deleted.html` | The account was deleted (immediate, irreversible) | account |
| `25-account-suspended.html` | The account was suspended under the Acceptable Use Policy | security |

### Billing — humAIne Personal
| File | Sent when | Footer |
|------|-----------|--------|
| `27-subscription-confirmed.html` | First payment — the plan is active | billing |
| `28-payment-receipt.html` | A renewal or charge succeeded | billing |
| `29-renewal-reminder.html` | Ahead of a renewal | billing |
| `30-payment-failed.html` | A card was declined | billing |
| `31-card-expiring.html` | The card on file expires before the next renewal | billing |
| `32-billing-details-updated.html` | Card, invoice name/address or billing email changed | billing |
| `33-plan-changed.html` | Switched between Monthly and Annual | billing |
| `34-subscription-cancelled.html` | The plan was cancelled — access continues to the end of the term | billing |
| `35-subscription-resumed.html` | Auto-renew was turned back on | billing |
| `36-subscription-ended.html` | The term ended — conversations are paused | billing |
| `37-refund-issued.html` | A refund was issued | billing |

### App updates
| File | Sent when | Footer |
|------|-----------|--------|
| `12-product-update.html` | A new release ships | updates |
| `38-feature-retiring.html` | A feature is being retired | updates |
| `39-planned-maintenance.html` | Planned work will interrupt the service | updates |

### News & offers
| File | Sent when | Footer |
|------|-----------|--------|
| `40-weekly-briefing.html` | The weekly security briefing (News & PR opt-in) | optin |
| `41-org-in-the-news.html` | An organisation the user follows is in the news | optin |
| `42-annual-offer.html` | Monthly subscribers: switch-to-annual offer (Promotions opt-in) | optin |

### Support
| File | Sent when | Footer |
|------|-----------|--------|
| `43-support-received.html` | Automatic reply when someone emails Support | support |

Deliberately **not** in the set: bug-report and feedback acknowledgements. The app says it does not always write back about bugs, so it doesn't promise an email.

**Footer variants.** *security* and *admin*: can't be switched off. *account*: one-off service message. *billing*: goes to the billing email, always reaches the user while they have a plan. *updates*: always on by product policy, with a link to notification settings. *optin* and *lifecycle*: unsubscribe and preferences links plus the postal address.

**Senders.** The app's own demo inbox sends security mail as **humAIne Security &lt;no-reply@zynglobal.ai&gt;**. The viewer uses the same pattern for the rest: humAIne Billing, humAIne News, humAIne Support, and plain humAIne for onboarding, account and app updates. Set these in your ESP.

## Jira coverage

| Ticket | Scope | Template |
|--------|-------|----------|
| HL26-40 | Invitation email after user registers | `01-early-access.html` (verification: `13-verify-email.html`) |
| HL26-41 | Invitation from Organization | `10-org-invite.html` |
| HL26-42 | Forgot password confirmation email | `04-password-reset.html` |
| HL26-48 | New password set email | `11-password-changed.html` |
| HL26-47 | Reset MFA | `06-mfa-change.html` |
| HL26-43 | Change PIN information email | `14-pin-changed.html` (forgot-PIN link: `05-pin-reset.html`) |
| HL26-44 | New Device notification | `02-security-alert.html` |
| HL26-46 | New Updates email — features & version | `12-product-update.html` |
| HL26-49 | Confirmation that the user has registered | `07-welcome.html` |
| HL26-71 | User abandons the journey midway of signup | `09-onboarding-abandoned.html` |

Everything else in the catalogue comes from flows the app already has but the board doesn't track yet — worth adding tickets for.

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

**Structure.** Official lockup → hero scene → Hahmlet headline → lead → the email's signature block → CTA → **Ask humAIne** card → footer with the identifier and *"Disruptively Human . Trust Co-created."* The system (canvas, type, colours, buttons, footer, Outlook plumbing) never changes; the shape of the content does.

**One signature move per email.** So the set reads as designed for this product rather than stamped from one template, every email has a single focal detail built from its own data, and neighbours never share one:

| Move | What it is | Emails |
|------|-----------|--------|
| Big figure | The key value set large in Hahmlet | 04 link window · 08 and 21 codes · 23 new city · 27 amount paid · 35 next charge · 37 refund |
| Before → after | Old value dimmed and struck, new value bright | 06 authenticator · 11 password · 22 alternate email · 33 plan · 42 Monthly vs Annual |
| Timeline | Done / current / next steps on a hairline | 09 setup checklist · 13 signup · 16 recovery · 26 export · 34 cancellation · 39 maintenance window |
| App notification | The event drawn as the app's own notification row | 02 new sign-in · 17 member locked out · 19 codes viewed · 32 billing change · 43 support thread |
| Artefact | The thing itself, masked | 03 document page · 10 invitation pass · 14 PIN field · 18 backup-code sheet · 20 phone pill · 24 deletion record · 28 invoice · 30 card face · 31 expiry tile |
| Date tile | A calendar block for the date that matters | 29 renewal · 38 retirement |
| Editorial index | Magazine-style numbered list | 07 first moves · 12 release notes · 40 weekly briefing |
| Split hero | Copy left, compact scene right | 01 early access · 05 PIN reset · 41 organisation in the news |
| Status ribbon | A thin band under the masthead | 15 sign-in paused · 25 suspended · 36 subscription ended |

Status chips are used only where the signature block doesn't already say the status. The copy rules (British English, plain specific headlines with no trailing full stop, at most one em dash, no exclamation marks, no chatbot phrases) are in `tools/briefs/zyn-vibe.md` and enforced by `tools/lint.py`.

**Ask humAIne.** Every email ends with a card suggesting a relevant chat prompt (*"Is my account secure?"*, *"Summarise it for me"*, *"Why was I declined?"* …), linking to `{{chat_url}}`. Prompts are measured so they sit on one line at 390px. The product is an AI you talk to; the email hands the reader straight to it. Three emails leave the card out on purpose — `24` account deleted, `25` account suspended and `36` subscription ended — because chat isn't available to the reader in those states. To pre-fill the prompt, have your ESP append it to the chat deep link.

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
- **Edges fade into the canvas** (soft eased fades on the left/right ~20%, top 36%, bottom 28%) so the scene blends into the email instead of sitting in a box.

Heroes are 1200px wide (2× for crisp display at 600px), JPEG, ~30–60 KB. Emails reference them absolutely (`https://humaine-email.vercel.app/img/…`). Every hero has descriptive alt text and no information lives only in an image, so blocked-image clients lose nothing.

## Tools — `tools/`

```bash
cd tools && npm install
node scene.mjs                      # render every hero from tools/scenes/*.json
node scene.mjs 04-password-reset    # just one
node shot.mjs 04-password-reset.html   # desktop + mobile screenshots (uses local Chrome)
node review.mjs /tmp/qa 27 28       # same, filled with samples.json, plus contact sheets
python3 lint.py                     # copy + build checks on every template (or: python3 lint.py 04 15)
python3 readme_tags.py              # rebuild the merge-tag tables below from the templates
```

- **`scene.mjs`** — the hero generator. One JSON file per email in `tools/scenes/` declares the icon, planets (type, position, size, ring), orbit, sparkles and glows. Edit the JSON, re-run, done.
- **`shot.mjs`** — headless screenshots at 640px and 390px. Requests for production image URLs are served from the repo, so you can check an email before deploying. Prints `MISSING ASSETS` if any image 404s.
- **`review.mjs`** — QA renders with realistic values from `samples.json` (raw tags hide wrapping problems): desktop + mobile full pages, flags overflow, missing images and unfilled tags, and builds contact sheets of four mobile renders each.
- **`lint.py`** — the Zyn copy and build linter: banned chatbot phrases, American spellings, em dashes, exclamation marks, staccato or question headlines, trailing full stops, Ask prompts that would wrap, plus `<script>`, light-mode CSS, brand casing, braces, alt text and hardcoded prices. Exit code 1 on errors.
- **`readme_tags.py`** — regenerates the merge-tag tables in this README straight from the templates, so the docs can't drift.
- **`briefs/`** — the product facts, footer variants and design/copy rules the templates were built from.

---

## Merge tags

Written in `{{snake_case}}` — Handlebars/Mustache-style, so they work as-is in Customer.io, Braze, SendGrid, Postmark and Resend. For Mailchimp or Salesforce Marketing Cloud, find-and-replace with that platform's syntax.

<!-- MERGE-TAGS:START -->
43 templates. Tags used by every template:

| Tag | Notes |
|-----|-------|
| `{{help_url}}` | Help centre |
| `{{privacy_url}}` | Privacy policy |
| `{{current_year}}` | e.g. 2026 |
| `{{company_name}}` | Legal entity that sends the email |
| `{{company_address}}` | Registered postal address — **legally required** on marketing sends |

Per template (excluding the shared tags above):

| Template | Tags |
|----------|------|
| `01-early-access` | `{{expiry_date}}`, `{{first_name}}`, `{{activation_url}}`, `{{chat_url}}`, `{{terms_url}}`, `{{recipient_email}}`, `{{preferences_url}}`, `{{unsubscribe_url}}` |
| `02-security-alert` | `{{device_name}}`, `{{city}}`, `{{country}}`, `{{signin_time}}`, `{{timezone}}`, `{{ip_address}}`, `{{signin_date}}`, `{{browser_name}}`, `{{first_name}}`, `{{secure_account_url}}`, `{{sessions_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `03-document-shared` | `{{sharer_name}}`, `{{document_title}}`, `{{page_count_label}}`, `{{sharer_email}}`, `{{first_name}}`, `{{document_type}}`, `{{share_message}}`, `{{generated_date}}`, `{{document_url}}`, `{{chat_url}}`, `{{terms_url}}`, `{{recipient_email}}` |
| `04-password-reset` | `{{expiry_minutes}}`, `{{app_url}}`, `{{reset_password_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `05-pin-reset` | `{{expiry_minutes}}`, `{{set_pin_url}}`, `{{support_email}}`, `{{chat_url}}`, `{{security_url}}`, `{{recipient_email}}` |
| `06-mfa-change` | `{{device_name}}`, `{{change_date}}`, `{{first_name}}`, `{{change_time}}`, `{{timezone}}`, `{{city}}`, `{{country}}`, `{{secure_account_url}}`, `{{sessions_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `07-welcome` | `{{first_name}}`, `{{app_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{terms_url}}`, `{{recipient_email}}`, `{{preferences_url}}`, `{{unsubscribe_url}}` |
| `08-otp-code` | `{{otp_code}}`, `{{expiry_minutes}}`, `{{request_time}}`, `{{timezone}}`, `{{device_name}}`, `{{city}}`, `{{country}}`, `{{first_name}}`, `{{secure_account_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `09-onboarding-abandoned` | `{{minutes_remaining}}`, `{{first_name}}`, `{{resume_onboarding_url}}`, `{{book_setup_url}}`, `{{chat_url}}`, `{{days_saved}}`, `{{terms_url}}`, `{{recipient_email}}`, `{{preferences_url}}`, `{{unsubscribe_url}}` |
| `10-org-invite` | `{{inviter_name}}`, `{{org_name}}`, `{{role_name}}`, `{{expiry_date}}`, `{{inviter_email}}`, `{{first_name}}`, `{{recipient_email}}`, `{{accept_invite_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{terms_url}}` |
| `11-password-changed` | `{{device_name}}`, `{{change_date}}`, `{{change_time}}`, `{{city}}`, `{{recipient_email}}`, `{{first_name}}`, `{{timezone}}`, `{{country}}`, `{{recover_account_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}` |
| `12-product-update` | `{{version_number}}`, `{{feature_1_title}}`, `{{first_name}}`, `{{rollout_note}}`, `{{feature_1_description}}`, `{{feature_2_title}}`, `{{feature_2_description}}`, `{{feature_3_title}}`, `{{feature_3_description}}`, `{{changelog_url}}`, `{{chat_url}}`, `{{notification_settings_url}}` |
| `13-verify-email` | `{{expiry_minutes}}`, `{{recipient_email}}`, `{{signup_date}}`, `{{signup_time}}`, `{{verify_email_url}}`, `{{verification_code}}`, `{{chat_url}}`, `{{terms_url}}` |
| `14-pin-changed` | `{{device_name}}`, `{{change_date}}`, `{{change_time}}`, `{{city}}`, `{{country}}`, `{{timezone}}`, `{{secure_account_url}}`, `{{sessions_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `15-sign-in-paused` | `{{unlock_time}}`, `{{timezone}}`, `{{attempt_date}}`, `{{attempt_time}}`, `{{device_name}}`, `{{browser_name}}`, `{{city}}`, `{{country}}`, `{{ip_address}}`, `{{reset_password_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `16-recovery-admin-requested` | `{{admin_name}}`, `{{request_time}}`, `{{org_name}}`, `{{request_date}}`, `{{timezone}}`, `{{request_id}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `17-recovery-admin-alert` | `{{member_name}}`, `{{first_name}}`, `{{member_initials}}`, `{{device_name}}`, `{{city}}`, `{{country}}`, `{{request_time}}`, `{{member_email}}`, `{{request_date}}`, `{{request_id}}`, `{{support_email}}`, `{{review_request_url}}`, `{{chat_url}}`, `{{security_url}}`, `{{admin_email}}`, `{{org_name}}` |
| `18-backup-codes-new` | `{{device_name}}`, `{{change_time}}`, `{{first_name}}`, `{{city}}`, `{{country}}`, `{{change_date}}`, `{{timezone}}`, `{{secure_account_url}}`, `{{sessions_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `19-backup-codes-viewed` | `{{city}}`, `{{device_name}}`, `{{browser_name}}`, `{{view_time}}`, `{{first_name}}`, `{{timezone}}`, `{{view_date}}`, `{{country}}`, `{{backup_codes_url}}`, `{{secure_account_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `20-recovery-phone-updated` | `{{masked_phone}}`, `{{first_name}}`, `{{change_date}}`, `{{change_time}}`, `{{timezone}}`, `{{device_name}}`, `{{secure_account_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `21-alternate-email-verify` | `{{verification_code}}`, `{{expiry_minutes}}`, `{{recipient_email}}`, `{{support_email}}`, `{{chat_url}}`, `{{terms_url}}` |
| `22-alternate-email-updated` | `{{masked_alternate_email}}`, `{{old_masked_alternate_email}}`, `{{change_date}}`, `{{device_name}}`, `{{first_name}}`, `{{change_time}}`, `{{timezone}}`, `{{city}}`, `{{country}}`, `{{secure_account_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `23-address-updated` | `{{address_city}}`, `{{address_country}}`, `{{change_date}}`, `{{device_name}}`, `{{first_name}}`, `{{change_time}}`, `{{timezone}}`, `{{secure_account_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{security_url}}`, `{{recipient_email}}` |
| `24-account-deleted` | `{{deletion_date}}`, `{{deletion_time}}`, `{{timezone}}`, `{{recipient_email}}`, `{{signup_url}}`, `{{support_email}}`, `{{privacy_email}}`, `{{terms_url}}` |
| `25-account-suspended` | `{{suspension_date}}`, `{{case_id}}`, `{{suspension_reason}}`, `{{recipient_email}}`, `{{appeal_url}}`, `{{acceptable_use_url}}`, `{{support_email}}`, `{{security_url}}` |
| `26-data-export-ready` | `{{export_range}}`, `{{download_expiry}}`, `{{export_format}}`, `{{file_size}}`, `{{request_date}}`, `{{recipient_email}}`, `{{download_url}}`, `{{secure_account_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{terms_url}}` |
| `27-subscription-confirmed` | `{{amount}}`, `{{card_brand}}`, `{{card_last4}}`, `{{invoice_number}}`, `{{first_name}}`, `{{plan_period}}`, `{{plan_name}}`, `{{next_charge_date}}`, `{{app_url}}`, `{{invoice_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{billing_url}}`, `{{billing_email}}` |
| `28-payment-receipt` | `{{invoice_number}}`, `{{amount}}`, `{{plan_name}}`, `{{plan_interval}}`, `{{card_brand}}`, `{{card_last4}}`, `{{next_charge_date}}`, `{{first_name}}`, `{{invoice_date}}`, `{{invoice_url}}`, `{{billing_url}}`, `{{chat_url}}`, `{{billing_email}}` |
| `29-renewal-reminder` | `{{renewal_date}}`, `{{amount}}`, `{{card_brand}}`, `{{card_last4}}`, `{{first_name}}`, `{{renewal_month}}`, `{{renewal_day}}`, `{{renewal_year}}`, `{{plan_name}}`, `{{plan_interval}}`, `{{billing_url}}`, `{{chat_url}}`, `{{billing_email}}` |
| `30-payment-failed` | `{{amount}}`, `{{grace_end_date}}`, `{{plan_name}}`, `{{first_name}}`, `{{card_brand}}`, `{{card_last4}}`, `{{attempt_date}}`, `{{update_payment_url}}`, `{{support_email}}`, `{{chat_url}}`, `{{billing_url}}`, `{{billing_email}}` |
| `31-card-expiring` | `{{card_brand}}`, `{{card_last4}}`, `{{card_expiry}}`, `{{amount}}`, `{{next_charge_date}}`, `{{first_name}}`, `{{update_payment_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{billing_url}}`, `{{billing_email}}` |
| `32-billing-details-updated` | `{{device_name}}`, `{{change_time}}`, `{{first_name}}`, `{{change_date}}`, `{{changed_fields}}`, `{{card_brand}}`, `{{card_last4}}`, `{{billing_email}}`, `{{billing_city}}`, `{{billing_country}}`, `{{secure_account_url}}`, `{{chat_url}}`, `{{billing_url}}` |
| `33-plan-changed` | `{{new_plan}}`, `{{effective_date}}`, `{{amount}}`, `{{plan_period}}`, `{{first_name}}`, `{{old_plan}}`, `{{old_amount}}`, `{{old_plan_period}}`, `{{next_charge_date}}`, `{{billing_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{billing_email}}` |
| `34-subscription-cancelled` | `{{access_until}}`, `{{card_brand}}`, `{{first_name}}`, `{{cancel_date}}`, `{{amount_paid}}`, `{{cancel_refund_amount}}`, `{{resume_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{billing_url}}`, `{{billing_email}}` |
| `35-subscription-resumed` | `{{plan_name}}`, `{{amount}}`, `{{next_charge_date}}`, `{{first_name}}`, `{{card_brand}}`, `{{card_last4}}`, `{{plan_period}}`, `{{plan_interval}}`, `{{app_url}}`, `{{billing_url}}`, `{{chat_url}}`, `{{billing_email}}` |
| `36-subscription-ended` | `{{end_date}}`, `{{first_name}}`, `{{plan_name}}`, `{{plan_interval}}`, `{{amount}}`, `{{plan_period}}`, `{{renew_url}}`, `{{support_email}}`, `{{billing_url}}`, `{{billing_email}}` |
| `37-refund-issued` | `{{refund_amount}}`, `{{card_brand}}`, `{{card_last4}}`, `{{refund_days}}`, `{{invoice_number}}`, `{{first_name}}`, `{{refund_date}}`, `{{refund_reason}}`, `{{invoice_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{billing_url}}`, `{{billing_email}}` |
| `38-feature-retiring` | `{{feature_name}}`, `{{retirement_date}}`, `{{replacement_name}}`, `{{first_name}}`, `{{retirement_month}}`, `{{retirement_day}}`, `{{retirement_year}}`, `{{action_needed}}`, `{{details_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{notification_settings_url}}` |
| `39-planned-maintenance` | `{{maintenance_start}}`, `{{timezone}}`, `{{maintenance_end}}`, `{{first_name}}`, `{{impact}}`, `{{status_url}}`, `{{chat_url}}`, `{{support_email}}`, `{{notification_settings_url}}` |
| `40-weekly-briefing` | `{{week_range}}`, `{{story_1_title}}`, `{{first_name}}`, `{{story_1_tag}}`, `{{story_1_summary}}`, `{{story_1_source}}`, `{{story_1_url}}`, `{{story_2_tag}}`, `{{story_2_title}}`, `{{story_2_summary}}`, `{{story_2_source}}`, `{{story_2_url}}`, `{{story_3_tag}}`, `{{story_3_title}}`, `{{story_3_summary}}`, `{{story_3_source}}`, `{{story_3_url}}`, `{{news_url}}`, `{{chat_url}}`, `{{terms_url}}`, `{{recipient_email}}`, `{{preferences_url}}`, `{{unsubscribe_url}}` |
| `41-org-in-the-news` | `{{org_followed}}`, `{{article_source}}`, `{{article_date}}`, `{{article_title}}`, `{{first_name}}`, `{{article_summary}}`, `{{article_url}}`, `{{following_url}}`, `{{chat_url}}`, `{{terms_url}}`, `{{recipient_email}}`, `{{preferences_url}}`, `{{unsubscribe_url}}` |
| `42-annual-offer` | `{{offer_saving}}`, `{{current_price}}`, `{{annual_price}}`, `{{offer_deadline}}`, `{{first_name}}`, `{{annual_per_month}}`, `{{switch_url}}`, `{{chat_url}}`, `{{terms_url}}`, `{{recipient_email}}`, `{{preferences_url}}`, `{{unsubscribe_url}}` |
| `43-support-received` | `{{ticket_id}}`, `{{first_name}}`, `{{ticket_subject}}`, `{{received_time}}`, `{{timezone}}`, `{{chat_url}}`, `{{terms_url}}`, `{{recipient_email}}` |
<!-- MERGE-TAGS:END -->

### Things to wire up by hand

**Recipients aren't always the account address.** `17-recovery-admin-alert` goes to the organisation administrator (`{{admin_email}}`). `21-alternate-email-verify` goes to the *new* alternate address. Billing emails (27–37) go to the billing email (`{{billing_email}}`), which the app keeps separate ("Invoices and receipts go here"). Everything else goes to the account email.

**Expiry windows.** The app's own reset emails say links expire in 30 minutes; the templates use `{{expiry_minutes}}` so the value comes from your backend. Same for codes (`08`, `13`, `21`). `15` shows when sign-in reopens as a clock time, `{{unlock_time}}` in `{{timezone}}`.

**Dates in pieces.** The calendar tiles in `29` and `38` take the date as parts: `{{renewal_month}}` / `{{renewal_day}}` / `{{renewal_year}}` and `{{retirement_month}}` / `{{retirement_day}}` / `{{retirement_year}}`, with a short month (`Jul`). The full date tags are still used in the copy.

**Plan wording.** `{{plan_interval}}` is the plan's name as the app shows it (`Monthly`, `Annual`); `{{plan_period}}` is the unit after "per" or "once a" (`month`, `year`). `33` also takes `{{old_plan_period}}`. `34`'s `{{cancel_refund_amount}}` is what was refunded at cancellation; the app shows £0.00 because access runs to the end of the term.

**A few recipients and senders need care.**
- When the billing email itself changes, send `32` to the old billing address too, so the owner hears about it.
- `09` and `43` invite the reader to reply, so they need a monitored reply-to address. The security sender is no-reply.
- In `06`, `{{device_name}}` is the device the authenticator was newly paired on, not the one that signed in.

**Confirm with product.** `13` says *"Nothing goes live until the address is confirmed"*. Check that an unverified account really can't be used.

**App updates are always on.** `12`, `38` and `39` follow the app's policy ("App updates cannot be turned off") and link to notification settings instead of an unsubscribe. If legal review classes any release email as promotional, swap in the *optin* footer.

**09 is the "stopped before the first question" variant.** The checklist (two done, "You're here" on *Ask your first question*, one to go), the segmented bar and the "halfway there" chip are static markup, so the copy and the art always agree. Only `{{minutes_remaining}}` and `{{days_saved}}` are dynamic. If people drop off at other steps too, duplicate the file per drop-off point and move the "You're here" row and the bar fill. Swap the step names if the real signup flow differs.

**03's share note** is wrapped in Handlebars `{{#if share_message}} … {{/if}}`, so an empty note renders no quote marks. If your ESP uses a different conditional syntax (Liquid, AMPscript), translate those two markers. `{{page_count_label}}` is the full phrase, e.g. `8 pages` or `1 page`, so the plural is always right.

**Content slots.** The weekly briefing (`40`) takes three stories (`{{story_1_title}}` … `{{story_3_url}}`), the release email (`12`) three features plus a `{{rollout_note}}`, and the offer (`42`) its prices and saving as tags — never hardcoded, because prices change.

**Subject lines** live in each file's `<title>`; most ESPs set the subject separately, so copy them across. The **preheader** (the grey text after the subject in an inbox list) is the hidden `<div>` right after `<body>`.

---

## Client support

Table-based, fully inline styles, solid-colour fallbacks throughout.

- **Outlook (Windows)** — buttons are VML `<v:roundrect>` with a VML gradient fill, so the gradient CTA survives; content is wrapped in an MSO 600px ghost table; `mso-line-height-rule: exactly` keeps line heights honest.
- **Gradients** — the CTA carries a solid `#9A86EC` under its CSS gradient, so clients that drop `background-image` still show a branded button.
- **Web fonts** — Hahmlet and DM Sans load via Google Fonts where supported (Apple Mail, iOS); elsewhere they fall back to Georgia and Helvetica/Arial.
- **Mobile** — single breakpoint at 620px; padding tightens and the headline steps down. Buttons are already full-width. The split heroes (`01`, `05`, `41`) use fluid inline-block columns, so they stack on phones even in clients that ignore media queries. Every template is checked at 360, 390 and 640px with no horizontal overflow.
- **Dark mode** — the templates are designed dark and declare it. Still worth a real-inbox test: some Gmail and Outlook apps apply their own dark-mode adjustments.

## Preview viewer

`index.html` is an inbox-style browser in the app's look: all 43 emails grouped by category (Onboarding, Sign-in & recovery, Security updates, Account & data, Billing, App updates, News & offers, Support) with hero thumbnails, a search box, subjects and preheaders read live from each template, a **Desktop / Mobile** width toggle, arrow-key navigation and deep links (`index.html#27`).

- **Sample data / Merge tags.** By default every `{{tag}}` is filled from `samples.json` (a fictional customer, real-looking dates, £ amounts and a masked card), so you see each email the way a customer would. Switch to *Merge tags* to see the raw template. The templates themselves are never modified.
- **Links** in the preview don't navigate; clicking one shows which merge tag it uses (*Links to `{{reset_password_url}}`*).
- Served from anywhere other than production (localhost, a preview deploy), image URLs are pointed at that origin, so you see local changes before they ship.

```bash
npx serve
```
