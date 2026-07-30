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
  expertiseSummary: string;
}

const partnersList: Partner[] = [
  {
    id: 'feselma-digital',
    name: 'Feselma Digital',
    shortTag: 'Stratégie Digitale & Agence Média',
    category: 'Agence Digitale & Médias',
    categoryGroup: 'tech',
    badge: 'Agence Digitale Partenaire',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    websiteUrl: 'https://feselmadigital.com',
    description: 'Agence spécialisée en création digitale, stratégies de communication et développement d\'identités de marque. Feselma Digital concocte des plateformes web/mobiles modernes et du contenu média à fort impact.',
    detailedBio: 'Feselma Digital est une agence de référence dans l\'ingénierie créative et le développement numérique. Spécialisée dans la conception d\'identités visuelles percutantes, la création de contenus médias et le marketing digital orienté performance, l\'agence accompagne les entreprises dans leur présence en ligne.',
    accentColor: 'from-purple-600 via-indigo-600 to-pink-600',
    gradientBg: 'from-purple-950/40 via-indigo-950/30 to-slate-950',
    icon: Globe,
    services: [
      'Développement Web & Mobile sur mesure (React, Next, Applications)',
      'Stratégie de Communication Digitale & Branding',
      'Marketing Digital & Acquisition de Clientes',
      'Production de Contenus Médias & Design Graphique',
      'Conseil & Stratégie d\'Image de Marque'
    ],
    keyStats: [
      { label: 'Projets Digitaux', value: '120+' },
      { label: 'Satisfaction Client', value: '99%' },
      { label: 'Site Officiel', value: 'feselmadigital.com' }
    ],
    expertiseSummary: 'Excellence créative, maîtrise des technologies web modernes et déploiement de campagnes médias engageantes.'
  },
  {
    id: 'sdm-services',
    name: 'SDM (Services Digitaux & Maintenance)',
    shortTag: 'Services Numériques & Maintenance IT',
    category: 'Infrastructure IT & Maintenance',
    categoryGroup: 'tech',
    badge: 'Services IT & Maintenance',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    description: 'Entreprise spécialisée dans les services numériques et la maintenance informatique. SDM propose des prestations d\'installation de systèmes d\'exploitation, de création de sites web et d\'optimisation de matériel informatique.',
    detailedBio: 'SDM (Services Digitaux & Maintenance) assure la performance et la viabilité des outils informatiques pour particuliers et professionnels. De la maintenance préventive/curative à la configuration de systèmes Windows et Linux, SDM offre un suivi technique fiable et adapté.',
    accentColor: 'from-blue-600 via-cyan-600 to-teal-600',
    gradientBg: 'from-blue-950/40 via-cyan-950/30 to-slate-950',
    icon: Wrench,
    services: [
      'Installation & Configuration Systèmes (Windows, Linux, Serveurs)',
      'Maintenance Informatique (Nettoyage, Dépannage, Diagnostics)',
      'Création & Conception de Sites Web',
      'Configuration de Réseaux & Sécurité Informatique',
      'Support Technique & Assistance Matérielle'
    ],
    keyStats: [
      { label: 'Réactivité Support', value: '24/7' },
      { label: 'Interventions Réussies', value: '1 500+' },
      { label: 'Satisfaction Client', value: '100%' }
    ],
    expertiseSummary: 'Rigoureuse expertise matérielle et logicielle pour garantir des infrastructures informatiques stables et durables.'
  },
  {
    id: 'merveille-bat',
    name: 'Merveille Bat',
    shortTag: 'BTP, Architecture & Immobilier',
    category: 'Immobilier & Construction',
    categoryGroup: 'btp',
    badge: 'Construction & Architecture',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    description: 'Entreprise opérant dans le secteur du BTP, de la conception architecturale et de la gestion locative. Merveille Bat conçoit des projets immobiliers modernes et assure la gestion optimale de biens.',
    detailedBio: 'Merveille Bat est une référence dans la construction et l\'aménagement immobilier. L\'entreprise propose des services complets allant des plans d\'architecture 3D à la réalisation de travaux de construction, en passant par la gestion locative professionnelle de patrimoines immobiliers.',
    accentColor: 'from-amber-600 via-orange-600 to-yellow-600',
    gradientBg: 'from-amber-950/40 via-orange-950/30 to-slate-950',
    icon: Building2,
    services: [
      'Construction de Bâtiments & Travaux BTP',
      'Conception Architecturale & Plans 3D',
      'Gestion Locative & Administration de Biens Immobiliers',
      'Rénovation, Aménagement & Finitions d\'Intérieur',
      'Conseil en Projets Immobiliers'
    ],
    keyStats: [
      { label: 'Chantiers Livrés', value: '45+' },
      { label: 'Gestion Locative', value: '300+ Biens' },
      { label: 'Normes de Construction', value: 'Conforme' }
    ],
    expertiseSummary: 'Maîtrise complète de la chaîne immobilière : de la première esquisse architecturale à la gestion quotidienne des locataires.'
  },
  {
    id: 'autolink',
    name: 'AutoLink',
    shortTag: 'Marketplace Automobile & Vente de Voitures',
    category: 'Plateforme Automobile (Gérée par YOU KNOW)',
    categoryGroup: 'auto',
    badge: 'Gérée par YOU KNOW SOCIETY',
    badgeBg: 'bg-red-500/10 border-red-500/30 text-red-300 font-bold',
    managedByYouKnow: true,
    description: 'Plateforme de vente et d\'achat de véhicules automobiles développée et gérée directement par la société YOU KNOW SOCIETY. Une solution moderne pour simplifier le marché automobile.',
    detailedBio: 'AutoLink est la plateforme automobile officielle gérée par la société YOU KNOW. Elle met en relation vendeurs et acheteurs de véhicules, offre une vitrine claire d\'annonces automobiles et simplifie les démarches de transaction.',
    accentColor: 'from-red-600 via-rose-600 to-emerald-600',
    gradientBg: 'from-red-950/40 via-rose-950/30 to-slate-950',
    icon: Car,
    services: [
      'Plateforme d\'Annonces de Vente & Achat de Véhicules',
      'Mise en Relation Vendeurs et Acheteurs',
      'Vitrine Digitale pour Concessions & Particuliers',
      'Estimation & Fiches Techniques Détaillées',
      'Service Dédié au Marché Automobile'
    ],
    keyStats: [
      { label: 'Gestionnaire', value: 'YOU KNOW' },
      { label: 'Annonces Récentes', value: '500+' },
      { label: 'Expérience Client', value: 'Fluidifiée' }
    ],
    expertiseSummary: 'Solution digitale fluide et sécurisée dédiée à l\'achat, la vente et la promotion de véhicules.'
  },
  {
    id: 'miss-drone-company',
    name: 'Miss Drone Company',
    shortTag: 'Technologies Aériennes & Drones HD',
    category: 'Technologies Aériennes & Drones',
    categoryGroup: 'drone',
    badge: 'Prises de Vues Aériennes & Drones',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    description: 'Entreprise spécialisée dans les services par drone, notamment les prises de vues aériennes haute définition, la cartographie topographique, la thermographie et la surveillance de sites.',
    detailedBio: 'Miss Drone Company met les technologies aériennes au service des entreprises et institutions. Équipée de drones de pointe et de pilotes expérimentés, l\'entreprise réalise des captations photo/vidéo 4K/8K, des relevés topographiques et des inspections techniques.',
    accentColor: 'from-emerald-600 via-teal-600 to-cyan-600',
    gradientBg: 'from-emerald-950/40 via-teal-950/30 to-slate-950',
    icon: Radio,
    services: [
      'Prises de Vues Aériennes 4K/8K (Photo & Vidéo)',
      'Cartographie Topographique & Relevés Aériens',
      'Inspection Technique de Bâtiments & Thermographie',
      'Surveillance & Contrôle Aérien de Sites',
      'Couverture Événementielle & Médias'
    ],
    keyStats: [
      { label: 'Productions Aériennes', value: '200+' },
      { label: 'Zone Couverte', value: '5 000+ Ha' },
      { label: 'Qualité Image', value: 'Haute Définition' }
    ],
    expertiseSummary: 'Expertise aérienne de haute précision pour valoriser vos projets, chantiers et événements.'
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
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-slate-950 text-white min-h-screen relative overflow-x-hidden">
      
      {/* Background Animated Futuristic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest max-w-full leading-normal"
          >
            <Sparkles size={14} className="text-blue-400 shrink-0 animate-spin-slow" />
            <span className="truncate">ÉCOSYSTÈME STRATÉGIQUE YOU KNOW SOCIETY</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight break-words px-1"
          >
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Partenaires</span> d'Excellence
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed px-1"
          >
            Afin d'offrir des solutions 360° et à fort impact, <strong className="text-white">YOU KNOW SOCIETY</strong> s'associe à des leaders technologiques, agences médias, acteurs du BTP, plateformes de mobilité et experts de l'imagerie aérienne.
          </motion.p>
        </div>

        {/* Global Key Stats Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16"
        >
          {[
            { label: 'Alliance Multi-Secteurs', val: '5+ Leaders', icon: Layers, color: 'text-blue-400' },
            { label: 'Partenaire Web & Media', val: 'Feselma Digital', icon: Globe, color: 'text-purple-400' },
            { label: 'Plateforme Auto Groupe', val: 'AutoLink SaaS', icon: Car, color: 'text-red-400' },
            { label: 'Rayonnement & Impact', val: '100% Synergie', icon: Zap, color: 'text-emerald-400' }
          ].map((stat, i) => (
            <div key={i} className="p-3.5 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-lg min-w-0">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                <stat.icon size={18} className={`${stat.color} sm:w-5 sm:h-5`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base lg:text-lg font-display font-black text-white truncate">{stat.val}</div>
                <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold truncate">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {[
            { id: 'all', label: 'Tous les Partenaires', icon: Layers },
            { id: 'tech', label: 'Tech & Digital (Feselma, SDM)', icon: Cpu },
            { id: 'btp', label: 'BTP & Immo (Merveille Bat)', icon: Building2 },
            { id: 'auto', label: 'Automobile (AutoLink)', icon: Car },
            { id: 'drone', label: 'Drones & Imagerie (Miss Drone)', icon: Radio }
          ].map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 border cursor-pointer max-w-full text-left sm:text-center ${
                  isActive 
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30' 
                    : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <tab.icon size={13} className={`shrink-0 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-white/10 hover:border-blue-500/50 p-4 sm:p-6 md:p-8 backdrop-blur-2xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)] flex flex-col justify-between overflow-hidden min-w-0"
              >
                {/* Background Card Ambient Glow */}
                <div className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br ${partner.accentColor} opacity-5 group-hover:opacity-15 blur-3xl transition-opacity duration-500 rounded-full pointer-events-none`} />

                <div>
                  {/* Top Badge & Category */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border max-w-full ${partner.badgeBg}`}>
                      {partner.badge}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider min-w-0 truncate">
                      {partner.category}
                    </span>
                  </div>

                  {/* Header Info */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 min-w-0">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${partner.accentColor} text-white flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                      <partner.icon size={24} className="sm:w-7 sm:h-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white group-hover:text-blue-300 transition-colors flex flex-wrap items-center gap-1.5 sm:gap-2 leading-tight">
                        <span className="break-words">{partner.name}</span>
                        {partner.managedByYouKnow && (
                          <span className="text-[9px] sm:text-[10px] bg-blue-600 text-white font-mono px-1.5 py-0.5 rounded uppercase font-bold shrink-0">YOU KNOW</span>
                        )}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-mono text-slate-400 mt-0.5 break-words">{partner.shortTag}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                    {partner.description}
                  </p>

                  {/* Key Services Offered */}
                  <div className="mb-5 sm:mb-6 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Expertises & Domaines d'Action :</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {partner.services.slice(0, 4).map((srv, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5 min-w-0">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="break-words leading-tight">{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Ribbon */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-slate-950/80 p-2.5 sm:p-3 rounded-2xl border border-white/10 mb-5 sm:mb-6">
                    {partner.keyStats.map((st, stIdx) => (
                      <div key={stIdx} className="text-center min-w-0">
                        <div className="text-xs sm:text-sm font-display font-black text-white truncate">{st.value}</div>
                        <div className="text-[8px] sm:text-[9px] font-mono text-slate-400 truncate">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setActivePartnerModal(partner)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Voir Fiche & Services</span>
                    <ChevronRight size={14} />
                  </button>

                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold uppercase tracking-wider hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Visiter {partner.name}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                      <span>Fiche Réseau Validée</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Strategic Collaboration Section */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 border border-blue-500/30 p-5 sm:p-8 md:p-12 mb-16 sm:mb-20 relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center relative z-10">
            <div className="space-y-3 sm:space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider max-w-full truncate">
                ÉCOSYSTÈME DE SERVICES MULTI-SECTEURS
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-black text-white leading-tight break-words">
                Un éventail de compétences au service de vos besoins numériques et techniques.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Découvrez des acteurs leaders dans leurs domaines respectifs : la création digitale avec <strong className="text-purple-300">Feselma Digital</strong>, la maintenance informatique avec <strong className="text-blue-300">SDM</strong>, la construction BTP avec <strong className="text-amber-300">Merveille Bat</strong>, la vente automobile avec <strong className="text-red-300">AutoLink</strong> (plateforme gérée par YOU KNOW) et l'imagerie aérienne avec <strong className="text-emerald-300">Miss Drone Company</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-blue-400 font-bold text-xs sm:text-sm flex items-center gap-2">
                  <Zap size={16} className="shrink-0" /> Diversité des Services
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  Solutions ciblées couvrant le web, le média, la maintenance, la construction et les drones.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-emerald-400 font-bold text-xs sm:text-sm flex items-center gap-2">
                  <ShieldCheck size={16} className="shrink-0" /> Professionnalisme Assuré
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  Chaque entité présente une expertise éprouvée et des standards de réalisation élevés.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Application Form Modal/Section */}
        <div id="rejoindre" className="max-w-3xl mx-auto glass-card p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-white/15 bg-slate-900/90 shadow-2xl relative">
          <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              DEVENIR PARTENAIRE OFFICIEL
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white break-words">
              Rejoignez le Réseau YOU KNOW SOCIETY
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Vous êtes une entreprise, un cabinet d'ingénierie, une agence ou une startup ? Proposez un partenariat stratégique avec notre groupe holding.
            </p>
          </div>

          {partnerFormSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-5 sm:p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
              <h4 className="text-base sm:text-lg font-bold text-white">Demande de Partenariat Transmise !</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                L'équipe directionnelle de YOU KNOW SOCIETY a bien reçu votre message. Nous vous recontacterons sous 24 à 48 heures.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handlePartnerSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase mb-1">Nom de votre Entreprise / Organisme *</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.companyName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                    placeholder="Ex: Feselma, SDM, BTP Inc..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase mb-1">Nom du Représentant *</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.contactName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                    placeholder="Prénom & Nom"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase mb-1">Adresse Email Pro *</label>
                  <input
                    type="email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    placeholder="contact@votre-entreprise.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    placeholder="+221 XX XXX XX XX"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase mb-1">Secteur d'Activité Principal *</label>
                <select
                  required
                  value={partnerForm.sector}
                  onChange={(e) => setPartnerForm({ ...partnerForm, sector: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
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
                <label className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase mb-1">Proposition de Partenariat / Message *</label>
                <textarea
                  required
                  rows={4}
                  value={partnerForm.message}
                  onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                  placeholder="Décrivez brièvement la synergie envisagée avec YOU KNOW SOCIETY..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-blue-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button
                onClick={() => setActivePartnerModal(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer z-10"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 sm:gap-4 mb-5 pr-8 min-w-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${activePartnerModal.accentColor} text-white flex items-center justify-center shadow-lg shrink-0`}>
                  <activePartnerModal.icon size={22} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold border max-w-full truncate ${activePartnerModal.badgeBg}`}>
                    {activePartnerModal.badge}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-display font-extrabold text-white mt-1 break-words">
                    {activePartnerModal.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                <p className="break-words">{activePartnerModal.detailedBio}</p>
                
                <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-1.5 sm:space-y-2">
                  <div className="text-blue-400 font-bold uppercase font-mono text-[10px] sm:text-[11px] flex items-center gap-1.5">
                    <Zap size={14} className="shrink-0" /> Synthèse d'Excellence & Valeur Ajoutée :
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm break-words">{activePartnerModal.expertiseSummary}</p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono uppercase text-[10px] text-slate-400 font-bold">Services & Compétences Clés :</div>
                  <ul className="space-y-1.5">
                    {activePartnerModal.services.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200 text-xs sm:text-sm">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="break-words">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                {activePartnerModal.websiteUrl && (
                  <a
                    href={activePartnerModal.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span className="truncate">Ouvrir {activePartnerModal.websiteUrl}</span>
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                )}
                
                <Link
                  to="/contact"
                  onClick={() => setActivePartnerModal(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Mise en Relation via Groupe</span>
                  <ChevronRight size={14} className="shrink-0" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
