/**
 * Build do site estatico para publicacao (Netlify / Vercel / Cloudflare Pages).
 *
 * Uso:
 *   node scripts/build-static.mjs
 *   node scripts/build-static.mjs https://meudominio.pt
 *
 * Gera a pasta `out/` com o endereco publico correto no SEO.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const siteUrl =
  process.argv[2] ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.URL || 'https://falcao.netlify.app');

const cwd = process.cwd();
console.log(`\n>> Gerando site estatico para: ${siteUrl}\n`);

const nextBin = path.join(
  cwd,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'next.CMD' : 'next',
);

if (!existsSync(nextBin)) {
  console.error('[erro] Next.js nao encontrado em node_modules. Rode antes: pnpm install');
  process.exit(1);
}

const resultado = spawnSync(nextBin, ['build'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: siteUrl,
    EXPORT: '1',
    NODE_ENV: 'production',
  },
});

if (resultado.status !== 0) {
  console.error('\n[erro] A compilacao falhou.');
  process.exit(resultado.status ?? 1);
}

const outDir = path.join(cwd, 'out');
if (!existsSync(path.join(outDir, 'index.html'))) {
  console.error('\n[erro] A pasta out/ nao foi gerada corretamente.');
  process.exit(1);
}

console.log(`\n[ok] Site estatico pronto em: ${outDir}`);
console.log('[ok] Publique essa pasta (Netlify Drop) ou faca push para o repositorio.\n');
