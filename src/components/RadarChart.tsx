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
import { Award } from 'lucide-react';

interface RadarChartProps {
  metrics: PlacementMetric[];
}

export const RadarChartComponent: React.FC<RadarChartProps> = ({ metrics }) => {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">Placement Readiness Radar</h2>
          <p className="text-xs text-zinc-400">5-Dimensional Competency Overview</p>
        </div>
        <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
          <Award className="w-4 h-4" />
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-[250px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={metrics}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 400 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#52525B', fontSize: 9 }} stroke="rgba(255, 255, 255, 0.05)" />
            <Radar
              name="Readiness Score"
              dataKey="score"
              stroke="#A1A1AA"
              fill="#71717A"
              fillOpacity={0.2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181B',
                borderColor: '#3F3F46',
                borderRadius: '0.5rem',
                color: '#F4F4F5',
                fontSize: '12px',
              }}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-zinc-800 text-center">
        <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
          <div className="text-[10px] text-zinc-400">ATS Match</div>
          <div className="text-xs font-semibold text-zinc-200">92%</div>
        </div>
        <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
          <div className="text-[10px] text-zinc-400">Resume DNA</div>
          <div className="text-xs font-semibold text-zinc-200">Verified</div>
        </div>
        <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
          <div className="text-[10px] text-zinc-400">STAR Rating</div>
          <div className="text-xs font-semibold text-zinc-200">80%</div>
        </div>
      </div>
    </div>
  );
};
