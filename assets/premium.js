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
// TOURO — CENAS COREOGRAFADAS ESTILO APPLE (como a página do iPhone)
// 4 cenas: 0) touro inteiro  1) vem crescendo  2) zoom no detalhe dourado  3) Festa + CTAs
// ============================================================
(function () {
  var pin = document.querySelector('.bull-pin');
  var section = document.querySelector('.bull-scroll');
  if (!pin || !section) return;

  var stage = pin.querySelector('.bull-stage');
  var glow = pin.querySelector('.bull-glow');
  var cap = pin.querySelector('.bull-cap');
  var bg = pin.querySelector('.bs-bg');
  var imgMain = pin.querySelector('.bull-img-main');
  var imgDetail = pin.querySelector('.bull-img-detail');
  var scenes = pin.querySelectorAll('.bs-scene');
  var bar = pin.querySelector('.bs-progress span');

  // pontos-chave de progresso (0..1) → valores de cada propriedade
  var KEYS = [0, 0.25, 0.5, 0.75, 1];
  var SCALE = [0.80, 1.06, 1.32, 1.10, 0.95];
  var ROTY  = [0, 16, 38, 12, 0];
  var ROTX  = [0, 0, -5, 0, 0];
  var GLOW  = [0.42, 0.55, 0.75, 0.6, 0.5];
  var BG    = [ [11,30,63], [13,34,74], [58,20,28], [10,22,45], [11,30,63] ]; // navy → azul → vermelho → navy

  // mouse: o touro olha para o cursor (desktop)
  var mx = 0, my = 0, smx = 0, smy = 0;
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      mx = ((e.clientX / window.innerWidth) - 0.5) * 12;
      my = ((e.clientY / window.innerHeight) - 0.5) * -8;
    }, { passive: true });
  }

  // brasas douradas
  var embersBox = pin.querySelector('.embers');
  if (embersBox) {
    for (var i = 0; i < 18; i++) {
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

  function lerp(a, b, t) { return a + (b - a) * t; }
  function valAt(keys, arr, p) {
    if (p <= keys[0]) return arr[0];
    for (var i = 1; i < keys.length; i++) {
      if (p <= keys[i]) {
        var t = (p - keys[i - 1]) / (keys[i] - keys[i - 1]);
        return lerp(arr[i - 1], arr[i], t);
      }
    }
    return arr[arr.length - 1];
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var r = section.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var total = Math.max(1, r.height - vh);
      var passed = Math.min(Math.max(-r.top, 0), total);
      var p = passed / total;
      render(p);
      ticking = false;
    });
  }

  function render(p) {
    // transformações do touro
    var scale = valAt(KEYS, SCALE, p);
    var rotY = valAt(KEYS, ROTY, p);
    var rotX = valAt(KEYS, ROTX, p);
    var ty = (0.5 - p) * -40;

    smx += (mx - smx) * 0.06;
    smy += (my - smy) * 0.06;

    stage.style.transform =
      'translateY(' + ty.toFixed(2) + 'px) ' +
      'scale(' + scale.toFixed(4) + ') ' +
      'rotateY(' + (rotY + smx).toFixed(2) + 'deg) ' +
      'rotateX(' + (rotX + smy).toFixed(2) + 'deg)';

    if (glow) glow.style.opacity = valAt(KEYS, GLOW, p).toFixed(2);

    // fundo muda de cor por cena
    if (bg) {
      var c0 = BG[0], c1 = BG[1], c2 = BG[2], c3 = BG[3], c4 = BG[4];
      var rgb;
      if (p < 0.25) { var t = p / 0.25; rgb = [lerp(c0[0],c1[0],t), lerp(c0[1],c1[1],t), lerp(c0[2],c1[2],t)]; }
      else if (p < 0.5) { var t = (p - 0.25) / 0.25; rgb = [lerp(c1[0],c2[0],t), lerp(c1[1],c2[1],t), lerp(c1[2],c2[2],t)]; }
      else if (p < 0.75) { var t = (p - 0.5) / 0.25; rgb = [lerp(c2[0],c3[0],t), lerp(c2[1],c3[1],t), lerp(c2[2],c3[2],t)]; }
      else { var t = (p - 0.75) / 0.25; rgb = [lerp(c3[0],c4[0],t), lerp(c3[1],c4[1],t), lerp(c3[2],c4[2],t)]; }
      bg.style.backgroundColor = 'rgb(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ')';
    }

    // imagem principal vs detalhe (zoom na cena 2)
    var det = 0;
    if (p > 0.42 && p < 0.78) {
      det = p < 0.55 ? (p - 0.42) / 0.13 : (p > 0.65 ? (0.78 - p) / 0.13 : 1);
      det = Math.max(0, Math.min(1, det));
    }
    if (imgMain) imgMain.style.opacity = (1 - det).toFixed(3);
    if (imgDetail) imgDetail.style.opacity = det.toFixed(3);

    // chips aparecem no fim
    if (cap) cap.style.opacity = p > 0.78 ? Math.min(1, (p - 0.78) / 0.1) : 0;

    // cenas de texto (fade com base na distância ao centro de cada cena)
    scenes.forEach(function (s, i) {
      var center = (i + 0.5) * 0.25;
      var d = Math.abs(p - center);
      var o = Math.max(0, 1 - d / 0.16);
      s.style.opacity = o.toFixed(3);
    });

    // barra de progresso
    if (bar) bar.style.width = (p * 100).toFixed(1) + '%';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  render(0);
})();
