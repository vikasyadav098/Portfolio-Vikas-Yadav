import React, { useEffect, useRef, useState } from 'react';

/**
 * PaperTearCanvas Component
 * 
 * Executes a 60 FPS physical paper tearing transition.
 * Features:
 * - Elastic stretch pull phase
 * - Procedural Perlin-noise jagged tear path (never straight)
 * - Micro paper fiber strands along tear margin
 * - 3D rim edge thickness highlight & dynamic cast shadow
 * - Curling paper deformation physics
 * - Floating paper dust & fiber particles
 */
export default function PaperTearCanvas({ isTearing, onTearComplete, fromSection, toSection }) {
  const canvasRef = useRef(null);
  const [snapshotUrl, setSnapshotUrl] = useState(null);

  useEffect(() => {
    if (!isTearing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // High DPI scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Generate procedural irregular tear line along diagonal/vertical axis
    const generateTearPath = (startX, startY, endX, endY, roughness = 18, segments = 80) => {
      const points = [];
      const dx = (endX - startX) / segments;
      const dy = (endY - startY) / segments;
      
      // Perlin-like pseudo noise generator
      let seed = Math.random() * 100;
      const noise = (t) => {
        return (Math.sin(t * 7.4 + seed) * 0.4 + 
                Math.cos(t * 19.3 + seed * 2) * 0.35 + 
                Math.sin(t * 43.1 + seed * 3) * 0.25);
      };

      for (let i = 0; i <= segments; i++) {
        const progress = i / segments;
        // Taper noise near edges
        const factor = Math.sin(progress * Math.PI);
        const offset = noise(progress * 10) * roughness * factor;
        
        // Perpendicular offset vector
        const nx = -dy / Math.hypot(dx, dy);
        const ny = dx / Math.hypot(dx, dy);
        
        points.push({
          x: startX + dx * i + nx * offset,
          y: startY + dy * i + ny * offset,
          progress
        });
      }
      return points;
    };

    // Particles array (Paper dust & fibers)
    const particles = [];
    const createParticles = (tearPoints) => {
      tearPoints.forEach((p) => {
        if (Math.random() < 0.6) {
          particles.push({
            x: p.x + (Math.random() - 0.5) * 10,
            y: p.y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 4 + 2,
            vy: (Math.random() - 0.5) * 3 + 1,
            size: Math.random() * 3 + 1,
            length: Math.random() > 0.5 ? Math.random() * 8 + 3 : Math.random() * 2 + 1,
            angle: Math.random() * Math.PI * 2,
            vAngle: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.8 + 0.2,
            color: Math.random() > 0.3 ? '#FAF7F2' : '#D5C3A3'
          });
        }
      });
    };

    // Tear line setup (Top-Left to Bottom-Right split with organic curve)
    const startX = width * 0.15;
    const startY = -20;
    const endX = width * 0.85;
    const endY = height + 20;
    const tearPoints = generateTearPath(startX, startY, endX, endY);
    createParticles(tearPoints);

    let animationFrameId;
    let startTime = null;
    const duration = 1100; // ms total duration

    // Draw realistic paper fibers along tear edge
    const drawPaperFibers = (points, progress) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(250, 247, 242, 0.9)';
      ctx.lineWidth = 1.2;
      
      points.forEach((p) => {
        if (Math.random() < 0.7) {
          const fiberLen = Math.random() * 7 + 2;
          const angle = Math.random() * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(angle) * fiberLen, p.y + Math.sin(angle) * fiberLen);
          ctx.stroke();
        }
      });
      ctx.restore();
    };

    // Render physics loop
    const render = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, width, height);

      // Phase 1: Elastic stretch pull (0ms - 200ms)
      let stretchX = 0;
      let stretchY = 0;
      if (progress < 0.18) {
        const pullFactor = Math.sin((progress / 0.18) * Math.PI * 0.5);
        stretchX = Math.sin(pullFactor * 6) * 12;
        stretchY = Math.cos(pullFactor * 6) * 8;
      }

      // Phase 2: Rip separation progress (0.15 - 1.0)
      const ripProgress = Math.max(0, (progress - 0.15) / 0.85);
      const easeRip = Math.pow(ripProgress, 2.2); // Acceleration curve
      
      const leftShift = easeRip * (width * 0.6) + stretchX;
      const rightShift = easeRip * (width * 0.6) - stretchX;
      const curlAmount = Math.sin(ripProgress * Math.PI) * 45;
      const shadowAlpha = (1 - ripProgress) * 0.35;

      // -------------------------------------------------------------
      // DRAW LEFT TORN PIECE
      // -------------------------------------------------------------
      ctx.save();
      ctx.translate(-leftShift, stretchY + easeRip * 30);
      ctx.rotate(-easeRip * 0.08);

      // Cast shadow under torn edge
      ctx.save();
      ctx.shadowColor = 'rgba(44, 40, 37, 0.4)';
      ctx.shadowBlur = 24 + curlAmount;
      ctx.shadowOffsetX = 12 + curlAmount * 0.5;
      ctx.shadowOffsetY = 16 + curlAmount * 0.5;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      tearPoints.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = '#FAF7F2';
      ctx.fill();
      ctx.restore();

      // Paper Rim Bevel / Thickness Highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Paper Rim Dark Under-edge Shadow
      ctx.strokeStyle = 'rgba(110, 95, 80, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Micro fibers
      drawPaperFibers(tearPoints, progress);

      ctx.restore();

      // -------------------------------------------------------------
      // DRAW RIGHT TORN PIECE
      // -------------------------------------------------------------
      ctx.save();
      ctx.translate(rightShift, -stretchY - easeRip * 20);
      ctx.rotate(easeRip * 0.06);

      // Cast shadow
      ctx.save();
      ctx.shadowColor = 'rgba(44, 40, 37, 0.35)';
      ctx.shadowBlur = 20 + curlAmount;
      ctx.shadowOffsetX = -10 - curlAmount * 0.5;
      ctx.shadowOffsetY = 14 + curlAmount * 0.5;

      ctx.beginPath();
      ctx.moveTo(width, 0);
      tearPoints.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(width, height);
      ctx.closePath();

      ctx.fillStyle = '#F5F0E6';
      ctx.fill();
      ctx.restore();

      // Right Paper Rim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(140, 120, 100, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      drawPaperFibers(tearPoints, progress);

      ctx.restore();

      // -------------------------------------------------------------
      // DRAW FLOATING PAPER DUST & FIBER PARTICLES
      // -------------------------------------------------------------
      if (ripProgress > 0) {
        ctx.save();
        particles.forEach((p) => {
          p.x += p.vx * (1 + easeRip);
          p.y += p.vy + 0.8;
          p.angle += p.vAngle;
          p.opacity *= 0.97;

          if (p.opacity > 0.05) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;

            if (p.length > 3) {
              // Micro fiber stroke
              ctx.fillRect(-p.length / 2, -p.size / 2, p.length, p.size);
            } else {
              // Dust specks
              ctx.beginPath();
              ctx.arc(0, 0, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        });
        ctx.restore();
      }

      // Loop until complete
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onTearComplete) onTearComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTearing, onTearComplete]);

  if (!isTearing) return null;

  return (
    <canvas
      ref={canvasRef}
      id="paper-tear-canvas"
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
