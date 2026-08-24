import React from 'react';
import type { FeatureHeroCard } from '../types';
import { Mic, FileCode, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface HeroCardsProps {
  cards: FeatureHeroCard[];
  onSelectCard: (cardId: string) => void;
}

export const HeroCards: React.FC<HeroCardsProps> = ({ cards, onSelectCard }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-6 h-6 text-cyan-400" />;
      case 'FileCode':
        return <FileCode className="w-6 h-6 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getBadgeStyle = (accent: string) => {
    switch (accent) {
      case 'cyan':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'violet':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onSelectCard(card.id)}
          className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden group border border-white/10"
        >
          {/* Subtle Ambient Background Glow */}
          <div
            className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${card.gradient} filter blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
          />

          <div>
            {/* Card Header: Icon & Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                {getIcon(card.icon)}
              </div>
              <span
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${getBadgeStyle(
                  card.accentColor
                )}`}
              >
                {card.badge}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
              {card.title}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-5">{card.subtitle}</p>

            {/* Key Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {card.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-black/40 border border-white/5 text-center group-hover:border-white/10"
                >
                  <div className="text-[9px] uppercase font-semibold text-gray-400">{metric.label}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
            <span>Launch Feature Suite</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-black transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
