import { motion } from 'motion/react';
import { ArrowRight, Cpu, ShieldCheck, Cloud, Layout as LayoutIcon, Laptop, Users, CheckCircle2, BookOpen, TrendingUp, Database, ShoppingBag, Award, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Développement Web & Applications',
    desc: 'Sites internet vitrines, e-commerce, applications web et mobiles sur mesure pour votre activité.',
    icon: Laptop,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Intelligence Artificielle',
    desc: 'Intégration d\'IA générative et automatisation intelligente des tâches pour booster votre productivité.',
    icon: Cpu,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Transformation Digitale',
    desc: 'Conseil numérique, création d\'identités visuelles (logos, affiches), montage vidéo et voix off professionnelle.',
    icon: LayoutIcon,
    color: 'bg-brand-50 text-brand-600',
  },
  {
    title: 'Maintenance & Formations',
    desc: 'Installation d\'OS (Windows, Linux), nettoyage complet d\'ordinateurs, support technique et formations pratiques.',
    icon: BookOpen,
    color: 'bg-slate-50 text-slate-600',
  },
];

const stats = [
  { label: 'Filiales Spécialisées', value: 'YOU KNOW TECH' },
  { label: 'Formations Pratiques', value: '100% En Ligne' },
  { label: 'Logiciel SaaS Phare', value: 'SASTOCK' },
  { label: 'Accompagnement Projets', value: 'De Bout en Bout' },
];

