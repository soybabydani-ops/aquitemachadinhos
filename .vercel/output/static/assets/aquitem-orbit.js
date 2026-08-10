/* AQUITEM Orbit — WebGL desktop progressivo. Mobile sempre usa arte estática. */
(function () {
  'use strict';
  var host = document.getElementById('aquitemOrbit');
  if (!host || !window.THREE || window.innerWidth < 900 || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  try {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.1, 7.5);
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
    host.appendChild(renderer.domElement);
    host.parentElement.classList.add('webgl-ready');
    var group = new THREE.Group(); scene.add(group);
    var gold = new THREE.MeshStandardMaterial({ color: 0xD9AA42, metalness: 0.72, roughness: 0.31 });
    var ice = new THREE.MeshStandardMaterial({ color: 0xEAF2FC, metalness: 0.42, roughness: 0.27 });
    var deep = new THREE.MeshStandardMaterial({ color: 0x0C2245, metalness: 0.08, roughness: 0.58, transparent: true, opacity: 0.98 });
    var ring = new THREE.Mesh(new THREE.TorusGeometry(2.04, 0.075, 16, 88), gold); ring.rotation.x = 0.18; group.add(ring);
    var core = new THREE.Mesh(new THREE.CircleGeometry(1.83, 80), deep); core.position.z = -0.08; group.add(core);
    // The official A is built from clean 3D strokes, avoiding heavy geometry.
    function stroke(x, y, length, angle, material) { var m = new THREE.Mesh(new THREE.BoxGeometry(0.12, length, 0.13), material); m.position.set(x,y,0.24); m.rotation.z = angle; group.add(m); }
    stroke(-0.56, -0.02, 2.08, -0.38, ice); stroke(0.56, -0.02, 2.08, 0.38, ice); stroke(0, -0.12, 1.04, Math.PI / 2, gold);
    var dot = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 24), gold); dot.position.set(0,1.07,0.30); group.add(dot);
    scene.add(new THREE.AmbientLight(0xFFFFFF, 1.55));
    var key = new THREE.PointLight(0xFFE0A0, 2.1, 20); key.position.set(2.5,3.6,4); scene.add(key);
    var fill = new THREE.PointLight(0x769FD4, 1.35, 15); fill.position.set(-3,-1,3); scene.add(fill);
    var mx = 0, my = 0;
    host.addEventListener('pointermove', function(e){ var r=host.getBoundingClientRect(); mx=((e.clientX-r.left)/r.width-.5)*.45; my=((e.clientY-r.top)/r.height-.5)*.16; }, { passive:true });
    host.addEventListener('pointerleave', function(){ mx=0;my=0; });
    function resize(){ var w=host.clientWidth,h=host.clientHeight; if(!w||!h)return; camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false); }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(host); else window.addEventListener('resize',resize); resize();
    var started=performance.now();
    function frame(now){ var t=(now-started)*.001; group.rotation.y += (mx-group.rotation.y)*.035; group.rotation.x += (my-group.rotation.x)*.03; ring.rotation.z=t*.13; dot.position.y=1.07+Math.sin(t*1.5)*.045; renderer.render(scene,camera); requestAnimationFrame(frame); }
    requestAnimationFrame(frame);
  } catch (e) { if (host.parentElement) host.parentElement.classList.remove('webgl-ready'); }
})();
