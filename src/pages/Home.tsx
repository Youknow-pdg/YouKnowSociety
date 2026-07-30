import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Cpu, ShieldCheck, Cloud, Laptop, Users, CheckCircle2, 
  BookOpen, TrendingUp, Database, ShoppingBag, Award, Code, Sparkles, 
  Building2, Globe2, Layers, ChevronRight, Zap, Play, ArrowUpRight, Check,
  HeartHandshake, Compass, Target, Lightbulb, Star, Phone, Mail, Wrench, Video, Mic
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MarqueeTicker from '../components/MarqueeTicker';
import { allSubsidiaries, groupProducts } from '../data/subsidiariesData';

const servicesList = [
  {
    title: 'Développement Web & Applications',
    desc: 'Sites vitrines, boutiques e-commerce, applications web et mobiles sur mesure, rapides, intuitifs et sécurisés.',
    icon: Laptop,
    badge: 'YOU KNOW TECH',
  },
  {
    title: 'Intelligence Artificielle & Automatisation',
    desc: 'Intégration d\'IA générative, automatisation des tâches répétitives et optimisation des flux de travail.',
    icon: Cpu,
    badge: 'INNOVATION',
  },
  {
    title: 'Création Visuelle, Vidéo & Voix Off',
    desc: 'Logos, identités visuelles, affiches publicitaires, montage vidéo rythmé et voix off professionnelle.',
    icon: Video,
    badge: 'CREATIVE HUB',
  },
  {
    title: 'Maintenance Informatique & Systèmes',
    desc: 'Installation d\'OS (Windows, Linux), nettoyage complet d\'ordinateurs, maintenance préventive et support.',
    icon: Wrench,
    badge: 'SERVICES IT',
  },
];

