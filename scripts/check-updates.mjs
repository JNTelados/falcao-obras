/**
 * Verifica as ultimas alteracoes: bios da equipa, FAQ de certificacao independente
 * e o destaque nos servicos de gas.
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const report = {};

async function abrir(lang) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.addInitScript((l) => {
    if (l) window.localStorage.setItem('falcao.locale', l);
    else window.localStorage.removeItem('falcao.locale');
  }, lang);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1400);
  return page;
}

async function irPara(page, sel) {
  const y = await page.evaluate((s) => {
    const el = document.querySelector(s);
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  }, sel);
  if (y != null) {
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), Math.max(0, y - 90));
    await page.waitForTimeout(1400);
  }
}

// --- equipa PT ---
const pt = await abrir(null);
await irPara(pt, '#equipa');
report.equipa = await pt.evaluate(() =>
  Array.from(document.querySelectorAll('#equipa li')).map((li) => ({
    nome: li.querySelector('h3')?.textContent ?? '',
    bloco: li.innerText.replace(/\n+/g, ' | '),
  })),
);
await pt.screenshot({ path: `${OUT}\\y-equipa.png` });

// --- FAQ PT ---
await irPara(pt, '#faq');
report.faq = await pt.evaluate(() =>
  Array.from(document.querySelectorAll('#faq li')).map((li) => {
    const btn = li.querySelector('button');
    return (btn?.innerText ?? '').replace(/\n+/g, ' ').slice(0, 120);
  }),
);
// abre a pergunta nova
await pt.getByRole('button', { name: /Quem certifica as obras de gás/i }).click();
await pt.waitForTimeout(900);
report.faqResposta = await pt.locator('#faq-panel-certificacao-independente').innerText();
await pt.screenshot({ path: `${OUT}\\y-faq.png` });

// --- serviços de gás ---
await irPara(pt, '#servicos');
report.servicoGas = await pt.evaluate(() => {
  const li = Array.from(document.querySelectorAll('#servicos li')).find((e) =>
    e.textContent?.includes('Instalações de gás'),
  );
  return li ? li.innerText.replace(/\n+/g, ' | ') : null;
});
await pt.screenshot({ path: `${OUT}\\y-servicos.png` });
await pt.close();

// --- versão EN ---
const en = await abrir('en');
await irPara(en, '#equipa');
report.equipaEn = await en.evaluate(() =>
  Array.from(document.querySelectorAll('#equipa li')).map((li) => ({
    nome: li.querySelector('h3')?.textContent ?? '',
    bloco: li.innerText.replace(/\n+/g, ' | '),
  })),
);
await en.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
