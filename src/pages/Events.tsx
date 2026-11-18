import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Radio, Calendar, Clock, User, ShieldCheck, Users, 
  Video, ScreenShare, MessageSquare, ArrowRight, Sparkles, 
  CheckCircle2, AlertCircle, PlayCircle, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventItem {
  id: number;
  title: string;
  description: string;
  category: string;
  event_date: string;
  event_time: string;
  speaker: string;
  speaker_role?: string;
  speaker_avatar?: string;
  status: 'LIVE' | 'UPCOMING' | 'ENDED' | string;
  max_participants?: number;
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'ENDED'>('ALL');

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (e) {
      console.error('Error fetching events:', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(evt => {
    if (activeFilter === 'ALL') return true;
    return evt.status === activeFilter;
  });

  const liveCount = events.filter(e => e.status === 'LIVE').length;

  return (
    <div className="pb-32 bg-slate-900 text-slate-100 min-h-screen">
      
      {/* Header Banner */}
      <section className="py-20 lg:py-28 relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        
        {/* Glow & Grid Background */}
        <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
              <Radio size={14} className="text-red-500 animate-pulse" />
              <span>YOU KNOW LIVE STUDIO & WEBINAIRES</span>
              {liveCount > 0 && (
                <span className="ml-1.5 px-2 py-0.5 bg-red-600 text-white text-[10px] rounded-full font-bold">
                  {liveCount} En Direct
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-tight">
              Espace Webinaires <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-emerald-400">
                & Événements Directs
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Participez aux séances de webinaire exclusives créées par YOU KNOW SOCIETY, YOU KNOW TECH et YOU KNOW ACADEMY. Échangez en direct, partagez votre écran et interagissez en toute sécurité avec nos experts.
            </p>
          </motion.div>

          {/* Quick Studio Highlights */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-display">Accès sur Demande</div>
                <div className="text-[11px] text-slate-400 font-normal">Approbation en direct par l'hôte</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
                <ScreenShare size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-display">Partage d'Écran Natif</div>
                <div className="text-[11px] text-slate-400 font-normal">Diffusez votre écran instantanément</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <Video size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-display">Studio Web de la Société</div>
                <div className="text-[11px] text-slate-400 font-normal">100% hébergé sur notre plateforme</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-12">
        
        {/* Permanent 24/7 Open Webinar Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-blue-500/50 shadow-2xl relative overflow-hidden text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Studio Permanent 24/7 • Accès Libre Sans Restriction</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-black leading-tight text-white">
              Webinaire Permanent & Salle Libre
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
              Besoin de discuter en direct, de tester votre micro/caméra ou d'échanger avec l'équipe de YOU KNOW SOCIETY sans attendre de session planifiée ? La salle permanente est accessible <strong>24h/24 et 7j/7 sans planification ni demande préalable</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-blue-200 pt-1">
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Sans approbation requise</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Caméra, Micro & Partage d'écran HD</span>
              </span>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/academy/live?id=open-room"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
            >
              <Video size={18} />
              <span>Rejoindre le Studio Libre Directement</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'ALL'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Tous ({events.length})
            </button>

            <button
              onClick={() => setActiveFilter('LIVE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeFilter === 'LIVE'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>En Direct ({events.filter(e => e.status === 'LIVE').length})</span>
            </button>

            <button
              onClick={() => setActiveFilter('UPCOMING')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'UPCOMING'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              À Venir ({events.filter(e => e.status === 'UPCOMING').length})
            </button>

            <button
              onClick={() => setActiveFilter('ENDED')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'ENDED'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Terminés ({events.filter(e => e.status === 'ENDED').length})
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            <span>Mises à jour en temps réel</span>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm font-mono">Chargement du calendrier des webinaires...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center bg-slate-800/40 border border-slate-800 rounded-3xl space-y-4">
            <AlertCircle size={40} className="text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Aucun événement dans cette catégorie</h3>
            <p className="text-slate-400 text-xs">Consultez régulièrement notre page pour ne pas manquer les prochaines séances directes.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(evt => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-6 rounded-3xl bg-slate-800/80 border transition-all duration-300 flex flex-col justify-between relative group ${
                  evt.status === 'LIVE'
                    ? 'border-red-500/60 shadow-xl shadow-red-950/40 bg-gradient-to-b from-slate-800 to-slate-900'
                    : 'border-slate-700/70 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30'
                }`}
              >
                {/* Top status bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-700/60 border border-slate-600 text-slate-300 text-[10px] font-mono font-bold uppercase">
                      {evt.category}
                    </span>

                    {evt.status === 'LIVE' ? (
                      <span className="px-3 py-1 rounded-full bg-red-600/90 border border-red-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/40 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        <span>EN DIRECT</span>
                      </span>
                    ) : evt.status === 'UPCOMING' ? (
                      <span className="px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-[10px] font-mono font-bold uppercase">
                        À VENIR
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-mono font-bold uppercase">
                        TERMINÉ
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-blue-400 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>
                  </div>

                  {/* Date & Time Info */}
                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700/50 space-y-1.5 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-amber-400" />
                      <span>{evt.event_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-blue-400" />
                      <span>{evt.event_time}</span>
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="flex items-center gap-3 pt-2">
                    <img 
                      src={evt.speaker_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop'} 
                      alt={evt.speaker}
                      className="w-10 h-10 rounded-full object-cover border border-slate-600 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white font-display">{evt.speaker}</div>
                      <div className="text-[11px] text-slate-400">{evt.speaker_role || 'Hôte YOU KNOW'}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 border-t border-slate-700/60 mt-6">
                  {evt.status === 'LIVE' ? (
                    <Link
                      to={`/webinar/${evt.id}`}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 transition-all transform active:scale-95"
                    >
                      <Radio size={16} className="animate-pulse" />
                      <span>Accéder au Webinaire Live</span>
                    </Link>
                  ) : evt.status === 'UPCOMING' ? (
                    <Link
                      to={`/webinar/${evt.id}`}
                      className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Lock size={14} />
                      <span>Demander l'Accès à la Salle</span>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 px-4 rounded-2xl bg-slate-800 text-slate-500 font-bold text-xs uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span>Session Clôturée</span>
                    </button>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
