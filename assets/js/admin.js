(function(){
'use strict';
var SK='ecostroydom_admin',PW='eco2026',STK='ecostroydom_styles',CPK='ecostroydom_palettes';
function loadStyles(){try{var s=localStorage.getItem(STK);return s?JSON.parse(s):[];}catch(e){return [];}}
function saveStyles(arr){localStorage.setItem(STK,JSON.stringify(arr));}
function loadPalettes(){try{var s=localStorage.getItem(CPK);return s?JSON.parse(s):[];}catch(e){return [];}}
function savePalettes(arr){localStorage.setItem(CPK,JSON.stringify(arr));}

// ===== 10 Presets =====
var PR=[
  {name:'Professional',bg:'#FFFFFF',bgSoft:'#F6F5F2',dark:'#1A1A1A',accent:'#2A7A5F',accentLight:'#E8F5EF',text:'#1A1A1A',textSec:'#6B6B6B',muted:'#999999',border:'rgba(0,0,0,.08)',orange:'#FF8C42'},
  {name:'Midnight Blue',bg:'#F0F4F8',bgSoft:'#E2E8F0',dark:'#0F172A',accent:'#3B82F6',accentLight:'#DBEAFE',text:'#0F172A',textSec:'#475569',muted:'#94A3B8',border:'rgba(0,0,0,.08)',orange:'#F59E0B'},
  {name:'Warm Terracotta',bg:'#FFFBF5',bgSoft:'#FEF3E2',dark:'#2D1810',accent:'#C2410C',accentLight:'#FFF7ED',text:'#2D1810',textSec:'#78716C',muted:'#A8A29E',border:'rgba(0,0,0,.06)',orange:'#EA580C'},
  {name:'Forest Green',bg:'#F7FAF7',bgSoft:'#ECFDF5',dark:'#14532D',accent:'#16A34A',accentLight:'#DCFCE7',text:'#14532D',textSec:'#4B5563',muted:'#9CA3AF',border:'rgba(0,0,0,.07)',orange:'#D97706'},
  {name:'Royal Purple',bg:'#FAF5FF',bgSoft:'#F3E8FF',dark:'#1E1042',accent:'#7C3AED',accentLight:'#EDE9FE',text:'#1E1042',textSec:'#6B7280',muted:'#9CA3AF',border:'rgba(0,0,0,.06)',orange:'#EC4899'},
  {name:'Slate Modern',bg:'#FFFFFF',bgSoft:'#F8FAFC',dark:'#0F172A',accent:'#334155',accentLight:'#F1F5F9',text:'#0F172A',textSec:'#64748B',muted:'#94A3B8',border:'rgba(0,0,0,.06)',orange:'#F97316'},
  {name:'Ocean Teal',bg:'#F0FDFA',bgSoft:'#CCFBF1',dark:'#134E4A',accent:'#0D9488',accentLight:'#CCFBF1',text:'#134E4A',textSec:'#5B7A78',muted:'#94A3B8',border:'rgba(0,0,0,.06)',orange:'#F59E0B'},
  {name:'Dark Elegance',bg:'#0A0A0A',bgSoft:'#1A1A1A',dark:'#FFFFFF',accent:'#D4AF37',accentLight:'rgba(212,175,55,.12)',text:'#FFFFFF',textSec:'#AAAAAA',muted:'#666666',border:'rgba(255,255,255,.08)',orange:'#FF8C42'},
  {name:'Cherry Business',bg:'#FFFFFF',bgSoft:'#FFF1F2',dark:'#1C1917',accent:'#DC2626',accentLight:'#FEE2E2',text:'#1C1917',textSec:'#57534E',muted:'#A8A29E',border:'rgba(0,0,0,.06)',orange:'#EA580C'},
  {name:'Neon Industrial',bg:'#0A0A0A',bgSoft:'#161616',dark:'#FFFFFF',accent:'#39FF14',accentLight:'rgba(57,255,20,.1)',text:'#F5F5F0',textSec:'#AAAAAA',muted:'#666666',border:'rgba(255,255,255,.08)',orange:'#FF7A00'}
];

// ===== Block registry =====
var BL=[
  {id:'hero',label:'Герой'},
  {id:'marquee',label:'Бегущая строка'},
  {id:'stats',label:'Статистика'},
  {id:'promo',label:'Акция'},
  {id:'catalog',label:'Каталог'},
  {id:'upsell',label:'Допродажи'},
  {id:'delivery',label:'Доставка'},
  {id:'features',label:'Преимущества'},
  {id:'calc',label:'Калькулятор'},
  {id:'steps',label:'Шаги'},
  {id:'reviews',label:'Отзывы'},
  {id:'seo',label:'SEO-описание'},
  {id:'faq',label:'FAQ'},
  {id:'about',label:'О нас'},
  {id:'gallery',label:'Галерея'},
  {id:'blog',label:'Блог'},
  {id:'newsletter',label:'Рассылка'},
  {id:'form',label:'Форма'}
];

function defs(){return{
  logo:null,companyName:'EcoStroyDom',nameColor:'',
  phone:'+7 775 786 25 15',showPhone:true,
  headerInfoMode:'phone', // 'phone' | 'text'
  headerInfoText:'',
  heroMedia:null,heroMediaType:'img',heroCaption:'',
  heroSlides:[], // [{type:'img'|'video'|'youtube', src:'...', badge:'', badgeOn:true}]
  heroSlideInterval:5, // seconds
  heroBadgeGlobal:true, // show badges on media
  heroPriceLabel:'Цены от',heroPriceVal:'37 000',heroPriceNote:'фиксируется до отгрузки',
  menuItems:[
    {text:'Каталог',href:'#catalog',children:[]},
    {text:'Доставка',href:'#delivery',children:[]},
    {text:'Акция',href:'#promo',children:[]},
    {text:'О нас',href:'#about',children:[]},
    {text:'Блог',href:'#blog',children:[]},
    {text:'Контакты',href:'#contacts',children:[]}
  ],
  promoEnd:'2026-04-20T23:59:59+05:00',
  promoTag:'Акция месяца',
  promoTitle:'−10% на газоблок D600 по предзаказу',
  promoDesc:'Забронируйте партию <b>за месяц вперёд</b> и получите скидку 10%. Цена замораживается на <b>3 дня</b> с момента заявки.',
  promoBtnText:'Забронировать цену →',
  promoExpiredText:'Акция продлена — уточните условия у менеджера',
  promoVariant:'classic', // 'classic' | 'banner' | 'split'
  promoDiscount:'−10%',
  promoDiscountLabel:'скидка<br>на газоблок D600',
  promoBgMode:'theme', // 'theme' | 'dark' | 'custom'
  promoBgColor:'#1A1A1A',
  promoTextColor:'#FFFFFF',
  promoMedia:null, // base64 or URL
  promoMediaType:'none', // 'none' | 'image' | 'video' | 'youtube'
  promoMediaOpacity:30, // 0-100 — overlay darkness
  presetIndex:0,colors:Object.assign({},PR[0]),
  btnStyle:0, // 0=shiny, 1=flat
  btnColor1:'#1A1A1A',btnColor2:'#2A7A5F',
  marqueeItems:['ГОСТ 31360-2007','★ 1 сорт','Автоклав','Морозостойкость F75','Прочность B3.5','Геометрия ±3 мм'],
  blockOrder:BL.map(function(b){return b.id;}),
  removedBlocks:[],
  blockStyles:{},elementStyles:{},
  blogPosts:[
    {id:1,title:'Как выбрать газоблок: D500 vs D600',cat:'Материалы',date:'2026-04-12',img:'assets/img/block-200.png',excerpt:'Разбираем ключевые отличия двух популярных марок газобетона.',body:'',url:'blog/d500-vs-d600.html'},
    {id:2,title:'Сколько газоблока нужно на дом 100 м²',cat:'Расчёты',date:'2026-04-08',img:'assets/img/hero-house.jpg',excerpt:'Считаем кубатуру стен и перегородок.',body:'',url:'blog/skolko-gazobloka-na-dom-100m2.html'},
    {id:3,title:'Какой клей для газоблока лучше',cat:'Советы',date:'2026-04-02',img:'assets/img/glue-expert.jpg',excerpt:'Сравниваем 5 марок клея в Казахстане.',body:'',url:'blog/klej-dlya-gazobloka-obzor.html'},
    {id:4,title:'Какой толщины должна быть стена из газоблока',cat:'Советы',date:'2026-03-28',img:'assets/img/block-400.png',excerpt:'Оптимальная толщина для Казахстана: 200, 300 или 400 мм. Расчёты, СНиП, рекомендации.',body:'',url:'blog/tolschina-steny-gazoblok.html'},
    {id:5,title:'Плюсы и минусы газоблока — честный обзор',cat:'Материалы',date:'2026-03-20',img:'assets/img/autoclave.jpg',excerpt:'Все достоинства и недостатки газобетона, сравнение с кирпичом и деревом.',body:'',url:'blog/plyusy-i-minusy-gazobloka.html'},
    {id:6,title:'Газоблок или кирпич — что лучше для дома в 2026',cat:'Сравнение',date:'2026-04-05',img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=375&fit=crop',excerpt:'Сравнение по цене, теплу, скорости. Разница до 5 млн тенге на доме 100 м².',body:'',url:'blog/gazoblok-ili-kirpich.html'},
    {id:7,title:'Можно ли строить из газоблока зимой в Казахстане',cat:'Советы',date:'2026-03-15',img:'https://images.unsplash.com/photo-1483354483454-4cd359948304?w=600&h=375&fit=crop',excerpt:'Правила зимней кладки, морозостойкий клей, защита от снега.',body:'',url:'blog/stroitelstvo-gazobloka-zimoj.html'},
    {id:8,title:'Марки газоблока D400, D500, D600, D700 — сравнение',cat:'Материалы',date:'2026-03-22',img:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=375&fit=crop',excerpt:'Какую марку выбрать для стен, перегородок, утепления.',body:'',url:'blog/marki-gazobloka-d400-d500-d600-d700.html'},
    {id:9,title:'Армирование газоблока — правила, схема, арматура',cat:'Технология',date:'2026-03-10',img:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=375&fit=crop&sat=-30',excerpt:'Где, чем и как армировать. Штроба, армопояс, пошаговая инструкция.',body:'',url:'blog/armirovanie-gazobloka.html'}
  ],
  galleryItems:null,
  blockMedia:{}, // {blockId:[{type:'img'|'video',src:'...'}]}
  globalOverlay:0,
  globalOverlayColor:'#000000',
  radiusScale:100, // 0-200 — multiplier for all radius vars (percentage)
  seoBlock:{
    img:null,
    badge:'ГОСТ 31360-2007',
    title:'Газоблок D600 — материал нового поколения',
    intro:'<b>Газобетонный блок D600</b> — конструкционный автоклавный газобетон плотностью 600 кг/м³, произведённый по ГОСТ 31360-2007. Из натурального сырья — кварцевого песка, цемента, извести и воды — обрабатывается паром в автоклаве при 190 °C и давлении 12 атм.'
  },
  featuresBlock:{
    eyebrow:'Почему мы',
    title:'6 причин выбрать Ecostroydom',
    bgMode:'theme', // 'theme' | 'dark' | 'light' | 'custom'
    bgColor:'#0B0F12',
    textColor:'#FFFFFF',
    cardMode:'theme', // 'theme' | 'custom'
    cardBg:'#FFFFFF',
    cardBorder:'#E8E8E8',
    cardTitleColor:'#1A1A1A',
    cardDescColor:'#6B6B6B',
    cardIconBg:'#2A7A5F',
    cardIconColor:'#FFFFFF',
    items:[
      {icon:'i-factory',title:'Завод-изготовитель',desc:'Прямые поставки автоклавного газобетона без посредников.'},
      {icon:'i-award',title:'Только 1 сорт',desc:'Без сколов, трещин и брака. Каждая партия проходит ОТК.'},
      {icon:'i-doc',title:'ГОСТ 31360-2007',desc:'Сертификат и паспорт качества — с каждой поставкой.'},
      {icon:'i-ruler',title:'Геометрия ±3 мм',desc:'Ровные грани — экономия клея и быстрая кладка.'},
      {icon:'i-handshake',title:'Прямой контракт',desc:'Работаем напрямую с заводом — без накруток.'},
      {icon:'i-card',title:'Любая оплата',desc:'Нал, безнал, Каспи, рассрочка для юрлиц.'}
    ]
  },
  calcSettings:{
    price:41500,              // цена за м³
    glueRate:1.5,             // мешков на м³
    gluePrice:1800,            // цена мешка клея
    depositPallet:3500,        // залог за поддон
    minOrderVol:10,            // минимальный заказ м³
    minOrderSum:500000,        // минимальная сумма
    defaultOpenings:10,        // % проёмов по умолчанию
    defaultGarageThick:300,    // толщина стен пристройки по умолчанию, мм
    deliveryLongCity:3000,     // длинномер, город, тг/м³
    deliveryLongSub:3500,      // длинномер, пригород
    deliveryManCity:5500,      // манипулятор, город
    deliveryManSub:6000,       // манипулятор, пригород
    pallet100_vol:0.9, pallet100_blocks:48,
    pallet200_vol:0.9, pallet200_blocks:24,
    pallet250_vol:0.9375, pallet250_blocks:20,
    pallet300_vol:0.9, pallet300_blocks:16,
    pallet400_vol:0.9, pallet400_blocks:12
  },
  themeMode:'auto', // 'auto' | 'dark' | 'light' (admin default)
  autoThemeDarkStart:'19:00',
  autoThemeLightStart:'07:00',
  themeDark:{bg:'#0B0F12',surface:'#161B1F',surface2:'#1A2125',text:'#FFFFFF',textMuted:'rgba(255,255,255,.72)',accent:'#2DDB85',border:'rgba(255,255,255,.08)'},
  themeLight:{bg:'#FAFAF7',surface:'#FFFFFF',surface2:'#F0EFEA',text:'#1A1A1A',textMuted:'rgba(26,26,26,.65)',accent:'#2A7A5F',border:'rgba(0,0,0,.08)'},
  headCode:'',
  bodyCode:'',
  footerCallBtn:{show:true,text:'Позвонить нам'},
  footerText:'© 2026 Ecostroydom. Все права защищены.',
  footerWatermark:'EcoStroyDom',
  blockTexts:{}, // {blockId:[{text:'...',style:''}]}
  sectionHeads:{} // {blockId:{eyebrow,title,sub}}
};}

function load(){try{var s=localStorage.getItem(SK);return s?Object.assign(defs(),JSON.parse(s)):defs();}catch(e){return defs();}}
function save(s){localStorage.setItem(SK,JSON.stringify(s));}
var S=load();
// Migrate: ensure blog posts have urls
if(S.blogPosts&&S.blogPosts.length){
  var migrated=false;
  S.blogPosts.forEach(function(p){
    if(p.title&&p.title.indexOf('D500')>=0&&!p.url){p.url='blog/d500-vs-d600.html';migrated=true;}
    if(p.title&&p.title.indexOf('100')>=0&&p.title.indexOf('газоблок')>=0&&!p.url){p.url='blog/skolko-gazobloka-na-dom-100m2.html';migrated=true;}
    if(p.title&&p.title.indexOf('клей')>=0&&!p.url){p.url='blog/klej-dlya-gazobloka-obzor.html';migrated=true;}
    if(p.title&&p.title.indexOf('толщин')>=0&&!p.url){p.url='blog/tolschina-steny-gazoblok.html';migrated=true;}
  });
  // Add missing 4th article if users have old 3-post localStorage
  var hasTolschina=S.blogPosts.some(function(p){return p.title&&p.title.indexOf('толщин')>=0;});
  if(!hasTolschina){
    S.blogPosts.push({id:4,title:'Какой толщины должна быть стена из газоблока',cat:'Советы',date:'2026-03-28',img:'assets/img/block-400.png',excerpt:'Оптимальная толщина для Казахстана: 200, 300 или 400 мм.',body:'',url:'blog/tolschina-steny-gazoblok.html'});
    migrated=true;
  }
  // Add 5th article
  var hasPlyusy=S.blogPosts.some(function(p){return p.title&&p.title.indexOf('Плюсы')>=0;});
  if(!hasPlyusy){
    S.blogPosts.push({id:5,title:'Плюсы и минусы газоблока — честный обзор',cat:'Материалы',date:'2026-03-20',img:'assets/img/autoclave.jpg',excerpt:'Все достоинства и недостатки газобетона, сравнение с кирпичом и деревом.',body:'',url:'blog/plyusy-i-minusy-gazobloka.html'});
    migrated=true;
  }
  if(migrated) save(S);
}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function getLuminance(hex){
  if(!hex)return 1;
  var h=hex.replace('#','');
  if(h.length===3)h=h.split('').map(function(c){return c+c;}).join('');
  var r=parseInt(h.substr(0,2),16)/255;
  var g=parseInt(h.substr(2,2),16)/255;
  var b=parseInt(h.substr(4,2),16)/255;
  // Relative luminance per WCAG
  function c(v){return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);}
  return .2126*c(r)+.7152*c(g)+.0722*c(b);
}
function $(sel,ctx){return(ctx||document).querySelector(sel);}
function $$(sel,ctx){return Array.from((ctx||document).querySelectorAll(sel));}

// ============================================================
// APPLY STATE
// ============================================================
function apply(){
  // Logo — sync across header and footer
  $$('.logo').forEach(function(logo){
    var ei=logo.querySelector('.logo__custom-img');
    if(S.logo){
      if(!ei){
        ei=document.createElement('img');ei.className='logo__custom-img';
        ei.style.cssText='height:36px;width:auto;object-fit:contain;margin-right:6px';
        logo.prepend(ei);
      }
      ei.src=S.logo;
    } else {
      if(ei) ei.remove();
    }
    // Always show text
    var txt=logo.querySelector('.logo__text');if(txt)txt.style.display='';
  });
  // Name
  $$('.logo__text').forEach(function(el){
    // Split: first 3 chars normal, rest bold (EcoStroyDom -> Eco<b>StroyDom</b>)
    var n=esc(S.companyName);
    if(n.length>3) el.innerHTML=n.substring(0,3)+'<b>'+n.substring(3)+'</b>';
    else el.innerHTML=n;
    if(S.nameColor) el.style.color=S.nameColor;
  });

  // Sticky CTA phone button
  var stickyPhone=$('#stickyPhoneBtn');
  if(stickyPhone&&S.phone){
    stickyPhone.href='tel:'+(S.phone||'').replace(/[^\d+]/g,'');
  }

  // Header info (phone or custom text)
  var hInfo=$('#headerInfo');
  if(hInfo){
    if(S.showPhone===false){hInfo.style.display='none';}
    else{
      hInfo.style.display='';
      var cleanPhone=(S.phone||'+77757862515').replace(/[^\d+]/g,'');
      if(S.headerInfoMode==='text'&&S.headerInfoText){
        // Custom text — still clickable as tel: link
        hInfo.innerHTML='<a href="tel:'+cleanPhone+'" class="header__phone">'+esc(S.headerInfoText)+'</a>';
      } else {
        hInfo.innerHTML='<a href="tel:'+cleanPhone+'" class="header__phone">Позвонить нам</a>';
      }
    }
  }

  // Hero media / slideshow
  renderHeroSlides();
  // Global badges toggle
  document.body.classList.toggle('badges-off', S.heroBadgeGlobal===false && S.galleryBadgesOn===false);
  // Gallery badges visibility
  $$('#gallery .media-badge').forEach(function(b){b.style.display=S.galleryBadgesOn!==false?'':'none';});
  // Hero caption
  var cap=$('#heroCaption');if(cap)cap.textContent=S.heroCaption||'';
  // Hero price badge
  var hpl=$('#heroPriceVal');if(hpl&&S.heroPriceVal)hpl.innerHTML=esc(S.heroPriceVal)+'<small>₸/м³</small>';
  var hpn=$('#heroPriceNote');if(hpn)hpn.textContent=S.heroPriceNote||'';

  // Menu
  var nav=$('.nav');
  if(nav&&S.menuItems){
    nav.innerHTML='';
    S.menuItems.forEach(function(m){
      if(m.children&&m.children.length){
        var wrap=document.createElement('div');wrap.className='nav__dropdown';wrap.style.cssText='position:relative';
        var a=document.createElement('a');a.href=m.href;a.textContent=m.text;wrap.appendChild(a);
        var dd=document.createElement('div');dd.className='nav__dd-menu';
        dd.style.cssText='display:none;position:absolute;top:100%;left:0;background:var(--bg,#fff);border:1px solid var(--border);border-radius:8px;padding:8px 0;min-width:180px;box-shadow:0 8px 24px rgba(0,0,0,.1);z-index:99';
        m.children.forEach(function(c){
          var ca=document.createElement('a');ca.href=c.href;ca.textContent=c.text;
          ca.style.cssText='display:block;padding:8px 16px;font-size:13px;white-space:nowrap;transition:.15s';
          dd.appendChild(ca);
        });
        wrap.appendChild(dd);
        wrap.addEventListener('mouseenter',function(){dd.style.display='block';});
        wrap.addEventListener('mouseleave',function(){dd.style.display='none';});
        nav.appendChild(wrap);
      } else {
        var a=document.createElement('a');a.href=m.href;a.textContent=m.text;nav.appendChild(a);
      }
    });
  }

  // Calculator settings — expose to window
  if(S.calcSettings){
    window.CALC_SETTINGS=S.calcSettings;
    var cs=S.calcSettings;
    // Update calc default values in DOM inputs
    var cp=$('#cPrice');if(cp&&cs.price)cp.value=cs.price;
    var cg=$('#cGlue');if(cg&&cs.glueRate)cg.value=cs.glueRate;
    var co=$('#cOpenings');if(co&&cs.defaultOpenings){co.value=cs.defaultOpenings;var cov=$('#cOpeningsVal');if(cov)cov.textContent=cs.defaultOpenings+'%';}
    var cgt=$('#gThick');if(cgt&&cs.defaultGarageThick)cgt.value=cs.defaultGarageThick;
    // Update min-order notices across the site
    $$('.min-order-notice').forEach(function(n){
      n.textContent='Заказы от '+(cs.minOrderVol||10)+' м.куб газоблока. Расчёт от суммы заявки '+((cs.minOrderSum||500000).toLocaleString('ru-RU'))+' ₸';
    });
    // Trigger recalculation
    if(cp){var e=new Event('input',{bubbles:true});cp.dispatchEvent(e);}
  }

  // Promo timer + texts
  if(window.PROMO_CONFIG&&S.promoEnd){
    window.PROMO_CONFIG.endsAt=S.promoEnd;
    if(window.restartPromoTimer) window.restartPromoTimer();
  }
  var pt=$('#promoTag');if(pt&&S.promoTag)pt.textContent=S.promoTag;
  var ptt=$('#promoTitle');if(ptt&&S.promoTitle)ptt.textContent=S.promoTitle;
  var pd=$('#promoDesc');if(pd&&S.promoDesc)pd.innerHTML=S.promoDesc;
  var pbt=$('#promoBtnText');if(pbt&&S.promoBtnText)pbt.textContent=S.promoBtnText;
  var pe=$('#timerExpired');if(pe&&S.promoExpiredText)pe.textContent=S.promoExpiredText;

  // Promo variant
  var promoSec=$('.promo');
  if(promoSec){
    promoSec.classList.remove('promo--classic','promo--banner','promo--split');
    promoSec.classList.add('promo--'+(S.promoVariant||'classic'));
  }
  // Promo background mode
  var promoCard=$('.promo__card');
  if(promoCard){
    var mode=S.promoBgMode||'theme';
    promoCard.style.removeProperty('background');
    promoCard.style.removeProperty('color');
    if(mode==='dark'){
      promoCard.style.setProperty('background','#1A1A1A','important');
      promoCard.style.setProperty('color','#fff','important');
    } else if(mode==='custom'){
      promoCard.style.setProperty('background',S.promoBgColor||'#1A1A1A','important');
      promoCard.style.setProperty('color',S.promoTextColor||'#fff','important');
    }
    // Media background (image / video / youtube)
    var oldMedia=promoCard.querySelector('.promo-media-bg');
    if(oldMedia)oldMedia.remove();
    var oldOverlay=promoCard.querySelector('.promo-media-overlay');
    if(oldOverlay)oldOverlay.remove();
    if(S.promoMedia&&S.promoMediaType&&S.promoMediaType!=='none'){
      promoCard.style.position='relative';
      promoCard.style.overflow='hidden';
      var mb=document.createElement('div');mb.className='promo-media-bg';
      mb.style.cssText='position:absolute;inset:0;z-index:0;pointer-events:none';
      if(S.promoMediaType==='image'){
        mb.style.background='url('+S.promoMedia+') center/cover no-repeat';
      } else if(S.promoMediaType==='video'){
        mb.innerHTML='<video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover"><source src="'+esc(S.promoMedia)+'"></video>';
      } else if(S.promoMediaType==='youtube'){
        var vid=parseYoutubeId(S.promoMedia);
        if(vid)mb.innerHTML='<iframe src="https://www.youtube.com/embed/'+vid+'?autoplay=1&mute=1&loop=1&playlist='+vid+'&controls=0&rel=0&modestbranding=1&playsinline=1" style="width:100%;height:100%;border:0;pointer-events:none" allow="autoplay"></iframe>';
      }
      var ov=document.createElement('div');ov.className='promo-media-overlay';
      var op=(S.promoMediaOpacity===undefined?30:S.promoMediaOpacity)/100;
      ov.style.cssText='position:absolute;inset:0;z-index:1;pointer-events:none;background:rgba(0,0,0,'+op+')';
      promoCard.prepend(ov);
      promoCard.prepend(mb);
      // ensure content is above overlay
      Array.from(promoCard.children).forEach(function(ch){
        if(!ch.classList.contains('promo-media-bg')&&!ch.classList.contains('promo-media-overlay')){
          ch.style.position='relative';ch.style.zIndex='2';
        }
      });
    }
  }

  // Discount (for split variant)
  var pDisc=$('#promoDiscount'),pDiscL=$('#promoDiscountLabel');
  if(S.promoVariant==='split'){
    if(pDisc){pDisc.style.display='';pDisc.textContent=S.promoDiscount||'−10%';}
    if(pDiscL){pDiscL.style.display='';pDiscL.innerHTML=S.promoDiscountLabel||'скидка';}
  } else {
    if(pDisc)pDisc.style.display='none';
    if(pDiscL)pDiscL.style.display='none';
  }

  // Colors palette — only set accent/orange (theme owns bg/text)
  var r=document.documentElement.style,c=S.colors;
  if(c){
    r.setProperty('--accent',c.accent);r.setProperty('--accent-light',c.accentLight);
    r.setProperty('--orange-soft',c.orange);
  }
  applyTheme();
  applyCustomCode();
  applyFooterCallBtn();
  applyFeaturesBlock();
  applySectionHeads();

  // Button style
  applyBtnStyle();

  // Marquee
  var track=$('.marquee__track');
  if(track&&S.marqueeItems){
    var items=S.marqueeItems.concat(S.marqueeItems);
    track.innerHTML=items.map(function(t){return '<span>'+esc(t)+'</span>';}).join('');
  }

  // Block order & visibility
  var main=document.querySelector('main');
  if(main&&S.blockOrder){
    S.blockOrder.forEach(function(bid){
      var el=$('[data-block="'+bid+'"]');
      if(el){
        main.appendChild(el);
        el.style.display=S.removedBlocks&&S.removedBlocks.indexOf(bid)>=0?'none':'';
      }
    });
  }

  // Block styles
  Object.keys(S.blockStyles).forEach(function(bid){
    var bs=S.blockStyles[bid],el=$('[data-block="'+bid+'"]');
    if(!el)return;
    // Reset previous overrides each apply
    el.style.removeProperty('background');
    el.style.removeProperty('background-image');
    el.style.removeProperty('background-color');
    if(bs.bg && bs.bg!=='#ffffff' && bs.bg!=='#000000') el.style.setProperty('background-color',bs.bg,'important');
    if(bs.bgImg){
      el.style.setProperty('background-image','url('+bs.bgImg+')','important');
      el.style.setProperty('background-size','cover','important');
      el.style.setProperty('background-position','center','important');
      el.style.setProperty('background-repeat','no-repeat','important');
    }
    if(bs.bgVideo){
      var v=el.querySelector('.admin-bg-video');
      if(!v){v=document.createElement('video');v.className='admin-bg-video';v.autoplay=true;v.muted=true;v.loop=true;v.playsInline=true;v.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;pointer-events:none';el.style.position='relative';el.prepend(v);Array.from(el.children).forEach(function(ch){if(!ch.classList.contains('admin-bg-video')){ch.style.position='relative';ch.style.zIndex='1';}});}
      v.src=bs.bgVideo;
    }
    if(bs.effect){el.classList.remove('fx-parallax','fx-gradient-anim');if(bs.effect!=='none')el.classList.add('fx-'+bs.effect);}

    // Overlay / darken
    var ov=el.querySelector('.admin-overlay');
    if(bs.overlay&&bs.overlay>0){
      if(!ov){
        ov=document.createElement('div');ov.className='admin-overlay';
        ov.style.cssText='position:absolute;inset:0;z-index:1;pointer-events:none';
        el.style.position='relative';
        el.prepend(ov);
        Array.from(el.children).forEach(function(ch){if(!ch.classList.contains('admin-overlay')&&!ch.classList.contains('admin-bg-video')){ch.style.position='relative';ch.style.zIndex='2';}});
      }
      var col=bs.overlayColor||'#000000';
      var alpha=(bs.overlay/100).toFixed(2);
      // Convert hex to rgba
      var r=parseInt(col.substr(1,2),16),g=parseInt(col.substr(3,2),16),b=parseInt(col.substr(5,2),16);
      ov.style.background='rgba('+r+','+g+','+b+','+alpha+')';
    } else if(ov){ov.remove();}
  });

  // Block media
  Object.keys(S.blockMedia||{}).forEach(function(bid){
    var el=$('[data-block="'+bid+'"]');if(!el)return;
    var container=el.querySelector('.container');if(!container)return;
    var mg=el.querySelector('.admin-media-grid');
    if(!mg){mg=document.createElement('div');mg.className='admin-media-grid';mg.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:24px';container.appendChild(mg);}
    mg.innerHTML='';
    (S.blockMedia[bid]||[]).forEach(function(m){
      var item=document.createElement('div');item.style.cssText='border-radius:12px;overflow:hidden;aspect-ratio:16/10';
      if(m.type==='img') item.innerHTML='<img src="'+esc(m.src)+'" alt="" style="width:100%;height:100%;object-fit:cover">';
      else if(m.type==='video'){
        if(m.src.includes('youtube')||m.src.includes('youtu.be')){
          var vid=m.src.match(/(?:youtu\.be\/|v=)([^&]+)/);
          if(vid) item.innerHTML='<iframe src="https://www.youtube.com/embed/'+vid[1]+'" style="width:100%;height:100%;border:0" allowfullscreen></iframe>';
        } else {
          item.innerHTML='<video src="'+esc(m.src)+'" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover"></video>';
        }
      }
      mg.appendChild(item);
    });
  });

  // Element styles
  Object.keys(S.elementStyles||{}).forEach(function(key){
    var p=key.split('__'),el=$('[data-block="'+p[0]+'"]');if(!el)return;
    var es=S.elementStyles[key];$$(p[1],el).forEach(function(t){if(es.bg)t.style.background=es.bg;});
  });

  // Global radius scale
  var scale=(S.radiusScale===undefined?100:S.radiusScale)/100;
  var R=document.documentElement.style;
  R.setProperty('--radius',Math.round(10*scale)+'px');
  R.setProperty('--radius-lg',Math.round(18*scale)+'px');
  R.setProperty('--radius-xl',Math.round(24*scale)+'px');
  R.setProperty('--radius-full', scale===0 ? '0px' : '999px');

  // Global overlay
  var go=document.getElementById('globalOverlay');
  if(S.globalOverlay&&S.globalOverlay>0){
    if(!go){
      go=document.createElement('div');go.id='globalOverlay';
      go.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:30;mix-blend-mode:multiply';
      document.body.appendChild(go);
    }
    var gc=S.globalOverlayColor||'#000000';
    var gr=parseInt(gc.substr(1,2),16),gg=parseInt(gc.substr(3,2),16),gb=parseInt(gc.substr(5,2),16);
    go.style.background='rgba('+gr+','+gg+','+gb+','+(S.globalOverlay/100).toFixed(2)+')';
  } else if(go){go.remove();}

  // SEO block (О товаре)
  if(S.seoBlock){
    var sb=S.seoBlock;
    var si=$('#seoBlockImg');if(si&&sb.img)si.src=sb.img;
    var sbd=$('#seoBlockBadge');if(sbd&&sb.badge)sbd.textContent=sb.badge;
    var st=$('#seoBlockTitle');if(st&&sb.title)st.textContent=sb.title;
    var sintr=$('#seoBlockIntro');if(sintr&&sb.intro)sintr.innerHTML=sb.intro;
  }

  // Footer text
  var fb=$('.footer__bottom');
  if(fb&&S.footerText){
    var adminLink=fb.querySelector('#adminBtn');
    var adminHtml=adminLink?adminLink.outerHTML:'';
    fb.innerHTML=esc(S.footerText)+' '+adminHtml;
    // Re-bind admin button (innerHTML destroyed old listener)
    var newBtn=$('#adminBtn');
    if(newBtn) newBtn.addEventListener('click',function(e){e.preventDefault();$('#adminLogin').classList.add('active');});
  }
  // Footer watermark
  if(S.footerWatermark){
    document.documentElement.style.setProperty('--footer-watermark','"'+S.footerWatermark+'"');
  }

  // Footer tagline
  var ftag=$('#footerTagline');if(ftag&&S.footerTagline!==undefined)ftag.textContent=S.footerTagline;

  // Footer phone
  var fpn=$('#footerPhone');
  if(fpn){
    var phoneRow=fpn.closest('p');
    if(S.footerShowPhone===false){
      if(phoneRow)phoneRow.style.display='none';
    } else {
      if(phoneRow)phoneRow.style.display='';
      if(S.phone){fpn.textContent=S.phone;fpn.href='tel:'+(S.phone||'').replace(/[^\d+]/g,'');}
    }
  }

  // Footer address + hours
  var fadr=$('#footerAddress');if(fadr&&S.footerAddress!==undefined)fadr.textContent=S.footerAddress;
  var fh1=$('#footerHours1');if(fh1&&S.footerHours1!==undefined)fh1.textContent=S.footerHours1;
  var fh2=$('#footerHours2');if(fh2&&S.footerHours2!==undefined)fh2.textContent=S.footerHours2;
  // Third hours line — create dynamically next to fh2 if needed
  var fcCol=$('#footerColContacts');
  if(fcCol){
    var fh3=$('#footerHours3');
    if(S.footerHours3){
      if(!fh3){fh3=document.createElement('p');fh3.id='footerHours3';if(fh2&&fh2.parentNode)fh2.parentNode.insertBefore(fh3,fh2.nextSibling);else fcCol.appendChild(fh3);}
      fh3.textContent=S.footerHours3;
    } else if(fh3){fh3.remove();}
  }

  // Footer column titles
  var flCol=$('#footerColLinks');
  if(flCol&&S.footerLinksTitle){var h5=flCol.querySelector('h5');if(h5)h5.textContent=S.footerLinksTitle;}
  var fcCol=$('#footerColContacts');
  if(fcCol&&S.footerContactsTitle){var h5=fcCol.querySelector('h5');if(h5)h5.textContent=S.footerContactsTitle;}

  // Footer links
  if(S.footerLinks&&flCol){
    var h5=flCol.querySelector('h5');
    flCol.innerHTML='';
    if(h5)flCol.appendChild(h5);
    else{var newH=document.createElement('h5');newH.textContent=S.footerLinksTitle||'Каталог';flCol.appendChild(newH);}
    S.footerLinks.forEach(function(l){
      var p=document.createElement('p');
      p.innerHTML='<a href="'+esc(l.href)+'">'+esc(l.text)+'</a>';
      flCol.appendChild(p);
    });
  }

  // Footer messengers
  var fmCol=$('#footerColMessengers');
  if(fmCol&&S.footerMessengers){
    fmCol.innerHTML='<h5>Мессенджеры</h5>';
    S.footerMessengers.forEach(function(m){
      var a=document.createElement('a');
      a.className='btn btn--whatsapp';a.style.marginBottom='8px';a.style.marginRight='8px';
      var label=m.type.charAt(0).toUpperCase()+m.type.slice(1);
      var href=m.phone||'';
      if(m.type==='whatsapp') href='https://wa.me/'+(m.phone||'').replace(/[^\d]/g,'');
      else if(m.type==='telegram') href=(m.phone||'').indexOf('http')===0?m.phone:'https://t.me/'+m.phone.replace(/^@/,'');
      else if(m.type==='viber') href='viber://chat?number='+(m.phone||'').replace(/[^\d+]/g,'');
      else if(m.type==='instagram') href=(m.phone||'').indexOf('http')===0?m.phone:'https://instagram.com/'+m.phone.replace(/^@/,'');
      a.href=href;a.target='_blank';a.rel='noopener';
      a.innerHTML='<span class="btn__inner">'+label+'</span>';
      fmCol.appendChild(a);
    });
  }

  // Header messengers
  if(S.headerMessengers){
    var hCTA=$('.header__cta');
    if(hCTA){
      // Remove old
      $$('.header__msg',hCTA).forEach(function(el){el.remove();});
      S.headerMessengers.forEach(function(m){
        var href='';
        if(m.type==='whatsapp')href='https://wa.me/'+(m.phone||'').replace(/[^\d]/g,'');
        else if(m.type==='telegram')href=(m.phone||'').indexOf('http')===0?m.phone:'https://t.me/'+m.phone.replace(/^@/,'');
        else if(m.type==='viber')href='viber://chat?number='+(m.phone||'').replace(/[^\d+]/g,'');
        else if(m.type==='instagram')href=(m.phone||'').indexOf('http')===0?m.phone:'https://instagram.com/'+m.phone.replace(/^@/,'');
        var a=document.createElement('a');
        a.className='header__msg';a.href=href;a.target='_blank';a.rel='noopener';
        a.title=m.type;
        a.style.cssText='display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--surface,rgba(255,255,255,.06));color:var(--mint,#2DDB85);font-weight:700;font-size:13px;text-decoration:none;transition:.2s';
        a.textContent=m.type.charAt(0).toUpperCase();
        hCTA.insertBefore(a,hCTA.firstChild);
      });
    }
  }

  // Block custom texts
  Object.keys(S.blockTexts||{}).forEach(function(bid){
    var el=$('[data-block="'+bid+'"]');if(!el)return;
    var container=el.querySelector('.container')||el;
    // Remove old custom texts
    container.querySelectorAll('.admin-custom-text').forEach(function(t){t.remove();});
    (S.blockTexts[bid]||[]).forEach(function(t){
      var div=document.createElement('div');div.className='admin-custom-text';
      div.style.cssText='margin:16px 0;font-size:16px;line-height:1.7;'+(t.style||'');
      div.innerHTML=t.text;
      container.appendChild(div);
    });
  });

  // Blog posts — only render if posts were modified via admin (have _modified flag)
  if(S._blogModified) renderBlogOnSite();
}

var _themeTimer=null;
window.applyTheme=function(){return applyTheme();};
window.applyAll=function(){return apply();};
function getThemePref(){
  return localStorage.getItem('eco_theme_pref')||S.themeMode||'auto';
}
function applyTheme(){
  var pref=getThemePref();
  var cls;
  if(pref==='dark') cls='theme-dark';
  else if(pref==='light') cls='theme-light';
  else {
    var ds=S.autoThemeDarkStart||'19:00', ls=S.autoThemeLightStart||'07:00';
    function mins(s){var m=(s||'').split(':');return (parseInt(m[0])||0)*60+(parseInt(m[1])||0);}
    var now=new Date(),cur=now.getHours()*60+now.getMinutes(),d=mins(ds),l=mins(ls);
    var isDark = d>l ? (cur>=d||cur<l) : (cur>=d&&cur<l);
    // Fallback to luminance if both equal
    if(d===l){var lum=getLuminance((S.colors&&S.colors.bg)||'#fff');isDark=lum<.5;}
    cls=isDark?'theme-dark':'theme-light';
  }
  document.body.classList.remove('theme-dark','theme-light');
  document.body.classList.add(cls);
  injectThemeVars();
  // Override inline bg/color set by apply() so theme wins
  var defaults=defs();
  var t=cls==='theme-light'
    ? Object.assign({},defaults.themeLight,S.themeLight||{})
    : Object.assign({},defaults.themeDark,S.themeDark||{});
  document.body.style.setProperty('background',t.bg,'important');
  document.body.style.setProperty('color',t.text,'important');
  var r=document.documentElement.style;
  r.setProperty('--bg',t.bg);r.setProperty('--surface',t.surface);r.setProperty('--surface-2',t.surface2);
  r.setProperty('--text',t.text);r.setProperty('--muted',t.textMuted);r.setProperty('--text-secondary',t.textMuted);
  r.setProperty('--accent',t.accent);r.setProperty('--mint',t.accent);r.setProperty('--mint-hover',t.accent);
  r.setProperty('--border',t.border);r.setProperty('--line',t.border);r.setProperty('--dark',t.text);
  var b=document.getElementById('themeBtn');
  if(b){
    var ic=pref==='dark'?'☾':pref==='light'?'☀':'◐';
    var t=pref==='auto'?'авто':(pref==='dark'?'тёмная':'светлая');
    var iEl=b.querySelector('.theme-btn__ic');if(iEl)iEl.textContent=ic;
    b.title='Тема: '+t+' (клик — переключить)';
  }
  // Re-check on schedule
  clearTimeout(_themeTimer);
  if(pref==='auto') _themeTimer=setTimeout(applyTheme,60000);
}
function injectThemeVars(){
  var defaults=defs();
  var d=Object.assign({},defaults.themeDark,S.themeDark||{});
  var l=Object.assign({},defaults.themeLight,S.themeLight||{});
  function rules(sel,t){
    return sel+'{'+
      '--bg:'+t.bg+';--bg-soft:'+t.surface+';--surface:'+t.surface+';--surface-2:'+t.surface2+';'+
      '--text:'+t.text+';--text-secondary:'+t.textMuted+';--muted:'+t.textMuted+';'+
      '--accent:'+t.accent+';--mint:'+t.accent+';--mint-hover:'+t.accent+';--border:'+t.border+';'+
      '--dark:'+t.text+';--line:'+t.border+';'+
      'background:'+t.bg+'!important;color:'+t.text+'!important;'+
    '}'+
    sel+',' +sel+' main,'+sel+' section,'+sel+' .hero,'+sel+' .stats,'+sel+' .marquee,'+sel+' .features,'+sel+' .delivery,'+sel+' .steps,'+sel+' .reviews,'+sel+' .faq,'+sel+' .about,'+sel+' .gallery,'+sel+' .blog,'+sel+' .newsletter,'+sel+' .upsell,'+sel+' .seo,'+sel+' .catalog,'+sel+' .calc-section{background:'+t.bg+'!important;color:'+t.text+'!important}'+
    sel+' h1,'+sel+' h2,'+sel+' h3,'+sel+' h4,'+sel+' h5{color:'+t.text+'!important}'+
    sel+' p,'+sel+' span,'+sel+' li,'+sel+' label{color:inherit!important}'+
    sel+' a:not(.btn):not(.theme-btn):not(.header__phone){color:inherit}'+
    sel+' .card,'+sel+' .upsell,'+sel+' .delivery__card,'+sel+' .blog-card,'+sel+' .review,'+sel+' .feature,'+sel+' .faq details,'+sel+' .form,'+sel+' .calc,'+sel+' .gallery__item,'+sel+' .stat,'+sel+' .promo__card,'+sel+' .seo-block,'+sel+' .cart-panel,'+sel+' .header__phone,'+sel+' .theme-btn,'+sel+' .timer__cell,'+sel+' .steps li,'+sel+' .hero__badge,'+sel+' .hero__hooks li,'+sel+' .about__media,'+sel+' .about__value{background:'+t.surface+'!important;border-color:'+t.border+'!important;color:'+t.text+'!important}'+
    sel+' .card__specs,'+sel+' .card p,'+sel+' .card__price small,'+sel+' .card__size,'+sel+' .card__pallet,'+sel+' .hero__sub,'+sel+' .hero__caption,'+sel+' .section__head p,'+sel+' .review p,'+sel+' .blog-card__excerpt,'+sel+' .blog-card__date,'+sel+' .stat span,'+sel+' .delivery__price,'+sel+' .upsell__price,'+sel+' .form__note,'+sel+' .review__head span,'+sel+' .faq p,'+sel+' .feature p,'+sel+' .steps p{color:'+t.textMuted+'!important}'+
    sel+' .nav a{color:'+t.textMuted+'!important;background:transparent!important}'+
    sel+' .nav a:hover{color:'+t.text+'!important;background:'+t.surface2+'!important}'+
    sel+' .header,'+sel+' .footer,'+sel+' .topbar{background:'+t.bg+'!important;border-color:'+t.border+'!important}'+
    sel+' .calc__form input,'+sel+' .calc__form select,'+sel+' .form input,'+sel+' .form textarea,'+sel+' .newsletter__form input{background:'+t.surface+'!important;color:'+t.text+'!important;border-color:'+t.border+'!important}'+
    sel+' .calc__result{background:'+t.surface+'!important;border-color:'+t.border+'!important;color:'+t.text+'!important}'+
    sel+' .hero__title,'+sel+' .hero__title *{color:'+t.text+'!important}'+
    sel+' .hero__title .accent,'+sel+' .section__head h2 em,'+sel+' .section__head h2 i,'+sel+' .calc__total b,'+sel+' .delivery__price b,'+sel+' .upsell__price b{color:'+t.accent+'!important}'+
    // Sweeping override: any text inside main sections gets theme text color
    sel+' main *:not(.btn):not(.btn__inner):not(.btn *):not(.card__tag):not(.blog-card__cat):not(.promo__tag):not(.hero__badge):not(.eyebrow):not(.media-badge):not(.price-badge):not(.price-badge *):not(.timer__cell):not(.timer__cell *):not(input):not(select):not(textarea){color:inherit}'+
    // Header / cart / forms — rewrite to surface (do NOT touch promo__card / section--dark / newsletter to keep their branded look)
    sel+' .header,'+sel+' .header--scrolled,'+sel+' .hero__media,'+sel+' .cart-panel,'+sel+' .form,'+sel+' .faq details,'+sel+' .seo-block__specs li{background:'+t.surface+'!important;color:'+t.text+'!important;border-color:'+t.border+'!important}'+
    // Filled buttons — always white text on coloured background
    sel+' .btn--primary .btn__inner,'+sel+' .btn--accent .btn__inner,'+sel+' .btn--whatsapp .btn__inner,'+sel+' .btn--primary,'+sel+' .btn--accent{color:#fff!important}'+
    sel+' .btn--primary .btn__inner svg,'+sel+' .btn--accent .btn__inner svg{stroke:#fff!important}'+
    'html '+sel+' .promo--classic .promo__tag{background:#FFE9DD!important;color:#D94E1F!important}'+
    'html '+sel+' .promo--classic .btn--primary .btn__inner,html '+sel+' .promo--classic .btn--accent .btn__inner{background:'+t.accent+'!important;color:#fff!important;box-shadow:0 8px 24px rgba(45,219,133,.35)!important}'+
    'html '+sel+' .promo--classic .btn--primary .btn__inner svg,html '+sel+' .promo--classic .btn--accent .btn__inner svg{stroke:#fff!important}'+
    'html '+sel+' .promo--classic .btn::before,html '+sel+' .promo--classic .btn::after{display:none!important}'+
    // Footer / newsletter / section--dark — keep dark with white text (high specificity)
    'html '+sel+' .footer,html '+sel+' .newsletter,html '+sel+' .section--dark:not(#form){background:#1A1A1A!important;color:#fff!important;border-color:transparent!important}'+
    'html '+sel+' .footer p,html '+sel+' .footer a,html '+sel+' .footer h5,html '+sel+' .footer span,html '+sel+' .footer__bottom,html '+sel+' .footer .icon,html '+sel+' .newsletter p,html '+sel+' .newsletter h2,html '+sel+' .newsletter h3,html '+sel+' .section--dark h2,html '+sel+' .section--dark h3,html '+sel+' .section--dark p,html '+sel+' .form__text h2,html '+sel+' .form__text p{color:#fff!important}'+
    'html '+sel+' .footer p,html '+sel+' .footer a:not(:hover){color:rgba(255,255,255,.7)!important}'+
    'html '+sel+' .footer h5,html '+sel+' .footer__bottom>span{color:#fff!important}'+
    'html '+sel+' .footer a:hover{color:'+t.accent+'!important}'+
    // Form section — give it bg-soft so the white form card is distinguishable
    'html '+sel+' [data-block="form"],html '+sel+' [data-block="newsletter"]+section,html '+sel+' .form-section{background:'+t.surface2+'!important}'+
    'html '+sel+' .form{background:#fff!important;color:'+t.text+'!important;border:1px solid '+t.border+'!important;box-shadow:0 8px 30px rgba(0,0,0,.06)!important}'+
    'html '+sel+' .form input,html '+sel+' .form textarea{background:'+t.surface2+'!important;color:'+t.text+'!important;border-color:'+t.border+'!important}'+
    'html '+sel+' .form label{color:'+t.text+'!important}'+
    'html '+sel+' .form__note{color:'+t.textMuted+'!important}'+
    // Features section — make sure feature cards are visible on light bg
    'html '+sel+' .feature__ic{background:'+t.accent+'!important;color:#fff!important}'+
    'html '+sel+' .feature__ic svg{stroke:#fff!important}'+
    // Form section text — dark heading + muted description on light surface
    // Form section: light card on light bg (#form has .section--dark but we override)
    'html '+sel+' #form,html '+sel+' section#form{background:'+t.surface2+'!important;color:'+t.text+'!important}'+
    'html '+sel+' #form .form__text h2,html '+sel+' #form .form__text *{color:'+t.text+'!important}'+
    'html '+sel+' #form .form__text p{color:'+t.textMuted+'!important}'+
    'html '+sel+' #form .form{background:'+t.surface+'!important;color:'+t.text+'!important;border:1px solid '+t.border+'!important;box-shadow:0 12px 40px rgba(0,0,0,.06)!important}'+
    'html '+sel+' #form .form input,html '+sel+' #form .form textarea{background:'+t.bg+'!important;color:'+t.text+'!important;border:1px solid '+t.border+'!important}'+
    'html '+sel+' #form .form label{color:'+t.text+'!important}'+
    'html '+sel+' #form .form__benefits li{color:'+t.text+'!important}'+
    // Promo: keep light, ensure visible button
    'html '+sel+' .promo--classic .promo__card{background:'+t.surface+'!important;color:'+t.text+'!important;border:1px solid '+t.border+'!important;box-shadow:0 12px 40px rgba(0,0,0,.06)!important}'+
    'html '+sel+' .promo--classic .promo__title,html '+sel+' .promo--classic .promo__title *{color:'+t.text+'!important}'+
    'html '+sel+' .promo--classic .promo__desc,html '+sel+' .promo--classic .promo__desc *,html '+sel+' .promo--classic .promo__caption{color:'+t.textMuted+'!important}'+
    'html '+sel+' .promo--classic .promo__desc b{color:'+t.text+'!important}'+
    'html '+sel+' .promo--classic .timer__cell{background:'+t.surface2+'!important;border:1px solid '+t.border+'!important}'+
    'html '+sel+' .promo--classic .timer__cell span{color:'+t.text+'!important}'+
    'html '+sel+' .promo--classic .timer__cell small,html '+sel+' .promo--classic .timer__sep{color:'+t.textMuted+'!important}'+
    sel+' body,'+sel+'{background:'+t.bg+'!important}'+
    // Logo — use dark text
    sel+' .logo__text,'+sel+' .header .logo__text{color:'+t.text+'!important}'+
    sel+' .logo__text b{color:'+t.accent+'!important}'+
    // Highest-specificity override for unscoped white-text rules in main.css
    'html '+sel+' h1,html '+sel+' h2,html '+sel+' h3,html '+sel+' h4,html '+sel+' h5,html '+sel+' h6,'+
    'html '+sel+' .card__body h3,html '+sel+' .upsell h3,html '+sel+' .delivery__card h3,html '+sel+' .review__head b,html '+sel+' .blog-card__title,html '+sel+' .faq summary,html '+sel+' .feature h4,html '+sel+' .steps h4,html '+sel+' .about__value h4,html '+sel+' .stat b,html '+sel+' .card__price b,html '+sel+' .card__pallet b,html '+sel+' .card__specs b,html '+sel+' .form__text h2,html '+sel+' .promo__title,html '+sel+' .seo-block__text h2,html '+sel+' .seo-block__text h3,html '+sel+' .footer h5,html '+sel+' .timer__cell span,html '+sel+' .form label,html '+sel+' .calc__form label,html '+sel+' .calc__result b,html '+sel+' .hero__sub b,html '+sel+' .form__benefits li,html '+sel+' .seo-block__list li,html '+sel+' .seo-block__text p b,html '+sel+' .promo__desc b{color:'+t.text+'!important}'+
    'html '+sel+' .card p,html '+sel+' .upsell p,html '+sel+' .delivery__card p,html '+sel+' .review p,html '+sel+' .blog-card__excerpt,html '+sel+' .faq p,html '+sel+' .feature p,html '+sel+' .steps p,html '+sel+' .about__text p,html '+sel+' .about__value p,html '+sel+' .section__head p,html '+sel+' .card__specs,html '+sel+' .card__specs li,html '+sel+' .card__price small,html '+sel+' .card__size,html '+sel+' .card__old-price,html '+sel+' .card__pallet,html '+sel+' .delivery__price,html '+sel+' .delivery__price small,html '+sel+' .upsell__price,html '+sel+' .review__head span,html '+sel+' .blog-card__date,html '+sel+' .stat span,html '+sel+' .calc__form label,html '+sel+' .calc__result>div,html '+sel+' .form__note,html '+sel+' .seo-block__text p,html '+sel+' .seo-block__specs li,html '+sel+' .hero__sub,html '+sel+' .hero__hooks li,html '+sel+' .hero__badge,html '+sel+' .hero__caption{color:'+t.textMuted+'!important}'+
    'html '+sel+' .hero__title{color:'+t.text+'!important}'+
    'html '+sel+' .hero__title .accent,html '+sel+' .section__head h2 em,html '+sel+' .section__head h2 i,html '+sel+' .calc__total b,html '+sel+' .delivery__price b,html '+sel+' .upsell__price b,html '+sel+' .stat:hover b,html '+sel+' .seo-block__specs b,html '+sel+' .footer a:hover{color:'+t.accent+'!important}'+
    'html '+sel+' .form,html '+sel+' .faq details,html '+sel+' .seo-block__specs li,html '+sel+' .cart-panel,html '+sel+' .calc__result,html '+sel+' .calc__form input,html '+sel+' .calc__form select,html '+sel+' .form input,html '+sel+' .form textarea{background:'+t.surface+'!important;color:'+t.text+'!important;border-color:'+t.border+'!important}';
  }
  var css=rules('body.theme-dark',d)+rules('body.theme-light',l);
  var st=document.getElementById('admin-theme-vars');
  if(!st){st=document.createElement('style');st.id='admin-theme-vars';document.head.appendChild(st);}
  st.textContent=css;
}

function applyCustomCode(){
  document.querySelectorAll('[data-admin-code]').forEach(function(n){n.remove();});
  function inject(target,code){
    if(!code)return;
    var tmp=document.createElement('div');tmp.innerHTML=code;
    Array.from(tmp.childNodes).forEach(function(n){
      if(n.nodeType===1 && n.tagName==='SCRIPT'){
        var s=document.createElement('script');
        Array.from(n.attributes).forEach(function(a){s.setAttribute(a.name,a.value);});
        s.text=n.textContent||'';
        s.setAttribute('data-admin-code','1');
        target.appendChild(s);
      } else {
        if(n.nodeType===1) n.setAttribute('data-admin-code','1');
        target.appendChild(n);
      }
    });
  }
  inject(document.head,S.headCode);
  inject(document.body,S.bodyCode);
}
function applySectionHeads(){
  if(!S.sectionHeads)return;
  Object.keys(S.sectionHeads).forEach(function(bid){
    var sec=document.querySelector('[data-block="'+bid+'"]');if(!sec)return;
    var d=S.sectionHeads[bid]||{};
    var head=sec.querySelector('.section__head')||sec;
    if(d.eyebrow!==undefined){var e=head.querySelector('.eyebrow');if(e)e.innerHTML=esc(d.eyebrow);}
    if(d.title!==undefined){var h=head.querySelector('h2, h1');if(h)h.innerHTML=esc(d.title);}
    if(d.sub!==undefined){
      var p=head.querySelector('p');
      if(!p && d.sub){p=document.createElement('p');head.appendChild(p);}
      if(p)p.innerHTML=d.sub;
    }
  });
}

function applyFeaturesBlock(){
  var sec=document.querySelector('[data-block="features"]');if(!sec)return;
  // Merge with defaults so missing fields don't break things
  var defaults=defs().featuresBlock;
  var f=Object.assign({},defaults,S.featuresBlock||{});
  if(!Array.isArray(f.items)||!f.items.length) f.items=defaults.items;
  // Clear old inline
  sec.style.removeProperty('background');sec.style.removeProperty('color');
  sec.querySelectorAll('.section__head h2,.section__head .eyebrow,.feature,.feature h4,.feature p,.feature__ic').forEach(function(el){
    el.style.cssText='';
  });
  // Content: header
  var ey=sec.querySelector('.eyebrow');if(ey)ey.textContent=f.eyebrow;
  var h=sec.querySelector('.section__head h2');if(h)h.textContent=f.title;
  // Content: cards
  var grid=sec.querySelector('.features');
  if(grid){
    grid.innerHTML='';
    f.items.forEach(function(it){
      var d=document.createElement('div');d.className='feature';
      d.style.opacity='1';d.style.transform='none';d.style.visibility='visible';
      d.innerHTML='<div class="feature__ic"><svg class="icon icon--lg"><use href="#'+esc(it.icon||'i-award')+'"/></svg></div>'+
        '<h4>'+esc(it.title||'')+'</h4><p>'+esc(it.desc||'')+'</p>';
      grid.appendChild(d);
    });
  }
  // Section bg
  var mode=f.bgMode||'theme';
  if(mode!=='theme'){
    var bg,col;
    if(mode==='dark'){bg='#0B0F12';col='#fff';}
    else if(mode==='light'){bg='#F6F5F2';col='#1A1A1A';}
    else {bg=f.bgColor||'#1A1A1A';col=f.textColor||'#fff';}
    sec.style.setProperty('background',bg,'important');
    sec.style.setProperty('color',col,'important');
    sec.querySelectorAll('.section__head h2,.section__head .eyebrow').forEach(function(el){el.style.setProperty('color',col,'important');});
  }
  // Card customization
  if(f.cardMode==='custom'){
    sec.querySelectorAll('.feature').forEach(function(el){
      el.style.setProperty('background',f.cardBg||'#fff','important');
      el.style.setProperty('border','1px solid '+(f.cardBorder||'#e8e8e8'),'important');
    });
    sec.querySelectorAll('.feature h4').forEach(function(el){el.style.setProperty('color',f.cardTitleColor||'#1A1A1A','important');});
    sec.querySelectorAll('.feature p').forEach(function(el){el.style.setProperty('color',f.cardDescColor||'#6B6B6B','important');});
    sec.querySelectorAll('.feature__ic').forEach(function(el){
      el.style.setProperty('background',f.cardIconBg||'#2A7A5F','important');
      el.style.setProperty('color',f.cardIconColor||'#fff','important');
    });
    sec.querySelectorAll('.feature__ic svg').forEach(function(el){el.style.setProperty('stroke',f.cardIconColor||'#fff','important');});
  }
}

function applyFooterCallBtn(){
  var b=document.getElementById('footerCallBtn');if(!b)return;
  var f=S.footerCallBtn||{show:true,text:'Позвонить нам'};
  if(f.show===false){b.style.display='none';return;}
  b.style.display='inline-flex';
  b.href='tel:'+(S.phone||'').replace(/[^\d+]/g,'');
  var inner=b.querySelector('.btn__inner');
  if(inner) inner.innerHTML='<svg class="icon" style="stroke:#fff"><use href="#i-phone"/></svg> '+esc(f.text||'Позвонить нам');
}

function parseYoutubeId(url){
  if(!url)return null;
  var m=url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  return m?m[1]:null;
}

var _slideTimer=null;
function renderHeroSlides(){
  var heroMedia=$('#heroMedia');if(!heroMedia)return;
  // Determine slides
  var slides=[];
  if(S.heroSlides&&S.heroSlides.length){
    slides=S.heroSlides;
  } else if(S.heroMedia){
    slides=[{type:S.heroMediaType||'img',src:S.heroMedia,badge:'',badgeOn:true}];
  } else {
    // Default — 3-slide showcase (autoclave → bricklayer → pallets)
    slides=[
      {type:'img',src:'assets/img/hero-autoclave.jpg',badge:'',badgeOn:true},
      {type:'img',src:'assets/img/hero-bricklayer.jpg',badge:'',badgeOn:true},
      {type:'img',src:'assets/img/hero-pallets.webp',badge:'',badgeOn:true}
    ];
  }

  heroMedia.innerHTML='';
  var slidesWrap=document.createElement('div');slidesWrap.style.cssText='position:absolute;inset:0';
  slides.forEach(function(slide,i){
    var s=document.createElement('div');
    s.className='hero__slide'+(i===0?' active':'');
    if(slide.type==='youtube'){
      var id=parseYoutubeId(slide.src);
      if(id){
        var orient=slide.orientation||'horizontal';
        s.className+=' hero__slide--youtube hero__slide--youtube-'+orient;
        s.innerHTML='<iframe src="https://www.youtube.com/embed/'+id+'?autoplay=1&mute=1&loop=1&playlist='+id+'&controls=0&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      }
    } else if(slide.type==='video'){
      s.innerHTML='<video autoplay muted loop playsinline><source src="'+esc(slide.src)+'"></video>';
    } else {
      s.innerHTML='<img src="'+esc(slide.src)+'" alt="" loading="eager">';
    }
    // Badge
    if(S.heroBadgeGlobal!==false && slide.badgeOn!==false && slide.badge){
      var b=document.createElement('div');b.className='media-badge';b.textContent=slide.badge;
      s.appendChild(b);
    }
    slidesWrap.appendChild(s);
  });
  heroMedia.appendChild(slidesWrap);

  // Dots + arrows if more than 1 slide
  if(slides.length>1){
    var dots=document.createElement('div');dots.className='hero__dots';
    slides.forEach(function(_,i){
      var d=document.createElement('button');d.type='button';if(i===0)d.classList.add('active');
      d.addEventListener('click',function(){showSlide(i);});
      dots.appendChild(d);
    });
    heroMedia.appendChild(dots);

    var arr=document.createElement('div');arr.className='hero__arrows';
    arr.innerHTML='<button type="button" class="prev" aria-label="Previous">‹</button><button type="button" class="next" aria-label="Next">›</button>';
    heroMedia.appendChild(arr);
    arr.querySelector('.prev').addEventListener('click',function(){showSlide((_curSlide-1+slides.length)%slides.length);});
    arr.querySelector('.next').addEventListener('click',function(){showSlide((_curSlide+1)%slides.length);});

    // Autoplay
    clearInterval(_slideTimer);
    var interval=(S.heroSlideInterval||5)*1000;
    _slideTimer=setInterval(function(){showSlide((_curSlide+1)%slides.length);},interval);
  }
}
var _curSlide=0;
function showSlide(i){
  var slides=$$('.hero__slide');var dots=$$('.hero__dots button');
  slides.forEach(function(s,j){s.classList.toggle('active',i===j);});
  dots.forEach(function(d,j){d.classList.toggle('active',i===j);});
  _curSlide=i;
}

function applyBtnStyle(){
  document.body.classList.remove('btn-style-shiny','btn-style-flat');
  document.body.classList.add(S.btnStyle===1?'btn-style-flat':'btn-style-shiny');
  // Custom btn colors
  document.documentElement.style.setProperty('--btn-color1',S.btnColor1||'#1A1A1A');
  document.documentElement.style.setProperty('--btn-color2',S.btnColor2||'#2A7A5F');
}

function renderBlogOnSite(){
  var grid=$('#blog .blog__grid');if(!grid||!S.blogPosts)return;
  grid.innerHTML='';
  S.blogPosts.forEach(function(p){
    grid.innerHTML+=
      '<article class="blog-card reveal in-view"><div class="blog-card__img"><img src="'+esc(p.img||'assets/img/block-200.png')+'" alt="'+esc(p.title)+'" loading="lazy"><span class="blog-card__cat">'+esc(p.cat)+'</span></div>'+
      '<div class="blog-card__body"><div class="blog-card__date">'+esc(p.date)+'</div>'+
      '<h3 class="blog-card__title">'+esc(p.title)+'</h3>'+
      '<p class="blog-card__excerpt">'+esc(p.excerpt)+'</p>'+
      '<a href="'+(p.url?esc(p.url):'#')+'" '+(p.url?'target="_blank" rel="noopener"':'')+' class="blog-card__link">Читать статью</a></div></article>';
  });
}

// ============================================================
// BUILD ADMIN PANEL
// ============================================================
function build(){
  // Login
  var lg=document.createElement('div');lg.className='admin-login';lg.id='adminLogin';
  lg.innerHTML='<div class="admin-login__box"><h2>Админ-панель</h2><p>Введите пароль</p><input type="password" id="adminPass" placeholder="Пароль"><button class="admin-login-btn" id="adminLoginBtn">Войти</button><div class="admin-login__err" id="adminErr">Неверный пароль</div></div>';
  document.body.appendChild(lg);

  // Panel
  var p=document.createElement('div');p.className='admin-panel';p.id='adminPanel';
  p.innerHTML=
    '<div class="admin-panel__header"><h3>Админ-панель</h3><button class="admin-panel__close" id="adminClose">&times;</button></div>'+
    '<div class="admin-tabs admin-tabs--top" id="adminTabs">'+
      TAB_GROUPS.map(function(g,i){return '<button class="admin-tab'+(i===0?' active':'')+'" data-group="'+g.id+'">'+g.icon+' '+g.label+'</button>';}).join('')+
    '</div>'+
    '<div class="admin-subtabs" id="adminSubtabs"></div>'+
    '<div class="admin-content" id="adminContent"></div>';
  document.body.appendChild(p);
}
// Legacy helper — unused but kept for compatibility
function tab(id,label){return '<button class="admin-tab" data-tab="'+id+'">'+label+'</button>';}

// ============================================================
// TAB GROUPS — 6 logical categories grouping 19 original tabs
// ============================================================
var TAB_GROUPS=[
  {id:'design',label:'Оформление',icon:'🎨',subs:[
    {id:'theme',label:'Темы',fn:'tabTheme',bind:'bindTheme'},
    {id:'colors',label:'Палитра',fn:'tabColors',bind:'bindColors'},
    {id:'buttons',label:'Кнопки',fn:'tabButtons',bind:'bindButtons'},
    {id:'styles',label:'Стили',fn:'tabStyles',bind:'bindStyles'}
  ]},
  {id:'structure',label:'Структура',icon:'📐',subs:[
    {id:'blocks',label:'Блоки',fn:'tabBlocks',bind:'bindBlocks'},
    {id:'menu',label:'Меню',fn:'tabMenu',bind:'bindMenu'}
  ]},
  {id:'footer',label:'Подвал',icon:'🦶',subs:[
    {id:'footer-main',label:'Тексты и контакты',fn:'tabFooter',bind:'bindFooter'}
  ]},
  {id:'content',label:'Контент',icon:'📄',subs:[
    {id:'general',label:'Главная',fn:'tabGeneral',bind:'bindGeneral'},
    {id:'promo',label:'Акция',fn:'tabPromo',bind:'bindPromo'},
    {id:'features',label:'Почему мы',fn:'tabFeatures',bind:'bindFeatures'},
    {id:'content',label:'Секции',fn:'tabContent',bind:'bindContent'},
    {id:'headings',label:'Заголовки',fn:'tabHeadings',bind:'bindHeadings'},
    {id:'about',label:'О нас',fn:'tabAbout',bind:'bindAboutTab'},
    {id:'seoblock',label:'О товаре',fn:'tabSeoBlock',bind:'bindSeoBlock'},
    {id:'texts',label:'Свои тексты',fn:'tabTexts',bind:'bindTexts'}
  ]},
  {id:'media',label:'Медиа',icon:'🖼',subs:[
    {id:'media',label:'Медиа блоков',fn:'tabMedia',bind:'bindMedia'},
    {id:'gallery',label:'Галерея',fn:'tabGallery',bind:'bindGallery'}
  ]},
  {id:'commerce',label:'Каталог',icon:'🛒',subs:[
    {id:'cards',label:'Товары',fn:'tabCards',bind:'bindCards'},
    {id:'calc',label:'Калькулятор',fn:'tabCalc',bind:'bindCalc'}
  ]},
  {id:'articles',label:'Статьи',icon:'📰',subs:[
    {id:'blog',label:'Список постов',fn:'tabBlog',bind:'bindBlogTab'}
  ]}
];

// ============================================================
// TAB RENDERERS
// ============================================================
function renderTab(groupOrTab,subId){
  // Back-compat: if called with an old single tab id, find its group
  var g,sub;
  if(!subId && groupOrTab){
    // If it matches a group id — use it
    g=TAB_GROUPS.find(function(x){return x.id===groupOrTab;});
    if(!g){
      // Treat as legacy sub id, locate its group
      for(var i=0;i<TAB_GROUPS.length;i++){
        var found=TAB_GROUPS[i].subs.find(function(s){return s.id===groupOrTab;});
        if(found){g=TAB_GROUPS[i];sub=found;break;}
      }
    }
  } else {
    g=TAB_GROUPS.find(function(x){return x.id===groupOrTab;});
  }
  if(!g) g=TAB_GROUPS[0];
  if(!sub) sub=g.subs.find(function(x){return x.id===subId;})||g.subs[0];

  // Top tabs active state
  $$('.admin-tabs--top .admin-tab').forEach(function(b){
    b.classList.toggle('active',b.dataset.group===g.id);
  });

  // Subtabs
  var st=$('#adminSubtabs');
  if(st){
    st.innerHTML=g.subs.map(function(s){
      return '<button class="admin-subtab'+(s.id===sub.id?' active':'')+'" data-sub="'+s.id+'">'+s.label+'</button>';
    }).join('');
    $$('.admin-subtab',st).forEach(function(b){b.addEventListener('click',function(){
      renderTab(g.id,b.dataset.sub);
    });});
  }

  // Content + bind
  var c=$('#adminContent');
  if(typeof window[sub.fn]==='function') c.innerHTML=window[sub.fn]();
  if(sub.bind && typeof window[sub.bind]==='function') window[sub.bind]();
}

function tabGeneral(){
  return grp('Логотип (3:1)','<div class="admin-upload" id="logoUp"><input type="file" accept="image/*" id="logoF"><div class="admin-upload__label">Загрузить логотип</div></div><div id="logoPrev"></div><button class="admin-btn admin-btn--ghost admin-btn--sm" id="logoRm" style="display:none">Удалить</button>')+
    grp('Название компании','<input class="admin-input" id="adName" value="'+esc(S.companyName)+'">'+
    '<div class="admin-color" style="margin-top:8px"><label>Цвет названия</label><input type="color" id="adNameCol" value="'+(S.nameColor||'#1A1A1A')+'"></div>')+
    grp('Шапка — справа от меню','<label style="flex-direction:row;gap:8px;align-items:center;font-weight:400"><input type="checkbox" id="adShowPhone" '+(S.showPhone!==false?'checked':'')+' style="width:auto"> Показывать</label>'+
    '<div style="display:flex;gap:8px;margin-top:8px"><label style="flex-direction:row;gap:4px;font-weight:400"><input type="radio" name="hInfoMode" value="phone" '+(S.headerInfoMode!=='text'?'checked':'')+' style="width:auto"> Телефон</label>'+
    '<label style="flex-direction:row;gap:4px;font-weight:400"><input type="radio" name="hInfoMode" value="text" '+(S.headerInfoMode==='text'?'checked':'')+' style="width:auto"> Свой текст</label></div>'+
    '<input class="admin-input" id="adPhone" value="'+esc(S.phone||'')+'" placeholder="Телефон" style="margin-top:8px">'+
    '<input class="admin-input" id="adHeaderText" value="'+esc(S.headerInfoText||'')+'" placeholder="Свой текст (напр. Доставка по РК)" style="margin-top:6px">')+
    grp('Слайд-шоу главного экрана','<div id="heroSlidesList"></div>'+
    '<button class="admin-btn admin-btn--accent admin-btn--sm" id="heroSlideAdd" style="margin-top:8px">+ Добавить слайд</button>'+
    '<label class="admin-label" style="margin-top:12px">Интервал перелистывания (сек)<input class="admin-input" id="heroInterval" type="number" min="2" max="30" value="'+(S.heroSlideInterval||5)+'"></label>'+
    '<label style="flex-direction:row;gap:8px;align-items:center;font-weight:400;margin-top:8px"><input type="checkbox" id="heroBadges" '+(S.heroBadgeGlobal!==false?'checked':'')+' style="width:auto"> Показывать бейджи на фото</label>')+
    grp('Главный экран — подпись','<input class="admin-input" id="adCaption" value="'+esc(S.heroCaption||'')+'" placeholder="Подпись под фото">')+
    grp('Главный экран — цена','<input class="admin-input" id="adPriceVal" value="'+esc(S.heroPriceVal||'35 000')+'" placeholder="35 000">'+
    '<input class="admin-input" id="adPriceNote" value="'+esc(S.heroPriceNote||'')+'" placeholder="фиксируется на 3 дня" style="margin-top:6px">')+
    grp('Бегущая строка','<textarea class="admin-textarea" id="adMarq" rows="4" placeholder="Каждая строка = элемент">'+S.marqueeItems.join('\n')+'</textarea>')+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="saveGen">Сохранить</button>';
}

function tabPromo(){
  var v=S.promoVariant||'classic';
  var variants='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px">'+
    '<div class="admin-preset'+(v==='classic'?' active':'')+'" data-pv="classic" style="padding:14px 10px;text-align:center">'+
      '<div style="width:100%;height:40px;background:linear-gradient(135deg,#1A1A1A,#2A2A27);border-radius:6px;margin-bottom:6px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:700">⏱ 00:00:00</div>'+
      '<span style="font-size:11px;font-weight:600">Классический</span>'+
    '</div>'+
    '<div class="admin-preset'+(v==='banner'?' active':'')+'" data-pv="banner" style="padding:14px 10px;text-align:center">'+
      '<div style="width:100%;height:40px;background:linear-gradient(135deg,#FF8C42,#D94E1F);border-radius:6px;margin-bottom:6px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:800;letter-spacing:.1em">АКЦИЯ</div>'+
      '<span style="font-size:11px;font-weight:600">Баннер</span>'+
    '</div>'+
    '<div class="admin-preset'+(v==='split'?' active':'')+'" data-pv="split" style="padding:14px 10px;text-align:center">'+
      '<div style="width:100%;height:40px;background:linear-gradient(90deg,#2DDB85 40%,#1A1A1A 40%);border-radius:6px;margin-bottom:6px;display:flex;align-items:center;font-size:14px;color:#0B0F12;font-weight:800;padding-left:8px">−10%</div>'+
      '<span style="font-size:11px;font-weight:600">Сплит</span>'+
    '</div>'+
  '</div>';
  var splitFields=v==='split'?
    grp('Скидка (крупно)','<input class="admin-input" id="apDiscount" value="'+esc(S.promoDiscount||'−10%')+'" placeholder="−10%">')+
    grp('Подпись под скидкой','<input class="admin-input" id="apDiscountLabel" value="'+esc(S.promoDiscountLabel||'скидка<br>на газоблок D600')+'" placeholder="скидка на газоблок D600">')
  :'';
  var bgMode=S.promoBgMode||'theme';
  function bgRadio(val,label){return '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="apBgMode" value="'+val+'" '+(bgMode===val?'checked':'')+' style="width:auto"> '+label+'</label>';}
  var bgFields='<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:10px">'+bgRadio('theme','По теме сайта')+bgRadio('dark','Тёмный (#1A1A1A, белый текст)')+bgRadio('custom','Свой цвет')+'</div>'+
    '<div id="apBgCustom" style="display:'+(bgMode==='custom'?'block':'none')+'">'+
      '<div class="admin-color"><label>Цвет фона карточки</label><input type="color" id="apBgColor" value="'+(S.promoBgColor||'#1A1A1A')+'"></div>'+
      '<div class="admin-color"><label>Цвет текста</label><input type="color" id="apTextColor" value="'+(S.promoTextColor||'#FFFFFF')+'"></div>'+
    '</div>'+
    '<p style="font-size:11px;color:#999">«По теме сайта» — карточка адаптируется к светлой/тёмной теме автоматически. «Тёмный» — всегда тёмный фон с белым текстом (хорошо для светлой темы).</p>';
  var mt=S.promoMediaType||'none';
  var mediaPreview='';
  if(S.promoMedia&&mt==='image')mediaPreview='<img src="'+esc(S.promoMedia)+'" style="max-width:100%;max-height:100px;border-radius:8px;margin-top:8px">';
  else if(S.promoMedia&&mt==='video')mediaPreview='<video src="'+esc(S.promoMedia)+'" style="max-width:100%;max-height:100px;border-radius:8px;margin-top:8px" muted></video>';
  else if(S.promoMedia&&mt==='youtube')mediaPreview='<div style="font-size:11px;color:#666;margin-top:6px">YouTube: '+esc(S.promoMedia)+'</div>';
  var mediaFields='<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px">'+
      '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="apMt" value="none" '+(mt==='none'?'checked':'')+' style="width:auto"> Без фона</label>'+
      '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="apMt" value="image" '+(mt==='image'?'checked':'')+' style="width:auto"> Фото</label>'+
      '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="apMt" value="video" '+(mt==='video'?'checked':'')+' style="width:auto"> Видео</label>'+
      '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="apMt" value="youtube" '+(mt==='youtube'?'checked':'')+' style="width:auto"> YouTube</label>'+
    '</div>'+
    '<div class="admin-upload" id="apMediaUp" style="display:'+(mt==='image'||mt==='video'?'block':'none')+'">'+
      '<input type="file" accept="image/*,video/*" id="apMediaF">'+
      '<div class="admin-upload__label">Перетащите файл или нажмите для загрузки</div>'+
    '</div>'+
    '<input class="admin-input" id="apMediaUrl" value="'+esc(S.promoMedia||'')+'" placeholder="URL фото/видео/YouTube" style="margin-top:6px">'+
    '<div id="apMediaPrev">'+mediaPreview+'</div>'+
    '<button class="admin-btn admin-btn--ghost admin-btn--sm" id="apMediaRm" style="margin-top:6px;display:'+(S.promoMedia?'inline-flex':'none')+'">Удалить фон</button>'+
    '<label class="admin-label" style="margin-top:10px">Затемнение фона: <span id="apOpV">'+(S.promoMediaOpacity===undefined?30:S.promoMediaOpacity)+'%</span>'+
      '<input type="range" id="apMediaOp" min="0" max="100" step="5" value="'+(S.promoMediaOpacity===undefined?30:S.promoMediaOpacity)+'">'+
    '</label>';
  return grp('Вариант блока акции',variants)+
    grp('Фон карточки акции',bgFields)+
    grp('Фоновое медиа (фото / видео / YouTube)',mediaFields)+
    splitFields+
    grp('Бейдж (тег)','<input class="admin-input" id="apTag" value="'+esc(S.promoTag||'Акция месяца')+'">')+
    grp('Заголовок акции','<input class="admin-input" id="apTitle" value="'+esc(S.promoTitle||'')+'">')+
    grp('Описание акции (HTML)','<textarea class="admin-textarea" id="apDesc" rows="4">'+esc(S.promoDesc||'')+'</textarea>')+
    grp('Текст кнопки','<input class="admin-input" id="apBtn" value="'+esc(S.promoBtnText||'Забронировать цену →')+'">')+
    grp('Текст при истечении таймера','<input class="admin-input" id="apExpired" value="'+esc(S.promoExpiredText||'')+'">')+
    grp('Дата и время окончания акции','<input class="admin-input" id="apEnd" type="datetime-local" value="'+(S.promoEnd?new Date(S.promoEnd).toISOString().slice(0,16):'')+'">')+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="savePromo">Сохранить</button>';
}

function bindPromo(){
  // Variant click
  $$('[data-pv]').forEach(function(el){el.addEventListener('click',function(){
    S.promoVariant=el.dataset.pv;save(S);apply();renderTab('promo');
  });});
  // Toggle custom bg fields on radio change
  $$('input[name="apBgMode"]').forEach(function(r){r.addEventListener('change',function(){
    var cu=$('#apBgCustom');if(cu)cu.style.display=r.value==='custom'?'block':'none';
  });});
  // Media handlers
  $$('input[name="apMt"]').forEach(function(r){r.addEventListener('change',function(){
    S.promoMediaType=r.value;
    var up=$('#apMediaUp');if(up)up.style.display=(r.value==='image'||r.value==='video')?'block':'none';
    if(r.value==='none'){S.promoMedia=null;}
    save(S);apply();
  });});
  fileUpload('apMediaUp','apMediaF',function(d){
    S.promoMedia=d;
    if(!S.promoMediaType||S.promoMediaType==='none')S.promoMediaType=d.startsWith('data:video')?'video':'image';
    save(S);apply();renderTab('promo');
  });
  on('apMediaRm','click',function(){
    S.promoMedia=null;S.promoMediaType='none';
    save(S);apply();renderTab('promo');
  });
  on('apMediaUrl','input',function(){
    var v=this.value.trim();S.promoMedia=v||null;
    if(v.indexOf('youtu')>=0)S.promoMediaType='youtube';
    save(S);apply();
  });
  var op=$('#apMediaOp');if(op)op.addEventListener('input',function(){
    S.promoMediaOpacity=+this.value;
    var ov=$('#apOpV');if(ov)ov.textContent=this.value+'%';
    save(S);apply();
  });
  on('savePromo','click',function(){
    var bgM=document.querySelector('input[name="apBgMode"]:checked');
    S.promoBgMode=bgM?bgM.value:'theme';
    if($('#apBgColor')) S.promoBgColor=$('#apBgColor').value;
    if($('#apTextColor')) S.promoTextColor=$('#apTextColor').value;
    S.promoTag=$('#apTag').value;
    S.promoTitle=$('#apTitle').value;
    S.promoDesc=$('#apDesc').value;
    S.promoBtnText=$('#apBtn').value;
    S.promoExpiredText=$('#apExpired').value;
    if($('#apDiscount')) S.promoDiscount=$('#apDiscount').value;
    if($('#apDiscountLabel')) S.promoDiscountLabel=$('#apDiscountLabel').value;
    var pe=$('#apEnd').value;
    if(pe) S.promoEnd=new Date(pe).toISOString();
    save(S);apply();
    if(window.restartPromoTimer) window.restartPromoTimer();
  });
}

function tabMenu(){
  var h='<div class="admin-group__title">Пункты меню</div><div id="menuList">';
  (S.menuItems||[]).forEach(function(m,i){
    h+='<div class="admin-menu-item" style="flex-wrap:wrap"><input value="'+esc(m.text)+'" data-i="'+i+'" data-f="text" placeholder="Текст" style="flex:1">'+
      '<input value="'+esc(m.href)+'" data-i="'+i+'" data-f="href" placeholder="#section" style="max-width:120px">'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-toggle="'+i+'">▼ Подменю</button>'+
      '<button data-del="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;height:28px;cursor:pointer">&times;</button>'+
      '<div data-children="'+i+'" style="width:100%;display:none;padding:8px 0 0 20px">';
    (m.children||[]).forEach(function(c,ci){
      h+='<div style="display:flex;gap:6px;margin-bottom:4px"><input value="'+esc(c.text)+'" data-pi="'+i+'" data-ci="'+ci+'" data-cf="text" placeholder="Текст" style="flex:1;padding:6px 8px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px">'+
        '<input value="'+esc(c.href)+'" data-pi="'+i+'" data-ci="'+ci+'" data-cf="href" placeholder="#link" style="max-width:100px;padding:6px 8px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px">'+
        '<button data-delc="'+i+'_'+ci+'" style="background:#fee;color:#e74c3c;border:0;border-radius:4px;width:24px;height:24px;cursor:pointer;font-size:11px">&times;</button></div>';
    });
    h+='<button class="admin-btn admin-btn--ghost admin-btn--sm" data-addc="'+i+'" style="margin-top:4px;font-size:11px">+ подпункт</button></div></div>';
  });
  h+='</div><button class="admin-btn admin-btn--ghost admin-btn--sm" id="menuAdd" style="margin-top:8px">+ Пункт</button>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="saveMenu" style="margin-top:16px">Сохранить</button>';
  return h;
}

function tabColors(){
  var h='<div class="admin-group__title">Палитры (1 клик)</div><div class="admin-presets">';
  PR.forEach(function(p,i){
    h+='<div class="admin-preset'+(i===S.presetIndex?' active':'')+'" data-pr="'+i+'"><div class="admin-preset__colors">'+
      '<div class="admin-preset__dot" style="background:'+p.bg+'"></div>'+
      '<div class="admin-preset__dot" style="background:'+p.dark+'"></div>'+
      '<div class="admin-preset__dot" style="background:'+p.accent+'"></div>'+
      '<div class="admin-preset__dot" style="background:'+p.orange+'"></div>'+
      '</div><span>'+p.name+'</span></div>';
  });
  h+='</div><div class="admin-group__title">Ручная настройка</div>';
  ['bg:Фон','bgSoft:Фон мягкий','dark:Тёмный','accent:Акцент','accentLight:Акцент свет.','text:Текст','textSec:Текст 2','muted:Серый','orange:Оранжевый'].forEach(function(s){
    var p=s.split(':');h+='<div class="admin-color"><label>'+p[1]+'</label><input type="color" data-co="'+p[0]+'" value="'+(S.colors[p[0]]||'#000000')+'"></div>';
  });
  h+='<div class="admin-group__title" style="margin-top:24px">Закругление углов (везде)</div>'+
    '<p style="font-size:12px;color:#999;margin-bottom:10px">Применяется ко всем картинкам, карточкам, кнопкам, формам и элементам на сайте</p>'+
    '<div class="calc__range-row">'+
      '<input type="range" id="radScale" min="0" max="200" value="'+(S.radiusScale===undefined?100:S.radiusScale)+'" step="10">'+
      '<span id="radScaleVal">'+(S.radiusScale===undefined?100:S.radiusScale)+'%</span>'+
    '</div>'+
    '<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-radP="0">Прямые</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-radP="50">Лёгкие</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-radP="100">Средние</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-radP="150">Крупные</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-radP="200">Максимум</button>'+
    '</div>';
  h+='<div class="admin-group__title" style="margin-top:20px">Глобальное затемнение сайта</div>'+
    '<div class="admin-color"><label>Цвет оверлея</label><input type="color" id="gOvCol" value="'+(S.globalOverlayColor||'#000000')+'"></div>'+
    '<label class="admin-label">Прозрачность (0-100%)<div class="calc__range-row"><input type="range" id="gOv" min="0" max="80" value="'+(S.globalOverlay||0)+'" step="5"><span id="gOvVal">'+(S.globalOverlay||0)+'%</span></div></label>';
  h+='<button class="admin-btn admin-btn--accent admin-btn--block" id="saveCol" style="margin-top:12px">Применить</button>';

  // My saved palettes
  var myP=loadPalettes();
  h+='<div class="admin-group__title" style="margin-top:24px">Мои палитры</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:12px">'+
      '<input class="admin-input" id="savePalName" placeholder="Название палитры" style="flex:1">'+
      '<button class="admin-btn admin-btn--primary admin-btn--sm" id="savePalBtn">Сохранить</button>'+
    '</div>';
  if(myP.length){
    h+='<div class="admin-presets">';
    myP.forEach(function(p,i){
      h+='<div class="admin-preset" data-mypal="'+i+'" style="position:relative"><div class="admin-preset__colors">'+
        '<div class="admin-preset__dot" style="background:'+esc(p.colors.bg)+'"></div>'+
        '<div class="admin-preset__dot" style="background:'+esc(p.colors.dark)+'"></div>'+
        '<div class="admin-preset__dot" style="background:'+esc(p.colors.accent)+'"></div>'+
        '<div class="admin-preset__dot" style="background:'+esc(p.colors.orange)+'"></div>'+
      '</div><span>'+esc(p.name)+'</span>'+
      '<button data-palDel="'+i+'" style="position:absolute;top:4px;right:4px;width:20px;height:20px;border-radius:50%;background:#fee;color:#e74c3c;border:0;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2">×</button>'+
      '</div>';
    });
    h+='</div>';
  } else {
    h+='<p style="font-size:12px;color:#999;padding:12px;background:#fafafa;border-radius:8px;text-align:center">Палитр пока нет</p>';
  }
  return h;
}

function tabStyles(){
  var styles=loadStyles();
  var h='<div class="admin-group__title">Сохранить текущий стиль</div>'+
    '<p style="font-size:12px;color:#999;margin-bottom:8px">Сохраняет все настройки сайта (цвета, кнопки, логотип, название, подвал и т.д.) под именем, чтобы можно было переключаться.</p>'+
    '<div style="display:flex;gap:8px;margin-bottom:20px">'+
      '<input class="admin-input" id="stName" placeholder="Название стиля (напр. Тёмный зелёный)" style="flex:1">'+
      '<button class="admin-btn admin-btn--accent" id="stSave">Сохранить</button>'+
    '</div>'+
    '<div class="admin-group__title">Сохранённые стили</div>';
  if(!styles.length){
    h+='<p style="font-size:13px;color:#999;padding:20px;text-align:center;background:#fafafa;border-radius:10px">Нет сохранённых стилей</p>';
  } else {
    h+='<div id="stList">';
    styles.forEach(function(s,i){
      h+='<div class="admin-card-item" data-sti="'+i+'" style="padding:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<div style="display:flex;gap:4px">'+
          '<div style="width:16px;height:16px;border-radius:4px;background:'+esc(s.state.colors?s.state.colors.bg||'#fff':'#fff')+';border:1px solid #ddd"></div>'+
          '<div style="width:16px;height:16px;border-radius:4px;background:'+esc(s.state.colors?s.state.colors.dark||'#000':'#000')+'"></div>'+
          '<div style="width:16px;height:16px;border-radius:4px;background:'+esc(s.state.colors?s.state.colors.accent||'#2A7A5F':'#2A7A5F')+'"></div>'+
        '</div>'+
        '<div style="flex:1;min-width:100px"><h4 style="font-size:13px;font-weight:600">'+esc(s.name)+'</h4><span style="font-size:11px;color:#999">'+esc(s.date||'')+'</span></div>'+
        '<button class="admin-btn admin-btn--primary admin-btn--sm" data-stapply="'+i+'">Применить</button>'+
        '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-strename="'+i+'" title="Переименовать">✎</button>'+
        '<button class="admin-card-item__del" data-stdel="'+i+'">&times;</button>'+
      '</div>';
    });
    h+='</div>';
  }
  h+='<div class="admin-group__title" style="margin-top:20px">Экспорт / импорт</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" id="stExport">Экспорт в файл (JSON)</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" id="stImport">Импорт из файла</button>'+
      '<input type="file" id="stImportF" accept="application/json" style="display:none">'+
    '</div>';
  return h;
}

function bindStyles(){
  on('stSave','click',function(){
    var name=$('#stName').value.trim();
    if(!name){alert('Введите название стиля');return;}
    var styles=loadStyles();
    // Deep clone current state
    var snapshot=JSON.parse(JSON.stringify(S));
    styles.push({name:name,date:new Date().toLocaleString('ru-RU'),state:snapshot});
    saveStyles(styles);
    $('#stName').value='';
    renderTab('styles');
  });
  $$('[data-stapply]').forEach(function(b){b.addEventListener('click',function(){
    var styles=loadStyles();
    var st=styles[+b.dataset.stapply];if(!st)return;
    if(!confirm('Применить стиль "'+st.name+'"? Текущие настройки будут заменены (но останутся в других сохранённых стилях).'))return;
    // Merge: replace all keys from saved state
    Object.keys(st.state).forEach(function(k){S[k]=st.state[k];});
    save(S);apply();
    if(window.restartPromoTimer) window.restartPromoTimer();
    renderTab('styles');
    alert('Стиль "'+st.name+'" применён');
  });});
  $$('[data-strename]').forEach(function(b){b.addEventListener('click',function(){
    var styles=loadStyles();var idx=+b.dataset.strename;
    var newName=prompt('Новое название:',styles[idx].name);
    if(newName&&newName.trim()){styles[idx].name=newName.trim();saveStyles(styles);renderTab('styles');}
  });});
  $$('[data-stdel]').forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить стиль?'))return;
    var styles=loadStyles();styles.splice(+b.dataset.stdel,1);saveStyles(styles);renderTab('styles');
  });});
  on('stExport','click',function(){
    var styles=loadStyles();
    var blob=new Blob([JSON.stringify(styles,null,2)],{type:'application/json'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');a.href=url;a.download='ecostroydom-styles.json';a.click();
    URL.revokeObjectURL(url);
  });
  on('stImport','click',function(){$('#stImportF').click();});
  on('stImportF','change',function(){
    var f=this.files[0];if(!f)return;
    var r=new FileReader();
    r.onload=function(e){
      try{
        var imported=JSON.parse(e.target.result);
        if(!Array.isArray(imported)){alert('Некорректный файл');return;}
        var current=loadStyles();
        saveStyles(current.concat(imported));
        renderTab('styles');
        alert('Импортировано '+imported.length+' стилей');
      }catch(err){alert('Ошибка чтения файла: '+err.message);}
    };
    r.readAsText(f);
  });
}

function tabButtons(){
  return '<div class="admin-group__title">Стиль кнопок</div>'+
    '<div class="admin-effects"><div class="admin-effect'+(S.btnStyle===0?' active':'')+'" data-bs="0">Shiny 3D</div><div class="admin-effect'+(S.btnStyle===1?' active':'')+'" data-bs="1">Flat Pill</div></div>'+
    '<div class="admin-group__title">Цвета кнопок</div>'+
    '<div class="admin-color"><label>Основная</label><input type="color" id="bc1" value="'+(S.btnColor1||'#1A1A1A')+'"></div>'+
    '<div class="admin-color"><label>Акцентная</label><input type="color" id="bc2" value="'+(S.btnColor2||'#2A7A5F')+'"></div>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="saveBtn" style="margin-top:12px">Применить</button>';
}

function tabCalc(){
  var c=S.calcSettings||{};
  var i=function(id,label,val,placeholder){return '<label class="admin-label">'+label+'<input class="admin-input" id="'+id+'" type="number" step="any" value="'+(val||'')+'"'+(placeholder?' placeholder="'+placeholder+'"':'')+'></label>';};
  return '<div class="admin-group"><div class="admin-group__title">Основные параметры</div>'+
    i('csPrice','Цена за м³, ₸',c.price||41500)+
    i('csGlueRate','Расход клея, мешков на м³',c.glueRate||1.5)+
    i('csGluePrice','Цена мешка клея, ₸',c.gluePrice||1800)+
    i('csDeposit','Залог за поддон (возвратный), ₸',c.depositPallet||3500)+
    '</div>'+
    '<div class="admin-group"><div class="admin-group__title">Минимальный заказ</div>'+
    i('csMinVol','Мин. объём, м³',c.minOrderVol||10)+
    i('csMinSum','Мин. сумма заказа, ₸',c.minOrderSum||500000)+
    i('csDefOpen','% проёмов по умолчанию',c.defaultOpenings||10)+
    i('csDefGT','Толщина стен пристройки по умолчанию, мм',c.defaultGarageThick||300)+
    '</div>'+
    '<div class="admin-group"><div class="admin-group__title">Доставка (₸ за м³)</div>'+
    i('csDLC','Длинномер, город',c.deliveryLongCity||3000)+
    i('csDLS','Длинномер, пригород',c.deliveryLongSub||3500)+
    i('csDMC','Манипулятор, город',c.deliveryManCity||5500)+
    i('csDMS','Манипулятор, пригород',c.deliveryManSub||6000)+
    '</div>'+
    '<div class="admin-group"><div class="admin-group__title">Параметры поддонов</div>'+
    '<p style="font-size:11px;color:#999;margin-bottom:8px">Объём (м³) и количество блоков в поддоне для каждой толщины</p>'+
    '<div class="calc__row">'+i('csP100v','100 мм — объём',c.pallet100_vol||0.9)+i('csP100b','100 мм — шт',c.pallet100_blocks||48)+'</div>'+
    '<div class="calc__row">'+i('csP200v','200 мм — объём',c.pallet200_vol||0.9)+i('csP200b','200 мм — шт',c.pallet200_blocks||24)+'</div>'+
    '<div class="calc__row">'+i('csP250v','250 мм — объём',c.pallet250_vol||0.9375)+i('csP250b','250 мм — шт',c.pallet250_blocks||20)+'</div>'+
    '<div class="calc__row">'+i('csP300v','300 мм — объём',c.pallet300_vol||0.9)+i('csP300b','300 мм — шт',c.pallet300_blocks||16)+'</div>'+
    '<div class="calc__row">'+i('csP400v','400 мм — объём',c.pallet400_vol||0.9)+i('csP400b','400 мм — шт',c.pallet400_blocks||12)+'</div>'+
    '</div>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="saveCalc">Сохранить</button>'+
    '<button class="admin-btn admin-btn--ghost admin-btn--block" id="resetCalc" style="margin-top:8px">Сбросить к стандартным</button>';
}

function bindCalc(){
  on('saveCalc','click',function(){
    var cs={
      price:parseFloat($('#csPrice').value)||41500,
      glueRate:parseFloat($('#csGlueRate').value)||1.5,
      gluePrice:parseFloat($('#csGluePrice').value)||1800,
      depositPallet:parseFloat($('#csDeposit').value)||3500,
      minOrderVol:parseFloat($('#csMinVol').value)||10,
      minOrderSum:parseFloat($('#csMinSum').value)||500000,
      defaultOpenings:parseFloat($('#csDefOpen').value)||10,
      defaultGarageThick:parseInt($('#csDefGT').value)||300,
      deliveryLongCity:parseFloat($('#csDLC').value)||3000,
      deliveryLongSub:parseFloat($('#csDLS').value)||3500,
      deliveryManCity:parseFloat($('#csDMC').value)||5500,
      deliveryManSub:parseFloat($('#csDMS').value)||6000,
      pallet100_vol:parseFloat($('#csP100v').value)||0.9,
      pallet100_blocks:parseInt($('#csP100b').value)||48,
      pallet200_vol:parseFloat($('#csP200v').value)||0.9,
      pallet200_blocks:parseInt($('#csP200b').value)||24,
      pallet250_vol:parseFloat($('#csP250v').value)||0.9375,
      pallet250_blocks:parseInt($('#csP250b').value)||20,
      pallet300_vol:parseFloat($('#csP300v').value)||0.9,
      pallet300_blocks:parseInt($('#csP300b').value)||16,
      pallet400_vol:parseFloat($('#csP400v').value)||0.9,
      pallet400_blocks:parseInt($('#csP400b').value)||12
    };
    S.calcSettings=cs;save(S);apply();
    // Update min-order-notice
    $$('.min-order-notice').forEach(function(n){
      n.textContent='Заказы от '+cs.minOrderVol+' м.куб газоблока. Расчёт от суммы заявки '+cs.minOrderSum.toLocaleString('ru-RU')+' ₸';
    });
  });
  on('resetCalc','click',function(){
    if(!confirm('Сбросить настройки калькулятора к стандартным?'))return;
    delete S.calcSettings;save(S);apply();renderTab('calc');
  });
}

function tabTheme(){
  var tm=S.themeMode||'auto';
  var fb=S.footerCallBtn||{show:true,text:'Позвонить нам'};
  function radio(val,label){return '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="thMode" value="'+val+'" '+(tm===val?'checked':'')+' style="width:auto"> '+label+'</label>';}
  return grp('Режим темы по умолчанию',
      '<div style="display:flex;gap:14px;flex-wrap:wrap">'+radio('auto','Авто (по времени)')+radio('dark','Тёмная')+radio('light','Светлая')+'</div>'+
      '<p style="font-size:11px;color:#999;margin-top:8px">Посетитель может переключить тему кнопкой в шапке. Его выбор сохраняется в браузере.</p>')+
    grp('Расписание авто-режима',
      '<label class="admin-label">Включать тёмную тему с<input class="admin-input" type="time" id="thDarkStart" value="'+(S.autoThemeDarkStart||'19:00')+'"></label>'+
      '<label class="admin-label">Включать светлую тему с<input class="admin-input" type="time" id="thLightStart" value="'+(S.autoThemeLightStart||'07:00')+'"></label>')+
    themeColorsGroup('Тёмная тема','td',S.themeDark||{})+
    themeColorsGroup('Светлая тема','tl',S.themeLight||{})+
    grp('Кнопка «Позвонить нам» в подвале',
      '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="checkbox" id="fcbShow" '+(fb.show!==false?'checked':'')+' style="width:auto"> Показывать кнопку</label>'+
      '<label class="admin-label" style="margin-top:8px">Текст кнопки<input class="admin-input" id="fcbText" value="'+esc(fb.text||'Позвонить нам')+'"></label>'+
      '<p style="font-size:11px;color:#999">Номер берётся из вкладки «Общее».</p>')+
    grp('Код в &lt;HEAD&gt; (счётчики, мета, стили)',
      '<textarea class="admin-textarea" id="thHead" rows="6" placeholder="<!-- Yandex.Metrika -->&#10;<script>...</script>" style="font-family:monospace;font-size:12px">'+esc(S.headCode||'')+'</textarea>')+
    grp('Код в &lt;BODY&gt; (виджеты, чаты, скрипты)',
      '<textarea class="admin-textarea" id="thBody" rows="6" placeholder="<!-- Виджет чата -->&#10;<script src=&quot;...&quot;></script>" style="font-family:monospace;font-size:12px">'+esc(S.bodyCode||'')+'</textarea>')+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="saveTheme">Сохранить</button>';
}

function themeColorsGroup(title,prefix,t){
  function rgbaToHex(v){
    if(!v)return '#000000';
    if(v.indexOf('#')===0)return v.length===4?'#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3]:v.substr(0,7);
    var m=v.match(/rgba?\(([^)]+)\)/);
    if(!m)return '#000000';
    var p=m[1].split(',').map(function(x){return parseInt(x);});
    return '#'+[p[0],p[1],p[2]].map(function(x){return ('0'+x.toString(16)).slice(-2);}).join('');
  }
  function alphaOf(v){
    if(!v||v.indexOf('rgba')!==0)return 1;
    var m=v.match(/rgba\([^)]+\)/);if(!m)return 1;
    var p=v.match(/[\d.]+/g);return p&&p.length>=4?parseFloat(p[3]):1;
  }
  function row(key,label,withAlpha){
    var val=t[key]||'#000000';
    var hex=rgbaToHex(val);
    var alpha=withAlpha?'<input type="number" min="0" max="1" step="0.05" data-tha="'+prefix+'_'+key+'" value="'+alphaOf(val)+'" style="width:60px;padding:4px 6px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px" title="Прозрачность 0–1">':'';
    return '<div class="admin-color"><label>'+label+'</label><input type="color" data-thc="'+prefix+'_'+key+'" value="'+hex+'">'+alpha+'</div>';
  }
  return grp(title,
    row('bg','Фон')+
    row('surface','Поверхность (карточки)')+
    row('surface2','Поверхность 2 (hover)')+
    row('text','Текст')+
    row('textMuted','Текст приглушённый',true)+
    row('accent','Акцент')+
    row('border','Граница',true));
}

function bindTheme(){
  on('saveTheme','click',function(){
    var m=document.querySelector('input[name="thMode"]:checked');
    S.themeMode=m?m.value:'auto';
    S.autoThemeDarkStart=$('#thDarkStart').value||'19:00';
    S.autoThemeLightStart=$('#thLightStart').value||'07:00';
    S.footerCallBtn={show:$('#fcbShow').checked,text:$('#fcbText').value||'Позвонить нам'};
    S.headCode=$('#thHead').value||'';
    S.bodyCode=$('#thBody').value||'';
    // Read theme colors
    function collect(prefix){
      var t={};
      $$('[data-thc^="'+prefix+'_"]').forEach(function(el){
        var key=el.dataset.thc.split('_').slice(1).join('_');
        var hex=el.value;
        var aEl=document.querySelector('[data-tha="'+el.dataset.thc+'"]');
        if(aEl){
          var a=parseFloat(aEl.value);if(isNaN(a))a=1;
          var r=parseInt(hex.substr(1,2),16),g=parseInt(hex.substr(3,2),16),b=parseInt(hex.substr(5,2),16);
          t[key]='rgba('+r+','+g+','+b+','+a+')';
        } else t[key]=hex;
      });
      return t;
    }
    S.themeDark=Object.assign({},S.themeDark,collect('td'));
    S.themeLight=Object.assign({},S.themeLight,collect('tl'));
    // Reset visitor pref so admin default takes effect immediately on this device too
    localStorage.removeItem('eco_theme_pref');
    save(S);apply();
  });
}

function tabFeatures(){
  var f=S.featuresBlock||{items:[]};
  var icons=['i-factory','i-award','i-doc','i-ruler','i-handshake','i-card','i-truck','i-shield','i-clock','i-check','i-pin','i-phone','i-mail','i-house'];
  var bgMode=f.bgMode||'theme';
  function bgRadio(v,l){return '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="fbBg" value="'+v+'" '+(bgMode===v?'checked':'')+' style="width:auto"> '+l+'</label>';}
  var html=grp('Заголовок',
    '<label class="admin-label">Подзаголовок (eyebrow)<input class="admin-input" id="fbEyebrow" value="'+esc(f.eyebrow||'Почему мы')+'"></label>'+
    '<label class="admin-label">Заголовок секции<input class="admin-input" id="fbTitle" value="'+esc(f.title||'')+'"></label>')+
  grp('Фон секции',
    '<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px">'+bgRadio('theme','По теме')+bgRadio('dark','Тёмный')+bgRadio('light','Светлый')+bgRadio('custom','Свой')+'</div>'+
    '<div id="fbBgCustom" style="display:'+(bgMode==='custom'?'block':'none')+'">'+
      '<div class="admin-color"><label>Цвет фона</label><input type="color" id="fbBgColor" value="'+(f.bgColor||'#0B0F12')+'"></div>'+
      '<div class="admin-color"><label>Цвет текста</label><input type="color" id="fbTextColor" value="'+(f.textColor||'#FFFFFF')+'"></div>'+
    '</div>')+
  grp('Цвета карточек причин',
    '<div style="display:flex;gap:14px;margin-bottom:8px">'+
      '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="fbCard" value="theme" '+((f.cardMode||'theme')==='theme'?'checked':'')+' style="width:auto"> По теме</label>'+
      '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;font-size:13px"><input type="radio" name="fbCard" value="custom" '+(f.cardMode==='custom'?'checked':'')+' style="width:auto"> Свои цвета</label>'+
    '</div>'+
    '<div id="fbCardCustom" style="display:'+(f.cardMode==='custom'?'block':'none')+'">'+
      '<div class="admin-color"><label>Фон карточки</label><input type="color" id="fbCardBg" value="'+(f.cardBg||'#FFFFFF')+'"></div>'+
      '<div class="admin-color"><label>Граница</label><input type="color" id="fbCardBorder" value="'+(f.cardBorder||'#E8E8E8')+'"></div>'+
      '<div class="admin-color"><label>Цвет заголовка</label><input type="color" id="fbCardTitle" value="'+(f.cardTitleColor||'#1A1A1A')+'"></div>'+
      '<div class="admin-color"><label>Цвет описания</label><input type="color" id="fbCardDesc" value="'+(f.cardDescColor||'#6B6B6B')+'"></div>'+
      '<div class="admin-color"><label>Фон иконки</label><input type="color" id="fbCardIconBg" value="'+(f.cardIconBg||'#2A7A5F')+'"></div>'+
      '<div class="admin-color"><label>Цвет иконки</label><input type="color" id="fbCardIconColor" value="'+(f.cardIconColor||'#FFFFFF')+'"></div>'+
    '</div>');
  html+='<div class="admin-group__title">Карточки причин</div><div id="fbItems">';
  (f.items||[]).forEach(function(it,i){
    html+='<div style="padding:12px;border:1px solid #eee;border-radius:10px;margin-bottom:8px;background:#fafafa">'+
      '<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center">'+
        '<span style="font-size:11px;color:#999;font-weight:700;min-width:24px">#'+(i+1)+'</span>'+
        '<select class="admin-select" data-fbi-icon="'+i+'" style="flex:1">'+
          icons.map(function(ic){return '<option value="'+ic+'"'+(it.icon===ic?' selected':'')+'>'+ic+'</option>';}).join('')+
        '</select>'+
        '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-fbi-up="'+i+'" '+(i===0?'disabled':'')+'>↑</button>'+
        '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-fbi-down="'+i+'" '+(i===f.items.length-1?'disabled':'')+'>↓</button>'+
        '<button data-fbi-del="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;height:28px;cursor:pointer">&times;</button>'+
      '</div>'+
      '<input class="admin-input" data-fbi-title="'+i+'" value="'+esc(it.title||'')+'" placeholder="Заголовок">'+
      '<textarea class="admin-textarea" data-fbi-desc="'+i+'" rows="2" placeholder="Описание" style="margin-top:6px">'+esc(it.desc||'')+'</textarea>'+
    '</div>';
  });
  html+='</div><button class="admin-btn admin-btn--ghost admin-btn--sm" id="fbAdd" style="margin-top:8px">+ Добавить причину</button>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="saveFeatures" style="margin-top:14px">Сохранить</button>';
  return html;
}

function bindFeatures(){
  $$('input[name="fbBg"]').forEach(function(r){r.addEventListener('change',function(){
    var cu=$('#fbBgCustom');if(cu)cu.style.display=r.value==='custom'?'block':'none';
  });});
  $$('input[name="fbCard"]').forEach(function(r){r.addEventListener('change',function(){
    var cu=$('#fbCardCustom');if(cu)cu.style.display=r.value==='custom'?'block':'none';
  });});
  on('fbAdd','click',function(){
    if(!S.featuresBlock)S.featuresBlock={items:[]};
    if(!S.featuresBlock.items)S.featuresBlock.items=[];
    S.featuresBlock.items.push({icon:'i-award',title:'Новая причина',desc:''});
    save(S);renderTab('features');
  });
  $$('[data-fbi-del]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.fbiDel;S.featuresBlock.items.splice(i,1);save(S);renderTab('features');
  });});
  $$('[data-fbi-up]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.fbiUp;if(i<=0)return;var a=S.featuresBlock.items;var t=a[i];a[i]=a[i-1];a[i-1]=t;save(S);renderTab('features');
  });});
  $$('[data-fbi-down]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.fbiDown;var a=S.featuresBlock.items;if(i>=a.length-1)return;var t=a[i];a[i]=a[i+1];a[i+1]=t;save(S);renderTab('features');
  });});
  on('saveFeatures','click',function(){
    if(!S.featuresBlock)S.featuresBlock={};
    S.featuresBlock.eyebrow=$('#fbEyebrow').value;
    S.featuresBlock.title=$('#fbTitle').value;
    var bg=document.querySelector('input[name="fbBg"]:checked');
    S.featuresBlock.bgMode=bg?bg.value:'theme';
    if($('#fbBgColor'))S.featuresBlock.bgColor=$('#fbBgColor').value;
    if($('#fbTextColor'))S.featuresBlock.textColor=$('#fbTextColor').value;
    var cm=document.querySelector('input[name="fbCard"]:checked');
    S.featuresBlock.cardMode=cm?cm.value:'theme';
    if($('#fbCardBg'))S.featuresBlock.cardBg=$('#fbCardBg').value;
    if($('#fbCardBorder'))S.featuresBlock.cardBorder=$('#fbCardBorder').value;
    if($('#fbCardTitle'))S.featuresBlock.cardTitleColor=$('#fbCardTitle').value;
    if($('#fbCardDesc'))S.featuresBlock.cardDescColor=$('#fbCardDesc').value;
    if($('#fbCardIconBg'))S.featuresBlock.cardIconBg=$('#fbCardIconBg').value;
    if($('#fbCardIconColor'))S.featuresBlock.cardIconColor=$('#fbCardIconColor').value;
    var items=[];
    (S.featuresBlock.items||[]).forEach(function(_,i){
      items.push({
        icon:document.querySelector('[data-fbi-icon="'+i+'"]').value,
        title:document.querySelector('[data-fbi-title="'+i+'"]').value,
        desc:document.querySelector('[data-fbi-desc="'+i+'"]').value
      });
    });
    S.featuresBlock.items=items;
    save(S);apply();
  });
}

