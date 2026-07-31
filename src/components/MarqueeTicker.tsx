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
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-50/90 via-slate-100/90 to-blue-50/90 border-y border-slate-200/90 py-3 backdrop-blur-md relative z-10 shadow-sm">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeated.map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 mx-6 text-xs font-mono font-black uppercase tracking-[0.2em] text-slate-700">
            <span className="inline-flex items-center gap-1.5 text-blue-600">
              {idx % 3 === 0 ? <Sparkles size={12} className="text-amber-500" /> : idx % 3 === 1 ? <Globe2 size={12} className="text-blue-600" /> : <Zap size={12} className="text-emerald-600" />}
            </span>
            <span className="hover:text-blue-700 transition-colors cursor-default">{text}</span>
            <span className="text-slate-400 font-normal">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
