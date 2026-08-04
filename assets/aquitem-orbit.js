/* AQUITEM Orbit — WebGL progressivo. O layout continua premium sem WebGL. */
(function () {
  'use strict';
  var host = document.getElementById('aquitemOrbit');
  if (!host || !window.THREE || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  try {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.35, 7.2);
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    host.appendChild(renderer.domElement);
    host.classList.add('is-webgl');

    var group = new THREE.Group(); scene.add(group);
    var gold = new THREE.MeshStandardMaterial({ color: 0xD9AA42, metalness: 0.76, roughness: 0.27 });
    var ice = new THREE.MeshStandardMaterial({ color: 0xEAF2FC, metalness: 0.5, roughness: 0.24 });
    var deep = new THREE.MeshStandardMaterial({ color: 0x0C2245, metalness: 0.1, roughness: 0.5, transparent: true, opacity: 0.98 });
    var ring = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.09, 16, 88), gold); ring.rotation.x = 0.25; group.add(ring);
    var core = new THREE.Mesh(new THREE.CircleGeometry(1.82, 80), deep); core.position.z = -0.08; group.add(core);
    var pin = new THREE.Mesh(new THREE.ConeGeometry(0.22, 2.9, 4), gold); pin.rotation.z = Math.PI; pin.position.y = -0.5; pin.scale.x = 4.2; pin.rotation.y = Math.PI / 4; group.add(pin);
    // Letter A built from three clean 3D strokes.
    function stroke(x, y, length, angle, material) { var m = new THREE.Mesh(new THREE.BoxGeometry(0.13, length, 0.14), material); m.position.set(x,y,0.28); m.rotation.z = angle; group.add(m); }
    stroke(-0.55, 0, 2.1, -0.38, ice); stroke(0.55, 0, 2.1, 0.38, ice); stroke(0, -0.1, 1.02, Math.PI/2, gold);
    var dot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), gold); dot.position.set(0,1.08,0.33); group.add(dot);
    scene.add(new THREE.AmbientLight(0xFFFFFF, 1.7));
    var key = new THREE.PointLight(0xFFE0A0, 2.3, 20); key.position.set(2.5,3.6,4); scene.add(key);
    var fill = new THREE.PointLight(0x759DD0, 1.5, 15); fill.position.set(-3,-1,3); scene.add(fill);
    var mouseX = 0, mouseY = 0;
    host.addEventListener('pointermove', function(e){ var r=host.getBoundingClientRect(); mouseX=((e.clientX-r.left)/r.width-.5)*.55; mouseY=((e.clientY-r.top)/r.height-.5)*.22; });
    host.addEventListener('pointerleave', function(){ mouseX=0;mouseY=0; });
    function resize(){ var w=host.clientWidth,h=host.clientHeight; if(!w||!h)return; camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false); }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(host); else window.addEventListener('resize',resize); resize();
    var start=performance.now();
    function frame(now){ var t=(now-start)*.001; group.rotation.y += (mouseX-group.rotation.y)*.035; group.rotation.x += (mouseY-group.rotation.x)*.03; ring.rotation.z=t*.16; dot.position.y=1.08+Math.sin(t*1.5)*.055; renderer.render(scene,camera); requestAnimationFrame(frame); }
    requestAnimationFrame(frame);
  } catch (e) { host.classList.remove('is-webgl'); }
})();
