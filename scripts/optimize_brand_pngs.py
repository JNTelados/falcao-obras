"""Otimiza os PNGs de marca preservando o alfa (quantizacao adaptativa por metodo de cores)."""
from PIL import Image
import glob
import os

BRAND = r'C:\rea\falcao-site\public\brand'

# paleta: 256 cores para detalhe metalico, 128 para os icones pequenos
TARGETS = {
    'emblem.png': 200,
    'wordmark.png': 160,
    'tagline.png': 96,
    'lockup-horizontal.png': 200,
    'logo-stacked.png': 200,
    'logo-original.png': 200,
    'lockup-wordmark.png': 160,
    'icon-640.png': 128,
    'icon-512.png': 128,
    'icon-192.png': 96,
    'icon-180.png': 96,
    'icon-32.png': 64,
    'icon-16.png': 32,
}

total_before = total_after = 0
for name, colors in TARGETS.items():
    path = os.path.join(BRAND, name)
    if not os.path.exists(path):
        continue
    before = os.path.getsize(path)
    im = Image.open(path).convert('RGBA')
    # quantiza mantendo o canal alfa (pillow suporta RGBA no metodo FASTOCTREE)
    q = im.quantize(colors=colors, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG)
    q.save(path, 'PNG', optimize=True)
    after = os.path.getsize(path)
    total_before += before
    total_after += after
    print(f'{name:28s} {before:8,} -> {after:8,} B  ({100 - after * 100 // before}% menor)')
print(f'{"TOTAL":28s} {total_before:8,} -> {total_after:8,} B')

# og-image (RGB)
og = r'C:\rea\falcao-site\public\og-image.png'
if os.path.exists(og):
    before = os.path.getsize(og)
    im = Image.open(og).convert('RGB').quantize(colors=256, method=Image.MEDIANCUT)
    im.save(og, 'PNG', optimize=True)
    print(f'{"og-image.png":28s} {before:8,} -> {os.path.getsize(og):8,} B')
