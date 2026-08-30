import React, { useEffect, useRef } from 'react';

/**
 * WalkingRobot Component
 * Futuristic Autonomous AI Companion Robot that patrols the screen,
 * projects holographic laser scans, blinks LED sensors, and activates thrusters.
 */
export default function WalkingRobot() {
  const canvasRef = useRef(null);

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

    // States: 0 = PATROL_WALK, 1 = HOLO_SCAN, 2 = THRUSTER_BOOST
    let state = 0;
    let posX = -100;
    let posY = height - 50;
    let velocityX = 1.8;
    let time = 0;
    let scanTimer = 0;

    const particles = [];

    const drawRobot = (x, y, walkPhase, isScanning, isBoosting) => {
      ctx.save();
      ctx.translate(x, y);

      const scale = 0.7;
      ctx.scale(scale, scale);

      // Colors: Metallic Obsidian, Golden Ochre & Cyan LED
      const alloyGrad = ctx.createLinearGradient(-20, -40, 20, 20);
      alloyGrad.addColorStop(0, '#2E2A27');
      alloyGrad.addColorStop(0.5, '#1C1A18');
      alloyGrad.addColorStop(1, '#121110');

      const goldAccent = '#D5A26A';
      const cyanGlow = '#38BDF8';

      // 1. FLOATING HOLOGRAPHIC AI CORE ORB ABOVE HEAD
      ctx.save();
      const orbY = -62 + Math.sin(time * 3) * 4;
      ctx.beginPath();
      ctx.arc(0, orbY, 6, 0, Math.PI * 2);
      ctx.fillStyle = cyanGlow;
      ctx.shadowColor = cyanGlow;
      ctx.shadowBlur = 12;
      ctx.fill();

      // Outer Ring
      ctx.beginPath();
      ctx.arc(0, orbY, 10, time * 2, time * 2 + Math.PI * 1.5);
      ctx.strokeStyle = goldAccent;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 2. BIPEDAL MECHANICAL LEGS (Servo Knee Joints)
      ctx.save();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#3D3834';
      ctx.lineCap = 'round';

      if (isScanning) {
        // Stance wide, stationary
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(-14, 18);
        ctx.lineTo(-18, 22);

        ctx.moveTo(10, 0);
        ctx.lineTo(14, 18);
        ctx.lineTo(18, 22);
        ctx.stroke();
      } else {
        // Bipedal walking gait
        const legLeft = Math.sin(walkPhase) * 14;
        const legRight = Math.sin(walkPhase + Math.PI) * 14;

        // Left Leg
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-8 + legLeft * 0.5, 12);
        ctx.lineTo(-8 + legLeft, 22);
        ctx.stroke();

        // Right Leg
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(8 + legRight * 0.5, 12);
        ctx.lineTo(8 + legRight, 22);
        ctx.stroke();

        // Glowing Foot Treads
        ctx.fillStyle = goldAccent;
        ctx.fillRect(-12 + legLeft, 20, 8, 3);
        ctx.fillRect(4 + legRight, 20, 8, 3);
      }
      ctx.restore();

      // 3. MAIN ROBOT CHASSIS / TORSO
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(-18, -28, 36, 28, 8);
      ctx.fillStyle = alloyGrad;
      ctx.fill();
      ctx.strokeStyle = goldAccent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Glowing Power Core Emblem in Center Torso
      ctx.beginPath();
      ctx.arc(0, -14, 5, 0, Math.PI * 2);
      ctx.fillStyle = cyanGlow;
      ctx.shadowColor = cyanGlow;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      // 4. MECHANICAL ARMS
      ctx.save();
      ctx.lineWidth = 4;
      ctx.strokeStyle = goldAccent;
      ctx.lineCap = 'round';

      if (isScanning) {
        // Holographic projector arm raised
        ctx.beginPath();
        ctx.moveTo(18, -20);
        ctx.lineTo(30, -25);
        ctx.stroke();

        // Laser Projection Fan
        ctx.beginPath();
        ctx.moveTo(30, -25);
        ctx.lineTo(65, -45);
        ctx.lineTo(65, -5);
        ctx.closePath();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
        ctx.fill();
        ctx.strokeStyle = cyanGlow;
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        const armLeft = Math.sin(walkPhase + Math.PI) * 10;
        const armRight = Math.sin(walkPhase) * 10;

        ctx.beginPath();
        ctx.moveTo(-18, -22);
        ctx.lineTo(-24 + armLeft, -10);
        ctx.moveTo(18, -22);
        ctx.lineTo(24 + armRight, -10);
        ctx.stroke();
      }
      ctx.restore();

      // 5. HELMET HEAD & LED VISOR
      ctx.save();
      const headY = -42;
      ctx.beginPath();
      ctx.roundRect(-14, headY - 12, 28, 16, 6);
      ctx.fillStyle = alloyGrad;
      ctx.fill();
      ctx.strokeStyle = goldAccent;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Curved Glass Visor Faceplate
      ctx.beginPath();
      ctx.roundRect(-10, headY - 8, 20, 9, 3);
      ctx.fillStyle = '#111827';
      ctx.fill();

      // Animated Dual LED Eyes (Cyan)
      const eyeBlink = isScanning && Math.sin(time * 6) > 0.7;
      if (!eyeBlink) {
        ctx.beginPath();
        ctx.arc(-4, headY - 3.5, 2, 0, Math.PI * 2);
        ctx.arc(4, headY - 3.5, 2, 0, Math.PI * 2);
        ctx.fillStyle = cyanGlow;
        ctx.shadowColor = cyanGlow;
        ctx.shadowBlur = 6;
        ctx.fill();
      } else {
        // Scanning HUD Horizontal Line
        ctx.fillStyle = goldAccent;
        ctx.fillRect(-8, headY - 4, 16, 1.5);
      }

      ctx.restore();
      ctx.restore();
    };

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      let walkPhase = time * 5.5;

      // Robot Patrol Behavior State Machine
      if (state === 0) {
        // PATROL WALK
        posX += velocityX;
        posY = height - 48;

        if (posX > width * 0.42 && posX < width * 0.52 && Math.random() < 0.008) {
          state = 1; // HOLO_SCAN
          scanTimer = 0;
        }

        if (posX > width + 120) {
          posX = -120;
        }
      } else if (state === 1) {
        // HOLO_SCAN
        scanTimer += 0.016;
        if (scanTimer > 3.2) {
          state = 2; // THRUSTER_BOOST
          scanTimer = 0;
        }
      } else if (state === 2) {
        // THRUSTER_BOOST
        posX += velocityX * 1.8;
        scanTimer += 0.016;

        // Spawn Thruster Spark Particles
        if (Math.random() < 0.7) {
          particles.push({
            x: posX - 10,
            y: height - 25,
            vx: -2 - Math.random() * 2,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 3 + 1,
            opacity: 0.9
          });
        }

        if (scanTimer > 1.0) {
          state = 0; // Resume Normal Patrol
        }
      }

      // Render Thruster Particles
      ctx.save();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity *= 0.94;
        if (p.opacity <= 0.05) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = '#38BDF8';
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }
      }
      ctx.restore();

      // Render Robot
      drawRobot(posX, posY, walkPhase, state === 1, state === 2);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
    />
  );
}
