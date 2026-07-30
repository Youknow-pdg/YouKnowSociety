import { motion } from 'motion/react';
import { Layout, Shield, Headphones, Lightbulb, Code, Terminal, Server, Database, Smartphone, Brain, PenTool, Camera, Wrench, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    hero: 'Développement Web & Logiciel',
    badge: 'YOU KNOW TECH',
    icon: Code,
    desc: 'Nous concevons des plateformes web et des logiciels d\'entreprise sur mesure, performants et intuitifs, avec des architectures de données sécurisées.',
    items: [
      { t: 'Sites Web Vitrines & E-commerce', d: 'Développement de sites d\'entreprise et boutiques en ligne hautement optimisés.', i: Layout },
      { t: 'Applications Web & Mobiles', d: 'Développement d\'applications performantes PWA et natives.', i: Smartphone },
      { t: 'Logiciels SaaS', d: 'Conception de solutions cloud multi-locataires comme notre logiciel SASTOCK.', i: Database },
    ],
  },
  {
    hero: 'Intelligence Artificielle & Automatisation',
    badge: 'PÔLE INNOVATION',
    icon: Brain,
    desc: 'Propulsez votre productivité d\'entreprise grâce à l\'intégration intelligente des outils IA génératifs et l\'automatisation de vos flux de travail.',
    items: [
      { t: 'Intégration d\'IA Générative', d: 'Mise en œuvre sur mesure de modèles d\'IA pour vos processus d\'entreprise.', i: Brain },
      { t: 'Automatisation de Workflows', d: 'Conception de scripts et flux automatiques pour éliminer les tâches répétitives.', i: Terminal },
      { t: 'Conseil & Audit IA', d: 'Audit de maturité digitale et recommandation des meilleures solutions IA.', i: Lightbulb },
    ],
  },
  {
    hero: 'Identité Visuelle & Multimédia',
    badge: 'CREATIVE HUB',
    icon: PenTool,
    desc: 'Donnez une image de marque forte et mémorable grâce à nos services de création visuelle, identité de marque et voix off.',
    items: [
      { t: 'Création d\'Identités Visuelles', d: 'Conception de logos professionnels, chartes graphiques et guidelines.', i: PenTool },
      { t: 'Affiches & Visuels Publicitaires', d: 'Création de visuels de communication percutants pour vos campagnes.', i: Layout },
      { t: 'Montage Vidéo & Voix Off', d: 'Réalisation de vidéos promotionnelles rythmées avec voix off professionnelle.', i: Camera },
    ],
  },
  {
    hero: 'Maintenance, OS & Support Technique',
    badge: 'SERVICES TECHNIQUES',
    icon: Wrench,
    desc: 'Gardez vos équipements informatiques performants et sécurisés grâce à notre équipe technique dédiée.',
    items: [
      { t: 'Installation de Systèmes', d: 'Configuration complète et sécurisée d\'environnements Windows et Linux.', i: Server },
      { t: 'Maintenance & Nettoyage', d: 'Maintenance préventive et curative, nettoyage complet d\'ordinateurs.', i: Wrench },
      { t: 'Support Technique Continue', d: 'Assistance technique directe et accompagnement de vos projets informatiques.', i: Headphones },
    ],
  },
];

export default function Services() {
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
              <Sparkles size={14} /> OFFRE DE SERVICES D'EXCELLENCE
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight">
              Nos Services <span className="text-gradient">& Solutions IT</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Une gamme complète de prestations technologiques supervisées par YOU KNOW SOCIETY pour garantir la performance et la transformation digitale de votre structure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mt-20 space-y-28">
        {serviceCategories.map((cat, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="grid lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <cat.icon size={28} />
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">{cat.badge}</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">{cat.hero}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {cat.desc}
              </p>
              <div className="pt-2">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 border-b border-blue-500/30 pb-1"
                >
                  Demande de devis sur mesure <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {cat.items.map((item, i) => (
                <div key={i} className="glass-card p-6 border-white/10 hover:border-blue-500/40 transition-all group bg-slate-900/60">
                  <div className="w-10 h-10 bg-white/5 text-blue-400 rounded-xl flex items-center justify-center mb-4 border border-white/5 group-hover:bg-blue-600/20 transition-colors">
                    <item.i size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-2">{item.t}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.d}</p>
                </div>
              ))}
              
              <div className="glass-card p-6 border-blue-500/30 bg-blue-950/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">ACCOMPAGNEMENT DÉDIÉ</span>
                  <h3 className="text-base font-bold text-white font-display mt-1 mb-2">Projet spécifique ?</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">Consultez nos experts pour une étude de faisabilité personnalisée.</p>
                </div>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white"
                >
                  Contacter l'équipe <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* SLA & Quality Guarantee */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="glass-card p-8 lg:p-12 border-white/10 bg-slate-900/80 rounded-[2.5rem]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">ENGAGEMENT DU GROUPE</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                Rigueur, Sécurité et Réactivité
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Toutes nos prestations s'inscrivent dans une démarche de qualité stricte, avec garanties de réactivité et confidentialité des données selon les standards internationaux.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Suivi de projet continu',
                  'Support technique réactif',
                  'Garantie de satisfaction',
                  'Archivage sécurisé des données'
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">Besoin d'une proposition commerciale ?</div>
              <p className="text-xs text-slate-300">Notre équipe commerciale vous répond sous 24h ouvrées.</p>
              <Link
                to="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                Obtenir un Devis Gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

