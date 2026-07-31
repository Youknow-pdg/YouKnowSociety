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
    <div className="pb-32 bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="py-20 lg:py-28 border-b border-slate-200 relative technical-grid overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles size={14} /> OFFRE DE SERVICES D'EXCELLENCE
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight">
              Nos Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">& Solutions IT</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
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
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center border border-blue-200">
                <cat.icon size={28} />
              </div>
              <span className="text-xs font-mono text-blue-700 font-bold uppercase tracking-widest">{cat.badge}</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900">{cat.hero}</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                {cat.desc}
              </p>
              <div className="pt-2">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 hover:text-blue-900 border-b border-blue-300 pb-1"
                >
                  Demande de devis sur mesure <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {cat.items.map((item, i) => (
                <div key={i} className="p-6 border border-slate-200 rounded-3xl bg-white hover:border-blue-500 hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 bg-slate-100 text-blue-700 rounded-xl flex items-center justify-center mb-4 border border-slate-200 group-hover:bg-blue-100 transition-colors">
                    <item.i size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display mb-2">{item.t}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">{item.d}</p>
                </div>
              ))}
              
              <div className="p-6 border border-blue-200 rounded-3xl bg-blue-50/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-blue-800 uppercase font-bold">ACCOMPAGNEMENT DÉDIÉ</span>
                  <h3 className="text-base font-bold text-slate-900 font-display mt-1 mb-2">Projet spécifique ?</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">Consultez nos experts pour une étude de faisabilité personnalisée.</p>
                </div>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900"
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
        <div className="p-8 lg:p-12 border border-slate-200 bg-white rounded-[2.5rem] shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">ENGAGEMENT DU GROUPE</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
                Rigueur, Sécurité et Réactivité
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Toutes nos prestations s'inscrivent dans une démarche de qualité stricte, avec garanties de réactivité et confidentialité des données selon les standards internationaux.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Suivi de projet continuous',
                  'Support technique réactif',
                  'Garantie de satisfaction',
                  'Archivage sécurisé des données'
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="text-xs font-mono font-bold text-slate-700 uppercase">Besoin d'une proposition commerciale ?</div>
              <p className="text-xs text-slate-600">Notre équipe commerciale vous répond sous 24h ouvrées.</p>
              <Link
                to="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
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

