'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidParticleBlob() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
    camera.position.z = 6.4;
    const count = window.innerWidth < 600 ? 4500 : 8500;
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + .5) / count);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      const radius = 1.45 + .09 * Math.sin(theta * 3) * Math.sin(phi * 4);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      color.setHSL(.61 + .105 * (positions[i * 3 + 1] / 3 + .5), .48, .44 + .11 * Math.sin(theta));
      colors[i * 3] = color.r; colors[i * 3 + 1] = color.g; colors[i * 3 + 2] = color.b;
    }
    originals.set(positions);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: .014, vertexColors: true, transparent: true, opacity: .76, depthWrite: false });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    const resize = () => { const {width, height} = mount.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); renderer.render(scene, camera); };
    const observer = new ResizeObserver(resize); observer.observe(mount); resize();
    let pointerX = 0, pointerY = 0;
    const pointer = (event) => { const rect = mount.getBoundingClientRect(); pointerX = (event.clientX - rect.left) / rect.width - .5; pointerY = (event.clientY - rect.top) / rect.height - .5; };
    const leave = () => { pointerX = 0; pointerY = 0; };
    mount.addEventListener('pointermove', pointer); mount.addEventListener('pointerleave', leave);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    let visible = true; visibility.observe(mount);
    let frame;
    const animate = (milliseconds) => {
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      const time = motion.matches ? 0 : milliseconds * .00025;
      points.rotation.y = time + pointerX * .3;
      points.rotation.z = -.2 + pointerY * .12;
      if (!motion.matches) {
        for (let i = 0; i < count; i++) {
          const offset = i * 3;
          const wave = 1 + .045 * Math.sin(originals[offset + 1] * 3 + time * 3) + .025 * Math.cos(originals[offset] * 4 + time * 2);
          positions[offset] = originals[offset] * wave; positions[offset + 1] = originals[offset + 1] * wave; positions[offset + 2] = originals[offset + 2] * wave;
        }
        geometry.attributes.position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); mount.removeEventListener('pointermove', pointer); mount.removeEventListener('pointerleave', leave); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={mountRef} className="particle-mount" aria-hidden="true" />;
}
