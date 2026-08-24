import React, { useState } from 'react';
import type { RecruiterTelemetry } from '../types';
import {
  X,
  Database,
  BrainCircuit,
  Users,
  ShieldAlert,
  Cpu,
  BadgeCheck,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';

interface RecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: RecruiterTelemetry;
}

export const RecruiterDrawer: React.FC<RecruiterDrawerProps> = ({ isOpen, onClose, telemetry }) => {
  const [activeTab, setActiveTab] = useState<
    'prisma' | 'rag' | 'multiagent' | 'wasm' | 'proctoring' | 'dna'
  >('prisma');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in">
      {/* Slide-out Panel */}
      <div className="w-full max-w-2xl bg-[#0F1420] border-l border-cyan-500/30 h-full flex flex-col shadow-2xl shadow-cyan-500/10">
        {/* Drawer Header */}
        <div className="px-6 py-4 glass-nav flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Recruiter Architecture Visualizer
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 animate-pulse" /> Live Telemetry
                </span>
              </h2>
              <p className="text-xs text-gray-400">Inspect live Prisma queries, vector distances & agent states</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 px-4 py-2 bg-black/40 border-b border-white/5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('prisma')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'prisma'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Prisma DB</span>
          </button>

          <button
            onClick={() => setActiveTab('rag')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'rag'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Hybrid RAG</span>
          </button>

          <button
            onClick={() => setActiveTab('multiagent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'multiagent'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Agent Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('wasm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'wasm'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Wasm Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('proctoring')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'proctoring'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CV Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('dna')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'dna'
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Resume DNA</span>
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PRISMA DATABASE LOGS */}
          {activeTab === 'prisma' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                  Active Database Engine (Prisma Client)
                </h4>
                <p className="text-xs text-gray-400">
                  SQL/SQLite query trace showing model executions for User, ResumeAnalysis & AssessmentResult.
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {telemetry.prismaLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-black/60 border border-white/10 flex flex-col space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span className="text-cyan-400 font-semibold">[{log.id}]</span>
                      <span>Execution Time: {log.durationMs}ms</span>
                    </div>
                    <code className="text-emerald-300 break-all">{log.query}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: HYBRID RAG SCORES */}
          {activeTab === 'rag' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                  Reciprocal Rank Fusion (RRF) RAG Architecture
                </h4>
                <p className="text-xs text-gray-300">
                  Combines Dense Vector Similarity (Gemini Embeddings) with Sparse Keyword Matching (BM25 Algorithm).
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400 uppercase">Dense Vector Score</div>
                  <div className="text-base font-bold text-cyan-400 mt-1">
                    {telemetry.ragScores.denseVectorSimilarity}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400 uppercase">BM25 Sparse Score</div>
                  <div className="text-base font-bold text-purple-400 mt-1">
                    {telemetry.ragScores.bm25SparseScore}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400 uppercase">RRF Composite Fusion</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">
                    {telemetry.ragScores.rrfFusionScore}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray-300 mb-2">Extracted Keyword Context:</h5>
                <div className="flex flex-wrap gap-2">
                  {telemetry.ragScores.matchedKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-lg"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MULTI-AGENT LOGS */}
          {activeTab === 'multiagent' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                  3-Agent Persona Turn-Taking State Machine
                </h4>
                <p className="text-xs text-gray-300">
                  Orchestrates Senior Tech Lead, HR Manager, and System Architect agents dynamically during voice interviews.
                </p>
              </div>

              <div className="space-y-2.5">
                {telemetry.multiAgentLogs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-blue-400">{item.agent}</span>
                        <span className="text-[10px] text-gray-500">{item.time}</span>
                      </div>
                      <p className="text-xs text-gray-300 mt-0.5">{item.action}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                        item.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : item.status === 'COMPLETED'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WASM BENCHMARKS */}
          {activeTab === 'wasm' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  Web Worker / WebAssembly Execution Safety Guard
                </h4>
                <p className="text-xs text-gray-300">
                  Monaco editor code runner isolated with strict 2000ms execution timeout and memory bounds.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-xs text-gray-400">Execution Time</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    {telemetry.wasmBenchmark.executionTimeMs}ms
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    Timeout Guard: {telemetry.wasmBenchmark.timeoutLimitMs}ms
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-xs text-gray-400">Memory Allocated</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1">
                    {telemetry.wasmBenchmark.memoryAllocatedMB} MB
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Worker Isolation: ACTIVE</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Status: {telemetry.wasmBenchmark.status}</span>
              </div>
            </div>
          )}

          {/* TAB 5: PROCTORING TELEMETRY */}
          {activeTab === 'proctoring' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  MediaPipe 468-Point Face Mesh CV Telemetry
                </h4>
                <p className="text-xs text-gray-300">
                  Real-time eye gaze angles, head pose tilt, multi-face presence, and tab-switch telemetry.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400">Integrity Score</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">
                    {telemetry.proctoringTelemetry.integrityScore}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400">Faces Detected</div>
                  <div className="text-lg font-bold text-cyan-400 mt-1">
                    {telemetry.proctoringTelemetry.facesDetected}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400">Gaze Deviations</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">
                    {telemetry.proctoringTelemetry.gazeDeviations}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RESUME DNA BADGES */}
          {activeTab === 'dna' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
                  🧬 Resume DNA Verified Skills
                </h4>
                <p className="text-xs text-gray-300">
                  Candidate resume skills verified via 3-minute interactive micro-challenges.
                </p>
              </div>

              <div className="space-y-2">
                {telemetry.verifiedDnaBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <BadgeCheck className="w-5 h-5 text-pink-400" />
                      <div>
                        <div className="text-xs font-bold text-white">{badge.skill}</div>
                        <div className="text-[10px] text-gray-400">Verified: {badge.verifiedAt}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      {badge.score}% Score
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
