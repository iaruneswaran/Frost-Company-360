import urllib.request
import re

url = 'https://twosteptx.com/'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
}

req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req, timeout=10) as response:
        html = response.read().decode('utf-8', errors='ignore')
        print(f"HTML length: {len(html)}")
        
        # Look for logo occurrences
        logo_matches = re.findall(r'([^"\'\s<>]+logo[^"\'\s<>]*)', html, re.I)
        print("Logo matches:", set(logo_matches))
        
        # Look for img tags
        img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
        print("Image sources:", img_srcs[:10])

        # Look for favicon or icon links
        icons = re.findall(r'<link[^>]+rel=["\'][^"\']*icon[^"\']*["\'][^>]+href=["\']([^"\']+)["\']', html, re.I)
        print("Icons:", icons)

except Exception as e:
    print("Error:", e)
