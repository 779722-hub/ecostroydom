import puppeteer from 'puppeteer';
import path from 'path';
const url='file://'+path.resolve('index.html').replace(/\\/g,'/');
const b=await puppeteer.launch({headless:true});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(url,{waitUntil:'networkidle2'});
await p.evaluate(()=>localStorage.setItem('eco_theme_pref','light'));
await p.reload({waitUntil:'networkidle2'});
await p.setViewport({width:1440,height:900});
await p.evaluate(async()=>{const h=document.body.scrollHeight;let y=0;while(y<h){window.scrollBy(0,400);y+=400;await new Promise(r=>setTimeout(r,80));}});
await new Promise(r=>setTimeout(r,500));
for(const id of ['promo','contacts','catalog']){
  const y=await p.evaluate(i=>{const e=document.getElementById(i);return e?e.getBoundingClientRect().top+window.scrollY:0;},id);
  await p.evaluate(i=>{const e=document.getElementById(i);if(e)e.scrollIntoView({block:'start'});},id);
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:`screenshots/light-${id}.png`,clip:{x:0,y:0,width:1440,height:900}});
  console.log(id,y);
}
await b.close();
