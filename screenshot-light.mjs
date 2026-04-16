import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = `file://${path.resolve(__dirname,'index.html')}`;
const out = path.resolve(__dirname,'screenshots');

const browser = await puppeteer.launch({ headless:true, args:['--no-sandbox'] });
const page = await browser.newPage();
page.on('pageerror', e => console.log('PAGEERR:', e.message));
page.on('console', m => { if(m.type()==='error') console.log('CONSOLE:', m.text()); });
await page.setViewport({ width:1440, height:900 });
await page.goto(url,{ waitUntil:'networkidle2' });
await page.evaluate(()=>{ localStorage.setItem('eco_theme_pref','light'); });
await page.reload({ waitUntil:'networkidle2' });
await new Promise(r=>setTimeout(r,800));
await page.evaluate(async()=>{const h=document.body.scrollHeight;let p=0;while(p<h){window.scrollBy(0,400);p+=400;await new Promise(r=>setTimeout(r,80));}});
await page.evaluate(()=>window.scrollTo(0,0));
await new Promise(r=>setTimeout(r,600));
const info = await page.evaluate(()=>({
  bodyCls: document.body.className,
  bg: getComputedStyle(document.body).backgroundColor,
  color: getComputedStyle(document.body).color,
  varBg: getComputedStyle(document.documentElement).getPropertyValue('--bg'),
  hasStyle: !!document.getElementById('admin-theme-vars'),
  heroBg: getComputedStyle(document.querySelector('.hero')||document.body).backgroundColor,
}));
console.log(JSON.stringify(info));
await page.screenshot({ path: path.join(out,'theme-light.png'), fullPage:true });
// Header crop
await page.setViewport({width:1440,height:900});
await page.screenshot({ path: path.join(out,'theme-light-header.png'), clip:{x:0,y:0,width:1440,height:120} });
// Promo crop
const promoY = await page.evaluate(()=>{const e=document.getElementById('promo')||document.querySelector('[data-block="promo"]');return e?e.getBoundingClientRect().top+window.scrollY:0;});
console.log('promoY=',promoY);
await page.evaluate(y=>window.scrollTo(0,y-20),promoY);
await new Promise(r=>setTimeout(r,400));
await page.screenshot({ path: path.join(out,'theme-light-promo.png'), clip:{x:0,y:0,width:1440,height:700} });
// Footer
await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
await new Promise(r=>setTimeout(r,400));
await page.screenshot({ path: path.join(out,'theme-light-footer.png'), clip:{x:0,y:200,width:1440,height:700} });
await browser.close();
