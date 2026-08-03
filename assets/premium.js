// premium.js — Aqui Tem Achadinhos (externo por causa da CSP)
// v13: Reveal + cenas de scroll + TOURO PREMIUM em CSS 3D
// (imagem cromada + tilt com mouse + parallax + movimento orgânico)

/* ============================================================
   1) REVEAL
   ============================================================ */
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
  setTimeout(function () {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('on'); });
  }, 2500);
})();

/* ============================================================
   2) SCROLL CHOREOGRAPHY (cenas do topo)
   ============================================================ */
(function () {
  var pin = document.querySelector('.bull-pin');
  var section = document.querySelector('.bull-scroll');
  if (!pin || !section) return;

  var stage = pin.querySelector('.bull-stage');
  var glow = pin.querySelector('.bull-glow');
  var cap = pin.querySelector('.bull-cap');
  var bg = pin.querySelector('.bs-bg');
  var scenes = pin.querySelectorAll('.bs-scene');
  var bar = pin.querySelector('.bs-progress span');

  var KEYS = [0, 0.25, 0.5, 0.75, 1];
  var SCALE = [0.78, 1.06, 1.26, 1.08, 0.94];
  var BG = [[11,30,63],[13,34,74],[58,20,28],[10,22,45],[11,30,63]];

  var mx = 0, my = 0, smx = 0, smy = 0;
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      mx = ((e.clientX / window.innerWidth) - 0.5) * 2;
      my = ((e.clientY / window.innerHeight) - 0.5) * 2;
    }, { passive: true });
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function valAt(keys, arr, p) {
    if (p <= keys[0]) return arr[0];
    for (var i = 1; i < keys.length; i++) {
      if (p <= keys[i]) return lerp(arr[i - 1], arr[i], (p - keys[i - 1]) / (keys[i] - keys[i - 1]));
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
      renderTop(Math.min(Math.max(-r.top, 0), total) / total);
      ticking = false;
    });
  }

  function renderTop(p) {
    var scale = valAt(KEYS, SCALE, p);
    var ty = (0.5 - p) * -40;
    smx += (mx - smx) * 0.06;
    smy += (my - smy) * 0.06;
    if (stage) stage.style.transform =
      'translateY(' + ty.toFixed(2) + 'px) ' +
      'scale(' + scale.toFixed(4) + ') ' +
      'rotateY(' + (smx * 5).toFixed(2) + 'deg) ' +
      'rotateX(' + (smy * 3).toFixed(2) + 'deg)';
    if (glow) glow.style.opacity = (0.42 + p * 0.3).toFixed(2);
    if (bg) {
      var c0 = BG[0], c1 = BG[1], c2 = BG[2], c3 = BG[3], c4 = BG[4], rgb, t;
      if (p < 0.25) { t = p / 0.25; rgb = [lerp(c0[0],c1[0],t), lerp(c0[1],c1[1],t), lerp(c0[2],c1[2],t)]; }
      else if (p < 0.5) { t = (p - 0.25) / 0.25; rgb = [lerp(c1[0],c2[0],t), lerp(c1[1],c2[1],t), lerp(c1[2],c2[2],t)]; }
      else if (p < 0.75) { t = (p - 0.5) / 0.25; rgb = [lerp(c2[0],c3[0],t), lerp(c2[1],c3[1],t), lerp(c2[2],c3[2],t)]; }
      else { t = (p - 0.75) / 0.25; rgb = [lerp(c3[0],c4[0],t), lerp(c3[1],c4[1],t), lerp(c3[2],c4[2],t)]; }
      bg.style.backgroundColor = 'rgb(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ')';
    }
    scenes.forEach(function (s, i) {
      var center = (i + 0.5) * 0.25;
      var d = Math.abs(p - center);
      s.style.opacity = Math.max(0, 1 - d / 0.16).toFixed(3);
    });
    if (bar) bar.style.width = (p * 100).toFixed(1) + '%';
    if (cap) cap.style.opacity = p > 0.78 ? Math.min(1, (p - 0.78) / 0.1) : 0;
    if (window.__bullTilt) window.__bullTilt.setScroll(p, smx, smy);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  renderTop(0);
})();

/* ============================================================
   3) TOURO PREMIUM — CSS 3D (imagem cromada + tilt + movimento)
   ============================================================ */
