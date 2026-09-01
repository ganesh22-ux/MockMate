import React, { useState } from 'react';
import type { RecruiterTelemetry } from '../types';
import { MockMateDatabaseService } from '../services/db';
import { SkillGraphEngine } from '../services/skillGraphEngine';
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
  Network,
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

  const livePrismaLogs = MockMateDatabaseService.getTelemetryTraces();
  const dijkstraResult = SkillGraphEngine.computeDijkstraShortestPath('google');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in">
      {/* Slide-out Panel */}
      <div className="w-full max-w-2xl bg-[#0F1420] border-l border-zinc-700 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 glass-nav flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <Terminal className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                Recruiter Architecture Visualizer
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 animate-pulse" /> Live Telemetry
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Inspect live Prisma queries, vector distances, Wasm stats & Dijkstra paths</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 px-4 py-2 bg-zinc-950 border-b border-zinc-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('prisma')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'prisma'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Prisma DB ({livePrismaLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rag')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'rag'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Hybrid RAG</span>
          </button>

          <button
            onClick={() => setActiveTab('multiagent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'multiagent'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Agent Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('wasm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'wasm'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Wasm Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('proctoring')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'proctoring'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CV Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('dna')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'dna'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>DNA & Graph</span>
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PRISMA DATABASE LOGS */}
          {activeTab === 'prisma' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1">
                  Active Database Engine (Prisma ORM Client)
                </h4>
                <p className="text-xs text-zinc-400">
                  SQLite query trace showing live model executions for User, SkillNode, ResumeAnalysis & AssessmentResult.
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {livePrismaLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span className="text-zinc-200 font-semibold">[{log.id}]</span>
                      <span>{log.timestamp} • {log.durationMs}ms</span>
                    </div>
                    <code className="text-zinc-300 break-all">{log.query}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: HYBRID RAG SCORES */}
          {activeTab === 'rag' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1">
                  Reciprocal Rank Fusion (RRF) RAG Architecture
                </h4>
                <p className="text-xs text-zinc-400">
                  Combines Dense Vector Similarity (Gemini Embeddings) with Sparse Keyword Matching (BM25 Algorithm).
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400 uppercase font-medium">Dense Vector Score</div>
                  <div className="text-base font-bold text-zinc-100 mt-1">
                    {telemetry.ragScores.denseVectorSimilarity}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400 uppercase font-medium">BM25 Sparse Score</div>
                  <div className="text-base font-bold text-zinc-100 mt-1">
                    {telemetry.ragScores.bm25SparseScore}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400 uppercase font-medium">RRF Composite Fusion</div>
                  <div className="text-base font-bold text-zinc-100 mt-1">
                    {telemetry.ragScores.rrfFusionScore}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-zinc-300 mb-2">Extracted Keyword Context:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {telemetry.ragScores.matchedKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg"
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
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1">
                  3-Agent Persona Turn-Taking State Machine
                </h4>
                <p className="text-xs text-zinc-400">
                  Orchestrates Senior Tech Lead, HR Manager, and System Architect agents dynamically during voice interviews.
                </p>
              </div>

              <div className="space-y-2.5">
                {telemetry.multiAgentLogs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-zinc-200">{item.agent}</span>
                        <span className="text-[10px] text-zinc-500">{item.time}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.action}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-semibold rounded ${
                        item.status === 'ACTIVE'
                          ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                          : 'bg-zinc-900 text-zinc-400'
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
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1">
                  Web Worker / WebAssembly Execution Safety Guard
                </h4>
                <p className="text-xs text-zinc-400">
                  Monaco editor code runner isolated with strict 2000ms execution timeout and memory bounds.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-xs text-zinc-400">Execution Time</div>
                  <div className="text-xl font-bold text-zinc-100 mt-1">
                    {telemetry.wasmBenchmark.executionTimeMs}ms
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">
                    Timeout Guard: {telemetry.wasmBenchmark.timeoutLimitMs}ms
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-xs text-zinc-400">Memory Allocated</div>
                  <div className="text-xl font-bold text-zinc-100 mt-1">
                    {telemetry.wasmBenchmark.memoryAllocatedMB} MB
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">Worker Isolation: ACTIVE</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center space-x-2">
                <Zap className="w-4 h-4 text-zinc-400" />
                <span>Status: {telemetry.wasmBenchmark.status}</span>
              </div>
            </div>
          )}

          {/* TAB 5: PROCTORING TELEMETRY */}
          {activeTab === 'proctoring' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1">
                  MediaPipe 468-Point Face Mesh CV Telemetry
                </h4>
                <p className="text-xs text-zinc-400">
                  Real-time eye gaze angles, head pose tilt, multi-face presence, and tab-switch telemetry.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400">Integrity Score</div>
                  <div className="text-lg font-bold text-zinc-100 mt-1">
                    {telemetry.proctoringTelemetry.integrityScore}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400">Faces Detected</div>
                  <div className="text-lg font-bold text-zinc-100 mt-1">
                    {telemetry.proctoringTelemetry.facesDetected}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-400">Gaze Deviations</div>
                  <div className="text-lg font-bold text-zinc-100 mt-1">
                    {telemetry.proctoringTelemetry.gazeDeviations}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RESUME DNA & DIJKSTRA GRAPH */}
          {activeTab === 'dna' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1">
                  🧬 Resume DNA & Dijkstra Shortest Path Roadmap
                </h4>
                <p className="text-xs text-zinc-400">
                  Proof-of-skill verification records and graph algorithm computed learning paths.
                </p>
              </div>

              {/* Dijkstra Graph Telemetry */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Network className="w-4 h-4 text-zinc-400" />
                    Dijkstra Path to Google SDE
                  </span>
                  <span className="text-zinc-400 font-mono">{dijkstraResult.totalHours} Estimated Hours</span>
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Path: {dijkstraResult.pathNodes.map((n) => n.name).join(' ➔ ')}
                </div>
              </div>

              {/* Resume DNA Badges */}
              <div className="space-y-2">
                {telemetry.verifiedDnaBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <BadgeCheck className="w-4 h-4 text-zinc-300" />
                      <div>
                        <div className="text-xs font-bold text-zinc-200">{badge.skill}</div>
                        <div className="text-[10px] text-zinc-500">Verified: {badge.verifiedAt}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-semibold text-zinc-200 bg-zinc-800 border border-zinc-700 rounded">
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
