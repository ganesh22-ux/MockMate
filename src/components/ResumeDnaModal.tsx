import React, { useState, useEffect } from 'react';
import { ResumeDnaEngine } from '../services/resumeDnaEngine';
import type { MicroChallengeQuestion, DnaVerificationResult } from '../services/resumeDnaEngine';
import { X, Clock, Award, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ResumeDnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimedSkills: string[];
  onCompleteVerification: (result: DnaVerificationResult) => void;
}

export const ResumeDnaModal: React.FC<ResumeDnaModalProps> = ({
  isOpen,
  onClose,
  claimedSkills,
  onCompleteVerification,
}) => {
  const [questions, setQuestions] = useState<MicroChallengeQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(180); // 3 minutes = 180s
  const [evaluationResult, setEvaluationResult] = useState<DnaVerificationResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      const qList = ResumeDnaEngine.generate3MinMicroChallenge(claimedSkills);
      setQuestions(qList);
      setUserAnswers({});
      setTimeLeft(180);
      setEvaluationResult(null);
    }
  }, [isOpen, claimedSkills]);

  // 180s Countdown Timer
  useEffect(() => {
    if (!isOpen || evaluationResult !== null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, evaluationResult]);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    const result = ResumeDnaEngine.evaluateMicroChallenge(userAnswers, questions);
    setEvaluationResult(result);
    onCompleteVerification(result);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-[#0F1420] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 glass-nav flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <ShieldCheck className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                🧬 Resume DNA Micro-Challenge
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  3-Min Verification
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Prove claimed resume skills to earn your Recruiter-Verified Badge</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 space-y-5">
          {/* Timer & Progress Bar */}
          {!evaluationResult && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-300">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>Time Remaining:</span>
                <span className="text-zinc-100 font-mono font-bold text-sm">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-xs text-zinc-400">
                Questions Answered: <strong>{Object.keys(userAnswers).length} / {questions.length}</strong>
              </div>
            </div>
          )}

          {/* Results State */}
          {evaluationResult ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-zinc-800 border border-zinc-700 mb-2">
                {evaluationResult.passed ? (
                  <Award className="w-12 h-12 text-zinc-100" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-zinc-400" />
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-zinc-100">
                  {evaluationResult.passed ? '🧬 Resume DNA Skill Verification Passed!' : 'Micro-Challenge Complete'}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  You scored <strong className="text-zinc-100">{evaluationResult.scorePercentage}%</strong> on rapid-fire skill evaluation.
                </p>
              </div>

              {evaluationResult.passed ? (
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-left space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Unlocked Badge: Verified Resume DNA</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {evaluationResult.verifiedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-md"
                      >
                        ✓ {sk} Verified
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
                  Review your skill gaps and retake the 3-minute challenge anytime to earn your verified badge.
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-colors"
              >
                Close & Return to Dashboard
              </button>
            </div>
          ) : (
            /* Questions Flow */
            <div className="space-y-6">
              {questions.map((q, qIdx) => (
                <div key={q.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-300">Question {qIdx + 1} of {questions.length}</span>
                    <span className="px-2 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-800 rounded">
                      Tested Skill: {q.skill}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-100">{q.question}</p>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg text-xs transition-all border ${
                            isSelected
                              ? 'bg-zinc-800 border-zinc-600 text-zinc-100 font-medium'
                              : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length === 0}
                className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white disabled:opacity-50 text-zinc-900 font-semibold text-xs transition-colors"
              >
                Submit Micro-Challenge Answers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
