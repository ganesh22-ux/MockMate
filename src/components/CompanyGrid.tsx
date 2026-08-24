import React from 'react';
import type { CompanyPrepPack } from '../types';
import { Building2, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CompanyGridProps {
  packs: CompanyPrepPack[];
  onSelectPack: (packId: string) => void;
}

export const CompanyGrid: React.FC<CompanyGridProps> = ({ packs, onSelectPack }) => {
  return (
    <div className="glass-panel rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Target Company Placement Packs</h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Curated ATS keyword patterns, real interview question banks, and aptitude tests
          </p>
        </div>
        <span className="text-xs font-semibold text-gray-400">6 Major Companies</span>
      </div>

      {/* Grid of Company Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packs.map((pack) => (
          <div
            key={pack.id}
            onClick={() => onSelectPack(pack.id)}
            className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Logo & Difficulty Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${pack.logoColor} flex items-center justify-center font-black text-white text-sm shadow-md`}
                  >
                    {pack.companyName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {pack.companyName}
                    </h3>
                    <div className="text-[10px] text-gray-400 font-medium">
                      {pack.questionCount} Questions & Answers
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-md border ${
                    pack.difficulty === 'Extreme'
                      ? 'bg-red-500/10 text-red-400 border-red-500/30'
                      : pack.difficulty === 'High'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {pack.difficulty}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{pack.tagline}</p>

              {/* Roles Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pack.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] font-semibold text-gray-300 bg-white/5 rounded-md border border-white/5"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Readiness Meter */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-semibold text-gray-300">
                  Readiness: <strong className="text-emerald-400">{pack.readinessScore}%</strong>
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
