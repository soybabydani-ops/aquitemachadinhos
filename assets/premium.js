// premium.js — Aqui Tem Achadinhos (externo por causa da CSP)
// v8: Reveal + Coreografia do topo (cenas Apple) + Touro 8D (fatias 3D)

/* ============================================================
   1) REVEAL — animação de entrada ao rolar
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
   2) TOPO — CENAS COREOGRAFADAS (estilo página do iPhone)
   ============================================================ */
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

  var KEYS = [0, 0.25, 0.5, 0.75, 1];
  var SCALE = [0.80, 1.08, 1.34, 1.12, 0.96];
  var ROTY = [0, 16, 38, 12, 0];
  var GLOW = [0.42, 0.55, 0.75, 0.6, 0.5];
  var BG = [[11,30,63],[13,34,74],[58,20,28],[10,22,45],[11,30,63]];

  var mx = 0, my = 0, smx = 0, smy = 0;
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      mx = ((e.clientX / window.innerWidth) - 0.5) * 12;
      my = ((e.clientY / window.innerHeight) - 0.5) * -8;
    }, { passive: true });
  }

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
      renderTop(passed / total);
      ticking = false;
    });
  }

  function renderTop(p) {
    var scale = valAt(KEYS, SCALE, p);
    var rotY = valAt(KEYS, ROTY, p);
    var ty = (0.5 - p) * -40;
    smx += (mx - smx) * 0.06;
    smy += (my - smy) * 0.06;
    stage.style.transform =
      'translateY(' + ty.toFixed(2) + 'px) ' +
      'scale(' + scale.toFixed(4) + ') ' +
      'rotateY(' + (rotY + smx).toFixed(2) + 'deg) ' +
      'rotateX(' + smy.toFixed(2) + 'deg)';
    if (glow) glow.style.opacity = valAt(KEYS, GLOW, p).toFixed(2);
    if (bg) {
      var c0 = BG[0], c1 = BG[1], c2 = BG[2], c3 = BG[3], c4 = BG[4], rgb, t;
      if (p < 0.25) { t = p / 0.25; rgb = [lerp(c0[0],c1[0],t), lerp(c0[1],c1[1],t), lerp(c0[2],c1[2],t)]; }
      else if (p < 0.5) { t = (p - 0.25) / 0.25; rgb = [lerp(c1[0],c2[0],t), lerp(c1[1],c2[1],t), lerp(c1[2],c2[2],t)]; }
      else if (p < 0.75) { t = (p - 0.5) / 0.25; rgb = [lerp(c2[0],c3[0],t), lerp(c2[1],c3[1],t), lerp(c2[2],c3[2],t)]; }
      else { t = (p - 0.75) / 0.25; rgb = [lerp(c3[0],c4[0],t), lerp(c3[1],c4[1],t), lerp(c3[2],c4[2],t)]; }
      bg.style.backgroundColor = 'rgb(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ')';
    }
    var det = 0;
    if (p > 0.42 && p < 0.78) {
      det = p < 0.55 ? (p - 0.42) / 0.13 : (p > 0.65 ? (0.78 - p) / 0.13 : 1);
      det = Math.max(0, Math.min(1, det));
    }
    if (imgMain) imgMain.style.opacity = (1 - det).toFixed(3);
    if (imgDetail) imgDetail.style.opacity = det.toFixed(3);
    if (cap) cap.style.opacity = p > 0.78 ? Math.min(1, (p - 0.78) / 0.1) : 0;
    scenes.forEach(function (s, i) {
      var center = (i + 0.5) * 0.25;
      var d = Math.abs(p - center);
      s.style.opacity = Math.max(0, 1 - d / 0.16).toFixed(3);
    });
    if (bar) bar.style.width = (p * 100).toFixed(1) + '%';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  renderTop(0);
})();

/* ============================================================
   3) TOURO 8D — FATIAS 3D (slice parallax) + movimento furioso
   ============================================================ */
