"""Rebuild the merge-tag section of README.md from the templates themselves.

    python3 tools/readme_tags.py

Writes between the <!-- MERGE-TAGS:START --> and <!-- MERGE-TAGS:END --> markers.
"""
import pathlib
import re

REPO = pathlib.Path(__file__).resolve().parent.parent
NOTES = {
    'first_name': 'Recipient first name',
    'recipient_email': 'Address the email is sent to',
    'company_name': 'Legal entity that sends the email',
    'company_address': 'Registered postal address — **legally required** on marketing sends',
    'current_year': 'e.g. 2026',
    'chat_url': 'Deep link into humAIne chat (the Ask humAIne card)',
    'help_url': 'Help centre',
    'privacy_url': 'Privacy policy',
    'terms_url': 'Terms',
    'security_url': 'Security settings / centre',
    'support_email': 'Support address',
}


def tags_in(html):
    found = re.findall(r'\{\{([a-z0-9_]+)\}\}', html)
    return sorted(set(found), key=lambda t: html.index('{{' + t + '}}'))


def main():
    files = sorted(REPO.glob('[0-9][0-9]-*.html'))
    tags = {f.stem: tags_in(f.read_text()) for f in files}
    common = set.intersection(*(set(v) for v in tags.values()))
    first = tags[files[0].stem]

    out = [f'{len(files)} templates. Tags used by every template:', '', '| Tag | Notes |', '|-----|-------|']
    for t in sorted(common, key=lambda t: (first.index(t) if t in first else 99, t)):
        out.append(f'| `{{{{{t}}}}}` | {NOTES.get(t, "")} |')
    out += ['', 'Per template (excluding the shared tags above):', '', '| Template | Tags |', '|----------|------|']
    for stem, ts in tags.items():
        own = [t for t in ts if t not in common]
        out.append(f'| `{stem}` | ' + ', '.join(f'`{{{{{t}}}}}`' for t in own) + ' |')

    readme = REPO / 'README.md'
    text = readme.read_text()
    block = '<!-- MERGE-TAGS:START -->\n' + '\n'.join(out) + '\n<!-- MERGE-TAGS:END -->'
    text = re.sub(r'<!-- MERGE-TAGS:START -->.*?<!-- MERGE-TAGS:END -->', block, text, flags=re.S)
    readme.write_text(text)
    print(f'README merge tags rebuilt from {len(files)} templates')


if __name__ == '__main__':
    main()
