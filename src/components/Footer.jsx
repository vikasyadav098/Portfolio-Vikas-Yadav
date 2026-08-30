import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121110] border-t border-[#2E2A27] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded border border-[#D5A26A] flex items-center justify-center font-serif font-bold text-lg text-[#FAF7F2]">
            व
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-[#FAF7F2]">
              Vikas Yadav
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#D5A26A] font-semibold">
              3D MERN Stack & AI Automation Developer
            </span>
          </div>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center space-x-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A0988E] hover:text-[#D5A26A] transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A0988E] hover:text-[#D5A26A] transition-colors"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="text-[#A0988E] hover:text-[#D5A26A] transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 bg-[#1C1A18] text-[#FAF7F2] border border-[#2E2A27] rounded hover:border-[#D5A26A] transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#2E2A27]/60 text-center text-xs text-[#A0988E]">
        © 2026 Vikas Yadav. Engineered with MERN Stack, React, Three.js, Tailwind CSS & Lenis Smooth Scroll.
      </div>
    </footer>
  );
}
