import React from 'react';
import { FileText } from 'lucide-react';

export default function Navbar({ activeSection, onOpenCV }) {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Credentials' },
    { id: 'resume', label: 'CV' },
    { id: 'contact', label: 'Connect' },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121110]/90 backdrop-blur-md border-b border-[#2E2A27] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="cursor-pointer group flex items-center space-x-3"
        >
          <div className="w-8 h-8 rounded border border-[#D5A26A] flex items-center justify-center bg-[#1C1A18] text-[#FAF7F2] shadow-sm group-hover:bg-[#D5A26A] group-hover:text-[#121110] transition-colors">
            <span className="font-serif font-bold text-lg leading-none">व</span>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-[#D5A26A] transition-colors">
              Vikas Yadav
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#D5A26A] font-semibold">
              3D MERN & AI Engineering
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative py-1 text-xs font-medium tracking-wide transition-colors ${
                activeSection === item.id 
                  ? 'text-[#D5A26A] font-bold' 
                  : 'text-[#A0988E] hover:text-[#FAF7F2]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D5A26A] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* CV Action */}
          <button
            onClick={onOpenCV}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#D5A26A] border border-[#D5A26A]/40 rounded hover:bg-[#D5A26A] hover:text-[#121110] transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CV</span>
          </button>
        </div>
      </div>
    </header>
  );
}
