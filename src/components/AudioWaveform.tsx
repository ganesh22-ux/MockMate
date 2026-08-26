import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording: boolean;
  isSpeaking: boolean;
  frequencyData: Uint8Array;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isRecording,
  isSpeaking,
  frequencyData,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw background baseline
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const bars = 24;
      const barWidth = 4;
      const gap = (width - bars * barWidth) / (bars + 1);

      for (let i = 0; i < bars; i++) {
        let val = frequencyData[i % frequencyData.length] || 30;

        if (!isRecording && !isSpeaking) {
          val = 10 + Math.sin(Date.now() / 300 + i) * 5;
        } else if (isSpeaking) {
          val = Math.floor(Math.random() * 180) + 40;
        }

        const percent = val / 255;
        const barHeight = Math.max(4, percent * height * 0.8);

        const x = gap + i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = isSpeaking
          ? 'rgba(168, 85, 247, 0.8)' // Purple for AI speaking
          : isRecording
          ? 'rgba(56, 189, 248, 0.8)' // Cyan for Candidate mic
          : 'rgba(113, 113, 122, 0.4)'; // Neutral grey for idle

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRecording, isSpeaking, frequencyData]);

  return (
    <div className="flex items-center justify-center p-3 rounded-lg bg-zinc-950 border border-zinc-800">
      <canvas ref={canvasRef} width={280} height={40} className="w-full h-10" />
    </div>
  );
};
