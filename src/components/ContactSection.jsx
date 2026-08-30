import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ContactSection() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#9E7B56', '#D5A26A', '#2C2825']
      });
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E5DFD5] dark:border-[#2E2A27]">
      <div>
        {/* Editorial Header matching Gemini Page 2 */}
        <div className="mb-12 pb-6 border-b border-[#E5DFD5] dark:border-[#2E2A27]">
          <span className="text-xs uppercase tracking-widest text-[#836342] dark:text-[#D5A26A] font-semibold">Initiate Collaboration</span>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#2C2825] dark:text-[#FAF7F2] mt-1">Let’s Build Something</h2>
        </div>

        {/* 2-Column Grid matching Gemini Page 2 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="editorial-card bg-white dark:bg-[#1C1A18] p-8 rounded border border-[#E5DFD5] dark:border-[#2E2A27]">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 bg-[#F3EDE2] dark:bg-[#2E2A27] text-[#9E7B56] dark:text-[#D5A26A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2C2825] dark:text-[#FAF7F2]">Message Transmitted</h3>
                  <p className="text-sm text-[#6B635B] dark:text-[#A0988E] max-w-sm mx-auto">
                    Thank you for reaching out, {formData.name || 'Friend'}! I will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#836342] dark:text-[#D5A26A] uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF7F2] dark:bg-[#121110] border-b border-[#E5DFD5] dark:border-[#2E2A27] focus:border-[#9E7B56] dark:focus:border-[#D5A26A] px-4 py-3 text-sm text-[#2C2825] dark:text-[#FAF7F2] focus:outline-none transition-colors rounded-t"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#836342] dark:text-[#D5A26A] uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF7F2] dark:bg-[#121110] border-b border-[#E5DFD5] dark:border-[#2E2A27] focus:border-[#9E7B56] dark:focus:border-[#D5A26A] px-4 py-3 text-sm text-[#2C2825] dark:text-[#FAF7F2] focus:outline-none transition-colors rounded-t"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#836342] dark:text-[#D5A26A] uppercase tracking-wider mb-2">
                      Project Description
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your project, timeline, or engineering inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF7F2] dark:bg-[#121110] border-b border-[#E5DFD5] dark:border-[#2E2A27] focus:border-[#9E7B56] dark:focus:border-[#D5A26A] px-4 py-3 text-sm text-[#2C2825] dark:text-[#FAF7F2] focus:outline-none transition-colors rounded-t resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#9E7B56] dark:bg-[#D5A26A] hover:bg-[#836342] dark:hover:bg-[#B89269] text-white dark:text-[#121110] font-semibold text-sm rounded shadow-sm hover:shadow transition-all"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Connect Info matching Gemini Page 2 */}
          <div className="lg:col-span-5 pl-0 lg:pl-6 border-l-0 lg:border-l border-[#E5DFD5] dark:border-[#2E2A27]">
            <span className="text-xs uppercase tracking-widest text-[#836342] dark:text-[#D5A26A] font-semibold block mb-4">
              Direct Channels
            </span>

            <div className="space-y-6">
              <a
                href={`mailto:${personal.email}`}
                className="group flex items-center space-x-4 p-4 rounded hover:bg-white dark:hover:bg-[#1C1A18] transition-all border border-transparent hover:border-[#E5DFD5] dark:hover:border-[#2E2A27]"
              >
                <div className="p-3 bg-[#F3EDE2] dark:bg-[#2E2A27] text-[#9E7B56] dark:text-[#D5A26A] rounded group-hover:bg-[#9E7B56] dark:group-hover:bg-[#D5A26A] group-hover:text-white dark:group-hover:text-[#121110] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#836342] dark:text-[#D5A26A] font-medium block">Email</span>
                  <span className="font-serif text-xl font-bold text-[#2C2825] dark:text-[#FAF7F2] group-hover:text-[#9E7B56] dark:group-hover:text-[#D5A26A] transition-colors">
                    {personal.email}
                  </span>
                </div>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-4 rounded hover:bg-white dark:hover:bg-[#1C1A18] transition-all border border-transparent hover:border-[#E5DFD5] dark:hover:border-[#2E2A27]"
              >
                <div className="p-3 bg-[#F3EDE2] dark:bg-[#2E2A27] text-[#9E7B56] dark:text-[#D5A26A] rounded group-hover:bg-[#9E7B56] dark:group-hover:bg-[#D5A26A] group-hover:text-white dark:group-hover:text-[#121110] transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#836342] dark:text-[#D5A26A] font-medium block">LinkedIn Profile</span>
                  <span className="font-serif text-xl font-bold text-[#2C2825] dark:text-[#FAF7F2] group-hover:text-[#9E7B56] dark:group-hover:text-[#D5A26A] transition-colors">
                    vikas-yadav-a4a935390
                  </span>
                </div>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-4 rounded hover:bg-white dark:hover:bg-[#1C1A18] transition-all border border-transparent hover:border-[#E5DFD5] dark:hover:border-[#2E2A27]"
              >
                <div className="p-3 bg-[#F3EDE2] dark:bg-[#2E2A27] text-[#9E7B56] dark:text-[#D5A26A] rounded group-hover:bg-[#9E7B56] dark:group-hover:bg-[#D5A26A] group-hover:text-white dark:group-hover:text-[#121110] transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#836342] dark:text-[#D5A26A] font-medium block">GitHub Profile</span>
                  <span className="font-serif text-xl font-bold text-[#2C2825] dark:text-[#FAF7F2] group-hover:text-[#9E7B56] dark:group-hover:text-[#D5A26A] transition-colors">
                    github.com/vikasyadav098
                  </span>
                </div>
              </a>

              <div className="p-4 bg-[#FAF7F2] dark:bg-[#121110] rounded border border-[#E8DEC9] dark:border-[#2E2A27] space-y-2 mt-6">
                <div className="flex items-center space-x-2 text-xs text-[#6B635B] dark:text-[#A0988E]">
                  <Phone className="w-3.5 h-3.5 text-[#9E7B56] dark:text-[#D5A26A]" />
                  <span>{personal.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#6B635B] dark:text-[#A0988E]">
                  <MapPin className="w-3.5 h-3.5 text-[#9E7B56] dark:text-[#D5A26A]" />
                  <span>{personal.location}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
