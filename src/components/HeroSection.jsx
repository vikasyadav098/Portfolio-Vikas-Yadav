import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Card3DTilt from './Card3DTilt';

export default function HeroSection({ onOpenCV }) {
  const { personal, projects } = portfolioData;
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[90vh] flex flex-col justify-between py-12 px-6 max-w-7xl mx-auto">
      {/* Editorial Layout: Grid system matching Gemini Design Page 8 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Column: Heading & Vision */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#2E2A27] border border-[#3D3834] rounded-full text-xs font-bold text-[#E5B887]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>MERN Stack & AI Engineering</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#FAF7F2] leading-[1.08] tracking-tight">
            {personal.headline}
          </h1>

          <p className="text-lg sm:text-xl text-[#E5DFD5] font-normal max-w-2xl leading-relaxed">
            {personal.subheadline} MERN architectures, optimized REST APIs, and n8n/LLM event-driven workflow orchestrations.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#E5B887] hover:bg-[#B89269] text-[#121110] font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCV}
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#1C1A18] text-[#FAF7F2] border border-[#3D3834] font-bold text-sm rounded-lg transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-[#E5B887]" />
              <span>Curriculum Vitae</span>
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="pt-8 border-t border-[#2E2A27] grid grid-cols-3 gap-6 text-left">
            <div>
              <span className="block font-serif text-3xl font-bold text-[#FAF7F2]">2+</span>
              <span className="text-xs text-[#E5B887] uppercase tracking-wider font-bold">Full-Stack Apps</span>
            </div>
            <div>
              <span className="block font-serif text-3xl font-bold text-[#FAF7F2]">45%</span>
              <span className="text-xs text-[#E5B887] uppercase tracking-wider font-bold">Speed Boost</span>
            </div>
            <div>
              <span className="block font-serif text-3xl font-bold text-[#FAF7F2]">100%</span>
              <span className="text-xs text-[#E5B887] uppercase tracking-wider font-bold">Production Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Editorial Profile Photo Frame with 3D Depth Card Tilt */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <Card3DTilt className="max-w-md w-full">
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E5B887]/20 to-[#3D2E1E]/30 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-70" />
              
              <div className="relative bg-[#1C1A18] p-4 rounded-xl border border-[#3D3834] shadow-2xl">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[#121110] relative">
                  <img
                    src={personal.photo}
                    alt={personal.name}
                    className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02] group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#D5C3A3]">
                      {personal.location}
                    </span>
                    <h3 className="font-serif text-2xl font-bold">{personal.name}</h3>
                  </div>
                </div>
                <div className="mt-3 px-1 flex items-center justify-between text-xs text-[#E5DFD5] font-semibold">
                  <span>BCA Computer Science</span>
                  <span className="text-[#E5B887] font-bold">Kumaun University</span>
                </div>
              </div>
            </div>
          </Card3DTilt>
        </div>

      </div>

      {/* Featured Projects Row */}
      <div className="pt-16 border-t border-[#2E2A27] mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#FAF7F2]">Featured Highlights</h2>
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-xs font-bold uppercase tracking-wider text-[#E5B887] hover:underline"
          >
            View All Projects ({projects.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card3DTilt key={project.id}>
              <div
                onClick={() => scrollToSection('projects')}
                className="editorial-card bg-[#1C1A18] p-5 rounded-lg border border-[#3D3834] cursor-pointer group hover:scale-[1.02] transition-transform duration-300 h-full"
              >
                <div className="flex items-center justify-between mb-3 text-xs text-[#E5B887] font-bold uppercase tracking-wider">
                  <span>{project.category}</span>
                  <span className="text-[11px] bg-[#2A241E] px-2 py-0.5 rounded border border-[#3D3834]">{project.stats}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#FAF7F2] group-hover:text-[#E5B887] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-[#E5DFD5] line-clamp-2 leading-relaxed font-normal">
                  {project.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#2E2A27] flex items-center justify-between text-xs font-bold text-[#E5B887]">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
}
