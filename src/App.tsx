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
import { Layers, Terminal } from 'lucide-react';

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
    <div className="min-h-screen bg-[#090A0F] text-zinc-200 flex flex-col font-sans">
      {/* Header */}
      <Header
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
        readinessScore={89}
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

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-colors flex items-center space-x-2 shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Inspect Recruiter Architecture Drawer</span>
            </button>
            <div className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 flex items-center space-x-1.5">
              <span>Stage 2 Complete • Prisma Database & SQLite Active</span>
            </div>
          </div>
        </section>

        {/* Dashboard Grid: Radar Chart + 3 Hero Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 h-full">
            <RadarChartComponent metrics={mockPlacementMetrics} />
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <HeroCards cards={mockFeatureHeroCards} onSelectCard={handleSelectCard} />
          </div>
        </section>

        {/* Feedback Alert */}
        {selectedFeature && (
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs flex items-center justify-between">
            <span>
              Module <strong>[{selectedFeature}]</strong> selected. Deep functionality will activate in upcoming stages!
            </span>
            <button
              onClick={() => setSelectedFeature(null)}
              className="text-zinc-500 hover:text-zinc-300 font-bold px-2 py-0.5"
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
