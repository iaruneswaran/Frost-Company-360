from PIL import Image

img = Image.open(r"C:/Users/ARUN ESWARAN/.gemini/antigravity/brain/057fed3f-91f2-4653-af37-4189a5957576/.user_uploaded/media_1795586493874_66c8a903.png")
width, height = img.size

# Let's find green pixels (higher G than R and B)
green_pixels = []
for y in range(0, height // 2):
    for x in range(width // 2, width):
        r, g, b = img.getpixel((x, y))[:3]
        if g > 150 and g > r * 1.3 and g > b * 1.1:
            hex_col = f"#{r:02x}{g:02x}{b:02x}"
            green_pixels.append(hex_col)

from collections import Counter
counts = Counter(green_pixels).most_common(10)
print("Top green pixels in Recognition card:")
for col, cnt in counts:
    print(col, cnt)
