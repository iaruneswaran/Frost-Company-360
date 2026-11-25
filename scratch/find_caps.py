import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print('=== UPPERCASE CSS CLASSES ===')
for i, line in enumerate(lines):
    if 'uppercase' in line:
        print(f"Line {i+1}: {line.strip()}")

print('\n=== ALL-CAPS TEXT IN JSX (words with >=2 capital letters) ===')
for i, line in enumerate(lines):
    # Skip import, svg paths, class names, urls, comments
    stripped = line.strip()
    if stripped.startswith('//') or stripped.startswith('import ') or stripped.startswith('/*'):
        continue
    # find text content between tags or string literals in JSX
    texts = re.findall(r'>([^<]+)<', line)
    for t in texts:
        t_clean = t.strip()
        if not t_clean:
            continue
        # check for all-caps words (2 or more letters)
        caps_words = re.findall(r'\b[A-Z]{2,}\b', t_clean)
        if caps_words:
            print(f"Line {i+1}: text='{t_clean}' caps={caps_words}")

print('\n=== OBJECT LITERAL STRINGS WITH ALL-CAPS ===')
for i, line in enumerate(lines):
    quotes = re.findall(r"['\"]([^'\"]+)['\"]", line)
    for q in quotes:
        caps_words = re.findall(r'\b[A-Z]{3,}\b', q)
        if caps_words and not any(skip in q for skip in ['http', 'bg-', 'text-', 'border-', 'rounded-', 'px-', 'py-']):
            print(f"Line {i+1}: string='{q}' caps={caps_words}")