function tabCards(){
  var h='<div class="admin-group__title">Карточки товаров (перетаскивайте ⠿ или используйте ↑↓)</div><div id="cardList">';
  var cards=$$('#catalog .card');
  cards.forEach(function(c,i){
    var img=c.querySelector('img'),t=c.querySelector('h3'),pr=c.querySelector('.card__price b');
    h+='<div class="admin-card-item" draggable="true" data-ci="'+i+'" style="display:flex;align-items:center;gap:8px">'+
      '<span class="card-drag" style="cursor:grab;font-size:16px;color:#999;padding:0 4px">⠿</span>'+
      '<img src="'+(img?img.src:'')+'" alt="">'+
      '<div class="admin-card-item__info"><h4>'+(t?esc(t.textContent):'')+'</h4><span>'+(pr?esc(pr.textContent):'')+'</span></div>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-cup="'+i+'" '+(i===0?'disabled':'')+' title="Вверх" style="padding:4px 8px">↑</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-cdown="'+i+'" '+(i===cards.length-1?'disabled':'')+' title="Вниз" style="padding:4px 8px">↓</button>'+
      '<button class="admin-card-item__del" data-cdi="'+i+'">&times;</button></div>';
  });
  h+='</div><button class="admin-btn admin-btn--accent admin-btn--block" id="cardAdd" style="margin-top:12px">+ Новая карточка</button><div id="cardEdit"></div>';
  return h;
}

