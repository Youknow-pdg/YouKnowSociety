import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Wrench, Building2, Car, Radio, ExternalLink, 
  CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Cpu, 
  Layers, Search, Send, MessageSquare, Terminal, ChevronRight,
  Sliders, Award, Zap, Phone, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Partner {
  id: string;
  name: string;
  shortTag: string;
  category: string;
  categoryGroup: 'tech' | 'btp' | 'auto' | 'drone';
  badge: string;
  badgeBg: string;
  websiteUrl?: string;
  managedByYouKnow?: boolean;
  description: string;
  detailedBio: string;
  accentColor: string;
  gradientBg: string;
  icon: any;
  services: string[];
  keyStats: { label: string; value: string }[];
  synergyWithYouKnow: string;
}

const partnersList: Partner[] = [
  {
    id: 'feselma-digital',
    name: 'Feselma Digital',
    shortTag: 'Stratégie Digitale & Media Agency',
    category: 'Agence Digitale & Médias',
    categoryGroup: 'tech',
    badge: 'Partenaire Officiel Web & Com',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    websiteUrl: 'https://feselmadigital.com',
    description: 'Agence de transformation numérique et de création digitale d\'excellence. Feselma Digital façonne des plateformes web/mobiles haute performance et déploie des stratégies de communication & branding à fort impact.',
    detailedBio: 'Feselma Digital est le partenaire stratégique clé dans l\'ingénierie créative et le développement numérique. Spécialisée dans la conception d\'identités de marque percutantes, la création de contenus médias et le marketing digital orienté croissance, l\'agence accompagne les institutions et entreprises exigeantes.',
    accentColor: 'from-purple-600 via-indigo-600 to-pink-600',
    gradientBg: 'from-purple-950/40 via-indigo-950/30 to-slate-950',
    icon: Globe,
    services: [
      'Développement Web & Mobile sur mesure (React, Next, Apps)',
      'Stratégie de Communication Digitale & Branding',
      'Marketing Digital & Acquisition Client (Growth)',
      'Production de Contenus Médias & Design Graphique',
      'Accompagnement & Conseil en Transformation Digitale'
    ],
    keyStats: [
      { label: 'Projets Digitaux', value: '120+' },
      { label: 'Satisfaction Client', value: '99%' },
      { label: 'Site Officiel', value: 'feselmadigital.com' }
    ],
    synergyWithYouKnow: 'Co-développement de plateformes d\'envergure, synergie marketing avec YOU KNOW TECH et mise à disposition de stratégies de communication intégrées pour les clients du groupe.'
  },
  {
    id: 'sdm-services',
    name: 'SDM (Services Digitaux & Maintenance)',
    shortTag: 'Services Numériques & Maintenance IT',
    category: 'Infrastructure IT & Maintenance',
    categoryGroup: 'tech',
    badge: 'Support & Infogérance IT',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    description: 'Acteur majeur des services numériques et de la maintenance informatique. SDM propose des solutions d\'installation de systèmes d\'exploitation, de création de sites web et d\'optimisation matérielle & logicielle.',
    detailedBio: 'SDM (Services Digitaux & Maintenance) assure la viabilité et la performance des outils technologiques des particuliers et entreprises. De la maintenance curative/préventive à la configuration avancée de serveurs et systèmes Windows/Linux, SDM garantit un environnement informatique fluide et sécurisé.',
    accentColor: 'from-blue-600 via-cyan-600 to-teal-600',
    gradientBg: 'from-blue-950/40 via-cyan-950/30 to-slate-950',
    icon: Wrench,
    services: [
      'Installation & Configuration Systèmes (Windows, Linux, Server)',
      'Maintenance Informatique Globale (Nettoyage, Dépannage, Optimisation)',
      'Création & Conception de Sites Web Dynamiques',
      'Configuration de Réseaux Informatiques & Sécurité',
      'Support Technique Réactif & Infogérance d\'Entreprise'
    ],
    keyStats: [
      { label: 'Disponibilité Support', value: '24/7' },
      { label: 'Interventions Réussies', value: '1 500+' },
      { label: 'Satisfaction IT', value: '100%' }
    ],
    synergyWithYouKnow: 'Gestion opérationnelle de la maintenance des parcs informatiques des filiales de YOU KNOW SOCIETY et déploiement des infrastructures matérielles clients.'
  },
  {
    id: 'merveille-bat',
    name: 'Merveille Bat',
    shortTag: 'BTP, Architecture & Immobilier',
    category: 'Immobilier & Construction',
    categoryGroup: 'btp',
    badge: 'Ingénierie BTP & Architecture',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    description: 'Entreprise de référence dans le secteur de la construction, de la conception architectural moderne et de la gestion locative. Merveille Bat réalise des bâtiments d\'exception et administre vos biens immobiliers.',
    detailedBio: 'Merveille Bat est un acteur visionnaire de la construction et de l\'aménagement immobilier au Sénégal. Spécialisée dans la conception de plans architecturaux 3D futuristes, la réalisation de chantiers d\'envergure et la gestion locative rigoureuse, Merveille Bat transforme le paysage urbain.',
    accentColor: 'from-amber-600 via-orange-600 to-yellow-600',
    gradientBg: 'from-amber-950/40 via-orange-950/30 to-slate-950',
    icon: Building2,
    services: [
      'Construction de Bâtiments & Gros Œuvres BTP',
      'Conception Architectural & Modélisation 3D',
      'Gestion Locative & Administration Clé en Main de Biens',
      'Rénovation, Aménagement & Design d\'Intérieur',
      'Conseil en Investissement & Promotion Immobilière'
    ],
    keyStats: [
      { label: 'Chantiers Livrés', value: '45+' },
      { label: 'Gestion Locative', value: '300+ Biens' },
      { label: 'Qualité Garantie', value: 'Normes ISO' }
    ],
    synergyWithYouKnow: 'Numérisation du parc locatif via les outils SaaS de YOU KNOW TECH et conception des espaces physiques et bureaux intelligents des filiales du groupe.'
  },
  {
    id: 'autolink',
    name: 'AutoLink',
    shortTag: 'Marketplace Automobile & Vente Auto',
    category: 'Plateforme Automobile (YOU KNOW)',
    categoryGroup: 'auto',
    badge: 'Gérée par YOU KNOW SOCIETY',
    badgeBg: 'bg-red-500/10 border-red-500/30 text-red-300 font-bold',
    managedByYouKnow: true,
    description: 'Plateforme technologique de vente et d\'achat de véhicules automobiles développée et propulsée directement par la société YOU KNOW SOCIETY. Une expérience fluide et sécurisée pour les vendeurs et acheteurs.',
    detailedBio: 'AutoLink est la solution de mobilité et de commerce automobile du groupe YOU KNOW. Elle centralise les offres de véhicules vérifiés, simplifie la mise en relation entre concessions et particuliers, et offre une gestion transparente de l\'historique technique de chaque automobile.',
    accentColor: 'from-red-600 via-rose-600 to-emerald-600',
    gradientBg: 'from-red-950/40 via-rose-950/30 to-slate-950',
    icon: Car,
    services: [
      'Marketplace de Vente & d\'Achat de Véhicules',
      'Système de Mise en Relation Vendeurs/Acheteurs',
      'Vérification Technique & Historique Véhicule',
      'Plateforme de Gestion pour Concessions Automobiles',
      'Services de Cotation & Estimation Digitale'
    ],
    keyStats: [
      { label: 'Propulsée Par', value: 'YOU KNOW' },
      { label: 'Véhicules Listés', value: '500+' },
      { label: 'Sécurité Achat', value: '100%' }
    ],
    synergyWithYouKnow: 'Développement d\'algorithmes d\'estimation par IA par YOU KNOW TECH et synergie directe avec la filiale YOU KNOW AUTO & MOBILITÉ.'
  },
  {
    id: 'miss-drone-company',
    name: 'Miss Drone Company',
    shortTag: 'Drones & Imagerie Aérienne Haute Définition',
    category: 'Technologies Aériennes & Drones',
    categoryGroup: 'drone',
    badge: 'Prises de Vues Aériennes & Topographie',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    description: 'Pionnier des technologies de drones légers. Miss Drone Company est spécialisée dans les prises de vues aériennes 4K/8K, la cartographie topographique, la thermographie et la surveillance de sites.',
    detailedBio: 'Miss Drone Company révolutionne la captation aérienne au Sénégal et en Afrique. Grâce à des pilotes certifiés et une flotte de drones de dernière génération, l\'entreprise intervient pour le cinéma, les grands projets BTP, l\'inspection industrielle et la cartographie géospatiale.',
    accentColor: 'from-emerald-600 via-teal-600 to-cyan-600',
    gradientBg: 'from-emerald-950/40 via-teal-950/30 to-slate-950',
    icon: Radio,
    services: [
      'Prises de Vues Aériennes 4K/8K (Photo & Vidéo Immersive)',
      'Cartographie Topographique & Modélisation 3D de Terrains',
      'Inspection Technique de Batiments & Thermographie',
      'Surveillance & Sécurité Aérienne de Sites Industriels',
      'Couverture Médias, Événements & Documentaires'
    ],
    keyStats: [
      { label: 'Vidéos Aériennes HD', value: '200+' },
      { label: 'Superficie Cartographiée', value: '5 000+ Ha' },
      { label: 'Précision Drone', value: 'Centimétrique' }
    ],
    synergyWithYouKnow: 'Captation vidéo pour les productions média de YOU KNOW SOCIETY, inspections de chantiers pour Merveille Bat et analyse de données spatiales.'
  }
];

