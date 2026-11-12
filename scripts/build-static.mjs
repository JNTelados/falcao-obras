/**
 * Build do site estatico para publicacao (Netlify / Vercel / Cloudflare Pages).
 *
 * Uso:
 *   node scripts/build-static.mjs
 *   node scripts/build-static.mjs https://meudominio.pt
 *   pnpm build:static
 *
 * Gera a pasta `out/` com o endereco publico correto no SEO.
 * Nao depende de `node` nem de `next` estarem no PATH.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const siteUrl =
  process.argv[2] ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ?? // a Netlify injeta URL com o endereco do site
  'https://falcao.netlify.app';

const cwd = process.cwd();

console.log(`\n>> Gerando site estatico para: ${siteUrl}\n`);

/** Localiza a CLI do Next sem depender do PATH (funciona com pnpm e com npm). */
function resolverNextCli() {
  const candidatos = [
    path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next'),
    path.join(cwd, 'node_modules', '.bin', 'next'),
  ];
  for (const c of candidatos) {
    if (existsSync(c)) return c;
  }
  // Ultimo recurso: dentro do store do pnpm (.pnpm/next@x/node_modules/next/...)
  const pnpmDir = path.join(cwd, 'node_modules', '.pnpm');
  if (existsSync(pnpmDir)) {
    const entrada = readdirSync(pnpmDir).find((n) => n.startsWith('next@'));
    if (entrada) {
      const p = path.join(pnpmDir, entrada, 'node_modules', 'next', 'dist', 'bin', 'next');
      if (existsSync(p)) return p;
    }
  }
  return null;
}

const nextCli = resolverNextCli();

if (!nextCli) {
  console.error('[erro] Next.js nao encontrado. Rode antes: pnpm install');
  process.exit(1);
}

console.log(`   Next CLI: ${nextCli}`);

const resultado = spawnSync(process.execPath, [nextCli, 'build'], {
  stdio: 'inherit',
  cwd,
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
