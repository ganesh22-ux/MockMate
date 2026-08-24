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
        return <Mic className="w-5 h-5 text-zinc-300" />;
      case 'FileCode':
        return <FileCode className="w-5 h-5 text-zinc-300" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-zinc-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-zinc-300" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onSelectCard(card.id)}
          className="glass-panel glass-panel-hover rounded-xl p-5 flex flex-col justify-between cursor-pointer border border-zinc-800 group"
        >
          <div>
            {/* Header: Icon & System Tag */}
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700">
                {getIcon(card.icon)}
              </div>
              <span className="px-2 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
                {card.badge}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors mb-1.5">
              {card.title}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">{card.subtitle}</p>

            {/* Metric Chips */}
            <div className="grid grid-cols-3 gap-1.5 mb-4">
              {card.metrics.map((metric, idx) => (
                <div key={idx} className="p-1.5 rounded bg-zinc-900/80 border border-zinc-800 text-center">
                  <div className="text-[9px] text-zinc-400 font-medium">{metric.label}</div>
                  <div className="text-xs font-medium text-zinc-200 mt-0.5">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs text-zinc-300 group-hover:text-white font-medium">
            <span>Explore Module</span>
            <div className="p-1 rounded bg-zinc-800 border border-zinc-700 group-hover:bg-zinc-700 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
