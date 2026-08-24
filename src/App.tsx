import { useState } from 'react';
import { Header } from './components/Header';
import { RadarChartComponent } from './components/RadarChart';
import { HeroCards } from './components/HeroCards';
import { CompanyGrid } from './components/CompanyGrid';
import { RecruiterDrawer } from './components/RecruiterDrawer';
import {
  mockPlacementMetrics,
  mockFeatureHeroCards,
  mockCompanyPacks,
  mockRecruiterTelemetry,
} from './data/mockData';
import { Sparkles, Layers, Cpu, Compass } from 'lucide-react';

export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleSelectCard = (cardId: string) => {
    setSelectedFeature(cardId);
  };

  const handleSelectPack = (packId: string) => {
    alert(`Selected Target Company Pack: ${packId.toUpperCase()}. Feature unlocked in upcoming stages!`);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glow Gradients */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <Header
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
        readinessScore={89}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Banner Section */}
        <section className="glass-panel rounded-3xl p-6 lg:p-8 relative overflow-hidden border border-white/10">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise AI Placement Preparation Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Master 1-on-1 AI Mock Interviews, RAG ATS Resumes & Timed DSA Suite
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed">
              MockMate combines multi-agent AI voice interview panels, hybrid dense/sparse RAG resume scoring, 
              proof-of-skill <strong className="text-purple-400">Resume DNA verification</strong>, WebAssembly sandboxed code execution, 
              and computer vision proctoring.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all"
            >
              <Cpu className="w-4 h-4" />
              <span>Inspect Recruiter Architecture Visualizer</span>
            </button>
            <div className="flex items-center space-x-4 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-semibold text-gray-300">
              <div className="flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Stage 1 Completed: UI Shell & Design Tokens</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid: Radar Chart + 3 Feature Hero Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Radar Chart Column (4 cols on lg) */}
          <div className="lg:col-span-4 h-full">
            <RadarChartComponent metrics={mockPlacementMetrics} />
          </div>

          {/* Hero Feature Cards Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <HeroCards cards={mockFeatureHeroCards} onSelectCard={handleSelectCard} />
          </div>
        </section>

        {/* Modal feedback for feature selection in Stage 1 */}
        {selectedFeature && (
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>
                Feature module <strong>[{selectedFeature}]</strong> selected! Ready for deep integration in upcoming stages.
              </span>
            </div>
            <button
              onClick={() => setSelectedFeature(null)}
              className="text-gray-400 hover:text-white font-bold px-2 py-0.5"
            >
              ✕
            </button>
          </div>
        )}

        {/* Company Prep Packs Grid */}
        <section>
          <CompanyGrid packs={mockCompanyPacks} onSelectPack={handleSelectPack} />
        </section>
      </main>

      {/* Recruiter Architecture Visualizer Drawer */}
      <RecruiterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        telemetry={mockRecruiterTelemetry}
      />

      {/* Footer */}
      <footer className="glass-nav mt-12 py-6 border-t border-white/10 text-center text-xs text-gray-500">
        <p>© 2026 MockMate AI. Enterprise Placement Platform with Proof-of-Skill Resume DNA Verification.</p>
      </footer>
    </div>
  );
}

export default App;
