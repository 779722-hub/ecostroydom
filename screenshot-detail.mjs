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

  // Scroll to trigger reveals
  await page.evaluate(async () => {
    const d = 300, h = document.body.scrollHeight; let p = 0;
    while (p < h) { window.scrollBy(0, d); p += d; await new Promise(r => setTimeout(r, 80)); }
  });
  await new Promise(r => setTimeout(r, 500));

  // Hero area
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'detail-hero.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Hero screenshot saved');

  // Catalog area — scroll to it
  const catalogY = await page.evaluate(() => {
    const el = document.querySelector('#catalog');
    return el ? el.getBoundingClientRect().top + window.scrollY : 1800;
  });
  await page.evaluate(y => window.scrollTo(0, y - 50), catalogY);
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'detail-catalog.png'), clip: { x: 0, y: catalogY - 50, width: 1440, height: 900 } });
  console.log('Catalog screenshot saved');

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
