# Footer variants — use exactly one, as named in your assignment

Every footer starts with the golden divider + identity block. Copy this opening verbatim, then the variant's LINKS and LEGAL paragraphs.

```html
  <!-- footer : VARIANT-NAME -->
  <tr><td class="px" style="padding:44px 40px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="height:1px;line-height:1px;font-size:1px;background-color:#1C1E27;">&nbsp;</td></tr></table>
  </td></tr>
  <tr><td align="center" class="px" style="padding:30px 40px 40px;">
    <img src="https://humaine-email.vercel.app/img/brand/mark-96.png" width="40" height="39" alt="humAIne" style="display:block;width:40px;height:39px;border:0;margin:0 auto;">
    <p style="margin:12px 0 0;font-family:'Hahmlet',Georgia,'Times New Roman',serif;font-size:15px;line-height:20px;color:#C9C3F2;">hum<span style="color:#8FA0FF;">AI</span>ne</p>
    <p style="margin:4px 0 0;font-family:'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#7D7F8F;">Disruptively Human . Trust Co-created.</p>
    LINKS
    LEGAL
  </td></tr>
```

LINKS paragraph shell (separator is `&nbsp;&nbsp;<span style="color:#3A3C48;">&middot;</span>&nbsp;&nbsp;`; links `color:#A3A5B5;text-decoration:none;`):
`<p style="margin:18px 0 0;font-family:'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12.5px;line-height:18px;"> … </p>`

LEGAL paragraph shell:
`<p style="margin:18px 0 0;font-family:'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.7;color:#565869;"> … </p>`
In-legal links use `style="color:#7D7F8F;"`.

## 1. security — security & account notices (always on, no unsubscribe)
LINKS: Help centre `{{help_url}}` · Security `{{security_url}}` · Privacy `{{privacy_url}}`
LEGAL: `Security notification sent to {{recipient_email}}. These can&rsquo;t be switched off while your account is active.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}<br>humAIne is a Zyn Global product.`
(You may tailor the first sentence to the email, e.g. "Sign-in code sent to … because someone asked for one." — keep the "can't be switched off" meaning.)

## 2. account — non-security service mail (e.g. data export, account deleted, org invite)
LINKS: Help centre `{{help_url}}` · Privacy `{{privacy_url}}` · Terms `{{terms_url}}`
LEGAL: `Sent to {{recipient_email}} because REASON. It&rsquo;s a one-off service message, so there&rsquo;s nothing to unsubscribe from.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}<br>humAIne is a Zyn Global product.`

## 3. billing — anything the user is charged for (always reaches them)
LINKS: Help centre `{{help_url}}` · Billing `{{billing_url}}` · Privacy `{{privacy_url}}`
LEGAL: `Sent to your billing email, {{billing_email}}. Emails about charges always reach you while you have a humAIne plan.<br>humAIne Personal is operated by Zyn Global.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}`

## 4. updates — App updates (always on by product policy)
LINKS: Help centre `{{help_url}}` · Notification settings `{{notification_settings_url}}` · Privacy `{{privacy_url}}`
LEGAL: `App updates can&rsquo;t be switched off &mdash; they&rsquo;re how you find out something you rely on is changing before it changes. Everything else is in <a href="{{notification_settings_url}}" style="color:#7D7F8F;">Notification settings</a>.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}<br>humAIne is a Zyn Global product.`

## 5. optin — News & PR, Promotions (user opted in; unsubscribe required)
LINKS: Help centre `{{help_url}}` · Privacy `{{privacy_url}}` · Terms `{{terms_url}}`
LEGAL: `You&rsquo;re receiving this because you turned on CATEGORY emails for {{recipient_email}}.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}<br><a href="{{preferences_url}}" style="color:#7D7F8F;">Email preferences</a>&nbsp;&middot;&nbsp;<a href="{{unsubscribe_url}}" style="color:#7D7F8F;">Unsubscribe</a><br>humAIne is a Zyn Global product.`
(CATEGORY = "News &amp; PR" or "Promotions".)

## 6. lifecycle — onboarding/lifecycle (as in 01, 07, 09)
LINKS: Help centre `{{help_url}}` · Privacy `{{privacy_url}}` · Terms `{{terms_url}}`
LEGAL: `You&rsquo;re receiving this because {{recipient_email}} REASON.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}<br><a href="{{preferences_url}}" style="color:#7D7F8F;">Email preferences</a>&nbsp;&middot;&nbsp;<a href="{{unsubscribe_url}}" style="color:#7D7F8F;">Unsubscribe</a><br>humAIne is a Zyn Global product.`

## 7. admin — sent to an organisation administrator
LINKS: Help centre `{{help_url}}` · Security `{{security_url}}` · Privacy `{{privacy_url}}`
LEGAL: `Sent to {{admin_email}} because you&rsquo;re an administrator of {{org_name}} on humAIne. Admin notices can&rsquo;t be switched off while you hold that role.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}<br>humAIne is a Zyn Global product.`

## 8. support — automatic reply from support
LINKS: Help centre `{{help_url}}` · Privacy `{{privacy_url}}` · Terms `{{terms_url}}`
LEGAL: `This is an automatic reply to your message to humAIne Support from {{recipient_email}}. Reply to this email to add anything &mdash; it lands in the same conversation.<br>&copy; {{current_year}} {{company_name}} &middot; {{company_address}}<br>humAIne is a Zyn Global product.`
