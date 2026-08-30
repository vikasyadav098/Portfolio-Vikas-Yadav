import React, { useEffect, useRef } from 'react';

/**
 * Ultra-Realistic Walking Cat Component
 * 
 * Features:
 * - Anatomically accurate 3-segment feline leg joints & spine flexure
 * - Rich fur coat gradients with inner ear details, almond eyes & fine whiskers
 * - Fluid sine wave tail curl aerodynamics
 * - Feline states: Stalking/Trotting -> Graceful Sit & Preen -> Cat Stretch -> Resume Walk
 */
export default function WalkingPet() {
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

    // States: 0 = STALKING_WALK, 1 = SITTING_PREEN, 2 = CAT_STRETCH
    let state = 0;
    let posX = -90;
    let posY = height - 42;
    let velocityX = 1.5;
    let time = 0;
    let restTimer = 0;

    const drawRealisticCat = (x, y, gaitPhase, isSitting, isStretching) => {
      ctx.save();
      ctx.translate(x, y);

      const scale = 0.65;
      ctx.scale(scale, scale);

      // Feline Fur Palette: Luxurious Golden Tabby / Amber Coat
      const coatGrad = ctx.createLinearGradient(-30, -20, 30, 10);
      coatGrad.addColorStop(0, '#D5A26A');
      coatGrad.addColorStop(0.5, '#B89269');
      coatGrad.addColorStop(1, '#694D32');

      const creamGrad = ctx.createLinearGradient(0, -10, 20, 10);
      creamGrad.addColorStop(0, '#FFFBEB');
      creamGrad.addColorStop(1, '#FEF08A');

      const darkStripes = '#4A3520';

      // 1. FLUID FELINE TAIL (3-Segment Bezier Curve Wave)
      ctx.save();
      const tailWave1 = isSitting ? Math.sin(time * 2) * 14 : Math.sin(time * 3) * 10;
      const tailWave2 = isSitting ? Math.cos(time * 2) * 18 : Math.cos(time * 3) * 14;

      ctx.beginPath();
      ctx.moveTo(-24, -14);
      ctx.bezierCurveTo(
        -48, -28 + tailWave1,
        -55, -48 + tailWave2,
        -38, -62 + tailWave1 * 0.8
      );
      ctx.strokeStyle = coatGrad;
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Fluffy Tail Tip Accent
      ctx.beginPath();
      ctx.arc(-38, -62 + tailWave1 * 0.8, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = darkStripes;
      ctx.fill();
      ctx.restore();

      // 2. ANATOMICAL FELINE LEGS (3-Segment Hock & Paw joints)
      ctx.save();
      ctx.strokeStyle = coatGrad;
      ctx.lineWidth = 5.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (isSitting) {
        // Folded hind leg thigh & paw resting flat
        ctx.beginPath();
        ctx.moveTo(-16, -6);
        ctx.bezierCurveTo(-26, 4, -22, 16, -10, 18);
        ctx.stroke();

        // Straight front leg paws side-by-side
        ctx.beginPath();
        ctx.moveTo(14, -6);
        ctx.lineTo(16, 18);
        ctx.moveTo(8, -6);
        ctx.lineTo(10, 18);
        ctx.stroke();

        // Paws
        ctx.fillStyle = darkStripes;
        ctx.beginPath();
        ctx.arc(16, 18, 3, 0, Math.PI * 2);
        ctx.arc(10, 18, 3, 0, Math.PI * 2);
        ctx.arc(-10, 18, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (isStretching) {
        // Cat stretch: Front legs extended far forward, rear legs pushed back
        ctx.beginPath();
        ctx.moveTo(12, -4);
        ctx.lineTo(34, 18);
        ctx.moveTo(4, -4);
        ctx.lineTo(26, 18);
        ctx.moveTo(-18, -4);
        ctx.lineTo(-24, 18);
        ctx.stroke();
      } else {
        // Realistic Feline Diagonal Gait (FL, RR, FR, RL)
        const fl = Math.sin(gaitPhase) * 11;
        const rr = Math.sin(gaitPhase + Math.PI) * 11;
        const fr = Math.sin(gaitPhase + Math.PI * 0.5) * 11;
        const rl = Math.sin(gaitPhase + Math.PI * 1.5) * 11;

        // Rear Left Leg
        ctx.beginPath();
        ctx.moveTo(-18, -4);
        ctx.lineTo(-22 + rl * 0.7, 8);
        ctx.lineTo(-18 + rl, 18);
        ctx.stroke();

        // Rear Right Leg
        ctx.beginPath();
        ctx.moveTo(-10, -4);
        ctx.lineTo(-14 + rr * 0.7, 8);
        ctx.lineTo(-10 + rr, 18);
        ctx.stroke();

        // Front Left Leg
        ctx.beginPath();
        ctx.moveTo(10, -4);
        ctx.lineTo(12 + fl * 0.8, 8);
        ctx.lineTo(10 + fl, 18);
        ctx.stroke();

        // Front Right Leg
        ctx.beginPath();
        ctx.moveTo(18, -4);
        ctx.lineTo(20 + fr * 0.8, 8);
        ctx.lineTo(18 + fr, 18);
        ctx.stroke();
      }
      ctx.restore();

      // 3. ELEGANT FELINE SPINE & TORSO
      ctx.save();
      const spineUndulation = isSitting ? 0 : Math.sin(gaitPhase * 2) * 2;

      ctx.beginPath();
      if (isSitting) {
        // Upright seated cat posture
        ctx.moveTo(-18, 10);
        ctx.bezierCurveTo(-26, -10, -18, -32, 10, -34);
        ctx.bezierCurveTo(24, -32, 22, -10, 18, 10);
      } else if (isStretching) {
        // Arched back downward cat stretch
        ctx.moveTo(-24, 4);
        ctx.bezierCurveTo(-10, 14, 10, 12, 28, 4);
        ctx.bezierCurveTo(18, -8, -10, -8, -24, 4);
      } else {
        // Aerodynamic walking spine
        ctx.moveTo(-24, -4);
        ctx.bezierCurveTo(-12, -18 + spineUndulation, 12, -18 - spineUndulation, 24, -6);
        ctx.bezierCurveTo(16, 6, -16, 6, -24, -4);
      }
      ctx.fillStyle = coatGrad;
      ctx.fill();

      // Cream Chest & Underbelly Patch
      ctx.beginPath();
      ctx.ellipse(10, isSitting ? -18 : -2, 10, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = creamGrad;
      ctx.fill();

      // Tabby Stripes Accent
      ctx.strokeStyle = darkStripes;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-8, -12);
      ctx.lineTo(-4, -6);
      ctx.moveTo(2, -14);
      ctx.lineTo(5, -7);
      ctx.stroke();
      ctx.restore();

      // 4. DETAILED FELINE HEAD, ALMOND EYES & WHISKERS
      ctx.save();
      const headX = isSitting ? 12 : isStretching ? 30 : 24;
      const headY = isSitting ? -38 : isStretching ? 2 : -22;

      // Feline Head Shape
      ctx.beginPath();
      ctx.ellipse(headX, headY, 12, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = coatGrad;
      ctx.fill();

      // Pointed Ears with Inner Pinkish Fur Detail
      // Left Ear
      ctx.beginPath();
      ctx.moveTo(headX - 7, headY - 6);
      ctx.lineTo(headX - 11, headY - 24);
      ctx.lineTo(headX - 1, headY - 10);
      ctx.closePath();
      ctx.fillStyle = darkStripes;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(headX - 6, headY - 8);
      ctx.lineTo(headX - 9, headY - 20);
      ctx.lineTo(headX - 2, headY - 11);
      ctx.closePath();
      ctx.fillStyle = '#FCA5A5'; // Inner ear pink
      ctx.fill();

      // Right Ear
      ctx.beginPath();
      ctx.moveTo(headX + 1, headY - 10);
      ctx.lineTo(headX + 7, headY - 24);
      ctx.lineTo(headX + 9, headY - 6);
      ctx.closePath();
      ctx.fillStyle = darkStripes;
      ctx.fill();

      // Almond Eye & Slit Pupil (Glowing Emerald / Gold)
      const isBlinking = isSitting && Math.sin(time * 3.5) > 0.85;
      if (!isBlinking) {
        // Almond Eye Iris
        ctx.beginPath();
        ctx.ellipse(headX + 6, headY - 2, 3.5, 2.5, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981'; // Emerald Cat Eye
        ctx.fill();

        // Slit Pupil
        ctx.beginPath();
        ctx.ellipse(headX + 6.5, headY - 2, 1, 2.2, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#064E3B';
        ctx.fill();

        // Eye Catchlight Specular Reflection
        ctx.beginPath();
        ctx.arc(headX + 5.5, headY - 3, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      } else {
        // Closed Eyelid Line
        ctx.beginPath();
        ctx.moveTo(headX + 3, headY - 2);
        ctx.bezierCurveTo(headX + 6, headY, headX + 8, headY - 1, headX + 9, headY - 2);
        ctx.strokeStyle = darkStripes;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Snout & Delicate Pink Nose
      ctx.beginPath();
      ctx.ellipse(headX + 10, headY + 3, 3.5, 2.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = creamGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(headX + 12, headY + 1);
      ctx.lineTo(headX + 14, headY + 2);
      ctx.lineTo(headX + 12, headY + 3.5);
      ctx.closePath();
      ctx.fillStyle = '#F43F5E';
      ctx.fill();

      // Fine Whiskers (6 Delicate Strands)
      ctx.strokeStyle = '#FAF7F2';
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      // Upper whiskers
      ctx.moveTo(headX + 11, headY + 1);
      ctx.lineTo(headX + 26, headY - 3);
      ctx.moveTo(headX + 11, headY + 2);
      ctx.lineTo(headX + 27, headY + 2);
      // Lower whiskers
      ctx.moveTo(headX + 11, headY + 3);
      ctx.lineTo(headX + 25, headY + 7);
      ctx.stroke();

      ctx.restore();
      ctx.restore();
    };

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      let gaitPhase = time * 4.8;

      // Realistic Cat Behavior State Machine
      if (state === 0) {
        // STALKING / TROTTING
        posX += velocityX;
        posY = height - 42;

        if (posX > width * 0.42 && posX < width * 0.52 && Math.random() < 0.008) {
          state = 1; // SITTING_PREEN
          restTimer = 0;
        }

        if (posX > width + 120) {
          posX = -120;
        }
      } else if (state === 1) {
        // SITTING_PREEN
        restTimer += 0.016;
        if (restTimer > 3.8) {
          state = 2; // CAT_STRETCH
          restTimer = 0;
        }
      } else if (state === 2) {
        // CAT_STRETCH
        restTimer += 0.016;
        if (restTimer > 1.4) {
          state = 0; // Resume Stalking Walk
        }
      }

      // Render Realistic Cat
      drawRealisticCat(posX, posY, gaitPhase, state === 1, state === 2);

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
