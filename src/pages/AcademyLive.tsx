import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, Users, ShieldCheck, Radio, Calendar, 
  ArrowLeft, Clock, Award, Sparkles, CheckCircle2, User,
  Tv, LogOut, Info, Send, Hand, Maximize, MessageSquare,
  Settings, ExternalLink, RefreshCw, LayoutGrid, MonitorPlay, Crown
} from 'lucide-react';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface WebinarDetails {
  id: number | string;
  title: string;
  room_name: string;
  description: string;
  trainer: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isHost?: boolean;
}

export default function AcademyLive() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const webinarId = id || searchParams.get('id') || 'open-room';
  const isOpenRoom = webinarId === 'open-room' || searchParams.get('open') === 'true';
  const isHost = searchParams.get('host') === 'true' || localStorage.getItem('yk_admin_auth') === 'true';

  const [webinar, setWebinar] = useState<WebinarDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Engine Mode: 'youknow_live' (WebRTC Native Propriétaire) or 'jitsi' (Jitsi IFrame API)
  const [engineMode, setEngineMode] = useState<'youknow_live' | 'jitsi'>('youknow_live');

  // Participant User details
  const [displayName, setDisplayName] = useState(() => localStorage.getItem('yk_live_name') || (isHost ? 'Feus YOU KNOW (Hôte)' : (isOpenRoom ? 'Participant Invité' : '')));
  const [displayEmail, setDisplayEmail] = useState(() => localStorage.getItem('yk_live_email') || (isHost ? 'contact@youknow.click' : ''));
  const [isJoined, setIsJoined] = useState(isHost || isOpenRoom || !!localStorage.getItem('yk_live_name'));

  // YOU KNOW LIVE WebRTC States
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat');
  const [viewLayout, setViewLayout] = useState<'speaker' | 'grid'>('speaker');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Système YOU KNOW',
      text: 'Bienvenue dans le studio YOU KNOW ACADEMY LIVE ! Le direct est ouvert.',
      time: '16:00',
      isHost: true
    },
    {
      id: '2',
      sender: 'Feus YOU KNOW',
      text: 'Bonjour à tous ! Posez vos questions ici pendant la présentation.',
      time: '16:02',
      isHost: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Jitsi & Room Stats
  const [jitsiServer, setJitsiServer] = useState('meet.jit.si');
  const [activeParticipantsCount, setActiveParticipantsCount] = useState(1);
  const [participantIdInDb, setParticipantIdInDb] = useState<number | null>(null);
  const [jitsiApi, setJitsiApi] = useState<any>(null);

  // Refs for HTML5 Video elements
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fetch Webinar Metadata
  useEffect(() => {
    fetchWebinarData();
  }, [webinarId]);

  const fetchWebinarData = async () => {
    if (webinarId === 'open-room' || webinarId === 'permanent') {
      setWebinar({
        id: 'open-room',
        title: "Studio Permanent 24/7 - Salle Libre YOU KNOW ACADEMY",
        room_name: "youknow-studio-libre-permanent",
        description: "Webinaire en accès libre et permanent 24h/24 & 7j/7, sans aucune restriction. Échangez en direct avec la communauté.",
        trainer: "YOU KNOW SOCIETY (Accès Libre)",
        date: "Accessible 24h/24 & 7j/7",
        start_time: "En continu",
        end_time: "Toujours Ouvert",
        status: "EN DIRECT 24/7"
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/webinars/${webinarId}`);
      if (res.ok) {
        const data = await res.json();
        setWebinar(data);
      }
    } catch (e) {
      console.error('Error fetching webinar details:', e);
    } finally {
      setLoading(false);
    }
  };

  // Initialize WebRTC for YOU KNOW LIVE Mode
  useEffect(() => {
    if (isJoined && engineMode === 'youknow_live') {
      initWebRTC();
    } else {
      stopWebRTC();
    }

    return () => {
      stopWebRTC();
    };
  }, [isJoined, engineMode]);

  // Sync user camera stream to video element
  useEffect(() => {
    if (userVideoRef.current && mediaStream && !isCameraOff) {
      userVideoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, isCameraOff, engineMode]);

  // Sync screen share stream
  useEffect(() => {
    if (screenVideoRef.current && screenStream && isScreenSharing) {
      screenVideoRef.current.srcObject = screenStream;
    }
  }, [screenStream, isScreenSharing, engineMode]);

  const initWebRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setIsCameraOff(false);
      setIsMuted(false);
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
      logParticipantJoin();
    } catch (err) {
      console.warn('Webcam or Microphone not available or permission denied:', err);
      // Fallback audio only or mock stream
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMediaStream(audioStream);
        setIsCameraOff(true);
        setIsMuted(false);
      } catch (e2) {
        setIsCameraOff(true);
        setIsMuted(true);
      }
      logParticipantJoin();
    }
  };

  const stopWebRTC = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
  };

  const toggleMute = () => {
    if (mediaStream) {
      const nextMuted = !isMuted;
      mediaStream.getAudioTracks().forEach(track => {
        track.enabled = !nextMuted;
      });
      setIsMuted(nextMuted);
    }
  };

  const toggleCamera = () => {
    if (mediaStream) {
      const nextCameraOff = !isCameraOff;
      mediaStream.getVideoTracks().forEach(track => {
        track.enabled = !nextCameraOff;
      });
      setIsCameraOff(nextCameraOff);
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStream) {
        screenStream.getTracks().forEach(t => t.stop());
        setScreenStream(null);
      }
      setIsScreenSharing(false);
    } else {
      try {
        const sStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setScreenStream(sStream);
        setIsScreenSharing(true);
        sStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          setScreenStream(null);
        };
      } catch (e) {
        console.warn('Screen share canceled or failed:', e);
      }
    }
  };

  const logParticipantJoin = async () => {
    try {
      const res = await fetch(`/api/webinars/${webinarId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'yk-user-' + Date.now(),
          user_name: displayName || 'Participant YOU KNOW',
          user_email: displayEmail || ''
        })
      });
      if (res.ok) {
        const data = await res.json();
        setParticipantIdInDb(data.participant_id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: displayName || 'Participant',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHost: isHost
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  // Load Jitsi External API if user switches engine mode to Jitsi
  useEffect(() => {
    if (!isJoined || engineMode !== 'jitsi') return;

    const scriptId = 'jitsi-external-api-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const onScriptLoaded = () => {
      setTimeout(() => {
        initJitsi();
      }, 300);
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://${jitsiServer}/external_api.js`;
      script.async = true;
      script.onload = onScriptLoaded;
      document.body.appendChild(script);
    } else {
      if (window.JitsiMeetExternalAPI) {
        onScriptLoaded();
      } else {
        script.onload = onScriptLoaded;
      }
    }

    return () => {
      if (jitsiApi) {
        try { jitsiApi.dispose(); } catch (err) { console.warn(err); }
      }
    };
  }, [isJoined, engineMode, jitsiServer]);

  const initJitsi = () => {
    if (!containerRef.current || !window.JitsiMeetExternalAPI) return;
    containerRef.current.innerHTML = '';

    const roomName = webinar?.room_name || `webinaire-yk-${webinarId}`;
    const options = {
      roomName: roomName,
      width: '100%',
      height: 680,
      parentNode: containerRef.current,
      userInfo: {
        displayName: displayName || 'Participant YOU KNOW',
        email: displayEmail || 'participant@youknow.click'
      },
      configOverwrite: {
        prejoinPageEnabled: false,
        enableWelcomePage: false,
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        disableDeepLinking: true,
        enableLobby: false
      }
    };

    try {
      const api = new window.JitsiMeetExternalAPI(jitsiServer, options);
      setJitsiApi(api);
    } catch (e) {
      console.error('Error starting Jitsi:', e);
    }
  };

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName) return;
    localStorage.setItem('yk_live_name', displayName);
    localStorage.setItem('yk_live_email', displayEmail);
    setIsJoined(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
            Chargement du Studio YOU KNOW ACADEMY LIVE...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                YK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-lg text-slate-900 tracking-tight">
                    YOU KNOW <span className="text-blue-600">ACADEMY LIVE</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold uppercase">
                    {engineMode === 'youknow_live' ? 'MOTEUR PROPRIÉTAIRE' : 'JITSI ENGINE'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block font-medium">
                  Plateforme officielle de webinaires et de formations en ligne.
                </p>
              </div>
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-red-50 border border-red-200 text-red-700 rounded-full text-xs font-mono font-bold">
              <Radio size={14} className="text-red-600 animate-pulse" />
              <span>EN DIRECT</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-xs font-mono font-bold">
              <Users size={14} />
              <span>{activeParticipantsCount + (engineMode === 'youknow_live' ? 3 : 0)} en ligne</span>
            </div>

            <Link
              to="/events"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Quitter</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Webinar Metadata Banner */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
                <Calendar size={14} />
                <span>{webinar?.date || 'Séance en direct'} • {webinar?.start_time || '16:00 GMT'}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                {webinar?.title || 'Webinaire Officiel YOU KNOW ACADEMY'}
              </h1>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                {webinar?.description || 'Formations en ligne et démonstrations technologiques animées par YOU KNOW SOCIETY.'}
              </p>
            </div>

            <div className="shrink-0 p-4 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                <User size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{webinar?.trainer || 'Feus YOU KNOW'}</div>
                <div className="text-[11px] text-blue-700 font-mono">Formateur Principal YOU KNOW</div>
              </div>
            </div>
          </div>

          {/* Prompt Form if not joined */}
          {!isJoined ? (
            <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 p-8 rounded-3xl shadow-xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <Tv size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-slate-900">Accéder à la Séance Live</h3>
                <p className="text-xs text-slate-500">
                  Saisissez votre nom pour rejoindre directement la visioconférence YOU KNOW ACADEMY LIVE.
                </p>
              </div>

              <form onSubmit={handleStartSession} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold font-mono text-slate-700 uppercase">Votre Nom complet</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mamadou Diallo"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold font-mono text-slate-700 uppercase">Adresse E-mail (optionnel)</label>
                  <input
                    type="email"
                    placeholder="Ex: m.diallo@entreprise.sn"
                    value={displayEmail}
                    onChange={e => setDisplayEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video size={18} />
                  <span>Rejoindre le Studio en Direct</span>
                </button>
              </form>
            </div>
          ) : (
            /* Active Live Video Engine */
            <div className="space-y-4">
              
              {/* Engine Switcher Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 uppercase font-mono">Moteur Visioconférence :</span>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setEngineMode('youknow_live')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        engineMode === 'youknow_live'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles size={14} />
                      <span>YOU KNOW LIVE (Propriétaire WebRTC)</span>
                    </button>

                    <button
                      onClick={() => setEngineMode('jitsi')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        engineMode === 'jitsi'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Video size={14} />
                      <span>Serveur Jitsi Meet</span>
                    </button>
                  </div>
                </div>

                {engineMode === 'jitsi' && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Si l'iframe Jitsi est bloqué par le navigateur :</span>
                    <a
                      href={`https://${jitsiServer}/${webinar?.room_name || 'webinaire-youknow'}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-1 shadow-xs"
                    >
                      <span>Ouvrir sur Jitsi Direct</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>

              {/* ENGINE 1: YOU KNOW LIVE PROPRIÉTAIRE (WebRTC Native) */}
              {engineMode === 'youknow_live' ? (
                <div className="grid lg:grid-cols-4 gap-6">
                  
                  {/* Left Main Video Presentation Area (3 columns) */}
                  <div className="lg:col-span-3 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between min-h-[640px] relative">
                    
                    {/* Top Overlay Badge */}
                    <div className="p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent z-10">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                          <Crown size={12} className="text-amber-300" />
                          <span>STUDIO YOU KNOW LIVE</span>
                        </div>
                        {isScreenSharing && (
                          <div className="px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5">
                            <MonitorPlay size={12} />
                            <span>PARTAGE D'ÉCRAN ACTIF</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                        <Clock size={14} className="text-blue-400" />
                        <span>HD 1080p • Direct</span>
                      </div>
                    </div>

                    {/* Middle Stage Content */}
                    <div className="flex-1 flex items-center justify-center p-4 relative">
                      
                      {/* Screen share stream or Main Trainer Stream */}
                      {isScreenSharing ? (
                        <div className="w-full h-full max-h-[500px] bg-black rounded-2xl overflow-hidden relative border border-slate-700">
                          <video
                            ref={screenVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-white font-mono font-bold">
                            Écran de {displayName}
                          </div>
                        </div>
                      ) : (
                        /* Main Presentation View */
                        <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
                          
                          {/* Presenter Avatar or Camera */}
                          {!isCameraOff && mediaStream ? (
                            <div className="w-full max-w-2xl h-[420px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
                              <video
                                ref={userVideoRef}
                                autoPlay
                                playsInline
                                muted={isMuted}
                                className="w-full h-full object-cover transform -scale-x-100"
                              />
                              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-white font-mono font-bold flex items-center gap-2 border border-slate-700">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>{displayName} (Vous - Présentateur)</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-24 h-24 rounded-full bg-blue-600/20 border-2 border-blue-500 text-blue-400 flex items-center justify-center mx-auto text-2xl font-black shadow-xl">
                                YK
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-xl font-bold text-white font-display">
                                  {webinar?.trainer || 'Feus YOU KNOW'}
                                </h3>
                                <p className="text-xs text-slate-400 max-w-md mx-auto">
                                  En direct depuis YOU KNOW ACADEMY LIVE. Activer votre caméra ou micro pour interagir.
                                </p>
                              </div>
                            </div>
                          )}

                        </div>
                      )}

                      {/* Floating Participant Mirror Thumb (if camera is ON during screen share) */}
                      {isScreenSharing && !isCameraOff && (
                        <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-950 rounded-2xl border-2 border-blue-500 overflow-hidden shadow-2xl">
                          <video
                            ref={userVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover transform -scale-x-100"
                          />
                        </div>
                      )}

                    </div>

                    {/* Bottom Floating Control Toolbar */}
                    <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 z-10">
                      
                      {/* Left Controls: Mic & Camera */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleMute}
                          className={`p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            isMuted 
                              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                              : 'bg-slate-800 hover:bg-slate-700 text-white'
                          }`}
                          title={isMuted ? 'Activer le micro' : 'Couper le micro'}
                        >
                          {isMuted ? <MicOff size={18} /> : <Mic size={18} className="text-emerald-400" />}
                          <span className="hidden sm:inline">{isMuted ? 'Micro coupé' : 'Micro actif'}</span>
                        </button>

                        <button
                          onClick={toggleCamera}
                          className={`p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            isCameraOff 
                              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                              : 'bg-slate-800 hover:bg-slate-700 text-white'
                          }`}
                          title={isCameraOff ? 'Activer la caméra' : 'Désactiver la caméra'}
                        >
                          {isCameraOff ? <VideoOff size={18} /> : <Video size={18} className="text-blue-400" />}
                          <span className="hidden sm:inline">{isCameraOff ? 'Caméra off' : 'Caméra on'}</span>
                        </button>
                      </div>

                      {/* Center Controls: Screen share & Raise hand */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleScreenShare}
                          className={`p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            isScreenSharing 
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20' 
                              : 'bg-blue-600 hover:bg-blue-500 text-white'
                          }`}
                        >
                          <Monitor size={18} />
                          <span className="hidden sm:inline">{isScreenSharing ? 'Arrêter le partage' : 'Partager mon écran'}</span>
                        </button>

                        <button
                          onClick={() => setIsHandRaised(!isHandRaised)}
                          className={`p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            isHandRaised
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : 'bg-slate-800 hover:bg-slate-700 text-white'
                          }`}
                        >
                          <Hand size={18} className={isHandRaised ? 'text-slate-950' : 'text-amber-400'} />
                          <span className="hidden md:inline">{isHandRaised ? 'Main levée !' : 'Lever la main'}</span>
                        </button>
                      </div>

                      {/* Right Control: Leave */}
                      <div>
                        <Link
                          to="/events"
                          className="px-5 py-3 rounded-2xl bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          <span>Quitter</span>
                        </Link>
                      </div>

                    </div>

                  </div>

                  {/* Right Sidebar: Live Chat & Participants (1 column) */}
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[640px]">
                    
                    {/* Sidebar Tabs Header */}
                    <div className="flex border-b border-slate-200 bg-slate-50">
                      <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                          activeTab === 'chat'
                            ? 'border-blue-600 text-blue-600 bg-white'
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <MessageSquare size={16} />
                        <span>Chat Live</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('participants')}
                        className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                          activeTab === 'participants'
                            ? 'border-blue-600 text-blue-600 bg-white'
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Users size={16} />
                        <span>Participants (4)</span>
                      </button>
                    </div>

                    {/* Chat Tab Body */}
                    {activeTab === 'chat' ? (
                      <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
                        
                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                          {messages.map(msg => (
                            <div key={msg.id} className="space-y-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className={`font-bold ${msg.isHost ? 'text-blue-700' : 'text-slate-900'}`}>
                                  {msg.sender} {msg.isHost && '★ Hôte'}
                                </span>
                                <span className="text-slate-400 font-mono">{msg.time}</span>
                              </div>
                              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                                msg.isHost 
                                  ? 'bg-blue-50 border border-blue-100 text-slate-800' 
                                  : 'bg-slate-100 text-slate-800'
                              }`}>
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Send Message Input */}
                        <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-200 flex gap-2">
                          <input
                            type="text"
                            placeholder="Écrire un message..."
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                          />
                          <button
                            type="submit"
                            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md"
                          >
                            <Send size={16} />
                          </button>
                        </form>

                      </div>
                    ) : (
                      /* Participants Tab Body */
                      <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                              FY
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">Feus YOU KNOW</div>
                              <div className="text-[10px] text-blue-700 font-mono">Formateur & Hôte</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center">
                              {displayName.slice(0, 2).toUpperCase() || 'MO'}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">{displayName} (Vous)</div>
                              <div className="text-[10px] text-slate-500 font-mono">Participant Connecté</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                              AD
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">Awa Diop</div>
                              <div className="text-[10px] text-slate-500 font-mono">Développeur Web</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                              SK
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">Samba Kane</div>
                              <div className="text-[10px] text-slate-500 font-mono">Etudiant ACADEMY</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              ) : (
                /* ENGINE 2: JITSI MEET ENGINE */
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl space-y-2 p-2">
                  <div 
                    id="jitsi-container" 
                    ref={containerRef} 
                    className="w-full h-[680px] bg-slate-900 rounded-2xl overflow-hidden relative"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-mono">Connexion au serveur Jitsi Meet...</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Footer Features Info */}
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-3">
              <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Caméra & Micro en Direct</h4>
                <p className="text-[11px] text-slate-500">Interagissez avec le formateur et les autres membres.</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-3">
              <Sparkles size={20} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Partage d'Écran HD</h4>
                <p className="text-[11px] text-slate-500">Suivez les démonstrations de code, IA & SASTOCK.</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-3">
              <Award size={20} className="text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">YOU KNOW ACADEMY</h4>
                <p className="text-[11px] text-slate-500">Attestation & Suivi personnalisé à la clé.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 font-mono">
        YOU KNOW SOCIETY © 2026 • YOU KNOW ACADEMY LIVE • Where Knowledge Meets Innovation
      </footer>

    </div>
  );
}
