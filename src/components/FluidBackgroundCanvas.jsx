import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function FluidBackgroundCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactive target
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color palettes for Light & Dark mode
    const isDark = theme === 'dark';
    
    // Mesh points
    const points = [];
    const rows = 12;
    const cols = 12;
    
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        points.push({
          x: (c / cols) * width,
          y: (r / rows) * height,
          baseX: (c / cols) * width,
          baseY: (r / rows) * height,
          vx: 0,
          vy: 0,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    let time = 0;

    const render = () => {
      time += 0.015;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Gradient background base
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (theme === 'dark') {
        bgGrad.addColorStop(0, '#121110');
        bgGrad.addColorStop(0.5, '#1A1816');
        bgGrad.addColorStop(1, '#151311');
      } else {
        bgGrad.addColorStop(0, '#FAF7F2');
        bgGrad.addColorStop(0.5, '#F5F0E6');
        bgGrad.addColorStop(1, '#FAF7F2');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render interactive fluid blobs
      ctx.save();
      ctx.filter = 'blur(60px)';

      const blobCount = 3;
      for (let i = 0; i < blobCount; i++) {
        const offset = (i * Math.PI * 2) / blobCount;
        const bx = mouse.x + Math.sin(time + offset) * (width * 0.25);
        const by = mouse.y + Math.cos(time * 0.8 + offset) * (height * 0.25);
        const radius = Math.min(width, height) * 0.35;

        const blobGrad = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
        if (theme === 'dark') {
          blobGrad.addColorStop(0, 'rgba(213, 162, 106, 0.12)');
          blobGrad.addColorStop(0.6, 'rgba(158, 123, 86, 0.06)');
          blobGrad.addColorStop(1, 'rgba(18, 17, 16, 0)');
        } else {
          blobGrad.addColorStop(0, 'rgba(158, 123, 86, 0.09)');
          blobGrad.addColorStop(0.6, 'rgba(213, 195, 163, 0.06)');
          blobGrad.addColorStop(1, 'rgba(250, 247, 242, 0)');
        }

        ctx.fillStyle = blobGrad;
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