function tabBlocks(){
  var h='<div class="admin-group__title">Блоки сайта (перетаскивайте для изменения порядка)</div><div id="blockList">';
  (S.blockOrder||[]).forEach(function(bid){
    var b=BL.find(function(x){return x.id===bid;});
    // Handle copied blocks (id_copy_12345)
    if(!b&&bid.indexOf('_copy')>0){
      var baseId=bid.split('_copy')[0];
      var orig=BL.find(function(x){return x.id===baseId;});
      if(orig) b={id:bid,label:orig.label+' (копия)'};
    }
    var hidden=S.removedBlocks&&S.removedBlocks.indexOf(bid)>=0;
    var label=b?b.label:bid;
    h+='<div class="admin-block-item" draggable="true" data-bid="'+esc(bid)+'" style="display:flex;align-items:center;gap:8px;padding:12px;border:1px solid #eee;border-radius:10px;margin-bottom:6px;background:#fff;'+(hidden?'opacity:.4':'')+'">'+
      '<span style="cursor:grab;font-size:16px;color:#999">⠿</span>'+
      '<div style="flex:1;min-width:0"><h4 style="font-size:14px;font-weight:700;color:#1A1A1A;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(label)+'</h4></div>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-toggle-vis="'+esc(bid)+'" style="flex-shrink:0">'+(hidden?'Показать':'Скрыть')+'</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-dup="'+esc(bid)+'" title="Дублировать" style="flex-shrink:0">⧉</button>'+
      '<button class="admin-btn admin-btn--sm" data-conf-del="'+esc(bid)+'" style="background:#fee;color:#e74c3c;flex-shrink:0">&times;</button></div>';
  });
  h+='</div><div style="margin-top:12px"><button class="admin-btn admin-btn--accent" id="blockAddNew">+ Добавить блок</button></div>'+
    '<div class="admin-group__title" style="margin-top:24px">Фон блоков</div>';
  BL.forEach(function(b){
    h+='<div class="admin-block-item" data-bgb="'+esc(b.id)+'" style="cursor:pointer;padding:12px;border:1px solid #eee;border-radius:10px;margin-bottom:6px;background:#fff"><h4 style="font-size:14px;font-weight:700;color:#1A1A1A;margin:0 0 2px 0">'+esc(b.label)+'</h4><span style="font-size:11px;color:#999">Цвет, фото, видео, эффекты</span></div>';
  });
  h+='<div id="blockBgEdit"></div>';
  return h;
}

