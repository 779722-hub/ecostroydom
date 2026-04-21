(function(){
'use strict';

var PALLETS={
  '100':{vol:0.9,blocks:48},'200':{vol:0.9,blocks:24},
  '250':{vol:0.9375,blocks:20},'300':{vol:0.9,blocks:16},'400':{vol:0.9,blocks:12}
};
var DEPOSIT=3500,GLUE=1.5,WA='77757862515';
var cart=[];

function getThick(s){var m=s.match(/(\d+)\s*мм/);if(m)return m[1];var p=s.replace(/\s/g,'').split('×');return p.length>=3?p[2].replace(/\D/g,''):'300';}
function fmt(n){return Math.round(n).toLocaleString('ru-RU');}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function parsePriceNum(s){
  if(!s)return 0;
  return parseInt(String(s).replace(/\s/g,'').replace(/[^\d]/g,''))||0;
}

function addToCart(card,qty){
  var title=card.querySelector('h3')?card.querySelector('h3').textContent.trim():'';
  var sizeEl=card.querySelector('.card__size');
  var sizeStr=sizeEl?sizeEl.textContent.trim():'300';
  var thick=getThick(sizeStr);
  var priceEl=card.querySelector('.card__price b');
  var price=parsePriceNum(priceEl?priceEl.textContent:'41500')||41500;
  // Promo price (from data-attr on .card__price or secondary .card__price-promo b)
  var priceWrap=card.querySelector('.card__price');
  var promoAttr=priceWrap?priceWrap.getAttribute('data-promo-price'):null;
  var promoPrice=parsePriceNum(promoAttr);
  if(!promoPrice){
    var pp=card.querySelector('.card__price-promo b');
    if(pp)promoPrice=parsePriceNum(pp.textContent);
  }
  var imgEl=card.querySelector('img');var img=imgEl?imgEl.src:'';

  var p=PALLETS[thick]||PALLETS['300'];
  var pallets=Math.max(1,parseInt(qty)||1);

  var existing=cart.find(function(c){return c.title===title&&c.thick===thick;});
  var qtyUnit = card.getAttribute('data-qty-unit') || 'подд.';
  if(existing){
    existing.pallets+=pallets;
    if(promoPrice)existing.promoPrice=promoPrice; // update in case changed
    existing.qtyUnit=qtyUnit;
  } else {
    cart.push({title:title,size:sizeStr,thick:thick,price:price,promoPrice:promoPrice||0,usePromo:false,img:img,pallets:pallets,qtyUnit:qtyUnit});
  }
  saveCart();renderCart();showBadge();
}

function saveCart(){try{localStorage.setItem('eco_cart',JSON.stringify(cart));}catch(e){}}
function loadCart(){try{var s=localStorage.getItem('eco_cart');if(s)cart=JSON.parse(s);}catch(e){}}
function showBadge(){
  var b=document.getElementById('cartBadge'),c=document.getElementById('cartCount');if(!b)return;
  var t=cart.reduce(function(s,c){return s+c.pallets;},0);
  b.style.display=t>0?'flex':'none';if(c)c.textContent=t;
}

function stripTags(s){return String(s||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();}

// Read клей card pricing from DOM (so admin price changes are picked up).
function getGlueData(){
  var out={price:1900,promoPrice:0};
  var cards=document.querySelectorAll('#catalog .card');
  for(var i=0;i<cards.length;i++){
    var h=cards[i].querySelector('h3');
    if(!h)continue;
    if(!/клей/i.test(h.textContent))continue;
    var pb=cards[i].querySelector('.card__price b');
    if(pb)out.price=parsePriceNum(pb.textContent)||out.price;
    var pwrap=cards[i].querySelector('.card__price');
    if(pwrap){
      var pp=pwrap.getAttribute('data-promo-price');
      if(pp)out.promoPrice=parsePriceNum(pp);
    }
    if(!out.promoPrice){
      var pp2=cards[i].querySelector('.card__price-promo b');
      if(pp2)out.promoPrice=parsePriceNum(pp2.textContent);
    }
    break;
  }
  return out;
}
function cartHasGlue(){
  return cart.some(function(it){ return /клей/i.test(it.title||''); });
}

function getPromoConditions(){
  var cfg=window.PROMO_CONFIG||{};
  var parts=[];
  if(cfg.title)parts.push(stripTags(cfg.title));
  if(cfg.desc)parts.push(stripTags(cfg.desc));
  return parts.filter(Boolean).join(' · ');
}

function renderCart(){
  var body=document.getElementById('cartBody'),footer=document.getElementById('cartFooter');if(!body)return;
  if(!cart.length){body.innerHTML='<p style="text-align:center;color:var(--muted);padding:40px 0">Корзина пуста</p>';footer.innerHTML='';return;}

  var html='',totalCost=0,totalDep=0,totalGlue=0,totalBlockVol=0,anyPromo=false;
  cart.forEach(function(item,i){
    var unit=item.qtyUnit||'подд.';
    var isPalletized=(unit==='подд.');
    var p=PALLETS[item.thick]||PALLETS['300'];
    var effPrice=item.usePromo&&item.promoPrice?item.promoPrice:item.price;
    var vol=0,blocks=0,cost=0,glueHint=0,regCost=0;
    if(isPalletized){
      vol=item.pallets*p.vol;
      blocks=item.pallets*p.blocks;
      cost=Math.round(vol*effPrice);
      regCost=Math.round(vol*item.price);
      glueHint=Math.ceil(vol*GLUE);
      totalDep+=item.pallets*DEPOSIT;
      totalGlue+=glueHint;
      totalBlockVol+=vol;
    } else {
      // Unit-priced item (мешки, шт, кг): cost = qty × price
      cost=Math.round(item.pallets*effPrice);
      regCost=Math.round(item.pallets*item.price);
    }
    totalCost+=cost;
    if(item.usePromo)anyPromo=true;

    var promoLine='';
    if(item.promoPrice){
      promoLine='<label class="cart-item__promo">'+
        '<input type="checkbox" data-promo-toggle="'+i+'"'+(item.usePromo?' checked':'')+'>'+
        '<span>По акции — '+fmt(item.promoPrice)+' ₸'+(isPalletized?'/м³':'')+'</span>'+
        '<b>'+(item.usePromo?'−'+fmt(regCost-cost)+' ₸':'')+'</b>'+
        '</label>';
    }

    var volLine=isPalletized
      ? '<p>'+item.pallets+' '+esc(unit)+' × '+p.vol+' м³ = '+vol.toFixed(2)+' м³ ('+blocks+' шт)</p><p>Клей: ~'+glueHint+' мешков</p>'
      : '<p>'+item.pallets+' '+esc(unit)+'</p>';

    html+='<div class="cart-item"><img src="'+esc(item.img)+'" alt="">'+
      '<div class="cart-item__info"><h4>'+esc(item.title)+'</h4>'+
      '<p>'+esc(item.size)+'</p>'+
      volLine+
      '<p style="color:var(--accent);font-weight:600">'+(item.usePromo?'<small style="text-decoration:line-through;color:var(--muted);margin-right:4px">'+fmt(regCost)+' ₸</small>':'')+fmt(cost)+' ₸</p>'+
      promoLine+
      '<div class="cart-item__qty">'+
        '<button data-minus="'+i+'">−</button>'+
        '<input type="number" value="'+item.pallets+'" min="1" data-qinp="'+i+'" style="width:50px;text-align:center;border:1px solid var(--border);border-radius:6px;padding:4px;font-weight:700">'+
        '<button data-plus="'+i+'">+</button>'+
      '</div></div>'+
      '<button class="cart-item__del" data-cdel="'+i+'">&times;</button></div>';
  });
  body.innerHTML=html;

  var glueChecked=footer.querySelector('#cartGlueCheck');
  var glueData=getGlueData();
  var hasGlueCard=cartHasGlue();
  // "клей по акции" unlocked only if any блок usePromo AND klej has a promoPrice set in admin
  var gluePromoUnlocked=anyPromo && !!glueData.promoPrice;
  var glueUnitPrice=gluePromoUnlocked?glueData.promoPrice:glueData.price;
  var includeGlue=(!hasGlueCard) && (glueChecked?glueChecked.checked:false);
  var glueCost=includeGlue?totalGlue*glueUnitPrice:0;

  var conditionsBlock='';
  if(anyPromo){
    var cond=getPromoConditions();
    if(cond)conditionsBlock='<div class="cart-promo-conditions"><b>⚡ Условия акции</b>'+esc(cond)+'</div>';
  } else {
    conditionsBlock='<div class="cart-shipping-note"><b>📦 Сроки отгрузки</b>Начало отгрузки в течение недели согласно графика Поставщика.</div>';
  }

  // Glue checkbox only if клей NOT already manually added
  var glueCheckboxHtml='';
  if(!hasGlueCard){
    var glueLabel=gluePromoUnlocked
      ? 'Добавить клей по акции (~'+totalGlue+' мешков)'
      : 'Добавить клей (~'+totalGlue+' мешков)';
    var glueCostHtml=gluePromoUnlocked
      ? '<small style="text-decoration:line-through;color:var(--muted);margin-right:4px">'+fmt(totalGlue*glueData.price)+' ₸</small><b>~'+fmt(totalGlue*glueUnitPrice)+' ₸</b>'
      : '<b>~'+fmt(totalGlue*glueUnitPrice)+' ₸</b>';
    glueCheckboxHtml='<label style="display:flex;align-items:center;gap:8px;padding:8px 0;cursor:pointer"><input type="checkbox" id="cartGlueCheck" '+(includeGlue?'checked':'')+' style="width:auto;accent-color:var(--accent)"> <span>'+esc(glueLabel)+'</span>'+glueCostHtml+'</label>';
  }

  footer.innerHTML=
    '<div class="min-order-notice">Заказы от 10 м.куб газоблока. Расчёт от суммы заявки 500 000 ₸</div>'+
    conditionsBlock+
    '<div style="font-size:13px;display:flex;flex-direction:column;gap:6px;margin-bottom:12px">'+
    '<div style="display:flex;justify-content:space-between"><span>Блок:</span><b>'+fmt(totalCost)+' ₸</b></div>'+
    '<div style="display:flex;justify-content:space-between"><span>Залог поддоны (возвр.):</span><b>'+fmt(totalDep)+' ₸</b></div>'+
    glueCheckboxHtml+
    '<div style="display:flex;justify-content:space-between;font-size:16px;padding-top:8px;border-top:1px solid var(--border)"><span>Итого:</span><b style="color:var(--accent)">'+fmt(totalCost+glueCost)+' ₸</b></div></div>'+
    '<div class="cart-checkout" id="cartCheckout">'+
    '<input id="cartName" placeholder="Ваше имя *">'+
    '<input id="cartPhone" placeholder="+7 (___) ___-__-__ *">'+
    '<input id="cartAddr" placeholder="Адрес/район строительства *">'+
    '</div>'+
    '<button class="btn btn--primary btn--block" id="cartSubmit"><span class="btn__inner">Оформить заявку в WhatsApp →</span></button>'+
    '<div class="cart-checkout__note">Заявка отправляется в WhatsApp</div>';

  // Bindings
  body.querySelectorAll('[data-plus]').forEach(function(b){b.addEventListener('click',function(){cart[+b.dataset.plus].pallets++;saveCart();renderCart();showBadge();});});
  body.querySelectorAll('[data-minus]').forEach(function(b){b.addEventListener('click',function(){var i=+b.dataset.minus;cart[i].pallets--;if(cart[i].pallets<=0)cart.splice(i,1);saveCart();renderCart();showBadge();});});
  body.querySelectorAll('[data-qinp]').forEach(function(inp){inp.addEventListener('change',function(){
    var i=+inp.dataset.qinp;var v=parseInt(inp.value)||1;cart[i].pallets=Math.max(1,v);saveCart();renderCart();showBadge();
  });});
  body.querySelectorAll('[data-cdel]').forEach(function(b){b.addEventListener('click',function(){cart.splice(+b.dataset.cdel,1);saveCart();renderCart();showBadge();});});
  body.querySelectorAll('[data-promo-toggle]').forEach(function(cb){cb.addEventListener('change',function(){
    var i=+cb.dataset.promoToggle;cart[i].usePromo=cb.checked;saveCart();renderCart();
  });});

  // Glue checkbox toggle
  var glueCheck=document.getElementById('cartGlueCheck');
  if(glueCheck) glueCheck.addEventListener('change',function(){renderCart();});

  // Submit
  var sub=document.getElementById('cartSubmit');
  if(sub) sub.addEventListener('click',function(){
    var name=(document.getElementById('cartName').value||'').trim();
    var phone=(document.getElementById('cartPhone').value||'').trim();
    var addr=(document.getElementById('cartAddr').value||'').trim();
    if(!name||!phone||!addr){alert('Заполните все поля: Имя, Телефон, Адрес/район');return;}
    var msg='Заказ с ecostroydom.kz%0A%0A👤 '+encodeURIComponent(name)+'%0A📞 '+encodeURIComponent(phone)+'%0A📍 '+encodeURIComponent(addr)+'%0A%0A📦 Товары:%0A';
    var promoFlag=false;
    cart.forEach(function(item){
      var unit=item.qtyUnit||'подд.';
      var isPalletized=(unit==='подд.');
      var p=PALLETS[item.thick]||PALLETS['300'];
      var effPrice=item.usePromo&&item.promoPrice?item.promoPrice:item.price;
      var promoMark=item.usePromo?' ⚡АКЦИЯ':'';
      if(item.usePromo)promoFlag=true;
      var lineCost, metaStr;
      if(isPalletized){
        var vol=item.pallets*p.vol;
        lineCost=Math.round(vol*effPrice);
        metaStr=item.pallets+' '+unit+' ('+vol.toFixed(2)+' м³)';
      } else {
        lineCost=Math.round(item.pallets*effPrice);
        metaStr=item.pallets+' '+unit;
      }
      msg+='• '+encodeURIComponent(item.title)+' '+encodeURIComponent(item.size)+': '+encodeURIComponent(metaStr)+' = '+fmt(lineCost)+' ₸'+encodeURIComponent(promoMark)+'%0A';
    });
    var gc=document.getElementById('cartGlueCheck');
    var withGlue=gc&&gc.checked;
    msg+='%0A💰 Итого блок: '+fmt(totalCost)+' ₸';
    if(promoFlag){
      msg+='%0A⚡ Применена акция';
    }
    if(withGlue){
      var gd=getGlueData();
      var gUnit=(promoFlag && gd.promoPrice)?gd.promoPrice:gd.price;
      msg+='%0A🧱 Клей: ~'+totalGlue+' мешков (~'+fmt(totalGlue*gUnit)+' ₸)';
    }
    msg+='%0A📦 Залог поддоны (возвр.): '+fmt(totalDep)+' ₸';
    window.open('https://wa.me/'+WA+'?text='+msg,'_blank');
  });
}

function addPalletInfo(){
  document.querySelectorAll('#catalog .card').forEach(function(card){
    if(card.querySelector('.card__pallet'))return;
    var sizeEl=card.querySelector('.card__size');if(!sizeEl)return;
    var thick=getThick(sizeEl.textContent);
    var p=PALLETS[thick];if(!p)return;
    var info=document.createElement('div');info.className='card__pallet';
    info.innerHTML='1 поддон: <b>'+p.vol+' м³</b> ('+p.blocks+' шт) · Залог <b>'+fmt(DEPOSIT)+' ₸</b>';
    var priceEl=card.querySelector('.card__price');if(priceEl)priceEl.after(info);
  });
}

function replaceCartButtons(){
  document.querySelectorAll('#catalog .card .btn').forEach(function(btn){
    if(btn.dataset.cartified)return;btn.dataset.cartified='1';
    // Add qty input before button
    var card=btn.closest('.card');if(!card)return;
    var wrap=document.createElement('div');
    wrap.style.cssText='display:flex;gap:8px;align-items:center;margin-bottom:12px';
    var unit=card.getAttribute('data-qty-unit')||'подд.';
    wrap.innerHTML='<input type="number" class="cart-qty-inp" value="1" min="1" style="width:60px;padding:8px;border:1.5px solid var(--border);border-radius:8px;text-align:center;font-weight:700;font-size:14px"> <span style="font-size:12px;color:var(--muted)">'+esc(unit)+'</span>';
    btn.before(wrap);

    btn.addEventListener('click',function(e){
      e.preventDefault();
      var qtyInp=card.querySelector('.cart-qty-inp');
      var qty=parseInt(qtyInp?qtyInp.value:1)||1;
      addToCart(card,qty);
      btn.querySelector('.btn__inner').textContent='Добавлено ✓';
      setTimeout(function(){btn.querySelector('.btn__inner').textContent='В корзину';},1200);
    });
    btn.querySelector('.btn__inner').textContent='В корзину';
  });
}

// Lightbox
var lbImgs=[],lbIdx=0;
function initLightbox(){
  document.querySelectorAll('#gallery .gallery__item img').forEach(function(img,i){
    img.style.cursor='zoom-in';
    img.addEventListener('click',function(){
      lbImgs=Array.from(document.querySelectorAll('#gallery .gallery__item img')).map(function(i){return i.src;});
      lbIdx=i;showLb();
    });
  });
  var lb=document.getElementById('lightbox');if(!lb)return;
  document.getElementById('lbClose').addEventListener('click',function(){lb.style.display='none';});
  document.getElementById('lbPrev').addEventListener('click',function(){lbIdx=(lbIdx-1+lbImgs.length)%lbImgs.length;showLb();});
  document.getElementById('lbNext').addEventListener('click',function(){lbIdx=(lbIdx+1)%lbImgs.length;showLb();});
  lb.addEventListener('click',function(e){if(e.target===lb)lb.style.display='none';});
  document.addEventListener('keydown',function(e){
    if(lb.style.display==='none')return;
    if(e.key==='Escape')lb.style.display='none';
    if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+lbImgs.length)%lbImgs.length;showLb();}
    if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%lbImgs.length;showLb();}
  });
}
function showLb(){document.getElementById('lbImg').src=lbImgs[lbIdx];document.getElementById('lightbox').style.display='flex';}

