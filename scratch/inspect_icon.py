from PIL import Image

icon = Image.open('public/twostep-icon.png')
# Check bounding box of non-transparent pixels
bbox = icon.getbbox()
print("Icon bbox:", bbox)

# Sample some non-transparent pixels to see colors
colors = icon.getcolors(maxcolors=256)
print("Icon colors count:", len(colors) if colors else ">256")
# Check most common non-transparent colors
pixels = list(icon.getdata())
non_transparent = [p for p in pixels if p[3] > 0]
print("Non-transparent count:", len(non_transparent))
from collections import Counter
c = Counter(non_transparent)
print("Top colors:", c.most_common(5))
