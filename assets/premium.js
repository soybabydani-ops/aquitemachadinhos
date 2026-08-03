// premium.js — Aqui Tem Achadinhos (externo por causa da CSP)
// v9: Reveal + Coreografia de scroll (cenas) + TOURO 3D REAL (Three.js/WebGL)

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
   2) SCROLL CHOREOGRAPHY (cenas do topo) — controla o 3D
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
  var SCALE = [0.8, 1.08, 1.3, 1.1, 0.95];
  var ROTY = [0, 16, 34, 10, 0];
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
    if (stage) stage.style.transform =
      'translateY(' + ty.toFixed(2) + 'px) ' +
      'scale(' + scale.toFixed(4) + ') ' +
      'rotateY(' + (rotY + smx * 6).toFixed(2) + 'deg) ' +
      'rotateX(' + (smy * 4).toFixed(2) + 'deg)';
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
    // repassa o progresso para o touro 3D (zoom da câmera na cena 2)
    if (window.__bull3d) window.__bull3d.setScroll(p, smx, smy);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  renderTop(0);
})();

/* ============================================================
   3) TOURO 3D REAL — Three.js (WebGL) — um touro de verdade
   ============================================================ */
(function () {
  var wrap = document.getElementById('bull3d');
  if (!wrap || typeof THREE === 'undefined') return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: wrap, alpha: true, antialias: true, preserveDrawingBuffer: true });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 1.7, 6.4);
  camera.lookAt(0, 1.25, 0);

  /* ---------- LUZES (estúdio premium) ---------- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0x0B1E3F, 0.55));

  var key = new THREE.DirectionalLight(0xF0C24B, 2.4);
  key.position.set(4, 6, 3.5); key.castShadow = true; scene.add(key);

  var rim = new THREE.DirectionalLight(0xE63946, 1.6);
  rim.position.set(-5, 2.5, -4); scene.add(rim);

  var fill = new THREE.DirectionalLight(0x9fb8e8, 0.8);
  fill.position.set(0, 1.5, -6); scene.add(fill);

  var headLight = new THREE.PointLight(0xFFD97A, 0.7, 10);
  headLight.position.set(0, 3.4, 1.2); scene.add(headLight);

  /* ---------- MATERIAIS ---------- */
  var bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x16294d, metalness: 0.55, roughness: 0.32,
    clearcoat: 0.85, clearcoatRoughness: 0.25
  });
  var hornMat = new THREE.MeshPhysicalMaterial({
    color: 0xF0C24B, metalness: 0.9, roughness: 0.18,
    clearcoat: 1.0, clearcoatRoughness: 0.15
  });
  var hoofMat = new THREE.MeshStandardMaterial({ color: 0x141c2c, metalness: 0.4, roughness: 0.5 });
  var eyeWhite = new THREE.MeshStandardMaterial({ color: 0xf5f0e0, roughness: 0.2 });
  var eyePupil = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.1 });

  /* ---------- GRUPO DO TOURO ---------- */
  var bull = new THREE.Group();
  scene.add(bull);

  function part(geo, mat, x, y, z, rx, ry, rz, parent) {
    var m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    if (rx) m.rotation.x = rx;
    if (ry) m.rotation.y = ry;
    if (rz) m.rotation.z = rz;
    m.castShadow = true;
    (parent || bull).add(m);
    return m;
  }

  // corpo
  var body = part(new THREE.SphereGeometry(1, 32, 32), bodyMat, 0, 1.28, 0, 0, 0, 0);
  body.scale.set(1.12, 0.82, 1.65);
  // peito / dianteira
  var chest = part(new THREE.SphereGeometry(0.72, 24, 24), bodyMat, 0, 1.32, 1.02, 0, 0, 0);
  chest.scale.set(0.95, 0.85, 0.75);
  // garupa
  var rump = part(new THREE.SphereGeometry(0.8, 24, 24), bodyMat, 0, 1.3, -1.1, 0, 0, 0);
  rump.scale.set(0.9, 0.8, 0.85);

  // pescoço (capsule) + cabeça
  var neck = part(new THREE.CapsuleGeometry(0.42, 0.85, 6, 18), bodyMat, 0.05, 1.95, 1.05, -0.75, 0, 0);
  var head = new THREE.Group(); head.position.set(0.08, 2.55, 1.72); bull.add(head);
  var skull = new THREE.Mesh(new THREE.SphereGeometry(0.5, 28, 28), bodyMat);
  skull.scale.set(0.9, 0.78, 1.05); skull.castShadow = true; head.add(skull);
  var muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 20), bodyMat);
  muzzle.position.set(0, -0.12, 0.42); muzzle.scale.set(1.15, 0.85, 1.1); muzzle.castShadow = true; head.add(muzzle);
  var nose = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.1, 16), hoofMat);
  nose.rotation.x = Math.PI / 2; nose.position.set(0, -0.18, 0.62); head.add(nose);

  // chifres dourados (torus curvos)
  function horn(side) {
    var h = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.075, 10, 22, Math.PI * 1.15), hornMat);
    h.rotation.x = Math.PI / 2;
    h.rotation.z = side * -0.35;
    h.position.set(side * 0.42, 0.28, -0.28);
    h.castShadow = true;
    head.add(h);
  }
  horn(1); horn(-1);

  // orelhas
  function ear(side) {
    var e = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 10), bodyMat);
    e.position.set(side * 0.45, 0.14, -0.05);
    e.rotation.z = side * 0.5;
    head.add(e);
  }
  ear(1); ear(-1);

  // olhos
  [1, -1].forEach(function (s) {
    var w = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), eyeWhite);
    w.position.set(s * 0.34, 0.06, 0.38); head.add(w);
    var p = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), eyePupil);
    p.position.set(s * 0.37, 0.06, 0.44); head.add(p);
  });

  // cauda (pivot na garupa, com movimento)
  var tailPivot = new THREE.Group(); tailPivot.position.set(0, 1.75, -1.72); bull.add(tailPivot);
  var tail = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.02, 0.9, 8), bodyMat);
  tail.position.y = -0.45; tailPivot.add(tail);
  var tailTuft = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), hoofMat);
  tailTuft.position.y = -0.95; tailPivot.add(tailTuft);

  // pernas (pivôs nos ombros/quadris) — galope
  var legSpec = [
    { px: 0.62, py: 1.15, pz: 1.02, phase: 0, front: true },
    { px: -0.62, py: 1.15, pz: 1.02, phase: Math.PI, front: true },
    { px: 0.6, py: 1.2, pz: -1.05, phase: Math.PI * 0.5, front: false },
    { px: -0.6, py: 1.2, pz: -1.05, phase: Math.PI * 1.5, front: false }
  ];
  var legs = [];
  legSpec.forEach(function (ls) {
    var pivot = new THREE.Group();
    pivot.position.set(ls.px, ls.py, ls.pz);
    bull.add(pivot);
    var up = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.5, 5, 12), bodyMat);
    up.position.y = -0.42; up.castShadow = true; pivot.add(up);
    var low = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.45, 5, 12), bodyMat);
    low.position.y = -0.95; low.castShadow = true; pivot.add(low);
    var hoof = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.12, 5, 10), hoofMat);
    hoof.position.y = -1.32; hoof.castShadow = true; pivot.add(hoof);
    legs.push({ pivot: pivot, phase: ls.phase, front: ls.front, low: low });
  });

  /* ---------- CHÃO (reflexo + brilho dourado) ---------- */
  var floor = new THREE.Mesh(
    new THREE.CircleGeometry(9, 48),
    new THREE.MeshPhysicalMaterial({ color: 0x0a1a36, metalness: 0.75, roughness: 0.32, clearcoat: 0.6 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.02;
  floor.receiveShadow = true;
  scene.add(floor);

  var under = new THREE.PointLight(0xF0C24B, 1.6, 7);
  under.position.set(0, 0.4, 0);
  scene.add(under);

  /* ---------- ESTADO / ANIMAÇÃO ---------- */
  var t = 0, chargePhase = Math.random() * 10;
  var scroll = 0, smx = 0, smy = 0;

  function setScroll(p, mx, my) {
    scroll = p; smx = mx; smy = my;
  }
  window.__bull3d = { setScroll: setScroll, getBull: function () { return bull; }, getCamera: function () { return camera; } };

  function frame() {
    requestAnimationFrame(frame);
    t += 0.016;

    // ---- GALOPE FURIOSO ----
    var g = Math.sin(t * 9);
    legs.forEach(function (l) {
      var ang = Math.sin(t * 9 + l.phase) * 0.85;
      l.pivot.rotation.x = ang;
      // perna de baixo dobra um pouco
      l.low.rotation.x = Math.max(0, Math.sin(t * 9 + l.phase + 0.8)) * 0.5;
    });
    // corpo balança e respira
    body.position.y = 1.28 + Math.sin(t * 9) * 0.045 + Math.sin(t * 1.4) * 0.02;
    chest.position.y = 1.32 + Math.sin(t * 9) * 0.05 + Math.sin(t * 1.4) * 0.025;
    bull.rotation.x = Math.sin(t * 9) * 0.035;

    // ---- CABEÇA: chacoalha furiosa (intermitente) ----
    var shake = Math.pow(Math.max(0, Math.sin(t * 0.6 + 2)), 6);
    head.rotation.y = Math.sin(t * 14) * 0.22 * (0.35 + shake) + Math.sin(t * 2.1) * 0.08;
    head.rotation.x = Math.sin(t * 6) * 0.08 + Math.sin(t * 2.1) * 0.05 + (0.35 + shake) * 0.06;
    head.position.z = 1.72 + shake * 0.1;

    // ---- CAUDA ----
    tailPivot.rotation.x = Math.sin(t * 5) * 0.5 + 0.25;
    tailPivot.rotation.y = Math.sin(t * 3.4) * 0.35;

    // ---- INVESTIDA FURIOSA a cada ~7s ----
    var charge = Math.pow(Math.max(0, Math.sin(t * 0.9 + chargePhase)), 22);
    bull.position.z = charge * 1.35;
    bull.rotation.y = scroll * 0.9 + smx * 0.28 + Math.sin(t * 1.1) * 0.05;
    bull.rotation.x = -charge * 0.22 + smy * 0.12 + Math.sin(t * 9) * 0.03;
    bull.scale.setScalar(1 + charge * 0.14 + Math.sin(t * 1.4) * 0.008);

    // ---- CÂMERA: zoom no detalhe (chifres) na cena 2 do scroll ----
    var zoom = 0;
    if (scroll > 0.42 && scroll < 0.78) {
      zoom = scroll < 0.55 ? (scroll - 0.42) / 0.13 : (scroll > 0.65 ? (0.78 - scroll) / 0.13 : 1);
      zoom = Math.max(0, Math.min(1, zoom));
    }
    camera.position.z = 6.4 - zoom * 3.1;
    camera.position.y = 1.7 + zoom * 0.55;
    camera.lookAt(0, 1.25 + zoom * 0.85, 0);

    // luz do holofote acompanha a cabeça
    headLight.position.x = Math.sin(t * 2) * 0.3;

    renderer.render(scene, camera);
  }

  function resize() {
    var w = wrap.clientWidth || 600;
    var h = wrap.clientHeight || (w * 610 / 883);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();
  frame();
})();
