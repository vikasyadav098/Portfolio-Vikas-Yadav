import React from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Card3DTilt from './Card3DTilt';

export default function ExperienceSection() {
  const { experiences, education } = portfolioData;

  return (
    <section id="experience" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2E2A27]">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-[#D5A26A] font-bold">
          Career Journey
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#FAF7F2] mt-1">
          Experience & Education
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Work Experience Timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-[#2E2A27] text-[#D5A26A] rounded-lg border border-[#3D3834]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#FAF7F2]">
              Professional Experience
            </h3>
          </div>

          <div className="relative pl-6 border-l-2 border-[#D5A26A] space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-[#121110] border-2 border-[#D5A26A] group-hover:bg-[#D5A26A] transition-colors" />

                <Card3DTilt>
                  <div className="editorial-card bg-[#1C1A18] p-6 rounded-xl border border-[#3D3834] shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D5A26A] bg-[#2A241E] px-3 py-1 rounded border border-[#3D3834]">
                        {exp.period}
                      </span>
                      <span className="text-xs text-[#A0988E] font-medium flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D5A26A]" />
                        <span>{exp.location}</span>
                      </span>
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-[#FAF7F2] mt-2">
                      {exp.company}
                    </h4>
                    <p className="text-sm font-bold text-[#D5A26A] mb-4">
                      {exp.role}
                    </p>

                    <ul className="space-y-3 text-xs sm:text-sm text-[#E5DFD5] leading-relaxed font-normal">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex items-start space-x-2.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D5A26A] mt-2 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card3DTilt>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-[#2E2A27] text-[#D5A26A] rounded-lg border border-[#3D3834]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FAF7F2]">
                Education
              </h3>
            </div>

            {education.map((edu, idx) => (
              <Card3DTilt key={idx}>
                <div className="editorial-card bg-[#1C1A18] p-6 rounded-xl border border-[#3D3834] shadow-xl">
                  <span className="text-xs font-bold text-[#D5A26A] uppercase tracking-wider block mb-2">
                    {edu.period}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                    {edu.degree}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-[#D5A26A] mt-1">
                    {edu.major}
                  </p>
                  <p className="text-xs text-[#A0988E] mt-3 pt-3 border-t border-[#2E2A27] font-medium">
                    {edu.institution}
                  </p>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