(function () {
  var scenes = document.querySelectorAll('.bull8d');
  if (!scenes.length) return;

  var N = 24; // número de fatias
  var mx = 0, my = 0, smx = 0, smy = 0;
  var fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (fine) {
    document.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }

  scenes.forEach(function (sc) {
    var scene = sc.querySelector('.b8d-scene');
    var slicesBox = sc.querySelector('.b8d-slices');
    var reflect = sc.querySelector('.b8d-reflect');
    var dustBox = sc.querySelector('.b8d-dust');
    var src = scene.getAttribute('data-src');

    // cria as fatias
    var slices = [];
    for (var i = 0; i < N; i++) {
      var sl = document.createElement('div');
      sl.className = 'b8d-slice';
      sl.style.left = (i * 100 / N) + '%';
      sl.style.width = (100 / N) + '%';
      sl.style.backgroundImage = "url('" + src + "')";
      sl.style.backgroundPosition = (i * 100 / (N - 1)) + '% 0';
      slicesBox.appendChild(sl);
      slices.push(sl);
    }

    // poeira dourada
    if (dustBox) {
      for (var d = 0; d < 22; d++) {
        var p = document.createElement('span');
        p.className = 'dust';
        var s = 3 + Math.random() * 7;
        p.style.width = s + 'px';
        p.style.height = s + 'px';
        p.style.left = (6 + Math.random() * 88) + '%';
        p.style.top = (30 + Math.random() * 55) + '%';
        p.style.setProperty('--dx', ((Math.random() - 0.5) * 80).toFixed(0) + 'px');
        p.style.animationDuration = (4 + Math.random() * 6).toFixed(1) + 's';
        p.style.animationDelay = (Math.random() * 8).toFixed(1) + 's';
        dustBox.appendChild(p);
      }
    }

    // estado por cena
    sc._state = { slices: slices, scene: scene, reflect: reflect, t: Math.random() * 10 };
  });

  var tGlobal = 0;
  function frame() {
    tGlobal += 0.016;
    smx += (mx - smx) * 0.05;
    smy += (my - smy) * 0.05;

    scenes.forEach(function (sc) {
      var st = sc._state;
      if (!st) return;
      var t = st.t += 0.016;

      // ---- MOVIMENTO FURIOSO (bem visível) ----
      // respiração forte: escala 1 -> 1.035
      var breath = 1 + Math.sin(t * 1.7) * 0.017;
      // balanço amplo do corpo (rotateY ±5°)
      var sway = Math.sin(t * 0.8) * 5;
      // inclinação (rotateX ±3°)
      var tilt = Math.sin(t * 0.6 + 1.1) * 3;
      // INVESTIDA FURIOSA a cada ~7s: avança em Z com tudo
      var charge = Math.pow(Math.max(0, Math.sin(t * 0.9 + 1.5)), 20);
      var chargeZ = charge * 90;
      var chargeScale = 1 + charge * 0.16;
      var chargeRotX = charge * -7;
      var chargeRotY = charge * 6;

      // ---- mouse: leque 3D das fatias ----
      var shift = smx * 30;          // deslocamento máximo em px
      var rotScene = smx * 10 + chargeRotY;
      var rotSceneX = smy * 6 + chargeRotX;
      var sceneScale = breath * chargeScale;

      // container 3D
      st.scene.style.transform =
        'translateZ(' + chargeZ.toFixed(2) + 'px) ' +
        'rotateY(' + rotScene.toFixed(2) + 'deg) ' +
        'rotateX(' + rotSceneX.toFixed(2) + 'deg) ' +
        'scale(' + sceneScale.toFixed(4) + ')';

      // cada fatia abre em leque (profundidade real)
      for (var i = 0; i < N; i++) {
        var f = (i - (N - 1) / 2) / ((N - 1) / 2); // -1..1
        var dx = shift * f;
        var rotYf = smx * 14 * f;                   // fatias viram em 3D
        var tyf = Math.sin(t * 0.8 + f) * 1.6;      // micro-ondulação viva
        st.slices[i].style.transform =
          'translateX(' + dx.toFixed(2) + 'px) ' +
          'translateY(' + tyf.toFixed(2) + 'px) ' +
          'rotateY(' + rotYf.toFixed(2) + 'deg)';
      }

      // reflexo acompanha (parallax)
      if (st.reflect) {
        st.reflect.style.transform = 'scaleY(-1) translateX(' + (smx * -10).toFixed(2) + 'px)';
        st.reflect.style.opacity = (0.13 + Math.abs(smx) * 0.08).toFixed(2);
      }
    });

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
