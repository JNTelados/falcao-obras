/**
 * Rastreia a cadeia de redirecionamentos de um endereco, passo a passo.
 * Uso: node scripts/rastrear-redirect.mjs http://falcaoobras.pt
 */
import process from 'node:process';

const inicio = process.argv[2] ?? 'http://falcaoobras.pt/';
let atual = inicio;

console.log(`\n>> Rastreando: ${inicio}\n`);

for (let i = 1; i <= 12; i++) {
  let resposta;
  try {
    resposta = await fetch(atual, { redirect: 'manual' });
  } catch (erro) {
    console.log(`  [${i}] ${atual}`);
    console.log(`      ERRO de conexao: ${erro.cause?.code ?? erro.message}`);
    break;
  }

  const status = resposta.status;
  const local = resposta.headers.get('location');
  const servidor = resposta.headers.get('server') ?? '-';
  const cache = resposta.headers.get('x-nf-request-id') ? 'Netlify' : '';

  console.log(`  [${i}] HTTP ${status}  (server: ${servidor}) ${cache}`);
  console.log(`      ${atual}`);

  if (status >= 300 && status < 400 && local) {
    const proximo = new URL(local, atual).toString();
    console.log(`      -> ${proximo}`);
    if (proximo === atual) {
      console.log('\n  *** CICLO DETETADO: redireciona para si mesmo ***\n');
      break;
    }
    if (i > 1 && proximo === inicio) {
      console.log('\n  *** CICLO DETETADO: voltou ao inicio ***\n');
      break;
    }
    atual = proximo;
    continue;
  }

  if (status === 200) {
    const html = await resposta.text();
    const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '(sem titulo)';
    const mojibake = (html.match(/\u00e2\u20ac/g) ?? []).length;
    console.log(`      OK - ${html.length} bytes`);
    console.log(`      titulo: ${titulo}`);
    console.log(`      caracteres corrompidos (mojibake): ${mojibake}`);
  }
  break;
}

console.log('');
