"""Gera a imagem Open Graph (1200x630) com o dominio proprio."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

OUT = r'C:\rea\falcao-site\public\og-image.png'
BRAND = r'C:\rea\falcao-site\public\brand'
W, H = 1200, 630
DOMINIO = 'falcaoobras.pt'
TELEFONES = '936 628 585   ·   924 108 625'

FONT_BOLD = [r'C:\Windows\Fonts\segoeuib.ttf', r'C:\Windows\Fonts\arialbd.ttf', r'C:\Windows\Fonts\seguisb.ttf']
FONT_REG = [r'C:\Windows\Fonts\segoeui.ttf', r'C:\Windows\Fonts\arial.ttf']


def fonte(candidatos, tamanho):
    for caminho in candidatos:
        if os.path.exists(caminho):
            try:
                return ImageFont.truetype(caminho, tamanho)
            except OSError:
                continue
    return ImageFont.load_default()


base = Image.new('RGB', (W, H), (14, 16, 20))
desenho = ImageDraw.Draw(base, 'RGBA')

for x in range(0, W, 52):
    desenho.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
for y in range(0, H, 52):
    desenho.line([(0, y), (W, y)], fill=(255, 255, 255, 8))

brilho = Image.new('RGBA', (W, H), (0, 0, 0, 0))
bd = ImageDraw.Draw(brilho, 'RGBA')
bd.ellipse([-260, -320, 520, 200], fill=(223, 174, 51, 64))
bd.ellipse([820, 380, 1500, 900], fill=(37, 154, 166, 50))
brilho = brilho.filter(ImageFilter.GaussianBlur(120))
base = Image.alpha_composite(base.convert('RGBA'), brilho).convert('RGB')
desenho = ImageDraw.Draw(base, 'RGBA')

desenho.line([(70, 1), (W - 70, 1)], fill=(223, 174, 51, 170), width=2)

emblema = Image.open(os.path.join(BRAND, 'emblem.png')).convert('RGBA')
escala = 300 / emblema.height
emblema = emblema.resize((round(emblema.width * escala), 300), Image.LANCZOS)
base.paste(emblema, (86, 96), emblema)

x = 470
desenho.text((x, 112), 'FALCAO', font=fonte(FONT_BOLD, 72), fill=(240, 243, 247))
desenho.text((x, 194), 'OBRAS & REMODELACOES', font=fonte(FONT_REG, 24), fill=(223, 174, 51))

# endereco proprio em destaque
desenho.text((x, 258), DOMINIO, font=fonte(FONT_BOLD, 42), fill=(223, 174, 51))

linha = 336
desenho.text((x, linha), 'Gas  ·  Aguas & Esgotos', font=fonte(FONT_BOLD, 33), fill=(228, 233, 240))
desenho.text((x, linha + 46), 'Remodelacoes  ·  Pinturas', font=fonte(FONT_BOLD, 33), fill=(228, 233, 240))

desenho.text((x, 452), 'Tecnicos certificados  ·  Orcamento gratuito', font=fonte(FONT_REG, 22), fill=(150, 164, 184))
desenho.text((x, 484), 'Garantia por escrito  ·  Emergencia 24h', font=fonte(FONT_REG, 22), fill=(150, 164, 184))

desenho.line([(86, 534), (W - 86, 534)], fill=(255, 255, 255, 30), width=1)
desenho.text((86, 556), TELEFONES, font=fonte(FONT_BOLD, 26), fill=(255, 255, 255))
desenho.text((W - 452, 560), 'Olho de falcao, mao de profissional.', font=fonte(FONT_REG, 20), fill=(223, 174, 51))

base_entregar = base.copy()
base.save(OUT + '.tmp.png', 'PNG', optimize=True)
antes = os.path.getsize(OUT + '.tmp.png')
os.remove(OUT + '.tmp.png')
# quantiza para reduzir peso mantendo boa qualidade
base_entregar.convert('RGB').quantize(colors=256, method=Image.MEDIANCUT).save(OUT, 'PNG', optimize=True)
print(f'og-image.png {base_entregar.size}  {antes:,} -> {os.path.getsize(OUT):,} B')
