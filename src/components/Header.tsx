import React from 'react';
import { Cpu, Flame, Shield, Terminal } from 'lucide-react';

interface HeaderProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
  readinessScore: number;
}

export const Header: React.FC<HeaderProps> = ({ onToggleDrawer, isDrawerOpen, readinessScore }) => {
  return (
    <header className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand Logo & Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
          <Cpu className="w-4 h-4 text-zinc-300" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold tracking-tight text-zinc-100">MockMate</h1>
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              v2.4
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-normal">AI Placement Preparation Platform</p>
        </div>
      </div>

      {/* Subtle Status Indicators */}
      <div className="flex items-center space-x-3 lg:space-x-5">
        {/* Placement Readiness Index */}
        <div className="hidden sm:flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-medium text-zinc-400">Placement Readiness</div>
            <div className="text-xs font-semibold text-zinc-200">{readinessScore}% • High Trajectory</div>
          </div>
          <div className="w-7 h-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-200 text-xs">
            {readinessScore}
          </div>
        </div>

        {/* Daily Streak */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
          <Flame className="w-3.5 h-3.5 text-zinc-400" />
          <span>7d Streak</span>
        </div>

        {/* Proctoring Status */}
        <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
          <Shield className="w-3.5 h-3.5 text-zinc-400" />
          <span>CV Proctor Ready</span>
        </div>

        {/* Recruiter Architecture Visualizer Drawer Toggle */}
        <button
          onClick={onToggleDrawer}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isDrawerOpen
              ? 'bg-zinc-200 text-zinc-900 font-semibold'
              : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Recruiter Drawer</span>
        </button>
      </div>
    </header>
  );
};
