import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AchievementsSection() {
  const { certifications } = portfolioData;

  return (
    <section id="achievements" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E5DFD5] dark:border-[#2E2A27]">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-[#694D32] dark:text-[#E5B887] font-bold">
          Credentials & Accomplishments
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1816] dark:text-[#FFFFFF] mt-1">
          Certifications & Milestones
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="editorial-card bg-white dark:bg-[#1C1A18] p-6 rounded-lg border border-[#E5DFD5] dark:border-[#3D3834] flex flex-col justify-between group hover:border-[#9E7B56] dark:hover:border-[#E5B887] transition-all shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded bg-[#F3EDE2] dark:bg-[#2A241E] text-[#836342] dark:text-[#E5B887] flex items-center justify-center border border-[#E8DEC9] dark:border-[#3D3834]">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#694D32] dark:text-[#E5B887] bg-[#F3EDE2] dark:bg-[#2A241E] px-2.5 py-1 rounded border border-[#E8DEC9] dark:border-[#3D3834]">
                  {cert.date}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#1A1816] dark:text-[#FFFFFF] group-hover:text-[#836342] dark:group-hover:text-[#E5B887] transition-colors mb-2">
                {cert.title}
              </h3>

              <p className="text-xs text-[#2C2825] dark:text-[#E5DFD5] font-normal">
                Issued by: <strong className="text-[#1A1816] dark:text-[#FFFFFF] font-bold">{cert.issuer}</strong>
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5DFD5] dark:border-[#2E2A27] flex items-center justify-between text-xs text-[#694D32] dark:text-[#E5B887]">
              <span className="flex items-center space-x-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#836342] dark:text-[#E5B887]" />
                <span>Verified Certificate</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
