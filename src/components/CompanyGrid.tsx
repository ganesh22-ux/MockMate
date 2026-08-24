import React from 'react';
import type { CompanyPrepPack } from '../types';
import { Building2, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CompanyGridProps {
  packs: CompanyPrepPack[];
  onSelectPack: (packId: string) => void;
}

export const CompanyGrid: React.FC<CompanyGridProps> = ({ packs, onSelectPack }) => {
  return (
    <div className="glass-panel rounded-xl p-5 border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-zinc-300" />
            <h2 className="text-sm font-semibold text-zinc-100">Target Company Placement Packs</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Curated ATS keyword patterns and real interview question banks
          </p>
        </div>
        <span className="text-xs text-zinc-400 font-medium">6 Companies</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {packs.map((pack) => (
          <div
            key={pack.id}
            onClick={() => onSelectPack(pack.id)}
            className="p-3.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-200 text-xs">
                    {pack.companyName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-100 group-hover:text-white">
                      {pack.companyName}
                    </h3>
                    <div className="text-[10px] text-zinc-400 font-normal">
                      {pack.questionCount} Questions
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 text-[9px] font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded">
                  {pack.difficulty}
                </span>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">{pack.tagline}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {pack.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] font-normal text-zinc-300 bg-zinc-800/60 border border-zinc-700/60 rounded"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3 h-3 text-zinc-400" />
                <span className="text-[11px] text-zinc-300 font-medium">
                  Readiness: <strong className="text-zinc-100">{pack.readinessScore}%</strong>
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
