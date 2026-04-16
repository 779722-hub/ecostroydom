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

  // Scroll to trigger reveals + find admin
  await page.evaluate(async () => {
    let p = 0; const h = document.body.scrollHeight;
    while (p < h) { window.scrollBy(0, 300); p += 300; await new Promise(r => setTimeout(r, 80)); }
  });
  await new Promise(r => setTimeout(r, 500));

  // Open admin
  await page.click('#adminBtn');
  await new Promise(r => setTimeout(r, 400));
  await page.type('#adminPass', 'eco2026');
  await page.click('#adminLoginBtn');
  await new Promise(r => setTimeout(r, 500));

  // Tab: General
  await page.screenshot({ path: path.join(outDir, 'v2-general.png') });

  // Tab: Menu
  await page.click('[data-tab="menu"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-menu.png') });

  // Tab: Colors
  await page.click('[data-tab="colors"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-colors.png') });

  // Tab: Buttons
  await page.click('[data-tab="buttons"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-buttons.png') });

  // Tab: Cards
  await page.click('[data-tab="cards"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-cards.png') });

  // Tab: Blocks
  await page.click('[data-tab="blocks"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-blocks.png') });

  // Tab: Media
  await page.click('[data-tab="media"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-media.png') });

  // Tab: Gallery
  await page.click('[data-tab="gallery"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-gallery.png') });

  // Tab: About
  await page.click('[data-tab="about"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-about.png') });

  // Tab: Blog
  await page.click('[data-tab="blog"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'v2-blog.png') });

  await browser.close();
  console.log('All screenshots saved');
}
run().catch(e => { console.error(e); process.exit(1); });
