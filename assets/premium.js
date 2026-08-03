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
// TOURO 3D REAL — profundidade verdadeira + movimento orgânico
// ============================================================
(function () {
  var scenes = document.querySelectorAll('.bull3d');
  if (!scenes.length) return;

  // estado do mouse (normalizado -1..1)
  var mx = 0, my = 0, smx = 0, smy = 0;
  var fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (fine) {
    document.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }

  // poeira dourada
  scenes.forEach(function (sc) {
    var dustBox = sc.querySelector('.b3d-dust');
    if (!dustBox) return;
    for (var i = 0; i < 22; i++) {
      var d = document.createElement('span');
      d.className = 'dust';
      var s = 3 + Math.random() * 7;
      d.style.width = s + 'px';
      d.style.height = s + 'px';
      d.style.left = (6 + Math.random() * 88) + '%';
      d.style.top = (30 + Math.random() * 55) + '%';
      d.style.setProperty('--dx', ((Math.random() - 0.5) * 80).toFixed(0) + 'px');
      d.style.animationDuration = (4 + Math.random() * 6).toFixed(1) + 's';
      d.style.animationDelay = (Math.random() * 8).toFixed(1) + 's';
      dustBox.appendChild(d);
    }
  });

  var t = 0;
  function frame() {
    t += 0.016;
    // suaviza o mouse
    smx += (mx - smx) * 0.05;
    smy += (my - smy) * 0.05;

    scenes.forEach(function (sc) {
      var scene = sc.querySelector('.b3d-scene');
      var img = sc.querySelector('.b3d-img');
      var reflect = sc.querySelector('.b3d-reflect');
      if (!scene || !img) return;

      // ---- movimento ORGÂNICO (não é pulo de sprite) ----
      // respiração: escala sutil 1.0 -> 1.018
      var breath = 1 + Math.sin(t * 1.6) * 0.009;
      // balanço suave do corpo (como um touro parado, vivo)
      var swayX = Math.sin(t * 0.9) * 0.9;
      var swayZ = Math.sin(t * 0.7 + 1.2) * 0.5;
      // micro-sacudida da cabeça (frequência mais alta, amplitude mínima)
      var shake = Math.sin(t * 5.2) * 0.16 + Math.sin(t * 11.7) * 0.08;
      // ocasional "investida" de verdade — a cada ~9s um pulso de avanço
      var charge = Math.pow(Math.max(0, Math.sin(t * 0.7 + 2.0)), 24);
      var chargeZ = charge * 34;   // avança em Z (vem para a tela)
      var chargeRot = charge * -3; // abaixa a cabeça ao investir

      // ---- câmera segue o mouse (efeito 8D) ----
      var camY = smy * 9;
      var camX = smx * 11;

      // transform 3D real: rotateX/rotateY + translateZ + translateY
      img.style.transform =
        'translateZ(' + chargeZ.toFixed(2) + 'px) ' +
        'translateY(' + (breath - 1) * -40 + 'px) ' +
        'scale(' + breath.toFixed(4) + ') ' +
        'rotateY(' + (swayX + camX + shake).toFixed(3) + 'deg) ' +
        'rotateX(' + (swayZ + camY + chargeRot).toFixed(3) + 'deg)';

      // cenário acompanha levemente (parallax do reflexo)
      if (reflect) {
        reflect.style.transform = 'scaleY(-1) translateX(' + (smx * -8).toFixed(2) + 'px)';
      }
    });

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
