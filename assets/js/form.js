(function(){
  var form = document.getElementById('leadForm');
  if(!form) return;
  var success = form.querySelector('.form__success');
  var WA_NUMBER = '77757862515';

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var volume = (form.volume && form.volume.value || '').trim();
    var details = (form.details && form.details.value || '').trim();
    if(name.length < 2){alert('Введите имя'); return;}
    if(phone.replace(/\D/g,'').length < 10){alert('Введите корректный телефон'); return;}

    // Формируем сообщение для WhatsApp
    var msg =
      'Заявка с сайта ecostroydom.kz%0A%0A' +
      '👤 Имя: ' + encodeURIComponent(name) + '%0A' +
      '📞 Телефон: ' + encodeURIComponent(phone) + '%0A' +
      (volume ? ('📦 Объём: ' + encodeURIComponent(volume) + ' м³%0A') : '') +
      (details ? ('🏠 Размеры дома / стены: ' + encodeURIComponent(details) + '%0A') : '');

    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + msg;

    if(success) success.hidden = false;
    // Открываем WhatsApp
    window.open(url, '_blank');

    setTimeout(function(){
      if(success) success.hidden = true;
      form.querySelectorAll('input,textarea').forEach(function(i){i.value='';});
    }, 4000);
  });

  // Простая маска телефона
  var phoneInp = form.querySelector('input[name="phone"]');
  if(phoneInp){
    phoneInp.addEventListener('input', function(){
      var d = phoneInp.value.replace(/\D/g,'').slice(0,11);
      if(d.length === 0){phoneInp.value=''; return;}
      if(d[0] === '8') d = '7' + d.slice(1);
      var out = '+7';
      if(d.length > 1) out += ' (' + d.slice(1,4);
      if(d.length >= 4) out += ') ' + d.slice(4,7);
      if(d.length >= 7) out += '-' + d.slice(7,9);
      if(d.length >= 9) out += '-' + d.slice(9,11);
      phoneInp.value = out;
    });
  }
})();
