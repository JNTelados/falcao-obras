/**
 * Verifica a equipa (4 membros, com o tecnico certificador de gas) e captura a seccao.
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const report = {};

for (const [rotulo, w, h, lang] of [
  ['desktop', 1440, 1000, null],
  ['mobile', 390, 900, null],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.addInitScript((l) => {
    if (l) window.localStorage.setItem('falcao.locale', l);
    else window.localStorage.removeItem('falcao.locale');
  }, lang);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const top = await page.evaluate(() => {
    const el = document.querySelector('#equipa');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });
  if (top != null) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, top - 90));
    await page.waitForTimeout(1500);
  }
  await page.screenshot({ path: `${OUT}\\x-equipa-${rotulo}.png` });

  if (rotulo === 'desktop') {
    // ordem visual: le a posicao esquerda->direita de cada cartao
    report.cartoes = await page.evaluate(() => {
      const lis = Array.from(document.querySelectorAll('#equipa li'));
      return lis
        .map((li) => {
          const r = li.getBoundingClientRect();
          const nome = li.querySelector('h3')?.textContent ?? '';
          const funcao = li.querySelector('p')?.textContent ?? '';
          return { nome, funcao, x: Math.round(r.left), y: Math.round(r.top) };
        })
        .sort((a, b) => (Math.abs(a.y - b.y) > 40 ? a.y - b.y : a.x - b.x))
        .map((c, i) => ({ ordem: i + 1, ...c, x: undefined, y: undefined }));
    });
    report.destaqueRicardo = await page.evaluate(() => {
      const li = Array.from(document.querySelectorAll('#equipa li')).find((e) =>
        e.textContent?.includes('Ricardo Conceição'),
      );
      return li ? li.innerText : null;
    });
  }
  await page.close();
}

// versao EN
const en = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await en.addInitScript(() => window.localStorage.setItem('falcao.locale', 'en'));
await en.goto(BASE, { waitUntil: 'networkidle' });
await en.waitForTimeout(1400);
const t2 = await en.evaluate(() => {
  const el = document.querySelector('#equipa');
  return el ? el.getBoundingClientRect().top + window.scrollY : null;
});
if (t2 != null) {
  await en.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, t2 - 90));
  await en.waitForTimeout(1400);
}
report.enRicardo = await en.evaluate(() => {
  const li = Array.from(document.querySelectorAll('#equipa li')).find((e) =>
    e.textContent?.includes('Ricardo Conceição'),
  );
  return li ? li.innerText : null;
});
await en.screenshot({ path: `${OUT}\\x-equipa-en.png` });
await en.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
