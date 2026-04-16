import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = `file://${path.resolve(__dirname, 'index.html')}`;
const outDir = path.resolve(__dirname, 'screenshots');

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(async () => { let p=0,h=document.body.scrollHeight; while(p<h){window.scrollBy(0,300);p+=300;await new Promise(r=>setTimeout(r,80));} });
  await new Promise(r => setTimeout(r, 500));

  // Calculator
  const calcY = await page.evaluate(() => { const el = document.querySelector('#calc'); return el ? el.getBoundingClientRect().top + window.scrollY : 0; });
  await page.evaluate(y => window.scrollTo(0, y), calcY);
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v3-calculator.png') });

  // Catalog card detail
  const catY = await page.evaluate(() => { const el = document.querySelector('#catalog'); return el ? el.getBoundingClientRect().top + window.scrollY : 0; });
  await page.evaluate(y => window.scrollTo(0, y + 200), catY);
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v3-catalog.png') });

  // Gallery
  const galY = await page.evaluate(() => { const el = document.querySelector('#gallery'); return el ? el.getBoundingClientRect().top + window.scrollY : 0; });
  await page.evaluate(y => window.scrollTo(0, y), galY);
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v3-gallery.png') });

  // About
  const abY = await page.evaluate(() => { const el = document.querySelector('#about'); return el ? el.getBoundingClientRect().top + window.scrollY : 0; });
  await page.evaluate(y => window.scrollTo(0, y), abY);
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v3-about.png') });

  // Admin general tab (new fields)
  await page.click('#adminBtn');
  await new Promise(r => setTimeout(r, 400));
  await page.type('#adminPass', 'eco2026');
  await page.click('#adminLoginBtn');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'v3-admin-general.png') });

  await browser.close();
  console.log('Done');
}
run().catch(e => { console.error(e); process.exit(1); });
