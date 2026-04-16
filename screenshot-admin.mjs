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

  // Scroll to footer to find admin btn
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'admin-footer.png'), clip: { x: 0, y: Math.max(0, await page.evaluate(() => document.body.scrollHeight) - 200), width: 1440, height: 200 } });
  console.log('Footer with admin btn screenshot saved');

  // Click admin button
  await page.click('#adminBtn');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'admin-login.png') });
  console.log('Login modal screenshot saved');

  // Enter password and login
  await page.type('#adminPass', 'eco2026');
  await page.click('#adminLoginBtn');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'admin-panel-general.png') });
  console.log('Admin panel general tab screenshot saved');

  // Click Colors tab
  await page.click('[data-tab="colors"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'admin-panel-colors.png') });
  console.log('Admin panel colors tab screenshot saved');

  // Click Cards tab
  await page.click('[data-tab="cards"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'admin-panel-cards.png') });
  console.log('Admin panel cards tab screenshot saved');

  // Click Blocks tab
  await page.click('[data-tab="blocks"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'admin-panel-blocks.png') });
  console.log('Admin panel blocks tab screenshot saved');

  // Click Effects tab
  await page.click('[data-tab="effects"]');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'admin-panel-effects.png') });
  console.log('Admin panel effects tab screenshot saved');

  // Test a preset — click "Midnight Blue"
  await page.click('[data-tab="colors"]');
  await new Promise(r => setTimeout(r, 200));
  await page.click('[data-preset="1"]');
  await new Promise(r => setTimeout(r, 500));
  // Close panel to see result
  await page.click('#adminClose');
  await new Promise(r => setTimeout(r, 300));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'admin-preset-blue.png') });
  console.log('Midnight Blue preset applied screenshot saved');

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
