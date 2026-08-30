import React from 'react';
import { portfolioData } from '../data/portfolioData';
import TechStack3D from './3d/TechStack3D';
import { 
  Code2, Server, Workflow, Layers, ShieldCheck, Cpu, 
  Database, Globe, Sparkles, Smartphone, Palette, Cloud, GitBranch, Zap, Brain
} from 'lucide-react';

export default function TechStackSection() {
  const { skillsGrid } = portfolioData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'atom': return <Code2 className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'code': return <Code2 className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'layers': return <Layers className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'palette': return <Palette className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'smartphone': return <Smartphone className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'server': return <Server className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'cpu': return <Cpu className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'database': return <Database className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'globe': return <Globe className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'shield-check': return <ShieldCheck className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'workflow': return <Workflow className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'brain': return <Brain className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'sparkles': return <Sparkles className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'git-branch': return <GitBranch className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      case 'zap': return <Zap className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
      default: return <Code2 className="w-5 h-5 text-[#836342] dark:text-[#E5B887]" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E5DFD5] dark:border-[#2E2A27]">
      {/* Editorial Header */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-[#836342] dark:text-[#E5B887] font-bold">
          Technical Architecture
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1816] dark:text-[#FFFFFF] mt-1">
          3D Tech Stack Constellation
        </h2>
      </div>

      {/* Interactive 3D Orbiting Galaxy Sphere */}
      <div className="mb-12">
        <TechStack3D />
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillsGrid.map((group, idx) => (
          <div
            key={idx}
            className="editorial-card bg-white dark:bg-[#1C1A18] p-8 rounded-xl border border-[#E5DFD5] dark:border-[#3D3834] flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="pb-4 mb-6 border-b border-[#E5DFD5] dark:border-[#2E2A27]">
                <h3 className="font-serif text-3xl font-bold text-[#1A1816] dark:text-[#FFFFFF]">
                  {group.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-[#FAF7F2] dark:bg-[#121110] rounded-lg border border-[#E8DEC9] dark:border-[#2E2A27] flex flex-col items-center justify-center text-center group hover:bg-white dark:hover:bg-[#2A241E] hover:border-[#9E7B56] dark:hover:border-[#E5B887] transition-all hover:shadow-sm cursor-default"
                  >
                    <div className="mb-2 p-2 bg-white dark:bg-[#1C1A18] rounded-full border border-[#E5DFD5] dark:border-[#3D3834] group-hover:border-[#9E7B56] dark:group-hover:border-[#E5B887] transition-colors">
                      {getIcon(skill.icon)}
                    </div>
                    <span className="text-xs font-bold text-[#1A1816] dark:text-[#FAF7F2] group-hover:text-[#836342] dark:group-hover:text-[#E5B887] transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E5DFD5] dark:border-[#2E2A27] text-center text-xs text-[#836342] dark:text-[#E5B887] font-bold">
              3D Verified Stack
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
