with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Extract all text inside main tag
main_match = re.search(r'<main[^>]*>(.*?)</main>', text, re.DOTALL)
if main_match:
    main_text = main_match.group(1)
    # find all strings between > and <
    nodes = re.findall(r'>([^<]+)<', main_text)
    for n in nodes:
        cleaned = n.strip()
        if not cleaned or cleaned.startswith('{') or cleaned.startswith('/*'):
            continue
        # Check if entire text or word is all caps
        words = re.findall(r'\b[A-Z]{2,}\b', cleaned)
        if words:
            print(f"Node: '{cleaned}' -> Caps: {words}")
