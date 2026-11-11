/**
 * Testa o site estatico exportado (pasta out/) servido em http://localhost:8080
 * Verifica: carregamento, idioma, rotas de SEO e peso.
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:8080/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const report = {};

const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await ctx.newPage();
const erros = [];
page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));

await page.goto(BASE, { waitUntil: 'load' });
await page.waitForTimeout(2500);

report.titulo = await page.title();
report.h1 = await page.locator('h1').innerText();
report.equipa = await page.locator('#equipa li h3').allInnerTexts();
report.erros = erros;

report.perf = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const paints = performance.getEntriesByType('paint').map((p) => ({
    name: p.name,
    ms: Math.round(p.startTime),
  }));
  const res = performance.getEntriesByType('resource');
  return {
    loadEvent: Math.round(nav.loadEventEnd),
    paints,
    pedidos: res.length,
    totalKB: Math.round(res.reduce((s, r) => s + (r.encodedBodySize ?? 0), 0) / 1024),
  };
});

// troca de idioma no site estatico
await page.getByRole('button', { name: /EN|English/i }).first().click();
await page.waitForTimeout(900);
report.h1En = await page.locator('h1').innerText();
await page.getByRole('button', { name: /PT|Português/i }).first().click();
await page.waitForTimeout(700);
report.h1Pt = await page.locator('h1').innerText();

// navegacao por ancoras
await page.getByRole('button', { name: 'Contato' }).first().click();
await page.waitForTimeout(1600);
report.contatoVisivel = await page.locator('#contacto').isVisible();
await page.screenshot({ path: `${OUT}\\z-estatico.png` });

await page.close();

// rotas de SEO no servidor estatico
for (const p of ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest', '/og-image.png', '/brand/lockup-horizontal.png']) {
  const r = await ctx.request.get(BASE.replace(/\/$/, '') + p);
  report[`rota ${p}`] = r.status();
}

await ctx.close();

// mobile no estatico
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(BASE, { waitUntil: 'load' });
await m.waitForTimeout(2000);
report.mobileOverflow = await m.evaluate(() => ({
  docW: document.documentElement.scrollWidth,
  winW: window.innerWidth,
}));
await m.screenshot({ path: `${OUT}\\z-estatico-mobile.png` });
await m.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
