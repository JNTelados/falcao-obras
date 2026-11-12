# Ligar o domínio `falcaoobras.pt` ao site

Guia rápido e específico para o seu caso (**domínio na one.com** + site na Netlify).

---

## Situação atual (verificada)

| Item | Estado |
|---|---|
| Domínio `falcaoobras.pt` | ✅ Registado na **one.com** |
| Servidores de nome | `ns01.one.com` / `ns02.one.com` |
| Aponta para | `46.30.211.38` (página padrão da one.com) |
| Site no GitHub | ✅ https://github.com/JNTelados/falcao-obras |
| Site publicado | ⏳ **falta este passo** |

---

## Passo 1 — Publicar o site na Netlify (2 minutos)

1. Abra: **https://app.netlify.com/start/deploy?repository=https://github.com/JNTelados/falcao-obras**
2. Entre com a conta **GitHub** e autorize a Netlify
3. Confirme os campos (já vêm preenchidos pelo `netlify.toml`):
   - **Build command:** `pnpm build:static`
   - **Publish directory:** `out`
4. Clique em **Deploy site**

Aguarde ~2 minutos. Confirme que o site abre no endereço temporário
(ex.: `https://algum-nome.netlify.app`).

**Anote esse endereço** — vai precisar dele no Passo 3.

---

## Passo 2 — Adicionar o domínio na Netlify

1. No painel do site: **Domain management** (ou *Domain configuration*)
2. Clique em **Add a domain** → escreva `falcaoobras.pt`
3. A Netlify pergunta se quer adicionar também o `www` → **aceite** (`www.falcaoobras.pt`)
4. A Netlify recomenda o `www` como endereço principal → **confirme**
   (o projeto já está configurado para isso, com redirecionamento 301)

A Netlify vai mostrar um aviso de que o DNS ainda não está configurado. É o próximo passo.

---

## Passo 3 — Configurar o DNS na one.com

No painel da one.com: **Domínios → falcaoobras.pt → Gerenciar DNS**

### Caminho A — Registos individuais (mais simples, recomendado)

Apague os registos `A` que existem e crie estes:

| Tipo | Nome/Host | Valor | TTL |
|---|---|---|---|
| **A** | `@` (ou deixe vazio) | `75.2.60.5` | 3600 |
| **CNAME** | `www` | `o-seu-site.netlify.app` | 3600 |

> ⚠️ **Substitua** `o-seu-site.netlify.app` pelo endereço que a Netlify te deu no Passo 1.
> Na Netlify, este valor aparece em *Domain management* como "Netlify subdomain".

### Caminho B — Trocar os nameservers

Se preferir deixar a Netlify gerir tudo (incluindo o HTTPS automático):

1. Na Netlify, em *Domain management*, copie os **4 nameservers** que ela indica
   (algo como `dns1.p03.nsone.net`)
2. Na one.com, em **Nameservers**, escolha "usar nameservers personalizados"
   e cole os quatro
3. Aguarde a propagação

> O Caminho A é mais rápido de reverter; o Caminho B dá menos manutenção.

---

## Passo 4 — Aguardar a propagação

- Costuma levar **de 15 minutos a 2 horas**
- Pode levar até 24-48h em casos raros
- Verifique a qualquer momento com:
  ```powershell
  cd C:\rea\falcao-site
  node scripts\verificar-dominio.mjs falcaoobras.pt
  ```
- O **HTTPS é automático**: a Netlify emite o certificado assim que o DNS propagar
  (aparece "Netlify managed certificate" em *Domain management → HTTPS*)

---

## Depois de funcionar

- `https://falcaoobras.pt` → redireciona para `https://www.falcaoobras.pt` (301)
- `https://www.falcaoobras.pt` → site oficial
- Todo o SEO (canonical, Open Graph, sitemap, robots) já aponta para o `www`
- A imagem de partilha (`og-image.png`) já mostra o endereço `falcaoobras.pt`

### Ativar o e-mail `geral@falcaoobras.pt`

O site já exibe esse endereço no rodapé e na secção de contato. Para ele funcionar:

- **Na one.com:** contrate o plano de e-mail (costuma ser ~1-2 €/mês por caixa)
- **Alternativa gratuita:** Zoho Mail tem plano grátis com domínio próprio
  (https://www.zoho.com/mail/) — crie a caixa `geral@falcaoobras.pt` e
  adicione os registos MX que o Zoho indicar no DNS da one.com

> Se preferir usar outro e-mail, mude o endereço em `src/lib/site.ts` (campo `email`)
> e faça `git push` — a Netlify republica sozinha.

---

## Cuidados com a one.com

| Serviço | Precisa? |
|---|---|
| Domínio | ✅ Sim (já tem) |
| Hospedagem / Web hosting | ❌ **Não** — a Netlify hospeda grátis |
| Certificado SSL pago | ❌ **Não** — a Netlify dá HTTPS grátis |
| E-mail profissional | ⚠️ Opcional (ou use o Zoho grátis) |

Se contratou hospedagem sem querer, pode cancelar: o domínio funciona
perfeitamente apontando para a Netlify.
