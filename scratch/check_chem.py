from PIL import Image

img = Image.open(r"C:/Users/ARUN ESWARAN/.gemini/antigravity/brain/057fed3f-91f2-4653-af37-4189a5957576/.user_uploaded/media_1795586493874_66c8a903.png")

# Check Chemistry line at x = int(img.width * 0.55)
for y in range(20, 100):
    r, g, b = img.getpixel((int(img.width * 0.55), y))[:3]
    if b > 200 and g > 150:
        print(f"Chemistry line at y={y}: #{r:02x}{g:02x}{b:02x}")
