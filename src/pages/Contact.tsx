import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setSubmitted(true);
  };

  return (
    <div className="pb-32 bg-slate-50 text-slate-900">
       {/* Simple Header */}
       <section className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-200 technical-grid relative overflow-hidden bg-white rounded-b-[3rem] shadow-sm">
        {/* Floating background decorations */}
        <motion.div 
          animate={{ x: [0, 10, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-10 text-blue-600/10 pointer-events-none"
        >
          <MessageSquare size={120} />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-5 left-10 text-indigo-600/10 pointer-events-none"
        >
          <Globe size={100} />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-[10px] uppercase tracking-[0.6em] font-black text-blue-700 mb-6 italic">RESTEZ CONNECTÉ</h1>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-10 uppercase italic">
            Parlons de vos <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">ambitions</span>.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
            Une question sur nos services informatique ? Envie de rejoindre nos filiales ? Nous sommes à votre écoute pour transformer vos idées en réalité technique.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 mt-20">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-12">
           <div className="space-y-8">
             <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-white text-blue-700 border border-slate-200 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-2 italic text-slate-500">Localisation</h4>
                  <p className="text-slate-800 leading-relaxed font-bold tracking-tight">
                    Dakar Plateau, Immeuble Horizon, 10ème étage<br />
                    Dakar, Sénégal
                  </p>
                </div>
             </div>

             <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-white text-blue-700 border border-slate-200 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-2 italic text-slate-500">Direct</h4>
                  <p className="text-slate-800 leading-relaxed font-black font-mono">
                    +221 70 200 72 85<br />
                    +221 75 656 19 46
                  </p>
                </div>
             </div>

             <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-white text-blue-700 border border-slate-200 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-2 italic text-slate-500">Canal Digital</h4>
                  <p className="text-slate-800 leading-relaxed font-bold">
                    contact@youknow.click<br />
                    support@youknow.click
                  </p>
                </div>
             </div>
           </div>

           <div className="p-10 bg-white border border-slate-200 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                 <Clock size={20} className="text-blue-700" />
                 <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-900 italic">Horaires Opérationnels</h4>
              </div>
              <ul className="space-y-4 text-xs text-slate-600 uppercase tracking-widest font-bold">
                <li className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span>Lundi - Vendredi</span>
                  <span className="text-slate-900">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span>Samedi</span>
                  <span className="text-slate-900">09:00 - 13:00</span>
                </li>
                <li className="flex justify-between items-center opacity-40">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </li>
              </ul>
           </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 border border-slate-200 bg-white rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-8"
              >
                <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Send size={44} />
                </div>
                <h3 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter leading-none text-center">Transmission <br/>réussie</h3>
                <p className="text-slate-600 uppercase tracking-widest text-[10px] font-bold">Nos ingénieurs analysent votre demande. Réponse sous 24h.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-slate-900 bg-slate-100 border border-slate-200 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-md"
                >
                  Nouveau Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 ml-1 italic">Nom Complexe / Contact</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all font-medium placeholder:text-slate-400 shadow-sm"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 ml-1 italic">Adresse Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jean@entreprise.com"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all font-medium placeholder:text-slate-400 shadow-sm"
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 ml-1 italic">Téléphone / WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="+221 ..."
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all font-medium placeholder:text-slate-400 shadow-sm"
                      value={formState.phone}
                      onChange={e => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 ml-1 italic">Entreprise / Organisation</label>
                    <input 
                      type="text" 
                      placeholder="Nom de votre société"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all font-medium placeholder:text-slate-400 shadow-sm"
                      value={formState.company}
                      onChange={e => setFormState({...formState, company: e.target.value})}
                    />
                  </div>
                </div>

                 <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 ml-1 italic">Objet de votre demande</label>
                  <select 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all font-medium appearance-none cursor-pointer shadow-sm"
                    value={formState.subject}
                    onChange={e => setFormState({...formState, subject: e.target.value})}
                  >
                    <option value="" className="bg-white">SÉLECTIONNEZ UNE OPTION</option>
                    <option value="devis" className="bg-white">DEMANDE DE DEVIS (WEB / MOBILE / IA)</option>
                    <option value="formation" className="bg-white">INSCRIPTION À UNE FORMATION YOU KNOW ACADEMY</option>
                    <option value="sastock" className="bg-white">DEMANDE DE DÉMO LOGICIEL SASTOCK</option>
                    <option value="support" className="bg-white">SUPPORT TECHNIQUE & MAINTENANCE</option>
                    <option value="autre" className="bg-white">AUTRE DEMANDE / PARTENARIAT</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 ml-1 italic">Message / Détails du projet</label>
                  <textarea 
                    rows={4}
                    placeholder="Quels sont vos besoins ou questions ?"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 transition-all font-medium resize-none placeholder:text-slate-400 shadow-sm"
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-base uppercase tracking-[0.3em] shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 italic"
                >
                  Envoyer le Message
                  <Send size={20} />
                </button>
              </form>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Map / Global Presence */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="h-[450px] overflow-hidden border border-slate-200 relative group p-2 rounded-[2.5rem] bg-white shadow-lg">
           <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
            alt="World map" 
            className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000 rounded-[2rem]"
            referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="p-8 sm:p-12 bg-white/95 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 max-w-md border border-slate-200 shadow-xl pointer-events-auto">
                <Globe size={44} className="text-blue-600 mx-auto" />
                <h3 className="font-black text-2xl uppercase italic text-slate-900 tracking-widest leading-none">Réseau<br/>International</h3>
                <p className="text-slate-600 text-xs font-bold leading-relaxed uppercase tracking-widest">
                  Présence & portée globale : Sénégal, Afrique et dans tous les pays du monde.
                </p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
