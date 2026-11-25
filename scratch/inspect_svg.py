import re

with open('scratch/nav_logo.html', 'r', encoding='utf-8') as f:
    svg = f.read()

# Check all fill colors in nav_logo.html
fills = re.findall(r'fill="([^"]+)"', svg)
print("Fill colors in nav_logo.html:", set(fills))

# Check viewBox and dimensions
vb = re.search(r'viewBox="([^"]+)"', svg)
print("ViewBox:", vb.group(1) if vb else "None")
w = re.search(r'width="([^"]+)"', svg)
h = re.search(r'height="([^"]+)"', svg)
print(f"Width: {w.group(1) if w else 'None'}, Height: {h.group(1) if h else 'None'}")
