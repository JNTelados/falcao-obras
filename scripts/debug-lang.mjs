/**
 * Investigação do alternador de idioma: inventário dos botões e estado após o clique.
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:3210/';

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
const logs = [];
page.on('console', (m) => logs.push(`[console.${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const inventory = await page.evaluate(() => {
  const groups = Array.from(document.querySelectorAll('[role="group"]'));
  return groups.map((g) => ({
    label: g.getAttribute('aria-label'),
    buttons: Array.from(g.querySelectorAll('button')).map((b) => ({
      text: (b.textContent ?? '').trim(),
      pressed: b.getAttribute('aria-pressed'),
      title: b.getAttribute('title'),
    })),
  }));
});
console.log('grupos:', JSON.stringify(inventory, null, 2));

const before = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  stored: window.localStorage.getItem('falcao.locale'),
}));

// Clica no botão de idioma que NÃO está ativo, dentro do grupo de idioma.
const clicked = await page.evaluate(() => {
  const group = document.querySelector('[role="group"][aria-label]');
  if (!group) return 'sem grupo';
  const btn = Array.from(group.querySelectorAll('button')).find(
    (b) => b.getAttribute('aria-pressed') === 'false',
  );
  if (!btn) return 'sem botao inativo';
  btn.click();
  return (btn.textContent ?? '').trim();
});
await page.waitForTimeout(1200);

const after = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  stored: window.localStorage.getItem('falcao.locale'),
  h1: document.querySelector('h1')?.textContent,
}));

console.log(JSON.stringify({ before, clicked, after, logs }, null, 2));
await browser.close();
