import React from 'react';
import { Download, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeSection({ onOpenCVModal }) {
  const { personal, experiences, education, certifications, projects } = portfolioData;

  return (
    <section id="resume" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E5DFD5] dark:border-[#2E2A27]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5DFD5] dark:border-[#2E2A27]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#836342] dark:text-[#E5B887] font-bold">
            Official Document
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1816] dark:text-[#FFFFFF] mt-1">
            Curriculum Vitae
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#9E7B56] dark:bg-[#E5B887] hover:bg-[#836342] dark:hover:bg-[#B89269] text-white dark:text-[#121110] text-xs font-bold rounded shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={onOpenCVModal}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-[#1C1A18] text-[#1A1816] dark:text-[#FAF7F2] border border-[#E5DFD5] dark:border-[#3D3834] text-xs font-bold rounded transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#836342] dark:text-[#E5B887]" />
            <span>Fullscreen View</span>
          </button>
        </div>
      </div>

      {/* Embedded Resume View Sheet matching Gemini Page 3 */}
      <div className="bg-white dark:bg-[#1C1A18] p-8 sm:p-12 rounded-lg border border-[#E5DFD5] dark:border-[#3D3834] shadow-paper max-w-4xl mx-auto">
        <div className="border-b-2 border-[#1A1816] dark:border-[#E5B887] pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] dark:text-[#FFFFFF]">{personal.name}</h3>
            <p className="text-xs font-bold text-[#836342] dark:text-[#E5B887] uppercase tracking-wider mt-1">{personal.role}</p>
          </div>
          <div className="text-xs text-[#2C2825] dark:text-[#E5DFD5] font-medium mt-4 sm:mt-0 space-y-1">
            <p>{personal.phone} | {personal.email}</p>
            <p>{personal.location}</p>
            <p className="text-[#836342] dark:text-[#E5B887] font-bold">github.com/vikasyadav098</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#836342] dark:text-[#E5B887] border-b border-[#E5DFD5] dark:border-[#2E2A27] pb-1 mb-2">
            Professional Summary
          </h4>
          <p className="text-xs sm:text-sm text-[#2C2825] dark:text-[#E5DFD5] leading-relaxed font-normal">
            {personal.summary}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#836342] dark:text-[#E5B887] border-b border-[#E5DFD5] dark:border-[#2E2A27] pb-1 mb-2">
            Technical Skills
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2C2825] dark:text-[#E5DFD5] font-normal">
            <p><strong className="text-[#1A1816] dark:text-[#FFFFFF]">Languages:</strong> JavaScript (ES6+), HTML5, CSS3</p>
            <p><strong className="text-[#1A1816] dark:text-[#FFFFFF]">Frontend:</strong> React.js, React Router, Redux/Context API, Tailwind CSS</p>
            <p><strong className="text-[#1A1816] dark:text-[#FFFFFF]">Backend:</strong> Node.js, Express.js, REST API, MVC, CORS</p>
            <p><strong className="text-[#1A1816] dark:text-[#FFFFFF]">Database:</strong> MongoDB, Mongoose, CRUD Operations</p>
            <p><strong className="text-[#1A1816] dark:text-[#FFFFFF]">AI & Automation:</strong> n8n, OpenAI API, Anthropic Claude API, Ollama LLM</p>
            <p><strong className="text-[#1A1816] dark:text-[#FFFFFF]">Tools:</strong> Git, GitHub, Postman, Vite, Vercel, Render, Netlify</p>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#836342] dark:text-[#E5B887] border-b border-[#E5DFD5] dark:border-[#2E2A27] pb-1 mb-3">
            Experience
          </h4>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline text-xs font-bold text-[#1A1816] dark:text-[#FFFFFF]">
                <span>{exp.company} — <span className="font-bold text-[#836342] dark:text-[#E5B887]">{exp.role}</span></span>
                <span className="text-[#694D32] dark:text-[#E5B887]">{exp.period}</span>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-[#2C2825] dark:text-[#E5DFD5] list-disc list-inside font-normal">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5DFD5] dark:border-[#2E2A27]">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#836342] dark:text-[#E5B887] mb-2">Education</h4>
            {education.map((edu, i) => (
              <div key={i} className="text-xs">
                <p className="font-bold text-[#1A1816] dark:text-[#FFFFFF]">{edu.degree}</p>
                <p className="text-[#2C2825] dark:text-[#E5DFD5] font-medium">{edu.institution}</p>
                <p className="text-[11px] text-[#836342] dark:text-[#E5B887] font-bold">{edu.period}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#836342] dark:text-[#E5B887] mb-2">Certifications</h4>
            <ul className="text-xs space-y-1 text-[#2C2825] dark:text-[#E5DFD5] font-normal">
              {certifications.map((c, i) => (
                <li key={i}>• {c.title} ({c.issuer})</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
