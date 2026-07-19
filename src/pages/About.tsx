import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, History, Building2, TrendingUp, ShieldCheck, Users, Briefcase, Lightbulb, BookOpen, Shuffle, HelpCircle } from 'lucide-react';

const values = [
  { t: 'Innovation', d: 'Anticiper les technologies et l\'intégration de l\'IA pour créer de la valeur aujourd\'hui.', i: TrendingUp },
  { t: 'Excellence', d: 'Une exigence de qualité sans compromis et recherche constante de perfection.', i: Award },
  { t: 'Professionnalisme', d: 'Un engagement absolu de rigueur, de qualité et de respect de nos clients.', i: ShieldCheck },
  { t: 'Créativité', d: 'Innover en concevant des interfaces et des solutions logicielles uniques.', i: Lightbulb },
  { t: 'Partage du savoir', d: 'Transmettre nos connaissances à travers des formations pratiques et accessibles.', i: BookOpen },
  { t: 'Respect', d: 'Cultiver des relations saines et transparentes au sein et en dehors de notre groupe.', i: Heart },
  { t: 'Esprit d\'équipe', d: 'Unir nos compétences complémentaires pour relever tous les défis technologiques.', i: Users },
  { t: 'Impact social', d: 'Avoir un impact positif durable au Sénégal, en Afrique et dans le monde entier.', i: Shuffle },
];

export default function About() {
  return (
    <div className="pb-32 overflow-hidden relative">
      {/* Hero */}
      <section className="py-24 border-b border-white/5 relative">
        {/* Floating elements */}
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-1/4 text-blue-500/10"
        >
          <Building2 size={120} />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-10 left-1/4 text-indigo-500/10"
        >
          <History size={80} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[10px] uppercase tracking-[0.6em] font-black text-blue-500 mb-8">ADN DU GROUPE</h1>
              <h2 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-10 uppercase italic">
                La force <br /> du savoir & de <br /> <span className="text-gradient underline decoration-blue-500/30">l'innovation</span>.
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-lg font-medium">
                YOU KNOW SOCIETY est un groupe holding technologique international spécialisé dans le numérique, l'innovation, la formation, le développement technologique et la transformation digitale. En tant que société mère internationale, nous supervisons plusieurs filiales spécialisées et préparons l'avenir numérique avec excellence.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-2 border-white/10 glass-card p-2">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                  alt="Modern office" 
                  className="w-full h-full object-cover rounded-[3.5rem] opacity-70"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 w-72 p-10 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl hidden md:block"
              >
                 <div className="text-6xl font-black mb-2 tracking-tighter">10+</div>
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-90 italic leading-tight">Années d'Excellence Technologique</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="p-16 glass-card border-white/5 flex flex-col gap-10 hover:bg-white/10"
          >
            <div className="w-20 h-20 bg-blue-600/20 text-blue-400 rounded-3xl flex items-center justify-center shadow-inner">
              <Target size={40} />
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-extrabold text-white tracking-tight uppercase italic underline decoration-blue-500/20">Notre Mission</h3>
              <p className="text-slate-400 leading-relaxed text-xl">
                Aider les particuliers, les entreprises et les organisations à apprendre, créer, innover et réussir grâce aux technologies numériques.
              </p>
            </div>
          </motion.div>
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-16 glass-card bg-slate-900/40 border-white/5 text-white flex flex-col gap-10 shadow-2xl hover:bg-white/10"
          >
            <div className="w-20 h-20 bg-indigo-600/20 text-indigo-400 rounded-3xl flex items-center justify-center shadow-inner">
              <Eye size={40} />
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-extrabold text-white tracking-tight uppercase italic underline decoration-indigo-500/20">Notre Vision</h3>
              <p className="text-slate-500 leading-relaxed text-xl">
                Construire une société qui crée des solutions innovantes dans plusieurs secteurs d'activité afin d'avoir un impact positif au Sénégal, en Afrique et dans le monde entier.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meaning of "YOU KNOW" */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <div className="glass-card p-12 sm:p-24 border-white/5 relative overflow-hidden bg-slate-950/40">
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase tracking-[0.8em] font-black text-blue-500 mb-6">SIGNIFICATION DU NOM</h2>
            <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase italic">Que signifie <span className="text-blue-500">YOU KNOW</span> ?</h3>
            <p className="text-slate-500 text-sm max-w-xl mx-auto mt-6 italic">
              YOU KNOW est bien plus qu'un nom : chaque lettre possède une signification profonde, guidant nos actions et notre éthique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { letter: 'Y', title: 'VisionarY', desc: 'Nous avons une vision ambitieuse tournée vers l\'avenir.' },
              { letter: 'O', title: 'OpportunitO', desc: 'Nous créons des opportunités concrètes grâce au numérique.' },
              { letter: 'U', title: 'FutUre', desc: 'Nous préparons les générations aux métiers d\'avenir.' },
              { letter: 'K', title: 'Knowledge', desc: 'Le savoir est au cœur de tout ce que nous concevons.' },
              { letter: 'N', title: 'INnovation', desc: 'Nous développons constamment des solutions innovantes.' },
              { letter: 'O', title: 'PerfectiOn', desc: 'Nous recherchons constamment la qualité et l\'excellence.' },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-2xl flex gap-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center font-mono font-black text-2xl shrink-0">
                  {item.letter}
                </div>
                <div>
                  <h4 className="font-black text-white text-lg tracking-tight uppercase italic mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-8 bg-white/5 border border-white/5 rounded-2xl flex gap-6 hover:bg-white/10 transition-colors max-w-lg mx-auto">
            <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl flex items-center justify-center font-mono font-black text-2xl shrink-0">
              W
            </div>
            <div>
              <h4 className="font-black text-white text-lg tracking-tight uppercase italic mb-1">GroWth</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Nous favorisons la croissance des personnes, des entreprises et de la société.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <div className="text-center mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.8em] font-black text-blue-500 mb-6">PILIERS DU GROUPE</h2>
          <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic">L'ADN <span className="text-blue-500 underline">Youknow</span></h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              className="text-center p-8 glass-card hover:border-blue-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-white/5 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <v.i size={32} />
                </div>
                <h4 className="text-xl font-black text-white mb-4 italic tracking-tight uppercase">{v.t}</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-40 py-32 bg-slate-900/20 relative">
        <div className="frosted-bg opacity-20" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase italic">Pourquoi <span className="text-blue-500">YOUKNOW</span> ?</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Une Équipe Passionnée', a: 'Des experts passionnés par le numérique qui s\'investissent pleinement dans chaque réussite.' },
              { q: 'Des Solutions Modernes', a: 'L\'utilisation des technologies de pointe (IA, SaaS, Cloud) pour vous donner une longueur d\'avance.' },
              { q: 'Un Accompagnement Personnalisé', a: 'Un suivi continu de bout en bout, adapté précisément à vos objectifs et besoins.' },
              { q: 'Des Formations Pratiques', a: 'Des cursus 100% en ligne focalisés sur la réalisation concrète de projets.' },
              { q: 'Une Approche Orientée Résultats', a: 'Des projets mesurables pour maximiser votre retour sur investissement.' },
              { q: 'Une Innovation Permanente', a: 'Une veille technologique continue pour proposer des approches toujours plus performantes.' },
              { q: 'Une Vision à Long Terme', a: 'Un accompagnement durable et une structuration du savoir pour bâtir l\'avenir.' },
            ].map((item, i) => (
              <div key={i} className="p-8 glass-card border-white/5 flex gap-8 items-center hover:bg-white/5">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-blue-900/40">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h4 className="font-black text-white text-xl uppercase italic tracking-tight mb-2">{item.q}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
