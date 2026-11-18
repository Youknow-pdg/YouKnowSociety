import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, TrendingUp, Target, Sparkles, FolderKanban, 
  Quote, ArrowRight, Layers, Award, Search, Filter, Eye, X, 
  Send, ExternalLink, Store, GraduationCap, Bot, Palette, 
  BarChart3, ShieldCheck, Clock, Users, ChevronRight, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudy {
  id: string;
  category: 'saas' | 'academy' | 'ia' | 'digital';
  categoryLabel: string;
  title: string;
  client: string;
  duration: string;
  location: string;
  desc: string;
  problem: string;
  solution: string;
  result: string;
  testimonial: string;
  author: string;
  role: string;
  accentGradient: string;
  icon: any;
  deliverables: string[];
  techUsed: string[];
  actionLink: string;
  actionLabel: string;
  metrics: { label: string; val: string; detail: string }[];
}

const cases: CaseStudy[] = [
  {
    id: 'sastock-retail',
    category: 'saas',
    categoryLabel: 'Logiciel SaaS & Retail',
    title: 'Déploiement SaaS SASTOCK pour Commerçants & Boutiques à Dakar et Touba',
    client: 'YOU KNOW TECH • Filière Commerce & Retail',
    duration: 'Déploiement en 48h par boutique',
    location: 'Dakar, Touba & Régions (Sénégal)',
    desc: 'Installation, configuration cloud et prise en main du logiciel SASTOCK pour plus de 120 boutiques, magasins et commerces au Sénégal.',
    problem: 'Pertes financières récurrentes dues à la gestion manuelle sur cahier, ruptures de stock imprévues et incapacité de calculer les bénéfices nets réels au quotidien.',
    solution: 'Mise en place de SASTOCK SaaS avec connexion Google sécurisée, alertes automatiques de seuil critique et tableau de bord en temps réel sur smartphone et ordinateur.',
    result: '+38% de bénéfices nets mesurés sur 6 mois et 0 erreur d\'inventaire constatée sur les boutiques équipées.',
    testimonial: 'Grâce à SASTOCK de YOU KNOW TECH, je contrôle mes deux boutiques à distance depuis mon téléphone et je connais mon bénéfice exact au franc près chaque soir.',
    author: 'Mariama B.',
    role: 'Gérante, Boutique Élégance Touba',
    accentGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    icon: Store,
    deliverables: [
      'Configuration multi-boutiques sur le cloud SASTOCK',
      'Importation initiale du catalogue produits et codes-barres',
      'Formation express des vendeurs et gérants sur mobile/PC',
      'Tableau de bord de suivi des ventes et marges en temps réel'
    ],
    techUsed: ['SASTOCK SaaS', 'Cloud Temps Réel', 'Google Auth', 'Mobile & Desktop'],
    actionLink: '/applications',
    actionLabel: 'Tester SASTOCK dans Applications',
    metrics: [
      { label: 'Boutiques actives', val: '120+', detail: 'Commerces équipés au Sénégal' },
      { label: 'Gain de temps', val: '15h/sem', detail: 'Économisées sur les inventaires' },
      { label: 'Bénéfices suivis', val: '100%', detail: 'Traçabilité financière complète' }
    ]
  },
  {
    id: 'academy-bureautique-ia',
    category: 'academy',
    categoryLabel: 'Formation & Certification',
    title: 'Certification Informatique Bureautique & IA : 250+ Apprenants Formés',
    client: 'YOU KNOW ACADEMY • Pôle Éducation & Compétences',
    duration: 'Cursus intensif de 3 semaines',
    location: '100% En ligne & Hybride (Dakar)',
    desc: 'Parcours certifiant pratique combinant maîtrise complète de Word, Excel avancé, PowerPoint, Access, Outlook et outils d\'Intelligence Artificielle.',
    problem: 'Lacunes opérationnelles sur les logiciels de bureautique et les nouveaux outils IA, freinant l\'insertion professionnelle et la productivité en entreprise.',
    solution: 'Formation 100% pratique basée sur des projets réels (tableaux croisés dynamiques Excel, rapports automatisés, présentations d\'impact) avec suivi personnalisé et certificat.',
    result: '98% de taux de réussite aux évaluations pratiques et plus de 60% des diplômés promus ou recrutés en moins de 3 mois.',
    testimonial: 'La formation bureautique de YOU KNOW ACADEMY a complètement transformé ma façon de travailler. J\'ai maîtrisé Excel et les outils IA en 3 semaines avec des cas concrets !',
    author: 'Cheikh N.',
    role: 'Apprenant Certifié • Promotion 2026',
    accentGradient: 'from-blue-600 via-indigo-600 to-violet-700',
    icon: GraduationCap,
    deliverables: [
      'Maîtrise pratique de Word, Excel, PowerPoint, Access et Windows',
      'Création de tableaux de bord financiers et factures automatisées',
      'Initiation aux meilleurs outils d\'IA générative pour la bureautique',
      'Délivrance d\'une attestation / certificat officiel de réussite'
    ],
    techUsed: ['Microsoft Office', 'Excel Avancé', 'Outils IA', 'Pédagogie Active'],
    actionLink: '/services',
    actionLabel: 'Découvrir les Formations',
    metrics: [
      { label: 'Apprenants certifiés', val: '250+', detail: 'Étudiants et professionnels' },
      { label: 'Taux de réussite', val: '98%', detail: 'Validation sur projets pratiques' },
      { label: 'Satisfaction', val: '4.9/5', detail: 'Note moyenne des promotions' }
    ]
  },
  {
    id: 'ia-logistics-automation',
    category: 'ia',
    categoryLabel: 'IA & Automatisation',
    title: 'Automatisation IA & Plateforme de Suivi pour Logistique & Transport',
    client: 'YOU KNOW TECH • Sow Logistics Sénégal',
    duration: 'Développement en 4 semaines',
    location: 'Dakar & Axes Inter-régionaux',
    desc: 'Conception d\'un système d\'automatisation et d\'une application web intelligente pour la gestion des livraisons et le traitement instantané des requêtes clients.',
    problem: 'Surcharge quotidienne du service client sur WhatsApp et téléphone pour suivre le statut des colis inter-régionaux et assigner les chauffeurs.',
    solution: 'Développement d\'une plateforme web sur mesure couplée à un flux d\'automatisation intelligent qui notifie les clients en temps réel et optimise l\'attribution des courses.',
    result: 'Réduction de 85% des appels entrants au support et doublement de la capacité de traitement journalier des expéditions.',
    testimonial: 'L\'équipe YOU KNOW TECH a développé pour nous une solution fluide et fiable qui renseigne nos clients 24h/24 sans erreur et soulage toute notre équipe logistique.',
    author: 'Amadou S.',
    role: 'Directeur des Opérations, Sow Logistics',
    accentGradient: 'from-indigo-600 via-purple-600 to-blue-800',
    icon: Bot,
    deliverables: [
      'Application web de suivi des colis et tableau de bord dispatcheur',
      'Automatisation des réponses et notifications de livraison 24h/24',
      'Génération automatique des bons de livraison et rapports PDF',
      'Formation des équipes opérationnelles et support technique continu'
    ],
    techUsed: ['Automatisation IA', 'Application Web', 'API Temps Réel', 'Workflow Cloud'],
    actionLink: '/contact',
    actionLabel: 'Automatiser mon Entreprise',
    metrics: [
      { label: 'Appels support', val: '-85%', detail: 'Réduction des appels répétitifs' },
      { label: 'Temps de réponse', val: '< 2 sec', detail: 'Information client instantanée' },
      { label: 'Disponibilité', val: '24/7', detail: 'Service automatisé continu' }
    ]
  },
  {
    id: 'branding-web-multimedia',
    category: 'digital',
    categoryLabel: 'Web, Design & Voix Off',
    title: 'Refonte Digitale, Identité Visuelle & Voix Off Professionnelle',
    client: 'Feselma Digital & SDM • Partenaires du Groupe',
    duration: 'Livraison complète en 3 semaines',
    location: 'Dakar, Sénégal',
    desc: 'Création d\'une charte graphique complète, développement d\'un site web vitrine ultra-rapide et production de capsules vidéo avec voix off professionnelle.',
    problem: 'Besoin d\'une présence numérique moderne et cohérente pour valoriser les prestations techniques et convertir les visiteurs en clients qualifiés.',
    solution: 'Conception d\'une identité visuelle forte (logo, affiches publicitaires), développement d\'un site web responsive mobile-first et réalisation d\'un spot vidéo avec voix off HD.',
    result: 'Augmentation de +110% des demandes de devis en 30 jours et renforcement immédiat de la crédibilité commerciale.',
    testimonial: 'Une collaboration exemplaire avec YOU KNOW SOCIETY. Le design, la voix off professionnelle et la rapidité du site web sur téléphone dépassent toutes nos attentes.',
    author: 'Ibrahima F.',
    role: 'Responsable Stratégie, Feselma Digital',
    accentGradient: 'from-amber-600 via-orange-600 to-rose-700',
    icon: Palette,
    deliverables: [
      'Identité visuelle complète : logo vectoriel, charte et affiches',
      'Site web vitrine responsive optimisé pour mobile et référencement',
      'Spot promotionnel avec montage vidéo et voix off studio',
      'Intégration de formulaires de demande de devis directs'
    ],
    techUsed: ['Développement Web', 'Design Graphique', 'Voix Off HD', 'Montage Vidéo'],
    actionLink: '/partners',
    actionLabel: 'Voir nos Partenaires',
    metrics: [
      { label: 'Devis entrants', val: '+110%', detail: 'En 30 jours après lancement' },
      { label: 'Score Mobile', val: '99/100', detail: 'Performance & fluidité mobile' },
      { label: 'Nouveaux clients', val: '35+', detail: 'Générés dès le premier trimestre' }
    ]
  }
];

