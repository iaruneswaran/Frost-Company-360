from PIL import Image

icon = Image.open('public/twostep-icon.png')
# Create background #111827
bg = Image.new('RGBA', (256, 256), (17, 24, 39, 255))

# Resize icon with aspect ratio to fit inside 180x180
icon.thumbnail((180, 180), Image.Resampling.LANCZOS)
# Paste centered
x = (256 - icon.width) // 2
y = (256 - icon.height) // 2
bg.paste(icon, (x, y), icon)
bg.save('scratch/preview_icon.png')
print(f"Saved scratch/preview_icon.png. Icon resized to {icon.size}, placed at ({x}, {y})")

# Also let's check twostep-logo.png
logo = Image.open('public/twostep-logo.png')
bg_logo = Image.new('RGBA', (256, 256), (17, 24, 39, 255))
logo_thumb = logo.copy()
logo_thumb.thumbnail((220, 220), Image.Resampling.LANCZOS)
lx = (256 - logo_thumb.width) // 2
ly = (256 - logo_thumb.height) // 2
bg_logo.paste(logo_thumb, (lx, ly), logo_thumb)
bg_logo.save('scratch/preview_logo.png')
print(f"Saved scratch/preview_logo.png. Logo resized to {logo_thumb.size}, placed at ({lx}, {ly})")
