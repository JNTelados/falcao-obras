/**
 * Capturas finais para apresentação (desktop, mobile e versão EN).
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });

const jobs = [
  { name: 'final-hero', w: 1440, h: 950, sel: null, lang: null },
  { name: 'final-en-hero', w: 1440, h: 950, sel: null, lang: 'en' },
  { name: 'final-mobile', w: 390, h: 844, sel: null, lang: null },
  { name: 'final-mobile-menu', w: 390, h: 844, sel: null, lang: null, menu: true },
];

for (const j of jobs) {
  const page = await browser.newPage({
    viewport: { width: j.w, height: j.h },
    locale: j.lang === 'en' ? 'en-US' : 'pt-BR',
  });
  await page.addInitScript((lang) => {
    if (lang) window.localStorage.setItem('falcao.locale', lang);
    else window.localStorage.removeItem('falcao.locale');
  }, j.lang);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  if (j.menu) {
    await page.getByRole('button', { name: /Abrir menu|Open menu|Menu/i }).first().click();
    await page.waitForTimeout(800);
  }
  await page.screenshot({ path: `${OUT}\\${j.name}.png` });
  await page.close();
}

await browser.close();
console.log('capturas finais prontas');
