import { 
  Terminal, Palette, Compass, BookOpen, Mic, Building2, HeartHandshake, 
  Wallet, Car, Home, ShoppingBag, Cpu, Sun, HeartPulse, Sprout, Truck, 
  ShieldCheck, Sparkles, Database, Layers, CheckCircle2 
} from 'lucide-react';

export interface Subsidiary {
  id: string;
  number: number;
  name: string;
  shortName: string;
  sector: string;
  status: string;
  category: 'Tech & Digital' | 'Design & Média' | 'Finance & Commerce' | 'Industrie & Énergie' | 'Services & Société' | 'Transport & Auto';
  tagColor: string;
  desc: string;
  highlights: string[];
  icon: any;
  color: string;
  link: string;
}

export const allSubsidiaries: Subsidiary[] = [
  {
    id: 'tech',
    number: 1,
    name: 'YOU KNOW TECH',
    shortName: 'TECH',
    sector: 'Technologie, SaaS, IA & Cloud',
    status: 'Filiale Opérationnelle Phare',
    category: 'Tech & Digital',
    tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    desc: 'Développement de logiciels, applications web et mobiles, intelligence artificielle, cybersécurité, cloud, SaaS (SASTOCK), maintenance informatique et automatisation.',
    highlights: ['Logiciel SASTOCK SaaS', 'Applications Web & Mobile', 'Intelligence Artificielle & Cloud', 'Installation OS (Windows/Linux)'],
    icon: Terminal,
    color: 'from-blue-600 to-indigo-600',
    link: '/services'
  },
  {
    id: 'design',
    number: 2,
    name: 'YOU KNOW DESIGN',
    shortName: 'DESIGN',
    sector: 'Design & Communication Visuelle',
    status: 'Filiale Créative Active',
    category: 'Design & Média',
    tagColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    desc: 'Création de logos, affiches publicitaires, identité visuelle, branding complet, UI/UX design, montage vidéo, motion design et miniatures YouTube.',
    highlights: ['Logos & Identité Visuelle', 'Affiches Publicitaires', 'Montage Vidéo & Motion', 'UI/UX Design'],
    icon: Palette,
    color: 'from-pink-600 to-rose-600',
    link: '/services'
  },
  {
    id: 'archi',
    number: 3,
    name: 'YOU KNOW ARCHI',
    shortName: 'ARCHI',
    sector: 'Architecture & Ingénierie BTP',
    status: 'Pôle Ingénierie & BTP',
    category: 'Industrie & Énergie',
    tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    desc: 'Conception de plans 2D/3D, étude et calculs béton armé, modélisation BIM, visualisations architecturales et suivi rigoureux de projets de construction.',
    highlights: ['Plans 2D/3D & BIM', 'Calcul Béton Armé', 'Visualisations Architectures', 'Suivi de Chantier'],
    icon: Compass,
    color: 'from-amber-600 to-orange-600',
    link: '/contact'
  },
  {
    id: 'academy',
    number: 4,
    name: 'YOU KNOW ACADEMY',
    shortName: 'ACADEMY',
    sector: 'Formation & Éducation Pratique',
    status: 'Centre de Formation Certifiant',
    category: 'Services & Société',
    tagColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    desc: 'Centre de formation agréé spécialisé en Informatique Bureautique (Word, Excel, PowerPoint, Access), IA, Création Web, Programmation et Cybersécurité.',
    highlights: ['Informatique Bureautique (3 sem.)', 'IA & Création de Sites', 'Création Affiches & Visuels IA', 'Certificat / Attestation'],
    icon: BookOpen,
    color: 'from-indigo-600 to-purple-600',
    link: '/services'
  },
  {
    id: 'media',
    number: 5,
    name: 'YOU KNOW MEDIA',
    shortName: 'MEDIA',
    sector: 'Production Audiovisuelle & Média',
    status: 'Pôle Média & Contenu',
    category: 'Design & Média',
    tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    desc: 'Production de voix off professionnelle, podcasts d\'entreprise, vidéos publicitaires, documentaires et campagnes de communication digitale percutantes.',
    highlights: ['Voix Off Professionnelle', 'Podcasts & Interviews', 'Vidéos Publicitaires', 'Documentaires'],
    icon: Mic,
    color: 'from-purple-600 to-pink-600',
    link: '/services'
  },
  {
    id: 'business',
    number: 6,
    name: 'YOU KNOW BUSINESS',
    shortName: 'BUSINESS',
    sector: 'Transformation Digitale & Conseil',
    status: 'Conseil & Stratégie',
    category: 'Services & Société',
    tagColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    desc: 'Conseil en transformation numérique, accompagnement des organisations, automatisation des processus métier et développement de solutions sur-mesure.',
    highlights: ['Conseil Transformation', 'Accompagnement Stratégique', 'Automatisation Métier', 'Gestion de Projets'],
    icon: Building2,
    color: 'from-cyan-600 to-blue-600',
    link: '/contact'
  },
  {
    id: 'islam',
    number: 7,
    name: 'YOU KNOW ISLAM',
    shortName: 'ISLAM',
    sector: 'Solutions Numériques Éducatives',
    status: 'Unité Communautaire',
    category: 'Services & Société',
    tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    desc: 'Applications islamiques, Coran numérique interactif, plateformes éducatives, logiciels de gestion de mosquées et contenus éthiques.',
    highlights: ['Applications Islamiques', 'Coran Numérique', 'Gestion des Mosquées', 'Formations & Plateformes'],
    icon: HeartHandshake,
    color: 'from-emerald-600 to-teal-600',
    link: '/contact'
  },
  {
    id: 'finance',
    number: 8,
    name: 'YOU KNOW FINANCE',
    shortName: 'FINANCE',
    sector: 'FinTech & Technologies Financières',
    status: 'FinTech & Solutions',
    category: 'Finance & Commerce',
    tagColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    desc: 'Portefeuille électronique, paiement mobile money, transfert d\'argent, comptabilité numérique, gestion de caisse et microfinance digitale.',
    highlights: ['Portefeuille Électronique', 'Paiement Mobile Money', 'Comptabilité Numérique', 'Microfinance & Caisse'],
    icon: Wallet,
    color: 'from-green-600 to-emerald-700',
    link: '/contact'
  },
  {
    id: 'auto',
    number: 9,
    name: 'YOU KNOW AUTO',
    shortName: 'AUTO',
    sector: 'Automobile & Mobilité',
    status: 'Automobile & Marketplace',
    category: 'Transport & Auto',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    desc: 'Marketplace de vente/achat de véhicules, gestion de concessionnaires, location, entretien, pièces détachées et projet de véhicule YOU KNOW AUTO.',
    highlights: ['Marketplace Véhicules', 'Gestion Concessionnaires', 'Location & Pièces', 'Marque YOU KNOW AUTO'],
    icon: Car,
    color: 'from-blue-600 to-cyan-600',
    link: '/contact'
  },
  {
    id: 'immo',
    number: 10,
    name: 'YOU KNOW IMMO',
    shortName: 'IMMO',
    sector: 'Immobilier & PropTech',
    status: 'PropTech & Immobilier',
    category: 'Services & Société',
    tagColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    desc: 'Plateforme immobilière SaaS, vente de terrains et maisons, location, promotion immobilière, gestion locative centralisée et estimations.',
    highlights: ['SaaS Gestion Locative', 'Vente Terrains & Maisons', 'Promotion Immobilière', 'Plateforme Web PropTech'],
    icon: Home,
    color: 'from-teal-600 to-emerald-600',
    link: '/contact'
  },
  {
    id: 'commerce',
    number: 11,
    name: 'YOU KNOW COMMERCE',
    shortName: 'COMMERCE',
    sector: 'Commerce & E-Commerce',
    status: 'E-Commerce & Digitalisation',
    category: 'Finance & Commerce',
    tagColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    desc: 'Digitalisation des commerçants, boutiques en ligne, marketplaces, solutions de gestion des stocks et intégration du logiciel SaaS SASTOCK.',
    highlights: ['Boutiques en Ligne', 'Marketplaces Pro', 'Logiciel SASTOCK', 'Digitalisation Ventes'],
    icon: ShoppingBag,
    color: 'from-orange-600 to-amber-600',
    link: '/contact'
  },
  {
    id: 'industries',
    number: 12,
    name: 'YOU KNOW INDUSTRIES',
    shortName: 'INDUSTRIES',
    sector: 'Industrie & Fabrication Électronique',
    status: 'Fabrication & Hardware',
    category: 'Industrie & Énergie',
    tagColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    desc: 'Conception et fabrication de matériels électroniques, ordinateurs, accessoires informatiques, objets connectés (IoT), robots et équipements sous la marque YOU KNOW.',
    highlights: ['Fabrication Électronique', 'Ordinateurs & Hardware', 'Objets Connectés IoT', 'Robots & Équipements'],
    icon: Cpu,
    color: 'from-slate-700 to-slate-900',
    link: '/contact'
  },
  {
    id: 'energy',
    number: 13,
    name: 'YOU KNOW ENERGY',
    shortName: 'ENERGY',
    sector: 'Énergie & Développement Durable',
    status: 'Cleantech & Solaire',
    category: 'Industrie & Énergie',
    tagColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    desc: 'Installations solaires photovoltaïques, batteries intelligentes, audits d\'efficacité énergétique et solutions de transition écologique.',
    highlights: ['Énergie Solaire Photovoltaïque', 'Batteries Intelligentes', 'Efficacité Énergétique', 'Transition Écologique'],
    icon: Sun,
    color: 'from-amber-500 to-yellow-600',
    link: '/contact'
  },
  {
    id: 'health',
    number: 14,
    name: 'YOU KNOW HEALTH',
    shortName: 'HEALTH',
    sector: 'Santé Numérique (HealthTech)',
    status: 'HealthTech',
    category: 'Services & Société',
    tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    desc: 'Dossiers médicaux électroniques (DME), plateforme de prise de rendez-vous, télémédecine, applications de santé et gestion de cliniques.',
    highlights: ['Dossiers Médicaux DME', 'Plateforme Télémédecine', 'Gestion de Cliniques', 'Apps Suivi Santé'],
    icon: HeartPulse,
    color: 'from-red-600 to-rose-600',
    link: '/contact'
  },
  {
    id: 'agri',
    number: 15,
    name: 'YOU KNOW AGRI',
    shortName: 'AGRI',
    sector: 'Agriculture Intelligente (AgriTech)',
    status: 'AgriTech',
    category: 'Services & Société',
    tagColor: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
    desc: 'Agriculture connectée, capteurs IoT agricoles, gestion des exploitations, plateformes d\'intermédiation pour la vente de produits agricoles.',
    highlights: ['IoT & Capteurs Agricoles', 'Gestion Exploitations', 'Plateforme Agricole', 'Agriculture Connectée'],
    icon: Sprout,
    color: 'from-lime-600 to-green-600',
    link: '/contact'
  },
  {
    id: 'logistics',
    number: 16,
    name: 'YOU KNOW LOGISTICS',
    shortName: 'LOGISTICS',
    sector: 'Transport & Logistique Intelligente',
    status: 'Logistique & Transport',
    category: 'Transport & Auto',
    tagColor: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    desc: 'Gestion de flotte de transport, suivi GPS en temps réel, livraison du dernier kilomètre, optimisation de trajets et logistique de marchandises.',
    highlights: ['Suivi GPS Temps Réel', 'Gestion de Flottes', 'Livraison & Logistique', 'Transport Marchandises'],
    icon: Truck,
    color: 'from-violet-600 to-purple-700',
    link: '/contact'
  },
  {
    id: 'security',
    number: 17,
    name: 'YOU KNOW SECURITY',
    shortName: 'SECURITY',
    sector: 'Cybersécurité & Sécurité Physique',
    status: 'Sécurité & Protection',
    category: 'Tech & Digital',
    tagColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    desc: 'Audit informatique, protection des données, sécurité des réseaux, vidéosurveillance IP intelligente et systèmes de contrôle d\'accès.',
    highlights: ['Audit Cybersécurité', 'Protection des Données', 'Vidéosurveillance IP', 'Contrôle d\'Accès'],
    icon: ShieldCheck,
    color: 'from-sky-600 to-blue-700',
    link: '/contact'
  },
  {
    id: 'labs',
    number: 18,
    name: 'YOU KNOW LABS',
    shortName: 'LABS',
    sector: 'Recherche & Innovation du Futur (R&D)',
    status: 'Laboratoire R&D du Groupe',
    category: 'Tech & Digital',
    tagColor: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    desc: 'Laboratoire d\'innovation du groupe dédié à la recherche en Intelligence Artificielle avancée, robotique, Réalité Virtuelle/Augmentée (VR/AR) et prototypes du futur.',
    highlights: ['Recherche Avancée IA', 'Robotique & VR/AR', 'Prototypes du Futur', 'Technologies de Rupture'],
    icon: Sparkles,
    color: 'from-fuchsia-600 to-indigo-700',
    link: '/contact'
  }
];

