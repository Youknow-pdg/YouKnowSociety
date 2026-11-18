import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, PlusCircle, Search, ThumbsUp, Eye, MessageCircle, 
  Database, User, ShieldCheck, Pin, ArrowLeft, Send, Sparkles, 
  X, CheckCircle2, Clock, Globe
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Topic {
  id: number;
  category_id: string;
  title: string;
  content: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  views: number;
  likes: number;
  is_pinned: number;
  created_at: string;
  reply_count?: number;
}

interface Reply {
  id: number;
  topic_id: number;
  content: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  likes: number;
  created_at: string;
}

export default function Forum() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; loading: boolean }>({ connected: false, loading: true });

  // Modal states
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [activeReplies, setActiveReplies] = useState<Reply[]>([]);
  const [loadingTopic, setLoadingTopic] = useState(false);

  // Form states
  const [newTopicData, setNewTopicData] = useState({
    category_id: 'general',
    title: '',
    content: '',
    author_name: '',
    author_role: 'Membre Communauté'
  });

  const [newReplyContent, setNewReplyContent] = useState('');
  const [replyAuthorName, setReplyAuthorName] = useState('');
  const [replyAuthorRole, setReplyAuthorRole] = useState('Membre Communauté');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Fetch health & db status
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setDbStatus({ connected: !!data.dbConnected, loading: false });
      })
      .catch(() => {
        setDbStatus({ connected: false, loading: false });
      });
  }, []);

  // Fetch Categories
  useEffect(() => {
    fetch('/api/forum/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch Topics
  const loadTopics = () => {
    const url = selectedCategory === 'all' 
      ? '/api/forum/topics' 
      : `/api/forum/topics?category=${selectedCategory}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setTopics(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadTopics();
  }, [selectedCategory]);

  // Load single topic detail
  const openTopicDetail = (id: number) => {
    setSelectedTopicId(id);
    setLoadingTopic(true);
    fetch(`/api/forum/topics/${id}`)
      .then(res => res.json())
      .then(data => {
        setActiveTopic(data.topic);
        setActiveReplies(data.replies || []);
        setLoadingTopic(false);
        // Refresh topic list view count
        loadTopics();
      })
      .catch(err => {
        console.error(err);
        setLoadingTopic(false);
      });
  };

  // Submit new topic
  const handleCreateTopic = (e: FormEvent) => {
    e.preventDefault();
    if (!newTopicData.title || !newTopicData.content || !newTopicData.author_name) return;

    fetch('/api/forum/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTopicData)
    })
      .then(res => res.json())
      .then(() => {
        setCreatedSuccess(true);
        setTimeout(() => {
          setIsNewTopicOpen(false);
          setCreatedSuccess(false);
          setNewTopicData({
            category_id: 'general',
            title: '',
            content: '',
            author_name: '',
            author_role: 'Membre Communauté'
          });
          loadTopics();
        }, 1200);
      })
      .catch(err => console.error(err));
  };

  // Submit Reply
  const handleCreateReply = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId || !newReplyContent || !replyAuthorName) return;

    setSubmittingReply(true);
    fetch(`/api/forum/topics/${selectedTopicId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: newReplyContent,
        author_name: replyAuthorName,
        author_role: replyAuthorRole
      })
    })
      .then(res => res.json())
      .then(() => {
        setNewReplyContent('');
        setSubmittingReply(false);
        // Reload detail
        openTopicDetail(selectedTopicId);
      })
      .catch(err => {
        console.error(err);
        setSubmittingReply(false);
      });
  };

  // Like topic
  const handleLikeTopic = (id: number) => {
    fetch(`/api/forum/topics/${id}/like`, { method: 'POST' })
      .then(res => res.json())
      .then(() => {
        if (activeTopic && activeTopic.id === id) {
          setActiveTopic({ ...activeTopic, likes: activeTopic.likes + 1 });
        }
        setTopics(topics.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
      });
  };

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.author_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="pb-32 bg-slate-50 text-slate-900 min-h-screen">
      {/* Forum Header */}
      <section className="py-16 lg:py-24 border-b border-slate-200 relative technical-grid overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-xs font-mono font-bold uppercase tracking-widest">
                <MessageSquare size={14} /> LE GRAND FORUM YOU KNOW SOCIETY
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
                Espace d'Échange <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">& Discussion Ouvert</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Posez vos questions, partagez vos projets, discutez avec nos experts et apprenez aux côtés de toute la communauté de YOU KNOW SOCIETY.
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une discussion, un sujet, un auteur..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
              />
            </div>

            {/* New Topic Button */}
            <button
              onClick={() => setIsNewTopicOpen(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle size={18} /> Lancer un Nouveau Sujet
            </button>
          </div>
        </div>
      </section>

      {/* Main Forum View */}
      <section className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-12 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              Catégories de Forum
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Toutes les Discussions</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold">{topics.length}</span>
              </button>

              {categories.map((cat) => {
                const count = topics.filter(t => t.category_id === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold shrink-0">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-200 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <ShieldCheck size={18} className="text-blue-700" /> Charte de la Communauté
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Respectez tous les membres, restez poli et partagez vos connaissances dans l'esprit de YOU KNOW SOCIETY : <em>Where Knowledge Meets Innovation</em>.
            </p>
          </div>
        </div>

        {/* Topics List */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">
              {filteredTopics.length} Sujet(s) trouvé(s)
            </span>
            <Link to="/community" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <ArrowLeft size={14} /> Retour à la Communauté
            </Link>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-4">
              <MessageCircle size={40} className="mx-auto text-slate-300" />
              <p className="text-sm text-slate-600 font-medium">Aucun sujet trouvé dans cette catégorie.</p>
              <button
                onClick={() => setIsNewTopicOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-blue-700 transition-all"
              >
                <PlusCircle size={16} /> Soyez le premier à publier !
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg rounded-3xl transition-all cursor-pointer space-y-4 group"
                  onClick={() => openTopicDetail(topic.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {topic.is_pinned === 1 && (
                          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 rounded-full text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                            <Pin size={10} /> Épinglé
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-[10px] font-mono font-bold uppercase">
                          {categories.find(c => c.id === topic.category_id)?.name || topic.category_id}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-700 transition-colors">
                        {topic.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500 text-xs shrink-0">
                      <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                        <MessageCircle size={14} className="text-blue-600" /> {topic.reply_count || 0}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                        <Eye size={14} className="text-indigo-600" /> {topic.views}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {topic.content}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={topic.author_avatar} alt={topic.author_name} className="w-8 h-8 rounded-full border border-slate-200" />
                      <div>
                        <span className="font-bold text-slate-900 block">{topic.author_name}</span>
                        <span className="text-[10px] text-blue-700 font-mono font-bold">{topic.author_role}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-500 text-xs">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLikeTopic(topic.id); }}
                        className="flex items-center gap-1 hover:text-blue-600 font-bold transition-colors"
                      >
                        <ThumbsUp size={14} /> {topic.likes}
                      </button>
                      <span className="text-[11px] font-mono">{formatDate(topic.created_at)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TOPIC DETAIL MODAL / DRAWER */}
      <AnimatePresence>
        {selectedTopicId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedTopicId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative my-auto space-y-8"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTopicId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
              >
                <X size={20} />
              </button>

              {loadingTopic || !activeTopic ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs text-slate-500 font-mono">Chargement de la discussion...</p>
                </div>
              ) : (
                <>
                  {/* Topic Header */}
                  <div className="space-y-4 border-b border-slate-200 pb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-[10px] font-mono font-bold uppercase inline-block">
                      {categories.find(c => c.id === activeTopic.category_id)?.name || activeTopic.category_id}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                      {activeTopic.title}
                    </h2>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={activeTopic.author_avatar} alt={activeTopic.author_name} className="w-10 h-10 rounded-full border border-blue-200" />
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">{activeTopic.author_name}</span>
                          <span className="text-xs text-blue-700 font-mono font-bold">{activeTopic.author_role}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-slate-500 font-mono text-xs">
                        <span className="flex items-center gap-1"><Clock size={14} /> {formatDate(activeTopic.created_at)}</span>
                        <span className="flex items-center gap-1"><Eye size={14} /> {activeTopic.views} vues</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-sm leading-relaxed text-slate-800 font-normal whitespace-pre-line">
                    {activeTopic.content}
                  </div>

                  {/* Like Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleLikeTopic(activeTopic.id)}
                      className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm"
                    >
                      <ThumbsUp size={16} /> J'aime ({activeTopic.likes})
                    </button>
                    <span className="text-xs font-bold text-slate-500">
                      {activeReplies.length} Réponse(s)
                    </span>
                  </div>

                  {/* Replies List */}
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <h3 className="text-base font-display font-bold text-slate-900">
                      Discussion & Réponses
                    </h3>

                    {activeReplies.length === 0 ? (
                      <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-2xl text-center">
                        Aucune réponse pour le moment. Soyez le premier à répondre !
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {activeReplies.map((reply) => (
                          <div key={reply.id} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img src={reply.author_avatar} alt={reply.author_name} className="w-8 h-8 rounded-full border border-slate-200" />
                                <div>
                                  <span className="font-bold text-slate-900 block">{reply.author_name}</span>
                                  <span className="text-[10px] text-blue-700 font-mono font-bold">{reply.author_role}</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">{formatDate(reply.created_at)}</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line pl-11">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reply Form */}
                  <div className="pt-6 border-t border-slate-200 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-700 uppercase">
                      Répondre au sujet
                    </h4>
                    <form onSubmit={handleCreateReply} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          required
                          type="text"
                          placeholder="Votre nom complet *"
                          value={replyAuthorName}
                          onChange={e => setReplyAuthorName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                        <select
                          value={replyAuthorRole}
                          onChange={e => setReplyAuthorRole(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                        >
                          <option value="Membre Communauté">Membre Communauté</option>
                          <option value="Apprenant YOU KNOW ACADEMY">Apprenant YOU KNOW ACADEMY</option>
                          <option value="Développeur / Technologue">Développeur / Technologue</option>
                          <option value="Commerçant / Client SASTOCK">Commerçant / Client SASTOCK</option>
                        </select>
                      </div>

                      <textarea
                        required
                        rows={3}
                        placeholder="Rédigez votre réponse ou question ici..."
                        value={newReplyContent}
                        onChange={e => setNewReplyContent(e.target.value)}
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                      />

                      <button
                        type="submit"
                        disabled={submittingReply}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                      >
                        <Send size={16} /> {submittingReply ? "Envoi..." : "Publier ma Réponse"}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW TOPIC MODAL */}
      <AnimatePresence>
        {isNewTopicOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setIsNewTopicOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-2xl p-6 sm:p-10 shadow-2xl relative my-auto space-y-6"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsNewTopicOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
              >
                <X size={20} />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-mono font-bold uppercase">
                  <Sparkles size={14} /> NOUVELLE DISCUSSION
                </div>
                <h2 className="text-2xl font-display font-extrabold text-slate-900">
                  Lancer un Sujet sur le Forum
                </h2>
                <p className="text-xs text-slate-600">
                  Votre message sera visible immédiatement par l'ensemble des membres de la communauté.
                </p>
              </div>

              {createdSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-slate-900">Sujet publié avec succès !</h3>
                  <p className="text-xs text-slate-600">Votre discussion est désormais en ligne.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateTopic} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 uppercase">Catégorie *</label>
                    <select
                      value={newTopicData.category_id}
                      onChange={e => setNewTopicData({ ...newTopicData, category_id: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 uppercase">Titre du sujet *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Question sur l'optimisation des requêtes SQL ou l'utilisation d'IA..."
                      value={newTopicData.title}
                      onChange={e => setNewTopicData({ ...newTopicData, title: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase">Votre Nom *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Cheikh Tidiane"
                        value={newTopicData.author_name}
                        onChange={e => setNewTopicData({ ...newTopicData, author_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase">Votre Rôle / Titre</label>
                      <input
                        type="text"
                        placeholder="Ex: Développeur Web, Apprenant, Entrepreneur..."
                        value={newTopicData.author_role}
                        onChange={e => setNewTopicData({ ...newTopicData, author_role: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-700 uppercase">Contenu du Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Expliquez en détail votre sujet ou votre question..."
                      value={newTopicData.content}
                      onChange={e => setNewTopicData({ ...newTopicData, content: e.target.value })}
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Publier la Discussion
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
