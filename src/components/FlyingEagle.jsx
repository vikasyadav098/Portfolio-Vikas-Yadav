import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * FlyingEagle Component
 * 
 * An elegant, realistic Golden Falcon / Eagle that soaring and perching across the page.
 * Features:
 * - Theme-matched luxury bronze/gold plumage
 * - Smooth wing joint flexure & fanned tail feathers
 * - State machine: Soaring -> Gliding Down -> Perched/Resting -> Taking Off
 */
export default function FlyingEagle() {
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

    // States: 0 = SOARING, 1 = GLIDING_DOWN, 2 = PERCHED_RESTING, 3 = TAKING_OFF
    let state = 0;
    let posX = -120;
    let posY = height * 0.16;
    let targetX = width * 0.76;
    let targetY = 85;
    let velocityX = 2.4;
    let restTimer = 0;
    let time = 0;

    const drawEagle = (x, y, wingPhase, bankAngle, isResting) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(bankAngle);

      const scale = 0.65;
      ctx.scale(scale, scale);

      const isDark = theme === 'dark';

      // Theme-matching eagle plumage colors
      const bodyGrad = ctx.createLinearGradient(-30, -10, 30, 10);
      if (isDark) {
        bodyGrad.addColorStop(0, '#E5B887');
        bodyGrad.addColorStop(0.6, '#D5A26A');
        bodyGrad.addColorStop(1, '#836342');
      } else {
        bodyGrad.addColorStop(0, '#836342');
        bodyGrad.addColorStop(0.6, '#694D32');
        bodyGrad.addColorStop(1, '#3D2E1E');
      }

      const wingGrad = ctx.createLinearGradient(0, -70, 0, 30);
      if (isDark) {
        wingGrad.addColorStop(0, '#FEF08A');
        wingGrad.addColorStop(0.5, '#D5A26A');
        wingGrad.addColorStop(1, '#694D32');
      } else {
        wingGrad.addColorStop(0, '#D5A26A');
        wingGrad.addColorStop(0.5, '#836342');
        wingGrad.addColorStop(1, '#2C2825');
      }

      // 1. FANNED TAIL FEATHERS
      ctx.save();
      ctx.beginPath();
      const tailSway = isResting ? Math.sin(time * 1.5) * 3 : Math.sin(time * 3) * 6;
      ctx.moveTo(-15, 2);
      ctx.lineTo(-45, 12 + tailSway);
      ctx.lineTo(-52, 4 + tailSway);
      ctx.lineTo(-55, -4 + tailSway);
      ctx.lineTo(-45, -12 + tailSway);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#D5A26A' : '#694D32';
      ctx.fill();
      ctx.restore();

      // 2. MAIN EAGLE TORSO
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Golden Breast Feathers
      ctx.beginPath();
      ctx.ellipse(4, 4, 18, 7, 0, 0, Math.PI);
      ctx.fillStyle = isDark ? '#FEF08A' : '#E8DEC9';
      ctx.fill();

      // 3. ELEGANT AERODYNAMIC WINGS
      let wingYOffset, wingMidY;
      if (isResting) {
        // Folded neatly against the body
        wingYOffset = 16;
        wingMidY = 10;
      } else {
        wingYOffset = Math.sin(wingPhase) * 48;
        wingMidY = Math.sin(wingPhase + 0.3) * 28;
      }

      // Left Wing (Far wing behind body)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-5, -2);
      ctx.bezierCurveTo(-15, -25 + wingMidY, 0, -65 + wingYOffset, 30, -70 + wingYOffset);
      ctx.bezierCurveTo(20, -45 + wingMidY, 10, -20, -5, -2);
      ctx.fillStyle = wingGrad;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.restore();

      // Right Wing (Near wing in front with primary feather tips)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(5, -2);
      ctx.bezierCurveTo(15, -30 + wingMidY, 40, -80 + wingYOffset, 72, -75 + wingYOffset);
      // Scalloped primary feather tips
      ctx.bezierCurveTo(55, -55 + wingMidY, 40, -42 + wingMidY, 28, -22);
      ctx.bezierCurveTo(18, -15, 8, -8, 5, -2);
      ctx.fillStyle = wingGrad;
      ctx.fill();
      ctx.strokeStyle = isDark ? '#FEF08A' : '#D5A26A';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 4. EAGLE HEAD & HOOKED BEAK
      ctx.save();
      ctx.beginPath();
      ctx.arc(24, -4, 9, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#FAF7F2' : '#FFFFFF'; // Golden Eagle white/cream crown
      ctx.fill();

      // Sharp Hooked Beak (Gold/Ochre)
      ctx.beginPath();
      ctx.moveTo(31, -5);
      ctx.lineTo(40, -2);
      ctx.lineTo(34, 4);
      ctx.closePath();
      ctx.fillStyle = '#F59E0B';
      ctx.fill();

      // Piercing Eye
      ctx.beginPath();
      ctx.arc(26, -5, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF08A';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(26.5, -5, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#111827';
      ctx.fill();

      ctx.restore();
      ctx.restore();
    };

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      let bankAngle = 0;
      let wingPhase = time * 3.2;

      // Eagle Flight Kinematics State Machine
      if (state === 0) {
        // SOARING / GLIDING
        posX += velocityX;
        posY = height * 0.16 + Math.sin(time * 1.4) * 18;
        bankAngle = Math.cos(time * 1.4) * 0.05;

        // Randomly land to rest when passing upper center
        if (posX > width * 0.42 && posX < width * 0.52 && Math.random() < 0.009) {
          state = 1; // Gliding Down
          targetX = width * 0.74;
          targetY = 82;
        }

        if (posX > width + 140) {
          posX = -140;
        }
      } else if (state === 1) {
        // GLIDING DOWN TO PERCH
        const dx = targetX - posX;
        const dy = targetY - posY;
        posX += dx * 0.035;
        posY += dy * 0.035;
        bankAngle = Math.sin(time * 2) * 0.03;

        if (Math.hypot(dx, dy) < 10) {
          state = 2; // PERCHED & RESTING
          restTimer = 0;
        }
      } else if (state === 2) {
        // PERCHED & RESTING ON LEDGE
        posX = targetX;
        posY = targetY + Math.sin(time * 1.2) * 1.5;
        restTimer += 0.016;

        if (restTimer > 4.0) {
          state = 3; // LAUNCH INTO FLIGHT
        }
      } else if (state === 3) {
        // LAUNCHING / TAKING OFF
        posX += velocityX * 1.4;
        posY -= 1.6;
        bankAngle = -0.1;

        if (posY < height * 0.16) {
          state = 0; // Soaring
        }
      }

      // Render Eagle
      const isResting = state === 2;
      drawEagle(posX, posY, wingPhase, bankAngle, isResting);

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
