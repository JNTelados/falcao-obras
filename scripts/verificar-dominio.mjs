/**
 * Diagnostico de DNS para ligar o dominio proprio ao alojamento.
 *
 * Uso:  node scripts/verificar-dominio.mjs meudominio.pt
 *
 * Verifica: registos A/AAAA/CNAME/NS, propagacao e se o site responde.
 */
import { promises as dns } from 'node:dns';
import process from 'node:process';

const dominio = (process.argv[2] ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '');

if (!dominio) {
  console.error('\nUso: node scripts/verificar-dominio.mjs meudominio.pt\n');
  process.exit(1);
}

const alvo = `https://${dominio}`;
const linha = (t) => console.log(`\n=== ${t} ===`);

async function tentar(rotulo, fn) {
  try {
    const r = await fn();
    console.log(`  ${rotulo}: ${Array.isArray(r) ? r.join(', ') || '(vazio)' : r}`);
    return r;
  } catch (e) {
    console.log(`  ${rotulo}: nao encontrado (${e.code ?? e.message})`);
    return null;
  }
}

console.log(`\n>> Verificando: ${dominio}\n`);

linha('SERVIDORES DE NOME (NS)');
await tentar('NS', () => dns.resolveNs(dominio));

linha('REGISTOS DE ENDERECO');
const a = await tentar('A (IPv4)', () => dns.resolve4(dominio));
await tentar('AAAA (IPv6)', () => dns.resolve6(dominio));

linha('CANONICAL NAME (CNAME)');
await tentar('CNAME', () => dns.resolveCname(dominio));

linha('REGISTOS DE E-MAIL');
await tentar('MX', () => dns.resolveMx(dominio).then((r) => r.map((m) => `${m.exchange} (prio ${m.priority})`)));
await tentar('TXT (SPF)', () => dns.resolveTxt(dominio).then((r) => r.map((t) => t.join(''))));

linha('WWW');
await tentar('www CNAME', () => dns.resolveCname(`www.${dominio}`));
await tentar('www A', () => dns.resolve4(`www.${dominio}`));

linha('RESPOSTA HTTP');
for (const u of [alvo, `https://www.${dominio}`]) {
  try {
    const resp = await fetch(u, { redirect: 'manual' });
    const local = resp.headers.get('location');
    console.log(`  ${u} -> HTTP ${resp.status}${local ? ` (redireciona para ${local})` : ''}`);
  } catch (e) {
    console.log(`  ${u} -> sem resposta (${e.cause?.code ?? e.message})`);
  }
}

linha('RESUMO');
if (a?.length) {
  console.log(`  O dominio ja aponta para: ${a.join(', ')}`);
  console.log('  Se o site ainda nao aparece, pode ser cache de DNS (aguarde ate 24h).');
} else {
  console.log('  O dominio ainda nao tem registo A: falta configurar o DNS no registrador.');
}
console.log('');