const filterCategories = [
  { id: 'all', label: 'Tous les Projets (4)' },
  { id: 'saas', label: 'Logiciel SASTOCK & SaaS' },
  { id: 'academy', label: 'YOU KNOW ACADEMY' },
  { id: 'ia', label: 'IA & Automatisation' },
  { id: 'digital', label: 'Web, Design & Voix Off' }
] as const;

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'saas' | 'academy' | 'ia' | 'digital'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCaseModal, setActiveCaseModal] = useState<CaseStudy | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProjectTopic, setSelectedProjectTopic] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredCases = cases.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      c.title.toLowerCase().includes(q) ||
      c.client.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.techUsed.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const handleOpenProjectForm = (topicTitle?: string) => {
    setSelectedProjectTopic(topicTitle || 'Nouveau projet sur mesure');
    setActiveCaseModal(null);
    setShowProjectForm(true);
    setSubmitted(false);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'devis',
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          company: formState.company,
          subject: `[ÉTUDE DE CAS / DEVIS] ${selectedProjectTopic}`,
          message: `Projet de référence : ${selectedProjectTopic}\nEntreprise : ${formState.company || 'Non spécifiée'}\nBesoin exprimé : ${formState.message}`
        })
      });
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="pb-20 sm:pb-32 bg-slate-50 text-slate-900 min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <section className="py-10 sm:py-16 lg:py-24 border-b border-slate-200 relative technical-grid overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-5 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center gap-2 text-blue-700 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest">
              <FolderKanban size={15} className="shrink-0 text-blue-600" />
              <span>Réalisations · Impact · Études de Cas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight px-1">
              Projets Concrets &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800">
                Impact Mesurable
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto px-1">
              Découvrez comment <strong className="text-slate-900 font-semibold">YOU KNOW SOCIETY</strong>, <strong className="text-slate-900 font-semibold">YOU KNOW TECH</strong> et <strong className="text-slate-900 font-semibold">YOU KNOW ACADEMY</strong> accompagnent les entreprises, commerçants et professionnels avec des résultats vérifiables.
            </p>
          </motion.div>

          {/* Global Impact Summary Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto pt-2 sm:pt-4">
            {[
              { val: '120+', label: 'Commerces sur SASTOCK', sub: 'Gestion de stock & ventes' },
              { val: '250+', label: 'Certifiés Academy', sub: 'Bureautique & IA pratique' },
              { val: '-85%', label: 'Charge Support Client', sub: 'Grâce à l\'automatisation IA' },
              { val: '98%', label: 'Satisfaction Globale', sub: 'Sur l\'ensemble des projets' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left flex flex-col justify-between"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-blue-700 tabular-nums">
                  {stat.val}
                </div>
                <div className="mt-1">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{stat.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search & Interactive Category Filter Bar */}
          <div className="max-w-4xl mx-auto pt-3 sm:pt-5 space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une étude de cas (ex: SASTOCK, Excel, IA, Voix off, Dakar...)"
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl py-3 pl-10 sm:pl-11 pr-16 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-[11px] font-mono font-bold text-slate-600 hover:text-slate-900 bg-slate-200/70 rounded-lg cursor-pointer"
                >
                  Effacer
                </button>
              )}
            </div>

            <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {filterCategories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                      active
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-14 mt-8 sm:mt-14">
        {filteredCases.length === 0 ? (
          <div className="p-8 sm:p-12 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm">
            <p className="text-slate-700 font-semibold text-sm sm:text-base">
              Aucune étude de cas ne correspond à votre recherche « {searchQuery} ».
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Afficher toutes les réalisations
            </button>
          </div>
        ) : (
          filteredCases.map((c, idx) => {
            const IconComponent = c.icon;
            return (
              <article
                key={c.id}
                className="p-4 sm:p-8 lg:p-10 border border-slate-200 bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
                  
                  {/* Left Column: Visual Showcase Card + Metrics */}
                  <div className="lg:col-span-5 space-y-4 sm:space-y-5 min-w-0">
                    {/* Resilient Architectural Showcase Visual */}
                    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${c.accentGradient} p-5 sm:p-6 text-white shadow-md min-h-[210px] sm:min-h-[240px] flex flex-col justify-between`}>
                      {/* Subtle geometric background pattern */}
                      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                      <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
                        <IconComponent size={96} />
                      </div>

                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/90">
                          0{idx + 1} · {c.categoryLabel}
                        </span>
                        <span className="text-[11px] font-mono text-white/85 flex items-center gap-1">
                          <Clock size={12} className="shrink-0" />
                          <span>{c.duration}</span>
                        </span>
                      </div>

                      <div className="relative z-10 my-4 space-y-2">
                        <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
                          <IconComponent size={22} className="text-white" />
                        </div>
                        <div className="text-base sm:text-lg font-display font-bold leading-snug text-white">
                          {c.client}
                        </div>
                        <p className="text-xs text-white/85 leading-relaxed">
                          Lieu : {c.location}
                        </p>
                      </div>

                      {/* Unboxed Metadata Line */}
                      <div className="relative z-10 pt-3 border-t border-white/20 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-white/90">
                        {c.techUsed.map((tech, tIdx) => (
                          <span key={tech} className="inline-flex items-center gap-2">
                            <span>{tech}</span>
                            {tIdx < c.techUsed.length - 1 && <span aria-hidden="true">·</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Box - Responsive for narrow mobile screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      {c.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="flex sm:flex-col items-center justify-between sm:justify-center sm:text-center p-2 sm:p-1.5 rounded-xl bg-white sm:bg-transparent border sm:border-0 border-slate-200/70"
                        >
                          <div className="text-left sm:text-center">
                            <div className="text-xs font-semibold text-slate-700 sm:hidden">{m.label}</div>
                            <div className="text-[11px] text-slate-500 sm:hidden">{m.detail}</div>
                          </div>
                          <div className="text-lg sm:text-xl font-extrabold font-display text-blue-700 tabular-nums shrink-0">
                            {m.val}
                          </div>
                          <div className="hidden sm:block text-[10px] font-mono text-slate-600 font-semibold uppercase mt-0.5 leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Case Study Content & Actions */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-5 min-w-0">
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider break-words">
                        {c.client}
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900 leading-snug break-words">
                        {c.title}
                      </h2>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 font-normal">
                        {c.desc}
                      </p>
                    </div>

                    {/* Problem & Solution Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                          <Target size={15} className="text-blue-600 shrink-0" />
                          <span>Problématique Initiale</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed font-normal">{c.problem}</p>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                          <span>Solution Déployée</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed font-normal">{c.solution}</p>
                      </div>
                    </div>

                    {/* Measured Result Callout */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start sm:items-center justify-between gap-3">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-mono text-blue-800 uppercase font-bold block">
                          Résultat Mesuré & Impact
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 font-display leading-snug">
                          {c.result}
                        </p>
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center border border-blue-200 shrink-0">
                        <TrendingUp size={18} />
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-800 font-bold font-mono">
                        <Quote size={14} className="text-amber-600 shrink-0" />
                        <span>Témoignage Client</span>
                      </div>
                      <p className="text-slate-700 italic leading-relaxed">"{c.testimonial}"</p>
                      <div className="text-[11px] font-bold text-slate-900 font-display flex flex-wrap items-center justify-end gap-1 pt-0.5">
                        <span>— {c.author}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-600 font-normal">{c.role}</span>
                      </div>
                    </div>

                    {/* Interactive Action Bar (Mobile full-width buttons, Desktop inline) */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 border-t border-slate-100">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setActiveCaseModal(c)}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Eye size={15} className="text-blue-600 shrink-0" />
                          <span>Détails & Livrables</span>
                        </button>

                        <Link
                          to={c.actionLink}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>{c.actionLabel}</span>
                          <ChevronRight size={14} className="shrink-0" />
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenProjectForm(c.title)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <span>Projet similaire</span>
                        <ArrowRight size={14} className="shrink-0" />
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Bottom CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 sm:mt-24">
        <div className="p-6 sm:p-10 lg:p-14 text-center border border-slate-200 bg-white rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 shadow-md">
          <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles size={15} className="shrink-0 text-amber-600" />
            <span>Votre Succès Commence Ici</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 leading-tight max-w-3xl mx-auto">
            Prêt à transformer vos idées en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
              réussite technologique
            </span>{' '}
            ?
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal">
            Contactez les experts de YOU KNOW SOCIETY pour concevoir vos applications web, déployer le logiciel SASTOCK dans votre commerce ou former vos équipes avec YOU KNOW ACADEMY.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-md sm:max-w-none mx-auto">
            <button
              type="button"
              onClick={() => handleOpenProjectForm('Étude personnalisée & Devis sur mesure')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Demander une étude ou un devis</span>
              <ArrowRight size={16} className="shrink-0" />
            </button>

            <Link
              to="/events"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Participer à nos Webinaires Live</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal 1: Case Study Full Deliverables & Technical Breakdown */}
      <AnimatePresence>
        {activeCaseModal && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setActiveCaseModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="min-w-0">
                  <span className="text-[11px] font-mono font-bold text-blue-700 uppercase">
                    {activeCaseModal.client}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-slate-900 mt-1 leading-snug">
                    {activeCaseModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCaseModal(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-5 space-y-5 text-xs sm:text-sm text-slate-600">
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Durée du projet</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{activeCaseModal.duration}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Zone d'intervention</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{activeCaseModal.location}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-900">
                    Livrables & Réalisations Clés :
                  </h4>
                  <ul className="space-y-2">
                    {activeCaseModal.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-900">
                    Indicateurs de Performance :
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeCaseModal.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80">
                        <div className="text-lg font-display font-extrabold text-blue-700 tabular-nums">{m.val}</div>
                        <div className="text-xs font-bold text-slate-900">{m.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{m.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <Link
                  to={activeCaseModal.actionLink}
                  onClick={() => setActiveCaseModal(null)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>{activeCaseModal.actionLabel}</span>
                  <ChevronRight size={15} />
                </Link>
                <button
                  type="button"
                  onClick={() => handleOpenProjectForm(activeCaseModal.title)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Demander un projet similaire</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: Direct Project Inquiry / Quote Request */}
      <AnimatePresence>
        {showProjectForm && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowProjectForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[92vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-700 uppercase">
                    YOU KNOW SOCIETY · ÉTUDE & DEVIS
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 mt-0.5">
                    Lancer votre projet avec notre équipe
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProjectForm(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 size={30} />
                  </div>
                  <h4 className="text-lg font-display font-bold text-slate-900">
                    Demande transmise avec succès !
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Notre équipe technique a bien reçu votre demande concernant <strong className="text-slate-900">« {selectedProjectTopic} »</strong>. Nous vous recontacterons très rapidement par téléphone ou e-mail.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2.5">
                    <a
                      href="https://wa.me/221702007285"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <span>Discuter sur WhatsApp (+221 70 200 72 85)</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowProjectForm(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="py-4 space-y-3.5">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                    <span className="font-bold">Référence :</span> {selectedProjectTopic}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Votre nom et prénom"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+221 7X XXX XX XX"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                        Adresse E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="contact@entreprise.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                        Entreprise / Boutique
                      </label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        placeholder="Nom de votre structure"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                      Décrivez votre besoin *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Précisez vos objectifs (déploiement SASTOCK, site web, automatisation IA, formation bureautique...)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Send size={15} />
                    <span>{submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


