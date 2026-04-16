(function(){
  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(function(el){io.observe(el);});
  } else {
    reveals.forEach(function(el){el.classList.add('in-view');});
  }

  // Animated counters
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el){
    var target = parseInt(el.getAttribute('data-count'),10) || 0;
    var dur = 1600;
    var start = performance.now();
    function frame(t){
      var p = Math.min(1,(t-start)/dur);
      var eased = 1 - Math.pow(1-p,3);
      el.textContent = Math.round(target * eased).toLocaleString('ru-RU');
      if(p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if('IntersectionObserver' in window){
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){animateCount(e.target);co.unobserve(e.target);}
      });
    },{threshold:.5});
    counters.forEach(function(el){co.observe(el);});
  }

  // Sticky header background change
  var header = document.getElementById('header');
  if(header){
    window.addEventListener('scroll', function(){
      if(window.scrollY > 20) header.style.boxShadow = '0 4px 20px rgba(0,0,0,.06)';
      else header.style.boxShadow = '';
    }, {passive:true});
  }

  // Burger toggle + close button
  var burger = document.getElementById('burger');
  var nav = document.querySelector('.nav');
  if(burger && nav){
    // Inject close button once
    if(!nav.querySelector('.nav__close')){
      var closeBtn = document.createElement('button');
      closeBtn.className = 'nav__close';
      closeBtn.setAttribute('aria-label','Закрыть меню');
      closeBtn.innerHTML = '&times;';
      nav.insertBefore(closeBtn, nav.firstChild);
      closeBtn.addEventListener('click', function(){ nav.classList.remove('nav--open'); });
    }
    burger.addEventListener('click', function(){
      nav.classList.toggle('nav--open');
    });
    // Close on link click
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('nav--open'); });
    });
    // Close on Escape
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') nav.classList.remove('nav--open');
    });
    // Close on outside click
    document.addEventListener('click', function(e){
      if(nav.classList.contains('nav--open') && !nav.contains(e.target) && !burger.contains(e.target)){
        nav.classList.remove('nav--open');
      }
    });
  }
})();
