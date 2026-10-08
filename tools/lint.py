"""Zyn copy + build linter for the humAIne email templates.

    python3 tools/lint.py                 # every template
    python3 tools/lint.py 04 15 27        # just these (by number or file stem)

Flags AI-generated tells and build mistakes. Errors break the build rules; warnings are things a
human should look at. Exit code 1 if any errors.
"""
import html
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent

BANNED = [
    'no judgement', 'happens to everyone', 'nothing to see here', 'rest assured', "don't worry", "we've got you covered",
    'seamless', 'effortless', 'unlock', 'elevate', 'journey', 'dive in', 'welcome aboard', "we're excited", 'exciting news',
    'stay tuned', 'simply', 'game-changer', 'game changer', 'supercharge', 'harness', 'empower', 'leverage', "here's the thing",
    'pro tip', 'spoiler', 'no lecture', 'pretend this never happened', 'finished the whole email', 'precisely nothing',
    'on duty', 'take the keys', 'bolt the door', 'no encores', 'still warm', 'look no further', 'in today',
]
AMERICAN = {
    r'\borganiz': 'organis-', r'\bcenter\b': 'centre', r'\bcolor': 'colour', r'\bauthoriz': 'authoris-',
    r'\bfavorite': 'favourite', r'\bbehavior': 'behaviour', r'\bcanceled\b': 'cancelled', r'\bcanceling\b': 'cancelling',
    r'\bpersonaliz': 'personalis-', r'\brecogniz': 'recognis-', r'\bapologiz': 'apologis-', r'\banalyz': 'analys-',
}


def visible_text(src):
    body = re.sub(r'(?is)<head.*?</head>|<!--.*?-->|<style.*?</style>', ' ', src)
    body = re.sub(r'(?s)<[^>]+>', ' ', body)
    return re.sub(r'\s+', ' ', html.unescape(body)).strip()


def lint(path):
    src = path.read_text()
    errors, warns = [], []
    text = visible_text(src)
    lower = re.sub(r'\{\{[^}]*\}\}', ' ', text).lower()  # merge-tag names are not copy

    if '<script' in src.lower():
        errors.append('contains <script>')
    if 'theme-light' in src:
        errors.append('contains light-mode CSS (theme-light)')
    if re.search(r'Hum[Aa][Ii]ne|HUMAINE|\bHumaine\b', text.replace('humAIne', '')):
        errors.append('brand casing: write humAIne')
    if src.count('{{') != src.count('}}'):
        errors.append(f'unbalanced merge-tag braces ({src.count("{{")} vs {src.count("}}")})')
    for img in re.findall(r'<img\b[^>]*>', src):
        if 'alt=' not in img:
            errors.append('img without alt')
    if re.search(r'£\s?\d|\$\s?\d', text):
        warns.append('hardcoded money amount (use a merge tag)')

    for phrase in BANNED:
        if phrase in lower:
            warns.append(f'banned phrase: "{phrase}"')
    for pattern, uk in AMERICAN.items():
        if re.search(pattern, lower):
            warns.append(f'American spelling ({pattern.strip(chr(92) + "b")} -> {uk})')
    dashes = text.count('—')
    if dashes > 1:
        warns.append(f'{dashes} em dashes (max 1)')
    if '!' in re.sub(r'\{\{[^}]*\}\}', '', text):
        warns.append('exclamation mark')

    h1 = re.search(r'(?is)<h1[^>]*>(.*?)</h1>', src)
    headline = visible_text(h1.group(1)) if h1 else ''
    if not headline:
        errors.append('no <h1> headline')
    else:
        beats = [b for b in re.split(r'[.?!]\s*', headline) if b.strip()]
        if len(beats) >= 2 and all(len(b.split()) <= 5 for b in beats):
            warns.append(f'staccato "X. Y." headline: "{headline}"')
        if headline.endswith('?'):
            warns.append(f'question headline: "{headline}"')
        if headline.endswith('.'):
            warns.append(f'headline ends with a full stop (app headings never do): "{headline}"')
    title = re.search(r'(?is)<title>(.*?)</title>', src)
    subject = html.unescape(title.group(1)).strip() if title else ''
    if not subject:
        errors.append('no <title> subject line')
    elif subject.endswith('.'):
        warns.append(f'subject ends with a full stop: "{subject}"')

    m = re.search(r'Ask humAIne</p>\s*<a[^>]*>(.*?)</a>', src, re.S)
    if m:
        prompt = visible_text(m.group(1)).strip('“”"')
        if len(prompt) > 22:
            warns.append(f'Ask prompt is {len(prompt)} chars (wraps at 390px; aim <= 22): "{prompt}"')
    return headline, errors, warns


def main():
    picks = sys.argv[1:]
    files = sorted(REPO.glob('[0-9][0-9]-*.html'))
    if picks:
        files = [f for f in files if any(f.stem == p or f.stem.startswith(p + '-') or f.stem.startswith(p) for p in picks)]
    headlines, total_err, total_warn = {}, 0, 0
    for f in files:
        headline, errors, warns = lint(f)
        headlines.setdefault(headline.lower(), []).append(f.stem)
        status = 'ERROR' if errors else ('warn' if warns else 'ok')
        print(f'{status:5}  {f.stem}  — {headline}')
        for e in errors:
            print(f'         x {e}')
        for w in warns:
            print(f'         ! {w}')
        total_err += len(errors)
        total_warn += len(warns)
    for h, stems in headlines.items():
        if h and len(stems) > 1:
            print(f'warn   duplicate headline in {", ".join(stems)}: "{h}"')
            total_warn += 1
    print(f'\n{len(files)} templates · {total_err} errors · {total_warn} warnings')
    sys.exit(1 if total_err else 0)


if __name__ == '__main__':
    main()
