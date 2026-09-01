import React, { useState } from 'react';
import { SkillGraphEngine } from '../services/skillGraphEngine';
import type { ShortestPathResult } from '../services/skillGraphEngine';
import { X, Network, Compass, ArrowRight, CheckCircle2, Clock, Layers } from 'lucide-react';

interface SkillGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillGraphModal: React.FC<SkillGraphModalProps> = ({ isOpen, onClose }) => {
  const [targetCompany, setTargetCompany] = useState<string>('google');
  const graphNodes = SkillGraphEngine.getGraphNodes();
  const pathResult: ShortestPathResult = SkillGraphEngine.computeDijkstraShortestPath(targetCompany);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-[#0F1420] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 glass-nav flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <Network className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                Skill Dependency Knowledge Graph
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  SYSTEM 7
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Directed Graph with Topological Sort & Dijkstra's Shortest Path Roadmap</p>
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
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Target Company Selector & Dijkstra Summary Header */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-zinc-300" />
                <h3 className="text-sm font-bold text-zinc-100">Dijkstra's Shortest Learning Path</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculates optimal prerequisite skill progression to reach readiness for target employer.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs text-zinc-400 font-medium">Target:</span>
              <select
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-zinc-200 focus:outline-none"
              >
                <option value="google">Google - Systems & Algorithms</option>
                <option value="amazon">Amazon - Scalability & Design</option>
                <option value="tcs">TCS - Dynamic Programming</option>
                <option value="infosys">Infosys - HackWithInfy</option>
                <option value="deloitte">Deloitte - SQL Analytics</option>
                <option value="microsoft">Microsoft - Tree Graphs</option>
              </select>
            </div>
          </div>

          {/* Dijkstra Computed Path Cards */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
              <span>Computed Shortest Path ({pathResult.pathNodes.length} Nodes)</span>
              <span className="flex items-center gap-1 text-zinc-400 font-mono">
                <Clock className="w-3.5 h-3.5" /> Total Estimated Learning: {pathResult.totalHours} Hours
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {pathResult.pathNodes.map((node, idx) => (
                <React.Fragment key={node.id}>
                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center space-x-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'Mastered'
                          ? 'bg-emerald-400'
                          : node.status === 'In Progress'
                          ? 'bg-amber-400'
                          : 'bg-zinc-600'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-zinc-100">{node.name}</div>
                      <div className="text-[9px] text-zinc-400">{node.category} • {node.learningHours}h</div>
                    </div>
                  </div>

                  {idx < pathResult.pathNodes.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Interactive Skill Nodes Network Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-200 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-zinc-400" />
                Directed Knowledge Graph Nodes ({graphNodes.length} Competencies)
              </span>
              <div className="flex items-center space-x-3 text-[10px] normal-case text-zinc-400 font-normal">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Mastered</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> In Progress</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zinc-600" /> Locked</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {graphNodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                    node.status === 'Mastered'
                      ? 'bg-zinc-900/80 border-zinc-700'
                      : node.status === 'In Progress'
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-zinc-950/60 border-zinc-800/80 opacity-75'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] uppercase font-semibold text-zinc-400">{node.category}</span>
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-semibold rounded ${
                          node.difficulty === 'Advanced'
                            ? 'bg-zinc-800 text-zinc-300'
                            : 'bg-zinc-800/60 text-zinc-400'
                        }`}
                      >
                        {node.difficulty}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-zinc-100">{node.name}</h4>
                  </div>

                  <div className="pt-2.5 mt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Est: {node.learningHours} hrs</span>
                    {node.status === 'Mastered' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topological Sorting Order Banner */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Topological Sort Order (Kahn's In-Degree BFS Algorithm)
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              {pathResult.topologicalOrder.join('  ➔  ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
