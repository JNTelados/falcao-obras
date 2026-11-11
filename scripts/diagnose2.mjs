/**
 * Diagnóstico de layout (2.ª passagem): overflow, secções e idioma.
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';
const OUT = 'C:\\rea\\falcao-site\\scripts\\shots';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const report = {};

/* 1. overflow */
for (const width of [360, 390, 414, 768, 1024]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  report[`overflow@${width}`] = await page.evaluate(() => ({
    docW: document.documentElement.scrollWidth,
    bodyW: document.body.scrollWidth,
    winW: window.innerWidth,
  }));
  await page.close();
}

/* 2. capturas por secção (viewport real) */
const shots = [
  { name: 'q-servicos', w: 1440, h: 1000, sel: '#servicos' },
  { name: 'q-contato', w: 1440, h: 1000, sel: '#contacto' },
  { name: 'q-diferenciais', w: 1440, h: 1000, sel: '#diferenciais' },
  { name: 'q-mobile-servicos', w: 390, h: 844, sel: '#servicos' },
  { name: 'q-mobile-contato', w: 390, h: 844, sel: '#contacto' },
  { name: 'q-mobile-header', w: 390, h: 844, sel: null },
];
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1300);
  if (s.sel) {
    const box = await page.locator(s.sel).boundingBox();
    if (box) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, box.y - 90));
    }
    await page.waitForTimeout(1500);
  }
  await page.screenshot({ path: `${OUT}\\${s.name}.png` });
  await page.close();
}

/* 3. idioma EN: hero + serviços */
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
await page.getByRole('button', { name: 'EN' }).first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}\\q-en-hero.png` });
const box = await page.locator('#servicos').boundingBox();
await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, (box?.y ?? 0) - 90));
await page.waitForTimeout(1400);
await page.screenshot({ path: `${OUT}\\q-en-servicos.png` });
report.en = {
  lang: await page.evaluate(() => document.documentElement.lang),
  firstService: await page.locator('#servicos li h3').first().innerText(),
};
await page.close();

/* 4. acessibilidade básica */
const ap = await browser.newPage({ viewport: { width: 1440, height: 950 } });
await ap.goto(BASE, { waitUntil: 'networkidle' });
await ap.waitForTimeout(1200);
report.a11y = await ap.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('img'));
  const btns = Array.from(document.querySelectorAll('button'));
  const links = Array.from(document.querySelectorAll('a'));
  const label = (el) => (el.getAttribute('aria-label') ?? el.textContent ?? '').trim();
  return {
    imagesWithoutAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
    images: imgs.length,
    buttonsWithoutName: btns.filter((b) => !label(b)).length,
    linksWithoutName: links.filter((a) => !label(a)).length,
    h1Count: document.querySelectorAll('h1').length,
    h2Count: document.querySelectorAll('h2').length,
    sectionsWithId: document.querySelectorAll('section[id]').length,
    iframesWithoutTitle: Array.from(document.querySelectorAll('iframe')).filter((f) => !f.title).length,
    inputsWithoutLabel: Array.from(document.querySelectorAll('input,select,textarea')).filter((i) => {
      const id = i.id;
      return !id || !document.querySelector(`label[for="${id}"]`);
    }).length,
    htmlLang: document.documentElement.lang,
  };
});
await ap.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
