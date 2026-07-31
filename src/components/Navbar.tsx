import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Globe, ArrowUpRight, Sparkles, Command, 
  Search, Terminal, Layers, BookOpen, ShoppingBag, Car, Building2, 
  CheckCircle2, ExternalLink, Zap
} from 'lucide-react';
import logo from '../logo.png';
import { allSubsidiaries, groupProducts } from '../data/subsidiariesData';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Filiales (18)', path: '/subsidiaries' },
  { name: 'Partenaires', path: '/partners' },
  { name: 'Études de cas', path: '/cases' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showEcosystem, setShowEcosystem] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const location = useLocation();

  // Auto-advance navigation spotlight beacon every 2 seconds
  useEffect(() => {
    if (isNavHovered) return;
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % navLinks.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isNavHovered]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = [
    ...allSubsidiaries.map(s => ({
      title: `${s.name} - ${s.sector}`,
      category: `Filiale #${s.number}`,
      link: '/subsidiaries'
    })),
    ...groupProducts.map(p => ({
      title: `${p.name} (${p.slogan})`,
      category: p.badge,
      link: '/subsidiaries'
    })),
    { title: 'Feselma Digital - Agence Digitale (feselmadigital.com)', category: 'Partenaire Officiel', link: '/partners' },
    { title: 'SDM - Services Digitaux & Maintenance IT', category: 'Partenaire Officiel', link: '/partners' },
    { title: 'Merveille Bat - Construction & Gestion Locative', category: 'Partenaire Officiel', link: '/partners' },
    { title: 'AutoLink - Vente de voitures (Géré par YOU KNOW)', category: 'Plateforme Groupe', link: '/partners' },
    { title: 'Miss Drone Company - Imagerie Aérienne & Drones HD', category: 'Partenaire Officiel', link: '/partners' },
    { title: 'Formation Informatique Bureautique (Word, Excel, PowerPoint, Access)', category: 'YOU KNOW ACADEMY', link: '/services' },
    { title: 'Formation IA & Création de Sites Web', category: 'YOU KNOW ACADEMY', link: '/services' },
    { title: 'Contacter l\'Équipe YOU KNOW (+221 70 200 72 85)', category: 'Contact Direct', link: '/contact' },
  ].filter(item => 
    searchQuery === '' || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        
        {/* Top Floating Continuous Animated Ticker (Collapses smoothly when scrolled) */}
        <div className={`pointer-events-auto bg-slate-900 text-slate-100 border-b border-slate-800 text-[10px] lg:text-[11px] font-mono overflow-hidden relative transition-all duration-500 ease-in-out ${
          scrolled ? 'max-h-0 opacity-0 py-0 border-transparent pointer-events-none' : 'max-h-12 opacity-100 py-1.5 shadow-md'
        }`}>
          
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Marquee Container with pause-on-hover */}
          <div className="flex w-max animate-marquee-reverse pause-on-hover select-none items-center">
            
            {/* Ticker Set 1 */}
            <div className="flex items-center gap-6 pr-6">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                YOU KNOW SOCIETY • DAKAR
              </span>

              <span className="text-slate-300 italic text-[11px] font-sans font-medium">
                "Where Knowledge Meets Innovation."
              </span>

              <button 
                onClick={() => setShowEcosystem(!showEcosystem)}
                className="hover:bg-amber-500/30 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 transition-all flex items-center gap-1.5 text-amber-300 font-bold cursor-pointer shrink-0"
              >
                <Sparkles size={12} className="animate-spin-slow" />
                <span>Groupe Holding (18 Filiales)</span>
              </button>

              <span className="text-slate-200 font-semibold flex items-center gap-1">
                <span className="text-emerald-400">●</span> SASTOCK SaaS Stock & Ventes
              </span>

              <span className="text-slate-200 font-semibold flex items-center gap-1">
                <span className="text-blue-400">🎓</span> YOU KNOW ACADEMY • Formations Pratiques
              </span>

              <button 
                onClick={() => setShowSearch(true)}
                className="bg-white/10 hover:bg-blue-600/40 text-slate-100 px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer text-[10px] shrink-0"
              >
                <Search size={11} className="text-blue-300" />
                <span>Recherche Rapide</span>
                <kbd className="bg-slate-800 px-1 rounded text-[8px] text-slate-300 border border-slate-700">⌘K</kbd>
              </button>

              <a 
                href="https://wa.me/221702007285" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-300 hover:text-emerald-200 font-bold transition-colors flex items-center gap-1 shrink-0 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30"
              >
                <span>WhatsApp: +221 70 200 72 85</span>
              </a>

              <span className="text-slate-500">★</span>
            </div>

            {/* Ticker Set 2 (Identical Duplicate for Seamless Infinite Animation) */}
            <div className="flex items-center gap-6 pr-6">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                YOU KNOW SOCIETY • DAKAR
              </span>

              <span className="text-slate-300 italic text-[11px] font-sans font-medium">
                "Where Knowledge Meets Innovation."
              </span>

              <button 
                onClick={() => setShowEcosystem(!showEcosystem)}
                className="hover:bg-amber-500/30 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 transition-all flex items-center gap-1.5 text-amber-300 font-bold cursor-pointer shrink-0"
              >
                <Sparkles size={12} className="animate-spin-slow" />
                <span>Groupe Holding (18 Filiales)</span>
              </button>

              <span className="text-slate-200 font-semibold flex items-center gap-1">
                <span className="text-emerald-400">●</span> SASTOCK SaaS Stock & Ventes
              </span>

              <span className="text-slate-200 font-semibold flex items-center gap-1">
                <span className="text-blue-400">🎓</span> YOU KNOW ACADEMY • Formations Pratiques
              </span>

              <button 
                onClick={() => setShowSearch(true)}
                className="bg-white/10 hover:bg-blue-600/40 text-slate-100 px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer text-[10px] shrink-0"
              >
                <Search size={11} className="text-blue-300" />
                <span>Recherche Rapide</span>
                <kbd className="bg-slate-800 px-1 rounded text-[8px] text-slate-300 border border-slate-700">⌘K</kbd>
              </button>

              <a 
                href="https://wa.me/221702007285" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-300 hover:text-emerald-200 font-bold transition-colors flex items-center gap-1 shrink-0 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30"
              >
                <span>WhatsApp: +221 70 200 72 85</span>
              </a>

              <span className="text-slate-500">★</span>
            </div>

          </div>
        </div>

        {/* Main Command Capsule Island (Transitions to top edge when scrolled) */}
        <div className={`transition-all duration-500 ease-in-out ${
          scrolled ? 'max-w-full px-0 pt-0' : 'max-w-7xl mx-auto px-2 sm:px-6 pt-2 lg:pt-3'
        }`}>
          <nav 
            className={`pointer-events-auto transition-all duration-500 ease-in-out ${
              scrolled 
                ? 'bg-white/95 backdrop-blur-2xl py-1.5 px-3 sm:px-6 lg:px-8 shadow-xl shadow-slate-200/80 border-b border-slate-200 rounded-none sm:rounded-b-2xl lg:rounded-b-full' 
                : 'bg-white/90 backdrop-blur-xl py-2.5 px-2.5 sm:px-4 lg:px-7 shadow-xl shadow-slate-200/60 border border-slate-200/90 rounded-2xl lg:rounded-full'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 lg:gap-4">
              
              {/* Brand Logo with Interactive Halo */}
              <Link to="/" className="flex items-center gap-2 lg:gap-3 group relative shrink-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
                  <img 
                    src={logo} 
                    alt="YOU KNOW SOCIETY" 
                    className="relative h-8 sm:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs sm:text-sm font-display font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    YOU KNOW <span className="text-blue-600 font-semibold">SOCIETY</span>
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-slate-500 tracking-wider">HOLDING GROUP</span>
                </div>
              </Link>

              {/* Desktop & Tablet Nav Items */}
              <div 
                className="hidden md:flex items-center gap-0.5 lg:gap-1.5 bg-slate-100/90 p-1 lg:p-1.5 rounded-full border border-slate-200/80 overflow-x-auto custom-scrollbar max-w-[50vw] lg:max-w-none shrink relative"
                onMouseEnter={() => setIsNavHovered(true)}
                onMouseLeave={() => setIsNavHovered(false)}
              >
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  const isSpotlight = spotlightIndex === idx;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onMouseEnter={() => setSpotlightIndex(idx)}
                      className={`relative px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full text-[11px] lg:text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 ${
                        isActive 
                          ? 'text-white font-extrabold' 
                          : isSpotlight 
                          ? 'text-blue-700 font-extrabold scale-105' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        {link.name}
                        {isSpotlight && !isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                        )}
                      </span>

                      {/* Active Route Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md shadow-blue-500/30 z-0"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Continuous Auto-Moving Beacon Spotlight */}
                      {isSpotlight && (
                        <motion.div
                          layoutId="spotlight-beacon"
                          className={`absolute inset-0 rounded-full z-0 ${
                            isActive 
                              ? 'border-2 border-blue-400 shadow-md bg-blue-500/20' 
                              : 'border border-blue-400/80 bg-blue-100/60 shadow-sm'
                          }`}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-500 rounded-full blur-[1px]" />
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-500 rounded-full blur-[1px]" />
                        </motion.div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Interactive Filiales Drawer Button + Quick Contact */}
              <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
                <button
                  onClick={() => setShowEcosystem(!showEcosystem)}
                  className={`px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-full text-[11px] lg:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer ${
                    showEcosystem 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-blue-400'
                  }`}
                >
                  <Layers size={13} className="text-blue-600" />
                  <span className="hidden lg:inline">18 Filiales</span>
                  <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-full text-[10px]">18</span>
                </button>

                <Link
                  to="/contact"
                  className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-3.5 lg:px-5 py-1.5 lg:py-2 rounded-full text-[11px] lg:text-xs font-extrabold uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-blue-600/20 border border-blue-400/30 group whitespace-nowrap"
                >
                  <span>Devis</span>
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-1.5">
                <button
                  onClick={() => setShowEcosystem(!showEcosystem)}
                  className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 font-mono text-[10px] font-bold flex items-center gap-1"
                  aria-label="Filiales"
                >
                  <Layers size={14} />
                  <span>18</span>
                </button>
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
                  aria-label="Recherche"
                >
                  <Search size={18} />
                </button>
                <button 
                  className="text-slate-800 p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors" 
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Menu Mobile"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

            </div>
          </nav>
        </div>

        {/* Floating Quick Filiales Ecosystem Drawer */}
        <AnimatePresence>
          {showEcosystem && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto max-w-6xl mx-auto px-3 sm:px-6 mt-2 sm:mt-3"
            >
              <div className="glass-card p-4 sm:p-6 bg-white/95 border-slate-200 shadow-2xl rounded-2xl sm:rounded-3xl backdrop-blur-3xl max-h-[82vh] flex flex-col text-slate-900">
                <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-200 shrink-0">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
                    <Building2 size={16} />
                    <span className="hidden sm:inline">ÉCOSYSTÈME YOU KNOW SOCIETY (18 FILIALES DU GROUPE)</span>
                    <span className="sm:hidden">GROUPE HOLDING (18 FILIALES)</span>
                  </div>
                  <button 
                    onClick={() => setShowEcosystem(false)}
                    className="text-slate-500 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="overflow-y-auto pr-1 sm:pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 custom-scrollbar">
                  {allSubsidiaries.map((fil) => (
                    <Link
                      key={fil.id}
                      to="/subsidiaries"
                      onClick={() => setShowEcosystem(false)}
                      className="group p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-gradient-to-br ${fil.color} text-white flex items-center justify-center shadow-md`}>
                        <fil.icon size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono font-bold text-slate-500">#{fil.number}</span>
                          <h4 className="text-xs font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors truncate">
                            {fil.name}
                          </h4>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                          {fil.sector}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-600 shrink-0">
                  <span className="hidden sm:inline">Slogan officiel : <strong className="text-slate-900">Where Knowledge Meets Innovation.</strong></span>
                  <Link to="/subsidiaries" onClick={() => setShowEcosystem(false)} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                    Découvrir les 18 filiales en détail <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pointer-events-auto max-w-7xl mx-auto px-4 mt-2 md:hidden"
            >
              <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 max-h-[82vh] overflow-y-auto custom-scrollbar text-slate-900">
                <div className="pb-3 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-blue-600 font-bold">
                  <span>YOU KNOW SOCIETY</span>
                  <span className="text-emerald-600">● DAKAR ONLINE</span>
                </div>

                <div className="grid gap-1.5 sm:gap-2">
                  {navLinks.map((link, idx) => {
                    const isActive = location.pathname === link.path;
                    const isSpotlight = spotlightIndex === idx;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-xs sm:text-sm font-bold py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl transition-all flex items-center justify-between ${
                          isActive 
                            ? 'bg-blue-600 text-white font-extrabold shadow-md' 
                            : isSpotlight
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.name}
                          {isSpotlight && !isActive && (
                            <span className="text-[10px] text-blue-600 font-mono font-normal animate-pulse">‹scanne›</span>
                          )}
                        </span>
                        <ArrowUpRight size={16} className={isActive ? 'text-white' : isSpotlight ? 'text-blue-600' : 'text-slate-400'} />
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Filial Buttons Mobile */}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Nos 18 Filiales Spécialisées :</div>
                  <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
                    {allSubsidiaries.map((f) => (
                      <Link
                        key={f.id}
                        to="/subsidiaries"
                        onClick={() => setIsOpen(false)}
                        className="p-2 sm:p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-[10px] sm:text-[11px] font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5"
                      >
                        <f.icon size={13} className="text-blue-600 shrink-0" />
                        <span className="truncate">{f.shortName}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl text-center text-xs font-extrabold uppercase tracking-wider shadow-md"
                  >
                    Démarrer un Projet
                  </Link>
                  <a
                    href="https://wa.me/221702007285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 py-2.5 rounded-xl text-center text-xs font-extrabold"
                  >
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* Global Quick Search / Command Palette Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex items-start justify-center pt-20 px-4"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 space-y-4 text-slate-900"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <Search size={20} className="text-blue-600" />
                <input
                  type="text"
                  placeholder="Rechercher un service, formation, SASTOCK, contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-slate-900 text-base font-sans outline-none placeholder:text-slate-400"
                />
                <button onClick={() => setShowSearch(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {searchResults.length > 0 ? (
                  searchResults.map((res, i) => (
                    <Link
                      key={i}
                      to={res.link}
                      onClick={() => setShowSearch(false)}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-mono text-blue-600 font-bold uppercase">{res.category}</div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700">{res.title}</div>
                      </div>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600" />
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    Aucun résultat pour "{searchQuery}". Essayez "Bureautique", "SASTOCK" ou "IA".
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
                <span>YOU KNOW SOCIETY • RECHERCHE RAPIDE</span>
                <span>Appuyez sur Échap pour fermer</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


