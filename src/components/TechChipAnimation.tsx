import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, ShieldCheck, Sparkles, Layers, Database } from 'lucide-react';

interface TechChipProps {
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export default function TechChipAnimation({ size = 'md', showDetails = true }: TechChipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSignal, setActiveSignal] = useState('NORMAL');

  // Circuit trace lines setup
  const traces = [
    { d: "M 0 40 L 40 40 L 60 20 L 100 20", delay: 0 },
    { d: "M 0 70 L 30 70 L 50 90 L 100 90", delay: 0.4 },
    { d: "M 200 40 L 160 40 L 140 20 L 100 20", delay: 0.2 },
    { d: "M 200 70 L 170 70 L 150 90 L 100 90", delay: 0.6 },
    { d: "M 40 0 L 40 40 L 60 60 L 60 100", delay: 0.1 },
    { d: "M 160 0 L 160 40 L 140 60 L 140 100", delay: 0.5 },
  ];

  return (
    <div 
      className="relative flex flex-col items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Ambient Glow */}
      <motion.div 
        animate={{
          scale: isHovered ? [1, 1.08, 1] : [1, 1.03, 1],
          opacity: isHovered ? 0.8 : 0.4
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-blue-600/30 via-cyan-400/20 to-indigo-600/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Chip Container Box */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
        
        {/* Animated Circuit Board Background (SVG traces) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {traces.map((t, idx) => (
            <g key={idx}>
              {/* Static Background Circuit Path */}
              <path
                d={t.d}
                fill="none"
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Animated Glowing Signal Pulse along circuit */}
              <motion.path
                d={t.d}
                fill="none"
                stroke="url(#traceGrad)"
                strokeWidth="2.5"
                filter="url(#glow)"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={{ 
                  pathLength: [0, 0.4, 0],
                  pathOffset: [0, 1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: t.delay,
                  ease: "easeInOut"
                }}
              />
            </g>
          ))}
        </svg>

        {/* Silicon Microchip Outer Frame with Metallic Pins */}
        <div className="relative mx-auto flex items-center justify-center">
          
          {/* Top Pins */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={`top-pin-${i}`}
                animate={{ opacity: isHovered ? [0.6, 1, 0.6] : 0.7 }}
                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                className="w-1.5 h-3 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-t-sm shadow-sm" 
              />
            ))}
          </div>

          {/* Bottom Pins */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={`bot-pin-${i}`}
                animate={{ opacity: isHovered ? [0.6, 1, 0.6] : 0.7 }}
                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                className="w-1.5 h-3 bg-gradient-to-t from-amber-300 via-amber-500 to-amber-700 rounded-b-sm shadow-sm" 
              />
            ))}
          </div>

          {/* Left Pins */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={`left-pin-${i}`}
                animate={{ opacity: isHovered ? [0.6, 1, 0.6] : 0.7 }}
                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                className="h-1.5 w-3 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 rounded-l-sm shadow-sm" 
              />
            ))}
          </div>

          {/* Right Pins */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={`right-pin-${i}`}
                animate={{ opacity: isHovered ? [0.6, 1, 0.6] : 0.7 }}
                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                className="h-1.5 w-3 bg-gradient-to-l from-amber-300 via-amber-500 to-amber-700 rounded-r-sm shadow-sm" 
              />
            ))}
          </div>

          {/* Core Microchip Body (Dark Silicon Surface) */}
          <motion.div 
            animate={{ 
              boxShadow: isHovered 
                ? '0 0 35px rgba(59, 130, 246, 0.5), inset 0 0 15px rgba(59, 130, 246, 0.4)' 
                : '0 0 15px rgba(15, 23, 42, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.05)'
            }}
            className="w-44 h-44 sm:w-52 sm:h-52 bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-between relative overflow-hidden group/chip cursor-pointer"
          >
            {/* Diagonal Silicon Texture Lines */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

            {/* Corner Gold Contacts */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-amber-400/80 rounded-sm border border-amber-300" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400/80 rounded-sm border border-amber-300" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 bg-amber-400/80 rounded-sm border border-amber-300" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-amber-400/80 rounded-sm border border-amber-300" />

            {/* Chip Header Tag */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-[8px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                YK-8000
              </span>
              <span className="text-[8px] font-mono text-slate-400 font-bold">SILICON v2.6</span>
            </div>

            {/* Central Animated CPU Die */}
            <div className="relative flex flex-col items-center justify-center my-auto z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 rounded-full border border-dashed border-cyan-500/30 pointer-events-none"
              />

              <motion.div 
                animate={{ scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center"
              >
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                  <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 animate-pulse" />
                  
                  {/* Glowing core center */}
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-cyan-500/10 rounded-[10px]" 
                  />
                </div>
              </motion.div>

              <div className="text-center mt-2">
                <div className="text-[11px] font-black tracking-wider text-white uppercase italic font-display flex items-center justify-center gap-1">
                  YOU KNOW <Sparkles className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[9px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
                  AI & NEURAL CORE
                </div>
              </div>
            </div>

            {/* Chip Footer Status */}
            <div className="w-full flex items-center justify-between z-10 pt-1 border-t border-slate-800">
              <span className="text-[8px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <Zap size={10} /> 5.2 GHz CLOCK
              </span>
              <span className="text-[8px] font-mono text-slate-400 font-bold">100% TECH</span>
            </div>
          </motion.div>
        </div>

        {/* Optional Interactive Status Info Bar */}
        {showDetails && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 gap-4"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              <span>Traitement temps réel</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SÉCURISÉ • YOU KNOW TECH</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
