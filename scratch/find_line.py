from PIL import Image

img = Image.open(r"C:/Users/ARUN ESWARAN/.gemini/antigravity/brain/057fed3f-91f2-4653-af37-4189a5957576/.user_uploaded/media_1795586493874_66c8a903.png")
width, height = img.size

# Find the blue line in Team Total:
# The text "Team Total" is around x=20, y=30.
# The blue line is right below it. Let's find y where pixels are #3a65ff
for y in range(20, 100):
    for x in range(20, 100):
        r, g, b = img.getpixel((x, y))[:3]
        if b > 200 and r < 80 and g < 120:
            print(f"Blue pixel at ({x}, {y}): #{r:02x}{g:02x}{b:02x}")
            break