function tabMedia(){
  var h='<div class="admin-group__title">Медиа в блоках (фото/видео)</div>'+
    '<label class="admin-label">Блок<select class="admin-select" id="mediaBid">'+BL.map(function(b){return '<option value="'+b.id+'">'+b.label+'</option>';}).join('')+'</select></label>'+
    '<div id="mediaList" style="margin:12px 0"></div>'+
    '<div class="admin-group__title">Добавить медиа</div>'+
    '<div class="admin-upload" id="mediaUp"><input type="file" accept="image/*,video/*" id="mediaF"><div class="admin-upload__label">Загрузить фото / видео</div></div>'+
    '<label class="admin-label">Или URL (изображение, видео, YouTube)<input class="admin-input" id="mediaUrl" placeholder="https://..."></label>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="mediaAdd">Добавить</button>';
  return h;
}

function tabGallery(){
  var items=$$('#gallery .gallery__item');
  var h='<div class="admin-group__title">Фото галереи (↑↓ или перетаскивание)</div>'+
    '<label style="flex-direction:row;gap:6px;align-items:center;font-weight:500;margin-bottom:10px"><input type="checkbox" id="galBadgesOn" '+(S.galleryBadgesOn!==false?'checked':'')+' style="width:auto"> Показывать бейджи на фото</label>'+
    '<div id="galList">';
  items.forEach(function(item,i){
    var img=item.querySelector('img');
    var src=img?img.src:'';
    var existingBadge=item.querySelector('.media-badge');
    var badgeText=existingBadge?existingBadge.textContent:'';
    h+='<div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;padding:8px;border:1px solid #eee;border-radius:8px;flex-wrap:wrap" data-galitem="'+i+'">'+
      '<span style="cursor:grab;font-size:14px;color:#999">⠿</span>'+
      '<img src="'+esc(src)+'" style="width:50px;height:32px;object-fit:cover;border-radius:4px">'+
      '<input class="admin-input" value="'+esc(src)+'" data-gi="'+i+'" style="flex:1;font-size:11px;min-width:120px">'+
      '<input class="admin-input" data-gbadge="'+i+'" value="'+esc(badgeText)+'" placeholder="Бейдж" style="max-width:100px;font-size:11px">'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-gup="'+i+'" '+(i===0?'disabled':'')+'>↑</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-gdown="'+i+'" '+(i===items.length-1?'disabled':'')+'>↓</button>'+
      '<button data-gdel="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;height:28px;cursor:pointer">&times;</button></div>';
  });
  h+='</div><div class="admin-upload" id="galUp"><input type="file" accept="image/*" id="galF"><div class="admin-upload__label">Добавить фото</div></div>'+
    '<label class="admin-label">Или URL<input class="admin-input" id="galUrl" placeholder="https://..."></label>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="galAdd" style="margin-top:8px">Добавить фото</button>'+
    '<button class="admin-btn admin-btn--primary admin-btn--block" id="galSave" style="margin-top:8px">Сохранить (бейджи, порядок)</button>';
  return h;
}