export default function Partners() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'tech' | 'btp' | 'auto' | 'drone'>('all');
  const [activePartnerModal, setActivePartnerModal] = useState<Partner | null>(null);
  const [partnerFormSubmitted, setPartnerFormSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    sector: '',
    message: ''
  });

  const filteredPartners = partnersList.filter(partner => {
    if (selectedFilter === 'all') return true;
    return partner.categoryGroup === selectedFilter;
  });

  const handlePartnerSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPartnerFormSubmitted(true);
    setTimeout(() => {
      setPartnerFormSubmitted(false);
      setPartnerForm({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        sector: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      
      {/* Background Animated Futuristic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles size={14} className="text-blue-400 animate-spin-slow" />
            <span>ÉCOSYSTÈME STRATÉGIQUE YOU KNOW SOCIETY</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight"
          >
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Partenaires</span> d'Excellence
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Afin d'offrir des solutions 360° et à fort impact, <strong className="text-white">YOU KNOW SOCIETY</strong> s'associe à des leaders technologiques, agences médias, acteurs du BTP, plateformes de mobilité et experts de l'imagerie aérienne.
          </motion.p>
        </div>

        {/* Global Key Stats Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: 'Alliance Multi-Secteurs', val: '5+ Leaders', icon: Layers, color: 'text-blue-400' },
            { label: 'Partenaire Web & Media', val: 'Feselma Digital', icon: Globe, color: 'text-purple-400' },
            { label: 'Plateforme Auto Groupe', val: 'AutoLink SaaS', icon: Car, color: 'text-red-400' },
            { label: 'Rayonnement & Impact', val: '100% Synergie', icon: Zap, color: 'text-emerald-400' }
          ].map((stat, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-lg">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-display font-black text-white">{stat.val}</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Tous les Partenaires', icon: Layers },
            { id: 'tech', label: 'Tech & Agences Digitale (Feselma & SDM)', icon: Cpu },
            { id: 'btp', label: 'Immobilier & BTP (Merveille Bat)', icon: Building2 },
            { id: 'auto', label: 'Automobile (AutoLink)', icon: Car },
            { id: 'drone', label: 'Drones & Imagerie (Miss Drone)', icon: Radio }
          ].map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30' 
                    : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <tab.icon size={14} className={isActive ? 'text-white' : 'text-blue-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative rounded-3xl bg-slate-900/90 border border-white/10 hover:border-blue-500/50 p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)] flex flex-col justify-between overflow-hidden"
              >
                {/* Background Card Ambient Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${partner.accentColor} opacity-5 group-hover:opacity-15 blur-3xl transition-opacity duration-500 rounded-full pointer-events-none`} />

                <div>
                  {/* Top Badge & Category */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${partner.badgeBg}`}>
                      {partner.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                      {partner.category}
                    </span>
                  </div>

                  {/* Header Info */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.accentColor} text-white flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                      <partner.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                        <span>{partner.name}</span>
                        {partner.managedByYouKnow && (
                          <span className="text-[10px] bg-blue-600 text-white font-mono px-2 py-0.5 rounded-md uppercase font-bold">YOU KNOW</span>
                        )}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">{partner.shortTag}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {partner.description}
                  </p>

                  {/* Key Services Offered */}
                  <div className="mb-6 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Expertises & Domaines d'Action :</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {partner.services.slice(0, 4).map((srv, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Ribbon */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-2xl border border-white/10 mb-6">
                    {partner.keyStats.map((st, stIdx) => (
                      <div key={stIdx} className="text-center">
                        <div className="text-xs sm:text-sm font-display font-black text-white">{st.value}</div>
                        <div className="text-[9px] font-mono text-slate-400 truncate">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setActivePartnerModal(partner)}
                    className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Voir la Synergie & Détails</span>
                    <ChevronRight size={14} />
                  </button>

                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold uppercase tracking-wider hover:brightness-110 transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Visiter {partner.name}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      <span>Écosystème Certifié</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Strategic Collaboration Section */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 border border-blue-500/30 p-8 sm:p-12 mb-20 relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
                SYNERGIE & INTEROPÉRABILITÉ
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight">
                Une force collective au service de vos projets digitaux et industriels.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                En associant les compétences logicielles de <strong className="text-white">YOU KNOW TECH</strong>, le savoir-faire média de <strong className="text-purple-300">Feselma Digital</strong>, l'expertise IT de <strong className="text-blue-300">SDM</strong>, la maîtrise BTP de <strong className="text-amber-300">Merveille Bat</strong>, la plateforme <strong className="text-red-300">AutoLink</strong> et l'imagerie aérienne de <strong className="text-emerald-300">Miss Drone Company</strong>, nous offrons un guichet unique inédit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-blue-400 font-bold text-sm flex items-center gap-2">
                  <Zap size={16} /> 100% Intégré
                </div>
                <p className="text-xs text-slate-300">
                  Un interlocuteur unique pour coordonner la tech, le média, le BTP et la mobilité.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                  <ShieldCheck size={16} /> Qualité Garantie
                </div>
                <p className="text-xs text-slate-300">
                  Normes de réalisation rigoureuses et accompagnement personnalisé à chaque étape.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Application Form Modal/Section */}
        <div id="rejoindre" className="max-w-3xl mx-auto glass-card p-8 sm:p-10 rounded-3xl border-white/15 bg-slate-900/90 shadow-2xl relative">
          <div className="text-center space-y-3 mb-8">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              DEVENIR PARTENAIRE OFFICIEL
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
              Rejoignez le Réseau YOU KNOW SOCIETY
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Vous êtes une entreprise, un cabinet d'ingénierie, une agence ou une startup ? Proposez un partenariat stratégique avec notre groupe holding.
            </p>
          </div>

          {partnerFormSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Demande de Partenariat Transmise !</h4>
              <p className="text-xs text-slate-300">
                L'équipe directionnelle de YOU KNOW SOCIETY a bien reçu votre message. Nous vous recontacterons sous 24 à 48 heures.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Nom de votre Entreprise / Organisme *</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.companyName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                    placeholder="Ex: Feselma, SDM, BTP Inc..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Nom du Représentant *</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.contactName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                    placeholder="Prénom & Nom"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Adresse Email Pro *</label>
                  <input
                    type="email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    placeholder="contact@votre-entreprise.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    placeholder="+221 XX XXX XX XX"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Secteur d'Activité Principal *</label>
                <select
                  required
                  value={partnerForm.sector}
                  onChange={(e) => setPartnerForm({ ...partnerForm, sector: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Sélectionnez un secteur...</option>
                  <option value="tech">Tech, Développement Web & IA</option>
                  <option value="media">Agence Média & Stratégie Digitale</option>
                  <option value="btp">BTP, Architecture & Immobilier</option>
                  <option value="auto">Automobile & Transport</option>
                  <option value="drone">Technologies Aériennes & Drones</option>
                  <option value="autre">Autre secteur d'activité</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Proposition de Partenariat / Message *</label>
                <textarea
                  required
                  rows={4}
                  value={partnerForm.message}
                  onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                  placeholder="Décrivez brièvement la synergie envisagée avec YOU KNOW SOCIETY..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>Soumettre la Demande de Partenariat</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Partner Detailed Drawer / Modal */}
      <AnimatePresence>
        {activePartnerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-blue-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button
                onClick={() => setActivePartnerModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activePartnerModal.accentColor} text-white flex items-center justify-center shadow-lg shrink-0`}>
                  <activePartnerModal.icon size={24} />
                </div>
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${activePartnerModal.badgeBg}`}>
                    {activePartnerModal.badge}
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                    {activePartnerModal.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                <p>{activePartnerModal.detailedBio}</p>
                
                <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2">
                  <div className="text-blue-400 font-bold uppercase font-mono text-[11px] flex items-center gap-1.5">
                    <Zap size={14} /> Synergies Directes avec YOU KNOW SOCIETY :
                  </div>
                  <p className="text-slate-200">{activePartnerModal.synergyWithYouKnow}</p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono uppercase text-[10px] text-slate-400 font-bold">Services & Compétences Clés :</div>
                  <ul className="space-y-1.5">
                    {activePartnerModal.services.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                {activePartnerModal.websiteUrl && (
                  <a
                    href={activePartnerModal.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Ouvrir {activePartnerModal.websiteUrl}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                
                <Link
                  to="/contact"
                  onClick={() => setActivePartnerModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Mise en Relation via Groupe</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
