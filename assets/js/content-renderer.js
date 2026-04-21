/*
  Content renderer — reads /data/content.json and fills DOM elements
  that have `data-content-key="path.to.value"`. Keys ending with "Html"
  use innerHTML, others use textContent. Array indices supported via
  dot notation: e.g. hero.hooks.0 → data.hero.hooks[0].

  HTML already contains default values (SEO fallback). Renderer only
  overwrites when JSON has the key set. Fails silently on any error.
*/
(function(){
  function getPath(obj, path){
    var parts = String(path).split('.');
    var cur = obj;
    for (var i=0; i<parts.length; i++){
      if (cur == null) return undefined;
      var p = parts[i];
      if (/^\d+$/.test(p)) cur = cur[parseInt(p, 10)];
      else cur = cur[p];
    }
    return cur;
  }

  function apply(data){
    if (!data) return;
    var nodes = document.querySelectorAll('[data-content-key]');
    for (var i=0; i<nodes.length; i++){
      var el = nodes[i];
      var key = el.getAttribute('data-content-key');
      var val = getPath(data, key);
      if (val === undefined || val === null) continue;
      if (typeof val !== 'string') continue;
      // HTML-capable keys: name ends with "Html" OR value contains tags we want preserved.
      if (/Html$/i.test(key) || /<\w/.test(val)) {
        if (el.innerHTML !== val) el.innerHTML = val;
      } else {
        if (el.textContent !== val) el.textContent = val;
      }
    }
  }

  window.applyContent = apply;

  fetch('/data/content.json', {cache:'no-cache'})
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(apply)
    .catch(function(){ /* silent — HTML defaults apply */ });
})();
