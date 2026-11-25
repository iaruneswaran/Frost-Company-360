from PIL import Image

img = Image.open(r"C:/Users/ARUN ESWARAN/.gemini/antigravity/brain/057fed3f-91f2-4653-af37-4189a5957576/.user_uploaded/media_1795586493874_66c8a903.png")
width, height = img.size

# Let's measure the thickness of the blue line in Team Total
# Search vertically along x = 100 for blue pixels
blue_ys = []
for y in range(0, height // 3):
    r, g, b = img.getpixel((100, y))[:3]
    if b > 200 and r < 100:
        blue_ys.append(y)

print(f"Blue line y coordinates: {blue_ys}, thickness: {len(blue_ys)}px")

# Let's check Chemistry line
cyan_ys = []
for y in range(0, height // 3):
    r, g, b = img.getpixel((int(width * 0.55), y))[:3]
    if b > 200 and g > 150:
        cyan_ys.append(y)

print(f"Cyan line y coordinates: {cyan_ys}, thickness: {len(cyan_ys)}px")
