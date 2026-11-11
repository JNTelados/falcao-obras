"""Gera a imagem Open Graph (1200x630) a partir da marca Falcao."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = r'C:\rea\falcao-site\public\og-image.png'
BRAND = r'C:\rea\falcao-site\public\brand'
W, H = 1200, 630

FONT_CANDIDATES = [
    r'C:\Windows\Fonts\segoeuib.ttf',
    r'C:\Windows\Fonts\arialbd.ttf',
    r'C:\Windows\Fonts\seguisb.ttf',
    r'C:\Windows\Fonts\arial.ttf',
]
FONT_LIGHT = [r'C:\Windows\Fonts\segoeui.ttf', r'C:\Windows\Fonts\arial.ttf']


def load(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


canvas = Image.new('RGB', (W, H), (14, 16, 20))
d = ImageDraw.Draw(canvas, 'RGBA')

# grade tecnica
for x in range(0, W, 52):
    d.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
for y in range(0, H, 52):
    d.line([(0, y), (W, y)], fill=(255, 255, 255, 8))

# brilhos de cor
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow, 'RGBA')
gd.ellipse([-260, -300, 520, 220], fill=(223, 174, 51, 62))
gd.ellipse([820, 380, 1500, 900], fill=(37, 154, 166, 48))
glow = glow.filter(__import__('PIL.ImageFilter', fromlist=['ImageFilter']).GaussianBlur(120))
canvas = Image.alpha_composite(canvas.convert('RGBA'), glow).convert('RGB')
d = ImageDraw.Draw(canvas, 'RGBA')

# linha dourada superior
d.line([(70, 1), (W - 70, 1)], fill=(223, 174, 51, 170), width=2)

# emblema
emblem = Image.open(os.path.join(BRAND, 'emblem.png'))
scale = 300 / emblem.height
emblem = emblem.resize((round(emblem.width * scale), 300), Image.LANCZOS)
canvas.paste(emblem, (86, 96), emblem)

# texto
x = 470
d.text((x, 118), 'FALCAO', font=load(FONT_CANDIDATES, 74), fill=(238, 241, 245))
d.text((x, 202), 'OBRAS & REMODELACOES', font=load(FONT_LIGHT, 25), fill=(223, 174, 51))

title_font = load(FONT_CANDIDATES, 40)
d.text((x, 274), 'Gas  •  Aguas & Esgotos', font=title_font, fill=(226, 232, 240))
d.text((x, 324), 'Remodelacoes  •  Pinturas', font=title_font, fill=(226, 232, 240))

d.text((x, 402), 'Tecnicos certificados  ·  Orcamento gratuito', font=load(FONT_LIGHT, 24), fill=(148, 163, 184))
d.text((x, 440), 'Garantia por escrito  ·  Emergencia 24h', font=load(FONT_LIGHT, 24), fill=(148, 163, 184))

# rodape com telefones
d.line([(86, 528), (W - 86, 528)], fill=(255, 255, 255, 28), width=1)
d.text((86, 552), '936 628 585   ·   924 108 625', font=load(FONT_CANDIDATES, 27), fill=(255, 255, 255))
d.text((W - 430, 556), 'Olho de falcao, mao de profissional.', font=load(FONT_LIGHT, 21), fill=(223, 174, 51))

canvas.save(OUT, 'PNG', optimize=True)
print('og-image.png', canvas.size, os.path.getsize(OUT), 'B')
