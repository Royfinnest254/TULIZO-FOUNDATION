import urllib.request
import os

url = "https://scontent-mia3-2.cdninstagram.com/o1/v/t2/f2/m86/AQMHDuPPNFTTaRzFGqY8ezms3meIrVw8aIfEOPDeE75u683FvB-enPl6WNc-8rI4SxL3lNn__L0cWeyoa-wUAmUyPFas2MXfmLtmyAc.mp4?_nc_cat=105&_nc_sid=5e9851&_nc_ht=scontent-mia3-2.cdninstagram.com&_nc_ohc=uhugBxZa8vUQ7kNvwHuj2T_&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MjA4NTUwODIzOTUxMzMzOCwiYXNzZXRfYWdlX2RheXMiOjQ5LCJ2aV91c2VjYXNlX2lkIjoxMDA5OSwiZHVyYXRpb25fcyI6OTcsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=558d5abefb341502&oh=00_AQDM91o-v_BA6o2GY-O6P0ztGtNX-uBa0n8AE6zciIGQCg&oe=6A47F32A"

out = r"C:\Users\roych\Downloads\Tulizo foundation\media\12_DYRfwdSum1V_intro.mp4"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "identity",
    "Referer": "https://www.instagram.com/",
    "Origin": "https://www.instagram.com",
    "Range": "bytes=0-",
    "Connection": "keep-alive",
}

req = urllib.request.Request(url, headers=headers)
print(f"Downloading video...")
with urllib.request.urlopen(req, timeout=120) as resp:
    total = resp.headers.get("Content-Length")
    print(f"Content-Length: {total} bytes ({round(int(total or 0)/1024/1024, 2)} MB)")
    with open(out, "wb") as f:
        downloaded = 0
        while True:
            chunk = resp.read(65536)
            if not chunk:
                break
            f.write(chunk)
            downloaded += len(chunk)
        print(f"Downloaded: {round(downloaded/1024/1024, 2)} MB")

size = os.path.getsize(out)
print(f"Final file size: {round(size/1024/1024, 2)} MB")
print("Done.")
