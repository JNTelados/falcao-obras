"""Extrai a logo com matte por regiao (geometria x luminancia), sem ruido de fundo."""
from PIL import Image, ImageChops, ImageFilter
import os
from collections import deque

SRC = r'C:\Users\Keller\.dsh\attachments\v1\objects\0b\0ba379bd24a6a6043ed10771f6f9e472d072c0072111fc683bc857fbf2bb294e'
OUT = r'C:\rea\falcao-site\public\brand'
os.makedirs(OUT, exist_ok=True)

im = Image.open(SRC).convert('RGB')
W, H = im.size
gray = im.convert('L')

# fundo local por bloco (percentil 20) -> remove vinheta e textura
TILE = 28
bs = Image.new('L', ((W + TILE - 1) // TILE, (H + TILE - 1) // TILE))
gp = gray.load(); bp = bs.load()
for by in range(bs.height):
    for bx in range(bs.width):
        vals = [gp[x, y]
                for y in range(by * TILE, min(H, by * TILE + TILE), 2)
                for x in range(bx * TILE, min(W, bx * TILE + TILE), 2)]
        vals.sort()
        bp[bx, by] = vals[max(0, int(len(vals) * 0.20))]
bgmodel = bs.resize(im.size, Image.BICUBIC).filter(ImageFilter.GaussianBlur(12))
delta = ImageChops.subtract(gray, bgmodel)

# geometria da logo: so o que e claramente mais claro que o fundo local
solid = delta.point(lambda v: 255 if v >= 85 else 0)
solid = solid.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))

# maior componente + todas as componentes densas (>=120 px) = logo completa
sp = solid.load()
seen = bytearray(W * H)
keep = Image.new('L', (W, H), 0)
kp = keep.load()
total = 0
for sy in range(H):
    for sx in range(W):
        if sp[sx, sy] and not seen[sy * W + sx]:
            q = deque([(sx, sy)])
            seen[sy * W + sx] = 1
            pts = []
            while q:
                x, y = q.popleft()
                pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < W and 0 <= ny < H and sp[nx, ny] and not seen[ny * W + nx]:
                        seen[ny * W + nx] = 1
                        q.append((nx, ny))
            if len(pts) >= 120:
                total += len(pts)
                for x, y in pts:
                    kp[x, y] = 255
print('pixels de geometria mantidos:', total)

# fecha contornos e fecha buracos internos com um blur forte + limiar
matte = keep.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(6))
matte = matte.point(lambda v: 255 if v >= 90 else 0)
matte = matte.filter(ImageFilter.GaussianBlur(2.2))

# alpha final = matte da regiao x luminancia (mantem o metalico, mata o fundo escuro)
# 0 abaixo de 52: descarta a franja de fundo que aparecia como halo claro
lum = gray.point(lambda v: 0 if v <= 52 else (255 if v >= 142 else int((v - 52) * 255 / 90)))
lum = lum.point(lambda v: 0 if v < 26 else v)
alpha = ImageChops.multiply(matte, lum)

full = im.copy()
full.putalpha(alpha)
print('alpha bbox:', alpha.getbbox())

PAD = 10


def emit(tag, box, scale=1.0, max_w=None, transparent=True):
    x0 = max(0, box[0] - PAD); y0 = max(0, box[1] - PAD)
    x1 = min(W, box[2] + PAD); y1 = min(H, box[3] + PAD)
    piece = full.crop((x0, y0, x1, y1))
    if max_w and piece.width > max_w:
        scale = min(scale, max_w / piece.width)
    if scale != 1.0:
        piece = piece.resize((max(1, round(piece.width * scale)), max(1, round(piece.height * scale))), Image.LANCZOS)
    if not transparent:
        flat = Image.new('RGB', piece.size, (11, 13, 16))
        flat.paste(piece, (0, 0), piece)
        piece = flat
    path = os.path.join(OUT, tag + '.png')
    piece.save(path, 'PNG', optimize=True)
    print(f'{tag:20s} {piece.width:4d}x{piece.height:4d}  {os.path.getsize(path):7d} B')
    return piece


