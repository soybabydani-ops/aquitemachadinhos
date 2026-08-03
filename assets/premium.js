// premium.js — Aqui Tem Achadinhos (externo por causa da CSP)
// v11: RELEVO 3D REAL (depth displacement) + galope + parallax + tilt + WebXR

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
   2) SCROLL CHOREOGRAPHY (cenas do topo) — drive o 3D
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
    if (window.__bull3d) window.__bull3d.setScroll(p, smx, smy);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  renderTop(0);
})();

/* ============================================================
   3) TOURO — RELEVO 3D REAL (Three.js/WebGL)
      • malha deformada por mapa de profundidade (relevo de verdade)
      • galope furioso bem visível + investidas
      • parallax: câmera cinematográfica guiada pelo scroll
      • 3D tilt: câmera/grupo seguem o mouse
      • partículas douradas em 3D + reflexo no chão
      • WebXR (Realidade Aumentada) se o aparelho suportar
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
  var camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.15, 6.4);
  camera.lookAt(0, 0.05, 0);

  /* ---------- LUZES ---------- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0x0B1E3F, 0.75));
  var key = new THREE.DirectionalLight(0xF0C24B, 2.6);
  key.position.set(4, 5, 4); scene.add(key);
  var rim = new THREE.DirectionalLight(0xE63946, 1.8);
  rim.position.set(-5, 2, -4); scene.add(rim);
  var fill = new THREE.DirectionalLight(0x9fb8e8, 0.9);
  fill.position.set(0, 1, -5); scene.add(fill);
  var goldPoint = new THREE.PointLight(0xFFD97A, 1.2, 8);
  goldPoint.position.set(1.5, 2.5, 2); scene.add(goldPoint);

  /* ---------- CHÃO com reflexo (espelhado, estilo anamórfico) ---------- */
  var floor = new THREE.Mesh(
    new THREE.CircleGeometry(8, 48),
    new THREE.MeshPhysicalMaterial({ color: 0x0a1a36, metalness: 0.85, roughness: 0.28, clearcoat: 0.7 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.42;
  floor.receiveShadow = true;
  scene.add(floor);

  /* ---------- GRUPO DO TOURO ---------- */
  var bull = new THREE.Group();
  scene.add(bull);

  var W = 4.6, H = W * (622 / 1069);

  /* carrega o depth map ANTES de montar a malha (robusto) */
  function loadDepth(cb) {
    var img = new Image();
    img.onload = function () {
      try {
        var c = document.createElement('canvas');
        c.width = img.width; c.height = img.height;
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        cb(ctx.getImageData(0, 0, c.width, c.height));
      } catch (e) { cb(null); }
    };
    img.onerror = function () { cb(null); };
    img.src = 'assets/bull-depth.webp';
  }

  loadDepth(function (depthData) {
    var segX = 130, segY = 76;
    var geo = new THREE.PlaneGeometry(W, H, segX, segY);
    var pos = geo.attributes.position;

    if (depthData) {
      var dw = depthData.width, dh = depthData.height, dd = depthData.data;
      var maxZ = 0.92;
      for (var i = 0; i < pos.count; i++) {
        var u = pos.getX(i) / W + 0.5;
        var v = 1 - (pos.getY(i) / H + 0.5);
        var px = Math.min(dw - 1, Math.max(0, Math.round(u * (dw - 1))));
        var py = Math.min(dh - 1, Math.max(0, Math.round(v * (dh - 1))));
        var d = dd[(py * dw + px) * 4] / 255;
        pos.setZ(i, (d - 0.35) * maxZ * 2.2);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    new THREE.TextureLoader().load('assets/bull-3d.webp', function (tex) {
      tex.encoding = THREE.sRGBEncoding;
      var mat = new THREE.MeshStandardMaterial({
        map: tex, transparent: true, alphaTest: 0.06,
        roughness: 0.42, metalness: 0.28,
        side: THREE.DoubleSide, depthWrite: false
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      bull.add(mesh);
    });
  });

  /* ---------- PARTÍCULAS DOURADAS 3D ---------- */
  var N = 300;
  var pPos = new Float32Array(N * 3);
  var pVel = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 13;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    pVel[i] = 0.12 + Math.random() * 0.5;
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  var pMat = new THREE.PointsMaterial({
    color: 0xFFD97A, size: 0.075, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  var points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  /* ---------- ESTADO ---------- */
  var t = 0, scroll = 0, smx = 0, smy = 0;
  var chargePhase = Math.random() * 10;

  window.__bull3d = {
    setScroll: function (p, x, y) { scroll = p; smx = x; smy = y; },
    getBull: function () { return bull; },
    getCamera: function () { return camera; }
  };

  /* ===== GALOPE FURIOSO (amplitudes grandes e visíveis) ===== */
  function frame() {
    requestAnimationFrame(frame);
    t += 0.016;

    /* investida furiosa a cada ~6s */
    var charge = Math.pow(Math.max(0, Math.sin(t * 1.6 + chargePhase)), 20);

    /* galope FURIOSO: coices grandes e visíveis */
    var gallop = Math.sin(t * 6.6);
    var buck = Math.sin(t * 2.1) * 0.38; // coices grandes e lentos
    bull.rotation.x = gallop * 0.22 + buck * 0.85 + charge * 0.95 + smy * 0.2;
    bull.rotation.z = Math.sin(t * 5.5) * 0.12 + Math.sin(t * 1.8) * 0.07;
    bull.rotation.y = Math.sin(t * 0.9) * 0.3 + smx * 0.45 + charge * 0.4;

    bull.position.y = Math.abs(gallop) * 0.5 + Math.sin(t * 1.6) * 0.1 + charge * 0.55 + smy * -0.25;
    bull.position.z = charge * 1.6;
    bull.position.x = smx * 0.3;

    bull.scale.setScalar(1 + Math.sin(t * 1.6) * 0.012 + charge * 0.2);

    /* partículas sobem em 3D */
    var arr = pGeo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      arr[i * 3 + 1] += pVel[i] * 0.016;
      if (arr[i * 3 + 1] > 3.8) {
        arr[i * 3 + 1] = -3.8;
        arr[i * 3] = (Math.random() - 0.5) * 13;
      }
    }
    pGeo.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.035;

    /* ===== PARALLAX DA CÂMERA (cinematográfica, guiada pelo scroll) ===== */
    var zoom = 0;
    if (scroll > 0.42 && scroll < 0.78) {
      zoom = scroll < 0.55 ? (scroll - 0.42) / 0.13 : (scroll > 0.65 ? (0.78 - scroll) / 0.13 : 1);
      zoom = Math.max(0, Math.min(1, zoom));
    }
    /* câmera: orbita suave (autônoma) + segue o mouse (tilt 3D) + scroll */
    var camAngle = Math.sin(t * 0.13) * 0.5;            // órbita lenta automática
    var camX = Math.sin(camAngle) * 0.9 + smx * 1.25;
    var camY = 0.15 - smy * 0.85 + zoom * 0.55;
    var camZ = 6.4 - zoom * 3.4 + Math.cos(camAngle) * 0.35;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(smx * 0.35, 0.05 + zoom * 0.7 - smy * 0.3, 0);

    renderer.render(scene, camera);
  }

  /* ---------- WebXR (Realidade Aumentada) — só se o aparelho suportar ---------- */
  var arBtn = document.getElementById('arBtn');
  if (arBtn && navigator.xr) {
    if (navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported('immersive-ar').then(function (ok) {
        if (ok) arBtn.classList.remove('ar-hidden'), arBtn.classList.add('ar-visible');
      }).catch(function () {});
    }
    arBtn.addEventListener('click', function () {
      try {
        renderer.xr.enabled = true;
        navigator.xr.requestSession('immersive-ar', { optionalFeatures: ['local-floor', 'dom-overlay'] })
          .then(function (session) {
            renderer.xr.setSession(session);
            bull.position.set(0, 0.5, -1.5);
            bull.scale.setScalar(0.9);
          }).catch(function () { arBtn.classList.add('ar-hidden'); });
      } catch (e) {}
    });
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