export interface GroupProduct {
  name: string;
  slogan: string;
  subsidiary: string;
  desc: string;
  icon: any;
  badge: string;
}

export const groupProducts: GroupProduct[] = [
  {
    name: 'SASTOCK',
    slogan: 'Votre stock sous contrôle. Vos bénéfices en croissance.',
    subsidiary: 'YOU KNOW TECH & COMMERCE',
    desc: 'Logiciel SaaS de gestion intelligente des stocks, ventes, bénéfices et alertes de rupture en temps réel pour commerçants et boutiques.',
    icon: Database,
    badge: 'Logiciel Phare SaaS'
  },
  {
    name: 'Marketplace Automobile',
    slogan: 'L\'achat et la vente de véhicules réinventés.',
    subsidiary: 'YOU KNOW AUTO',
    desc: 'Plateforme digitale pour la mise en relation, la gestion de concessionnaires, la location et la vente de pièces détachées.',
    icon: Car,
    badge: 'Plateforme Mobilité'
  },
  {
    name: 'Plateforme Immobilière SaaS',
    slogan: 'La gestion locative et la promotion sans effort.',
    subsidiary: 'YOU KNOW IMMO',
    desc: 'Système complet de gestion de biens, paiements de loyers, contrats numériques et diffusion d\'annonces immobilières.',
    icon: Home,
    badge: 'Plateforme PropTech'
  },
  {
    name: 'ERP & CRM YOU KNOW',
    slogan: 'Digitaliser l\'ensemble des processus d\'entreprise.',
    subsidiary: 'YOU KNOW TECH & BUSINESS',
    desc: 'Suite d\'outils de gestion intégrée pour les PME et grandes organisations (comptabilité, RH, relation client, facturation).',
    icon: Layers,
    badge: 'Solutions Métiers'
  }
];
