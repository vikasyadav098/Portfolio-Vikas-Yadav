import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

/**
 * Hero3DCanvas Component
 * Interactive 3D WebGL scene with floating metallic geometric solids,
 * reflective glass materials, and mouse-tracked camera rotation.
 */
export default function Hero3DCanvas() {
  const mountRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0xfff0d0 : 0xffffff, 
      theme === 'dark' ? 0.9 : 1.2
    );
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(
      theme === 'dark' ? 0xd5a26a : 0x9e7b56, 
      2.5
    );
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(
      theme === 'dark' ? 0xfef08a : 0xd5c3a3, 
      1.5
    );
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // 5. 3D Geometric Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // Material 1: Metallic Golden Ochre
    const metallicMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xd5a26a : 0x9e7b56,
      metalness: 0.8,
      roughness: 0.2,
    });

    // Material 2: Glass/Wireframe Accent
    const glassMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xfef08a : 0x836342,
      metalness: 0.3,
      roughness: 0.1,
      wireframe: true,
    });

    // Object A: Central Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(2.2, 0.65, 120, 16);
    const knotMesh = new THREE.Mesh(knotGeo, metallicMat);
    knotMesh.position.set(0, 0, 0);
    group.add(knotMesh);

    // Object B: Orbiting Octahedron
    const octGeo = new THREE.OctahedronGeometry(1.4, 0);
    const octMesh = new THREE.Mesh(octGeo, glassMat);
    octMesh.position.set(5.5, 2.5, -2);
    group.add(octMesh);

    // Object C: Orbiting Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const icoMesh = new THREE.Mesh(icoGeo, metallicMat);
    icoMesh.position.set(-5.5, -2, -1);
    group.add(icoMesh);

    // Object D: Floating Micro Orbs Cluster
    const orbCount = 16;
    const orbGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const orbGroup = new THREE.Group();
    for (let i = 0; i < orbCount; i++) {
      const orbMesh = new THREE.Mesh(orbGeo, metallicMat);
      const angle = (i / orbCount) * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      orbMesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 4
      );
      orbGroup.add(orbMesh);
    }
    group.add(orbGroup);

    // 6. Mouse Interaction Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId;
    const animate = () => {
      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate group & camera smoothly
      group.rotation.x = mouse.y * 0.4;
      group.rotation.y = mouse.x * 0.5;

      knotMesh.rotation.x += 0.008;
      knotMesh.rotation.y += 0.012;

      octMesh.rotation.x -= 0.01;
      octMesh.rotation.y += 0.015;

      icoMesh.rotation.x += 0.012;

      orbGroup.rotation.z += 0.003;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[350px] lg:min-h-[500px] pointer-events-none"
    />
  );
}
