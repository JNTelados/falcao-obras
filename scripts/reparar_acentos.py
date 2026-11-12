"""Repara caracteres corrompidos (mojibake) nos ficheiros do projeto.

Sintoma: UTF-8 lido como Windows-1252 e regravado como UTF-8, produzindo
sequencias como 'a-circunflexo + euro' em vez de aspas curvas e travessao.

Este script substitui as sequencias corrompidas pelos caracteres corretos
e regrava tudo em UTF-8 sem BOM (o que o Next.js espera).
"""
from pathlib import Path

RAIZ = Path(r'C:\rea\falcao-site')

# sequencia corrompida -> caractere correto
REPAROS = {
    '\u00e2\u20ac\u0153': '\u201c',   # a-circ + euro + oe  -> aspas curvas esquerdas
    '\u00e2\u20ac\u009d': '\u201d',   # a-circ + euro + ctrl -> aspas curvas direitas
    '\u00e2\u20ac\u2122': '\u2019',   # a-circ + euro + tm   -> apostrofo curvo
    '\u00e2\u20ac\u009c': '\u201c',
    '\u00e2\u20ac\u0098': '\u2018',
    '\u00e2\u20ac\u201d': '\u2014',   # a-circ + euro + emdash -> travessao
    '\u00e2\u20ac\u201c': '\u2013',   # -> meia-risca
    '\u00c2\u00b7': '\u00b7',         # A-circ + middot -> ponto medio
    '\u00c2\u00a0': '\u00a0',         # espaco inquebravel
    '\u00c2\u00ab': '\u00ab',
    '\u00c2\u00bb': '\u00bb',
    '\u00c3\u00a1': '\u00e1',         # a-agudo
    '\u00c3\u00a2': '\u00e2',
    '\u00c3\u00a3': '\u00e3',
    '\u00c3\u00a9': '\u00e9',
    '\u00c3\u00aa': '\u00ea',
    '\u00c3\u00ad': '\u00ed',
    '\u00c3\u00b3': '\u00f3',
    '\u00c3\u00b4': '\u00f4',
    '\u00c3\u00b5': '\u00f5',
    '\u00c3\u00ba': '\u00fa',
    '\u00c3\u00a7': '\u00e7',
    '\u00c3\u00a0': '\u00e0',
    '\u00c3\u0081': '\u00c1',
    '\u00c3\u0089': '\u00c9',
    '\u00c3\u0087': '\u00c7',
    '\u00c3\u0095': '\u00d5',
    '\u00e2\u201a\u00ac': '\u20ac',   # euro
    '\u00c2\u00ba': '\u00ba',         # ordinal masculino
    '\u00c2\u00aa': '\u00aa',         # ordinal feminino
}

EXTENSOES = {'.tsx', '.ts', '.mjs', '.js', '.css', '.json', '.md', '.py', '.yml', '.yaml', '.toml', '.html'}
IGNORAR = {'node_modules', '.next', 'out', 'tools', '.git', 'shots'}

total_ficheiros = 0
total_substituicoes = 0

for caminho in RAIZ.rglob('*'):
    if not caminho.is_file() or caminho.suffix.lower() not in EXTENSOES:
        continue
    if any(parte in IGNORAR for parte in caminho.parts):
        continue

    try:
        texto = caminho.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue

    original = texto
    mudancas = 0
    for errado, certo in REPAROS.items():
        n = texto.count(errado)
        if n:
            texto = texto.replace(errado, certo)
            mudancas += n

    # \u00c3 seguido de caracteres de controle (padrao de dupla codificacao)
    for errado, certo in {
        '\u00c3\u00a2\u20ac\u2122': '\u2019',
        '\u00c3\u00a2\u20ac\u009d': '\u201d',
        '\u00c3\u00a2\u20ac\u0153': '\u201c',
        '\u00c3\u00a2\u20ac\u201d': '\u2014',
    }.items():
        n = texto.count(errado)
        if n:
            texto = texto.replace(errado, certo)
            mudancas += n

    if texto != original:
        caminho.write_text(texto, encoding='utf-8', newline='')
        total_ficheiros += 1
        total_substituicoes += mudancas
        print(f'  reparado: {caminho.relative_to(RAIZ)}  ({mudancas} caracteres)')

print(f'\n{total_ficheiros} ficheiros reparados, {total_substituicoes} caracteres corrigidos')
