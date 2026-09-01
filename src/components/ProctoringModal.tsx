import React, { useState, useEffect, useRef } from 'react';
import { ProctoringEngine } from '../services/proctoringEngine';
import type { ProctoringTelemetryData } from '../services/proctoringEngine';
import { X, ShieldAlert, Camera, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ProctoringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProctoringModal: React.FC<ProctoringModalProps> = ({ isOpen, onClose }) => {
  const [telemetry, setTelemetry] = useState<ProctoringTelemetryData>({
    fps: 60,
    integrityScore: 100,
    facesDetected: 1,
    gazeDeviations: 0,
    headTiltAngle: 0,
    tabSwitches: 0,
    warnings: [],
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const proctorEngineRef = useRef<ProctoringEngine | null>(null);

  useEffect(() => {
    if (isOpen) {
      proctorEngineRef.current = new ProctoringEngine();
      if (videoRef.current) {
        proctorEngineRef.current.startProctoring(videoRef.current);
      }
    } else {
      if (proctorEngineRef.current) {
        proctorEngineRef.current.stopProctoring();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      if (proctorEngineRef.current) {
        setTelemetry(proctorEngineRef.current.getTelemetry());
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateMultiFace = () => {
    if (proctorEngineRef.current) {
      proctorEngineRef.current.simulateMultiFaceViolation();
    }
  };

  const handleResetViolations = () => {
    if (proctorEngineRef.current) {
      proctorEngineRef.current.resetViolations();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-[#0F1420] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 glass-nav flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <ShieldAlert className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                MediaPipe 468-Point Face Mesh AI Proctoring
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  SYSTEM 6
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Real-time eye gaze angles, head pose tilt, multi-face & tab-switch telemetry</p>
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
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Camera View Area */}
            <div className="md:col-span-7 relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-video flex items-center justify-center">
              <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" muted playsInline />

              {/* Face Mesh HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-zinc-700/40 m-4 rounded-lg flex flex-col justify-between p-3">
                <div className="flex items-center justify-between text-[10px] text-zinc-300 font-mono bg-black/60 px-2 py-1 rounded backdrop-blur">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3 h-3 text-emerald-400" /> LIVE CAMERA FEED
                  </span>
                  <span>FPS: {telemetry.fps}</span>
                </div>

                <div className="text-[10px] text-zinc-300 font-mono bg-black/60 px-2 py-1 rounded backdrop-blur self-start">
                  Head Tilt: {telemetry.headTiltAngle}°
                </div>
              </div>
            </div>

            {/* Telemetry Metrics & Status */}
            <div className="md:col-span-5 space-y-3">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400 uppercase font-medium">Session Integrity Score</div>
                <div
                  className={`text-2xl font-bold mt-1 ${
                    telemetry.integrityScore >= 80
                      ? 'text-emerald-400'
                      : telemetry.integrityScore >= 60
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  {telemetry.integrityScore}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[9px] text-zinc-400 uppercase">Faces Detected</div>
                  <div className={`text-sm font-bold mt-0.5 ${telemetry.facesDetected > 1 ? 'text-red-400' : 'text-zinc-200'}`}>
                    {telemetry.facesDetected}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-[9px] text-zinc-400 uppercase">Gaze Deviations</div>
                  <div className="text-sm font-bold text-zinc-200 mt-0.5">{telemetry.gazeDeviations}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                <div className="text-[9px] text-zinc-400 uppercase">Tab Switches</div>
                <div className={`text-sm font-bold mt-0.5 ${telemetry.tabSwitches > 0 ? 'text-amber-400' : 'text-zinc-200'}`}>
                  {telemetry.tabSwitches}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSimulateMultiFace}
                  className="flex-1 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-[11px] font-medium transition-colors"
                >
                  Test Multi-Face Alert
                </button>

                <button
                  onClick={handleResetViolations}
                  className="py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-[11px] font-medium transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Active Warnings Log */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Active Proctoring Telemetry Event Log
            </h4>

            {telemetry.warnings.length === 0 ? (
              <div className="text-xs text-zinc-400 flex items-center gap-1.5 py-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero integrity violations detected. Camera feed, eye gaze & focus normal.</span>
              </div>
            ) : (
              <div className="space-y-1">
                {telemetry.warnings.map((w, idx) => (
                  <div key={idx} className="text-xs text-amber-300 font-mono flex items-center gap-1.5">
                    <span>•</span> {w}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
