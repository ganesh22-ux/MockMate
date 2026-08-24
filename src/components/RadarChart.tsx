import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { PlacementMetric } from '../types';
import { Award, Zap } from 'lucide-react';

interface RadarChartProps {
  metrics: PlacementMetric[];
}

export const RadarChartComponent: React.FC<RadarChartProps> = ({ metrics }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-white">Placement Readiness Radar</h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center gap-1">
              <Zap className="w-3 h-3" /> Live Graph
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">5-Dimensional Competency Analysis</p>
        </div>
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <Award className="w-5 h-5" />
        </div>
      </div>

      {/* Recharts Responsive Container */}
      <div className="flex-1 w-full min-h-[260px] relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height={260}>
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="75%" data={metrics}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.12)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 9 }} stroke="rgba(255, 255, 255, 0.08)" />
            <Radar
              name="Readiness Score"
              dataKey="score"
              stroke="#06B6D4"
              fill="#06B6D4"
              fillOpacity={0.4}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(11, 15, 23, 0.95)',
                borderColor: 'rgba(6, 182, 212, 0.4)',
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
              }}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Summary Bar */}
      <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-white/10 text-center">
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="text-[10px] text-gray-400 font-medium">ATS Match</div>
          <div className="text-sm font-bold text-cyan-400">92%</div>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="text-[10px] text-gray-400 font-medium">Resume DNA</div>
          <div className="text-sm font-bold text-purple-400">Verified</div>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="text-[10px] text-gray-400 font-medium">STAR Rating</div>
          <div className="text-sm font-bold text-emerald-400">80%</div>
        </div>
      </div>
    </div>
  );
};