emblem_box = (310, 180, 957, 646)
word_box = (221, 667, 1049, 799)
tag_box = (227, 814, 1039, 858)

emblem = emit('emblem', emblem_box)
wordmark = emit('wordmark', word_box)
tagline = emit('tagline', tag_box)
emit('logo-original', (224, 178, 1052, 860), 0.8)
emit('logo-stacked', (224, 178, 1052, 860), 0.62, max_w=660)

# lockup horizontal simetrico
scale_e = 286 / emblem.height
e = emblem.resize((round(emblem.width * scale_e), 286), Image.LANCZOS)
w = wordmark.resize((612, round(wordmark.height * 612 / wordmark.width)), Image.LANCZOS)
tw = round(612 * 0.85)
t = tagline.resize((tw, round(tagline.height * tw / tagline.width)), Image.LANCZOS)
GAP = 8
block_h = w.height + GAP + t.height
ch = max(e.height, block_h) + 4
canvas = Image.new('RGBA', (e.width + 28 + w.width, ch), (0, 0, 0, 0))
canvas.paste(e, (0, (ch - e.height) // 2), e)
canvas.paste(w, (e.width + 28, (ch - block_h) // 2), w)
canvas.paste(t, (e.width + 28 + (w.width - t.width) // 2, (ch - block_h) // 2 + w.height + GAP), t)
canvas.save(os.path.join(OUT, 'lockup-horizontal.png'), 'PNG', optimize=True)
hf = Image.new('RGB', canvas.size, (11, 13, 16)); hf.paste(canvas, (0, 0), canvas)
hf.save(os.path.join(OUT, 'lockup-horizontal-dark.png'), 'PNG', optimize=True)
print(f'{"lockup-horizontal":20s} {canvas.width:4d}x{canvas.height:4d}')

# icones
icon = Image.new('RGBA', (640, 640), (0, 0, 0, 0))
ei = emblem.resize((478, round(emblem.height * 478 / emblem.width)), Image.LANCZOS)
icon.paste(ei, ((640 - ei.width) // 2, (640 - ei.height) // 2 + 4), ei)
icon.save(os.path.join(OUT, 'icon-640.png'), 'PNG', optimize=True)
for size in (512, 192, 180, 32, 16):
    icon.resize((size, size), Image.LANCZOS).save(os.path.join(OUT, f'icon-{size}.png'), 'PNG', optimize=True)
icon.resize((256, 256), Image.LANCZOS).save(r'C:\rea\falcao-site\src\app\icon.png', 'PNG', optimize=True)
icon.resize((180, 180), Image.LANCZOS).save(r'C:\rea\falcao-site\src\app\apple-icon.png', 'PNG', optimize=True)
icon.resize((512, 512), Image.LANCZOS).save(r'C:\rea\falcao-site\public\og-icon.png', 'PNG', optimize=True)

# previa: linha 1 fundo claro, linha 2 fundo escuro
items = [emblem, wordmark, tagline, canvas]
rows = []
for bgc, label in (((234, 236, 240), 'light'), ((11, 13, 16), 'dark')):
    tiles = []
    for img in items:
        t = Image.new('RGB', img.size, bgc); t.paste(img, (0, 0), img); tiles.append(t)
    wmax = max(t.width for t in tiles)
    sheet = Image.new('RGB', (wmax, sum(t.height for t in tiles) + 16 * len(tiles)), (255, 255, 255) if bgc[0] > 128 else (11, 13, 16))
    y = 0
    for t in tiles:
        sheet.paste(t, (0, y)); y += t.height + 16
    rows.append(sheet)
Wm = max(r.width for r in rows)
tot = sum(r.height for r in rows) + 30
out = Image.new('RGB', (Wm, tot), (128, 128, 128))
y = 0
for r in rows:
    out.paste(r, (0, y)); y += r.height + 30
out.thumbnail((760, 1500), Image.LANCZOS)
out.save(r'C:\rea\falcao-site\scripts\_logo_preview.png')
print('preview ok', out.size)
