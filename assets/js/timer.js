(function(){
  var intv = null;

  // Render promo texts from config into DOM
  function renderPromoTexts(){
    var cfg = window.PROMO_CONFIG || {};
    var tag = document.getElementById('promoTag');
    var title = document.getElementById('promoTitle');
    var desc = document.getElementById('promoDesc');
    if(tag && cfg.tag) tag.textContent = cfg.tag;
    if(title && cfg.title) title.textContent = cfg.title;
    if(desc && cfg.desc) desc.innerHTML = cfg.desc;
  }
  renderPromoTexts();

  function startTimer(){
    var cfg = window.PROMO_CONFIG || {};
    var root = document.getElementById('timer');
    if(!root || !cfg.endsAt) return;

    var dEl = root.querySelector('[data-d]');
    var hEl = root.querySelector('[data-h]');
    var mEl = root.querySelector('[data-m]');
    var sEl = root.querySelector('[data-s]');
    var fill = document.getElementById('timerFill');
    var expired = document.getElementById('timerExpired');

    var endsAt = new Date(cfg.endsAt).getTime();
    var totalMs = (cfg.durationDays || 3) * 24 * 60 * 60 * 1000;

    if(expired) expired.hidden = true;

    function pad(n){return n < 10 ? '0' + n : '' + n;}

    // Clear previous interval
    if(intv) clearInterval(intv);

    function tick(){
      // Re-read in case it changed
      var currentEnd = new Date(window.PROMO_CONFIG.endsAt).getTime();
      if(currentEnd !== endsAt){
        endsAt = currentEnd;
      }

      var now = Date.now();
      var diff = endsAt - now;
      if(diff <= 0){
        dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
        if(fill) fill.style.width = '0%';
        if(expired) expired.hidden = false;
        clearInterval(intv);
        intv = null;
        return;
      }
      if(expired) expired.hidden = true;
      var d = Math.floor(diff / 86400000);
      var h = Math.floor(diff % 86400000 / 3600000);
      var m = Math.floor(diff % 3600000 / 60000);
      var s = Math.floor(diff % 60000 / 1000);
      dEl.textContent = pad(d);
      hEl.textContent = pad(h);
      mEl.textContent = pad(m);
      sEl.textContent = pad(s);
      if(fill){
        var pct = Math.max(0, Math.min(100, (diff / totalMs) * 100));
        fill.style.width = pct + '%';
      }
    }
    tick();
    intv = setInterval(tick, 1000);
  }

  // Initial start
  startTimer();

  // Expose restart for admin panel
  window.restartPromoTimer = startTimer;
})();
