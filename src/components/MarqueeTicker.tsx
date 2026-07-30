import React from 'react';
import { Sparkles, Globe2, ShieldCheck, Zap } from 'lucide-react';

interface MarqueeTickerProps {
  items?: string[];
}

export default function MarqueeTicker({
  items = [
    'YOU KNOW SOCIETY',
    'WHERE KNOWLEDGE MEETS INNOVATION',
    'LÀ OÙ LE SAVOIR RENCONTRE L\'INNOVATION',
    'GROUPE HOLDING INTERNATIONAL',
    'YOU KNOW TECH',
    'SASTOCK',
    'YOU KNOW ACADEMY',
    'DÉVELOPPEMENT WEB & IA',
    'INFORMATIQUE BUREAUTIQUE',
    'DAKAR • SÉNÉGAL • MONDE ENTIER',
  ],
}: MarqueeTickerProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-blue-950/60 border-y border-blue-500/20 py-3 backdrop-blur-md relative z-10 shadow-lg shadow-blue-950/40">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeated.map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 mx-6 text-xs font-mono font-black uppercase tracking-[0.2em] text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-blue-400">
              {idx % 3 === 0 ? <Sparkles size={12} className="text-yellow-400" /> : idx % 3 === 1 ? <Globe2 size={12} className="text-blue-400" /> : <Zap size={12} className="text-emerald-400" />}
            </span>
            <span className="hover:text-white transition-colors cursor-default">{text}</span>
            <span className="text-slate-600 font-normal">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
