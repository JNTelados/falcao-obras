# Publicar o site no ar — guia em português

Este guia tem tudo o que precisa para colocar o site online, **sem pagar nada**.
Pode fazer isto agora ou mais tarde: nada aqui "expira".

---

## Opção A — Rápida (5 minutos, sem Git, sem conta GitHub)

Dá um endereço temporário na Netlify. Ideal para mostrar a alguém hoje.

1. Duplo clique em **`gerar-site-publicar.bat`**
   → gera a pasta `out` já com o endereço correto
2. Abra **https://app.netlify.com/drop**
3. **Arraste a pasta `out`** para dentro da página
4. Crie a conta gratuita quando pedir (pode entrar com o Google)
5. Em *Site configuration → Change site name*, escreva `falcao`

**Resultado:** `https://falcao.netlify.app` no ar 24h, com HTTPS, sem o PC ligado.

> Para atualizar depois: rode o `.bat` outra vez e arraste a pasta novamente.

---

## Opção B — Definitiva (publica sozinho a cada alteração)

Usa GitHub + Netlify. Depois de configurado, **nunca mais precisa de arrastar pastas**:
basta alterar o site e enviar, que ele republica automaticamente.

### Passo 1 — Autorizar o GitHub (só uma vez)

Abra o PowerShell (menu Iniciar → escreva `powershell`) e cole as duas linhas:

```powershell
cd C:\rea\falcao-site
& "C:\Users\Keller\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin\gh.exe" auth login --hostname github.com --git-protocol https --web
```

Vai aparecer um código tipo `XXXX-XXXX`:
1. Copie o código
2. Pressione **Enter** (o navegador abre)
3. Cole o código e clique em **Authorize**
4. Deve aparecer **"Logged in as …"**

### Passo 2 — Criar o repositório e enviar o código

```powershell
cd C:\rea\falcao-site
& "C:\Users\Keller\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin\gh.exe" repo create falcao-obras --public --source=. --remote=origin --push
```

### Passo 3 — Ligar o GitHub à Netlify

1. Abra **https://app.netlify.com** e entre (de preferência com a conta GitHub)
2. *Add new site → Import an existing project → GitHub*
3. Escolha o repositório **`falcao-obras`**
4. A Netlify lê o `netlify.toml` sozinha. Confirme que aparece:
   - Build command: `pnpm build:static`
   - Publish directory: `out`
5. Clique em **Deploy**

### Passo 4 — Renomear para ficar curto

*Site configuration → Change site name* → escreva `falcao`
→ fica **`https://falcao.netlify.app`**

**Pronto.** A partir daí, cada `git push` publica o site automaticamente.

---

## Depois de publicar: ligar um domínio próprio

Quando comprar o domínio (ex.: `falcaoobras.pt`):

1. **Netlify** → *Domain management → Add a domain* → escreva o domínio
2. A Netlify mostra os servidores DNS (ex.: `dns1.p01.nsone.net`)
3. No registrador onde comprou o domínio, troque os **nameservers** por esses
4. Aguarde a propagação (de minutos a algumas horas) — o HTTPS é automático

Depois, atualize o endereço no projeto para o SEO ficar correto:

- No ficheiro **`netlify.toml`**, troque a linha:
  ```
  NEXT_PUBLIC_SITE_URL = "https://www.falcaoobras.pt"
  ```
- Envie a alteração (`git push`) — a Netlify republica sozinha

---

## Comandos do dia a dia

| O que quer fazer | Comando / ação |
|---|---|
| Ver o site no PC | `pnpm dev` → http://localhost:3210 |
| Gerar versão de produção local | `pnpm build` e depois `pnpm start` |
| Gerar pasta para publicar à mão | duplo clique em `gerar-site-publicar.bat` |
| Verificar tipos | `pnpm typecheck` |
| Verificar layout e idiomas | `pnpm verify:layout` e `pnpm verify:i18n` |
| Publicar (modo definitivo) | `git add -A`, `git commit -m "ajustes"`, `git push` |

---

## Onde alterar o conteúdo

| O que quer mudar | Ficheiro |
|---|---|
| Todos os textos (PT e EN) | `src/i18n/dictionaries.ts` |
| Telefones, e-mail, endereço, horários, taxas | `src/lib/site.ts` |
| Cores, sombras, animações | `tailwind.config.ts` |
| Imagem de partilha (WhatsApp/redes) | `python scripts/build_og_image.py` |

---

## Observações úteis

- **A pasta `tools/`** (Git portátil + cloudflared) **não vai para o GitHub** —
  foi baixada só para esta máquina. Se apagar o projeto, terá de baixar de novo.
- **O link temporário** `https://discretion-nurses-massive-illustrations.trycloudflare.com`
  morre quando o PC ou a sessão terminarem. Serve só para testes rápidos.
- **O código está salvo apenas neste computador** até fazer o Passo 2 (enviar para
  o GitHub). Recomendo não deixar isso para muito tarde, como cópia de segurança.
- O site é **100% estático**: não precisa de servidor, base de dados nem manutenção.
