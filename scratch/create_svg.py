import re

with open('scratch/nav_logo.html', 'r', encoding='utf-8') as f:
    svg_content = f.read()

paths = re.findall(r'<path[^>]+>', svg_content)
# The first two paths are the mark
mark_paths = paths[:2]

# Let's inspect the two paths
for i, p in enumerate(mark_paths):
    print(f"Path {i}: length {len(p)}")
    print(p[:200])

# Let's create an SVG containing only these 2 paths
# The viewBox for the full SVG is 0 0 1316 376. The mark is located within roughly x: 0 to 380, y: 0 to 376
mark_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 376" width="100%" height="100%">
  {mark_paths[0]}
  {mark_paths[1]}
</svg>'''

with open('public/twostep-mark.svg', 'w', encoding='utf-8') as f:
    f.write(mark_svg)

print("Saved public/twostep-mark.svg")