const meaningList = [
  { letter: 'Y', title: 'VisionarY', desc: 'Nous avons une vision ambitieuse tournée vers l\'avenir.' },
  { letter: 'O', title: 'OpportunitO', desc: 'Nous créons des opportunités grâce au numérique.' },
  { letter: 'U', title: 'FutUre', desc: 'Nous préparons les générations aux métiers du futur.' },
  { letter: 'K', title: 'Knowledge', desc: 'Le savoir est au cœur de tout ce que nous faisons.' },
  { letter: 'N', title: 'IINnovation', desc: 'Nous développons des solutions innovantes.' },
  { letter: 'O', title: 'PerfectiO', desc: 'Nous recherchons constamment la qualité et l\'excellence.' },
  { letter: 'W', title: 'GroWth', desc: 'Nous favorisons la croissance des personnes, des entreprises et de la société.' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'sales' | 'stock' | 'ai'>('sales');
  const [selectedSub, setSelectedSub] = useState(allSubsidiaries[0]);

  return (
    <div className="space-y-0 overflow-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION — FOND BLEU NUIT & ÉLECTRIQUE
         ========================================================================= */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 technical-grid bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Top Status Strip */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-mono font-bold tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SOCIÉTÉ HOLDING MERI • SÉNÉGAL & MONDE
            </div>

            <div className="hidden md:flex items-center gap-6 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><Globe2 size={13} className="text-blue-400" /> DAKAR (+221 70 200 72 85)</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">STATUS: HOLDING ONLINE</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 tracking-[0.3em] uppercase mb-4 block">
                  ★ DEVISE OFFICIELLE : WHERE KNOWLEDGE MEETS INNOVATION
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
                  Là où le savoir <br />
                  <span className="text-gradient">rencontre l'innovation</span> <br />
                  pour créer l'avenir.
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
                <strong className="text-white font-semibold">YOU KNOW SOCIETY</strong> est une société sénégalaise spécialisée dans le numérique, l'innovation, la formation et la transformation digitale, guidant entreprises et particuliers vers le succès.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-9 py-4 rounded-full font-bold text-sm tracking-wider uppercase hover:brightness-110 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-3 group border border-blue-400/30"
                >
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link
                  to="/subsidiaries"
                  className="bg-slate-900/80 backdrop-blur-xl border border-white/15 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-slate-800 transition-all flex items-center gap-2 group hover:border-blue-500/50"
                >
                  Explorer nos filiales
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Badges - Fully Responsive Cards */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all flex items-center sm:items-start justify-between sm:justify-start gap-3">
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white tracking-tight">100%</div>
                    <div className="text-[11px] sm:text-[10px] font-mono text-slate-300 uppercase tracking-wider font-semibold">Pratique & Pro</div>
                  </div>
                  <Award size={20} className="text-amber-400 shrink-0 opacity-80" />
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all flex items-center sm:items-start justify-between sm:justify-start gap-3">
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-blue-400 tracking-tight">SASTOCK</div>
                    <div className="text-[11px] sm:text-[10px] font-mono text-blue-300 uppercase tracking-wider font-semibold">SaaS Opérationnel</div>
                  </div>
                  <Database size={20} className="text-blue-400 shrink-0 opacity-80" />
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center sm:items-start justify-between sm:justify-start gap-3">
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-emerald-400 tracking-tight">SÉNÉGAL</div>
                    <div className="text-[11px] sm:text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">& Rayonnement Global</div>
                  </div>
                  <Globe2 size={20} className="text-emerald-400 shrink-0 opacity-80" />
                </div>
              </div>
            </motion.div>

            {/* Interactive Futuristic Card Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-b from-blue-500/30 via-indigo-500/10 to-transparent shadow-2xl backdrop-blur-2xl border border-white/10">
                <div className="bg-slate-950/90 rounded-[2.3rem] p-6 lg:p-8 space-y-6 relative overflow-hidden">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">YOU KNOW SOCIETY</div>
                        <div className="text-[10px] font-mono text-slate-400">SOCIÉTÉ MÈRE</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono font-bold text-emerald-400">
                      ● ACTIF
                    </span>
                  </div>

                  {/* Dynamic Showcase inside Hero Card */}
                  <div className="space-y-4 relative z-10">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-colors">
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>FILIALE TECH</span>
                        <span className="text-blue-400 font-bold">YOU KNOW TECH</span>
                      </div>
                      <div className="text-sm font-bold text-white">Logiciels SaaS, IA & Développement sur mesure</div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-colors">
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>LOGICIEL PHARE</span>
                        <span className="text-emerald-400 font-bold">SASTOCK SAAS</span>
                      </div>
                      <div className="text-sm font-bold text-white">"Votre stock sous contrôle. Vos bénéfices en croissance."</div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-colors">
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>YOU KNOW ACADEMY</span>
                        <span className="text-purple-400 font-bold">FORMATIONS PRATIQUES</span>
                      </div>
                      <div className="text-sm font-bold text-white">Bureautique (Word, Excel, PowerPoint) & IA</div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
                    <span className="flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-400" />
                      Apprendre • Maîtriser • Réussir
                    </span>
                    <Link to="/about" className="text-blue-400 hover:underline flex items-center gap-1 font-bold">
                      Vision <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker Ribbon */}
      <MarqueeTicker />

      {/* =========================================================================
          SECTION 2: QUI SOMMES-NOUS & SIGNIFICATION YOU KNOW — FOND BLANC PUR
         ========================================================================= */}
      <section className="bg-white text-slate-900 py-24 sm:py-32 relative z-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <Compass size={14} strokeWidth={2.5} /> SENS & ENGAGEMENT DU GROUPE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Que signifie <span className="text-blue-600">YOU KNOW</span> ?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              Chaque lettre de notre nom incarne les piliers fondamentaux de notre identité et de notre mission au Sénégal, en Afrique et dans le monde.
            </p>
          </div>

          {/* YOU KNOW Letters Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {meaningList.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-display font-black text-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                  {item.letter}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            ))}
            
            {/* 8th Card: Official Motto Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">DEVISE OFFICIELLE</span>
                <h3 className="text-xl font-display font-extrabold mt-2 mb-3 leading-snug">
                  Where Knowledge Meets Innovation.
                </h3>
                <p className="text-slate-300 text-xs italic">
                  "Là où le savoir rencontre l'innovation pour créer l'avenir."
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-blue-300">
                <span>YOU KNOW SOCIETY</span>
                <Sparkles size={16} className="text-amber-400" />
              </div>
            </div>
          </div>

          {/* Mission & Values Row */}
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">NOTRE VISION & ENGAGEMENT</span>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                Bâtir des solutions pour impacter positivement.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                YOU KNOW SOCIETY est une société mère holding destinée à développer plusieurs filiales autonomes dans la tech, le commerce, l'éducation et la mobilité.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
              {[
                'Innovation & Créativité',
                'Excellence & Professionnalisme',
                'Partage du Savoir',
                'Esprit d\'Équipe & Respect',
                'Impact Social Positif',
                'Rigueur & Transparence'
              ].map((val, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ÉCOSYSTÈME DU GROUPE & FILIALES — FOND BLEU SAPHIR & ROI
         ========================================================================= */}
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white py-24 sm:py-32 relative z-10 border-y border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Layers size={14} /> PORTEFEUILLE DU GROUPE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              Nos Filiales <span className="text-gradient">& Pôles d'Excellence</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-normal">
              YOU KNOW SOCIETY rassemble des filiales spécialisées opérant en synergie pour couvrir l'intégralité de la chaîne de valeur numérique.
            </p>
          </div>

          {/* Filial Interactive Selector */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Filial Tabs (Scrollable list of 18 subsidiaries) */}
            <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {allSubsidiaries.map((sub) => {
                const isSelected = selectedSub.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSub(sub)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected 
                        ? 'bg-slate-900 border-blue-500/60 shadow-lg shadow-blue-900/30 translate-x-1' 
                        : 'bg-slate-950/50 border-white/5 hover:bg-slate-900/50 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${sub.color} text-white flex items-center justify-center shrink-0`}>
                        <sub.icon size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono font-bold text-slate-400">#{sub.number}</span>
                          <h3 className="text-sm font-bold text-white font-display">{sub.name}</h3>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{sub.sector}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className={isSelected ? 'text-blue-400' : 'text-slate-600'} />
                  </button>
                );
              })}
            </div>

            {/* Selected Filial Spotlight View */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSub.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-8 lg:p-10 border-white/10 bg-slate-900/70 relative overflow-hidden rounded-3xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedSub.color} text-white flex items-center justify-center shadow-lg`}>
                        <selectedSub.icon size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">FILIALE #{selectedSub.number}</span>
                        <h3 className="text-2xl lg:text-3xl font-display font-extrabold text-white">{selectedSub.name}</h3>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${selectedSub.tagColor}`}>
                      {selectedSub.status}
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed mb-8">
                    {selectedSub.desc}
                  </p>

                  <div className="mb-8 space-y-3">
                    <h4 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">Compétences Phares :</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedSub.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                          <Check size={16} className="text-blue-400 shrink-0" />
                          <span className="text-xs font-semibold text-slate-200">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">{selectedSub.sector}</span>
                    <Link
                      to="/subsidiaries"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300"
                    >
                      Voir les 18 filiales <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LE LOGICIEL SASTOCK (SaaS Phare par YOU KNOW TECH) — FOND BLANC PURE
         ========================================================================= */}
      <section className="bg-slate-50 text-slate-900 py-24 sm:py-32 relative z-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white p-8 lg:p-16 rounded-[3rem] border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
                  <Database size={14} /> LOGICIEL SAAS PHARE PAR YOU KNOW TECH
                </div>
                <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
                  SASTOCK
                </h2>
                <p className="text-xl font-bold text-amber-600 italic">
                  "Votre stock sous contrôle. Vos bénéfices en croissance."
                </p>
                <p className="text-slate-600 leading-relaxed text-base font-normal">
                  Permet aux commerçants, boutiques, magasins et vendeurs de gérer facilement leur stock et leurs ventes avec des tableaux de bord en temps réel et des alertes intelligentes.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    'Gestion de stock intuitive',
                    'Gestion des ventes rapide',
                    'Suivi précis des bénéfices',
                    'Alertes de rupture de stock',
                    'Connexion Google sécurisée',
                    'Tableaux de bord temps réel',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="text-emerald-600 shrink-0" size={16} />
                      <span className="text-xs font-semibold text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                  >
                    Demander une démo SASTOCK
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="https://youknow.click"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-800 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    Visiter youknow.click
                    <Globe2 size={16} />
                  </a>
                </div>
              </div>

              {/* Interactive Dashboard Tab Demo */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-8 space-y-6 shadow-2xl">
                  
                  {/* Tabs */}
                  <div className="flex border-b border-white/10 pb-3 gap-2">
                    <button
                      onClick={() => setActiveTab('sales')}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        activeTab === 'sales' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Ventes du jour
                    </button>
                    <button
                      onClick={() => setActiveTab('stock')}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        activeTab === 'stock' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Alertes Stock
                    </button>
                    <button
                      onClick={() => setActiveTab('ai')}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        activeTab === 'ai' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Analyse Bénéfices
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-4">
                    {activeTab === 'sales' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                          <div>
                            <div className="text-[10px] font-mono text-slate-400">Total Ventes Réalisées</div>
                            <div className="text-2xl font-mono font-bold text-emerald-400">285 000 FCFA</div>
                          </div>
                          <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-bold">+18.4%</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl text-xs font-mono text-slate-300 flex justify-between">
                          <span>Boutique Dakar Centre</span>
                          <span className="font-bold text-white">12 Commandes</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'stock' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-amber-400">Alerte Rupture de Stock</div>
                            <div className="text-xs text-slate-300">Article #402 - 2 unités restantes</div>
                          </div>
                          <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-1 rounded">Réapprovisionner</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'ai' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                          <div className="text-xs font-bold text-indigo-300 mb-1">Bénéfice Net Estimé</div>
                          <div className="text-2xl font-mono font-bold text-indigo-400">92 400 FCFA</div>
                          <p className="text-[10px] text-slate-400 mt-2">Marges calculées automatiquement par produit vendeur.</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 text-center border-t border-white/10 pt-3">
                    SASTOCK SAAS • DÉVELOPPÉ PAR YOU KNOW TECH
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: YOU KNOW ACADEMY — FOND BLEU NUIT & CYAN
         ========================================================================= */}
      <section className="bg-slate-950 text-white py-24 sm:py-32 relative z-10 border-y border-indigo-500/30">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Award size={14} /> YOU KNOW ACADEMY
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              Apprendre • Maîtriser • Réussir
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Des formations 100% pratiques, en ligne et hybrides avec suivi personnalisé et attestation / certificat de formation à la clé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Informatique Bureautique',
                tag: 'Pro & Complet',
                duration: '3 Semaines (Flexible)',
                desc: 'Maîtrise complète de Word, Excel, PowerPoint, Access, Outlook et Windows. 100% pratique pour le monde professionnel.',
                items: ['Word & Excel Pro', 'PowerPoint & Access', 'Outlook & Windows'],
                badge: 'Certificat inclus'
              },
              {
                title: 'Création Web avec l\'IA',
                tag: 'Tech & Design',
                duration: '15 Jours',
                desc: 'Concevez des sites internet modernes et esthétiques rapidement grâce au potentiel des meilleurs outils d\'IA.',
                items: ['Prompts Web Design', 'Déploiement rapide', 'Projets Réels'],
                badge: 'Certificat inclus'
              },
              {
                title: 'Création d\'Affiches & Visuels IA',
                tag: 'Graphisme IA',
                duration: '15 Jours',
                desc: 'Créez des affiches et visuels publicitaires percutants et professionnels sans compétences graphiques préalables.',
                items: ['Affiches Pro', 'Branding IA', 'Visuels Réseaux'],
                badge: 'Certificat inclus'
              },
              {
                title: 'Automatisation des Tâches IA',
                tag: 'Productivité',
                duration: '15 Jours',
                desc: 'Gagnez un temps précieux au quotidien en automatisant vos flux de travail et vos tâches répétitives.',
                items: ['Workflows IA', 'Bots & Scripts', 'Gain de Temps'],
                badge: 'Certificat inclus'
              }
            ].map((course, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-indigo-500/40 transition-all group bg-slate-900/80"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                      {course.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-3 group-hover:text-indigo-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    {course.desc}
                  </p>
                  <div className="space-y-1.5 mb-6">
                    {course.items.map((it, ii) => (
                      <div key={ii} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">{course.badge}</span>
                  <Link
                    to="/services"
                    className="text-xs font-bold text-indigo-400 group-hover:text-white flex items-center gap-1"
                  >
                    S'inscrire <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Modal Strip */}
          <div className="mt-10 p-6 glass-card border-white/10 bg-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Tarification Officielle YOU KNOW ACADEMY</div>
                <div className="text-xs text-slate-300">Frais d'inscription : 5 000 FCFA • Coût par cours : 1 475 FCFA • 3 jours/semaine (flexible)</div>
              </div>
            </div>
            <Link
              to="/contact"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow-lg shadow-indigo-900/30"
            >
              Rejoindre l'Academy
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: NOS SERVICES CONSEIL & TECH — FOND BLANC PUR
         ========================================================================= */}
      <section className="bg-white text-slate-900 py-24 sm:py-32 relative z-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase text-blue-600 tracking-wider">OFFRE DE PRESTATIONS</span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight mt-2">
              Services & Solutions Numériques
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mt-3">
              YOU KNOW SOCIETY accompagne les particuliers, entreprises et institutions dans leurs projets informatiques avec expertise et rigueur.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((s, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <s.icon size={24} />
                </div>
                <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest">{s.badge}</span>
                <h3 className="text-lg font-bold text-slate-900 my-3 font-display group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 font-normal">
                  {s.desc}
                </p>
                <Link to="/services" className="text-[10px] font-mono uppercase font-bold tracking-widest text-blue-600 flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  DÉCOUVRIR <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: GRAND CALL TO ACTION — FOND BLEU ROI PRESTIGE
         ========================================================================= */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-950 to-indigo-950 text-white py-20 relative z-10 border-t border-blue-500/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Phone size={14} /> CONTACT DIRECT HOLDING
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Prêt à accélérer votre projet avec <br />
              <span className="text-gradient">YOU KNOW SOCIETY ?</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Que ce soit pour le déploiement du logiciel SASTOCK, la création d'une application sur mesure, la transformation IA ou une formation certifiante, nos équipes sont à votre disposition.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-blue-900/40"
              >
                Prendre Contact
              </Link>
              <a
                href="https://wa.me/221702007285"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-emerald-600/30 transition-all flex items-center gap-2"
              >
                WhatsApp Direct (+221 70 200 72 85)
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


