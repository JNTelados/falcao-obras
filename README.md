# Falcão Obras & Remodelações — site institucional

Site de página única, responsivo e bilíngue (**PT-BR padrão + EN**), construído com
Next.js (App Router), React, TypeScript, Tailwind CSS e Framer Motion.

- **Repositório:** https://github.com/JNTelados/falcao-obras
- **Publicação:** [PUBLICAR.md](./PUBLICAR.md) (guia completo em português)

---

## Como rodar

```bash
pnpm install
pnpm dev             # http://localhost:3210
pnpm build           # build de produção
pnpm start           # serve o build em http://localhost:3210
pnpm build:static    # gera a pasta out/ pronta a publicar (Netlify, Vercel, Pages)
pnpm typecheck       # verificação de tipos
```

> O projeto usa **pnpm** (há `pnpm-workspace.yaml` com `verifyDepsBeforeRun: false`,
> porque o binário nativo do `sharp` já vem pronto no install).

---

## Estrutura

```
src/
├─ app/
│  ├─ layout.tsx          # <html lang>, fontes, metadata/SEO, JSON-LD
│  ├─ page.tsx            # composição de todas as secções
│  ├─ providers.tsx       # I18nProvider
│  ├─ globals.css         # base Tailwind + foco visível + reduced motion
│  ├─ icon.png / apple-icon.png
│  ├─ sitemap.ts · robots.ts · manifest.ts
├─ components/
│  ├─ layout/Header.tsx   # topbar + navbar fixa + menu mobile
│  ├─ layout/Footer.tsx
│  ├─ sections/           # Hero, About, Services, Differentials, Testimonials,
│  │                      # Team, Location, Faq, Contact, ContactForm, CtaBanner
│  ├─ seo/StructuredData.tsx
│  └─ ui/                 # Button, Card, Container/Section, SectionHeading,
│                         # Logo, LanguageSwitcher, Reveal, WhatsAppFloat, icons
├─ i18n/
│  ├─ dictionaries.ts     # TODO o texto do site (pt + en), tipado
│  └─ I18nProvider.tsx    # locale + persistência em localStorage
└─ lib/
   ├─ site.ts             # dados da empresa, telefones, links, IDs das secções
   ├─ motion.ts           # variantes e curva de animação
   └─ utils.ts            # cn(), scrollToSection(), phoneDigits()

public/
├─ brand/                 # logo extraída da arte original (alfa real) + ícones
└─ og-image.png           # imagem de partilha (1200×630)

scripts/                  # geração de assets e verificações automatizadas
```

---

## Identidade visual

- **Paleta**: cinzas (`graphite`), dourado (`gold`), amarelo de gás (`flame`),
  vermelho técnico (`ember`) e verde-água (`aqua`).
- **Tipografia**: Plus Jakarta Sans (títulos) + Inter (texto).
- **Logo**: extraída da arte enviada, com matte por região (geometria × luminância)
  e ruído de fundo removido. Ficheiros em `public/brand/`:
  `lockup-horizontal.png`, `emblem.png`, `wordmark.png`, `tagline.png`,
  `logo-stacked.png`, `logo-original.png` e os ícones/favicons.
  Como é uma marca metálica (prata + dourado), ela é sempre apresentada sobre
  superfície escura — topbar, navbar (chip escuro), painéis e rodapé — onde
  mantém o brilho original.

---

## Idioma (PT-BR ⇄ EN)

- Botão **PT / EN** no **canto superior esquerdo** (topbar no desktop, navbar no
  mobile) e também no menu mobile e no rodapé.
- Troca todo o conteúdo, o `lang` do `<html>` e o sentido de leitura do contexto.
- A escolha fica guardada em `localStorage` (`falcao.locale`); na primeira visita
  deteta o idioma do navegador (inglês → EN, caso contrário PT-BR).

---

## Contato e formulário

- Telefones: **936 628 585** e **924 108 625** (topbar, secção de contato, rodapé,
  menu mobile e botões fixos).
- Botão fixo de WhatsApp (com balão proativo e atalho de chamada no mobile).
- Formulário com **nome, telefone, e-mail, tipo de serviço e mensagem**, com
  validação em tempo real, mensagens de erro acessíveis e estado de sucesso.

### Para receber os pedidos por e-mail/API

Defina a variável de ambiente e o formulário passa a enviar por HTTP:

```bash
# .env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/SEU_ID
NEXT_PUBLIC_SITE_URL=https://www.seudominio.pt
```

Sem endpoint configurado, o pedido é encaminhado para o **WhatsApp** da empresa
(nenhum lead é perdido) e a interface informa o utilizador.

---

## SEO e acessibilidade

- Metadata completa (title/description/keywords, Open Graph, Twitter, canonical,
  alternates de idioma), `sitemap.xml`, `robots.txt` e `manifest.webmanifest`.
- Dados estruturados JSON-LD: `LocalBusiness`/`GeneralContractor`/`Plumber`
  (endereço, geolocalização, horários, áreas atendidas, avaliação, catálogo),
  `WebSite` e `FAQPage`.
- Acessibilidade: um único `h1`, secções com `aria-labelledby`, ligações de salto,
  foco visível, `aria-expanded`/`aria-controls` no menu e no FAQ, `iframe` do mapa
  com `title`, todos os campos com `<label>`, e suporte a `prefers-reduced-motion`.
- Verificado automaticamente: sem overflow horizontal de 360px a 1440px, todas as
  imagens com `alt`, botões e links com nome acessível.

---

## Scripts de verificação (`scripts/`)

| Script | Função |
| --- | --- |
| `build_logo_assets.py` | Extrai/limpa a logo e gera todas as variantes + ícones |
| `build_og_image.py` | Gera `public/og-image.png` |
| `diagnose.mjs` / `diagnose2.mjs` | Overflow, capturas por secção, auditoria de a11y |
| `check-lang.mjs` / `debug-lang.mjs` | Verificação da troca PT-BR ⇄ EN |
| `logo_probe*.py` | Medições da arte original (geometria da logo) |

Executar (usa o Edge/Chromium já instalado, via `playwright-core`):

```bash
node scripts/diagnose2.mjs
node scripts/check-lang.mjs
```

---

## Personalização rápida

- **Textos e traduções**: `src/i18n/dictionaries.ts` (pt e en lado a lado).
- **Telefones, e-mail, endereço, horários, estatísticas**: `src/lib/site.ts`.
- **Cores, sombras, animações**: `tailwind.config.ts`.
- **Imagem de partilha**: rode `python scripts/build_og_image.py` após editar textos.
