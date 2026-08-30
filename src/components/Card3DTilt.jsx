import React, { useRef, useState } from 'react';

/**
 * Card3DTilt Component
 * Wraps any card with interactive 3D perspective tilt physics & metallic glint.
 */
export default function Card3DTilt({ children, className = '' }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glintX: 50,
    glintY: 50,
    glintOpacity: 0
  });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // 7 deg tilt max
    const rotateY = ((x - centerX) / centerX) * 7;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      glintX: (x / rect.width) * 100,
      glintY: (y / rect.height) * 100,
      glintOpacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glintX: 50,
      glintY: 50,
      glintOpacity: 0
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out transform-gpu ${className}`}
      style={{ transform: style.transform }}
    >
      {/* Metallic 3D Glint Light Reflection */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${style.glintX}% ${style.glintY}%, rgba(213, 162, 106, 0.35), transparent 70%)`,
          opacity: style.glintOpacity
        }}
      />
      {children}
    </div>
  );
}
