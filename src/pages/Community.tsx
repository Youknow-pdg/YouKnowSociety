import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Users, MessageSquare, Calendar, Sparkles, Award, BookOpen, 
  Briefcase, Globe, ArrowRight, CheckCircle2, HeartHandshake, 
  Rocket, Send, HelpCircle, Zap, Shield, Check, Clock, UserCheck
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  speaker: string;
  desc: string;
  attendees: number;
}

const upcomingEvents: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Masterclass : Développer un Site Web & App avec l\'IA',
    date: '15 Août 2026',
    time: '16:00 - 18:00 (GMT)',
    location: 'En ligne (Google Meet) & Dakar Plateau',
    type: 'Masterclass Gratuit',
    speaker: 'Équipe YOU KNOW TECH & Mentors',
    desc: 'Découvrez comment multiplier votre productivité de développeur et créer des applications modernes en tirant parti de l\'intelligence artificielle.',
    attendees: 184
  },
  {
    id: 'ev-2',
    title: 'Atelier Pratique : Gestion financière & Stock avec SASTOCK',
    date: '22 Août 2026',
    time: '15:00 - 17:00 (GMT)',
    location: 'En ligne & Direct WhatsApp Live',
    type: 'Atelier Métier',
    speaker: 'Équipe Produit SASTOCK',
    desc: 'Formation interactive pour les commerçants, PME et gérants de boutique : automatisez votre gestion de stock et maximisez vos bénéfices.',
    attendees: 210
  },
  {
    id: 'ev-3',
    title: 'Meetup Alumnis YOU KNOW ACADEMY & Opportunités Pro',
    date: '05 Septembre 2026',
    time: '10:00 - 13:00 (GMT)',
    location: 'Dakar Plateau & Visioconférence',
    type: 'Networking & Job Dating',
    speaker: 'YOU KNOW EDUCATION & Partenaires',
    desc: 'Rencontre entre les certifiés en Bureautique/Tech et le réseau d\'entreprises partenaires du groupe (Feselma, SDM, etc.) pour des stages et contrats.',
    attendees: 145
  }
];

const communityPillars = [
  {
    icon: MessageSquare,
    title: 'Forums & Entraide 24/7',
    desc: 'Un espace interactif d\'entraide où apprenants, professionnels et passionnés résolvent leurs problèmes de code, d\'IA et d\'outils bureautiques.',
    badge: 'COMMUNICATION'
  },
  {
    icon: BookOpen,
    title: 'Réseau YOU KNOW ACADEMY',
    desc: 'Échanges continus entre les certifiés en informatique bureautique (Word, Excel, PowerPoint, Access) et technologies web/IA pour pérenniser leurs acquis.',
    badge: 'APPRENTISSAGE'
  },
  {
    icon: Calendar,
    title: 'Événements & Live Coding',
    desc: 'Masterclasses hebdomadaires, ateliers pratiques de 15 jours à 3 semaines et sessions de mentorat en direct dispensés par nos ingénieurs.',
    badge: 'ÉVÉNEMENTS'
  },
  {
    icon: Briefcase,
    title: 'Opportunités & Projets Pro',
    desc: 'Accès prioritaire aux offres d\'emploi, missions en freelance et projets de développement au sein des 18 filiales du Groupe YOU KNOW.',
    badge: 'CARRIÈRE'
  }
];