function tabAbout(){
  var tEl=$('[data-block="about"]');
  var title=tEl?tEl.querySelector('h2'):null;
  var paras=tEl?$$('.about__text > p',tEl):[];
  return '<div class="admin-group__title">Блок «О нас»</div>'+
    '<label class="admin-label">Заголовок<input class="admin-input" id="abTitle" value="'+esc(title?title.textContent:'')+'"></label>'+
    '<label class="admin-label">Текст (каждый абзац — отдельная строка)<textarea class="admin-textarea" id="abText" rows="6">'+paras.map(function(p){return p.textContent;}).join('\n\n')+'</textarea></label>'+
    '<div class="admin-upload" id="abImgUp"><input type="file" accept="image/*" id="abImgF"><div class="admin-upload__label">Сменить фото</div></div>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="abSave" style="margin-top:12px">Сохранить</button>';
}

function tabHeadings(){
  // Build inputs for every site section: read current values from DOM as defaults
  var heads=S.sectionHeads||{};
  var html='<p style="font-size:12px;color:#999;margin-bottom:12px">Главная надпись (eyebrow), заголовок и описание для каждой секции сайта</p>';
  BL.forEach(function(b){
    var sec=document.querySelector('[data-block="'+b.id+'"]');
    if(!sec)return;
    var head=sec.querySelector('.section__head')||sec;
    var domEy=(head.querySelector('.eyebrow')||{}).textContent||'';
    var domH=(head.querySelector('h2, h1')||{}).textContent||'';
    var domP=(head.querySelector('p')||{}).innerHTML||'';
    var saved=heads[b.id]||{};
    var ey=saved.eyebrow!==undefined?saved.eyebrow:domEy;
    var ti=saved.title!==undefined?saved.title:domH;
    var su=saved.sub!==undefined?saved.sub:domP;
    html+=grp(b.label,
      '<label class="admin-label">Подзаголовок (eyebrow)<input class="admin-input" data-shi="'+b.id+'-eyebrow" value="'+esc(ey)+'"></label>'+
      '<label class="admin-label">Главная надпись<input class="admin-input" data-shi="'+b.id+'-title" value="'+esc(ti)+'"></label>'+
      '<label class="admin-label">Описание / уточнение<textarea class="admin-textarea" data-shi="'+b.id+'-sub" rows="2">'+esc(su)+'</textarea></label>'
    );
  });
  html+='<button class="admin-btn admin-btn--accent admin-btn--block" id="shSave" style="margin-top:12px">Сохранить заголовки</button>';
  return html;
}

