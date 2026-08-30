import React, { useState } from 'react';
import { ExternalLink, Sparkles, Monitor } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Card3DTilt from './Card3DTilt';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Full-Stack AI Application', 'Frontend Analytics UI', 'AI Agent & Webhook System'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2E2A27]">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#2E2A27]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D5A26A] font-bold">
            Selected 3D Engineering Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#FAF7F2] mt-1">
            3D Interactive Projects
          </h2>
        </div>
        <p className="text-sm text-[#A0988E] max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
          Real-world applications engineered from database architecture through production REST endpoints to responsive UI experiences.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              filter === cat
                ? 'bg-[#D5A26A] text-[#121110] shadow-sm'
                : 'bg-[#1C1A18] text-[#A0988E] border border-[#3D3834] hover:border-[#D5A26A]'
            }`}
          >
            {cat === 'all' ? 'All Projects' : cat}
          </button>
        ))}
      </div>

      {/* Projects Grid with 3D Depth Card Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <Card3DTilt key={project.id}>
            <div className="editorial-card bg-[#1C1A18] p-8 rounded-xl border border-[#3D3834] flex flex-col justify-between group hover:border-[#D5A26A] transition-all duration-300 shadow-2xl h-full">
              <div>
                {/* Browser Window Mockup Top Bar */}
                <div className="bg-[#121110] p-3 rounded-t border border-[#2E2A27] mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[11px] text-[#A0988E] font-mono font-medium tracking-wider truncate max-w-[200px]">
                    {project.demoUrl ? project.demoUrl.replace('https://', '') : `${project.id}.local`}
                  </div>
                  <Monitor className="w-3.5 h-3.5 text-[#D5A26A]" />
                </div>

                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D5A26A] bg-[#2A241E] px-3 py-1 rounded-full border border-[#3D3834]">
                    {project.category}
                  </span>
                  <span className="text-xs font-bold text-[#D5A26A] flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D5A26A]" />
                    <span>{project.stats}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-3xl font-bold text-[#FAF7F2] group-hover:text-[#D5A26A] transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Descriptions */}
                <p className="text-sm text-[#E5DFD5] leading-relaxed mb-4 font-normal">
                  {project.description}
                </p>

                <div className="text-xs text-[#FAF7F2] bg-[#121110] p-4 rounded-lg border border-[#2E2A27] mb-6 leading-relaxed font-normal">
                  <strong className="text-[#D5A26A] font-bold">Key Architecture: </strong>
                  {project.longDescription}
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold text-[#FAF7F2] bg-[#23201D] border border-[#3D3834] px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[#2E2A27] flex items-center space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-[#2E2A27] hover:bg-[#3D3834] text-[#FAF7F2] text-xs font-bold rounded-lg transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-[#D5A26A] hover:bg-[#B89269] text-[#121110] text-xs font-bold rounded-lg transition-colors shadow-sm"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </Card3DTilt>
        ))}
      </div>
    </section>
  );
}
