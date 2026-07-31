import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, Building2, TrendingUp, ShieldCheck, Users, Lightbulb, BookOpen, Shuffle, Sparkles, CheckCircle, Globe2 } from 'lucide-react';

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

const letterAcronyms = [
  { letter: 'Y', word: 'VisionarY', meaning: 'Nous avons une vision ambitieuse tournée vers l\'avenir.', highlight: 'Vision d\'avenir' },
  { letter: 'O', word: 'OpportunitO', meaning: 'Nous créons des opportunités concrètes grâce au numérique.', highlight: 'Créateur de valeur' },
  { letter: 'U', word: 'FutUre', meaning: 'Nous préparons les générations aux métiers d\'avenir.', highlight: 'Métiers de demain' },
  { letter: 'K', word: 'Knowledge', meaning: 'Le savoir est au cœur de tout ce que nous concevons.', highlight: 'Savoir central' },
  { letter: 'N', word: 'INnovation', meaning: 'Nous développons constamment des solutions innovantes.', highlight: 'R&D Permanente' },
  { letter: 'O', word: 'PerfectiOn', meaning: 'Nous recherchons constamment la qualité et l\'excellence.', highlight: 'Excellence totale' },
  { letter: 'W', word: 'GroWth', meaning: 'Nous favorisons la croissance des personnes, des entreprises et de la société.', highlight: 'Croissance partagée' },
];

export default function About() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  return (
    <div className="pb-32 overflow-hidden relative bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="py-20 lg:py-28 border-b border-slate-200 relative technical-grid bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-xs font-mono font-bold uppercase tracking-widest">
                <Building2 size={14} /> ADN DU GROUPE HOLDING
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                La force du savoir <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">& de l'innovation.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                <strong className="text-slate-900 font-semibold">YOU KNOW SOCIETY</strong> est un groupe holding technologique international spécialisé dans le numérique, l'innovation, la formation, le développement technologique et la transformation digitale. En tant que société mère, nous supervisons des filiales d'élite et préparons l'avenir numérique avec rigueur et vision.
              </p>

              <div className="pt-4 flex flex-wrap gap-6 text-xs font-mono text-slate-600">
                <span className="flex items-center gap-2 text-slate-900 font-bold">
                  <CheckCircle size={16} className="text-blue-600" /> Siège : Dakar, Sénégal
                </span>
                <span className="flex items-center gap-2 text-slate-900 font-bold">
                  <Globe2 size={16} className="text-emerald-600" /> Rayonnement : International
                </span>
              </div>
            </motion.div>

            {/* Corporate Stats Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="p-8 lg:p-10 border border-slate-200 bg-white rounded-[2.5rem] shadow-xl relative space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">Devise Officielle</span>
                  <Sparkles size={18} className="text-amber-500" />
                </div>

                <div className="space-y-2">
                  <div className="text-xl lg:text-2xl font-display font-bold text-slate-900 italic">
                    "Where Knowledge Meets Innovation."
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Là où le savoir rencontre l'innovation pour créer l'avenir.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-800 uppercase">Impact & Portée</div>
                  <p className="text-xs text-slate-600 font-normal">
                    Accompagnement des entreprises, digitalisation des PME et formation certifiante des talents africains et internationaux.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="p-10 lg:p-12 border border-slate-200 rounded-3xl bg-white shadow-md flex flex-col justify-between hover:border-blue-500 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-8 border border-blue-200">
              <Target size={28} />
            </div>
            <div className="space-y-4">
              <span className="text-xs font-mono text-blue-700 font-bold uppercase tracking-widest">Raison d'être</span>
              <h2 className="text-3xl font-display font-bold text-slate-900">Notre Mission</h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Aider les particuliers, les entreprises et les organisations à apprendre, créer, innover et réussir grâce aux technologies numériques.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 lg:p-12 border border-slate-200 rounded-3xl bg-white shadow-md flex flex-col justify-between hover:border-indigo-500 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center mb-8 border border-indigo-200">
              <Eye size={28} />
            </div>
            <div className="space-y-4">
              <span className="text-xs font-mono text-indigo-700 font-bold uppercase tracking-widest">Ambition Stratégique</span>
              <h2 className="text-3xl font-display font-bold text-slate-900">Notre Vision</h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Construire une société qui crée des solutions innovantes dans plusieurs secteurs d'activité afin d'avoir un impact positif au Sénégal, en Afrique et dans le monde entier.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meaning of "YOU KNOW" Interactive Acronym Decoder */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="p-8 lg:p-16 border border-slate-200 bg-white rounded-[2.5rem] shadow-xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">SIGNIFICATION DU NOM</span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900">
              Que signifie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">YOU KNOW</span> ?
            </h2>
            <p className="text-slate-600 text-sm">
              Chaque lettre de notre acronyme porte une promesse fondamentale guidant l'excellence du groupe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {letterAcronyms.map((item, i) => (
              <div 
                key={i}
                onMouseEnter={() => setActiveLetter(item.letter + i)}
                onMouseLeave={() => setActiveLetter(null)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeLetter === item.letter + i
                    ? 'bg-blue-50 border-blue-500 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-mono font-bold text-2xl shadow-sm">
                    {item.letter}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">{item.highlight}</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{item.word}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">PILIERS & ÉTHIQUE</span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900">
            Nos Valeurs Cardinales
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-6 border border-slate-200 rounded-3xl bg-white hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 border border-blue-200">
                  <v.i size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">{v.t}</h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mt-2 font-normal">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="p-8 lg:p-16 border border-slate-200 bg-white rounded-[2.5rem] shadow-xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">EXCELLENCE OPÉRATIONNELLE</span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900">
              Pourquoi faire confiance à <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">YOU KNOW SOCIETY</span> ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'Une Équipe Passionnée', a: 'Des experts passionnés par le numérique qui s\'investissent pleinement dans chaque réussite.' },
              { q: 'Des Solutions Modernes', a: 'L\'utilisation des technologies de pointe (IA, SaaS, Cloud) pour vous donner une longueur d\'avance.' },
              { q: 'Un Accompagnement Personnalisé', a: 'Un suivi continu de bout en bout, adapté précisément à vos objectifs et besoins.' },
              { q: 'Des Formations Pratiques', a: 'Des cursus 100% en ligne focalisés sur la réalisation concrète de projets sous la bannière YOU KNOW ACADEMY.' },
              { q: 'Une Approche Orientée Résultats', a: 'Des projets mesurables pour maximiser votre retour sur investissement.' },
              { q: 'Une Vision à Long Terme', a: 'Un accompagnement durable et une structuration du savoir pour bâtir l\'avenir.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex gap-5 items-start">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 border border-blue-200 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base mb-1">{item.q}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