function bindHeadings(){
  on('shSave','click',function(){
    if(!S.sectionHeads)S.sectionHeads={};
    BL.forEach(function(b){
      var ey=document.querySelector('[data-shi="'+b.id+'-eyebrow"]');
      var ti=document.querySelector('[data-shi="'+b.id+'-title"]');
      var su=document.querySelector('[data-shi="'+b.id+'-sub"]');
      if(!ey&&!ti&&!su)return;
      S.sectionHeads[b.id]={
        eyebrow:ey?ey.value:'',
        title:ti?ti.value:'',
        sub:su?su.value:''
      };
    });
    save(S);apply();
  });
}

function tabBlog(){
  var h='<a href="blog/editor.html" target="_blank" class="admin-btn admin-btn--primary admin-btn--block" style="margin-bottom:16px;text-align:center;text-decoration:none">Открыть редактор блога →</a>'+
    '<div class="admin-group__title">Статьи блога (SEO)</div><div id="blogList">';
  (S.blogPosts||[]).forEach(function(p,i){
    h+='<div class="admin-card-item" data-bi="'+i+'"><img src="'+esc(p.img)+'" alt=""><div class="admin-card-item__info"><h4>'+esc(p.title)+'</h4><span>'+esc(p.date)+' · '+esc(p.cat)+'</span></div><button class="admin-card-item__del" data-bdel="'+i+'">&times;</button></div>';
  });
  h+='</div><button class="admin-btn admin-btn--accent admin-btn--block" id="blogAdd" style="margin-top:12px">+ Новая статья</button><div id="blogEdit"></div>';
  return h;
}

function tabTexts(){
  var h='<div class="admin-group__title">Надписи в блоках</div>'+
    '<label class="admin-label">Блок<select class="admin-select" id="txBid">'+BL.map(function(b){return '<option value="'+b.id+'">'+b.label+'</option>';}).join('')+'</select></label>'+
    '<div id="txList" style="margin:12px 0"></div>'+
    '<div class="admin-group__title">Добавить надпись</div>'+
    '<label class="admin-label">Текст (HTML)<textarea class="admin-textarea" id="txText" rows="3" placeholder="<p>Ваш текст</p>"></textarea></label>'+
    '<label class="admin-label">CSS стиль (необязательно)<input class="admin-input" id="txStyle" placeholder="color:red;font-size:20px;text-align:center"></label>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="txAdd">Добавить надпись</button>';
  return h;
}

function bindTexts(){
  var bid=$('#txBid').value;
  renderTextList(bid);
  $('#txBid').addEventListener('change',function(){renderTextList(this.value);});
  on('txAdd','click',function(){
    var bid=$('#txBid').value;
    var text=$('#txText').value.trim();if(!text)return;
    if(!S.blockTexts)S.blockTexts={};if(!S.blockTexts[bid])S.blockTexts[bid]=[];
    S.blockTexts[bid].push({text:text,style:$('#txStyle').value.trim()});
    $('#txText').value='';$('#txStyle').value='';
    save(S);apply();renderTextList(bid);
  });
}

function renderTextList(bid){
  var list=$('#txList');if(!list)return;
  var items=(S.blockTexts&&S.blockTexts[bid])||[];
  list.innerHTML='';
  items.forEach(function(t,i){
    list.innerHTML+='<div style="padding:10px;border:1px solid #eee;border-radius:8px;margin-bottom:6px;display:flex;gap:8px;align-items:flex-start">'+
      '<div style="flex:1;font-size:13px">'+esc(t.text).substring(0,80)+(t.text.length>80?'...':'')+'</div>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-txedit="'+i+'">✎</button>'+
      '<button data-txdel="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;height:28px;cursor:pointer">&times;</button></div>';
  });
  $$('[data-txdel]',list).forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить надпись?'))return;
    S.blockTexts[bid].splice(+b.dataset.txdel,1);save(S);apply();renderTextList(bid);
  });});
  $$('[data-txedit]',list).forEach(function(b){b.addEventListener('click',function(){
    var idx=+b.dataset.txedit;var t=S.blockTexts[bid][idx];
    var newText=prompt('Текст (HTML):',t.text);if(newText===null)return;
    var newStyle=prompt('CSS стиль:',t.style||'');
    S.blockTexts[bid][idx]={text:newText,style:newStyle||''};
    save(S);apply();renderTextList(bid);
  });});
}

function tabFooter(){
  var fl=S.footerLinks||[{text:'Газоблок D600',href:'#catalog'},{text:'Клей для газоблока',href:'#catalog'},{text:'Бетон',href:'#upsell'},{text:'Термопанели',href:'#upsell'}];
  var fm=S.footerMessengers||[{type:'whatsapp',phone:'77757862515'}];
  var hm=S.headerMessengers||[];

  var linksHtml='<div id="ftLinksList">';
  fl.forEach(function(l,i){
    linksHtml+='<div style="display:flex;gap:6px;margin-bottom:6px"><input class="admin-input" value="'+esc(l.text)+'" data-flt="'+i+'" placeholder="Текст"><input class="admin-input" value="'+esc(l.href)+'" data-flh="'+i+'" placeholder="#якорь или URL" style="max-width:150px"><button data-fldel="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;cursor:pointer">&times;</button></div>';
  });
  linksHtml+='</div><button class="admin-btn admin-btn--ghost admin-btn--sm" id="ftLinkAdd">+ Добавить ссылку</button>';

  var msgHtml='<div id="ftMsgList">';
  fm.forEach(function(m,i){
    msgHtml+='<div style="display:flex;gap:6px;margin-bottom:6px"><select class="admin-select" data-fmt="'+i+'" style="max-width:120px"><option value="whatsapp"'+(m.type==='whatsapp'?' selected':'')+'>WhatsApp</option><option value="telegram"'+(m.type==='telegram'?' selected':'')+'>Telegram</option><option value="viber"'+(m.type==='viber'?' selected':'')+'>Viber</option><option value="instagram"'+(m.type==='instagram'?' selected':'')+'>Instagram</option></select><input class="admin-input" value="'+esc(m.phone||m.url||'')+'" data-fmv="'+i+'" placeholder="номер или URL"><button data-fmdel="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;cursor:pointer">&times;</button></div>';
  });
  msgHtml+='</div><button class="admin-btn admin-btn--ghost admin-btn--sm" id="ftMsgAdd">+ Добавить мессенджер</button>';

  var hmHtml='<div id="ftHMList">';
  hm.forEach(function(m,i){
    hmHtml+='<div style="display:flex;gap:6px;margin-bottom:6px"><select class="admin-select" data-hmt="'+i+'" style="max-width:120px"><option value="whatsapp"'+(m.type==='whatsapp'?' selected':'')+'>WhatsApp</option><option value="telegram"'+(m.type==='telegram'?' selected':'')+'>Telegram</option><option value="viber"'+(m.type==='viber'?' selected':'')+'>Viber</option><option value="instagram"'+(m.type==='instagram'?' selected':'')+'>Instagram</option></select><input class="admin-input" value="'+esc(m.phone||m.url||'')+'" data-hmv="'+i+'" placeholder="номер или URL"><button data-hmdel="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;cursor:pointer">&times;</button></div>';
  });
  hmHtml+='</div><button class="admin-btn admin-btn--ghost admin-btn--sm" id="ftHMAdd">+ Добавить в шапку</button>';

  return grp('Описание компании (тэглайн)','<textarea class="admin-textarea" id="ftTagline" rows="2">'+esc(S.footerTagline||'Газоблок автоклавный D600 — отгрузка от завода-изготовителя.')+'</textarea>')+
    grp('Заголовок столбца ссылок','<input class="admin-input" id="ftLinksTitle" value="'+esc(S.footerLinksTitle||'Каталог')+'">')+
    grp('Ссылки в подвале',linksHtml)+
    grp('Заголовок столбца контактов','<input class="admin-input" id="ftContactsTitle" value="'+esc(S.footerContactsTitle||'Контакты')+'">')+
    grp('Телефон','<label style="flex-direction:row;gap:8px;align-items:center;font-weight:400"><input type="checkbox" id="ftShowPhone" '+(S.footerShowPhone!==false?'checked':'')+' style="width:auto"> Показывать телефон в подвале</label><p style="font-size:11px;color:#999;margin-top:4px">Номер берётся из «Главная → Шапка — справа от меню»</p>')+
    grp('Адрес','<input class="admin-input" id="ftAddress" value="'+esc(S.footerAddress||'г. Астана, ул. Женис, 19')+'">')+
    grp('Режим работы','<input class="admin-input" id="ftHours1" value="'+esc(S.footerHours1||'Пн–Пт: 09:00 – 18:00')+'" placeholder="Будни"><input class="admin-input" id="ftHours2" value="'+esc(S.footerHours2||'Сб: 10:00 – 14:00')+'" placeholder="Суббота" style="margin-top:6px"><input class="admin-input" id="ftHours3" value="'+esc(S.footerHours3||'Вс: выходной')+'" placeholder="Воскресенье" style="margin-top:6px">')+
    grp('Мессенджеры в подвале',msgHtml)+
    grp('Мессенджеры в шапке',hmHtml)+
    grp('Текст копирайта','<input class="admin-input" id="ftText" value="'+esc(S.footerText||'© 2026 Ecostroydom. Все права защищены.')+'">')+
    grp('Водяной знак (большой текст)','<input class="admin-input" id="ftWater" value="'+esc(S.footerWatermark||'EcoStroyDom')+'">')+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="ftSave" style="margin-top:12px">Сохранить подвал</button>';
}

function bindFooter(){
  on('ftLinkAdd','click',function(){
    if(!S.footerLinks)S.footerLinks=[];
    S.footerLinks.push({text:'Новая ссылка',href:'#'});
    renderTab('footer');
  });
  $$('[data-fldel]').forEach(function(b){b.addEventListener('click',function(){
    S.footerLinks=S.footerLinks||[];S.footerLinks.splice(+b.dataset.fldel,1);renderTab('footer');
  });});
  on('ftMsgAdd','click',function(){
    if(!S.footerMessengers)S.footerMessengers=[];
    S.footerMessengers.push({type:'whatsapp',phone:''});
    renderTab('footer');
  });
  $$('[data-fmdel]').forEach(function(b){b.addEventListener('click',function(){
    S.footerMessengers=S.footerMessengers||[];S.footerMessengers.splice(+b.dataset.fmdel,1);renderTab('footer');
  });});
  on('ftHMAdd','click',function(){
    if(!S.headerMessengers)S.headerMessengers=[];
    S.headerMessengers.push({type:'whatsapp',phone:''});
    renderTab('footer');
  });
  $$('[data-hmdel]').forEach(function(b){b.addEventListener('click',function(){
    S.headerMessengers=S.headerMessengers||[];S.headerMessengers.splice(+b.dataset.hmdel,1);renderTab('footer');
  });});

  on('ftSave','click',function(){
    S.footerText=$('#ftText').value;
    S.footerWatermark=$('#ftWater').value;
    S.footerTagline=$('#ftTagline').value;
    S.footerLinksTitle=$('#ftLinksTitle').value;
    S.footerContactsTitle=$('#ftContactsTitle').value;
    S.footerAddress=$('#ftAddress').value;
    S.footerHours1=$('#ftHours1').value;
    S.footerHours2=$('#ftHours2').value;
    S.footerHours3=$('#ftHours3').value;
    S.footerShowPhone=$('#ftShowPhone').checked;
    // Read links
    var links=[];
    $$('[data-flt]').forEach(function(inp){
      var i=+inp.dataset.flt;var hrefInp=document.querySelector('[data-flh="'+i+'"]');
      if(inp.value) links.push({text:inp.value,href:hrefInp?hrefInp.value:'#'});
    });
    S.footerLinks=links;
    // Messengers footer
    var msgs=[];
    $$('[data-fmt]').forEach(function(s){
      var i=+s.dataset.fmt;var vInp=document.querySelector('[data-fmv="'+i+'"]');
      if(vInp&&vInp.value) msgs.push({type:s.value,phone:vInp.value});
    });
    S.footerMessengers=msgs;
    // Messengers header
    var hm=[];
    $$('[data-hmt]').forEach(function(s){
      var i=+s.dataset.hmt;var vInp=document.querySelector('[data-hmv="'+i+'"]');
      if(vInp&&vInp.value) hm.push({type:s.value,phone:vInp.value});
    });
    S.headerMessengers=hm;
    save(S);apply();
  });
}

/* ============================================================
   CONTENT EDITOR — unified editor for 6 block types
   Blocks: features (Почему мы), steps (Как мы), delivery (Доставка),
   reviews (Отзывы), faq (Вопросы), upsell (Дополнительно)
   ============================================================ */
var CONTENT_BLOCKS={
  features:{label:'Почему мы',selector:'[data-block="features"]',headSel:'.section__head',headingSel:'h2',eyebrowSel:'.eyebrow',descSel:'.section__head p',itemsSel:'.feature',itemTitleSel:'h4',itemDescSel:'p',hasImage:false,hasButton:false},
  steps:{label:'Как мы работаем',selector:'[data-block="steps"]',headSel:'.section__head',headingSel:'h2',eyebrowSel:'.eyebrow',descSel:'.section__head p',itemsSel:'.steps > li',itemTitleSel:'h4',itemDescSel:'p',itemNumSel:'b',hasImage:false,hasButton:false},
  delivery:{label:'Доставка',selector:'[data-block="delivery"]',headSel:'.section__head',headingSel:'h2',eyebrowSel:'.eyebrow',descSel:'.section__head p',itemsSel:'.delivery__card',itemTitleSel:'h3',itemDescSel:'.delivery__body > p',itemPriceSel:'.delivery__price b',itemPriceNoteSel:'.delivery__price small',itemImgSel:'.delivery__img img',hasImage:true,hasButton:false},
  reviews:{label:'Отзывы',selector:'[data-block="reviews"]',headSel:'.section__head',headingSel:'h2',eyebrowSel:'.eyebrow',descSel:'.section__head p',itemsSel:'.review',itemNameSel:'.review__head b',itemRoleSel:'.review__head span',itemTextSel:'.review > p',itemImgSel:'.review__head img',hasImage:true,hasButton:false},
  faq:{label:'Вопросы (FAQ)',selector:'[data-block="faq"]',headSel:'.section__head',headingSel:'h2',eyebrowSel:'.eyebrow',descSel:'.section__head p',itemsSel:'details',itemTitleSel:'summary',itemDescSel:'p',hasImage:false,hasButton:false},
  upsell:{label:'Дополнительно',selector:'[data-block="upsell"]',headSel:'.section__head',headingSel:'h2',eyebrowSel:'.eyebrow',descSel:'.section__head p',itemsSel:'.upsell',itemTitleSel:'h3',itemDescSel:'.upsell__body > p',itemPriceSel:'.upsell__price',itemBtnSel:'.btn .btn__inner',itemImgSel:'img',hasImage:true,hasButton:true}
};

function tabContent(){
  var h='<div class="admin-group__title">Редактор блоков</div>'+
    '<p style="font-size:12px;color:#999;margin-bottom:12px">Изменение заголовков, описаний, пунктов и фото в блоках сайта</p>'+
    '<label class="admin-label">Выберите блок<select class="admin-select" id="ctBlock">';
  Object.keys(CONTENT_BLOCKS).forEach(function(k){
    h+='<option value="'+k+'">'+CONTENT_BLOCKS[k].label+'</option>';
  });
  h+='</select></label><div id="ctEditor"></div>';
  return h;
}

function bindContent(){
  var sel=$('#ctBlock');if(!sel)return;
  renderContentEditor(sel.value);
  sel.addEventListener('change',function(){renderContentEditor(this.value);});
}

function renderContentEditor(bid){
  var cfg=CONTENT_BLOCKS[bid];if(!cfg)return;
  var sec=$(cfg.selector);if(!sec){$('#ctEditor').innerHTML='<p style="color:#999">Блок не найден</p>';return;}

  var eyebrow=sec.querySelector(cfg.eyebrowSel);
  var heading=sec.querySelector(cfg.headingSel);
  var desc=sec.querySelector(cfg.descSel);
  var items=cfg.itemsSel?$$(cfg.itemsSel,sec):[];

  var h='<div style="border-top:1px solid #eee;padding-top:16px;margin-top:12px">'+
    '<div class="admin-group__title">Заголовок блока</div>'+
    '<label class="admin-label">Бейдж (eyebrow)<input class="admin-input" id="ctEyebrow" value="'+esc(eyebrow?eyebrow.textContent:'')+'"></label>'+
    '<label class="admin-label">Заголовок H2<input class="admin-input" id="ctHead" value="'+esc(heading?heading.textContent:'')+'"></label>'+
    '<label class="admin-label">Подпись<textarea class="admin-textarea" id="ctDesc" rows="2">'+esc(desc?desc.textContent:'')+'</textarea></label>'+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="ctSaveHead">Сохранить заголовок</button>';

  h+='<div class="admin-group__title" style="margin-top:20px">Пункты ('+items.length+')</div><div id="ctItems">';
  items.forEach(function(item,i){
    h+='<div class="admin-card-item" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:10px;margin-bottom:6px" data-ctitem="'+i+'">';
    if(cfg.hasImage&&cfg.itemImgSel){
      var img=item.querySelector(cfg.itemImgSel);
      h+='<img src="'+(img?esc(img.src):'')+'" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:6px">';
    }
    var t=cfg.itemTitleSel?item.querySelector(cfg.itemTitleSel):null;
    var tName=cfg.itemNameSel?item.querySelector(cfg.itemNameSel):null;
    var label=t?t.textContent:(tName?tName.textContent:('Пункт '+(i+1)));
    h+='<div style="flex:1;min-width:120px;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(label.substring(0,40))+'</div>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-ctup="'+i+'" '+(i===0?'disabled':'')+'>↑</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-ctdown="'+i+'" '+(i===items.length-1?'disabled':'')+'>↓</button>'+
      '<button class="admin-btn admin-btn--primary admin-btn--sm" data-ctedit="'+i+'">✎</button>'+
      '<button class="admin-card-item__del" data-ctdel="'+i+'">&times;</button></div>';
  });
  h+='</div><button class="admin-btn admin-btn--accent admin-btn--block" id="ctAddItem" style="margin-top:8px">+ Новый пункт</button>'+
    '<div id="ctItemEdit"></div></div>';

  $('#ctEditor').innerHTML=h;

  // Save heading
  on('ctSaveHead','click',function(){
    if(eyebrow) eyebrow.textContent=$('#ctEyebrow').value;
    if(heading) heading.textContent=$('#ctHead').value;
    if(desc) desc.textContent=$('#ctDesc').value;
  });

  // Item actions
  $$('[data-ctdel]').forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить пункт?'))return;
    var list=$$(cfg.itemsSel,sec);if(list[+b.dataset.ctdel]) list[+b.dataset.ctdel].remove();
    renderContentEditor(bid);
  });});
  $$('[data-ctup]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.ctup;var list=$$(cfg.itemsSel,sec);
    if(i>0&&list[i-1]) list[i-1].before(list[i]);
    renderContentEditor(bid);
  });});
  $$('[data-ctdown]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.ctdown;var list=$$(cfg.itemsSel,sec);
    if(i<list.length-1&&list[i+1]) list[i+1].after(list[i]);
    renderContentEditor(bid);
  });});
  $$('[data-ctedit]').forEach(function(b){b.addEventListener('click',function(){
    showContentItemEdit(bid,+b.dataset.ctedit);
  });});
  on('ctAddItem','click',function(){
    var list=$$(cfg.itemsSel,sec);
    if(!list.length){alert('Нет шаблона для клонирования. Добавьте первый пункт вручную в HTML.');return;}
    var clone=list[list.length-1].cloneNode(true);
    list[list.length-1].after(clone);
    renderContentEditor(bid);
  });
}

