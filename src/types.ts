export interface ApplicationItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  subsidiary: string;
  appType: 'file' | 'link'; // 'file' for downloadable files (ZIP, APK, etc.), 'link' for online web/SaaS/store URLs
  platform: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  sizeBytes?: number;
  url?: string;
  isIframePreviewable?: boolean;
  targetAudience: string;
  description: string;
  highlights: string[];
  techStack: string[];
  status: string;
  badgeText?: string;
  isSpotlight?: boolean;
  imagePlaceholderGradient?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'youknow-devapp-zip',
    name: 'YOUKNOW-DevApp',
    subtitle: 'Kit Développeur & Application Officielle (Contient base.apk)',
    category: 'Développement & Outils',
    subsidiary: 'YOU KNOW TECH',
    appType: 'file',
    platform: 'ZIP DevApp / Outils',
    fileUrl: '/YOUKNOW-DevApp.zip',
    fileName: 'YOUKNOW-DevApp.zip',
    fileSize: '45.8 Mo',
    sizeBytes: 48025600,
    targetAudience: 'Développeurs, Étudiants IDA (Université Numérique) & Apprenants YOU KNOW ACADEMY',
    description: 'Le package complet YOUKNOW-DevApp incluant l\'application mobile Android officielle (base.apk), des modèles de projets PWA modernes, les templates de code IDA, des scripts de déploiement et la documentation des services YOU KNOW SOCIETY.',
    highlights: [
      'Contient l\'application Android base.apk prête à être installée',
      'Templates de projets Web PWA & Android Kotlin prêts à l\'emploi',
      'Schémas de base de données SQL pour travaux pratiques IDA',
      'Documentation complète et scripts d\'automatisation YOU KNOW TECH'
    ],
    techStack: ['base.apk (Android)', 'PWA HTML5/JS', 'SQL & Scripts', 'Documentation'],
    status: 'Opérationnel',
    badgeText: 'Package Officiel',
    isSpotlight: true,
    imagePlaceholderGradient: 'from-amber-600 to-amber-950',
    createdAt: new Date().toISOString()
  },
  {
    id: 'monbudget-pwa',
    name: 'MonBudget',
    subtitle: 'Application PWA de Gestion Financière & Budgétaire',
    category: 'Finance & Gestion',
    subsidiary: 'YOU KNOW TECH',
    appType: 'link',
    platform: 'Web / PWA',
    url: 'https://monbudget.youknow.click',
    isIframePreviewable: true,
    targetAudience: 'Particuliers, Entrepreneurs & Gestionnaires de micro-finances',
    description: 'Application Progressive Web App fluide pour suivre ses dépenses personnelles, planifier des budgets mensuels, visualiser des graphiques d\'épargne et exporter des rapports financiers sans connexion obligatoire.',
    highlights: [
      'Mode hors-ligne avec synchronisation automatique PWA',
      'Catégorisation intelligente des dépenses & alertes de dépassement',
      'Export PDF et Excel des bilans financiers',
      'Compatible Smartphone, Tablette et Ordinateur'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'PWA Offline'],
    status: 'En ligne',
    badgeText: 'PWA Web App',
    isSpotlight: false,
    imagePlaceholderGradient: 'from-blue-600 to-indigo-950',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sastock-saas',
    name: 'SASTOCK',
    subtitle: 'Plateforme SaaS de Gestion de Stock & Ventes pour Commerçants',
    category: 'Commerce & Entreprise',
    subsidiary: 'YOU KNOW TECH',
    appType: 'link',
    platform: 'SaaS Web',
    url: 'https://sastock.youknow.click',
    isIframePreviewable: true,
    targetAudience: 'Boutiques, Magasins, Grossistes, Supermarchés & E-commerçants',
    description: 'Solution SaaS cloud complète développée par YOU KNOW TECH permettant aux commerçants de gérer leurs stocks en temps réel, facturer rapidement, suivre les bénéfices nets et recevoir des alertes de réapprovisionnement.',
    highlights: [
      'Gestion multi-magasins et inventaire en temps réel',
      'Caisse enregistreuse tactile & impression de reçus',
      'Calcul automatique des marges et bénéfices par période',
      'Connexion sécurisée Google et tableaux de bord décisionnels'
    ],
    techStack: ['Next.js', 'Node.js', 'PostgreSQL / MySQL', 'Tailwind CSS', 'Google Auth'],
    status: 'En ligne',
    badgeText: 'Logiciel SaaS Pro',
    isSpotlight: false,
    imagePlaceholderGradient: 'from-emerald-600 to-teal-950',
    createdAt: new Date().toISOString()
  }
];
