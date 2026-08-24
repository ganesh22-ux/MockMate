import React, { useState } from 'react';
import { HybridRagEngine } from '../services/ragEngine';
import type { AtsMatchResult } from '../services/ragEngine';
import { X, FileCode, CheckCircle2, AlertTriangle, ArrowRight, Dna, Sparkles } from 'lucide-react';

interface ResumeAtsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDnaChallenge: (claimedSkills: string[]) => void;
}

export const ResumeAtsModal: React.FC<ResumeAtsModalProps> = ({
  isOpen,
  onClose,
  onLaunchDnaChallenge,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('google');
  const [resumeText, setResumeText] = useState<string>(
    'U Shree Sai Ganesh\nFull-Stack Software Engineer\n\nExperience:\n- Built a web application for placement preparation practice using React.js and Node.js.\n- Worked on database queries and optimized SQL performance for high traffic.\n- Created a mock interview component with speech capabilities and System Design integration.\n- Implemented Data Structures & Algorithms solutions in TypeScript and Python.'
  );

  const [atsResult, setAtsResult] = useState<AtsMatchResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyzeResume = () => {
    const result = HybridRagEngine.analyzeResume(resumeText, selectedCompany);
    setAtsResult(result);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-[#0F1420] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 glass-nav flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <FileCode className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                RAG ATS Resume Reviewer & Resume DNA Verifier
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  SYSTEM 1 & 3
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Hybrid Dense Vector + BM25 Sparse Keyword Search Engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Target Company Selector & Resume Input */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Target Employer / Role</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
              >
                <option value="google">Google - SDE-1 / L4 Systems</option>
                <option value="amazon">Amazon - SDE-1 / L4 Frontend</option>
                <option value="tcs">TCS Digital - SDE & Innovator</option>
                <option value="infosys">Infosys - Power Programmer</option>
                <option value="deloitte">Deloitte USI - Consultant SDE</option>
                <option value="microsoft">Microsoft - Cloud Software Eng</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Candidate Resume Content</label>
              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your raw resume text here..."
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyzeResume}
            className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run Hybrid RAG ATS Analysis & Skill Extraction</span>
          </button>

          {/* Analysis Results */}
          {atsResult && (
            <div className="space-y-5 pt-3 border-t border-zinc-800">
              {/* ATS Scores Breakdown Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400 font-medium">ATS Match Score</div>
                  <div className="text-base font-bold text-zinc-100 mt-1">{atsResult.atsScore}%</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400 font-medium">Dense Vector Sim</div>
                  <div className="text-sm font-semibold text-zinc-300 mt-1">{atsResult.denseVectorScore}</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400 font-medium">BM25 Sparse Score</div>
                  <div className="text-sm font-semibold text-zinc-300 mt-1">{atsResult.bm25SparseScore}</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400 font-medium">RRF Rank Weight</div>
                  <div className="text-sm font-semibold text-zinc-300 mt-1">{atsResult.rrfCompositeScore}</div>
                </div>
              </div>

              {/* Matched vs Missing Keywords */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Matched Keywords ({atsResult.matchedKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {atsResult.matchedKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Keyword Gaps ({atsResult.missingKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {atsResult.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] bg-zinc-800/80 text-zinc-400 border border-zinc-700 rounded">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Google XYZ Formula Bullet Point Transformer */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  Google XYZ Formula Bullet Transformer
                </h4>
                <div className="space-y-2.5">
                  {atsResult.xyzBulletSuggestions.map((b, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                      <div className="text-zinc-500 line-through">Original: {b.original}</div>
                      <div className="text-zinc-200 font-medium flex items-start gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{b.optimized}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume DNA Micro-Challenge Banner */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                    <Dna className="w-4 h-4 text-zinc-300" />
                    🧬 Lock in Your "Verified Resume DNA Badge"
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Take a 3-minute rapid-fire micro-challenge to verify claimed skills: {atsResult.extractedSkills.slice(0, 3).join(', ')}.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onLaunchDnaChallenge(atsResult.extractedSkills);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-colors shrink-0 shadow-sm"
                >
                  Start 3-Min Micro-Challenge
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