export default function Home() {
  return (
    <div className="space-y-32 mb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32 technical-grid">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Floating background decorations */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 text-blue-500/10 opacity-50"
            >
              <Cpu size={120} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 50, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-1/2 text-indigo-500/10 opacity-30"
            >
              <ShieldCheck size={180} />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 right-10 text-blue-400/5 opacity-40"
            >
              <Cloud size={240} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-tighter">
                GROUPE HOLDING INTERNATIONAL DE TECHNOLOGIE
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter leading-[1.05] mb-8 italic">
                Where Knowledge <br />
                <span className="text-gradient underline decoration-blue-500/20">Meets Innovation</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
                YOU KNOW SOCIETY est un groupe holding technologique international spécialisé dans le numérique, l'innovation, la formation, le développement technologique et la transformation digitale. Là où le savoir rencontre l'innovation pour créer l'avenir.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2 group"
                >
                  Nous Contacter
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  Nos Formations & Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
              >
                 <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                  alt="Tech team working"
                  className="w-full h-auto opacity-80"
                  referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              </motion.div>
              
              <div className="absolute -right-6 bottom-10 glass-card p-6 shadow-2xl hidden md:block border-white/20 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">SÉCURITÉ</div>
                    <div className="text-xl font-black text-white italic">Intégrité 100%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-6 justify-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 min-w-[240px] text-center"
            >
              <div className="text-4xl lg:text-5xl font-black text-blue-400 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.4em] font-black text-blue-500 mb-4 italic">Nos Services & Expertises</h2>
          <h3 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight">L'excellence au service de l'innovation.</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              className="glass-card p-10 group"
            >
              <div className={`w-14 h-14 ${s.color.replace('bg-blue-50', 'bg-blue-500/20').replace('text-blue-600', 'text-blue-400')} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
                <s.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{s.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {s.desc}
              </p>
              <Link to="/services" className="text-[10px] uppercase font-black tracking-widest text-blue-500 flex items-center gap-2 group-hover:gap-3 transition-all">
                DÉTAILS <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SASTOCK Software Product Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass-card p-8 sm:p-16 relative overflow-hidden border border-white/10 bg-slate-950/60 rounded-[3rem]">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 text-blue-500/5 pointer-events-none">
            <ShoppingBag size={400} />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Database size={14} /> LOGICIEL LOGO SAAS PAR YOU KNOW TECH
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
                SASTOCK
              </h2>
              <p className="text-xl font-bold text-blue-400 italic">
                Votre stock sous contrôle. Vos bénéfices en croissance.
              </p>
              <p className="text-slate-400 leading-relaxed text-lg">
                SASTOCK est un logiciel SaaS innovant conçu pour permettre aux commerçants, boutiques, magasins et vendeurs de gérer facilement leur stock et leurs ventes en temps réel.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  'Gestion de stock',
                  'Gestion des ventes',
                  'Suivi des bénéfices',
                  'Alertes de rupture de stock',
                  'Connexion Google',
                  'Tableaux de bord intuitifs',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-blue-500 shrink-0" size={18} />
                    <span className="text-sm font-semibold text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  Demander une démo de SASTOCK
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 p-4">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-900/30 via-slate-900 to-black flex flex-col justify-between p-8 relative">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">SASTOCK v1.0.0</span>
                </div>
                
                <div className="my-auto space-y-6">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Ventes du jour</div>
                      <div className="text-2xl font-black text-white font-mono">145 000 FCFA</div>
                    </div>
                    <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Bénéfice Net</div>
                      <div className="text-2xl font-black text-blue-400 font-mono">42 800 FCFA</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Temps réel</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                  <span>Secured with Google Cloud</span>
                  <span className="text-green-500 animate-pulse">● Système Actif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Formations Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={14} /> APPRENDRE EN PRATIQUE
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
              Nos Formations <br /> <span className="text-gradient">100% En Ligne</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              Des formations orientées vers la pratique et la réalisation de projets concrets pour acquérir des compétences numériques hautement recherchées.
            </p>
            <div className="space-y-4">
              {[
                { t: 'Durée Optimale', d: '15 jours de formation intensive rythmés à 3 jours par semaine.' },
                { t: 'Formations IA & Tech', d: 'Maîtrisez la création de sites web, d\'affiches et d\'automatisations grâce aux meilleurs outils IA.' },
                { t: 'Tarifs Accessibles', d: 'Inscription à 5 000 FCFA et seulement 1 475 FCFA par cours dispensé.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{item.t}</h4>
                    <p className="text-slate-500 text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link
                to="/contact"
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-lg inline-flex items-center gap-2"
              >
                S'inscrire à une formation
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {[
              { t: 'Création de sites web avec l\'IA', d: 'Concevez des sites internet modernes et esthétiques en quelques heures en exploitant le plein potentiel de l\'IA.' },
              { t: 'Création d\'affiches avec l\'IA', d: 'Développez des visuels publicitaires percutants et professionnels sans compétences préalables en design graphique.' },
              { t: 'Automatisation des tâches', d: 'Gagnez un temps précieux au quotidien en automatisant vos flux de travail et vos processus administratifs.' },
              { t: 'Informatique & Bureautique', d: 'Maîtrisez les fondamentaux du développement web, des outils bureautiques et de l\'informatique générale.' },
            ].map((course, idx) => (
              <div key={idx} className="glass-card p-8 border-white/5 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                <div>
                  <Award className="text-indigo-400 mb-6" size={28} />
                  <h3 className="text-lg font-bold text-white mb-3">{course.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{course.d}</p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">PROJET CONCRET INCLUS</span>
                  <span className="text-xs font-mono font-bold text-indigo-400">15 Jours</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass-card p-6 sm:p-12 lg:p-24 relative overflow-hidden bg-white/5 backdrop-blur-3xl border-white/10">
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tighter leading-none italic uppercase">Donnez vie à vos projets.</h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md">
                Discutez avec nos experts et concevons ensemble les infrastructures, applications et compétences numériques adaptées à votre croissance.
              </p>
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-500 transition-all inline-flex items-center gap-4 shadow-2xl shadow-blue-900/50"
              >
                Démarrer un projet
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
               {[
                 { t: 'YOU KNOW TECH', c: 'bg-blue-500' },
                 { t: 'SASTOCK SAAS', c: 'bg-green-500' },
                 { t: 'FORMATIONS EN LIGNE', c: 'bg-indigo-500' },
                 { t: 'TRANSFORMATION IA', c: 'bg-purple-500' },
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                   <span className={`w-2 h-2 ${item.c} rounded-full animate-pulse`}></span>
                   <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">{item.t}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
