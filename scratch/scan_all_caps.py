with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

import re

for i, line in enumerate(lines):
    # Check for text in JSX (outside tags)
    tags_removed = re.sub(r'<[^>]+>', ' ', line)
    # Check for all-caps words of length >= 2
    caps = re.findall(r'\b[A-Z]{2,}\b', tags_removed)
    if caps:
        # filter out JSX/React keywords like ID, UI, etc.
        filtered = [c for c in caps if c not in ['ID', 'UI', 'FAQ', 'URL', 'SEO']]
        if filtered:
            print(f"Line {i+1}: {filtered} in: {line.strip()[:100]}")
