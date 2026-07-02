from rembg import remove
from PIL import Image
import io, os

src = r"C:\Users\roych\Downloads\Tulizo foundation\media\00_profile_pic.jpg"
dst = r"C:\Users\roych\Downloads\Tulizo foundation\media\logo_transparent.png"

print("Removing background...")
with open(src, "rb") as f:
    inp = f.read()

out = remove(inp)

# Also rotate it 180 degrees - the image appears upside down
img = Image.open(io.BytesIO(out))
img_rotated = img.rotate(180)
img_rotated.save(dst, "PNG")

print(f"Saved: {dst}")
print(f"Size: {img_rotated.size}")

# Extract dominant colors
img_rgb = img_rotated.convert("RGBA")
pixels = list(img_rgb.getdata())
# Filter non-transparent pixels
colored = [(r,g,b) for r,g,b,a in pixels if a > 128 and not (r > 200 and g > 200 and b > 200)]
print(f"Colored pixels: {len(colored)}")

# Sample colors
from collections import Counter
# Quantize to fewer colors
sample = colored[::10]
counts = Counter(sample)
print("Top colors (RGB):")
for color, cnt in counts.most_common(10):
    print(f"  rgb{color} - #{color[0]:02X}{color[1]:02X}{color[2]:02X}")
