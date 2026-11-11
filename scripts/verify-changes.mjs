/**
 * Verificação visual das alterações: chip da logo, equipa, localização com taxas,
 * depoimentos e desempenho de carregamento (produção dev).
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const report = {};

/* 1. textos alterados presentes no HTML */
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const must = [
  'Olavo Pereira',
  'Dra. Luisa Pinto',
  'Olavo Junior',
  'Quem já confiou na Falcão Obras',
  'Charneca da Caparica',
  'Rua Oliveira Feijão',
  '45 €',
  '35 €',
  'Taxa de deslocação',
  '17+',
];
const html = await page.content();
report.textos = Object.fromEntries(must.map((m) => [m, html.includes(m)]));
report.removidos = Object.fromEntries(
  ['Ricardo Falcão', 'Ana Salgado', 'Bruno Tavares', 'Carla Nunes', 'Chefe de equipe', 'São Sebastião', "Quem já confiou na Falcão<"].map(
    (m) => [m, html.includes(m)],
  ),
);
report.equipa = await page.locator('#equipa li h3').allInnerTexts();

/* 2. capturas das áreas alteradas */
for (const [name, sel] of [
  ['v-equipa', '#equipa'],
  ['v-local', '#localizacao'],
  ['v-depo', '#depoimentos'],
]) {
  const box = await page.locator(sel).boundingBox();
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, (box?.y ?? 0) - 100));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}\\${name}.png` });
}
// cabeçalho (chip da logo)
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(900);
await page.locator('header').screenshot({ path: `${OUT}\\v-header.png` });
await page.close();

/* 3. desempenho de carregamento (cache limpa) */
const perf = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const p2 = await perf.newPage();
await p2.goto(BASE, { waitUntil: 'load' });
await p2.waitForTimeout(2500);
report.perf = await p2.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const paints = performance.getEntriesByType('paint').map((p) => ({
    name: p.name,
    ms: Math.round(p.startTime),
  }));
  const res = performance.getEntriesByType('resource');
  const byType = {};
  res.forEach((r) => {
    const t = r.initiatorType || 'other';
    byType[t] = (byType[t] ?? 0) + Math.round((r.encodedBodySize ?? r.transferSize ?? 0) / 1024);
  });
  return {
    domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
    loadEvent: Math.round(nav.loadEventEnd),
    paints,
    pedidos: res.length,
    KBporTipo: byType,
    totalKB: Math.round(res.reduce((s, r) => s + (r.encodedBodySize ?? 0), 0) / 1024),
  };
});
await p2.close();
await perf.close();

/* 4. overflow final em mobile */
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(BASE, { waitUntil: 'networkidle' });
await m.waitForTimeout(1200);
report.mobile = await m.evaluate(() => ({
  docW: document.documentElement.scrollWidth,
  winW: window.innerWidth,
}));
await m.locator('#localizacao').scrollIntoViewIfNeeded();
await m.waitForTimeout(1300);
await m.screenshot({ path: `${OUT}\\v-mobile-local.png` });
await m.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