function showContentItemEdit(bid,idx){
  var cfg=CONTENT_BLOCKS[bid];var sec=$(cfg.selector);
  var items=$$(cfg.itemsSel,sec);var item=items[idx];if(!item)return;
  var ed=$('#ctItemEdit');

  var h='<div style="border-top:1px solid #eee;padding-top:12px;margin-top:8px"><div class="admin-group__title">Редактировать пункт</div>';

  // Image
  var img=cfg.itemImgSel?item.querySelector(cfg.itemImgSel):null;
  if(cfg.hasImage){
    h+='<label class="admin-label">URL фото<input class="admin-input" id="ctiImgUrl" value="'+(img?esc(img.src):'')+'"></label>'+
      '<div class="admin-upload" id="ctiImgUp"><input type="file" accept="image/*" id="ctiImgF"><div class="admin-upload__label">Загрузить фото</div></div>';
  }

  // Reviews: name, role, text
  if(bid==='reviews'){
    var name=item.querySelector(cfg.itemNameSel);
    var role=item.querySelector(cfg.itemRoleSel);
    var txt=item.querySelector(cfg.itemTextSel);
    h+='<label class="admin-label">Имя<input class="admin-input" id="ctiName" value="'+esc(name?name.textContent:'')+'"></label>'+
      '<label class="admin-label">Должность/описание<input class="admin-input" id="ctiRole" value="'+esc(role?role.textContent:'')+'"></label>'+
      '<label class="admin-label">Текст отзыва<textarea class="admin-textarea" id="ctiText" rows="3">'+esc(txt?txt.textContent:'')+'</textarea></label>';
  } else {
    // Title
    if(cfg.itemTitleSel){
      var t=item.querySelector(cfg.itemTitleSel);
      h+='<label class="admin-label">Заголовок<input class="admin-input" id="ctiTitle" value="'+esc(t?t.textContent:'')+'"></label>';
    }
    // Number (for steps)
    if(cfg.itemNumSel){
      var num=item.querySelector(cfg.itemNumSel);
      h+='<label class="admin-label">Номер<input class="admin-input" id="ctiNum" value="'+esc(num?num.textContent:'')+'"></label>';
    }
    // Description
    if(cfg.itemDescSel){
      var d=item.querySelector(cfg.itemDescSel);
      h+='<label class="admin-label">Описание<textarea class="admin-textarea" id="ctiDesc" rows="3">'+esc(d?d.textContent:'')+'</textarea></label>';
    }
    // Price
    if(cfg.itemPriceSel){
      var pr=item.querySelector(cfg.itemPriceSel);
      h+='<label class="admin-label">Цена<input class="admin-input" id="ctiPrice" value="'+esc(pr?pr.innerHTML:'')+'"></label>';
    }
    // Price note
    if(cfg.itemPriceNoteSel){
      var pn=item.querySelector(cfg.itemPriceNoteSel);
      h+='<label class="admin-label">Примечание к цене<input class="admin-input" id="ctiPriceNote" value="'+esc(pn?pn.textContent:'')+'"></label>';
    }
    // Button text
    if(cfg.hasButton&&cfg.itemBtnSel){
      var btn=item.querySelector(cfg.itemBtnSel);
      h+='<label class="admin-label">Текст кнопки<input class="admin-input" id="ctiBtn" value="'+esc(btn?btn.textContent:'')+'"></label>';
    }
  }

  h+='<div style="display:flex;gap:8px;margin-top:12px"><button class="admin-btn admin-btn--accent" id="ctiSave">Сохранить</button><button class="admin-btn admin-btn--ghost" id="ctiCancel">Отмена</button></div></div>';
  ed.innerHTML=h;

  var newImg=null;
  if(cfg.hasImage){
    fileUpload('ctiImgUp','ctiImgF',function(d){
      newImg=d;
      $('#ctiImgUrl').value=d.substring(0,60)+'...';
    });
  }

  on('ctiCancel','click',function(){ed.innerHTML='';});
  on('ctiSave','click',function(){
    if(bid==='reviews'){
      if($('#ctiName'))item.querySelector(cfg.itemNameSel).textContent=$('#ctiName').value;
      if($('#ctiRole'))item.querySelector(cfg.itemRoleSel).textContent=$('#ctiRole').value;
      if($('#ctiText'))item.querySelector(cfg.itemTextSel).textContent=$('#ctiText').value;
    } else {
      if($('#ctiTitle')&&cfg.itemTitleSel){var t=item.querySelector(cfg.itemTitleSel);if(t)t.textContent=$('#ctiTitle').value;}
      if($('#ctiNum')&&cfg.itemNumSel){var n=item.querySelector(cfg.itemNumSel);if(n)n.textContent=$('#ctiNum').value;}
      if($('#ctiDesc')&&cfg.itemDescSel){var d=item.querySelector(cfg.itemDescSel);if(d)d.textContent=$('#ctiDesc').value;}
      if($('#ctiPrice')&&cfg.itemPriceSel){var p=item.querySelector(cfg.itemPriceSel);if(p)p.innerHTML=$('#ctiPrice').value;}
      if($('#ctiPriceNote')&&cfg.itemPriceNoteSel){var pn=item.querySelector(cfg.itemPriceNoteSel);if(pn)pn.textContent=$('#ctiPriceNote').value;}
      if($('#ctiBtn')&&cfg.itemBtnSel){var b=item.querySelector(cfg.itemBtnSel);if(b)b.textContent=$('#ctiBtn').value;}
    }
    // Image
    if(cfg.hasImage){
      var imgEl=item.querySelector(cfg.itemImgSel);
      if(imgEl){
        if(newImg) imgEl.src=newImg;
        else if($('#ctiImgUrl')&&$('#ctiImgUrl').value&&!$('#ctiImgUrl').value.includes('...')){
          imgEl.src=$('#ctiImgUrl').value;
        }
      }
    }
    ed.innerHTML='';
    renderContentEditor(bid);
  });
}

function tabSeoBlock(){
  var sb=S.seoBlock||{};
  return grp('Фото блока «О товаре»','<div class="admin-upload" id="sbImgUp"><input type="file" accept="image/*" id="sbImgF"><div class="admin-upload__label">Загрузить фото</div></div>'+(sb.img?'<img src="'+esc(sb.img)+'" class="admin-upload__preview" id="sbImgPrev">':''))+
    grp('Бейдж на фото','<input class="admin-input" id="sbBadge" value="'+esc(sb.badge||'')+'">')+
    grp('Заголовок','<input class="admin-input" id="sbTitle" value="'+esc(sb.title||'')+'">')+
    grp('Вступительный текст (HTML)','<textarea class="admin-textarea" id="sbIntro" rows="5">'+esc(sb.intro||'')+'</textarea>')+
    '<button class="admin-btn admin-btn--accent admin-btn--block" id="saveSeoBlock">Сохранить</button>';
}

function bindSeoBlock(){
  var newImg=null;
  fileUpload('sbImgUp','sbImgF',function(d){
    newImg=d;
    var prev=$('#sbImgPrev');
    if(prev) prev.src=d;
    else{var i=document.createElement('img');i.id='sbImgPrev';i.className='admin-upload__preview';i.src=d;$('#sbImgUp').after(i);}
  });
  on('saveSeoBlock','click',function(){
    if(!S.seoBlock)S.seoBlock={};
    if(newImg) S.seoBlock.img=newImg;
    S.seoBlock.badge=$('#sbBadge').value;
    S.seoBlock.title=$('#sbTitle').value;
    S.seoBlock.intro=$('#sbIntro').value;
    save(S);apply();
  });
}

function tabBlogLink(){
  return '<a href="blog/editor.html" target="_blank" class="admin-btn admin-btn--primary admin-btn--block" style="margin-bottom:16px;text-align:center;text-decoration:none">Открыть редактор блога →</a>';
}

function grp(title,html){return '<div class="admin-group"><div class="admin-group__title">'+title+'</div>'+html+'</div>';}

// ============================================================
// TAB BINDINGS
// ============================================================
function bindTab(t){
  if(t==='general') bindGeneral();
  else if(t==='promo') bindPromo();
  else if(t==='menu') bindMenu();
  else if(t==='colors') bindColors();
  else if(t==='styles') bindStyles();
  else if(t==='buttons') bindButtons();
  else if(t==='calc') bindCalc();
  else if(t==='theme') bindTheme();
  else if(t==='features') bindFeatures();
  else if(t==='cards') bindCards();
  else if(t==='blocks') bindBlocks();
  else if(t==='media') bindMedia();
  else if(t==='gallery') bindGallery();
  else if(t==='about') bindAboutTab();
  else if(t==='seoblock') bindSeoBlock();
  else if(t==='content') bindContent();
  else if(t==='blog') bindBlogTab();
  else if(t==='texts') bindTexts();
  else if(t==='footer') bindFooter();
}

function bindGeneral(){
  fileUpload('logoUp','logoF',function(d){S.logo=d;$('#logoPrev').innerHTML='<img src="'+d+'" class="admin-upload__preview">';$('#logoRm').style.display='';});
  on('logoRm','click',function(){S.logo=null;$('#logoPrev').innerHTML='';this.style.display='none';});
  if(S.logo){$('#logoPrev').innerHTML='<img src="'+S.logo+'" class="admin-upload__preview">';$('#logoRm').style.display='';}
  // Slides render
  renderSlidesList();
  on('heroSlideAdd','click',function(){
    if(!S.heroSlides)S.heroSlides=[];
    S.heroSlides.push({type:'img',src:'',badge:'',badgeOn:true});
    save(S);renderSlidesList();
  });

  on('saveGen','click',function(){
    S.companyName=$('#adName').value||'EcoStroyDom';
    S.nameColor=$('#adNameCol').value;
    S.phone=$('#adPhone').value;
    S.showPhone=$('#adShowPhone').checked;
    var mode=document.querySelector('input[name="hInfoMode"]:checked');
    S.headerInfoMode=mode?mode.value:'phone';
    S.headerInfoText=$('#adHeaderText').value;
    S.heroCaption=$('#adCaption').value;
    S.heroPriceVal=$('#adPriceVal').value;
    S.heroPriceNote=$('#adPriceNote').value;
    var intv=parseInt($('#heroInterval').value)||5;
    S.heroSlideInterval=Math.max(2,Math.min(30,intv));
    S.heroBadgeGlobal=$('#heroBadges').checked;
    // Read slide values
    if(S.heroSlides&&S.heroSlides.length){
      S.heroSlides.forEach(function(sl,i){
        var t=document.querySelector('[data-sltype="'+i+'"]');if(t)sl.type=t.value;
        var s=document.querySelector('[data-slsrc="'+i+'"]');if(s)sl.src=s.value;
        var b=document.querySelector('[data-slbadge="'+i+'"]');if(b)sl.badge=b.value;
        var bo=document.querySelector('[data-slbon="'+i+'"]');if(bo)sl.badgeOn=bo.checked;
        var o=document.querySelector('[data-slorient="'+i+'"]');if(o)sl.orientation=o.value;
      });
    }
    S.marqueeItems=$('#adMarq').value.split('\n').filter(function(s){return s.trim();});
    save(S);apply();
  });
}

function renderSlidesList(){
  var list=$('#heroSlidesList');if(!list)return;
  list.innerHTML='';
  (S.heroSlides||[]).forEach(function(sl,i){
    var div=document.createElement('div');
    div.style.cssText='padding:12px;border:1px solid #eee;border-radius:10px;margin-bottom:8px;background:#fafafa';
    div.innerHTML='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center">'+
      '<span style="font-size:11px;color:#999;font-weight:700;min-width:24px">#'+(i+1)+'</span>'+
      '<select class="admin-select" data-sltype="'+i+'" style="max-width:120px">'+
        '<option value="img"'+(sl.type==='img'?' selected':'')+'>Фото</option>'+
        '<option value="video"'+(sl.type==='video'?' selected':'')+'>Видео</option>'+
        '<option value="youtube"'+(sl.type==='youtube'?' selected':'')+'>YouTube</option>'+
      '</select>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-slup="'+i+'" '+(i===0?'disabled':'')+'>↑</button>'+
      '<button class="admin-btn admin-btn--ghost admin-btn--sm" data-sldown="'+i+'" '+(i===S.heroSlides.length-1?'disabled':'')+'>↓</button>'+
      '<button data-sldel="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;height:28px;cursor:pointer">&times;</button>'+
    '</div>'+
    '<input class="admin-input" data-slsrc="'+i+'" value="'+esc(sl.src||'')+'" placeholder="URL фото/видео/YouTube или загрузите">'+
    '<div style="display:flex;gap:6px;margin-top:6px"><input type="file" accept="image/*,video/*" data-slfile="'+i+'" style="flex:1;font-size:11px"></div>'+
    (sl.type==='youtube'?'<select class="admin-select" data-slorient="'+i+'" style="margin-top:6px">'+
      '<option value="horizontal"'+(sl.orientation==='horizontal'||!sl.orientation?' selected':'')+'>Горизонтальное 16:9</option>'+
      '<option value="vertical"'+(sl.orientation==='vertical'?' selected':'')+'>Вертикальное 9:16 (Shorts)</option>'+
    '</select>':'')+
    '<input class="admin-input" data-slbadge="'+i+'" value="'+esc(sl.badge||'')+'" placeholder="Бейдж на фото (напр. Акция)" style="margin-top:6px">'+
    '<label style="flex-direction:row;gap:6px;align-items:center;margin-top:6px;font-size:12px;font-weight:500"><input type="checkbox" data-slbon="'+i+'" '+(sl.badgeOn!==false?'checked':'')+' style="width:auto"> Показывать бейдж</label>';
    list.appendChild(div);
  });
  // Bind file uploads for each slide
  (S.heroSlides||[]).forEach(function(sl,i){
    var inp=document.querySelector('[data-slfile="'+i+'"]');
    if(inp) inp.addEventListener('change',function(){
      if(!this.files[0])return;
      var r=new FileReader();r.onload=function(e){
        S.heroSlides[i].src=e.target.result;
        S.heroSlides[i].type=e.target.result.startsWith('data:video')?'video':'img';
        save(S);renderSlidesList();
      };r.readAsDataURL(this.files[0]);
    });
  });
  // Reorder / delete
  $$('[data-slup]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.slup;if(i<=0)return;
    var t=S.heroSlides[i];S.heroSlides[i]=S.heroSlides[i-1];S.heroSlides[i-1]=t;save(S);renderSlidesList();
  });});
  $$('[data-sldown]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.sldown;if(i>=S.heroSlides.length-1)return;
    var t=S.heroSlides[i];S.heroSlides[i]=S.heroSlides[i+1];S.heroSlides[i+1]=t;save(S);renderSlidesList();
  });});
  $$('[data-sldel]').forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить слайд?'))return;
    S.heroSlides.splice(+b.dataset.sldel,1);save(S);renderSlidesList();
  });});
  // Live type change → re-render to show orient select
  $$('[data-sltype]').forEach(function(s){s.addEventListener('change',function(){
    S.heroSlides[+s.dataset.sltype].type=s.value;save(S);renderSlidesList();
  });});
}

function bindMenu(){
  // Toggle children
  $$('[data-toggle]').forEach(function(b){b.addEventListener('click',function(){
    var d=$('[data-children="'+b.dataset.toggle+'"]');d.style.display=d.style.display==='none'?'block':'none';
  });});
  // Delete item
  $$('[data-del]').forEach(function(b){b.addEventListener('click',function(){
    S.menuItems.splice(+b.dataset.del,1);save(S);renderTab('menu');
  });});
  // Add child
  $$('[data-addc]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.addc;if(!S.menuItems[i].children)S.menuItems[i].children=[];
    S.menuItems[i].children.push({text:'Новый',href:'#'});save(S);renderTab('menu');
  });});
  // Delete child
  $$('[data-delc]').forEach(function(b){b.addEventListener('click',function(){
    var p=b.dataset.delc.split('_');S.menuItems[+p[0]].children.splice(+p[1],1);save(S);renderTab('menu');
  });});
  on('menuAdd','click',function(){S.menuItems.push({text:'Новый',href:'#',children:[]});save(S);renderTab('menu');});
  on('saveMenu','click',function(){
    $$('.admin-menu-item [data-f]').forEach(function(inp){
      var i=+inp.dataset.i;S.menuItems[i][inp.dataset.f]=inp.value;
    });
    $$('[data-cf]').forEach(function(inp){
      var pi=+inp.dataset.pi,ci=+inp.dataset.ci;
      if(S.menuItems[pi]&&S.menuItems[pi].children&&S.menuItems[pi].children[ci])
        S.menuItems[pi].children[ci][inp.dataset.cf]=inp.value;
    });
    save(S);apply();
  });
}

function bindColors(){
  $$('[data-pr]').forEach(function(el){el.addEventListener('click',function(){
    S.presetIndex=+el.dataset.pr;S.colors=Object.assign({},PR[S.presetIndex]);
    save(S);apply();renderTab('colors');
  });});
  // Live range
  var gOv=document.getElementById('gOv');
  if(gOv) gOv.addEventListener('input',function(){document.getElementById('gOvVal').textContent=this.value+'%';});

  // Radius scale — apply live
  var radScale=document.getElementById('radScale');
  if(radScale){
    radScale.addEventListener('input',function(){
      $('#radScaleVal').textContent=this.value+'%';
      S.radiusScale=parseInt(this.value);save(S);apply();
    });
  }
  $$('[data-radP]').forEach(function(b){b.addEventListener('click',function(){
    var v=parseInt(b.dataset.radP);
    S.radiusScale=v;save(S);apply();
    if($('#radScale')){$('#radScale').value=v;$('#radScaleVal').textContent=v+'%';}
  });});

  on('saveCol','click',function(){
    $$('[data-co]').forEach(function(i){S.colors[i.dataset.co]=i.value;});
    var gOv=document.getElementById('gOv');
    var gOvCol=document.getElementById('gOvCol');
    if(gOv) S.globalOverlay=parseInt(gOv.value)||0;
    if(gOvCol) S.globalOverlayColor=gOvCol.value;
    S.presetIndex=-1;save(S);apply();
  });

  // Save current colors as new palette
  on('savePalBtn','click',function(){
    var name=$('#savePalName').value.trim();
    if(!name){alert('Введите название палитры');return;}
    // Sync input values into S.colors first
    $$('[data-co]').forEach(function(i){S.colors[i.dataset.co]=i.value;});
    var myP=loadPalettes();
    myP.push({name:name,colors:JSON.parse(JSON.stringify(S.colors))});
    savePalettes(myP);
    renderTab('colors');
  });

  // Apply custom palette
  $$('[data-mypal]').forEach(function(el){el.addEventListener('click',function(e){
    if(e.target.dataset.palDel!==undefined)return;
    var myP=loadPalettes();var pal=myP[+el.dataset.mypal];if(!pal)return;
    S.colors=JSON.parse(JSON.stringify(pal.colors));
    S.presetIndex=-1;save(S);apply();renderTab('colors');
  });});

  // Delete custom palette
  $$('[data-palDel]').forEach(function(b){b.addEventListener('click',function(e){
    e.stopPropagation();
    if(!confirm('Удалить палитру?'))return;
    var myP=loadPalettes();myP.splice(+b.dataset.palDel,1);savePalettes(myP);renderTab('colors');
  });});
}

function bindButtons(){
  $$('[data-bs]').forEach(function(el){el.addEventListener('click',function(){
    $$('[data-bs]').forEach(function(e){e.classList.remove('active');});el.classList.add('active');
    S.btnStyle=+el.dataset.bs;
  });});
  on('saveBtn','click',function(){
    S.btnColor1=$('#bc1').value;S.btnColor2=$('#bc2').value;save(S);apply();
  });
}

function bindCards(){
  // Edit on click (not on buttons)
  $$('[data-ci]').forEach(function(el){el.addEventListener('click',function(e){
    if(e.target.closest('[data-cdi],[data-cup],[data-cdown],.card-drag'))return;
    showCardEdit(+el.dataset.ci);
  });});
  // Delete
  $$('[data-cdi]').forEach(function(b){b.addEventListener('click',function(e){
    e.stopPropagation();
    if(!confirm('Удалить карточку?'))return;
    var cards=$$('#catalog .card');if(cards[+b.dataset.cdi])cards[+b.dataset.cdi].remove();renderTab('cards');
  });});
  // Up
  $$('[data-cup]').forEach(function(b){b.addEventListener('click',function(e){
    e.stopPropagation();
    var i=+b.dataset.cup;if(i<=0)return;
    var cards=$$('#catalog .card');
    if(cards[i]&&cards[i-1]) cards[i-1].before(cards[i]);
    renderTab('cards');
  });});
  // Down
  $$('[data-cdown]').forEach(function(b){b.addEventListener('click',function(e){
    e.stopPropagation();
    var i=+b.dataset.cdown;var cards=$$('#catalog .card');
    if(i>=cards.length-1)return;
    if(cards[i]&&cards[i+1]) cards[i+1].after(cards[i]);
    renderTab('cards');
  });});
  // Drag & drop reorder
  var list=$('#cardList');if(list){
    var dragItem=null;
    $$('[data-ci]',list).forEach(function(el){
      el.addEventListener('dragstart',function(){dragItem=el;el.style.opacity='.4';});
      el.addEventListener('dragend',function(){el.style.opacity='';dragItem=null;});
      el.addEventListener('dragover',function(e){e.preventDefault();el.style.borderTop='2px solid #2A7A5F';});
      el.addEventListener('dragleave',function(){el.style.borderTop='';});
      el.addEventListener('drop',function(e){
        e.preventDefault();el.style.borderTop='';
        if(!dragItem||dragItem===el)return;
        var fromI=+dragItem.dataset.ci;var toI=+el.dataset.ci;
        var cards=$$('#catalog .card');
        if(!cards[fromI]||!cards[toI])return;
        // Move DOM card
        if(fromI<toI) cards[toI].after(cards[fromI]);
        else cards[toI].before(cards[fromI]);
        renderTab('cards');
      });
    });
  }
  on('cardAdd','click',function(){showCardEdit(null);});
}

function showCardEdit(idx){
  var ed=$('#cardEdit');
  var cards=$$('#catalog .card');
  var c=idx!==null&&cards[idx]?readCard(cards[idx]):{img:'',title:'',size:'',price:'',tag:'',specs:[]};
  var oldPriceEl=idx!==null?cards[idx].querySelector('.card__old-price'):null;
  var oldPrice=oldPriceEl?oldPriceEl.textContent.trim():'';
  ed.innerHTML='<div style="border-top:1px solid #eee;padding-top:16px;margin-top:12px">'+
    '<div class="admin-group__title">'+(idx!==null?'Редактировать':'Новая')+'</div>'+
    '<label class="admin-label">Название<input class="admin-input" id="ceT" value="'+esc(c.title)+'"></label>'+
    '<label class="admin-label">Размер<input class="admin-input" id="ceS" value="'+esc(c.size)+'"></label>'+
    '<label class="admin-label">Старая цена (перечёркнутая)<input class="admin-input" id="ceOldP" value="'+esc(oldPrice)+'" placeholder="45 000 ₸ (пустое = не показывать)"></label>'+
    '<label class="admin-label">Цена<input class="admin-input" id="ceP" value="'+esc(c.price)+'"></label>'+
    '<label class="admin-label">Тег<input class="admin-input" id="ceTg" value="'+esc(c.tag)+'"></label>'+
    '<label class="admin-label">Характеристики<textarea class="admin-textarea" id="ceSp">'+c.specs.join('\n')+'</textarea></label>'+
    '<div class="admin-upload" id="ceUp"><input type="file" accept="image/*" id="ceF"><div class="admin-upload__label">Фото</div></div>'+
    (c.img?'<img src="'+esc(c.img)+'" class="admin-upload__preview" id="cePr">':'')+
    '<div style="display:flex;gap:8px;margin-top:12px"><button class="admin-btn admin-btn--accent" id="ceSv">Сохранить</button><button class="admin-btn admin-btn--ghost" id="ceCn">Отмена</button></div></div>';
  var newImg=c.img;
  fileUpload('ceUp','ceF',function(d){newImg=d;var p=$('#cePr');if(p)p.src=d;else{var i=document.createElement('img');i.id='cePr';i.className='admin-upload__preview';i.src=d;$('#ceUp').after(i);}});
  on('ceCn','click',function(){ed.innerHTML='';});
  on('ceSv','click',function(){
    var data={title:$('#ceT').value,size:$('#ceS').value,price:$('#ceP').value,oldPrice:$('#ceOldP').value,tag:$('#ceTg').value,
      specs:$('#ceSp').value.split('\n').filter(function(s){return s.trim();}),img:newImg};
    if(idx!==null&&cards[idx]) updateCard(cards[idx],data);
    else addCard(data);
    ed.innerHTML='';renderTab('cards');
  });
}

function readCard(c){
  var img=c.querySelector('img'),h3=c.querySelector('h3'),sz=c.querySelector('.card__size'),
      pr=c.querySelector('.card__price b'),tg=c.querySelector('.card__tag'),sp=[];
  $$('.card__specs li',c).forEach(function(l){sp.push(l.textContent.trim());});
  return{img:img?img.src:'',title:h3?h3.textContent:'',size:sz?sz.textContent:'',price:pr?pr.textContent:'',tag:tg?tg.textContent:'',specs:sp};
}
function updateCard(c,d){
  var img=c.querySelector('img');if(img&&d.img)img.src=d.img;
  var h3=c.querySelector('h3');if(h3)h3.textContent=d.title;
  var sz=c.querySelector('.card__size');if(sz)sz.textContent=d.size;
  var pr=c.querySelector('.card__price b');if(pr)pr.textContent=d.price;
  // Old price
  var opEl=c.querySelector('.card__old-price');
  if(d.oldPrice&&d.oldPrice.trim()){
    if(!opEl){opEl=document.createElement('div');opEl.className='card__old-price';var priceWrap=c.querySelector('.card__price');if(priceWrap)priceWrap.before(opEl);}
    opEl.textContent=d.oldPrice;
  } else if(opEl){opEl.remove();}
  var tg=c.querySelector('.card__tag');
  if(d.tag){if(!tg){tg=document.createElement('div');tg.className='card__tag';c.querySelector('.card__body').prepend(tg);}tg.textContent=d.tag;}
  else if(tg)tg.remove();
  var sp=c.querySelector('.card__specs');if(sp){sp.innerHTML='';d.specs.forEach(function(s){var li=document.createElement('li');li.textContent=s;sp.appendChild(li);});}
}
function addCard(d){
  var g=$('#catalog .cards');if(!g)return;
  var a=document.createElement('article');a.className='card reveal in-view';
  a.innerHTML='<div class="card__img"><img src="'+esc(d.img||'assets/img/block-200.png')+'" alt="" loading="lazy" width="600" height="400"></div>'+
    '<div class="card__body">'+(d.tag?'<div class="card__tag">'+esc(d.tag)+'</div>':'')+
    '<h3>'+esc(d.title)+'</h3><div class="card__size">'+esc(d.size)+'</div>'+
    '<ul class="card__specs">'+d.specs.map(function(s){return '<li>'+esc(s)+'</li>';}).join('')+'</ul>'+
    (d.oldPrice?'<div class="card__old-price">'+esc(d.oldPrice)+'</div>':'')+
    '<div class="card__price"><b>'+esc(d.price)+'</b><small>/м³</small></div>'+
    '<a href="#form" class="btn btn--primary btn--sm"><span class="btn__inner">В заявку</span></a></div>';
  g.appendChild(a);
}

