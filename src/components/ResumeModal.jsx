import React from 'react';
import { X, Download, Printer, CheckCircle, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { personal, experiences, education, certifications, projects } = portfolioData;

  const handleDownload = () => {
    // Generate print / PDF trigger
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2825]/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-4xl w-full rounded-lg shadow-2xl border border-[#E5DFD5] overflow-hidden my-8 relative">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#FAF7F2] border-b border-[#E5DFD5] p-4 flex items-center justify-between z-10 px-8">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#9E7B56]" />
            <h2 className="font-serif text-2xl font-bold text-[#2C2825]">Curriculum Vitae</h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#9E7B56] hover:bg-[#836342] text-white text-xs font-semibold rounded transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#6B635B] hover:text-[#2C2825] rounded-full hover:bg-[#E8DEC9]/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet matching Gemini Reference Page 3 */}
        <div className="p-8 sm:p-12 max-h-[80vh] overflow-y-auto bg-white m-4 sm:m-8 rounded border border-[#E5DFD5] shadow-sm font-sans">
          
          {/* Resume Name Header */}
          <div className="border-b border-[#2C2825] pb-4 mb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h1 className="font-serif text-4xl font-bold text-[#2C2825] tracking-tight">{personal.name}</h1>
              <p className="text-sm font-semibold text-[#9E7B56] uppercase tracking-wider mt-1">{personal.role}</p>
            </div>
            <div className="text-xs text-[#6B635B] mt-4 sm:mt-0 text-left sm:text-right space-y-1">
              <p>{personal.phone} | {personal.email}</p>
              <p>{personal.location}</p>
              <p className="text-[#9E7B56] font-medium">github.com/vikasyadav098 | linkedin.com/in/vikas-yadav-a4a935390</p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#836342] border-b border-[#E5DFD5] pb-1 mb-2">
              Professional Summary
            </h3>
            <p className="text-xs text-[#3D3834] leading-relaxed font-light">
              {personal.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#836342] border-b border-[#E5DFD5] pb-1 mb-2">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3D3834]">
              <p><strong>Languages:</strong> JavaScript (ES6+), HTML5, CSS3</p>
              <p><strong>Frontend:</strong> React.js, React Router, Redux/Context API, Tailwind CSS</p>
              <p><strong>Backend:</strong> Node.js, Express.js, REST API, MVC Architecture, CORS</p>
              <p><strong>Database:</strong> MongoDB, Mongoose, CRUD Operations</p>
              <p><strong>AI & Automation:</strong> n8n, OpenAI API, Anthropic Claude API, Ollama LLM, Prompt Engineering</p>
              <p><strong>Tools:</strong> Git, GitHub, Postman, Vite, Vercel, Render, Netlify</p>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#836342] border-b border-[#E5DFD5] pb-1 mb-3">
              Experience
            </h3>
            {experiences.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-baseline text-xs font-bold text-[#2C2825]">
                  <span>{exp.company} — <span className="font-normal text-[#9E7B56]">{exp.role}</span></span>
                  <span>{exp.period}</span>
                </div>
                <ul className="mt-2 space-y-1 text-[11px] text-[#6B635B] list-disc list-inside">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#836342] border-b border-[#E5DFD5] pb-1 mb-3">
              Key Projects
            </h3>
            {projects.slice(0, 2).map((p, idx) => (
              <div key={idx} className="mb-3 text-xs">
                <div className="flex justify-between font-bold text-[#2C2825]">
                  <span>{p.title} <span className="font-normal text-[#6B635B]">({p.tags.slice(0, 4).join(', ')})</span></span>
                </div>
                <p className="text-[11px] text-[#6B635B] mt-1 leading-normal">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5DFD5]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#836342] mb-2">Education</h3>
              {education.map((edu, i) => (
                <div key={i} className="text-xs">
                  <p className="font-bold text-[#2C2825]">{edu.degree}</p>
                  <p className="text-[#6B635B]">{edu.institution}</p>
                  <p className="text-[11px] text-[#9E7B56]">{edu.period}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#836342] mb-2">Certifications</h3>
              <ul className="text-xs space-y-1 text-[#6B635B]">
                {certifications.map((c, i) => (
                  <li key={i}>• {c.title} ({c.issuer})</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
