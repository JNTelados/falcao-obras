/**
 * Verificação do alternador de idioma (PT-BR <-> EN) e capturas nas duas línguas.
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await ctx.newPage();
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

const names = await page.getByRole('button').evaluateAll((els) =>
  els
    .filter((e) => ['PT', 'EN'].includes((e.textContent ?? '').trim().slice(-2)))
    .map((e) => ({
      name: e.getAttribute('aria-label') ?? e.textContent?.trim(),
      pressed: e.getAttribute('aria-pressed'),
    })),
);
console.log('botoes de idioma:', JSON.stringify(names));

const report = { langBefore: await page.evaluate(() => document.documentElement.lang) };
report.h1Before = await page.locator('h1').innerText();

// clica no botão EN (o que não está ativo)
await page.locator('button[aria-pressed="false"]').first().click();
await page.waitForTimeout(900);

report.langAfter = await page.evaluate(() => document.documentElement.lang);
report.h1After = await page.locator('h1').innerText();
report.stored = await page.evaluate(() => window.localStorage.getItem('falcao.locale'));
report.navAfter = await page.locator('header nav button').first().innerText();
report.servicesHeadingAfter = await page.locator('#servicos h2').innerText();
report.formLabelAfter = await page.locator('label[for="cf-treatment"]').innerText();
report.faqAfter = await page.locator('#faq li').first().innerText();

await page.screenshot({ path: `${OUT}\\r-en-hero.png` });
for (const [name, sel] of [
  ['r-en-servicos', '#servicos'],
  ['r-en-contato', '#contacto'],
]) {
  const box = await page.locator(sel).boundingBox();
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, (box?.y ?? 0) - 90));
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `${OUT}\\${name}.png` });
}

// recarrega: a preferência deve persistir
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
report.langAfterReload = await page.evaluate(() => document.documentElement.lang);
report.h1AfterReload = await page.locator('h1').innerText();

// volta para PT
await page.locator('button[aria-pressed="false"]').first().click();
await page.waitForTimeout(800);
report.langBackToPt = await page.evaluate(() => document.documentElement.lang);
report.h1BackToPt = await page.locator('h1').innerText();
await page.screenshot({ path: `${OUT}\\r-pt-hero.png` });

await browser.close();
console.log(JSON.stringify(report, null, 2));
