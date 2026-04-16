import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2] || `file://${path.resolve(__dirname, 'index.html')}`;
const outDir = path.resolve(__dirname, 'screenshots');

async function autoScroll(page) {
  await page.evaluate(async () => {
    const distance = 300;
    const delay = 100;
    const height = document.body.scrollHeight;
    let pos = 0;
    while (pos < height) {
      window.scrollBy(0, distance);
      pos += distance;
      await new Promise(r => setTimeout(r, delay));
    }
  });
  await new Promise(r => setTimeout(r, 500));
}

async function screenshot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  // Scroll through the page to trigger all IntersectionObserver reveals
  await autoScroll(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'desktop-full.png'), fullPage: true });
  console.log('Desktop full-page screenshot saved.');

  // Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await autoScroll(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'mobile-full.png'), fullPage: true });
  console.log('Mobile full-page screenshot saved.');

  await browser.close();
  console.log(`Screenshots saved to ${outDir}`);
}

screenshot().catch(err => { console.error(err); process.exit(1); });
