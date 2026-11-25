from PIL import Image

try:
    icon = Image.open('public/twostep-icon.png')
    print(f"Icon size: {icon.size}, mode: {icon.mode}")
    logo = Image.open('public/twostep-logo.png')
    print(f"Logo size: {logo.size}, mode: {logo.mode}")
except Exception as e:
    print("PIL Error:", e)

with open('scratch/nav_logo.html', 'r', encoding='utf-8') as f:
    nav = f.read()
    print("Nav SVG length:", len(nav))
    # Count paths
    import re
    paths = re.findall(r'<path[^>]*>', nav)
    print("Path count:", len(paths))
    for p in paths[:3]:
        print("Path:", p[:100])