(function () {
  var tilt = document.getElementById('bull3dTilt');
  var img = document.getElementById('bull3dImg');
  var dustBox = document.querySelector('.bull3d-dust');
  var reflect = document.querySelector('.bull3d-reflect');
  var backImg = document.querySelector('.bull3d-back');
  var shadow = document.querySelector('.bull3d-shadow');
  if (!tilt || !img) return;

  /* partículas douradas */
  if (dustBox) {
    for (var i = 0; i < 24; i++) {
      var d = document.createElement('span');
      var s = 4 + Math.random() * 9;
      d.style.width = s + 'px';
      d.style.height = s + 'px';
      d.style.left = (5 + Math.random() * 90) + '%';
      d.style.top = (25 + Math.random() * 60) + '%';
      d.style.setProperty('--dx', ((Math.random() - 0.5) * 90).toFixed(0) + 'px');
      d.style.animationDuration = (4 + Math.random() * 7).toFixed(1) + 's';
      d.style.animationDelay = (Math.random() * 9).toFixed(1) + 's';
      dustBox.appendChild(d);
    }
  }

  var mx = 0, my = 0, smx = 0, smy = 0, scroll = 0;
  var fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (fine) {
    document.addEventListener('mousemove', function (e) {
      mx = ((e.clientX / window.innerWidth) - 0.5) * 2;
      my = ((e.clientY / window.innerHeight) - 0.5) * 2;
    }, { passive: true });
  }
  /* no celular, o toque também controla o tilt */
  document.addEventListener('touchmove', function (e) {
    var t = e.touches[0];
    mx = ((t.clientX / window.innerWidth) - 0.5) * 2;
    my = ((t.clientY / window.innerHeight) - 0.5) * 2;
  }, { passive: true });

  window.__bullTilt = {
    setScroll: function (p, x, y) { scroll = p; },
    getInput: function () { return { mx: mx, my: my, smx: smx, smy: smy }; },
    getTilt: function () { return tilt; }
  };

  var t = 0;
  function frame() {
    requestAnimationFrame(frame);
    t += 0.016;

    smx += (mx - smx) * 0.16;
    smy += (my - smy) * 0.16;

    /* movimento orgânico natural: respiração + balanço suave */
    var breath = 1 + Math.sin(t * 1.5) * 0.014;
    var sway = Math.sin(t * 0.85) * 2.2;         // balança o corpo
    var tiltX = smy * -11;                       // mouse: inclinação (dramática)
    var tiltY = smx * 15;                        // mouse: giro lateral (dramático)
    /* investida furiosa a cada ~5s (avança em escala, orgânico) */
    var charge = Math.pow(Math.max(0, Math.sin(t * 1.25 + 2)), 24);
    var chargeScale = 1 + charge * 0.16;
    var chargeRot = charge * -4;

    tilt.style.transform =
      'rotateX(' + (tiltX + sway * 0.4 + chargeRot).toFixed(2) + 'deg) ' +
      'rotateY(' + (tiltY + sway).toFixed(2) + 'deg) ' +
      'scale(' + (breath * chargeScale).toFixed(4) + ')';

    /* imagem principal flutua com profundidade (translateZ) + respira */
    img.style.transform =
      'translateZ(46px) ' +
      'translateY(' + (Math.sin(t * 1.5) * -8 + charge * -10).toFixed(2) + 'px) ' +
      'scale(' + (1 + Math.sin(t * 1.5) * 0.012).toFixed(4) + ')';

    /* camada de fundo contra-movimento (parallax 2.5D) */
    if (backImg) {
      backImg.style.transform =
        'translateZ(-30px) scale(.94) ' +
        'translateY(' + (Math.sin(t * 1.2 + 1) * 5 + charge * 6).toFixed(2) + 'px) ' +
        'translateX(' + (smx * -8).toFixed(2) + 'px)';
    }

    /* reflexo acompanha */
    if (reflect) {
      reflect.style.opacity = (0.18 + Math.abs(smx) * 0.1).toFixed(2);
      reflect.style.transform = 'scaleY(-1) translateX(' + (smx * -14).toFixed(2) + 'px)';
    }

    /* sombra projetada se move com o tilt */
    if (shadow) {
      shadow.style.transform = 'translateX(' + (smx * 26).toFixed(2) + 'px) scale(' + (1 + Math.abs(smy) * 0.12).toFixed(3) + ')';
      shadow.style.opacity = (0.55 + Math.abs(smy) * 0.3).toFixed(2);
    }
  }
  requestAnimationFrame(frame);
})();
