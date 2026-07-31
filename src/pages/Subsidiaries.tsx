import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, ArrowRight, Check, Search, Filter, Sparkles, Layers,
  ChevronRight, ExternalLink, Zap, Shield, Database, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { allSubsidiaries, groupProducts, Subsidiary } from '../data/subsidiariesData';

const categories = [
  'Toutes (18)',
  'Tech & Digital',
  'Design & Média',
  'Finance & Commerce',
  'Industrie & Énergie',
  'Services & Société',
  'Transport & Auto'
] as const;

export default function Subsidiaries() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes (18)');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSubsidiaries = allSubsidiaries.filter(sub => {
    const matchesCategory = selectedCategory === 'Toutes (18)' || sub.category === selectedCategory;
    const matchesSearch = searchQuery(sub, searchTerm);
    return matchesCategory && matchesSearch;
  });

  function searchQuery(sub: Subsidiary, query: string): boolean {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      sub.name.toLowerCase().includes(q) ||
      sub.sector.toLowerCase().includes(q) ||
      sub.desc.toLowerCase().includes(q) ||
      sub.highlights.some(h => h.toLowerCase().includes(q))
    );
  }

  return (
    <div className="pb-32 bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="py-20 lg:py-28 border-b border-slate-200 relative technical-grid overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-xs font-mono font-bold uppercase tracking-widest">
              <Building2 size={14} /> GROUPE HOLDING YOU KNOW SOCIETY
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight">
              Les <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">18 Filiales</span> du Groupe
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              YOU KNOW SOCIETY est une société holding sénégalaise structurée en 18 filiales spécialisées et autonomes, créant un écosystème synergique pour transformer l'Afrique et le monde.
            </p>
          </motion.div>

          {/* Search & Filter Controls */}
          <div className="max-w-4xl mx-auto pt-6 space-y-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une filiale (ex: SASTOCK, IA, Finance, Auto, Archi...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-900 font-bold"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md border border-blue-500'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiaries Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
            Affichage de {filteredSubsidiaries.length} filiale(s) sur 18
          </span>
          <span className="text-xs font-mono text-blue-700 font-bold">
            Holding : YOU KNOW SOCIETY
          </span>
        </div>

        {filteredSubsidiaries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-base font-medium">Aucune filiale ne correspond à votre recherche "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('Toutes (18)'); }}
              className="mt-4 text-xs font-mono font-bold text-blue-600 hover:underline"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubsidiaries.map((sub, idx) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.05 }}
                className="p-6 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all bg-white flex flex-col justify-between group relative overflow-hidden rounded-3xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 bg-gradient-to-br ${sub.color} text-white rounded-2xl flex items-center justify-center shadow-md border border-white/20 shrink-0`}>
                      <sub.icon size={22} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500">FILIALE #{sub.number}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${sub.tagColor}`}>
                        {sub.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-display font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {sub.name}
                    </h2>
                    <span className="text-[11px] font-mono text-blue-700 font-bold block mb-2">{sub.sector}</span>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-normal">
                      {sub.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider">Compétences clés :</span>
                    <div className="space-y-1">
                      {sub.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                          <Check size={12} className="text-blue-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold">{sub.category}</span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-800 transition-colors"
                  >
                    Nous contacter <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Products of the Group */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="p-8 lg:p-12 border border-slate-200 bg-white rounded-[2.5rem] shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">SOLUTIONS PHARES</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 mt-1">
                Produits Clés du Groupe YOU KNOW
              </h2>
            </div>
            <p className="text-slate-600 text-xs max-w-md font-normal">
              Chaque filiale développe des plateformes logicielles et des solutions concrètes pour accélérer la transition numérique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupProducts.map((prod, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-blue-400 transition-all">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center">
                    <prod.icon size={20} />
                  </div>
                  <span className="text-[9px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
                    {prod.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900">{prod.name}</h3>
                <p className="text-xs italic text-blue-700 font-medium">"{prod.slogan}"</p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{prod.desc}</p>
                <span className="text-[10px] font-mono text-slate-500 block pt-2 font-semibold">Développé par : {prod.subsidiary}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Architecture Visual */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="p-8 lg:p-12 border border-slate-200 bg-white rounded-[2.5rem] text-center space-y-8 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">ARCHITECTURE DE HOLDING</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
              Une Vision Synergique & Mondiale
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              YOU KNOW SOCIETY impulse la gouvernance, l'investissement technologique et l'excellence pour ses 18 filiales, afin de créer un impact durable en Afrique et dans le monde.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-2xl font-display font-bold text-blue-700">Gouvernance</div>
              <p className="text-xs text-slate-600">Supervision stratégique et soutien transverse de la société holding.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-2xl font-display font-bold text-indigo-700">Synergie R&D</div>
              <p className="text-xs text-slate-600">Partage des briques IA, cloud, design et de l'infrastructure commune.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-2xl font-display font-bold text-emerald-700">Impact Social</div>
              <p className="text-xs text-slate-600">Pôle de formation YOU KNOW ACADEMY et création d'emplois qualifiés.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
