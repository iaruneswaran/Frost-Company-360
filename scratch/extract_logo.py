import re

with open('scratch/page.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Find nav__logo
match = re.search(r'<a[^>]*class=["\'][^"\']*nav__logo[^"\']*["\'][^>]*>(.*?)</a>', html, re.DOTALL | re.I)
if match:
    nav_logo = match.group(0)
    print("Found nav__logo:")
    with open('scratch/nav_logo.html', 'w', encoding='utf-8') as out:
        out.write(nav_logo)
    print(nav_logo[:500])
else:
    print("nav__logo not found")

# Also search for any favicon
favicons = re.findall(r'<link[^>]+rel=["\'][^"\']*icon[^"\']*["\'][^>]+href=["\']([^"\']+)["\']', html, re.I)
print("Favicons:", favicons)
