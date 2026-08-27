import { useState } from 'react';
import { Header } from './components/Header';
import { RadarChartComponent } from './components/RadarChart';
import { HeroCards } from './components/HeroCards';
import { CompanyGrid } from './components/CompanyGrid';
import { RecruiterDrawer } from './components/RecruiterDrawer';
import { ResumeAtsModal } from './components/ResumeAtsModal';
import { ResumeDnaModal } from './components/ResumeDnaModal';
import { VoiceInterviewModal } from './components/VoiceInterviewModal';
import { DsaAssessmentModal } from './components/DsaAssessmentModal';
import {
  mockPlacementMetrics,
  mockFeatureHeroCards,
  mockCompanyPacks,
  mockRecruiterTelemetry,
} from './data/mockData';
import type { DnaVerificationResult } from './services/resumeDnaEngine';
import { Layers, Terminal, Sparkles, CheckCircle2, Mic, Code } from 'lucide-react';

export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isDnaModalOpen, setIsDnaModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isDsaModalOpen, setIsDsaModalOpen] = useState(false);
  const [dnaClaimedSkills, setDnaClaimedSkills] = useState<string[]>(['React.js', 'SQL', 'System Design']);
  const [verifiedDnaBadge, setVerifiedDnaBadge] = useState<DnaVerificationResult | null>(null);

  const handleSelectCard = (cardId: string) => {
    if (cardId === 'ats-resume-dna') {
      setIsAtsModalOpen(true);
    } else if (cardId === 'voice-interview') {
      setIsVoiceModalOpen(true);
    } else if (cardId === 'wasm-dsa-proctor') {
      setIsDsaModalOpen(true);
    }
  };

  const handleSelectPack = (_packId: string) => {
    setIsAtsModalOpen(true);
  };

  const handleLaunchDnaChallenge = (skills: string[]) => {
    setDnaClaimedSkills(skills);
    setIsDnaModalOpen(true);
  };

  const handleCompleteVerification = (result: DnaVerificationResult) => {
    if (result.passed) {
      setVerifiedDnaBadge(result);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-200 flex flex-col font-sans">
      {/* Header */}
      <Header
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
        readinessScore={verifiedDnaBadge?.passed ? 94 : 89}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        {/* Banner Section */}
        <section className="glass-panel rounded-xl p-6 relative overflow-hidden border border-zinc-800">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              <span>AI Placement Preparation Platform</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
              1-on-1 AI Mock Interviews, RAG ATS Resumes & Timed DSA Suite
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              MockMate integrates multi-agent AI voice interviews, hybrid dense/sparse RAG resume scoring, 
              proof-of-skill <strong className="text-zinc-200">Resume DNA verification</strong>, WebAssembly code execution, 
              and computer vision proctoring into a clean, unified workflow.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-colors flex items-center space-x-2 shadow-sm"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>1-on-1 AI Voice Interview</span>
            </button>

            <button
              onClick={() => setIsDsaModalOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs transition-colors flex items-center space-x-2"
            >
              <Code className="w-3.5 h-3.5 text-zinc-400" />
              <span>Monaco DSA & Wasm Suite</span>
            </button>

            <button
              onClick={() => setIsAtsModalOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>RAG ATS & Resume DNA</span>
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs transition-colors flex items-center space-x-2"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Recruiter Drawer</span>
            </button>
          </div>
        </section>

        {/* Verified Resume DNA Badge Display */}
        {verifiedDnaBadge?.passed && (
          <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs flex items-center justify-between animate-fade-in">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-semibold text-zinc-100">🧬 Verified Resume DNA Badge Active!</span>
                <span className="text-zinc-400 ml-2">
                  Verified Skills: {verifiedDnaBadge.verifiedSkills.join(', ')} ({verifiedDnaBadge.scorePercentage}% Score)
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded">
              Readiness Boost +5%
            </span>
          </div>
        )}

        {/* Dashboard Grid: Radar Chart + 3 Hero Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 h-full">
            <RadarChartComponent metrics={mockPlacementMetrics} />
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <HeroCards cards={mockFeatureHeroCards} onSelectCard={handleSelectCard} />
          </div>
        </section>

        {/* Company Prep Packs Grid */}
        <section>
          <CompanyGrid packs={mockCompanyPacks} onSelectPack={handleSelectPack} />
        </section>
      </main>

      {/* Proctored Monaco DSA Code Runner & Timed Aptitude Suite Modal */}
      <DsaAssessmentModal
        isOpen={isDsaModalOpen}
        onClose={() => setIsDsaModalOpen(false)}
      />

      {/* 1-on-1 Multi-Agent AI Voice Interview Modal */}
      <VoiceInterviewModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

      {/* RAG ATS Resume Scorer Modal */}
      <ResumeAtsModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        onLaunchDnaChallenge={handleLaunchDnaChallenge}
      />

      {/* Resume DNA 3-Minute Micro-Challenge Modal */}
      <ResumeDnaModal
        isOpen={isDnaModalOpen}
        onClose={() => setIsDnaModalOpen(false)}
        claimedSkills={dnaClaimedSkills}
        onCompleteVerification={handleCompleteVerification}
      />

      {/* Recruiter Drawer */}
      <RecruiterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        telemetry={mockRecruiterTelemetry}
      />

      {/* Minimal Footer */}
      <footer className="glass-nav mt-8 py-4 border-t border-zinc-800 text-center text-[11px] text-zinc-500">
        <p>© 2026 MockMate AI. Enterprise Placement Platform with Proof-of-Skill Resume DNA Verification.</p>
      </footer>
    </div>
  );
}

export default App;
