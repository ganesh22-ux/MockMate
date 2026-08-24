import React from 'react';
import { Cpu, Flame, Shield, Terminal, Sparkles } from 'lucide-react';

interface HeaderProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
  readinessScore: number;
}

export const Header: React.FC<HeaderProps> = ({ onToggleDrawer, isDrawerOpen, readinessScore }) => {
  return (
    <header className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Brand Logo & Tagline */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
          <Cpu className="w-5 h-5 text-white animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-white">MockMate</h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> AI v2.4
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium">Enterprise Placement Preparation Platform</p>
        </div>
      </div>

      {/* Center/Right Status Indicators */}
      <div className="flex items-center space-x-3 lg:space-x-6">
        {/* Placement Readiness Index Indicator */}
        <div className="hidden sm:flex items-center space-x-3 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="text-right">
            <div className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Placement Readiness</div>
            <div className="text-sm font-bold text-gradient-cyan">{readinessScore}% - High Offer Rate</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm">
            {readinessScore}
          </div>
        </div>

        {/* Daily Streak */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span>7 Day Streak</span>
        </div>

        {/* Proctoring Camera Telemetry Status */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Shield className="w-4 h-4" />
          <span>CV Proctor Ready</span>
        </div>

        {/* Recruiter Architecture Visualizer Drawer Toggle */}
        <button
          onClick={onToggleDrawer}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            isDrawerOpen
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
              : 'bg-white/5 hover:bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span className="hidden sm:inline">Recruiter Arch Visualizer</span>
        </button>
      </div>
    </header>
  );
};
