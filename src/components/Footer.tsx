import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';
import logo from '../logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 pt-20 pb-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <img 
                src={logo} 
                alt="YOU KNOW SOCIETY Logo" 
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]" 
                referrerPolicy="no-referrer" 
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              YOU KNOW SOCIETY est un groupe holding technologique international spécialisé dans le numérique, l'innovation, la formation, le développement technologique et la transformation digitale.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono font-bold text-blue-400">
              <Globe size={12} /> SÉNÉGAL • AFRIQUE • MONDE ENTIER
            </div>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 text-slate-400 uppercase tracking-widest text-[10px] font-mono">Expertises & Formations</h4>
            <ul className="space-y-3">
              {[
                { name: 'Développement Web & Applications', path: '/services' },
                { name: 'Intelligence Artificielle & IA', path: '/services' },
                { name: 'Logiciel SaaS SASTOCK', path: '/' },
                { name: 'Formations YOU KNOW ACADEMY', path: '/services' },
                { name: 'Informatique Bureautique', path: '/' },
                { name: 'Transformation Digitale & Media', path: '/services' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 group">
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-400" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 text-slate-400 uppercase tracking-widest text-[10px] font-mono">Structure du Groupe</h4>
            <ul className="space-y-3">
              {[
                { name: 'À propos de YOU KNOW SOCIETY', path: '/about' },
                { name: 'YOU KNOW TECH (SaaS & IA)', path: '/subsidiaries' },
                { name: 'YOU KNOW COMMERCE & FINANCE', path: '/subsidiaries' },
                { name: 'YOU KNOW EDUCATION', path: '/subsidiaries' },
                { name: 'YOU KNOW AUTO & MOBILITÉ', path: '/subsidiaries' },
                { name: 'Études de Cas & Réalisations', path: '/cases' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 group">
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-400" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 text-slate-400 uppercase tracking-widest text-[10px] font-mono">Coordonnées Officielles</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Email Général</span>
                  <a href="mailto:contact@youknow.click" className="text-xs text-slate-300 hover:text-blue-400 font-mono transition-colors">contact@youknow.click</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Ligne Directe / WhatsApp</span>
                  <a href="https://wa.me/221702007285" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-300 hover:text-blue-400 font-mono transition-colors">+221 70 200 72 85</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Site Web Officiel</span>
                  <a href="https://youknow.click" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline font-mono">https://youknow.click</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Présence Globale</span>
                  <span className="text-xs text-slate-300">Sénégal, Afrique & International</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p className="text-slate-400 text-[11px] font-bold">
              &copy; {currentYear} YOU KNOW SOCIETY. Tous droits réservés.
            </p>
            <span className="hidden sm:inline text-slate-600">•</span>
            <p className="text-xs font-serif italic text-blue-400/80">
              "Where Knowledge Meets Innovation."
            </p>
          </div>
          <div className="flex gap-6 text-[10px] text-slate-500 uppercase font-mono font-bold tracking-widest">
            <Link to="/about" className="hover:text-white transition-colors">Politique Qualité</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Accès Partenaires</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

