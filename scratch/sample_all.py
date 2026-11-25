from PIL import Image
from collections import Counter

img = Image.open(r"C:/Users/ARUN ESWARAN/.gemini/antigravity/brain/057fed3f-91f2-4653-af37-4189a5957576/.user_uploaded/media_1795586493874_66c8a903.png")
width, height = img.size

# Card 1 (Team Total - left): Blue
# Card 2 (Chemistry - top middle): Cyan
# Card 3 (Recognition - top right): Green (#61d29c)
# Card 4 (Wellbeing - bottom middle): Pink
# Card 5 (Engagement - bottom right): Purple

def sample_area(box, name):
    pixels = []
    x1, y1, x2, y2 = box
    for y in range(y1, y2):
        for x in range(x1, x2):
            r, g, b = img.getpixel((x, y))[:3]
            # filter out pure white or gray
            if max(r, g, b) - min(r, g, b) > 40:
                hex_col = f"#{r:02x}{g:02x}{b:02x}"
                pixels.append(hex_col)
    top = Counter(pixels).most_common(3)
    print(f"{name}: {top}")

sample_area((0, 0, width // 2, height // 3), "Team Total (Blue)")
sample_area((width // 2, 0, int(width * 0.75), height // 2), "Chemistry (Cyan)")
sample_area((int(width * 0.75), 0, width, height // 2), "Recognition (Green)")
sample_area((width // 2, height // 2, int(width * 0.75), height), "Wellbeing (Pink)")
sample_area((int(width * 0.75), height // 2, width, height), "Engagement (Purple)")
