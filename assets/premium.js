// premium.js — Aqui Tem Achadinhos (externo por causa da CSP)
// v10: Reveal + cenas de scroll + TOURO 3D com a imagem premium (WebGL)

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
  var SCALE = [0.8, 1.08, 1.28, 1.1, 0.95];
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
    if (window.__bull3d) window.__bull3d.setScroll(p, smx, smy);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  renderTop(0);
})();

/* ============================================================
   3) TOURO 3D — imagem premium em ambiente WebGL 3D de verdade
      (textura alpha, partículas douradas 3D, reflexo no chão,
       câmera que orbita com o mouse e dá zoom no scroll)
   ============================================================ */
(function () {
  var canvas = document.getElementById('bull3d');
  if (!canvas || typeof THREE === 'undefined') return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);
  camera.lookAt(0, 0, 0);

  /* --- luzes para as partículas e o ambiente --- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0x0B1E3F, 0.7));
  var gold = new THREE.PointLight(0xF0C24B, 2.2, 12);
  gold.position.set(2.5, 3, 3);
  scene.add(gold);
  var red = new THREE.PointLight(0xE63946, 1.4, 12);
  red.position.set(-3, 1, -3);
  scene.add(red);

  /* --- O TOURO (a imagem premium como objeto 3D) --- */
  var bullGroup = new THREE.Group();
  scene.add(bullGroup);

  new THREE.TextureLoader().load('assets/bull-3d.webp', function (tex) {
    tex.encoding = THREE.sRGBEncoding;
    var mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, alphaTest: 0.05, depthWrite: false, side: THREE.DoubleSide
    });
    var w = 4.4, h = w * (622 / 1069); // proporção da imagem recortada
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    bullGroup.add(mesh);

    /* reflexo no chão (cópia espelhada, esmaecida) */
    var refMat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, opacity: 0.16, alphaTest: 0.05,
      depthWrite: false, side: THREE.DoubleSide
    });
    var ref = new THREE.Mesh(new THREE.PlaneGeometry(w, h), refMat);
    ref.rotation.x = Math.PI;
    ref.position.y = -h / 2 - 0.22;
    ref.scale.y = -1;
    bullGroup.add(ref);
  });

  /* --- partículas douradas em 3D --- */
  var N = 260;
  var pos = new Float32Array(N * 3);
  var vel = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    vel[i] = 0.15 + Math.random() * 0.5;
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var pm = new THREE.PointsMaterial({
    color: 0xFFD97A, size: 0.07, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  var points = new THREE.Points(geo, pm);
  scene.add(points);

  /* --- chão com reflexo suave --- */
  var floor = new THREE.Mesh(
    new THREE.CircleGeometry(7, 48),
    new THREE.MeshBasicMaterial({ color: 0x0a1a36, transparent: true, opacity: 0.85 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -h_floor();
  scene.add(floor);

  function h_floor() { return -(622 / 1069) * 4.4 / 2 - 0.22; }

  /* --- estado --- */
  var t = 0, scroll = 0, smx = 0, smy = 0;
  window.__bull3d = {
    setScroll: function (p, x, y) { scroll = p; smx = x; smy = y; },
    getBull: function () { return bullGroup; },
    getCamera: function () { return camera; }
  };

  function frame() {
    requestAnimationFrame(frame);
    t += 0.016;

    /* touro: levita com respiração + balanço 3D + investida furiosa */
    var charge = Math.pow(Math.max(0, Math.sin(t * 0.9 + 1.2)), 22);
    bullGroup.position.y = Math.sin(t * 1.5) * 0.06 + charge * 0.1;
    bullGroup.position.z = charge * 0.5;
    bullGroup.rotation.y = Math.sin(t * 0.8) * 0.05 + smx * 0.35 + charge * 0.25;
    bullGroup.rotation.x = Math.sin(t * 1.1) * 0.03 + smy * 0.2 - charge * 0.2;
    bullGroup.rotation.z = Math.sin(t * 0.7) * 0.015;
    bullGroup.scale.setScalar(1 + Math.sin(t * 1.4) * 0.008 + charge * 0.12);

    /* partículas sobem em 3D */
    var pArr = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      pArr[i * 3 + 1] += vel[i] * 0.016;
      if (pArr[i * 3 + 1] > 3.6) {
        pArr[i * 3 + 1] = -3.6;
        pArr[i * 3] = (Math.random() - 0.5) * 12;
      }
    }
    geo.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.03;

    /* câmera: orbita com o mouse + zoom no scroll */
    var zoom = 0;
    if (scroll > 0.42 && scroll < 0.78) {
      zoom = scroll < 0.55 ? (scroll - 0.42) / 0.13 : (scroll > 0.65 ? (0.78 - scroll) / 0.13 : 1);
      zoom = Math.max(0, Math.min(1, zoom));
    }
    camera.position.x = smx * 1.1;
    camera.position.y = -smy * 0.7;
    camera.position.z = 6.2 - zoom * 3.0;
    camera.lookAt(smx * 0.3, -smy * 0.2 + zoom * 0.4, 0);

    renderer.render(scene, camera);
  }

  function resize() {
    var w = canvas.clientWidth || 600;
    var h = canvas.clientHeight || (w * 610 / 883);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();
  frame();
})();
