import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Terminal, ExternalLink, Sparkles, Smartphone, Tablet, Globe, Layers, 
  CheckCircle2, ArrowRight, ShieldCheck, Cpu, Code2, Zap, Monitor, 
  Search, Lock, Eye, Play, X, RefreshCw, Star, Building2, ShoppingBag, 
  BookOpen, Car, ArrowUpRight, Download, FileDown, HelpCircle, Info,
  Share2, Copy, Check, QrCode, AlertTriangle, Upload, FileCheck, HardDrive,
  FileCode, FolderArchive, Archive, Filter, ChevronRight, CheckCircle, Database
} from 'lucide-react';
import { ApplicationItem } from '../types';

export default function Applications() {
  const [apps, setApps] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPreviewApp, setSelectedPreviewApp] = useState<ApplicationItem | null>(null);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [useProxy, setUseProxy] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);
  const [showZipGuide, setShowZipGuide] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Live ZIP status
  const [zipInfo, setZipInfo] = useState<{
    fileSize: string;
    sizeBytes: number;
    lastModified: string;
    status: string;
  }>({
    fileSize: '45.8 Mo',
    sizeBytes: 48025600,
    lastModified: '',
    status: 'Opérationnel'
  });

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/applications');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setApps(data);
        }
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchZipStatus = async () => {
    try {
      const res = await fetch('/api/zip-status');
      if (res.ok) {
        const data = await res.json();
        setZipInfo({
          fileSize: data.fileSize || '45.8 Mo',
          sizeBytes: data.sizeBytes || 48025600,
          lastModified: data.lastModified || '',
          status: data.status || 'Opérationnel'
        });
      }
    } catch (err) {
      console.error('Error fetching ZIP status:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchZipStatus();
  }, []);

  const handleOpenPreview = (app: ApplicationItem) => {
    setSelectedPreviewApp(app);
    setIframeLoading(true);
    setIframeKey(k => k + 1);
  };

  const getIframeSrc = (app: ApplicationItem) => {
    if (!app.url) return '';
    if (useProxy) {
      return `/api/preview-proxy?url=${encodeURIComponent(app.url)}&id=${encodeURIComponent(app.id)}&name=${encodeURIComponent(app.name)}`;
    }
    return app.url;
  };

  const handleCopyLink = (url: string) => {
    const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const filteredApps = apps.filter(app => {
    const matchesCategory = filterCategory === 'all' || 
      (filterCategory === 'file' && app.appType === 'file') ||
      (filterCategory === 'link' && app.appType === 'link') ||
      app.category.toLowerCase().includes(filterCategory.toLowerCase()) ||
      app.subsidiary.toLowerCase().includes(filterCategory.toLowerCase());

    const matchesSearch = searchQuery === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.techStack && app.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      
    return matchesCategory && matchesSearch;
  });

  const spotlightApp = apps.find(a => a.isSpotlight) || apps[0] || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-white pb-20">
      
      {/* Live Iframe / Embedded Preview Modal with Viewport Simulation */}
      <AnimatePresence>
        {selectedPreviewApp && selectedPreviewApp.url && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setSelectedPreviewApp(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Browser Bar */}
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                {/* Left: Window Controls & Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex gap-1.5 shrink-0">
                    <button 
                      onClick={() => setSelectedPreviewApp(null)} 
                      className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                      title="Fermer l'aperçu (Echap)"
                    />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono truncate max-w-xs sm:max-w-md">
                    <Lock size={12} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{selectedPreviewApp.url}</span>
                    <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400">
                      {useProxy ? 'Proxy YOU KNOW' : 'Direct'}
                    </span>
                  </div>
                </div>

                {/* Center: Device Viewport Switcher */}
                <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setPreviewViewport('desktop')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewViewport === 'desktop'
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Vue Ordinateur (Plein Écran)"
                  >
                    <Monitor size={13} />
                    <span>Bureau</span>
                  </button>
                  <button
                    onClick={() => setPreviewViewport('tablet')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewViewport === 'tablet'
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Vue Tablette (768px)"
                  >
                    <Tablet size={13} />
                    <span>Tablette</span>
                  </button>
                  <button
                    onClick={() => setPreviewViewport('mobile')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      previewViewport === 'mobile'
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Vue Smartphone Mobile (375px)"
                  >
                    <Smartphone size={13} />
                    <span>Mobile</span>
                  </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIframeLoading(true);
                      setIframeKey(k => k + 1);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    title="Recharger l'aperçu"
                  >
                    <RefreshCw size={14} className={iframeLoading ? 'animate-spin text-blue-400' : ''} />
                  </button>

                  <button
                    onClick={() => {
                      setUseProxy(!useProxy);
                      setIframeLoading(true);
                      setIframeKey(k => k + 1);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold transition-all border cursor-pointer hidden sm:block ${
                      useProxy 
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                    title="Bascule entre le mode proxy sécurisé et l'URL brute"
                  >
                    {useProxy ? '🛡️ Proxy Actif' : '🌐 Mode Direct'}
                  </button>

                  <a
                    href={selectedPreviewApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold font-mono shadow-md shadow-blue-600/30"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <span>Lancer</span>
                    <ExternalLink size={13} />
                  </a>

                  <button
                    onClick={() => setSelectedPreviewApp(null)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Iframe Viewport Area with Center Framing */}
              <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-2 sm:p-4">
                {/* Loading indicator */}
                {iframeLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs space-y-3 pointer-events-none">
                    <RefreshCw size={28} className="text-blue-400 animate-spin" />
                    <p className="text-xs font-mono text-slate-300">Chargement de l'application interactive...</p>
                  </div>
                )}

                {/* Viewport Frame Container */}
                <div 
                  className={`h-full transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 ${
                    previewViewport === 'mobile' 
                      ? 'w-[385px] max-w-full border-4 border-slate-700' 
                      : previewViewport === 'tablet' 
                      ? 'w-[768px] max-w-full border-2 border-slate-700' 
                      : 'w-full'
                  }`}
                >
                  <iframe
                    key={iframeKey}
                    src={getIframeSrc(selectedPreviewApp)}
                    title={`Aperçu interactif de ${selectedPreviewApp.name}`}
                    onLoad={() => setIframeLoading(false)}
                    className="w-full h-full border-0 bg-slate-900"
                    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; autoplay"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                </div>
              </div>

              {/* Modal Footer Info */}
              <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white">{selectedPreviewApp.name}</span>
                  <span className="text-slate-500">• {selectedPreviewApp.subsidiary}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-slate-500">YOU KNOW TECH • Cloud SaaS &amp; PWA</span>
                  <a 
                    href={selectedPreviewApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Ouvrir en Plein Écran</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extraction & Installation Guide Modal */}
      <AnimatePresence>
        {showZipGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setShowZipGuide(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-600/20 text-amber-400 rounded-2xl border border-amber-500/30">
                    <Archive size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Guide d'Extraction &amp; Installation</h3>
                    <p className="text-xs text-amber-400 font-mono mt-0.5">Package officiel YOUKNOW-DevApp.zip (avec base.apk)</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowZipGuide(false)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
                    <Info size={16} />
                    <span>Contenu du Fichier Téléchargeable</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Le fichier <strong className="text-amber-300 font-mono">YOUKNOW-DevApp.zip</strong> contient l'application mobile Android (<strong className="text-emerald-300 font-mono">base.apk</strong>), ainsi que les modèles de projets Web PWA et les travaux dirigés de la filière IDA.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="space-y-1">
                      <strong className="text-white block">Téléchargez le fichier</strong>
                      <p className="text-xs text-slate-400">
                        Cliquez sur le bouton « Télécharger YOUKNOW-DevApp.zip ». Le fichier de {zipInfo.fileSize} sera sauvegardé dans votre dossier Téléchargements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="space-y-1">
                      <strong className="text-white block">Extrayez le dossier ZIP</strong>
                      <p className="text-xs text-slate-400">
                        Sur Smartphone : Ouvrez l'application <em>Mes Fichiers</em> ou <em>ZArchiver</em>, appuyez sur <code className="text-amber-300">YOUKNOW-DevApp.zip</code> et choisissez <strong>Extraire</strong>.<br />
                        Sur Ordinateur : Clic droit &gt; <em>Extraire tout</em>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="space-y-1">
                      <strong className="text-white block">Installez l'Application Mobile (base.apk)</strong>
                      <p className="text-xs text-slate-400">
                        Ouvrez le dossier extrait, cliquez sur <code className="text-emerald-300">base.apk</code> pour lancer l'installation sur votre téléphone Android.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <a
                  href="/YOUKNOW-DevApp.zip"
                  download="YOUKNOW-DevApp.zip"
                  className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30"
                >
                  <Download size={16} />
                  <span>Télécharger YOUKNOW-DevApp.zip ({zipInfo.fileSize})</span>
                </a>
                <button
                  onClick={() => setShowZipGuide(false)}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors text-center cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800/80">
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Layers size={13} className="text-amber-400" />
            <span>Écosystème Logiciel &amp; Applications • YOU KNOW TECH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase italic leading-none">
            APPLICATIONS &amp; <span className="text-amber-400">SOLUTIONS</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Découvrez nos applications développées pour transformer vos activités : le package de développement officiel <strong className="text-amber-400">YOUKNOW-DevApp</strong>, la solution de gestion de stock <strong className="text-emerald-400">SASTOCK</strong> et l'application budgétaire <strong className="text-blue-400">MonBudget</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>{apps.length} Solutions Actives</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
              <Archive size={13} className="text-amber-400" />
              <span>Package Unique : YOUKNOW-DevApp.zip</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
              <Globe size={13} className="text-blue-400" />
              <span>SaaS &amp; PWA Web</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Featured Spotlight: Spotlight Application */}
        {spotlightApp && (
          <motion.div
            key={spotlightApp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                    {spotlightApp.appType === 'file' ? <Archive size={13} className="text-amber-400" /> : <Globe size={13} className="text-amber-400" />}
                    <span>{spotlightApp.badgeText || (spotlightApp.appType === 'file' ? 'Package Officiel' : 'Application En Ligne')}</span>
                  </span>
                  {spotlightApp.appType === 'file' && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1">
                      <HardDrive size={12} className="text-emerald-400" />
                      <span>{spotlightApp.fileSize || zipInfo.fileSize}</span>
                    </span>
                  )}
                  <span className="text-slate-400 text-xs font-mono">{spotlightApp.subsidiary}</span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase italic">
                    {spotlightApp.name}
                  </h2>
                  <p className="text-amber-400 text-sm font-bold font-mono mt-1">
                    {spotlightApp.subtitle}
                  </p>
                </div>

                <div className="bg-amber-950/40 border border-amber-800/40 rounded-2xl p-3.5 text-xs text-amber-200 flex items-start gap-2.5">
                  <FileCode size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cible :</strong> {spotlightApp.targetAudience}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {spotlightApp.description}
                </p>

                {/* Highlights */}
                {spotlightApp.highlights && spotlightApp.highlights.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    {spotlightApp.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                {spotlightApp.techStack && spotlightApp.techStack.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                      SPÉCIFICATIONS TECHNIQUES :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {spotlightApp.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 font-semibold">
                          {tech}
                        </span>
                      ))}
                      {spotlightApp.appType === 'file' && (
                        <span className="px-2.5 py-1 bg-amber-950/60 border border-amber-800/60 rounded-lg text-xs font-mono text-amber-300 font-bold">
                          Taille : {spotlightApp.fileSize || zipInfo.fileSize}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  {spotlightApp.appType === 'file' ? (
                    <>
                      <a
                        href={spotlightApp.fileUrl || '/YOUKNOW-DevApp.zip'}
                        download={spotlightApp.fileName || 'YOUKNOW-DevApp.zip'}
                        className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-amber-600/30 flex items-center gap-2"
                      >
                        <Download size={17} />
                        <span>Télécharger {spotlightApp.fileName || 'YOUKNOW-DevApp.zip'} ({spotlightApp.fileSize || zipInfo.fileSize})</span>
                      </a>

                      <button
                        onClick={() => setShowZipGuide(true)}
                        className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <HelpCircle size={16} />
                        <span>Comment Extraire &amp; Installer</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={spotlightApp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
                      >
                        <span>Lancer l'Application</span>
                        <ExternalLink size={16} />
                      </a>

                      {spotlightApp.isIframePreviewable && (
                        <button
                          onClick={() => handleOpenPreview(spotlightApp)}
                          className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-blue-300 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Eye size={16} />
                          <span>Aperçu Interactif</span>
                        </button>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => handleCopyLink(spotlightApp.fileUrl || spotlightApp.url || '/YOUKNOW-DevApp.zip')}
                    className="px-4 py-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Partager le lien"
                  >
                    {copiedLink === (spotlightApp.fileUrl || spotlightApp.url || '/YOUKNOW-DevApp.zip') ? (
                      <>
                        <Check size={16} className="text-emerald-400" />
                        <span className="text-emerald-400">Lien Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Partager le Lien</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Spotlight Visual Mockup Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl relative group-hover:border-amber-500/50 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      {spotlightApp.appType === 'file' ? <Archive size={16} className="text-amber-400" /> : <Globe size={16} className="text-blue-400" />}
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {spotlightApp.appType === 'file' ? 'PACKAGE TÉLÉCHARGEABLE' : 'APPLICATION EN LIGNE'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {spotlightApp.appType === 'file' ? (spotlightApp.fileSize || zipInfo.fileSize) : 'En Ligne'}
                    </span>
                  </div>

                  <div className={`h-64 rounded-2xl bg-gradient-to-br ${spotlightApp.imagePlaceholderGradient || 'from-amber-600 to-amber-950'} p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-inner`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-mono font-bold border border-white/20 uppercase">
                        {spotlightApp.name}
                      </span>
                      {spotlightApp.appType === 'file' ? <Archive size={20} className="text-amber-300" /> : <Globe size={20} className="text-blue-300" />}
                    </div>

                    <div className="relative z-10 space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tight italic">{spotlightApp.name}</h3>
                      <p className="text-xs text-amber-200 line-clamp-2">
                        {spotlightApp.subtitle}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono pt-2 border-t border-white/20">
                      <span>{spotlightApp.appType === 'file' ? `Fichier : ${spotlightApp.fileName || 'YOUKNOW-DevApp.zip'}` : 'Accès : Web Cloud'}</span>
                      <span className="text-amber-200">{spotlightApp.platform}</span>
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-2">
                    {spotlightApp.appType === 'file' ? (
                      <>
                        <a
                          href={spotlightApp.fileUrl || '/YOUKNOW-DevApp.zip'}
                          download={spotlightApp.fileName || 'YOUKNOW-DevApp.zip'}
                          className="py-2.5 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-200 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5"
                        >
                          <Download size={14} />
                          <span>Télécharger</span>
                        </a>
                        <button
                          onClick={() => setShowZipGuide(true)}
                          className="py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <HelpCircle size={14} />
                          <span>Guide</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          href={spotlightApp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink size={14} />
                          <span>Ouvrir</span>
                        </a>
                        {spotlightApp.isIframePreviewable && (
                          <button
                            onClick={() => handleOpenPreview(spotlightApp)}
                            className="py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Eye size={14} />
                            <span>Aperçu</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter & Search Bar */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher une solution (YOUKNOW-DevApp, MonBudget, SASTOCK...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: `Toutes les Solutions (${apps.length})` },
                { id: 'file', label: `Fichiers & Téléchargements (${apps.filter(a => a.appType === 'file').length})` },
                { id: 'link', label: `Plateformes Web & SaaS (${apps.filter(a => a.appType === 'link').length})` },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer ${
                    filterCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Applications Grid / Loading / Empty States */}
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
              <RefreshCw size={36} className="text-amber-400 animate-spin" />
              <p className="text-slate-300 font-mono text-sm">Chargement des solutions depuis la base de données...</p>
            </div>
          ) : apps.length === 0 ? (
            <div className="py-16 px-6 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-5 max-w-2xl mx-auto shadow-xl">
              <div className="w-16 h-16 bg-slate-800/80 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                <Database size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-display">Aucune application pour le moment</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-md mx-auto">
                  La base de données ne contient actuellement aucune application. Les solutions ajoutées et publiées par l'administrateur apparaîtront ici automatiquement.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2"
                >
                  <span>Nous Contacter</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/admin"
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono font-bold transition-all border border-slate-700"
                >
                  <span>Espace Administrateur</span>
                </Link>
              </div>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-14 px-6 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
              <Search size={32} className="text-slate-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-mono">Aucun résultat trouvé</h3>
                <p className="text-xs text-slate-400">
                  Aucune application ne correspond à votre filtre ou recherche <span className="text-amber-400">"{searchQuery}"</span>.
                </p>
              </div>
              <button
                onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-mono font-bold border border-slate-700 transition-all cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map(app => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all shadow-lg hover:shadow-xl group"
                >
                  <div className="space-y-4">
                    {/* Card Header & Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                        {app.subsidiary}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        app.appType === 'file'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      }`}>
                        {app.badgeText || (app.appType === 'file' ? 'Fichier' : 'Web App')}
                      </span>
                    </div>

                    {/* App Visual Banner */}
                    <div className={`h-36 rounded-2xl bg-gradient-to-br ${app.imagePlaceholderGradient || 'from-slate-800 to-slate-950'} p-4 flex flex-col justify-between text-white relative overflow-hidden border border-slate-800`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-black/40 rounded-lg">
                          {app.category}
                        </span>
                        {app.appType === 'file' ? (
                          <Archive size={18} className="text-amber-300" />
                        ) : (
                          <Globe size={18} className="text-blue-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold uppercase italic tracking-tight">{app.name}</h3>
                        <p className="text-xs text-slate-300 font-mono line-clamp-1">{app.platform}</p>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {app.name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    {app.highlights && app.highlights.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-slate-800/60">
                        {app.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    {app.techStack && app.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {app.techStack.slice(0, 3).map((t, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 rounded-md">
                            {t}
                          </span>
                        ))}
                        {app.techStack.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-slate-950 text-[10px] font-mono text-slate-500 rounded-md">
                            +{app.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-800/80">
                    {app.appType === 'file' ? (
                      <div className="flex items-center gap-2 w-full">
                        <a
                          href={app.fileUrl || '/YOUKNOW-DevApp.zip'}
                          download={app.fileName || 'YOUKNOW-DevApp.zip'}
                          className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
                        >
                          <Download size={14} />
                          <span>Télécharger ({app.fileSize || zipInfo.fileSize})</span>
                        </a>
                        <button
                          onClick={() => setShowZipGuide(true)}
                          className="p-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl transition-all cursor-pointer"
                          title="Guide d'extraction et installation"
                        >
                          <HelpCircle size={16} />
                        </button>
                      </div>
                    ) : app.url ? (
                      <div className="flex items-center gap-2 w-full">
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Lancer</span>
                          <ExternalLink size={13} />
                        </a>
                        {app.isIframePreviewable && (
                          <button
                            onClick={() => handleOpenPreview(app)}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 rounded-xl transition-all cursor-pointer"
                            title="Aperçu interactif"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <Link
                        to="/contact"
                        className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Se Renseigner</span>
                        <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Banner: Need a custom app developed by YOU KNOW TECH? */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
            <Terminal size={14} className="text-amber-300" />
            <span>YOU KNOW TECH • CONCEPTION & DÉVELOPPEMENT SUR-MESURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic max-w-3xl mx-auto leading-tight">
            Vous Avez un Projet d'Application Mobile, Web ou Logiciel SaaS ?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Notre filiale spécialisée <strong className="text-white">YOU KNOW TECH</strong> conçoit et développe vos applications sur-mesure : applications mobiles Android / iOS, logiciels SaaS métiers, plateformes universitaires et solutions d'intelligence artificielle.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-amber-600/30 flex items-center gap-2"
            >
              <span>Demander un Devis Gratuit</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all"
            >
              <span>Voir Tous nos Services</span>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