const testimonials = [
  {
    name: 'Aminata Diallo',
    role: 'Certifiée Bureautique & Membre Active',
    quote: 'La communauté YOU KNOW m\'a permis d\'assimiler Excel et Word en quelques semaines. Grâce au réseau d\'entraide, j\'ai décroché un poste d\'assistante de gestion.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Moussa Ndiaye',
    role: 'Développeur Junior & Bénéficiaire Mentorat',
    quote: 'Échanger quotidiennement avec les ingénieurs de YOU KNOW TECH m\'a ouvert les yeux sur l\'IA et le SaaS SASTOCK. C\'est un tremplin exceptionnel pour les jeunes technologues.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Fatou Sow',
    role: 'Entrepreneure & Utilisatrice SASTOCK',
    quote: 'Participer aux ateliers de la communauté m\'a appris à optimiser mes stocks. L\'esprit d\'entraide de YOU KNOW SOCIETY fait toute la différence !',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];

const faqs = [
  {
    q: 'L\'adhésion à la communauté YOU KNOW est-elle gratuite ?',
    a: 'Oui, l\'accès à nos groupes d\'échange (WhatsApp, Telegram, Discord), nos forums et nos meetups publics est 100% gratuit et ouvert à tous les passionnés du numérique.'
  },
  {
    q: 'Comment s\'inscrire aux formations de YOU KNOW ACADEMY ?',
    a: 'Vous pouvez vous inscrire directement en ligne ou contacter nos conseillers via le formulaire ci-dessous ou sur WhatsApp (+221 70 200 72 85). Les frais d\'inscription sont fixés à 5 000 FCFA avec un coût de 1 475 FCFA par cours.'
  },
  {
    q: 'Puis-je intervenir en tant que Mentor ou Speaker lors des meetups ?',
    a: 'Absolument ! Nous encourageons le partage du savoir. Les professionnels du secteur numérique souhaitant partager leur expertise peuvent soumettre leur candidature dans le formulaire ci-dessous.'
  },
  {
    q: 'Quels sont les avantages pour les membres de la communauté ?',
    a: 'Bénéficiez d\'un accompagnement personnalisé, d\'un accès privilégié aux événements tech, de tarifs préférentiels sur nos logiciels comme SASTOCK et de recommandations pour des offres d\'emploi.'
  }
];

export default function Community() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Étudiant / Apprenant',
    interests: 'IA & Développement Web',
    message: ''
  });
  const [joined, setJoined] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [eventJoined, setEventJoined] = useState<Record<string, boolean>>({});

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email) {
      try {
        await fetch('/api/community/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            phone: formState.phone,
            interest: `${formState.role} - ${formState.interests}`
          })
        });
        await fetch('/api/requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'demande',
            name: formState.name,
            email: formState.email,
            phone: formState.phone,
            company: formState.role,
            subject: 'Adhésion Communauté YOU KNOW',
            message: `Profil: ${formState.role} | Intérêts: ${formState.interests} | Message: ${formState.message || 'Souhaite rejoindre la communauté'}`
          })
        });
      } catch (err) {
        console.error(err);
      }
      setJoined(true);
    }
  };

  const toggleEvent = (id: string) => {
    setEventJoined(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pb-32 bg-slate-50 text-slate-900">
      {/* Hero Header */}
      <section className="py-20 lg:py-28 border-b border-slate-200 relative technical-grid overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-xs font-mono font-bold uppercase tracking-widest">
              <Users size={14} /> LA COMMUNAUTÉ YOU KNOW SOCIETY
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight">
              Où le Savoir Réunit <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">L'Innovation</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Rejoignez le réseau dynamique d'apprenants, de développeurs, d'entrepreneurs et d'experts tech unis autour de la vision du Groupe YOU KNOW SOCIETY.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center items-center gap-4 pt-4"
          >
            <Link
              to="/forum"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare size={16} /> Accéder au Grand Forum
            </Link>
            <a
              href="#join-form"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Rocket size={16} /> Rejoindre la Communauté
            </a>
            <a
              href="https://chat.whatsapp.com/LKrTO2fUd6J18oEu8H2soZ?s=sh&p=a&ilr=1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <MessageSquare size={16} className="text-emerald-600" /> Groupe WhatsApp Officiel
            </a>
          </motion.div>
        </div>
      </section>

      {/* Community Key Metrics */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Membres Actifs', value: '+2 500', icon: Users, color: 'text-blue-600' },
            { label: 'Projets & Filiales', value: '18 Filiales', icon: Shield, color: 'text-indigo-600' },
            { label: 'Ateliers & Meetups', value: '+120 sessions', icon: Calendar, color: 'text-purple-600' },
            { label: 'Satisfaction Apprenants', value: '99.4%', icon: Award, color: 'text-emerald-600' },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col justify-center items-center text-center space-y-2">
              <stat.icon size={26} className={stat.color} />
              <div className="text-2xl sm:text-3xl font-display font-black text-slate-900">{stat.value}</div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">
            NOS ENGAGEMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900">
            Les 4 Piliers de la Communauté
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Conçu pour favoriser l'apprentissage continu, l'échange d'expériences et le développement professionnel au Sénégal et à l'international.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityPillars.map((pil, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xl rounded-3xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-700 border border-blue-200 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <pil.icon size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">{pil.badge}</span>
                <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {pil.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                  {pil.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="p-8 lg:p-12 border border-slate-200 bg-white rounded-[2.5rem] shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">CALENDRIER D'ÉCHANGE</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 mt-1">
                Prochains Événements & Masterclasses
              </h2>
            </div>
            <p className="text-slate-600 text-xs max-w-md font-normal">
              Participez gratuitement à nos webinaires et rencontres en présentiel à Dakar pour enrichir vos compétences technologiques.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {upcomingEvents.map((ev) => {
              const isJoined = !!eventJoined[ev.id];
              return (
                <div key={ev.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-[10px] font-mono font-bold uppercase">
                        {ev.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-bold flex items-center gap-1">
                        <Users size={12} /> {ev.attendees + (isJoined ? 1 : 0)} inscrits
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-slate-900 leading-snug">{ev.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{ev.desc}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blue-600 shrink-0" />
                        <span>{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-blue-600 shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-blue-600 shrink-0" />
                        <span>{ev.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px] italic">
                        <UserCheck size={13} className="text-blue-600 shrink-0" />
                        <span>Intervenant : {ev.speaker}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleEvent(ev.id)}
                    className={`w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isJoined 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check size={16} /> Inscription Confirmée !
                      </>
                    ) : (
                      <>
                        <Zap size={16} /> S'inscrire Gratuitement
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join-form" className="max-w-7xl mx-auto px-6 mt-28">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center border border-blue-200">
              <HeartHandshake size={28} />
            </div>
            <span className="text-xs font-mono text-blue-700 font-bold uppercase tracking-widest">ADHÉSION LIBRE</span>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-slate-900 leading-tight">
              Rejoignez la Communauté YOU KNOW
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Remplissez ce court formulaire pour recevoir une invitation officielle à nos groupes d'échange directs, forums et newsletters exclusives.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Accès gratuit aux groupes WhatsApp & Telegram d\'entraide',
                'Invitations prioritaires aux Masterclasses YOU KNOW ACADEMY',
                'Partage d\'offres de stages et d\'emplois dans le réseau',
                'Remises exclusives sur les logiciels du Groupe (SASTOCK...)'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-slate-800 font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 border border-slate-200 bg-white rounded-3xl shadow-xl">
              {joined ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-md">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-extrabold text-slate-900">Bienvenue dans la Communauté !</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Merci <strong>{formState.name}</strong>. Votre demande d'adhésion a bien été enregistrée. Nous vous avons transmis le lien d'accès WhatsApp/Telegram direct.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/LKrTO2fUd6J18oEu8H2soZ?s=sh&p=a&ilr=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    <MessageSquare size={16} /> Rejoindre le Groupe WhatsApp Officiel
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleJoin} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase">Nom Complet *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Ousmane Sow"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all text-sm font-medium"
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase">Adresse Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="Ex: contact@domaine.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all text-sm font-medium"
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase">Téléphone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+221 ..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all text-sm font-medium"
                        value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase">Profil / Rôle</label>
                      <select
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all text-sm font-medium cursor-pointer"
                        value={formState.role}
                        onChange={e => setFormState({ ...formState, role: e.target.value })}
                      >
                        <option value="Étudiant / Apprenant">Étudiant / Apprenant YOU KNOW</option>
                        <option value="Développeur / Informaticien">Développeur / Informaticien</option>
                        <option value="Commerçant / Entrepreneur">Commerçant / Entrepreneur (SASTOCK)</option>
                        <option value="Expert / Mentor souhaité">Expert / Souhaite être Mentor</option>
                        <option value="Passionné de Tech">Passionné de Technologie</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 uppercase">Domaines d'Intérêt Principal</label>
                    <select
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all text-sm font-medium cursor-pointer"
                      value={formState.interests}
                      onChange={e => setFormState({ ...formState, interests: e.target.value })}
                    >
                      <option value="IA & Développement Web">Intelligence Artificielle & Développement Web</option>
                      <option value="Informatique Bureautique">Informatique Bureautique (Word, Excel, PowerPoint)</option>
                      <option value="SASTOCK & Gestion">Gestion de Stock & SaaS SASTOCK</option>
                      <option value="Transformation Digitale">Transformation Digitale & Design</option>
                      <option value="Tout l'écosystème">Tout l'écosystème Groupe YOU KNOW</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 uppercase">Présentation / Attentes (Optionnel)</label>
                    <textarea
                      rows={3}
                      placeholder="Quels sont vos objectifs au sein de la communauté ?"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all text-sm font-medium resize-none"
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} /> Valider Mon Inscription
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">
            PAROLES DE MEMBRES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900">
            Ce que dit notre Communauté
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col justify-between space-y-6">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic font-normal">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-200" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-display">{t.name}</h4>
                  <span className="text-[11px] font-mono text-blue-700 font-bold block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6 mt-28">
        <div className="p-8 sm:p-12 border border-slate-200 bg-white rounded-[2.5rem] shadow-xl space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">QUESTIONS FRÉQUENTES</span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
              Foire Aux Questions Communauté
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <HelpCircle size={18} className="text-blue-600 shrink-0" />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-normal border-t border-slate-200 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="p-8 lg:p-12 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-[2.5rem] text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-display font-black leading-tight">
            Prêt à transformer vos idées en réussite technologique ?
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed">
            Contactez les experts de YOU KNOW SOCIETY pour concevoir vos applications web, déployer le logiciel SASTOCK ou suivre nos formations professionnelles.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
            >
              <Send size={16} /> Demander une étude ou devis
            </Link>
            <Link
              to="/events"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Calendar size={16} className="text-amber-300" /> Participer à nos Webinaires Live
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