function bindBlocks(){
  // Drag reorder
  var list=$('#blockList');
  var dragItem=null;
  $$('[data-bid]',list).forEach(function(el){
    el.addEventListener('dragstart',function(e){dragItem=el;el.style.opacity='.4';e.dataTransfer.effectAllowed='move';});
    el.addEventListener('dragend',function(){el.style.opacity='';dragItem=null;});
    el.addEventListener('dragover',function(e){e.preventDefault();e.dataTransfer.dropEffect='move';el.style.borderTop='2px solid #2A7A5F';});
    el.addEventListener('dragleave',function(){el.style.borderTop='';});
    el.addEventListener('drop',function(e){
      e.preventDefault();el.style.borderTop='';
      if(!dragItem||dragItem===el)return;
      var from=S.blockOrder.indexOf(dragItem.dataset.bid);
      var to=S.blockOrder.indexOf(el.dataset.bid);
      S.blockOrder.splice(from,1);S.blockOrder.splice(to,0,dragItem.dataset.bid);
      save(S);apply();renderTab('blocks');
    });
  });
  // Toggle visibility
  $$('[data-toggle-vis]').forEach(function(b){b.addEventListener('click',function(){
    var bid=b.dataset.toggleVis;
    if(!S.removedBlocks)S.removedBlocks=[];
    var idx=S.removedBlocks.indexOf(bid);
    if(idx>=0)S.removedBlocks.splice(idx,1);else S.removedBlocks.push(bid);
    save(S);apply();renderTab('blocks');
  });});
  // Delete with confirm
  $$('[data-conf-del]').forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить блок "'+b.dataset.confDel+'"? Его можно будет вернуть через добавление.'))return;
    if(!S.removedBlocks)S.removedBlocks=[];
    if(S.removedBlocks.indexOf(b.dataset.confDel)<0)S.removedBlocks.push(b.dataset.confDel);
    save(S);apply();renderTab('blocks');
  });});
  // Duplicate block
  $$('[data-dup]').forEach(function(b){b.addEventListener('click',function(){
    var bid=b.dataset.dup;
    var el=$('[data-block="'+bid+'"]');if(!el)return;
    var clone=el.cloneNode(true);
    var newId=bid+'_copy_'+Date.now();
    clone.setAttribute('data-block',newId);
    if(clone.id)clone.id=clone.id+'_copy';
    el.after(clone);
    // Add to block order
    var idx=S.blockOrder.indexOf(bid);
    S.blockOrder.splice(idx+1,0,newId);
    BL.push({id:newId,label:(BL.find(function(x){return x.id===bid;})||{}).label+' (копия)'});
    save(S);renderTab('blocks');
    // Re-trigger reveals
    clone.querySelectorAll('.reveal').forEach(function(r){r.classList.add('in-view');});
  });});

  // Add new block (restore hidden)
  on('blockAddNew','click',function(){
    if(!S.removedBlocks||!S.removedBlocks.length){alert('Все блоки уже отображаются');return;}
    var bid=prompt('Введите ID блока для восстановления:\n'+S.removedBlocks.join(', '));
    if(!bid)return;
    var idx=S.removedBlocks.indexOf(bid.trim());
    if(idx>=0){S.removedBlocks.splice(idx,1);save(S);apply();renderTab('blocks');}
  });
  // Block bg editors
  $$('[data-bgb]').forEach(function(el){el.addEventListener('click',function(){showBlockBg(el.dataset.bgb);});});
}

function showBlockBg(bid){
  var ed=$('#blockBgEdit'),bs=S.blockStyles[bid]||{};
  var overlay=bs.overlay||0;
  var overlayColor=bs.overlayColor||'#000000';
  ed.innerHTML='<div style="border-top:1px solid #eee;padding-top:16px;margin-top:8px">'+
    '<div class="admin-group__title">'+esc((BL.find(function(b){return b.id===bid;})||{}).label||bid)+'</div>'+
    '<label class="admin-label">Цвет фона<input type="color" class="admin-input" id="bbCol" value="'+(bs.bg||'#ffffff')+'" style="height:40px;padding:4px"></label>'+
    '<div class="admin-upload" id="bbImgUp"><input type="file" accept="image/*" id="bbImgF"><div class="admin-upload__label">Нажмите чтобы загрузить фото на фон</div></div>'+
    '<div id="bbImgPrev">'+(bs.bgImg?'<img src="'+esc(bs.bgImg)+'" style="max-width:100%;max-height:120px;border-radius:8px;margin-top:6px">':'')+'</div>'+
    '<button class="admin-btn admin-btn--ghost admin-btn--sm" id="bbImgRm" style="margin-top:6px;display:'+(bs.bgImg?'inline-flex':'none')+'">Удалить фото</button>'+
    '<label class="admin-label" style="margin-top:10px">URL фото (или видео)<input class="admin-input" id="bbImgUrl" value="'+esc(bs.bgImg||'')+'" placeholder="https://..."></label>'+
    '<label class="admin-label">URL видео<input class="admin-input" id="bbVid" value="'+(bs.bgVideo||'')+'"></label>'+
    '<div class="admin-group__title" style="margin-top:14px">Затемнение / оверлей</div>'+
    '<div class="admin-color"><label>Цвет оверлея</label><input type="color" id="bbOvCol" value="'+overlayColor+'"></div>'+
    '<label class="admin-label">Прозрачность оверлея (0 = выкл, 100 = полностью)'+
    '<div class="calc__range-row"><input type="range" id="bbOv" min="0" max="100" value="'+overlay+'" step="5"><span id="bbOvVal">'+overlay+'%</span></div></label>'+
    '<div class="admin-effects"><div class="admin-effect'+(bs.effect==='parallax'?' active':'')+'" data-fx="parallax">Параллакс</div><div class="admin-effect'+(bs.effect==='gradient-anim'?' active':'')+'" data-fx="gradient-anim">Градиент</div><div class="admin-effect'+(!bs.effect||bs.effect==='none'?' active':'')+'" data-fx="none">Нет</div></div>'+
    '<div style="display:flex;gap:8px;margin-top:8px"><button class="admin-btn admin-btn--accent" id="bbSave">Применить</button><button class="admin-btn admin-btn--danger admin-btn--sm" id="bbReset">Сбросить</button></div></div>';
  // Live preview of overlay value
  $('#bbOv',ed).addEventListener('input',function(){$('#bbOvVal').textContent=this.value+'%';});
  var bgImg=bs.bgImg||null;
  fileUpload('bbImgUp','bbImgF',function(d){
    bgImg=d;
    $('#bbImgPrev').innerHTML='<img src="'+d+'" style="max-width:100%;max-height:120px;border-radius:8px;margin-top:6px">';
    $('#bbImgRm').style.display='inline-flex';
    $('#bbImgUrl').value='';
    // Apply immediately
    if(!S.blockStyles[bid])S.blockStyles[bid]={};
    S.blockStyles[bid].bgImg=d;save(S);apply();
  });
  on('bbImgRm','click',function(){
    bgImg=null;
    $('#bbImgPrev').innerHTML='';
    this.style.display='none';
    $('#bbImgUrl').value='';
    if(S.blockStyles[bid])delete S.blockStyles[bid].bgImg;
    save(S);apply();
  });
  on('bbImgUrl','input',function(){
    var v=this.value.trim();bgImg=v||null;
    if(v){$('#bbImgPrev').innerHTML='<img src="'+esc(v)+'" style="max-width:100%;max-height:120px;border-radius:8px;margin-top:6px">';$('#bbImgRm').style.display='inline-flex';}
    if(!S.blockStyles[bid])S.blockStyles[bid]={};
    if(v)S.blockStyles[bid].bgImg=v;else delete S.blockStyles[bid].bgImg;
    save(S);apply();
  });
  $$('[data-fx]',ed).forEach(function(e){e.addEventListener('click',function(){$$('[data-fx]',ed).forEach(function(x){x.classList.remove('active');});e.classList.add('active');});});
  on('bbSave','click',function(){
    if(!S.blockStyles[bid])S.blockStyles[bid]={};
    S.blockStyles[bid].bg=$('#bbCol').value;
    if(bgImg)S.blockStyles[bid].bgImg=bgImg;
    var v=$('#bbVid').value.trim();if(v)S.blockStyles[bid].bgVideo=v;
    var af=$('.admin-effect.active[data-fx]',ed);if(af)S.blockStyles[bid].effect=af.dataset.fx;
    S.blockStyles[bid].overlay=parseInt($('#bbOv').value)||0;
    S.blockStyles[bid].overlayColor=$('#bbOvCol').value;
    save(S);apply();ed.innerHTML='';
  });
  on('bbReset','click',function(){
    delete S.blockStyles[bid];
    Object.keys(S.elementStyles||{}).forEach(function(k){if(k.startsWith(bid+'__'))delete S.elementStyles[k];});
    var el=$('[data-block="'+bid+'"]');if(el){el.style.background='';el.style.backgroundImage='';}
    save(S);ed.innerHTML='';
  });
}

function bindMedia(){
  var curBid=$('#mediaBid').value;
  renderMediaList(curBid);
  $('#mediaBid').addEventListener('change',function(){renderMediaList(this.value);});
  var newData=null;
  fileUpload('mediaUp','mediaF',function(d){newData={type:d.startsWith('data:video')?'video':'img',src:d};});
  on('mediaAdd','click',function(){
    var bid=$('#mediaBid').value;
    if(!S.blockMedia)S.blockMedia={};if(!S.blockMedia[bid])S.blockMedia[bid]=[];
    var url=$('#mediaUrl').value.trim();
    if(newData){S.blockMedia[bid].push(newData);newData=null;}
    else if(url){
      var type=(url.match(/\.(mp4|webm|ogg)/i)||url.includes('youtube')||url.includes('youtu.be'))?'video':'img';
      S.blockMedia[bid].push({type:type,src:url});
      $('#mediaUrl').value='';
    }
    save(S);apply();renderMediaList(bid);
  });
}

function renderMediaList(bid){
  var ml=$('#mediaList');if(!ml)return;
  var items=(S.blockMedia&&S.blockMedia[bid])||[];
  ml.innerHTML='';
  items.forEach(function(m,i){
    ml.innerHTML+='<div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;padding:8px;border:1px solid #eee;border-radius:8px">'+
      '<span style="font-size:11px;color:#999;width:40px">'+(m.type==='img'?'Фото':'Видео')+'</span>'+
      '<input class="admin-input" value="'+esc(m.src)+'" data-mi="'+i+'" style="flex:1;font-size:11px">'+
      '<button data-mdel="'+i+'" style="background:#fee;color:#e74c3c;border:0;border-radius:6px;width:28px;height:28px;cursor:pointer">&times;</button></div>';
  });
  $$('[data-mdel]',ml).forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить медиа?'))return;
    S.blockMedia[bid].splice(+b.dataset.mdel,1);save(S);apply();renderMediaList(bid);
  });});
  // Update src on change
  $$('[data-mi]',ml).forEach(function(inp){inp.addEventListener('change',function(){
    S.blockMedia[bid][+inp.dataset.mi].src=inp.value;save(S);apply();
  });});
}

function bindGallery(){
  $$('[data-gdel]').forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить фото?'))return;
    var items=$$('#gallery .gallery__item');if(items[+b.dataset.gdel])items[+b.dataset.gdel].remove();renderTab('gallery');
  });});
  // Up/Down move
  $$('[data-gup]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.gup;var items=$$('#gallery .gallery__item');
    if(i>0&&items[i-1]) items[i-1].before(items[i]);
    renderTab('gallery');
  });});
  $$('[data-gdown]').forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.gdown;var items=$$('#gallery .gallery__item');
    if(i<items.length-1&&items[i+1]) items[i+1].after(items[i]);
    renderTab('gallery');
  });});
  // Drag reorder
  var list=$('#galList');
  if(list){
    var drag=null;
    $$('[data-galitem]',list).forEach(function(el){
      el.draggable=true;
      el.addEventListener('dragstart',function(){drag=el;el.style.opacity='.4';});
      el.addEventListener('dragend',function(){el.style.opacity='';drag=null;});
      el.addEventListener('dragover',function(e){e.preventDefault();el.style.borderTop='2px solid #2A7A5F';});
      el.addEventListener('dragleave',function(){el.style.borderTop='';});
      el.addEventListener('drop',function(e){
        e.preventDefault();el.style.borderTop='';
        if(!drag||drag===el)return;
        var from=+drag.dataset.galitem,to=+el.dataset.galitem;
        var items=$$('#gallery .gallery__item');
        if(!items[from]||!items[to])return;
        if(from<to) items[to].after(items[from]); else items[to].before(items[from]);
        renderTab('gallery');
      });
    });
  }
  var newImg=null;
  fileUpload('galUp','galF',function(d){newImg=d;});
  on('galAdd','click',function(){
    var src=newImg||$('#galUrl').value.trim();
    if(!src)return;
    var grid=$('#gallery .gallery__grid');if(!grid)return;
    var item=document.createElement('div');item.className='gallery__item reveal in-view';
    item.innerHTML='<img src="'+esc(src)+'" alt="" loading="lazy">';grid.appendChild(item);
    newImg=null;$('#galUrl').value='';renderTab('gallery');
  });
  on('galSave','click',function(){
    S.galleryBadgesOn=$('#galBadgesOn').checked;
    // Update sources + badges
    var items=$$('#gallery .gallery__item');
    $$('[data-gi]').forEach(function(inp){
      var i=+inp.dataset.gi;if(items[i]){var img=items[i].querySelector('img');if(img)img.src=inp.value;}
    });
    $$('[data-gbadge]').forEach(function(inp){
      var i=+inp.dataset.gbadge;if(!items[i])return;
      var existing=items[i].querySelector('.media-badge');
      if(inp.value.trim()&&S.galleryBadgesOn){
        if(!existing){existing=document.createElement('div');existing.className='media-badge';items[i].appendChild(existing);}
        existing.textContent=inp.value.trim();
        existing.style.display='';
      } else if(existing){
        if(!S.galleryBadgesOn)existing.style.display='none';
        else existing.remove();
      }
    });
    // Sync badges visibility globally
    $$('#gallery .media-badge').forEach(function(b){b.style.display=S.galleryBadgesOn!==false?'':'none';});
    save(S);
  });
}

function getGalleryItems(){
  return $$('#gallery .gallery__item img').map(function(i){return i.src;});
}

function bindAboutTab(){
  var newImg=null;
  fileUpload('abImgUp','abImgF',function(d){newImg=d;});
  on('abSave','click',function(){
    var sec=$('[data-block="about"]');if(!sec)return;
    var h2=sec.querySelector('h2');if(h2)h2.textContent=$('#abTitle').value;
    var txt=$('#abText').value.split('\n\n');
    var ps=$$('.about__text > p',sec);
    ps.forEach(function(p,i){if(txt[i])p.textContent=txt[i];});
    // Add extra paragraphs if needed
    for(var i=ps.length;i<txt.length;i++){
      if(!txt[i].trim())continue;
      var p=document.createElement('p');p.textContent=txt[i];
      sec.querySelector('.about__values').before(p);
    }
    if(newImg){var img=sec.querySelector('.about__media img');if(img)img.src=newImg;}
  });
}

function bindBlogTab(){
  $$('[data-bi]').forEach(function(el){el.addEventListener('click',function(e){
    if(e.target.closest('[data-bdel]'))return;showBlogEdit(+el.dataset.bi);
  });});
  $$('[data-bdel]').forEach(function(b){b.addEventListener('click',function(){
    if(!confirm('Удалить статью?'))return;
    S.blogPosts.splice(+b.dataset.bdel,1);S._blogModified=true;save(S);apply();renderTab('blog');
  });});
  on('blogAdd','click',function(){showBlogEdit(null);});
}

function showBlogEdit(idx){
  var ed=$('#blogEdit');
  var p=idx!==null?S.blogPosts[idx]:{title:'',cat:'',date:new Date().toISOString().slice(0,10),img:'',excerpt:'',body:''};
  ed.innerHTML='<div style="border-top:1px solid #eee;padding-top:16px;margin-top:12px">'+
    '<div class="admin-group__title">'+(idx!==null?'Редактировать':'Новая статья')+'</div>'+
    '<label class="admin-label">Заголовок<input class="admin-input" id="beT" value="'+esc(p.title)+'"></label>'+
    '<label class="admin-label">Категория<input class="admin-input" id="beCat" value="'+esc(p.cat)+'"></label>'+
    '<label class="admin-label">Дата<input class="admin-input" id="beD" type="date" value="'+esc(p.date)+'"></label>'+
    '<label class="admin-label">Ссылка на статью<input class="admin-input" id="beUrl" value="'+esc(p.url||'')+'" placeholder="blog/my-article.html или https://..."></label>'+
    '<label class="admin-label">Краткое описание (SEO)<textarea class="admin-textarea" id="beEx" rows="2">'+esc(p.excerpt)+'</textarea></label>'+
    '<label class="admin-label">Полный текст (HTML)<textarea class="admin-textarea" id="beBo" rows="6">'+esc(p.body)+'</textarea></label>'+
    '<div class="admin-upload" id="beImUp"><input type="file" accept="image/*" id="beImF"><div class="admin-upload__label">Фото статьи</div></div>'+
    (p.img?'<img src="'+esc(p.img)+'" class="admin-upload__preview" id="bePr">':'')+
    '<div style="display:flex;gap:8px;margin-top:12px"><button class="admin-btn admin-btn--accent" id="beSv">Сохранить</button><button class="admin-btn admin-btn--ghost" id="beCn">Отмена</button></div></div>';
  var newImg=p.img;
  fileUpload('beImUp','beImF',function(d){newImg=d;var pr=$('#bePr');if(pr)pr.src=d;else{var i=document.createElement('img');i.id='bePr';i.className='admin-upload__preview';i.src=d;$('#beImUp').after(i);}});
  on('beCn','click',function(){ed.innerHTML='';});
  on('beSv','click',function(){
    var data={id:idx!==null?p.id:Date.now(),title:$('#beT').value,cat:$('#beCat').value,date:$('#beD').value,
      img:newImg,excerpt:$('#beEx').value,body:$('#beBo').value,url:$('#beUrl').value};
    if(idx!==null)S.blogPosts[idx]=data;else S.blogPosts.push(data);
    S._blogModified=true;
    save(S);apply();ed.innerHTML='';renderTab('blog');
  });
}

// ============================================================
// HELPERS
// ============================================================
function on(id,ev,fn){var el=$('#'+id);if(el)el.addEventListener(ev,fn);}
function fileUpload(wrapId,fileId,cb){
  var w=$('#'+wrapId),f=$('#'+fileId);if(!w||!f)return;
  w.addEventListener('click',function(e){if(e.target!==f&&e.target.tagName!=='INPUT')f.click();});
  f.addEventListener('change',function(){
    if(!this.files[0])return;
    var file=this.files[0];
    // Option 1: If filename matches existing upload, use path
    // Option 2: convert to base64 for preview + storage
    var r=new FileReader();
    r.onload=function(e){
      var dataUrl=e.target.result;
      // Try to auto-suggest upload path
      var suggestedPath='assets/img/uploads/'+file.name.toLowerCase().replace(/[^a-z0-9.]/g,'-');
      cb(dataUrl,suggestedPath,file.name);
    };
    r.readAsDataURL(file);
  });
}

// Helper: prompt user to save file manually
function showUploadHint(fileName,dataUrl){
  if(window._uploadHintShown)return;
  window._uploadHintShown=true;
  setTimeout(function(){
    console.log('📁 Загруженное фото "'+fileName+'" сохранено в localStorage.');
    console.log('Чтобы сохранить его в папке assets/img/uploads/, скачайте и поместите туда файл вручную.');
  },100);
}

// ============================================================
// FLAT BUTTON STYLE (alternative)
// ============================================================
function injectBtnStyles(){
  var s=document.createElement('style');s.id='admin-btn-styles';
  s.textContent=
    '.btn-style-flat .btn{background:var(--btn-color1,#1A1A1A)!important;border-radius:999px!important;padding:12px 24px!important}'+
    '.btn-style-flat .btn::before,.btn-style-flat .btn::after{display:none!important}'+
    '.btn-style-flat .btn__inner{background:none!important;padding:0!important;border-radius:0!important;transform:none!important}'+
    '.btn-style-flat .btn:hover{opacity:.85;transform:translateY(-1px)}'+
    '.btn-style-flat .btn--accent{background:var(--btn-color2,#2A7A5F)!important}'+
    '.btn-style-flat .btn--whatsapp{background:#25D366!important}'+
    '.btn-style-flat .btn--ghost{background:transparent!important;border:1.5px solid var(--border)!important}'+
    '.btn-style-flat .btn--ghost .btn__inner{color:var(--dark)}'+
    '.btn-style-flat .btn--lg .btn__inner{padding:0!important}'+
    '.btn-style-flat .btn--lg{padding:16px 32px!important}'+
    '.btn-style-flat .btn--sm{padding:10px 20px!important}';
  document.head.appendChild(s);
}

function injectFxStyles(){
  var s=document.createElement('style');
  s.textContent=
    '.fx-parallax{background-attachment:fixed!important;background-size:cover!important;background-position:center!important}'+
    '@keyframes gradAnim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}'+
    '.fx-gradient-anim{background-size:200% 200%!important;animation:gradAnim 8s ease infinite!important}';
  document.head.appendChild(s);
}

// ============================================================
// INIT
// ============================================================
function init(){
  injectFxStyles();
  injectBtnStyles();
  build();

  // Login flow
  on('adminLoginBtn','click',doLogin);
  $('#adminPass').addEventListener('keydown',function(e){if(e.key==='Enter')doLogin();});
  $('#adminLogin').addEventListener('click',function(e){if(e.target===this)this.classList.remove('active');});
  on('adminClose','click',function(){$('#adminPanel').classList.remove('active');document.body.classList.remove('admin-mode');});

  // Admin button
  var ab=$('#adminBtn');
  if(ab) ab.addEventListener('click',function(e){e.preventDefault();$('#adminLogin').classList.add('active');});

  // Top group tabs
  $$('.admin-tabs--top .admin-tab').forEach(function(t){t.addEventListener('click',function(){
    renderTab(t.dataset.group);
  });});

  // Expose tab/bind functions to window so renderTab can call them dynamically
  ['tabGeneral','tabPromo','tabMenu','tabColors','tabStyles','tabButtons','tabCalc','tabTheme','tabFeatures','tabCards','tabBlocks','tabMedia','tabGallery','tabAbout','tabSeoBlock','tabContent','tabBlog','tabTexts','tabFooter','tabHeadings','bindGeneral','bindPromo','bindMenu','bindColors','bindStyles','bindButtons','bindCalc','bindTheme','bindFeatures','bindCards','bindBlocks','bindMedia','bindGallery','bindAboutTab','bindSeoBlock','bindContent','bindBlogTab','bindTexts','bindFooter','bindHeadings'].forEach(function(name){
    try{if(typeof eval(name)==='function') window[name]=eval(name);}catch(e){}
  });

  // Header theme switcher — cycles auto → dark → light
  var tb=$('#themeBtn');
  if(tb) tb.addEventListener('click',function(){
    var cur=getThemePref();
    var next=cur==='auto'?'dark':cur==='dark'?'light':'auto';
    if(next==='auto') localStorage.removeItem('eco_theme_pref');
    else localStorage.setItem('eco_theme_pref',next);
    applyTheme();
  });

  // Render first group (Оформление → Темы)
  renderTab('design');
  apply();
}

function doLogin(){
  if($('#adminPass').value===PW){
    $('#adminLogin').classList.remove('active');$('#adminPanel').classList.add('active');
    document.body.classList.add('admin-mode');$('#adminErr').style.display='none';
  } else $('#adminErr').style.display='block';
}

document.addEventListener('DOMContentLoaded',init);
})();
