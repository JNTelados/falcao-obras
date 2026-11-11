/**
 * Capturas finais das áreas alteradas (usa posição absoluta no documento).
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);

const report = {};

/** Posição absoluta (documento) da secção, para scroll fiável. */
async function scrollToSection(sel, offset = 96) {
  const top = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  }, sel);
  if (top == null) return false;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, top - offset));
  await page.waitForTimeout(1500);
  return true;
}

// cabeçalho com o novo chip
await page.locator('header').screenshot({ path: `${OUT}\\w-header.png` });

// equipa
await scrollToSection('#equipa');
await page.screenshot({ path: `${OUT}\\w-equipa.png` });
report.equipaTitulos = await page.locator('#equipa li h3').allInnerTexts();
report.equipaFuncoes = await page.locator('#equipa li p').allInnerTexts();

// localização (taxas)
await scrollToSection('#localizacao');
await page.screenshot({ path: `${OUT}\\w-local.png` });
report.taxas = await page.locator('#localizacao li').allInnerTexts();

// depoimentos (título)
await scrollToSection('#depoimentos');
await page.screenshot({ path: `${OUT}\\w-depo.png` });
report.depoTitulo = await page.locator('#depoimentos h2').innerText();

await page.close();

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(BASE, { waitUntil: 'networkidle' });
await m.waitForTimeout(1400);
await m.locator('header').screenshot({ path: `${OUT}\\w-mobile-header.png` });
const top = await m.evaluate(() => {
  const el = document.querySelector('#localizacao');
  return el ? el.getBoundingClientRect().top + window.scrollY : null;
});
if (top != null) {
  await m.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, top - 80));
  await m.waitForTimeout(1400);
  await m.screenshot({ path: `${OUT}\\w-mobile-local.png` });
}
report.mobileOverflow = await m.evaluate(() => ({
  docW: document.documentElement.scrollWidth,
  winW: window.innerWidth,
}));
await m.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
