import React, { useState, useEffect, useRef } from 'react';
import { AudioStreamService } from '../services/audioStreamService';
import { MultiAgentOrchestrator } from '../services/multiAgentOrchestrator';
import type { AgentPersonaType, InterviewMessage, StarFeedbackScorecard } from '../services/multiAgentOrchestrator';
import { AudioWaveform } from './AudioWaveform';
import { X, Mic, MicOff, Award, Users, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface VoiceInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceInterviewModal: React.FC<VoiceInterviewModalProps> = ({ isOpen, onClose }) => {
  const [activeAgent, setActiveAgent] = useState<AgentPersonaType>('Senior Tech Lead');
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(new Uint8Array(32));
  const [scorecard, setScorecard] = useState<StarFeedbackScorecard | null>(null);

  const audioServiceRef = useRef<AudioStreamService | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      audioServiceRef.current = new AudioStreamService();
      audioServiceRef.current.initAudioInput();

      // Initial opening greeting from Senior Tech Lead
      const initialMsg: InterviewMessage = {
        id: 'msg-0',
        sender: 'Senior Tech Lead',
        agentName: MultiAgentOrchestrator.agentPersonas['Senior Tech Lead'].name,
        text: "Welcome to your MockMate 1-on-1 Panel Interview! I'm Alex Vance, Senior Tech Lead. To begin, tell me about a complex project you built and the key engineering challenges you faced.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([initialMsg]);
      setScorecard(null);

      // Speak initial prompt
      setIsSpeaking(true);
      audioServiceRef.current.speakText(initialMsg.text, () => setIsSpeaking(false));
    } else {
      if (audioServiceRef.current) {
        audioServiceRef.current.cleanup();
      }
    }
  }, [isOpen]);

  // Frequency spectrum updater for Canvas
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      if (audioServiceRef.current) {
        setFrequencyData(audioServiceRef.current.getFrequencyData());
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleToggleMic = () => {
    if (!audioServiceRef.current) return;

    if (isRecording) {
      audioServiceRef.current.stopSpeechRecognition();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      audioServiceRef.current.startSpeechRecognition(
        (transcript, isFinal) => {
          setCurrentInput(transcript);
          if (isFinal) {
            handleSendCandidateMessage(transcript);
          }
        },
        () => setIsRecording(false)
      );
    }
  };

  const handleSendCandidateMessage = (textToSend?: string) => {
    const text = textToSend || currentInput;
    if (!text.trim()) return;

    const candidateMsg: InterviewMessage = {
      id: `msg-${Date.now()}`,
      sender: 'candidate',
      text,
      timestamp: new Date().toLocaleTimeString(),
    };

    const newMessages = [...messages, candidateMsg];
    setMessages(newMessages);
    setCurrentInput('');
    setIsRecording(false);

    if (audioServiceRef.current) {
      audioServiceRef.current.stopSpeechRecognition();
    }

    // 🤖 Multi-Agent Turn-Taking Logic
    const nextAgent = MultiAgentOrchestrator.determineNextAgent(text, activeAgent);
    setActiveAgent(nextAgent);

    setTimeout(() => {
      const responseText = MultiAgentOrchestrator.generateAgentResponse(nextAgent, text);
      const agentMsg: InterviewMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: nextAgent,
        agentName: MultiAgentOrchestrator.agentPersonas[nextAgent].name,
        text: responseText,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsSpeaking(true);

      if (audioServiceRef.current) {
        audioServiceRef.current.speakText(responseText, () => setIsSpeaking(false));
      }
    }, 1000);
  };

  const handleFinishInterview = () => {
    const result = MultiAgentOrchestrator.generateStarScorecard(messages);
    setScorecard(result);
  };

  const activePersonaObj = MultiAgentOrchestrator.agentPersonas[activeAgent];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-[#0F1420] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 glass-nav flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <Users className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                1-on-1 Multi-Agent AI Voice Interview
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  SYSTEM 2 & 4
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Live WebSocket audio streaming with 3 dynamic agent personas</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!scorecard && messages.length > 2 && (
              <button
                onClick={handleFinishInterview}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold transition-colors"
              >
                End Session & View STAR Scorecard
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {scorecard ? (
          /* STAR Feedback Scorecard View */
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-zinc-800 border border-zinc-700">
                <Award className="w-8 h-8 text-zinc-200" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Interview Performance & STAR Scorecard</h3>
              <p className="text-xs text-zinc-400">Multi-agent evaluation of communication, technical depth, and response structuring</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400 uppercase font-medium">STAR Overall Score</div>
                <div className="text-xl font-bold text-zinc-100 mt-1">{scorecard.overallStarScore}%</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400 uppercase font-medium">Confidence Rating</div>
                <div className="text-xl font-bold text-zinc-200 mt-1">{scorecard.communicationConfidenceScore}%</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400 uppercase font-medium">Filler Word Count</div>
                <div className="text-xl font-bold text-zinc-300 mt-1">{scorecard.fillerWordCount}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400 uppercase font-medium">Speech Latency</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">&lt; 180ms</div>
              </div>
            </div>

            {/* STAR Breakdown Grid */}
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400">Situation (S)</div>
                <div className="text-sm font-semibold text-zinc-200 mt-1">{scorecard.situationScore}%</div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400">Task (T)</div>
                <div className="text-sm font-semibold text-zinc-200 mt-1">{scorecard.taskScore}%</div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400">Action (A)</div>
                <div className="text-sm font-semibold text-zinc-200 mt-1">{scorecard.actionScore}%</div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400">Result (R)</div>
                <div className="text-sm font-semibold text-zinc-200 mt-1">{scorecard.resultScore}%</div>
              </div>
            </div>

            {/* Strengths & Improvement Areas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Key Strengths</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {scorecard.keyStrengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span> {str}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-200">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Areas for Improvement</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {scorecard.improvementAreas.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-colors"
            >
              Complete & Close Interview Session
            </button>
          </div>
        ) : (
          /* Active Interview Chat & Audio Controls */
          <div className="flex-1 flex flex-col min-h-0">
            {/* 3 Personas Panel Indicator */}
            <div className="px-6 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-zinc-400">Active Interviewer:</span>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${activePersonaObj.avatarColor}`}>
                  🤖 {activePersonaObj.name}
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 hidden sm:inline">
                Focus: {activePersonaObj.focusArea}
              </span>
            </div>

            {/* Message History Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => {
                const isCandidate = msg.sender === 'candidate';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCandidate ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-2 mb-1 text-[10px] text-zinc-400">
                      <span>{isCandidate ? 'You (Candidate)' : msg.agentName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-xl p-3.5 rounded-xl text-xs leading-relaxed border ${
                        isCandidate
                          ? 'bg-zinc-800 border-zinc-700 text-zinc-100 rounded-tr-none'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Bottom Audio Visualizer & Control Console */}
            <div className="p-4 glass-nav border-t border-zinc-800 space-y-3 shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Audio Waveform Canvas */}
                <div className="md:col-span-8">
                  <AudioWaveform
                    isRecording={isRecording}
                    isSpeaking={isSpeaking}
                    frequencyData={frequencyData}
                  />
                </div>

                {/* Mic & Send Actions */}
                <div className="md:col-span-4 flex items-center space-x-2">
                  <button
                    onClick={handleToggleMic}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-zinc-300" />}
                    <span>{isRecording ? 'Stop Mic' : 'Start Voice Mic'}</span>
                  </button>
                </div>
              </div>

              {/* Text Input Fallback */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendCandidateMessage()}
                  placeholder="Type your response or speak into your microphone..."
                  className="flex-1 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700"
                />
                <button
                  onClick={() => handleSendCandidateMessage()}
                  disabled={!currentInput.trim()}
                  className="px-4 py-2.5 rounded-lg bg-zinc-100 hover:bg-white disabled:opacity-40 text-zinc-900 font-semibold text-xs transition-colors flex items-center space-x-1"
                >
                  <span>Send</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
