import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { WasmCodeRunner } from '../services/wasmCodeRunner';
import type { WasmExecutionResult } from '../services/wasmCodeRunner';
import { sampleDsaProblems, sampleAptitudeQuestions } from '../services/aptitudeQuestions';
import { X, Clock, Play, ShieldCheck, Terminal, Award, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface DsaAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DsaAssessmentModal: React.FC<DsaAssessmentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dsa' | 'aptitude'>('dsa');
  const [selectedDsaIndex, setSelectedDsaIndex] = useState<number>(0);
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>(sampleDsaProblems[0].starterCode['javascript']);
  const [executionResult, setExecutionResult] = useState<WasmExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes = 1800 seconds

  // Aptitude State
  const [selectedAptAnswers, setSelectedAptAnswers] = useState<Record<number, number>>({});
  const [showHintId, setShowHintId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(1800);
      setExecutionResult(null);
      setCode(sampleDsaProblems[selectedDsaIndex].starterCode[language] || sampleDsaProblems[selectedDsaIndex].starterCode['javascript']);
    }
  }, [isOpen, selectedDsaIndex, language]);

  // 30-Minute Timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  if (!isOpen) return null;

  const currentDsa = sampleDsaProblems[selectedDsaIndex];

  const handleRunCode = async () => {
    setIsRunning(true);
    const result = await WasmCodeRunner.executeCode(code, language, currentDsa.testCases);
    setExecutionResult(result);
    setIsRunning(false);
  };

  const handleSimulateTimeout = async () => {
    setIsRunning(true);
    const infiniteLoopCode = `function twoSum(nums, target) {
  while(true) {
    // Infinite Loop Test
  }
}`;
    const result = await WasmCodeRunner.executeCode(infiniteLoopCode, language, currentDsa.testCases);
    setExecutionResult(result);
    setIsRunning(false);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-5xl bg-[#0F1420] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[90vh] text-zinc-200">
        {/* Header */}
        <div className="px-6 py-3.5 glass-nav flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <ShieldCheck className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                Proctored Aptitude & DSA Code Suite
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  SYSTEM 5 & 6
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Monaco Editor + Sandboxed Wasm/Web Worker Execution</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* 30-min Timer Header */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span>Assessment Time:</span>
              <span className="font-mono font-bold text-sm text-zinc-100">{formatTimer(timeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center space-x-2 px-6 py-2 bg-zinc-950 border-b border-zinc-800 shrink-0">
          <button
            onClick={() => setActiveTab('dsa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === 'dsa'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>DSA Coding Challenges (2 Problems)</span>
          </button>

          <button
            onClick={() => setActiveTab('aptitude')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === 'aptitude'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Timed Aptitude Test (30 Questions)</span>
          </button>
        </div>

        {/* Modal Body */}
        {activeTab === 'dsa' ? (
          /* DSA Coding Workspace with Monaco Editor */
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
            {/* Left Panel: Problem Description */}
            <div className="lg:col-span-5 border-r border-zinc-800 p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {sampleDsaProblems.map((prob, pIdx) => (
                    <button
                      key={prob.id}
                      onClick={() => setSelectedDsaIndex(pIdx)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        selectedDsaIndex === pIdx
                          ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                          : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      P{pIdx + 1}
                    </button>
                  ))}
                </div>
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {currentDsa.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-100">{currentDsa.title}</h3>
              <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">{currentDsa.description}</p>

              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <h4 className="text-xs font-semibold text-zinc-300">Visible Test Cases:</h4>
                {currentDsa.testCases.map((tc) => (
                  <div key={tc.id} className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs font-mono">
                    <div className="text-zinc-400">Input: <span className="text-zinc-200">{tc.input}</span></div>
                    <div className="text-zinc-400 mt-0.5">Output: <span className="text-zinc-200">{tc.expectedOutput}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Monaco Editor & Output Console */}
            <div className="lg:col-span-7 flex flex-col min-h-0 bg-[#0B0F17]">
              {/* Language Toolbar */}
              <div className="px-4 py-2 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-zinc-400 font-medium">Language:</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 focus:outline-none"
                  >
                    <option value="javascript">JavaScript (ES6)</option>
                    <option value="python">Python 3</option>
                    <option value="cpp">C++17</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSimulateTimeout}
                    disabled={isRunning}
                    className="px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-medium transition-colors"
                  >
                    Test 2000ms Timeout
                  </button>

                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-3.5 py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-zinc-900" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                </div>
              </div>

              {/* Monaco Code Editor Container */}
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  language={language === 'typescript' ? 'javascript' : language}
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  options={{
                    fontSize: 13,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              {/* Wasm Execution Console Output */}
              {executionResult && (
                <div className="p-4 bg-zinc-950 border-t border-zinc-800 shrink-0 max-h-48 overflow-y-auto space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 font-semibold">
                      {executionResult.status === 'SUCCESS' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={executionResult.status === 'SUCCESS' ? 'text-emerald-400' : 'text-red-400'}>
                        Status: {executionResult.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-[11px] text-zinc-400 font-mono">
                      <span>Exec Time: {executionResult.executionTimeMs}ms</span>
                      <span>Memory: {executionResult.memoryAllocatedMB} MB</span>
                    </div>
                  </div>

                  {executionResult.errorMessage && (
                    <div className="p-2 rounded bg-red-950/50 border border-red-900 text-xs text-red-300 font-mono">
                      {executionResult.errorMessage}
                    </div>
                  )}

                  {executionResult.testResults.length > 0 && (
                    <div className="space-y-1">
                      {executionResult.testResults.map((tr) => (
                        <div key={tr.id} className="text-xs font-mono flex items-center justify-between text-zinc-300">
                          <span>Test Case #{tr.id}: Input ({tr.input})</span>
                          <span className={tr.passed ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                            {tr.passed ? 'PASSED ✓' : 'FAILED ✕'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Timed Aptitude Suite View */
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-100">Timed Aptitude & Logical Reasoning Suite</h3>
                <p className="text-xs text-zinc-400">Quantitative Aptitude, Verbal Ability & Logical Reasoning</p>
              </div>
              <span className="text-xs font-medium text-zinc-400">
                Answered: {Object.keys(selectedAptAnswers).length} / {sampleAptitudeQuestions.length}
              </span>
            </div>

            <div className="space-y-5">
              {sampleAptitudeQuestions.map((q, qIdx) => (
                <div key={q.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-200">Question {qIdx + 1}</span>
                    <span className="px-2 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-800 rounded">
                      {q.category}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-zinc-100">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAptAnswers[q.id] === optIdx;
                      const isCorrect = optIdx === q.correctOptionIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setSelectedAptAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                          className={`p-2.5 rounded-lg text-xs text-left transition-all border ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 font-medium'
                                : 'bg-red-950/60 border-red-800 text-red-300'
                              : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint Toggle */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setShowHintId(showHintId === q.id ? null : q.id)}
                      className="text-zinc-400 hover:text-zinc-200 flex items-center space-x-1 font-medium"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{showHintId === q.id ? 'Hide Hint' : 'Show Step-by-Step Hint'}</span>
                    </button>

                    {selectedAptAnswers[q.id] !== undefined && (
                      <span className="text-zinc-400 text-[11px] font-mono">
                        Solution: {q.solution}
                      </span>
                    )}
                  </div>

                  {showHintId === q.id && (
                    <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
                      💡 <strong>Hint:</strong> {q.hint}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
