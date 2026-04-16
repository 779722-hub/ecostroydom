(function(){
'use strict';

function getPallets(){
  var cs=window.CALC_SETTINGS||{};
  return {
    '100':{vol:cs.pallet100_vol||0.9,blocks:cs.pallet100_blocks||48},
    '200':{vol:cs.pallet200_vol||0.9,blocks:cs.pallet200_blocks||24},
    '250':{vol:cs.pallet250_vol||0.9375,blocks:cs.pallet250_blocks||20},
    '300':{vol:cs.pallet300_vol||0.9,blocks:cs.pallet300_blocks||16},
    '400':{vol:cs.pallet400_vol||0.9,blocks:cs.pallet400_blocks||12}
  };
}
var PALLETS=getPallets();
function getDeposit(){return (window.CALC_SETTINGS&&window.CALC_SETTINGS.depositPallet)||3500;}
var DEPOSIT=getDeposit(), WA='77757862515';
var BLOCKS_M3={'100':55,'150':37,'200':27,'250':22,'300':18,'400':14};

function fmt(n){return Math.round(n).toLocaleString('ru-RU');}
function g(id){var el=document.getElementById(id);return el?el.value:'';}
function s(id,val){var el=document.getElementById(id);if(el)el.textContent=val;}

// Floor heights management
function updateFloorInputs(){
  var floors=parseInt(g('cFloors'))||1;
  var wrap=document.getElementById('floorHeights');if(!wrap)return;
  var existing=wrap.querySelectorAll('.floor-h');
  if(existing.length===floors) return;
  wrap.innerHTML='';
  for(var i=0;i<floors;i++){
    var lbl=document.createElement('label');
    lbl.innerHTML='Высота '+(i+1)+' этажа, м <input type="number" class="floor-h" value="3" min="2.4" max="5" step="0.1">';
    wrap.appendChild(lbl);
    lbl.querySelector('input').addEventListener('input',calc);
  }
}

function getFloorHeights(){
  var inputs=document.querySelectorAll('.floor-h');
  var heights=[];
  inputs.forEach(function(inp){heights.push(parseFloat(inp.value)||3);});
  return heights;
}

function calc(){
  // Re-read settings each time for live updates
  PALLETS=getPallets();
  DEPOSIT=getDeposit();
  var cs=window.CALC_SETTINGS||{};

  var len=parseFloat(g('cLen'))||0;
  var wid=parseFloat(g('cWid'))||0;
  var thick=parseInt(g('cThick'))||300;
  var bear=parseFloat(g('cBear'))||0;
  var bearThick=parseInt(g('cBearThick'))||300;
  var floors=parseInt(g('cFloors'))||1;
  var heights=getFloorHeights();
  var totalHeight=heights.reduce(function(s,h){return s+h;},0);
  var partThick=parseInt(g('cPartThick'))||100;
  var partArea=parseFloat(g('cPartArea'))||0;
  var openings=parseInt(g('cOpenings'))||10;
  var price=parseFloat(g('cPrice'))||41500;
  var gluePer=parseFloat(g('cGlue'))||1.5;

  s('cOpeningsVal',openings+'%');

  // Walls: perimeter × total height
  var perim=2*(len+wid);
  var wallArea=perim*totalHeight*(1-openings/100);
  var wallVol=wallArea*(thick/1000);

  // Bearing partition
  var bearArea=bear*totalHeight*(1-openings/100);
  var bearVol=bearArea*(bearThick/1000);
  wallVol+=bearVol;

  // Internal partitions (already in m²)
  var partVol=partArea*(partThick/1000);

  // Garage
  var garVol=0;
  var gc=document.getElementById('cGarage');
  var gf=document.getElementById('cGarageFields');
  if(gc&&gc.checked){
    if(gf)gf.style.display='block';
    var w1=parseFloat(g('gW1'))||0;
    var w2=parseFloat(g('gW2'))||0;
    var w3=parseFloat(g('gW3'))||0;
    var w4=parseFloat(g('gW4'))||0;
    var gH=parseFloat(g('gH'))||3;
    var gT=parseInt(g('gThick'))||thick;
    var gO=parseInt(g('gOpen'))||10;
    s('gOpenVal',gO+'%');
    var garPerim=w1+w2+w3+w4;
    var garArea=garPerim*gH*(1-gO/100);
    garVol=garArea*(gT/1000);
  } else {if(gf)gf.style.display='none';}

  var totalVol=wallVol+partVol+garVol;

  // Pallets
  var p=PALLETS[thick]||PALLETS['300'];
  var pallets=Math.ceil(totalVol/p.vol);
  var actualVol=pallets*p.vol;
  var totalBlocks=pallets*p.blocks;
  var glueBags=Math.ceil(totalVol*gluePer);
  var deposit=pallets*DEPOSIT;
  var cost=Math.round(actualVol*price);

  // Delivery (rates from settings)
  var dLenC=fmt(Math.round(actualVol*(cs.deliveryLongCity||3000)));
  var dLenS=fmt(Math.round(actualVol*(cs.deliveryLongSub||3500)));
  var dManC=fmt(Math.round(actualVol*(cs.deliveryManCity||5500)));
  var dManS=fmt(Math.round(actualVol*(cs.deliveryManSub||6000)));

  s('rWallVol',(wallVol).toFixed(2)+' м³');
  s('rPartVol',(partVol).toFixed(2)+' м³');
  s('rGarVol',(garVol).toFixed(2)+' м³');
  s('rTotalVol',(totalVol).toFixed(2)+' м³ → '+(actualVol).toFixed(2)+' м³ ('+pallets+' подд.)');
  s('rPallets',pallets+' шт');
  s('rBlocks',fmt(totalBlocks)+' шт');
  var glueCheck=document.getElementById('cGlueCheck');
  var includeGlue=glueCheck?glueCheck.checked:true;
  var glueEl=document.getElementById('rGlue');
  var glueRow=glueEl?glueEl.closest('div'):null;
  if(includeGlue){
    s('rGlue',glueBags+' мешков (~'+fmt(glueBags*1800)+' ₸)');
    if(glueRow)glueRow.style.opacity='1';
  } else {
    s('rGlue','— не включён');
    if(glueRow)glueRow.style.opacity='.4';
  }
  s('rDeposit',fmt(deposit)+' ₸');
  s('rCost',fmt(cost)+' ₸'+(includeGlue?' + клей ~'+fmt(glueBags*1800)+' ₸':''));
  s('dLenCity',dLenC+' ₸');
  s('dLenSub',dLenS+' ₸');
  s('dManCity',dManC+' ₸');
  s('dManSub',dManS+' ₸');

  // Store for WhatsApp
  window._calcData={totalVol:totalVol.toFixed(2),actualVol:actualVol.toFixed(2),pallets:pallets,blocks:totalBlocks,glue:includeGlue?glueBags:0,deposit:fmt(deposit),cost:fmt(cost),dLenC:dLenC,dManC:dManC,includeGlue:includeGlue};
}

function init(){
  var ids=['cLen','cWid','cThick','cBear','cBearThick','cFloors','cPartThick','cPartArea','cOpenings','cPrice','cGlue','gW1','gW2','gW3','gW4','gH','gThick','gOpen'];
  ids.forEach(function(id){
    var el=document.getElementById(id);
    if(el){el.addEventListener('input',calc);el.addEventListener('change',calc);}
  });
  var gc=document.getElementById('cGarage');
  if(gc)gc.addEventListener('change',calc);
  var glc=document.getElementById('cGlueCheck');
  if(glc)glc.addEventListener('change',calc);

  // Floor selector
  var fl=document.getElementById('cFloors');
  if(fl)fl.addEventListener('change',function(){updateFloorInputs();calc();});

  // Calc submit → WhatsApp
  var btn=document.getElementById('calcSubmit');
  if(btn) btn.addEventListener('click',function(){
    showCalcCheckout();
  });

  updateFloorInputs();
  calc();
}

function showCalcCheckout(){
  var d=window._calcData;if(!d)return;
  var existing=document.getElementById('calcCheckout');
  if(existing){existing.style.display='block';return;}
  var wrap=document.getElementById('calcResult');
  var div=document.createElement('div');div.id='calcCheckout';
  div.className='cart-checkout';div.style.marginTop='16px';
  div.innerHTML='<input id="ccName" placeholder="Ваше имя" required>'+
    '<input id="ccPhone" placeholder="+7 (___) ___-__-__" required>'+
    '<input id="ccAddr" placeholder="Адрес/район строительства" required>'+
    '<button class="btn btn--accent btn--block" id="ccSend"><span class="btn__inner">Отправить в WhatsApp →</span></button>'+
    '<div class="cart-checkout__note">Заявка отправляется в WhatsApp</div>';
  wrap.appendChild(div);

  document.getElementById('ccSend').addEventListener('click',function(){
    var name=document.getElementById('ccName').value.trim();
    var phone=document.getElementById('ccPhone').value.trim();
    var addr=document.getElementById('ccAddr').value.trim();
    if(!name||!phone||!addr){alert('Заполните все поля: Имя, Телефон, Адрес');return;}
    var msg='Заявка из калькулятора ecostroydom.kz%0A%0A'+
      '👤 '+encodeURIComponent(name)+'%0A'+
      '📞 '+encodeURIComponent(phone)+'%0A'+
      '📍 '+encodeURIComponent(addr)+'%0A%0A'+
      '📦 Объём: '+d.totalVol+' м³ → '+d.actualVol+' м³%0A'+
      'Поддонов: '+d.pallets+'%0AБлоков: '+d.blocks+'%0A'+
      (d.includeGlue?'Клей: '+d.glue+' мешков%0A':'')+
      'Залог: '+d.deposit+' ₸%0A'+
      '💰 Стоимость блока: '+d.cost+' ₸%0A'+
      '🚛 Доставка длинномер город: '+d.dLenC+' ₸%0A'+
      '🏗 Доставка манипулятор город: '+d.dManC+' ₸';
    window.open('https://wa.me/'+WA+'?text='+msg,'_blank');
  });
}

// SEO form WhatsApp
function initSeoForm(){
  var btn=document.getElementById('seoSubmit');
  if(!btn)return;
  btn.addEventListener('click',function(){
    var name=(document.getElementById('seoName').value||'').trim();
    var phone=(document.getElementById('seoPhone').value||'').trim();
    var query=(document.getElementById('seoQuery').value||'').trim();
    if(!name||!phone){alert('Заполните Имя и Телефон');return;}
    var msg='Запрос с ecostroydom.kz%0A%0A👤 '+encodeURIComponent(name)+'%0A📞 '+encodeURIComponent(phone)+
      (query?'%0A💬 '+encodeURIComponent(query):'');
    window.open('https://wa.me/'+WA+'?text='+msg,'_blank');
  });
}

// Reviews carousel
function initReviews(){
  var container=document.querySelector('.reviews');
  if(!container)return;
  var reviews=Array.from(container.querySelectorAll('.review'));
  if(!reviews.length)return;
  var perPage=window.innerWidth<768?1:(window.innerWidth<1024?2:3);
  var totalPages=Math.ceil(reviews.length/perPage);
  var page=0;

  function show(){
    reviews.forEach(function(r,i){
      r.style.display=(i>=page*perPage&&i<(page+1)*perPage)?'':'none';
    });
  }

  var prev=document.getElementById('revPrev');
  var next=document.getElementById('revNext');

  // Loop: prev from 0 goes to last, next from last goes to 0
  if(prev) prev.addEventListener('click',function(){
    page=(page-1+totalPages)%totalPages;show();
  });
  if(next) next.addEventListener('click',function(){
    page=(page+1)%totalPages;show();
  });

  show();

  window.addEventListener('resize',function(){
    var newPP=window.innerWidth<768?1:(window.innerWidth<1024?2:3);
    if(newPP!==perPage){perPage=newPP;totalPages=Math.ceil(reviews.length/perPage);page=0;show();}
  });

  // Autoplay every 8s
  setInterval(function(){
    page=(page+1)%totalPages;show();
  },8000);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){init();initSeoForm();initReviews();});
else {init();initSeoForm();initReviews();}

window.PALLET_DATA=PALLETS;window.DEPOSIT_PER_PALLET=DEPOSIT;
})();
