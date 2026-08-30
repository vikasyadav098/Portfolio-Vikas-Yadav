import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Scroll3DEffect Component
 * Renders an insane 3D WebGL fly-through tunnel environment
 * with 3D glowing wireframe grid rings, particle warp waves, and 3D depth geometry.
 */
export default function Scroll3DEffect() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = (container.width = window.innerWidth);
    let height = (container.height = window.innerHeight);

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 50;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff0d0, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd5a26a, 3, 100);
    pointLight.position.set(0, 0, 40);
    scene.add(pointLight);

    // 5. 3D Tunnel Grid Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd5a26a,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const ringCount = 18;
    const ringMeshes = [];

    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(12 + (i % 3) * 2, 0.08, 8, 36);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.z = -i * 12;
      ringMesh.rotation.z = (i / ringCount) * Math.PI;
      ringGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    }

    // 6. 3D Warp Speed Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 80;
      particlePositions[i + 2] = (Math.random() - 0.5) * 120;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd5a26a,
      size: 0.4,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Scroll Tracking for Insane 3D Fly-Through Speed
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.08;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = container.width = window.innerWidth;
      height = container.height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 8. Render Loop
    let animationFrameId;
    const animate = () => {
      // Decay scroll velocity smoothly
      scrollVelocity *= 0.92;

      // Camera 3D fly-through depth motion based on scroll
      camera.position.z = 50 - (window.scrollY * 0.02) % 120;
      camera.rotation.z = window.scrollY * 0.0005;

      // Ring rotation
      ringMeshes.forEach((ring, idx) => {
        ring.rotation.z += 0.002 + (idx * 0.0002) + scrollVelocity * 0.01;
      });

      // Warp speed particles
      const positions = particleGeo.attributes.position.array;
      for (let i = 2; i < particleCount * 3; i += 3) {
        positions[i] += 0.15 + Math.abs(scrollVelocity) * 0.5;
        if (positions[i] > 60) {
          positions[i] = -120;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
