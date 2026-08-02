// premium.js — Aqui Tem Achadinhos (externo por causa da CSP)
// Animação de entrada (reveal) ao rolar a página
(function () {
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('on'); });
  }
  // Fallback de segurança: nada pode ficar invisível
  setTimeout(function () {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('on'); });
  }, 2500);
})();
