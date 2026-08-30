import React from 'react';
import { Sparkles, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Card3DTilt from './Card3DTilt';

export default function AboutSection() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2E2A27]">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-[#D5A26A] font-bold">
          Background & Vision
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#FAF7F2] mt-1">
          Crafting Code, Shaping 3D Experiences.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Photo Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card3DTilt>
            <div className="editorial-card bg-[#1C1A18] p-5 rounded-xl border border-[#3D3834] shadow-2xl">
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative bg-[#121110]">
                <img
                  src={personal.photo}
                  alt={personal.name}
                  className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D5C3A3]">
                    MERN & AI Engineer
                  </span>
                  <h3 className="font-serif text-xl font-bold">{personal.name}</h3>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2E2A27] flex items-center justify-between text-xs text-[#A0988E] font-semibold">
                <span>Kumaun University (BCA)</span>
                <span className="text-[#D5A26A] font-bold">Rudrapur, India</span>
              </div>
            </div>
          </Card3DTilt>
        </div>

        {/* Right Column: Narrative Story & Engineering Principles */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mb-4">
              Story & 3D Engineering Vision
            </h3>
            <p className="text-base text-[#E5DFD5] font-normal leading-relaxed mb-4">
              I am a MERN Stack Developer and AI Automation Engineer dedicated to building high-performance, human-centric software. Completing my BCA in Computer Science at Kumaun University, I bridge complex backend API development with fluid, 3D interactive user interfaces.
            </p>
            <p className="text-base text-[#E5DFD5] font-normal leading-relaxed">
              My technical work spans scalable REST API architectures in Node.js/Express, optimized MongoDB database modeling, and cutting-edge AI workflow orchestrations using n8n, the OpenAI API, Anthropic Claude API, and locally hosted LLMs like Ollama.
            </p>
          </div>

          {/* Core Philosophy Grid */}
          <div className="pt-6 border-t border-[#2E2A27]">
            <h4 className="text-xs uppercase tracking-widest text-[#D5A26A] font-bold mb-6">
              Core Engineering Philosophy
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card3DTilt>
                <div className="p-5 bg-[#1C1A18] rounded-xl border border-[#3D3834] shadow-sm">
                  <div className="w-8 h-8 rounded bg-[#2A241E] text-[#D5A26A] flex items-center justify-center mb-3 border border-[#3D3834]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h5 className="font-serif text-lg font-bold text-[#FAF7F2]">Architecture First</h5>
                  <p className="text-xs sm:text-sm text-[#E5DFD5] mt-1 font-normal leading-relaxed">
                    Clean RESTful endpoints, CORS security, and optimized database queries that scale reliably.
                  </p>
                </div>
              </Card3DTilt>

              <Card3DTilt>
                <div className="p-5 bg-[#1C1A18] rounded-xl border border-[#3D3834] shadow-sm">
                  <div className="w-8 h-8 rounded bg-[#2A241E] text-[#D5A26A] flex items-center justify-center mb-3 border border-[#3D3834]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h5 className="font-serif text-lg font-bold text-[#FAF7F2]">AI Workflow Automation</h5>
                  <p className="text-xs sm:text-sm text-[#E5DFD5] mt-1 font-normal leading-relaxed">
                    Integrating LLMs and n8n webhooks to automate task pipelines and natural language interactions.
                  </p>
                </div>
              </Card3DTilt>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
