import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Ultra-Realistic Flying & Resting Dragon Component
 * 
 * Features:
 * - Theme-matched luxury copper/bronze/gold palette (blends with Light & Dark parchment themes)
 * - 4-state Flight Kinematics Machine: Flying -> Descending -> Resting/Perched -> Launching
 * - Wings fold gracefully while perching
 * - Ember particle trails and idle breathing sparks
 */
export default function FlyingDragon() {
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

    // States: 0 = FLYING, 1 = DESCENDING, 2 = RESTING, 3 = LAUNCHING
    let state = 0;
    let posX = -140;
    let posY = height * 0.15;
    let targetX = width * 0.75;
    let targetY = 90; // Perch location near navbar/card ledge
    let velocityX = 2.2;
    let velocityY = 0;
    let restTimer = 0;
    let time = 0;
    let wingAngle = 0; // Wing fold angle

    const embers = [];

    const drawDragon = (x, y, wingPhase, bankAngle, isResting) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(bankAngle);

      const scale = 0.6;
      ctx.scale(scale, scale);

      const isDark = theme === 'dark';

      // Theme-matching luxury color palette
      const bodyGrad = ctx.createLinearGradient(-40, -10, 40, 10);
      if (isDark) {
        bodyGrad.addColorStop(0, '#E5B887');
        bodyGrad.addColorStop(0.5, '#D5A26A');
        bodyGrad.addColorStop(1, '#836342');
      } else {
        bodyGrad.addColorStop(0, '#836342');
        bodyGrad.addColorStop(0.5, '#694D32');
        bodyGrad.addColorStop(1, '#4A3520');
      }

      const wingGrad = ctx.createLinearGradient(0, -60, 0, 40);
      if (isDark) {
        wingGrad.addColorStop(0, '#F59E0B');
        wingGrad.addColorStop(0.5, '#B89269');
        wingGrad.addColorStop(1, '#694D32');
      } else {
        wingGrad.addColorStop(0, '#9E7B56');
        wingGrad.addColorStop(0.5, '#836342');
        wingGrad.addColorStop(1, '#3D2E1E');
      }

      // 1. TAIL & BLADE (Tail sways smoothly)
      ctx.save();
      ctx.beginPath();
      const tailSway = isResting ? Math.sin(time * 1.2) * 4 : Math.sin(time * 3) * 10;
      ctx.moveTo(-20, 2);
      ctx.bezierCurveTo(-50, 8 + tailSway, -80, -5 + tailSway * 1.2, -100, 4);
      ctx.bezierCurveTo(-80, 12, -50, 15, -20, 8);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Tail blade
      ctx.beginPath();
      ctx.moveTo(-98, 4);
      ctx.lineTo(-115, -6);
      ctx.lineTo(-110, 5);
      ctx.lineTo(-118, 14);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#D5A26A' : '#694D32';
      ctx.fill();
      ctx.restore();

      // 2. MAIN DRAGON TORSO
      ctx.beginPath();
      ctx.ellipse(0, 4, 32, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Belly Plates
      ctx.beginPath();
      ctx.ellipse(2, 8, 22, 8, 0, 0, Math.PI);
      ctx.fillStyle = isDark ? '#FEF08A' : '#D5C3A3';
      ctx.fill();

      // 3. WINGS (Flapping when flying, folded when resting)
      let wingYOffset, wingMidY;
      if (isResting) {
        // Wings folded back neatly along body
        wingYOffset = 18;
        wingMidY = 12;
      } else {
        wingYOffset = Math.sin(wingPhase) * 52;
        wingMidY = Math.sin(wingPhase + 0.4) * 32;
      }

      // Left Wing (Far wing)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-5, -2);
      ctx.bezierCurveTo(-15, -20 + wingMidY, 0, -60 + wingYOffset, 25, -65 + wingYOffset);
      ctx.bezierCurveTo(18, -40 + wingMidY, 12, -20, -5, -2);
      ctx.fillStyle = wingGrad;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.restore();

      // Right Wing (Near wing)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(5, -2);
      ctx.bezierCurveTo(15, -30 + wingMidY, 35, -75 + wingYOffset, 68, -70 + wingYOffset);
      ctx.bezierCurveTo(50, -50 + wingMidY, 35, -38 + wingMidY, 25, -20);
      ctx.bezierCurveTo(18, -15, 8, -8, 5, -2);
      ctx.fillStyle = wingGrad;
      ctx.fill();
      ctx.strokeStyle = isDark ? '#D5A26A' : '#9E7B56';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 4. NECK & HEAD
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.bezierCurveTo(35, -5, 45, -12, 58, -10);
      ctx.bezierCurveTo(65, -8, 72, -2, 60, 6);
      ctx.bezierCurveTo(45, 8, 30, 6, 20, 4);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Horns
      ctx.beginPath();
      ctx.moveTo(52, -12);
      ctx.lineTo(40, -26);
      ctx.lineTo(48, -14);
      ctx.lineTo(38, -22);
      ctx.lineTo(50, -10);
      ctx.fillStyle = isDark ? '#FEF08A' : '#D5A26A';
      ctx.fill();

      // Eye
      ctx.beginPath();
      ctx.arc(56, -6, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF08A';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(56.5, -6, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#111827';
      ctx.fill();

      // Idle Fire Breath Puff (when resting)
      if (isResting && Math.random() < 0.4) {
        ctx.beginPath();
        ctx.arc(68 + Math.random() * 5, -2 + (Math.random() - 0.5) * 3, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#D5A26A' : '#9E7B56';
        ctx.fill();
      }

      ctx.restore();
      ctx.restore();
    };

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      let bankAngle = 0;
      let wingPhase = time * 3.5;

      // Flight State Machine Logic
      if (state === 0) {
        // FLYING HORIZONTALLY
        posX += velocityX;
        posY = height * 0.16 + Math.sin(time * 1.5) * 20;
        bankAngle = Math.cos(time * 1.5) * 0.06;

        // Randomly decide to descend and rest when passing middle screen
        if (posX > width * 0.45 && posX < width * 0.55 && Math.random() < 0.008) {
          state = 1; // Start descending to perch
          targetX = width * 0.72;
          targetY = 85;
        }

        if (posX > width + 150) {
          posX = -150;
        }
      } else if (state === 1) {
        // DESCENDING TO PERCH
        const dx = targetX - posX;
        const dy = targetY - posY;
        posX += dx * 0.03;
        posY += dy * 0.03;
        bankAngle = Math.sin(time * 2) * 0.04;

        if (Math.hypot(dx, dy) < 12) {
          state = 2; // RESTING PERCHED
          restTimer = 0;
        }
      } else if (state === 2) {
        // RESTING PERCHED
        posX = targetX;
        posY = targetY + Math.sin(time * 1.2) * 2; // Subtle idle breathing
        restTimer += 0.016;

        if (restTimer > 4.5) {
          state = 3; // LAUNCH BACK INTO FLIGHT
        }
      } else if (state === 3) {
        // LAUNCHING / TAKING OFF
        posX += velocityX * 1.5;
        posY -= 1.8;
        bankAngle = -0.12;

        if (posY < height * 0.16) {
          state = 0; // Back to normal flying
        }
      }

      // Embers trailing
      if (state === 0 && Math.random() < 0.5) {
        embers.push({
          x: posX - 60,
          y: posY + (Math.random() - 0.5) * 10,
          vx: -1.2,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          opacity: 0.8,
          color: isDark ? '#D5A26A' : '#9E7B56'
        });
      }

      // Render Embers
      ctx.save();
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity *= 0.96;
        if (p.opacity <= 0.05) {
          embers.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }
      }
      ctx.restore();

      // Render Dragon
      const isResting = state === 2;
      drawDragon(posX, posY, wingPhase, bankAngle, isResting);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
    />
  );
}
