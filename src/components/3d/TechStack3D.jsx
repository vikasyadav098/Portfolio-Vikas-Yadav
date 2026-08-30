import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { portfolioData } from '../../data/portfolioData';

/**
 * Enhanced TechStack3D Component
 * Renders actual tech stack icons on 3D orbiting node billboards inside Three.js!
 * Supports 360° mouse/touch drag rotation.
 */
export default function TechStack3D() {
  const mountRef = useRef(null);
  const allSkills = portfolioData.skillsGrid.flatMap(g => g.skills);

  // Helper: Create a 2D Canvas texture featuring the skill name and icon emoji
  const createSkillTexture = (name) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Circular glowing badge background
    ctx.beginPath();
    ctx.arc(128, 128, 110, 0, Math.PI * 2);
    ctx.fillStyle = '#1C1A18';
    ctx.fill();
    ctx.strokeStyle = '#D5A26A';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Map tech name to icon emoji / emblem
    let emoji = '⚡';
    if (name.includes('React')) emoji = '⚛️';
    else if (name.includes('Node')) emoji = '🟢';
    else if (name.includes('Express')) emoji = '⚡';
    else if (name.includes('Mongo')) emoji = '🍃';
    else if (name.includes('n8n')) emoji = '🤖';
    else if (name.includes('OpenAI')) emoji = '🧠';
    else if (name.includes('Claude')) emoji = '🔮';
    else if (name.includes('Ollama')) emoji = '🦙';
    else if (name.includes('Docker')) emoji = '🐳';
    else if (name.includes('Git')) emoji = '🐙';
    else if (name.includes('Postman')) emoji = '🚀';
    else if (name.includes('Tailwind')) emoji = '🎨';
    else if (name.includes('JavaScript')) emoji = '💻';
    else if (name.includes('Responsive')) emoji = '📱';
    else if (name.includes('Auth')) emoji = '🛡️';

    // Draw Emoji Icon
    ctx.font = '70px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 128, 100);

    // Draw Skill Name Text
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FAF7F2';
    ctx.fillText(name.split(' ')[0], 128, 175);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd5a26a, 2.5);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    // 5. Constellation Group
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 6. Create 3D Nodes with Skill Textures
    const radius = 6.8;
    const count = allSkills.length;
    const lineGeoPoints = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Create 3D Billboard Sprite with Icon Texture
      const texture = createSkillTexture(allSkills[i].name);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(x, y, z);
      sprite.scale.set(1.6, 1.6, 1);
      constellationGroup.add(sprite);

      lineGeoPoints.push(new THREE.Vector3(x, y, z));
    }

    // 3D Connecting Orbit Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3d3834,
      transparent: true,
      opacity: 0.6,
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints(lineGeoPoints);
    const lineMesh = new THREE.LineLoop(lineGeo, lineMat);
    constellationGroup.add(lineMesh);

    // 7. Mouse/Touch Drag 360° Rotation Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      constellationGroup.rotation.y += deltaX * 0.005;
      constellationGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile 3D drag
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        constellationGroup.rotation.y += deltaX * 0.005;
        constellationGroup.rotation.x += deltaY * 0.005;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => { isDragging = false; };

    domEl.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // 8. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Render Loop
    let animationFrameId;
    const animate = () => {
      if (!isDragging) {
        constellationGroup.rotation.y += 0.003;
        constellationGroup.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full rounded-xl bg-[#1C1A18]/90 border border-[#3D3834] shadow-2xl overflow-hidden p-4">
      <div className="flex items-center justify-between px-4 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D5A26A] flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>3D Icon Galaxy (Drag to Rotate 360°)</span>
        </span>
        <span className="text-[11px] font-mono text-[#A0988E]">
          {allSkills.length} Interactive 3D Icons
        </span>
      </div>

      <div
        ref={mountRef}
        className="w-full h-[420px] cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