// Scroll to top
function initScrollTop(){
  var btn=document.getElementById('scrollTop');if(!btn)return;
  window.addEventListener('scroll',function(){btn.classList.toggle('visible',window.scrollY>600);},{passive:true});
  btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
}

// Cart panel toggle
function initCartPanel(){
  var badge=document.getElementById('cartBadge');
  var panel=document.getElementById('cartPanel');
  var close=document.getElementById('cartClose');
  if(badge)badge.addEventListener('click',function(){panel.style.display='flex';renderCart();});
  if(close)close.addEventListener('click',function(){panel.style.display='none';});
}

// Blog links → open in new tab
function blogNewTab(){
  document.querySelectorAll('.blog-card__link').forEach(function(a){
    a.setAttribute('target','_blank');a.setAttribute('rel','noopener');
  });
}

// Upsell order forms
function initUpsellForms(){
  document.querySelectorAll('.upsell-order-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var card=btn.closest('.upsell');if(!card)return;
      var name=card.dataset.upsellName||'';
      var price=card.dataset.upsellPrice||'';

      // Check if form already exists
      var existing=card.querySelector('.upsell-form');
      if(existing){existing.classList.toggle('active');return;}

      var form=document.createElement('div');form.className='upsell-form active';
      form.innerHTML=
        '<input type="text" class="uf-name" placeholder="Ваше имя *">'+
        '<input type="tel" class="uf-phone" placeholder="+7 (___) ___-__-__ *">'+
        '<textarea class="uf-details">'+esc(name)+' — '+esc(price)+'\n</textarea>'+
        '<button class="btn btn--accent btn--sm btn--block" style="margin-top:0"><span class="btn__inner">Отправить в WhatsApp →</span></button>'+
        '<div class="upsell-form__note">Заявка отправляется в WhatsApp поставщика</div>';

      var body=card.querySelector('.upsell__body');
      body.appendChild(form);

      form.querySelector('.btn').addEventListener('click',function(e){
        e.preventDefault();
        var cName=form.querySelector('.uf-name').value.trim();
        var cPhone=form.querySelector('.uf-phone').value.trim();
        var cDetails=form.querySelector('.uf-details').value.trim();
        if(!cName||!cPhone){alert('Заполните Имя и Телефон');return;}
        var msg='Заказ с ecostroydom.kz%0A%0A'+
          '👤 '+encodeURIComponent(cName)+'%0A'+
          '📞 '+encodeURIComponent(cPhone)+'%0A'+
          '📦 '+encodeURIComponent(cDetails);
        window.open('https://wa.me/'+WA+'?text='+msg,'_blank');
      });
    });
  });
}

function init(){
  loadCart();addPalletInfo();replaceCartButtons();showBadge();
  initLightbox();initScrollTop();initCartPanel();blogNewTab();
  initUpsellForms();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
