# humAIne — product facts for email copy

Everything below was read from the live humAIne app (humaine-personal-mobile.vercel.app, current build) — its screens, settings,
policies, FAQ and in-app notifications. Write copy that is TRUE to these facts. Never invent features, numbers or behaviour.
If something you need isn't here, use a merge tag instead of guessing a value.

## What humAIne is
- humAIne is "a security companion": it reviews your security posture, explains what a risk means, and helps you decide what to do next.
- FAQ: "A co-creator for security leaders. It reads what is happening across your estate and the wider world, answers in plain
  language, and shows its working — you can always ask where an answer came from."
- Surfaces: **Chat** (incl. voice conversation and **private mode** — a conversation that never reaches history), **News** (security
  news briefings; "Ask about this news", source articles, translation, share summary), and documents/files it generates or you attach.
- Typical topics users ask about (from the app's chat list): "Is my account secure?", passkey setup, app permissions, suspicious email
  checks, VPN recommendations, zero-trust, data-breach exposure scans, ransomware posture board updates, phishing simulation results.
- Organisations exist (an organisation can set shorter retention; members can have an administrator). No workspaces, dashboards,
  teams or data sources — never mention those.
- Brand name is written **humAIne** (lowercase h). Tagline: "Disruptively Human . Trust Co-created." humAIne Personal is operated by Zyn Global.
- Security emails are sent as: **humAIne Security <no-reply@zynglobal.ai>** (from the app's own demo inbox).

## Accounts & sign-in
- Accounts are created on the **web** at humaine.zynglobal.ai; the mobile app only signs in. Sign-in options: email + password, or
  Google / Microsoft / Apple (federated users have no humAIne password).
- **MFA is mandatory**: an authenticator code is asked at every sign-in. Alternatives on that screen: a **backup code** ("each works once")
  or a **recovery method** ("Send a code to your email or mobile").
- **Lockout**: after **three** failed attempts, sign-in is paused: "Sign-in paused — Three attempts did not match. Try again in {time},
  or reset your password — that is the quickest way back in."
- **Password policy**: 16–64 characters; upper- and lower-case letters and a number; no repeated characters (aaa), sequential patterns
  (1234, abcd) or keyboard patterns (qwerty); not a common or previously breached password; must not contain your name, organisation or product name.

## Forgot password / PIN (signed out)
- Forgot password: enter email → enter your **Unique PIN** → enter MFA code (or backup code / recovery method) → reset email.
- App's own reset email spec (demo inbox): subject "Reset your humAIne password"; body "We received a request to reset the password for
  your humAIne account. Choose a new password using the button below."; button "Reset password"; "This link expires in 30 minutes.";
  footnote "If you didn't request a password reset, you can safely ignore this email — your password won't change."
- Same pattern for PIN: subject "Reset your humAIne PIN"; "…reset the unique PIN for your humAIne account. Choose a new PIN using the
  button below."; button "Reset PIN"; 30 minutes; "If you didn't request a PIN reset, you can safely ignore this email — your PIN won't change."
- If the recovery method can't be used: "Verify it's you" — confirm first/last name, **registered address**, and answer "What was a
  topic or interaction you had with humAIne?" → "Verify and send reset link". If they can't confirm those: "I can't confirm these —
  contact my admin" → "Your administrator will get back to you shortly." (admin-assisted recovery).
- After a reset: "Your password has been updated. You can now sign in with your new password."

## Unique PIN
- A **6–8 digit identity verification PIN** set at registration ("Your 6–8 digit identity verification PIN"). It is used to verify
  identity (e.g. in password recovery). It is NOT a device unlock PIN.
- Rules: 6 to 8 digits; numbers only; no repeated digits (111111); no sequential pattern (123456).
- Signed in, you can change it in Account Settings → Security Settings → Unique PIN → Change, without the old PIN.

## Security settings (signed in)
- Sign-in & recovery: Password, Unique PIN, **Recovery Phone** (verification codes are sent on **WhatsApp**: "Your code will be sent to
  this number on WhatsApp."), **Alternate Email**.
- Changing a recovery phone or alternate email first asks for the one already on the account ("Confirm Current Email" / "Verify
  Identity"), then verifies the new one with a code ("Verify New Email … to confirm it belongs to you"). Toast: "Alternate email updated".
- **Multi-Factor Authentication** — Active · Authenticator app. **Backup Codes** ("Each code can only be used once"); regenerating them
  means "Your previous codes no longer work." **Reset Auth Code** = re-pair the authenticator: "Scan this QR code with your
  authenticator app to re-pair it with your account." + number matching: "Approve the notification we sent to your app by entering the number shown here."
  There is NO option to turn two-factor off.
- In-app security notifications seen in the app: "New sign-in on iPhone 15 Pro — Leicester Square, London · 192.168.1.47. Not you?
  Change your password." and "Backup codes viewed — Macbook Pro · Chrome, 18:20."
- **Active Sessions**: "Devices currently signed in to your account"; you can end any session.
- **Export Data**: "Select a time range and format to export your chat history and generated content." FAQ: "it is prepared and sent to
  the address on the account."
- **Delete account**: three steps on purpose; "Deleting your account removes it, your details and everything you have done in humAIne.
  It happens straight away and cannot be undone." Certain details are kept only where the law requires (billing records, 7 years).

## Profile
- **Registered address**: "Where you live, for verifying your account. Invoices go to the billing address." (It is identity-verification data.)
- Language: "Choose the language humAIne replies in".

## Retention & policies
- Conversations are kept for **90 days** from the last message, then permanently deleted. Private conversations are never stored.
- Security records (sign-ins, security changes, sessions): 12 months. Billing records: 7 years (survive account deletion).
- Acceptable use: humAIne must not be used to attack systems you don't own/aren't permitted to test, break the law, or upload others'
  personal data. "We may suspend an account while we look into it, and we will tell you why."
- Privacy contact: privacy@zynglobal.ai; data requests answered within 30 days.

## Notifications (the product's own email taxonomy)
"Push goes to this device; email goes to {account email}." Rule: "A sign-in you did not make, a change to your account and anything
you are charged for always reach you, by push and by email."
| id | Title | About | Email |
|---|---|---|---|
| security | Security updates | "A new sign-in, a device added, a password or PIN changed, and anything that looks like someone else getting in." | always on — "Security updates cannot be turned off. They are how you find out that something happened to your account when it was not you." |
| updates | App updates | "A version worth updating to, a feature being retired, and planned work that will interrupt you." | always on — "App updates cannot be turned off. They are how you find out that something you rely on is changing before it changes." |
| news | News & PR | "Briefings on what has happened in security this week, and anything written about the organisations you follow." | email OFF by default (opt-in) |
| promotions | Promotions | "Offers, plan news, and the occasional thing we think you would want. Off unless you ask for it." | email OFF by default (opt-in) |

## Billing — humAIne Personal
- Plans: **Monthly** (£99/month, "Monthly subscription · cancel anytime") and **Annual** (£1,099/year, "Annual subscription · renews {date}").
  Use merge tags for amounts/dates — never hardcode prices.
- In-app promotion seen: "Annual costs two months less — Switch before your renewal on {date}."
- **Auto-renew**: "Renews on {date} using your default card." Off: "Your plan will not renew. Access ends at the close of the current term."
- Payment: Visa / Mastercard; "Card details go straight to our payment provider — humAIne never stores them." Updating payment details
  ("Update payment details") also holds the **name and address that go on the invoice** — leave the card blank to change only those.
- **Billing email**: "Invoices and receipts go here." After paying: "Confirmation sent to {billing email}".
- Invoices: numbers like HUM-2026-0114; line e.g. "humAIne Personal · Annual"; status Paid / Refunded; downloadable PDF; "Invoices
  stay available after you cancel." Refunds appear as negative "Total refunded".
- **Cancel**: "Type your name to confirm"; shows "Paid for this term", "Access until {date}", "Refunded today £0.00". After cancelling:
  "Cancelled — you keep full access until {date}." "Nothing more is charged", "Your chats, files and invoices stay", "You can subscribe
  again any time." After the date it is read-only.
- **Resume**: "Start your plan again? Auto-renew comes back on. Nothing about the plan itself changes."
- **Ended / expired**: "Your subscription has ended. Conversations are paused. Renew on the web and they start again straight away —
  nothing has been deleted." "Everything else still works: your chats, files, invoices and settings." "Chat and News need a subscription."
- **Card declined** (FAQ): "Nothing was charged and the card on file is unchanged. Try it again, or use a different card — and if it
  keeps happening, Contact support is faster than guessing."

## Support
- Help & support: FAQ, Contact support (by email), Report a bug, Send feedback. "Our team answers emails 7 days a week."
- Bug reports: "We do not always write back about bugs, but we do read every one of them." (So: no bug-report email.)
