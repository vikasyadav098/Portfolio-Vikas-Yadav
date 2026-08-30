import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import FluidBackgroundCanvas from './components/FluidBackgroundCanvas';
import Background3DScene from './components/3d/Background3DScene';
import Scroll3DEffect from './components/3d/Scroll3DEffect';
import PaperTearCanvas from './components/PaperTearCanvas';
import ScrollProgress from './components/ScrollProgress';
import WalkingRobot from './components/WalkingRobot';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

function MainLayout() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTearing, setIsTearing] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);

  // Initialize Ultra-Smooth Lenis Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      lerp: 0.08
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // IntersectionObserver to auto-update active nav item based on scroll position
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'achievements', 'resume', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTriggerTear = () => {
    setIsTearing(true);
  };

  const handleTearComplete = () => {
    setIsTearing(false);
  };

  return (
    <div className="relative min-h-screen bg-[#121110] text-[#FAF7F2] transition-colors duration-500 paper-texture selection:bg-[#D5A26A] selection:text-[#121110]">
      {/* 60 FPS Interactive Fluid Mesh Gradient Background */}
      <FluidBackgroundCanvas />

      {/* 3D Depth Particle Environment Scene */}
      <Background3DScene />

      {/* Insane 3D WebGL Fly-Through Tunnel Scroll Effect */}
      <Scroll3DEffect />

      {/* Top Luxury Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Futuristic Autonomous AI Companion Robot */}
      <WalkingRobot />

      {/* Tactile 3D Paper Tear Physical Transition Overlay */}
      <PaperTearCanvas
        isTearing={isTearing}
        onTearComplete={handleTearComplete}
      />

      {/* Sticky Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onTriggerTear={handleTriggerTear}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* Single Continuous 3D Scrolling Experience */}
      <main className="relative z-10">
        <HeroSection onOpenCV={() => setIsCVOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <TechStackSection />
        <ProjectsSection />
        <AchievementsSection />
        <ResumeSection onOpenCVModal={() => setIsCVOpen(true)} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen CV Zoom Modal */}
      <ResumeModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
