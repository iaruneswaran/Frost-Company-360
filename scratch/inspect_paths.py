import re

with open('scratch/nav_logo.html', 'r', encoding='utf-8') as f:
    svg = f.read()

paths = re.findall(r'<path[^>]+transform="translate\(([^)]+)\)"', svg)
print("Transforms:", paths)
