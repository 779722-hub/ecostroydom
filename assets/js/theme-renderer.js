/*
  Theme renderer — reads /data/themes.json and injects CSS variables
  for the currently active palette slot. Runs before page paint where
  possible. Falls back silently if file is missing (CSS defaults from
  main.css apply).
*/
(function(){
  // Map JSON keys → CSS variable names used in main.css
  var VAR_MAP = {
    accent:      '--mint',
    accentHover: '--mint-hover',
    accentLight: '--mint-light',
    accentGlow:  '--mint-glow',
    bg:          '--bg',
    bg2:         '--bg-2',
    surface:     '--surface',
    surface2:    '--surface-2',
    surface3:    '--surface-3',
    text:        '--text',
    textDim:     '--text-dim',
    textMuted:   '--text-muted',
    line:        '--line',
    lineSoft:    '--line-soft'
  };

  function vars(obj){
    var out = [];
    Object.keys(VAR_MAP).forEach(function(k){
      if (obj && obj[k]) out.push(VAR_MAP[k]+':'+obj[k]);
    });
    return out.join(';');
  }

  function buildCss(slot){
    if (!slot) return '';
    var css = '';
    if (slot.dark)  css += ':root{'+vars(slot.dark)+'}\n';
    if (slot.light) css += 'body.theme-light{'+vars(slot.light)+'}\n';
    if (slot.dark)  css += 'body.theme-dark{'+vars(slot.dark)+'}\n';
    return css;
  }

  function apply(themes){
    if (!themes || !themes.slots) return;
    var slot = themes.slots[themes.active] || themes.slots.slot1;
    if (!slot) return;
    var css = buildCss(slot);
    if (!css) return;
    var tag = document.getElementById('theme-vars');
    if (!tag){
      tag = document.createElement('style');
      tag.id = 'theme-vars';
      // Put AFTER main.css so it wins specificity ties. Append to head.
      document.head.appendChild(tag);
    }
    tag.textContent = css;
  }

  // Expose for admin preview
  window.applyTheme = apply;

  // Fetch and apply
  fetch('/data/themes.json', {cache:'no-cache'})
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(apply)
    .catch(function(){ /* silent — main.css defaults will apply */ });
})();
