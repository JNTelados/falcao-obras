/**
 * Publica a pasta `out/` num site da Netlify usando a API oficial.
 *
 * Metodo: calcula o SHA1 de cada ficheiro e envia apenas o que mudou.
 *  1. POST /sites/{site_id}/deploys  -> devolve listas `required` e `sha1`
 *  2. PUT  <url assinada>            -> envia cada ficheiro que falta
 *  3. (a Netlify marca o deploy como ready sozinha)
 *
 * Uso: node scripts/deploy-netlify.mjs
 * Requer: NETLIFY_AUTH_TOKEN e NETLIFY_SITE_ID
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const TOKEN = process.env.NETLIFY_AUTH_TOKEN;
const SITE_ID = process.env.NETLIFY_SITE_ID;
const OUT_DIR = path.resolve(process.cwd(), 'out');

if (!TOKEN || !SITE_ID) {
  console.error('\n[erro] Defina NETLIFY_AUTH_TOKEN e NETLIFY_SITE_ID.\n');
  process.exit(1);
}

const API = 'https://api.netlify.com/api/v1';
const auth = { Authorization: `Bearer ${TOKEN}` };

/** Lista todos os ficheiros da pasta, com caminho relativo em formato POSIX. */
async function listarFicheiros(dir, base = dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  const ficheiros = [];
  for (const entrada of entradas) {
    const completo = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      ficheiros.push(...(await listarFicheiros(completo, base)));
    } else if (entrada.isFile()) {
      const relativo = path.relative(base, completo).split(path.sep).join('/');
      const conteudo = await readFile(completo);
      ficheiros.push({
        relativo,
        conteudo,
        sha1: createHash('sha1').update(conteudo).digest('hex'),
      });
    }
  }
  return ficheiros;
}

console.log('\n>> Publicando na Netlify\n');

const ficheiros = await listarFicheiros(OUT_DIR);
const total = ficheiros.reduce((s, f) => s + f.conteudo.length, 0);
console.log(`   ${ficheiros.length} ficheiros, ${(total / 1024 / 1024).toFixed(2)} MB`);

// 1. criar o deploy (com os digests de tudo o que temos)
console.log('\n[1/3] A criar o deploy...');
const respostaCriar = await fetch(`${API}/sites/${SITE_ID}/deploys`, {
  method: 'POST',
  headers: { ...auth, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    draft: false,
    files: Object.fromEntries(ficheiros.map((f) => [`/${f.relativo}`, f.sha1])),
  }),
});

if (!respostaCriar.ok) {
  console.error(`   [erro] HTTP ${respostaCriar.status}: ${await respostaCriar.text()}`);
  process.exit(1);
}

const deploy = await respostaCriar.json();
console.log(`   deploy id: ${deploy.id}`);
console.log(`   estado:    ${deploy.state}`);

const necessarios = new Set(deploy.required ?? []);
console.log(`\n[2/3] A enviar ficheiros... (${necessarios.size} por enviar)`);

let enviados = 0;
let falhas = 0;

for (const f of ficheiros) {
  const chave = `/${f.relativo}`;
  if (!necessarios.has(chave)) continue;

  const url = deploy.sha1?.[f.sha1];
  if (!url) {
    console.warn(`   [aviso] sem URL de upload para ${chave}`);
    falhas++;
    continue;
  }

  const envio = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: f.conteudo,
  });

  if (envio.ok) {
    enviados++;
    process.stdout.write(`\r   enviados: ${enviados}/${necessarios.size}`);
  } else {
    falhas++;
    console.warn(`\n   [erro] ${chave}: HTTP ${envio.status}`);
  }
}

console.log(`\n   concluido: ${enviados} enviados, ${falhas} falhas`);

// 3. aguardar o processamento
console.log('\n[3/3] A aguardar o processamento...');
for (let i = 1; i <= 40; i++) {
  await new Promise((r) => setTimeout(r, 3000));
  const r = await fetch(`${API}/sites/${SITE_ID}/deploys/${deploy.id}`, { headers: auth });
  if (!r.ok) continue;
  const d = await r.json();
  process.stdout.write(`\r   estado: ${d.state}          `);
  if (d.state === 'ready') {
    console.log('\n\n[ok] DEPLOY PUBLICADO');
    console.log(`     ${d.ssl_url}`);
    console.log(`     ${d.deploy_ssl_url}\n`);
    process.exit(0);
  }
  if (d.state === 'error') {
    console.error(`\n\n[erro] o deploy falhou: ${d.error_message ?? 'sem detalhe'}`);
    process.exit(1);
  }
}

console.error('\n\n[aviso] o deploy ainda nao ficou pronto. Verifique no painel.');
process.exit(1);
