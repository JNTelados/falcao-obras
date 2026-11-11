/**
 * Diagnóstico de layout e acessibilidade com o Chromium já instalado (Edge).
 * - mede overflow horizontal em viewports mobile
 * - lista os elementos que ultrapassam a largura
 * - captura ecrãs fiéis (viewport real, com scroll)
 * - verifica troca de idioma PT-BR -> EN
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.BASE_URL ?? 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const report = {};

/* ---------- 1. overflow horizontal em mobile ---------- */
for (const width of [360, 390, 414, 768]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const info = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const winW = window.innerWidth;
    const offenders = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.right > winW + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && typeof el.className === 'string' ? el.className : '').slice(0, 90),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    });
    return { docW, winW, offenders: offenders.slice(0, 14), total: offenders.length };
  });
  report[`overflow@${width}`] = info;
  await page.close();
}

/* ---------- 2. ecrãs fiéis (viewport real) ---------- */
const shots = [
  { name: 'p-desktop-hero', w: 1440, h: 900, scrollTo: 0 },
  { name: 'p-desktop-servicos', w: 1440, h: 900, selector: '#servicos' },
  { name: 'p-desktop-contato', w: 1440, h: 900, selector: '#contacto' },
  { name: 'p-mobile-hero', w: 390, h: 844, scrollTo: 0 },
  { name: 'p-mobile-servicos', w: 390, h: 844, selector: '#servicos' },
  { name: 'p-mobile-contato', w: 390, h: 844, selector: '#contacto' },
  { name: 'p-mobile-menu', w: 390, h: 844, openMenu: true },
];
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  if (s.openMenu) {
    await page.getByRole('button', { name: /Abrir menu|Open menu/i }).first().click();
    await page.waitForTimeout(700);
  } else if (s.selector) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: 'start' });
      window.scrollBy(0, -110);
    }, s.selector);
    await page.waitForTimeout(1400);
  }
  await page.screenshot({ path: `${OUT}\\${s.name}.png` });
  await page.close();
}

/* ---------- 3. idioma ---------- */
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
report.langBefore = await page.evaluate(() => document.documentElement.lang);
report.h1Before = await page.locator('h1').first().innerText();
await page.getByRole('button', { name: 'EN' }).first().click();
await page.waitForTimeout(700);
report.langAfter = await page.evaluate(() => document.documentElement.lang);
report.h1After = await page.locator('h1').first().innerText();
report.persisted = await page.evaluate(() => window.localStorage.getItem('falcao.locale'));
await page.screenshot({ path: `${OUT}\\p-desktop-hero-en.png` });
await page.mouse.wheel(0, 2000);
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}\\p-desktop-en-services.png` });
await page.close();

/* ---------- 4. formulário: validação ---------- */
const fp = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await fp.goto(BASE, { waitUntil: 'networkidle' });
await fp.locator('#contacto').scrollIntoViewIfNeeded();
await fp.waitForTimeout(600);
await fp.getByRole('button', { name: /Enviar pedido de orçamento/i }).click();
await fp.waitForTimeout(600);
report.formErrors = await fp.locator('[role="alert"]').allInnerTexts();
await fp.screenshot({ path: `${OUT}\\p-form-validation.png` });

await fp.fill('#cf-name', 'Maria Souza');
await fp.fill('#cf-phone', '11987654321');
await fp.fill('#cf-email', 'maria@exemplo.com');
await fp.selectOption('#cf-treatment', { index: 1 });
await fp.fill('#cf-message', 'Preciso de orçamento para pintura de um apartamento T2 em Setúbal.');
await fp.waitForTimeout(300);
await fp.screenshot({ path: `${OUT}\\p-form-filled.png` });
report.formFilled = true;
await fp.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
