import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Target, Sparkles, FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';

const cases = [
  {
    title: 'Digitalisation & SaaS SASTOCK',
    client: 'Réseau de Commerçants & PME',
    desc: 'Déploiement du logiciel SaaS SASTOCK pour le contrôle des stocks en temps réel et le suivi des bénéfices commercial.',
    problem: 'Gestion manuelle du stock sujette aux erreurs et ruptures fréquentes.',
    solution: 'Plateforme SaaS cloud intuitive avec tableaux de bord et alertes de rupture.',
    result: 'Visibilité totale du stock et croissance mesurée des bénéfices.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    tags: ['SaaS', 'SASTOCK', 'Commerce'],
  },
  {
    title: 'Formation IT & Bureautique 100% Pratique',
    client: 'YOU KNOW ACADEMY',
    desc: 'Structure et déploiement de cursus certifiants en bureautique, IA et développement web.',
    problem: 'Manque de formations concrètes orientées projets pratiques sur le marché.',
    solution: 'Parcours hybrides de 3 semaines avec projets hebdomadaires et suivi personnalisé.',
    result: 'Certifications délivrées et forte employabilité des talents formés.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    tags: ['Éducation', 'Bureautique', 'IA'],
  },
  {
    title: 'Transformation Digitale & Identité Visuelle',
    client: 'Entreprises & Institutions',
    desc: 'Refonte complète de marques, création de chartes graphiques, voix off et sites d\'entreprise.',
    problem: 'Images de marque vieillissantes et faible présence sur le canal numérique.',
    solution: 'Création d\'identités visuelles modernes, vidéos rythmées et sites web haute performance.',
    result: 'Augmentation de la notoriété et acquisition de nouveaux partenaires.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Branding', 'Design IA', 'Web'],
  },
];

export default function CaseStudies() {
  return (
    <div className="pb-32">
      {/* Header */}
      <section className="py-20 lg:py-28 border-b border-white/10 relative technical-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-mono font-bold uppercase tracking-widest">
              <FolderKanban size={14} /> RÉALISATIONS & IMPACT CONCRET
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight">
              Projets Réalisés <span className="text-gradient">& Témoignages</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Découvrez comment YOU KNOW SOCIETY et ses filiales accompagnent concrètement les particuliers, PME et institutions vers l'excellence numérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <div className="max-w-7xl mx-auto px-6 space-y-24 mt-20">
        {cases.map((c, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 lg:p-12 border-white/10 bg-slate-900/60 rounded-[2.5rem]"
          >
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                <img 
                  src={c.image} 
                  alt={c.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {c.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono font-bold text-blue-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">{c.client}</span>
                  <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-1 mb-3">{c.title}</h2>
                  <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-blue-500/40 pl-4">
                    "{c.desc}"
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                      <Target size={14} className="text-blue-400" /> Problématique
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{c.problem}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 size={14} className="text-emerald-400" /> Solution Apportée
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{c.solution}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Résultat Mesuré</span>
                    <p className="text-sm font-bold text-white font-display mt-0.5">{c.result}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="glass-card p-8 lg:p-16 text-center border-white/10 bg-slate-950/80 rounded-[2.5rem] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles size={14} /> VOTRE PROJET NUMÉRIQUE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Prêt à transformer vos idées en <span className="text-gradient">succès technologique</span> ?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Contactez l'équipe YOU KNOW SOCIETY pour échanger sur vos besoins et recevoir un accompagnement personnalisé.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all"
            >
              Initier un Projet avec le Groupe
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

