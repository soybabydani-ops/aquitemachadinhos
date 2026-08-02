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

// ============================================================
// TOURO SCROLL 3D — "vem em direção à tela" conforme você rola
// ============================================================
(function () {
  var pin = document.querySelector('.bull-scroll');
  if (!pin) return;
  var stage = pin.querySelector('.bull-stage');
  var glow = pin.querySelector('.bull-glow');
  var caption = pin.querySelector('.bull-caption');

  // estado compartilhado (scroll + mouse)
  var st = { p: 0, mx: 0, my: 0, smx: 0, smy: 0 };
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var r = pin.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var total = Math.max(1, r.height - vh);
      var passed = Math.min(Math.max(-r.top, 0), total);
      st.p = passed / total;
      ticking = false;
    });
  }

  // MOUSE: o touro "olha" para o cursor (desktop)
  var fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (fine) {
    document.addEventListener('mousemove', function (e) {
      st.mx = ((e.clientX / window.innerWidth) - 0.5) * 14;   // -7..7 deg
      st.my = ((e.clientY / window.innerHeight) - 0.5) * -10; // -5..5 deg
    }, { passive: true });
  }

  // brasas douradas
  var embersBox = pin.querySelector('.embers');
  if (embersBox) {
    for (var i = 0; i < 16; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      var size = 4 + Math.random() * 10;
      e.style.width = size + 'px';
      e.style.height = size + 'px';
      e.style.left = (4 + Math.random() * 92) + '%';
      e.style.setProperty('--dx', ((Math.random() - 0.5) * 90).toFixed(0) + 'px');
      e.style.animationDuration = (5 + Math.random() * 8).toFixed(1) + 's';
      e.style.animationDelay = (Math.random() * 10).toFixed(1) + 's';
      embersBox.appendChild(e);
    }
  }

  // loop de renderização (compõe scroll + mouse no stage)
  function render() {
    var p = st.p;
    // escala: 0.72 -> 1.22 (vem em direção à tela)
    var scale = 0.72 + p * 0.5;
    // rotação lateral: -12deg -> +12deg (vira para olhar)
    var rotY = -12 + p * 24;
    // sobe levemente enquanto vem
    var ty = (0.5 - p) * -30;
    // suaviza o mouse
    st.smx += (st.mx - st.smx) * 0.06;
    st.smy += (st.my - st.smy) * 0.06;

    stage.style.transform =
      'translateY(' + ty.toFixed(2) + 'px) ' +
      'scale(' + scale.toFixed(4) + ') ' +
      'rotateY(' + (rotY + st.smx).toFixed(2) + 'deg) ' +
      'rotateX(' + st.smy.toFixed(2) + 'deg)';

    if (glow) glow.style.opacity = (0.45 + p * 0.4).toFixed(2);
    if (caption) {
      if (p > 0.45) caption.classList.add('on');
      else caption.classList.remove('on');
    }
    requestAnimationFrame(render);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  render();
})();
