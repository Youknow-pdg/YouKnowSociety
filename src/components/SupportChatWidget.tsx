import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, CheckCircle2, AlertCircle, Phone, Mail, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  timestamp: string;
  meta?: string;
}

const INQUIRY_TOPICS = [
  { id: 'support', label: 'Support technique' },
  { id: 'sastock', label: 'SASTOCK' },
  { id: 'formation', label: 'Academy / Formation' },
  { id: 'devis', label: 'Projet & Devis' },
] as const;

function formatTime(): string {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<'support' | 'sastock' | 'formation' | 'devis'>('support');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasIdentified, setHasIdentified] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'support',
      text: 'Bonjour ! Vous avez une question ou besoin d’assistance ? Écrivez directement à l’équipe support de YOU KNOW SOCIETY.',
      timestamp: formatTime(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMsg('Veuillez renseigner votre nom, votre e-mail et votre message.');
      return;
    }

    setIsSubmitting(true);
    const topicLabel = INQUIRY_TOPICS.find((t) => t.id === topic)?.label || 'Support';

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: topic,
          name: trimmedName,
          email: trimmedEmail,
          phone: phone.trim(),
          subject: `[Chat Support · ${topicLabel}] ${trimmedName}`,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Impossible d’envoyer le message pour le moment.');
      }

      const now = formatTime();
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: trimmedMessage,
          timestamp: now,
          meta: topicLabel,
        },
        {
          id: `support-${Date.now() + 1}`,
          sender: 'support',
          text: `Merci ${trimmedName}. Votre demande a bien été transmise à notre équipe support. Nous vous répondrons très rapidement à ${trimmedEmail}.`,
          timestamp: now,
        },
      ]);

      setHasIdentified(true);
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetIdentity = () => {
    setHasIdentified(false);
    setErrorMsg(null);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Chat avec l'équipe support"
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[min(600px,calc(100vh-6.5rem))] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <h2 className="text-sm font-display font-bold leading-tight truncate">
                  Support YOU KNOW SOCIETY
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 truncate">
                  Assistance directe par message
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer la fenêtre de support"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 custom-scrollbar min-h-[160px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.meta && (
                    <span className="text-[11px] font-medium text-slate-500 mb-1 px-1">
                      {msg.meta}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-xs'
                    }`}
                  >
                    {msg.sender === 'support' && msg.id !== 'welcome' && (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1 text-xs">
                        <CheckCircle2 size={14} className="shrink-0" />
                        <span>Demande enregistrée</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 px-1 tabular-nums">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Inquiry Composer Form */}
            <form onSubmit={handleSubmit} className="p-3.5 bg-white border-t border-slate-200 space-y-2.5 shrink-0">
              {/* Topic Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {INQUIRY_TOPICS.map((item) => {
                  const active = topic === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTopic(item.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {!hasIdentified ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom *"
                      aria-label="Votre nom"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Téléphone (optionnel)"
                      aria-label="Téléphone"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail *"
                    aria-label="Votre adresse e-mail"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <span className="truncate">
                    Envoyé en tant que <strong className="text-slate-900">{name}</strong> ({email})
                  </span>
                  <button
                    type="button"
                    onClick={handleResetIdentity}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Modifier</span>
                  </button>
                </div>
              )}

              {errorMsg && (
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-end gap-2">
                <textarea
                  rows={2}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as unknown as FormEvent);
                    }
                  }}
                  placeholder="Écrivez votre question ou demande..."
                  aria-label="Votre message au support"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Envoyer le message"
                  className="h-11 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? '...' : 'Envoyer'}</span>
                </button>
              </div>

              {/* Direct fallback channels */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <a
                  href="https://wa.me/221702007285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <Phone size={12} />
                  <span>WhatsApp direct</span>
                </a>
                <a
                  href="mailto:contact@youknow.click"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-700 font-medium"
                >
                  <Mail size={12} />
                  <span>contact@youknow.click</span>
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Fermer le support' : 'Contacter le support'}
        aria-expanded={isOpen}
        className="h-13 px-4 sm:px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-transform duration-150 active:scale-95 cursor-pointer border border-blue-500"
      >
        {isOpen ? (
          <X size={20} className="shrink-0" />
        ) : (
          <>
            <MessageSquare size={20} className="shrink-0" />
            <span className="text-xs font-semibold whitespace-nowrap">Support</span>
          </>
        )}
      </button>
    </div>
  );
}
