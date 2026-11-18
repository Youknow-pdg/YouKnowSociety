import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, ShieldCheck, LayoutDashboard, FileText, Users, MessageSquare, 
  Search, Filter, CheckCircle, Clock, AlertCircle, Trash2, ExternalLink, 
  Pin, RefreshCw, LogOut, Database, Mail, Phone, Building, Check, Send, 
  Eye, Edit3, ChevronRight, Layers, Sparkles, Inbox, Award, User, Key, Camera, Image, CheckCircle2,
  Radio, Video, Plus, Calendar, Download, Copy, Upload, X, Menu, SlidersHorizontal, ArrowUpRight,
  Smartphone, Tablet, Monitor, HardDrive, FileCheck, FileCode, Archive, Star, Globe, Link2, Tag, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ApplicationItem } from '../types';

interface RequestItem {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: string;
  admin_notes: string;
  created_at: string;
}

interface AdminEventItem {
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

interface CommunityMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest: string;
  created_at: string;
}

interface ForumTopic {
  id: number;
  category_id: string;
  title: string;
  content: string;
  author_name: string;
  author_role: string;
  reply_count?: number;
  views: number;
  likes: number;
  is_pinned: number;
  created_at: string;
}

interface Stats {
  totalRequests: number;
  devisCount: number;
  pendingCount: number;
  forumTopics: number;
  forumReplies: number;
  communityMembers: number;
  dbConnected: boolean;
}

interface AdminProfileData {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop'
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('yk_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Mobile Menu & Modals State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'requests' | 'members' | 'forum' | 'events' | 'apps' | 'profile'>('requests');
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [events, setEvents] = useState<AdminEventItem[]>([]);

  // APK Management State
  const [apkStatus, setApkStatus] = useState<{
    fileSize: string;
    sizeBytes: number;
    lastModified: string;
    status: string;
  }>({
    fileSize: 'Calcul en cours...',
    sizeBytes: 0,
    lastModified: '',
    status: 'Actif'
  });
  const [adminApkFile, setAdminApkFile] = useState<File | null>(null);
  const [adminApkUploading, setAdminApkUploading] = useState(false);
  const [adminApkMessage, setAdminApkMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [adminApkProgress, setAdminApkProgress] = useState(0);
  const [adminApkDragging, setAdminApkDragging] = useState(false);

  // ZIP DevApp Management State
  const [zipStatus, setZipStatus] = useState<{
    fileSize: string;
    sizeBytes: number;
    lastModified: string;
    status: string;
  }>({
    fileSize: 'Calcul en cours...',
    sizeBytes: 0,
    lastModified: '',
    status: 'Actif'
  });
  const [adminZipFile, setAdminZipFile] = useState<File | null>(null);
  const [adminZipUploading, setAdminZipUploading] = useState(false);
  const [adminZipMessage, setAdminZipMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [adminZipProgress, setAdminZipProgress] = useState(0);
  const [adminZipDragging, setAdminZipDragging] = useState(false);

  // Application Management State (CRUD)
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [appFilterType, setAppFilterType] = useState<'all' | 'file' | 'link'>('all');

  // Add / Edit Application Modal State
  const [showAppModal, setShowAppModal] = useState(false);
  const [editingApp, setEditingApp] = useState<ApplicationItem | null>(null);
  const [appFormType, setAppFormType] = useState<'link' | 'file'>('file');
  const [appFormName, setAppFormName] = useState('');
  const [appFormSubtitle, setAppFormSubtitle] = useState('');
  const [appFormCategory, setAppFormCategory] = useState('Développement & Outils');
  const [appFormSubsidiary, setAppFormSubsidiary] = useState('YOU KNOW TECH');
  const [appFormPlatform, setAppFormPlatform] = useState('Archive ZIP / DevApp');
  const [appFormUrl, setAppFormUrl] = useState('');
  const [appFormIsIframePreviewable, setAppFormIsIframePreviewable] = useState(true);
  const [appFormFileUrl, setAppFormFileUrl] = useState('/YOUKNOW-DevApp.zip');
  const [appFormFileName, setAppFormFileName] = useState('YOUKNOW-DevApp.zip');
  const [appFormFileSize, setAppFormFileSize] = useState('45.8 Mo');
  const [appFormSizeBytes, setAppFormSizeBytes] = useState(48025600);
  const [appFormTargetAudience, setAppFormTargetAudience] = useState('');
  const [appFormDescription, setAppFormDescription] = useState('');
  const [appFormHighlights, setAppFormHighlights] = useState('');
  const [appFormTechStack, setAppFormTechStack] = useState('');
  const [appFormStatus, setAppFormStatus] = useState('Opérationnel');
  const [appFormBadgeText, setAppFormBadgeText] = useState('Package Officiel');
  const [appFormIsSpotlight, setAppFormIsSpotlight] = useState(false);
  const [appFormGradient, setAppFormGradient] = useState('from-amber-600 to-amber-950');

  // File upload state within App Modal
  const [newAppUploadFile, setNewAppUploadFile] = useState<File | null>(null);
  const [newAppUploading, setNewAppUploading] = useState(false);
  const [newAppUploadProgress, setNewAppUploadProgress] = useState(0);
  const [newAppDragging, setNewAppDragging] = useState(false);

  // App Modal Feedback
  const [appFormError, setAppFormError] = useState<string | null>(null);
  const [appFormSuccess, setAppFormSuccess] = useState<string | null>(null);
  const [isSavingApp, setIsSavingApp] = useState(false);

  // Delete App Modal
  const [deleteAppTarget, setDeleteAppTarget] = useState<ApplicationItem | null>(null);
  const [isDeletingApp, setIsDeletingApp] = useState(false);

  // Admin Live Preview Modal State
  const [adminPreviewApp, setAdminPreviewApp] = useState<ApplicationItem | null>(null);
  const [adminPreviewViewport, setAdminPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [adminUseProxy, setAdminUseProxy] = useState<boolean>(true);
  const [adminIframeKey, setAdminIframeKey] = useState<number>(0);
  const [adminIframeLoading, setAdminIframeLoading] = useState<boolean>(true);

  const getAdminHeaders = (extra: Record<string, string> = {}): Record<string, string> => {
    const token = localStorage.getItem('yk_admin_token');
    return token ? { Authorization: `Bearer ${token}`, ...extra } : { ...extra };
  };

  const fetchApplicationsList = async () => {
    setLoadingApps(true);
    try {
      const res = await fetch('/api/applications');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setApplications(data);
      }
    } catch (err) {
      console.error('Error loading applications list:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  const handleOpenAddAppModal = (type: 'file' | 'link' = 'file') => {
    setEditingApp(null);
    setAppFormType(type);
    setAppFormName('');
    setAppFormSubtitle(type === 'file' ? 'Kit Téléchargeable & Application' : 'Application Web / SaaS Interactive');
    setAppFormCategory(type === 'file' ? 'Développement & Outils' : 'Commerce & Entreprise');
    setAppFormSubsidiary('YOU KNOW TECH');
    setAppFormPlatform(type === 'file' ? 'Archive ZIP / APK' : 'Web / PWA / SaaS');
    setAppFormUrl('');
    setAppFormIsIframePreviewable(true);
    setAppFormFileUrl('');
    setAppFormFileName('');
    setAppFormFileSize('');
    setAppFormSizeBytes(0);
    setAppFormTargetAudience('Professionnels, Entreprises, Étudiants & Particuliers');
    setAppFormDescription('');
    setAppFormHighlights('Solution performante et sécurisée\nInterface utilisateur soignée et intuitive\nConforme aux standards YOU KNOW SOCIETY');
    setAppFormTechStack(type === 'file' ? 'Android APK, ZIP, TypeScript' : 'React, TypeScript, Tailwind CSS, Cloud API');
    setAppFormStatus('Opérationnel');
    setAppFormBadgeText(type === 'file' ? 'Package Téléchargeable' : 'Application En Ligne');
    setAppFormIsSpotlight(false);
    setAppFormGradient(type === 'file' ? 'from-amber-600 to-amber-950' : 'from-indigo-600 to-slate-950');
    setNewAppUploadFile(null);
    setAppFormError(null);
    setAppFormSuccess(null);
    setShowAppModal(true);
  };

  const handleOpenEditAppModal = (app: ApplicationItem) => {
    setEditingApp(app);
    setAppFormType(app.appType);
    setAppFormName(app.name);
    setAppFormSubtitle(app.subtitle || '');
    setAppFormCategory(app.category || 'Digital & Tech');
    setAppFormSubsidiary(app.subsidiary || 'YOU KNOW TECH');
    setAppFormPlatform(app.platform || (app.appType === 'file' ? 'Archive ZIP' : 'Web SaaS'));
    setAppFormUrl(app.url || '');
    setAppFormIsIframePreviewable(app.isIframePreviewable ?? true);
    setAppFormFileUrl(app.fileUrl || '');
    setAppFormFileName(app.fileName || '');
    setAppFormFileSize(app.fileSize || '');
    setAppFormSizeBytes(app.sizeBytes || 0);
    setAppFormTargetAudience(app.targetAudience || '');
    setAppFormDescription(app.description || '');
    setAppFormHighlights(Array.isArray(app.highlights) ? app.highlights.join('\n') : '');
    setAppFormTechStack(Array.isArray(app.techStack) ? app.techStack.join(', ') : '');
    setAppFormStatus(app.status || 'Opérationnel');
    setAppFormBadgeText(app.badgeText || '');
    setAppFormIsSpotlight(Boolean(app.isSpotlight));
    setAppFormGradient(app.imagePlaceholderGradient || 'from-indigo-600 to-slate-950');
    setNewAppUploadFile(null);
    setAppFormError(null);
    setAppFormSuccess(null);
    setShowAppModal(true);
  };

  const handleUploadAppDedicatedFile = async (file: File) => {
    setNewAppUploading(true);
    setNewAppUploadProgress(20);
    setAppFormError(null);
    setAppFormSuccess(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      setNewAppUploadProgress(55);
      const res = await fetch('/api/admin/applications/upload-file', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: formData
      });
      setNewAppUploadProgress(95);
      const data = await res.json();
      if (res.ok && data.success) {
        setNewAppUploadProgress(100);
        setAppFormFileUrl(data.fileUrl);
        setAppFormFileName(data.fileName);
        setAppFormFileSize(data.fileSize);
        setAppFormSizeBytes(data.sizeBytes || 0);
        setAppFormSuccess(`Fichier "${data.fileName}" (${data.fileSize}) téléversé avec succès !`);
      } else {
        throw new Error(data.error || 'Erreur lors du téléversement');
      }
    } catch (err: any) {
      setAppFormError(err.message || 'Erreur lors de l\'envoi du fichier');
    } finally {
      setNewAppUploading(false);
    }
  };

  const handleSaveApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appFormName.trim()) {
      setAppFormError('Le nom de l\'application est obligatoire.');
      return;
    }
    if (!appFormDescription.trim()) {
      setAppFormError('La description est obligatoire.');
      return;
    }
    if (appFormType === 'link' && !appFormUrl.trim()) {
      setAppFormError('L\'adresse URL du lien est obligatoire.');
      return;
    }
    if (appFormType === 'file' && !appFormFileUrl.trim() && !newAppUploadFile) {
      setAppFormError('Veuillez téléverser un fichier ou renseigner son URL / chemin.');
      return;
    }

    setIsSavingApp(true);
    setAppFormError(null);

    try {
      const highlightsArray = appFormHighlights
        .split('\n')
        .map(h => h.trim())
        .filter(h => h.length > 0);

      const techStackArray = appFormTechStack
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const payload = {
        name: appFormName.trim(),
        subtitle: appFormSubtitle.trim(),
        category: appFormCategory.trim(),
        subsidiary: appFormSubsidiary.trim(),
        appType: appFormType,
        platform: appFormPlatform.trim(),
        url: appFormType === 'link' ? appFormUrl.trim() : undefined,
        isIframePreviewable: appFormType === 'link' ? appFormIsIframePreviewable : false,
        fileUrl: appFormType === 'file' ? appFormFileUrl.trim() : undefined,
        fileName: appFormType === 'file' ? (appFormFileName.trim() || 'app-package.zip') : undefined,
        fileSize: appFormType === 'file' ? (appFormFileSize.trim() || 'Fichier') : undefined,
        sizeBytes: appFormType === 'file' ? appFormSizeBytes : undefined,
        targetAudience: appFormTargetAudience.trim(),
        description: appFormDescription.trim(),
        highlights: highlightsArray,
        techStack: techStackArray,
        status: appFormStatus.trim(),
        badgeText: appFormBadgeText.trim(),
        isSpotlight: appFormIsSpotlight,
        imagePlaceholderGradient: appFormGradient
      };

      const url = editingApp ? `/api/admin/applications/${editingApp.id}` : '/api/admin/applications';
      const method = editingApp ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCopyToast(editingApp ? `"${appFormName}" mise à jour !` : `"${appFormName}" ajoutée avec succès !`);
        setTimeout(() => setCopyToast(''), 3000);
        setShowAppModal(false);
        fetchApplicationsList();
      } else {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }
    } catch (err: any) {
      setAppFormError(err.message || 'Erreur lors de la sauvegarde de l\'application');
    } finally {
      setIsSavingApp(false);
    }
  };

  const handleDeleteApplication = async (app: ApplicationItem) => {
    setIsDeletingApp(true);
    try {
      const res = await fetch(`/api/admin/applications/${app.id}`, { method: 'DELETE', headers: getAdminHeaders() });
      const data = await res.json();
      if (res.ok && data.success) {
        setCopyToast(`Application "${app.name}" supprimée !`);
        setTimeout(() => setCopyToast(''), 3000);
        setDeleteAppTarget(null);
        fetchApplicationsList();
      } else {
        alert(data.error || 'Erreur lors de la suppression');
      }
    } catch (err) {
      alert('Erreur serveur lors de la suppression');
    } finally {
      setIsDeletingApp(false);
    }
  };

  const handleToggleSpotlight = async (app: ApplicationItem) => {
    try {
      const res = await fetch(`/api/admin/applications/${app.id}`, {
        method: 'PUT',
        headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ isSpotlight: !app.isSpotlight })
      });
      if (res.ok) {
        setCopyToast(app.isSpotlight ? `"${app.name}" n'est plus en vedette` : `"${app.name}" est maintenant en vedette !`);
        setTimeout(() => setCopyToast(''), 3000);
        fetchApplicationsList();
      }
    } catch (e) {}
  };

  const fetchAdminApkStatus = async () => {
    try {
      const res = await fetch('/api/apk-status');
      if (res.ok) {
        const data = await res.json();
        setApkStatus({
          fileSize: data.fileSize || 'APK Android',
          sizeBytes: data.sizeBytes || 0,
          lastModified: data.lastModified || '',
          status: data.status || 'Opérationnel'
        });
      }
    } catch (err) {
      console.error('Error fetching APK status in Admin:', err);
    }
  };

  const fetchAdminZipStatus = async () => {
    try {
      const res = await fetch('/api/zip-status');
      if (res.ok) {
        const data = await res.json();
        setZipStatus({
          fileSize: data.fileSize || 'Archive ZIP',
          sizeBytes: data.sizeBytes || 0,
          lastModified: data.lastModified || '',
          status: data.status || 'Opérationnel'
        });
      }
    } catch (err) {
      console.error('Error fetching ZIP status in Admin:', err);
    }
  };

  const handleAdminApkUpload = async () => {
    if (!adminApkFile) {
      setAdminApkMessage({ type: 'error', text: 'Veuillez sélectionner un fichier .apk' });
      return;
    }
    if (!adminApkFile.name.toLowerCase().endsWith('.apk')) {
      setAdminApkMessage({ type: 'error', text: 'Le fichier doit être au format .apk' });
      return;
    }

    setAdminApkUploading(true);
    setAdminApkMessage(null);
    setAdminApkProgress(25);

    try {
      const formData = new FormData();
      formData.append('apk', adminApkFile);
      setAdminApkProgress(60);

      const res = await fetch('/api/upload-apk', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: formData
      });
      setAdminApkProgress(95);

      const data = await res.json();
      if (res.ok && data.success) {
        setAdminApkProgress(100);
        setAdminApkMessage({
          type: 'success',
          text: `Fichier base.apk mis à jour avec succès (${data.fileSize}) !`
        });
        setAdminApkFile(null);
        fetchAdminApkStatus();
      } else {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }
    } catch (err: any) {
      setAdminApkMessage({
        type: 'error',
        text: err.message || 'Erreur lors du téléversement du fichier APK'
      });
    } finally {
      setAdminApkUploading(false);
    }
  };

  const handleAdminZipUpload = async () => {
    if (!adminZipFile) {
      setAdminZipMessage({ type: 'error', text: 'Veuillez sélectionner un fichier .zip' });
      return;
    }
    if (!adminZipFile.name.toLowerCase().endsWith('.zip')) {
      setAdminZipMessage({ type: 'error', text: 'Le fichier doit être au format .zip' });
      return;
    }

    setAdminZipUploading(true);
    setAdminZipMessage(null);
    setAdminZipProgress(25);

    try {
      const formData = new FormData();
      formData.append('zip', adminZipFile);
      setAdminZipProgress(60);

      const res = await fetch('/api/upload-zip', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: formData
      });
      setAdminZipProgress(95);

      const data = await res.json();
      if (res.ok && data.success) {
        setAdminZipProgress(100);
        setAdminZipMessage({
          type: 'success',
          text: `Fichier YOUKNOW-DevApp.zip mis à jour avec succès (${data.fileSize}) !`
        });
        setAdminZipFile(null);
        fetchAdminZipStatus();
      } else {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }
    } catch (err: any) {
      setAdminZipMessage({
        type: 'error',
        text: err.message || 'Erreur lors du téléversement du fichier ZIP'
      });
    } finally {
      setAdminZipUploading(false);
    }
  };

  // Create Event Form state
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventCategory, setEventCategory] = useState('Webinaire IA & Tech');
  const [eventDate, setEventDate] = useState('Prochainement');
  const [eventTime, setEventTime] = useState('16:00 GMT');
  const [eventSpeaker, setEventSpeaker] = useState('Feus YOU KNOW');
  const [eventSpeakerRole, setEventSpeakerRole] = useState('Fondateur & Visionnaire YOU KNOW SOCIETY');
  const [eventStatus, setEventStatus] = useState<'LIVE' | 'UPCOMING' | 'ENDED'>('UPCOMING');
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    devisCount: 0,
    pendingCount: 0,
    forumTopics: 0,
    forumReplies: 0,
    communityMembers: 0,
    dbConnected: true
  });
  const [loading, setLoading] = useState(false);

  // Admin Profile & Settings State
  const [profile, setProfile] = useState<AdminProfileData>({
    name: 'Feus YOU KNOW',
    role: 'Fondateur & Administrateur Système',
    email: 'contact@youknow.click',
    phone: '+221 70 200 72 85',
    avatar: PRESET_AVATARS[0]
  });

  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAvatar, setFormAvatar] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Filters & Selection
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [copyToast, setCopyToast] = useState('');

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('yk_admin_auth', 'true');
        if (data.token) localStorage.setItem('yk_admin_token', data.token);
        if (data.profile) {
          setProfile(data.profile);
          populateForm(data.profile);
        }
        fetchDashboardData();
      } else {
        setAuthError(data.error || 'Code d\'accès incorrect');
      }
    } catch (err) {
      setAuthError('Erreur de connexion au serveur admin.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem('yk_admin_auth');
    localStorage.removeItem('yk_admin_token');
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
  };

  const populateForm = (p: AdminProfileData) => {
    setFormName(p.name || '');
    setFormRole(p.role || '');
    setFormEmail(p.email || '');
    setFormPhone(p.phone || '');
    setFormAvatar(p.avatar || PRESET_AVATARS[0]);
  };

  // Fetch all data + admin profile
  const fetchDashboardData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const token = localStorage.getItem('yk_admin_token');
      const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
      const [statsRes, reqsRes, memsRes, forumRes, eventsRes, profileRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: authHeaders }),
        fetch(`/api/admin/requests?type=${typeFilter}&status=${statusFilter}`, { headers: authHeaders }),
        fetch('/api/admin/community', { headers: authHeaders }),
        fetch('/api/forum/topics'),
        fetch('/api/events'),
        fetch('/api/admin/profile', { headers: authHeaders })
      ]);

      if (statsRes.status === 401 || profileRes.status === 401) {
        await handleLogout();
        return;
      }

      fetchAdminApkStatus();
      fetchAdminZipStatus();
      fetchApplicationsList();

      if (statsRes.ok) setStats(await statsRes.json());
      if (reqsRes.ok) setRequests(await reqsRes.json());
      if (memsRes.ok) setMembers(await memsRes.json());
      if (forumRes.ok) setTopics(await forumRes.json());
      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (profileRes.ok) {
        const p = await profileRes.json();
        setProfile(p);
        populateForm(p);
      }
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  // Create New Event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDesc) return;
    setCreatingEvent(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: eventTitle,
          description: eventDesc,
          category: eventCategory,
          event_date: eventDate,
          event_time: eventTime,
          speaker: eventSpeaker,
          speaker_role: eventSpeakerRole,
          status: eventStatus
        })
      });
      if (res.ok) {
        setEventTitle('');
        setEventDesc('');
        setShowNewEventForm(false);
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error creating event:', err);
    } finally {
      setCreatingEvent(false);
    }
  };

  // Update Event Status
  const handleUpdateEventStatus = async (eventId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error('Error updating event status:', err);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement / webinaire ?')) return;
    try {
      const res = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // Immediate initial fetch
    fetchDashboardData(false);

    // Auto-refresh every 3 seconds for instant real-time updates
    const interval = setInterval(() => {
      fetchDashboardData(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated, typeFilter, statusFilter]);

  // Update Request
  const handleUpdateRequest = async (id: number, newStatus?: string, newNotes?: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/requests/${id}`, {
        method: 'PUT',
        headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          status: newStatus,
          admin_notes: newNotes !== undefined ? newNotes : (selectedRequest?.id === id ? editingNotes : undefined)
        })
      });

      if (res.ok) {
        fetchDashboardData();
        if (selectedRequest && selectedRequest.id === id) {
          setSelectedRequest(prev => prev ? {
            ...prev,
            status: newStatus || prev.status,
            admin_notes: newNotes !== undefined ? newNotes : editingNotes
          } : null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Request
  const handleDeleteRequest = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement cette demande ?')) return;
    try {
      const res = await fetch(`/api/admin/requests/${id}`, { method: 'DELETE', headers: getAdminHeaders() });
      if (res.ok) {
        if (selectedRequest?.id === id) setSelectedRequest(null);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Forum Topic
  const handleDeleteTopic = async (id: number) => {
    if (!confirm('Supprimer ce sujet du forum ainsi que ses réponses ?')) return;
    try {
      const res = await fetch(`/api/admin/forum/topics/${id}`, { method: 'DELETE', headers: getAdminHeaders() });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Pin Topic
  const handleTogglePin = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/forum/topics/${id}/pin`, { method: 'PUT', headers: getAdminHeaders() });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Save Profile & Password Update
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccessMsg('');
    setProfileErrorMsg('');

    if (newPassword && newPassword !== confirmPassword) {
      setProfileErrorMsg('Le nouveau mot de passe et sa confirmation ne correspondent pas.');
      setSavingProfile(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          name: formName,
          role: formRole,
          email: formEmail,
          phone: formPhone,
          avatar: formAvatar,
          passcode: newPassword ? newPassword : undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.profile);
        setProfileSuccessMsg(data.message || 'Profil et mot de passe mis à jour avec succès !');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setProfileErrorMsg(data.error || 'Erreur lors de la mise à jour du profil.');
      }
    } catch (err) {
      setProfileErrorMsg('Erreur de connexion au serveur.');
    } finally {
      setSavingProfile(false);
    }
  };

  // Filter requests locally by search
  const filteredRequests = requests.filter(r => {
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.company && r.company.toLowerCase().includes(q)) ||
      (r.subject && r.subject.toLowerCase().includes(q)) ||
      (r.message && r.message.toLowerCase().includes(q))
    );
  });

  const exportRequestsCSV = () => {
    if (filteredRequests.length === 0) return;
    const headers = ['ID', 'Type', 'Nom', 'Email', 'Téléphone', 'Entreprise', 'Sujet', 'Message', 'Statut', 'Date'];
    const rows = filteredRequests.map(r => [
      r.id,
      `"${r.type.replace(/"/g, '""')}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.company || '').replace(/"/g, '""')}"`,
      `"${(r.subject || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${r.status.replace(/"/g, '""')}"`,
      `"${new Date(r.created_at).toLocaleString('fr-FR')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `youknow_demandes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadDbBackup = async () => {
    try {
      const res = await fetch('/api/admin/backup', { headers: getAdminHeaders() });
      const data = await res.json();
      const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", jsonStr);
      downloadAnchor.setAttribute("download", `youknow_sauvegarde_bdd_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setCopyToast('Sauvegarde BDD téléchargée !');
      setTimeout(() => setCopyToast(''), 3000);
    } catch (err) {
      alert('Erreur lors du téléchargement de la sauvegarde');
    }
  };

  const restoreDbBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const res = await fetch('/api/admin/backup/restore', {
          method: 'POST',
          headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(parsed)
        });
        if (res.ok) {
          alert('✓ Base de données restaurée avec succès !');
          fetchDashboardData();
        } else {
          alert('Erreur lors de la restauration');
        }
      } catch (err) {
        alert('Fichier JSON invalide pour la restauration');
      }
    };
    reader.readAsText(file);
  };

  // Render Login Card if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
        {/* Architectural Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-600/10 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck size={36} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 font-bold">
                YOU KNOW SOCIETY
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase italic mt-1">
                Espace Admin
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Plateforme de gestion & contrôle d'administration système.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">
                Code Secret d'Accès
              </label>
              <div className="relative">
                <input 
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono text-center tracking-widest text-lg"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-medium">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.25em] rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {authLoading ? 'Vérification...' : 'Déverrouiller le Panneau Admin'}
              <ChevronRight size={16} />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-500">
              Where Knowledge Meets Innovation.
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {copyToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-mono text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-2"
          >
            <CheckCircle size={16} />
            <span>{copyToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Top Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Profile & Identity */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => setActiveTab('profile')}>
              <img 
                src={profile.avatar} 
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border-2 border-blue-500 shadow-md transition-all group-hover:scale-105"
              />
              <span className="w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full absolute -bottom-0.5 -right-0.5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-black tracking-tight text-white uppercase italic">
                  {profile.name}
                </span>
                <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase hidden sm:inline-block">
                  {profile.role}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                <span className="hidden md:inline">{profile.email}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" /> 
                  Sync Live (3s)
                </span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Quick Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={downloadDbBackup}
              className="px-3.5 py-2.5 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-800/80 text-cyan-300 rounded-xl transition-all text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer"
              title="Télécharger une sauvegarde JSON de la base de données"
            >
              <Database size={14} />
              <span>Sauvegarder BDD</span>
            </button>

            <label
              className="px-3.5 py-2.5 bg-purple-950/80 hover:bg-purple-900/80 border border-purple-800/80 text-purple-300 rounded-xl transition-all text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer"
              title="Restaurer la base de données depuis un JSON"
            >
              <Upload size={14} />
              <span>Restaurer BDD</span>
              <input type="file" accept=".json" onChange={restoreDbBackup} className="hidden" />
            </label>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2.5 rounded-xl transition-all border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <User size={15} />
              <span>Profil & Pass</span>
            </button>

            <button
              onClick={() => fetchDashboardData()}
              disabled={loading}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700 flex items-center gap-2 text-xs font-mono cursor-pointer"
              title="Rafraîchir les données"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-blue-400' : ''} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-red-400 rounded-xl transition-all text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={14} />
              <span>Déconnexion</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => fetchDashboardData()}
              disabled={loading}
              className="p-2.5 bg-slate-800 text-slate-300 rounded-xl border border-slate-700"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin text-blue-400' : ''} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-3 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                <button
                  onClick={() => {
                    downloadDbBackup();
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 rounded-xl flex items-center justify-center gap-2"
                >
                  <Database size={14} />
                  <span>Sauvegarder BDD</span>
                </button>

                <label className="p-3 bg-purple-950/80 border border-purple-800/80 text-purple-300 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                  <Upload size={14} />
                  <span>Restaurer BDD</span>
                  <input type="file" accept=".json" onChange={(e) => { restoreDbBackup(e); setMobileMenuOpen(false); }} className="hidden" />
                </label>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2"
                >
                  <User size={14} />
                  <span>Profil & Pass</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="py-2.5 px-4 bg-red-950/60 text-red-400 font-bold text-xs rounded-xl border border-red-800/60 flex items-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Déconnexion</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Real-time KPI Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div 
            onClick={() => setActiveTab('requests')}
            className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl cursor-pointer hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-center justify-between text-blue-400 mb-1.5">
              <Inbox size={18} />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">TOTAL</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{stats.totalRequests}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Demandes & Devis</div>
          </div>

          <div 
            onClick={() => setActiveTab('requests')}
            className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-center justify-between text-purple-400 mb-1.5">
              <FileText size={18} />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">DEVIS</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{stats.devisCount}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Devis Spécifiques</div>
          </div>

          <div 
            onClick={() => setActiveTab('requests')}
            className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl cursor-pointer hover:border-amber-500/50 transition-all"
          >
            <div className="flex items-center justify-between text-amber-400 mb-1.5">
              <Clock size={18} />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">ACTION</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">{stats.pendingCount}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">En attente</div>
          </div>

          <div 
            onClick={() => setActiveTab('members')}
            className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl cursor-pointer hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-center justify-between text-emerald-400 mb-1.5">
              <Users size={18} />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">RÉSEAU</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{stats.communityMembers}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Membres Adhérents</div>
          </div>

          <div 
            onClick={() => setActiveTab('forum')}
            className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center justify-between text-indigo-400 mb-1.5">
              <MessageSquare size={18} />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">FORUM</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{stats.forumTopics}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Sujets Ouverts</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-cyan-400 mb-1.5">
              <Database size={18} />
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">BDD</span>
            </div>
            <div className="text-xs font-bold font-mono text-emerald-400 truncate">Aiven Cloud</div>
            <div className="text-[10px] text-slate-500 mt-0.5 truncate">MySQL Actif</div>
          </div>
        </div>

        {/* Tab Selection Navigation Bar */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => { setActiveTab('requests'); setSelectedRequest(null); }}
            className={`px-4 sm:px-5 py-3 rounded-t-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 shrink-0 cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-slate-900 border-blue-500 text-blue-400 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <Inbox size={16} />
            <span>Devis & Demandes ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 sm:px-5 py-3 rounded-t-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 shrink-0 cursor-pointer ${
              activeTab === 'members'
                ? 'bg-slate-900 border-emerald-500 text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <Users size={16} />
            <span>Adhérents ({members.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('forum')}
            className={`px-4 sm:px-5 py-3 rounded-t-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 shrink-0 cursor-pointer ${
              activeTab === 'forum'
                ? 'bg-slate-900 border-indigo-500 text-indigo-400 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <MessageSquare size={16} />
            <span>Forum ({topics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 sm:px-5 py-3 rounded-t-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 shrink-0 cursor-pointer ${
              activeTab === 'events'
                ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <Radio size={16} className="text-red-500 animate-pulse" />
            <span>Webinaires ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('apps')}
            className={`px-4 sm:px-5 py-3 rounded-t-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 shrink-0 cursor-pointer ${
              activeTab === 'apps'
                ? 'bg-slate-900 border-purple-500 text-purple-400 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <Smartphone size={16} />
            <span>Apps & APK ({apkStatus.fileSize})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 sm:px-5 py-3 rounded-t-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 shrink-0 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-slate-900 border-cyan-500 text-cyan-400 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <User size={16} />
            <span>Profil & Sécurité</span>
          </button>
        </div>

        {/* TAB 1: Requests & Devis */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Rechercher nom, email, entreprise, sujet..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-medium"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="flex-1 sm:flex-none bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-mono"
                >
                  <option value="all">Tous les types</option>
                  <option value="devis">Devis uniquement</option>
                  <option value="demande">Demandes générales</option>
                  <option value="sastock">SASTOCK Demo</option>
                  <option value="formation">YOU KNOW ACADEMY</option>
                  <option value="support">Support IT</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="flex-1 sm:flex-none bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-mono"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="En attente">En attente</option>
                  <option value="En traitement">En traitement</option>
                  <option value="Traité">Traité</option>
                  <option value="Archivé">Archivé</option>
                </select>

                <button
                  onClick={exportRequestsCSV}
                  disabled={filteredRequests.length === 0}
                  className="px-3.5 py-2.5 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-800/80 text-emerald-400 font-mono text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Télécharger la liste sous format CSV"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">CSV</span>
                </button>
              </div>
            </div>

            {/* Requests Table / Cards */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className={`${selectedRequest ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all space-y-3`}>
                {filteredRequests.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 space-y-3">
                    <Inbox size={40} className="mx-auto text-slate-600" />
                    <p className="text-sm font-bold">Aucune demande correspondant à vos critères.</p>
                  </div>
                ) : (
                  filteredRequests.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedRequest(item);
                        setEditingNotes(item.admin_notes || '');
                      }}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer bg-slate-900 hover:bg-slate-850 ${
                        selectedRequest?.id === item.id 
                          ? 'border-blue-500 shadow-md ring-1 ring-blue-500' 
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[9px] font-mono uppercase font-black px-2 py-0.5 rounded-full border ${
                              item.type === 'devis' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                              item.type === 'sastock' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                              item.type === 'formation' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                              'bg-blue-500/10 border-blue-500/30 text-blue-400'
                            }`}>
                              {item.type.toUpperCase()}
                            </span>

                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              item.status === 'En attente' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              item.status === 'En traitement' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                              item.status === 'Traité' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {item.status}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                          <p className="text-xs text-slate-400 font-mono flex items-center gap-2 truncate">
                            <span className="truncate">{item.email}</span>
                            {item.company && <span className="text-slate-500 shrink-0">• {item.company}</span>}
                          </p>
                          <p className="text-xs text-slate-300 line-clamp-1">{item.subject}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-500 font-mono block">
                            {new Date(item.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Selected Request Detail Panel */}
              {selectedRequest && (
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-24 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                        MESSAGE #{selectedRequest.id}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-white">{selectedRequest.name}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedRequest(null)}
                      className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between gap-2 text-slate-300">
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail size={15} className="text-blue-400 shrink-0" />
                        <a href={`mailto:${selectedRequest.email}?subject=Suite%20%C3%A0%20votre%20demande%20-%20YOU%20KNOW%20SOCIETY`} className="hover:underline font-mono truncate">{selectedRequest.email}</a>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedRequest.email);
                          setCopyToast('Email copié !');
                          setTimeout(() => setCopyToast(''), 2000);
                        }}
                        className="text-slate-500 hover:text-slate-300 p-1 shrink-0"
                        title="Copier l'email"
                      >
                        <Copy size={13} />
                      </button>
                    </div>

                    {selectedRequest.phone && (
                      <div className="flex items-center justify-between gap-2 text-slate-300">
                        <div className="flex items-center gap-2">
                          <Phone size={15} className="text-emerald-400 shrink-0" />
                          <a href={`tel:${selectedRequest.phone}`} className="font-mono text-emerald-400 hover:underline">{selectedRequest.phone}</a>
                        </div>
                        <a
                          href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${selectedRequest.name}, suite à votre demande concernant "${selectedRequest.subject}" auprès de YOU KNOW SOCIETY...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 shrink-0"
                        >
                          WhatsApp <ExternalLink size={10} />
                        </a>
                      </div>
                    )}

                    {selectedRequest.company && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Building size={15} className="text-amber-400 shrink-0" />
                        <span className="truncate">{selectedRequest.company}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Objet / Sujet</h4>
                    <p className="text-xs font-bold text-white bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {selectedRequest.subject}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Message Complet</h4>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto font-sans">
                      {selectedRequest.message}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Mise à jour du Statut</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['En attente', 'En traitement', 'Traité', 'Archivé'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateRequest(selectedRequest.id, st)}
                          disabled={updatingId === selectedRequest.id}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border font-mono cursor-pointer ${
                            selectedRequest.status === st 
                              ? 'bg-blue-600 text-white border-blue-500 shadow-sm' 
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Notes Interne Admin</h4>
                    <textarea
                      rows={3}
                      placeholder="Ajouter une note de suivi interne..."
                      value={editingNotes}
                      onChange={e => setEditingNotes(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-sans resize-none"
                    />
                    <button
                      onClick={() => handleUpdateRequest(selectedRequest.id, undefined, editingNotes)}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-slate-200 transition-all border border-slate-700 cursor-pointer"
                    >
                      Enregistrer la Note
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleDeleteRequest(selectedRequest.id)}
                      className="w-full py-2.5 bg-red-950/60 hover:bg-red-900/60 text-red-400 text-xs font-bold rounded-xl border border-red-800/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 size={14} /> Supprimer cette demande
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Community Members */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">Adhérents à la Communauté YOU KNOW</h2>
                <span className="text-xs font-mono text-slate-400">{members.length} membres enregistrés</span>
              </div>

              {/* Mobile Member Cards */}
              <div className="grid sm:hidden gap-3">
                {members.length === 0 ? (
                  <p className="p-6 text-center text-slate-500 font-mono text-xs">Aucun membre pour le moment.</p>
                ) : (
                  members.map(m => (
                    <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{m.name}</span>
                        <span className="font-mono text-[10px] text-slate-500">#{m.id}</span>
                      </div>
                      <div className="font-mono text-blue-400">
                        <a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a>
                      </div>
                      {m.phone && (
                        <div className="font-mono text-emerald-400">
                          <a href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            <Phone size={12} /> {m.phone} <ExternalLink size={10} />
                          </a>
                        </div>
                      )}
                      <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800 flex justify-between">
                        <span>{m.interest || 'Membre Général'}</span>
                        <span className="font-mono">{new Date(m.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop Member Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-widest border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">ID</th>
                      <th className="p-3.5">Nom Complet</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Téléphone</th>
                      <th className="p-3.5">Intérêts</th>
                      <th className="p-3.5">Date Inscription</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {members.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                          Aucun membre enregistré pour le moment.
                        </td>
                      </tr>
                    ) : (
                      members.map(m => (
                        <tr key={m.id} className="hover:bg-slate-850 transition-colors">
                          <td className="p-3.5 font-mono text-slate-500">#{m.id}</td>
                          <td className="p-3.5 font-bold text-white">{m.name}</td>
                          <td className="p-3.5 font-mono text-blue-400">
                            <a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a>
                          </td>
                          <td className="p-3.5 font-mono text-emerald-400">
                            {m.phone ? (
                              <a href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                {m.phone} <ExternalLink size={10} />
                              </a>
                            ) : '-'}
                          </td>
                          <td className="p-3.5 text-slate-300">{m.interest || 'Membre Général'}</td>
                          <td className="p-3.5 font-mono text-slate-500">
                            {new Date(m.created_at).toLocaleDateString('fr-FR')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Forum Moderation */}
        {activeTab === 'forum' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl">
              <h2 className="text-base sm:text-lg font-bold text-white">Sujets du Forum & Modération</h2>
              <div className="space-y-3">
                {topics.map(t => (
                  <div key={t.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {t.is_pinned === 1 && (
                          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <Pin size={10} /> ÉPINGLÉ
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{t.category_id}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-tight">{t.title}</h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Par {t.author_name} • {t.reply_count || 0} réponses • {t.views} vues
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleTogglePin(t.id)}
                        className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                          t.is_pinned 
                            ? 'bg-amber-950 text-amber-300 border-amber-800' 
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                        title="Épingler / Désépingler"
                      >
                        <Pin size={14} />
                      </button>

                      <button
                        onClick={() => handleDeleteTopic(t.id)}
                        className="p-2.5 bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-800/60 rounded-xl transition-all cursor-pointer"
                        title="Supprimer le sujet"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Events & Webinar Management */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Radio size={16} className="text-red-500 animate-pulse" />
                  <span>Gestion des Webinaires & Conférences Live</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Programmez des séances vidéo interactives et modérez les accès.
                </p>
              </div>

              <button
                onClick={() => setShowNewEventForm(!showNewEventForm)}
                className="w-full sm:w-auto px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                <span>{showNewEventForm ? 'Fermer' : 'Créer un Webinaire'}</span>
              </button>
            </div>

            {/* Create Event Form */}
            {showNewEventForm && (
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCreateEvent}
                className="bg-slate-900 border border-amber-500/40 p-5 sm:p-6 rounded-3xl space-y-4 shadow-xl relative"
              >
                <div className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-2">
                  <Calendar size={16} /> Nouveau Webinaire YOU KNOW STUDIO
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Titre de la Séance</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Conférence IA: Automatisation des processus d'entreprise au Sénégal"
                      value={eventTitle}
                      onChange={e => setEventTitle(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Description Détaillée</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Résumer l'objectif et les démonstrations en direct..."
                      value={eventDesc}
                      onChange={e => setEventDesc(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Catégorie</label>
                    <select
                      value={eventCategory}
                      onChange={e => setEventCategory(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value="Webinaire IA & Tech">Webinaire IA & Tech</option>
                      <option value="Atelier Pratique">Atelier Pratique</option>
                      <option value="Démo Produit SASTOCK">Démo Produit SASTOCK</option>
                      <option value="YOU KNOW ACADEMY">YOU KNOW ACADEMY</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Statut Initial</label>
                    <select
                      value={eventStatus}
                      onChange={e => setEventStatus(e.target.value as any)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value="UPCOMING">A VENIR (Planifié)</option>
                      <option value="LIVE">EN DIRECT (Lancer maintenant)</option>
                      <option value="ENDED">TERMINÉ (Archive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Date estimée</label>
                    <input
                      type="text"
                      placeholder="Ex: Samedi 15 Mars 2026"
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Heure de début</label>
                    <input
                      type="text"
                      placeholder="Ex: 16:00 GMT"
                      value={eventTime}
                      onChange={e => setEventTime(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Animateur / Speaker</label>
                    <input
                      type="text"
                      value={eventSpeaker}
                      onChange={e => setEventSpeaker(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Rôle de l'Animateur</label>
                    <input
                      type="text"
                      value={eventSpeakerRole}
                      onChange={e => setEventSpeakerRole(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={creatingEvent}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check size={16} />
                    <span>{creatingEvent ? 'Publication...' : 'Publier le Webinaire'}</span>
                  </button>
                </div>
              </motion.form>
            )}

            {/* Event Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {events.length === 0 ? (
                <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 space-y-3">
                  <Radio size={40} className="mx-auto text-slate-600" />
                  <p className="text-sm font-bold">Aucun événement configuré.</p>
                </div>
              ) : (
                events.map(ev => (
                  <div key={ev.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                          ev.status === 'LIVE' ? 'bg-red-950 border-red-500 text-red-400 animate-pulse' :
                          ev.status === 'UPCOMING' ? 'bg-amber-950 border-amber-500 text-amber-400' :
                          'bg-slate-800 border-slate-700 text-slate-400'
                        }`}>
                          {ev.status === 'LIVE' ? '🔴 EN DIRECT' : ev.status === 'UPCOMING' ? '⏳ A VENIR' : '🏁 TERMINÉ'}
                        </span>

                        <span className="text-[10px] font-mono text-slate-500">{ev.category}</span>
                      </div>

                      <h4 className="text-base font-bold text-white leading-snug">{ev.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{ev.description}</p>

                      <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs font-mono space-y-1 text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Date:</span>
                          <span className="text-white font-bold">{ev.event_date} à {ev.event_time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Speaker:</span>
                          <span className="text-amber-400 font-bold">{ev.speaker}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                      <Link
                        to={`/webinar/${ev.id}?host=true`}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <Video size={14} />
                        <span>Rejoindre Hôte</span>
                      </Link>

                      <div className="flex items-center gap-1">
                        <select
                          value={ev.status}
                          onChange={e => handleUpdateEventStatus(ev.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-[11px] text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                        >
                          <option value="LIVE">Mettre LIVE</option>
                          <option value="UPCOMING">A venir</option>
                          <option value="ENDED">Terminé</option>
                        </select>

                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="p-2 bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-800/60 rounded-xl transition-all"
                          title="Supprimer l'événement"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB: Applications & APK Management */}
        {activeTab === 'apps' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Layers size={13} />
                  <span>PARC D'APPLICATIONS • FICHIERS & LIENS WEB SAAS</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase italic">
                  Centre de Gestion des Applications
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                  Ajoutez, modifiez ou supprimez des applications de l'écosystème YOU KNOW. Vous pouvez mettre en ligne des <strong className="text-amber-400">fichiers téléchargeables (ZIP, APK, etc.)</strong> ou lier des <strong className="text-blue-400">applications Web / SaaS</strong> avec aperçu interactif.
                </p>
                <div className="flex items-center gap-3 pt-2 flex-wrap">
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg text-xs font-mono font-bold">
                    Total: <strong className="text-white">{applications.length}</strong>
                  </span>
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg text-xs font-mono font-bold">
                    Fichiers: <strong className="text-amber-200">{applications.filter(a => a.appType === 'file').length}</strong>
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-mono font-bold">
                    Web / SaaS: <strong className="text-blue-200">{applications.filter(a => a.appType === 'link').length}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap shrink-0 relative z-10">
                <button
                  onClick={() => handleOpenAddAppModal('file')}
                  className="px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-600/20 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>+ Ajouter un Fichier (ZIP/APK)</span>
                </button>

                <button
                  onClick={() => handleOpenAddAppModal('link')}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>+ Ajouter un Lien Web/SaaS</span>
                </button>

                <Link
                  to="/applications"
                  target="_blank"
                  className="px-3.5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs font-mono rounded-xl transition-all flex items-center gap-1.5"
                  title="Ouvrir la page publique des applications dans un nouvel onglet"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Page Publique</span>
                </Link>

                <button
                  onClick={() => {
                    fetchApplicationsList();
                    fetchAdminZipStatus();
                    fetchAdminApkStatus();
                  }}
                  className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer"
                  title="Actualiser la liste"
                >
                  <RefreshCw size={14} className={loadingApps ? 'animate-spin text-blue-400' : ''} />
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setAppFilterType('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                    appFilterType === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Toutes ({applications.length})
                </button>
                <button
                  onClick={() => setAppFilterType('file')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                    appFilterType === 'file'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  📦 Fichiers ({applications.filter(a => a.appType === 'file').length})
                </button>
                <button
                  onClick={() => setAppFilterType('link')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                    appFilterType === 'link'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  🌐 Liens Web / SaaS ({applications.filter(a => a.appType === 'link').length})
                </button>
              </div>

              <div className="relative w-full md:w-80">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Rechercher une application..."
                  value={appSearchQuery}
                  onChange={e => setAppSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
                {appSearchQuery && (
                  <button
                    onClick={() => setAppSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Applications Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                  Applications Disponibles ({
                    applications.filter(app => {
                      if (appFilterType === 'file' && app.appType !== 'file') return false;
                      if (appFilterType === 'link' && app.appType !== 'link') return false;
                      if (!appSearchQuery.trim()) return true;
                      const q = appSearchQuery.toLowerCase();
                      return (
                        app.name.toLowerCase().includes(q) ||
                        (app.subtitle && app.subtitle.toLowerCase().includes(q)) ||
                        (app.description && app.description.toLowerCase().includes(q)) ||
                        (app.category && app.category.toLowerCase().includes(q)) ||
                        (app.subsidiary && app.subsidiary.toLowerCase().includes(q))
                      );
                    }).length
                  })
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications
                  .filter(app => {
                    if (appFilterType === 'file' && app.appType !== 'file') return false;
                    if (appFilterType === 'link' && app.appType !== 'link') return false;
                    if (!appSearchQuery.trim()) return true;
                    const q = appSearchQuery.toLowerCase();
                    return (
                      app.name.toLowerCase().includes(q) ||
                      (app.subtitle && app.subtitle.toLowerCase().includes(q)) ||
                      (app.description && app.description.toLowerCase().includes(q)) ||
                      (app.category && app.category.toLowerCase().includes(q)) ||
                      (app.subsidiary && app.subsidiary.toLowerCase().includes(q))
                    );
                  })
                  .map((app) => (
                    <div
                      key={app.id}
                      className={`bg-slate-900 border rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group shadow-lg ${
                        app.isSpotlight
                          ? 'border-amber-500/50 shadow-amber-500/10'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Top Visual Banner */}
                      <div className={`h-28 bg-gradient-to-br ${app.imagePlaceholderGradient || 'from-slate-800 to-slate-950'} p-4 relative flex flex-col justify-between`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                            app.appType === 'file'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {app.appType === 'file' ? <Archive size={11} /> : <Globe size={11} />}
                            {app.appType === 'file' ? 'Fichier Téléchargeable' : 'Lien Web / SaaS'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {app.isSpotlight && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px] font-mono flex items-center gap-1 shadow">
                                <Star size={10} className="fill-slate-950" />
                                Vedette
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded bg-slate-950/70 border border-white/10 text-white text-[10px] font-mono">
                              {app.status || 'Actif'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-white/70 uppercase">
                              {app.subsidiary || 'YOU KNOW TECH'}
                            </span>
                            <h4 className="text-lg font-black text-white leading-tight drop-shadow-sm">
                              {app.name}
                            </h4>
                          </div>

                          {app.appType === 'file' && (
                            <span className="text-[11px] font-mono font-bold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-amber-500/30">
                              {app.fileSize || 'Fichier'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2.5">
                          {app.subtitle && (
                            <p className="text-xs font-semibold text-blue-400 font-mono">
                              {app.subtitle}
                            </p>
                          )}
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                            {app.description}
                          </p>

                          {/* Highlights Preview */}
                          {app.highlights && app.highlights.length > 0 && (
                            <div className="pt-2 border-t border-slate-800/80 space-y-1">
                              {app.highlights.slice(0, 2).map((h, i) => (
                                <div key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-tight">
                                  <Check size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="truncate">{h}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tech Stack Badges */}
                          {app.techStack && app.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {app.techStack.slice(0, 3).map((t, i) => (
                                <span key={i} className="text-[9px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded">
                                  {t}
                                </span>
                              ))}
                              {app.techStack.length > 3 && (
                                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-950 text-slate-500 rounded">
                                  +{app.techStack.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Card Actions Toolbar */}
                        <div className="pt-4 border-t border-slate-800 space-y-2.5">
                          {/* Primary Download / Open / Preview Button */}
                          <div className="flex items-center gap-2">
                            {app.appType === 'file' ? (
                              <a
                                href={app.fileUrl || '/YOUKNOW-DevApp.zip'}
                                download={app.fileName || `${app.name}.zip`}
                                className="flex-1 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow"
                              >
                                <Download size={13} />
                                <span>Télécharger ({app.fileSize || 'Fichier'})</span>
                              </a>
                            ) : (
                              <>
                                <a
                                  href={app.url || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow"
                                >
                                  <ExternalLink size={13} />
                                  <span>Ouvrir</span>
                                </a>

                                <button
                                  onClick={() => {
                                    setAdminPreviewApp(app);
                                    setAdminIframeLoading(true);
                                    setAdminIframeKey(k => k + 1);
                                  }}
                                  className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer"
                                  title="Aperçu interactif direct"
                                >
                                  <Eye size={13} />
                                  <span>Aperçu</span>
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => {
                                const targetLink = app.appType === 'file' 
                                  ? (app.fileUrl?.startsWith('http') ? app.fileUrl : window.location.origin + (app.fileUrl || '/YOUKNOW-DevApp.zip'))
                                  : (app.url || '');
                                navigator.clipboard.writeText(targetLink);
                                setCopyToast(`Lien copié : ${app.name}`);
                                setTimeout(() => setCopyToast(''), 2500);
                              }}
                              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition-all cursor-pointer"
                              title="Copier le lien direct"
                            >
                              <Copy size={13} />
                            </button>
                          </div>

                          {/* Admin Controls: Edit, Spotlight, Delete */}
                          <div className="flex items-center justify-between gap-1.5 pt-1">
                            <button
                              onClick={() => handleToggleSpotlight(app)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                app.isSpotlight
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-slate-950 text-slate-400 hover:text-amber-300 border border-slate-800'
                              }`}
                              title="Basculer la mise en vedette"
                            >
                              <Star size={12} className={app.isSpotlight ? 'fill-amber-400 text-amber-400' : ''} />
                              <span>{app.isSpotlight ? 'Vedette' : 'Mettre en vedette'}</span>
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEditAppModal(app)}
                                className="p-1.5 bg-slate-950 hover:bg-slate-800 text-blue-400 border border-slate-800 hover:border-blue-500/40 rounded-lg transition-all cursor-pointer"
                                title="Modifier cette application"
                              >
                                <Edit3 size={13} />
                              </button>

                              <button
                                onClick={() => setDeleteAppTarget(app)}
                                className="p-1.5 bg-slate-950 hover:bg-red-950/60 text-red-400 border border-slate-800 hover:border-red-500/40 rounded-lg transition-all cursor-pointer"
                                title="Supprimer cette application"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {applications.length === 0 && (
                <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                  <Layers size={36} className="text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-400 font-mono">Aucune application enregistrée.</p>
                  <button
                    onClick={() => handleOpenAddAppModal('file')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    + Ajouter la première application
                  </button>
                </div>
              )}
            </div>

            {/* Dedicated Replacement Card for Default Package: YOUKNOW-DevApp.zip */}
            <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-2xl">
                    <FileCode size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-white">Gestionnaire Rapide de l'Archive Globale : YOUKNOW-DevApp.zip</h3>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                        Racine /YOUKNOW-DevApp.zip
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {zipStatus.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Remplacement direct du fichier servi sur <strong className="text-amber-300">/YOUKNOW-DevApp.zip</strong> (contient l'application et ses modules).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href="/YOUKNOW-DevApp.zip"
                    download="YOUKNOW-DevApp.zip"
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-600/20"
                  >
                    <Download size={14} />
                    <span>Télécharger ({zipStatus.fileSize})</span>
                  </a>

                  <button
                    onClick={() => {
                      const fullUrl = window.location.origin + '/YOUKNOW-DevApp.zip';
                      navigator.clipboard.writeText(fullUrl);
                      setCopyToast('Lien ZIP copié !');
                      setTimeout(() => setCopyToast(''), 2500);
                    }}
                    className="px-3.5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy size={14} />
                    <span>{copyToast === 'Lien ZIP copié !' ? 'Copié !' : 'Copier Lien ZIP'}</span>
                  </button>
                </div>
              </div>

              {/* Status & Specs Grid */}
              <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 uppercase text-[10px]">Taille Actuelle sur Serveur</span>
                  <div className="text-base font-bold text-amber-400 flex items-center gap-2">
                    <HardDrive size={16} />
                    <span>{zipStatus.fileSize}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{(zipStatus.sizeBytes / 1024).toFixed(1)} Ko</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 uppercase text-[10px]">Nom du fichier servi</span>
                  <div className="text-base font-bold text-white font-mono">YOUKNOW-DevApp.zip</div>
                  <span className="text-[10px] text-amber-400">Racine publique (/YOUKNOW-DevApp.zip)</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 uppercase text-[10px]">Dernière Modification</span>
                  <div className="text-xs font-bold text-slate-300 truncate">
                    {zipStatus.lastModified ? new Date(zipStatus.lastModified).toLocaleString('fr-FR') : 'Actif'}
                  </div>
                  <span className="text-[10px] text-emerald-400">Prêt pour téléchargement</span>
                </div>
              </div>

              {/* ZIP File Upload & Replacement Area */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                    <Upload size={15} className="text-amber-400" />
                    Téléverser / Remplacer le Fichier YOUKNOW-DevApp.zip
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">Max: 250 Mo • Extension .zip</span>
                </div>

                <div
                  onDragOver={e => {
                    e.preventDefault();
                    setAdminZipDragging(true);
                  }}
                  onDragLeave={() => setAdminZipDragging(false)}
                  onDrop={e => {
                    e.preventDefault();
                    setAdminZipDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const f = e.dataTransfer.files[0];
                      if (f.name.toLowerCase().endsWith('.zip')) {
                        setAdminZipFile(f);
                        setAdminZipMessage(null);
                      } else {
                        setAdminZipMessage({ type: 'error', text: 'Le fichier doit avoir l\'extension .zip' });
                      }
                    }
                  }}
                  onClick={() => document.getElementById('admin-zip-upload-input')?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center space-y-3 transition-all cursor-pointer ${
                    adminZipDragging
                      ? 'border-amber-400 bg-amber-500/10'
                      : adminZipFile
                      ? 'border-emerald-500/50 bg-emerald-500/5'
                      : 'border-slate-800 hover:border-amber-500/40 bg-slate-900/50'
                  }`}
                >
                  <input
                    type="file"
                    id="admin-zip-upload-input"
                    accept=".zip"
                    className="hidden"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setAdminZipFile(e.target.files[0]);
                        setAdminZipMessage(null);
                      }
                    }}
                  />

                  {adminZipFile ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                        <FileCheck size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white font-mono">{adminZipFile.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {(adminZipFile.size / (1024 * 1024)).toFixed(2)} Mo prêt à être mis en ligne
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-400 font-medium underline inline-block">
                        Cliquer pour choisir un autre fichier ZIP
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-amber-600/20 text-amber-400 mx-auto flex items-center justify-center">
                        <Upload size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          Glissez-déposez le nouveau fichier <strong className="text-amber-400 font-mono">YOUKNOW-DevApp.zip</strong> ici
                        </p>
                        <p className="text-[11px] text-slate-400">ou cliquez pour sélectionner depuis votre ordinateur</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Remplacera instantanément l'archive téléchargeable par les utilisateurs</span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {adminZipUploading && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                      <span>Téléversement du fichier ZIP en cours...</span>
                      <span>{adminZipProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${adminZipProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {/* Feedback Message */}
                {adminZipMessage && (
                  <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                    adminZipMessage.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    {adminZipMessage.type === 'success' ? (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span>{adminZipMessage.text}</span>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {adminZipFile && (
                    <button
                      type="button"
                      onClick={() => setAdminZipFile(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAdminZipUpload}
                    disabled={!adminZipFile || adminZipUploading}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                      !adminZipFile || adminZipUploading
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30 cursor-pointer'
                    }`}
                  >
                    {adminZipUploading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        <span>Enregistrer YOUKNOW-DevApp.zip</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Admin Profile & Password Management */}
        {activeTab === 'profile' && (
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Profile Live Card Preview */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl text-center">
              <div className="relative inline-block mx-auto">
                <img 
                  src={formAvatar || profile.avatar} 
                  alt={formName || profile.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-blue-500 shadow-2xl mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-2 rounded-2xl shadow-lg border-2 border-slate-900">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-black text-white">{formName || profile.name}</h2>
                <span className="inline-block mt-1 px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold rounded-full uppercase">
                  {formRole || profile.role}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-400 font-mono text-left bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-400 shrink-0" />
                  <span className="truncate">{formEmail || profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-emerald-400 shrink-0" />
                  <span>{formPhone || profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                  <Lock size={12} className="text-purple-400 shrink-0" />
                  <span>Accès Administrateur Protégé</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950 border border-slate-800 p-3.5 rounded-2xl text-left">
                <p className="font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                  <Sparkles size={13} /> Synchronisation instantanée
                </p>
                Vos modifications sont appliquées immédiatement sur l'ensemble de la console d'administration.
              </div>
            </div>

            {/* Edit Forms Container */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-8 shadow-xl">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <User size={22} className="text-blue-400" />
                  Gestion du Profil Administrateur
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Mettez à jour vos identifiants et votre code d'accès secret.
                </p>
              </div>

              {profileSuccessMsg && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              {profileErrorMsg && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={18} className="shrink-0 text-red-400" />
                  <span>{profileErrorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-8">
                {/* Section 1: Information de Profil */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Edit3 size={14} className="text-blue-400" /> 1. Informations Personnelles & Rôle
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Nom complet
                      </label>
                      <input 
                        type="text"
                        required
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder="Ex: Feus YOU KNOW"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Rôle / Titre
                      </label>
                      <input 
                        type="text"
                        required
                        value={formRole}
                        onChange={e => setFormRole(e.target.value)}
                        placeholder="Ex: Directeur Général & Fondateur"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        E-mail Officiel
                      </label>
                      <input 
                        type="email"
                        required
                        value={formEmail}
                        onChange={e => setFormEmail(e.target.value)}
                        placeholder="Ex: contact@youknow.click"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Téléphone Direct
                      </label>
                      <input 
                        type="text"
                        value={formPhone}
                        onChange={e => setFormPhone(e.target.value)}
                        placeholder="Ex: +221 70 200 72 85"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Photo de Profil & Avatar */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Camera size={14} className="text-purple-400" /> 2. Photo de Profil & Avatars
                  </h3>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                      Lien URL de la Photo
                    </label>
                    <input 
                      type="url"
                      value={formAvatar}
                      onChange={e => setFormAvatar(e.target.value)}
                      placeholder="https://..."
                      className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                      Ou choisir un avatar prédéfini :
                    </span>
                    <div className="flex items-center gap-3 flex-wrap">
                      {PRESET_AVATARS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormAvatar(url)}
                          className={`relative p-1 rounded-2xl border transition-all cursor-pointer ${
                            formAvatar === url 
                              ? 'border-purple-500 bg-purple-500/20 ring-2 ring-purple-500' 
                              : 'border-slate-800 hover:border-slate-600 bg-slate-950'
                          }`}
                        >
                          <img 
                            src={url} 
                            alt={`Avatar preset ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          {formAvatar === url && (
                            <span className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full p-0.5">
                              <Check size={10} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 3: Modification du Mot de Passe */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Key size={14} className="text-emerald-400" /> 3. Changer le Code Secret (Enregistrement Direct)
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Nouveau Code Secret
                      </label>
                      <input 
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Nouveau code"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Confirmer le Nouveau Code
                      </label>
                      <input 
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Répétez le nouveau code"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {savingProfile ? 'Enregistrement...' : 'Enregistrer le Profil'}
                    <CheckCircle size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 1: Ajouter / Modifier une Application */}
        <AnimatePresence>
          {showAppModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl ${
                      appFormType === 'file' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {appFormType === 'file' ? <Archive size={20} /> : <Globe size={20} />}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white uppercase italic">
                        {editingApp ? `Modifier : ${editingApp.name}` : 'Ajouter une Nouvelle Application'}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {appFormType === 'file' ? 'Package / Fichier téléchargeable (ZIP, APK)' : 'Application SaaS / Web interactive (Lien)'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAppModal(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Scrollable Form */}
                <form onSubmit={handleSaveApp} className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
                  {/* Type Selector (File vs Link) */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                      Type d'Application *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAppFormType('file');
                          if (!appFormPlatform || appFormPlatform.includes('Web')) setAppFormPlatform('Archive ZIP / DevApp');
                          if (!appFormGradient) setAppFormGradient('from-amber-600 to-amber-950');
                        }}
                        className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          appFormType === 'file'
                            ? 'bg-amber-500/10 border-amber-500/60 text-amber-300 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Archive size={18} className="shrink-0" />
                        <div>
                          <div className="text-xs font-bold font-mono">📦 Fichier Téléchargeable</div>
                          <div className="text-[10px] text-slate-500">ZIP, APK Android, EXE, DMG...</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAppFormType('link');
                          if (!appFormPlatform || appFormPlatform.includes('Archive')) setAppFormPlatform('Web / PWA / SaaS');
                          if (!appFormGradient) setAppFormGradient('from-blue-600 to-slate-950');
                        }}
                        className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          appFormType === 'link'
                            ? 'bg-blue-500/10 border-blue-500/60 text-blue-300 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Globe size={18} className="shrink-0" />
                        <div>
                          <div className="text-xs font-bold font-mono">🌐 Lien Web / SaaS</div>
                          <div className="text-[10px] text-slate-500">Site Web, SaaS B2B, PWA en ligne...</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Nom de l'Application *
                      </label>
                      <input
                        type="text"
                        required
                        value={appFormName}
                        onChange={e => setAppFormName(e.target.value)}
                        placeholder="Ex: YOUKNOW-DevApp ou SASTOCK"
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Sous-titre / Slogan
                      </label>
                      <input
                        type="text"
                        value={appFormSubtitle}
                        onChange={e => setAppFormSubtitle(e.target.value)}
                        placeholder="Ex: Solution Tout-en-Un pour Développeurs"
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Catégorie
                      </label>
                      <select
                        value={appFormCategory}
                        onChange={e => setAppFormCategory(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono cursor-pointer"
                      >
                        <option value="Développement & Outils">Développement & Outils</option>
                        <option value="Commerce & Entreprise">Commerce & Entreprise</option>
                        <option value="Finance & Gestion">Finance & Gestion</option>
                        <option value="Éducation & Académie">Éducation & Académie</option>
                        <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                        <option value="Productivité & Bureautique">Productivité & Bureautique</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Filiale Responsable
                      </label>
                      <select
                        value={appFormSubsidiary}
                        onChange={e => setAppFormSubsidiary(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono cursor-pointer"
                      >
                        <option value="YOU KNOW TECH">YOU KNOW TECH</option>
                        <option value="YOU KNOW ACADEMY">YOU KNOW ACADEMY</option>
                        <option value="YOU KNOW SOCIETY">YOU KNOW SOCIETY (Société Mère)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Plateforme Cible
                      </label>
                      <input
                        type="text"
                        value={appFormPlatform}
                        onChange={e => setAppFormPlatform(e.target.value)}
                        placeholder="Ex: Archive ZIP / DevApp, Android APK, Web SaaS..."
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Statut / Disponibilité
                      </label>
                      <select
                        value={appFormStatus}
                        onChange={e => setAppFormStatus(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono cursor-pointer"
                      >
                        <option value="Opérationnel">Opérationnel</option>
                        <option value="En ligne">En ligne</option>
                        <option value="Actif">Actif</option>
                        <option value="Bêta">Bêta</option>
                        <option value="Nouveau">Nouveau</option>
                        <option value="Version 2.0">Version 2.0</option>
                      </select>
                    </div>
                  </div>

                  {/* Specific Fields: FILE vs LINK */}
                  {appFormType === 'file' ? (
                    <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                        <Upload size={14} /> Fichier Téléchargeable (Archive ZIP, APK, etc.)
                      </h4>

                      {/* File Drag and Drop / Selector */}
                      <div
                        onDragOver={e => {
                          e.preventDefault();
                          setNewAppDragging(true);
                        }}
                        onDragLeave={() => setNewAppDragging(false)}
                        onDrop={e => {
                          e.preventDefault();
                          setNewAppDragging(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleUploadAppDedicatedFile(e.dataTransfer.files[0]);
                          }
                        }}
                        onClick={() => document.getElementById('modal-app-file-input')?.click()}
                        className={`border-2 border-dashed rounded-2xl p-5 text-center space-y-2 transition-all cursor-pointer ${
                          newAppDragging
                            ? 'border-amber-400 bg-amber-500/10'
                            : appFormFileUrl
                            ? 'border-emerald-500/50 bg-emerald-500/5'
                            : 'border-slate-800 hover:border-amber-500/40 bg-slate-900/50'
                        }`}
                      >
                        <input
                          type="file"
                          id="modal-app-file-input"
                          className="hidden"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadAppDedicatedFile(e.target.files[0]);
                            }
                          }}
                        />

                        {newAppUploading ? (
                          <div className="space-y-2 py-2">
                            <RefreshCw size={24} className="text-amber-400 animate-spin mx-auto" />
                            <p className="text-xs font-bold text-amber-300 font-mono">Téléversement sur le serveur... {newAppUploadProgress}%</p>
                          </div>
                        ) : appFormFileUrl ? (
                          <div className="space-y-1">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                              <FileCheck size={20} />
                            </div>
                            <p className="text-xs font-bold text-white font-mono">{appFormFileName || 'Fichier configuré'}</p>
                            <p className="text-[11px] text-emerald-400 font-mono">
                              Chemin : {appFormFileUrl} {appFormFileSize && `(${appFormFileSize})`}
                            </p>
                            <span className="text-[10px] text-amber-400 underline inline-block">Cliquer pour remplacer le fichier</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload size={22} className="text-amber-400 mx-auto" />
                            <p className="text-xs font-bold text-white">Glissez un fichier ici (ZIP, APK, etc.) ou cliquez pour parcourir</p>
                            <p className="text-[10px] text-slate-500">Jusqu'à 250 Mo • Enregistrement direct sur le serveur</p>
                          </div>
                        )}
                      </div>

                      {/* Manual File Path Override */}
                      <div className="grid sm:grid-cols-3 gap-3 pt-2">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                            URL / Chemin du Fichier *
                          </label>
                          <input
                            type="text"
                            required={appFormType === 'file'}
                            value={appFormFileUrl}
                            onChange={e => setAppFormFileUrl(e.target.value)}
                            placeholder="Ex: /YOUKNOW-DevApp.zip ou https://..."
                            className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                            Taille Affichée
                          </label>
                          <input
                            type="text"
                            value={appFormFileSize}
                            onChange={e => setAppFormFileSize(e.target.value)}
                            placeholder="Ex: 45.8 Mo"
                            className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                        <Link2 size={14} /> Adresse URL de l'Application Web / SaaS
                      </h4>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                          Lien Web / URL *
                        </label>
                        <input
                          type="url"
                          required={appFormType === 'link'}
                          value={appFormUrl}
                          onChange={e => setAppFormUrl(e.target.value)}
                          placeholder="https://sastock-youknow.ai.studio/ ou https://monbudget.youknow.click"
                          className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                      <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 pt-1">
                        <input
                          type="checkbox"
                          checked={appFormIsIframePreviewable}
                          onChange={e => setAppFormIsIframePreviewable(e.target.checked)}
                          className="rounded border-slate-700 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer"
                        />
                        <span>Autoriser l'aperçu interactif direct (si le site supporte l'affichage iframe)</span>
                      </label>
                    </div>
                  )}

                  {/* Public Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Public Cible
                      </label>
                      <input
                        type="text"
                        value={appFormTargetAudience}
                        onChange={e => setAppFormTargetAudience(e.target.value)}
                        placeholder="Ex: Développeurs, Étudiants Université Numérique, Commerçants..."
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Description Complète *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={appFormDescription}
                        onChange={e => setAppFormDescription(e.target.value)}
                        placeholder="Description détaillée de l'application, fonctionnalités et valeur apportée..."
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Points Forts & Fonctionnalités Clés (1 point par ligne)
                      </label>
                      <textarea
                        rows={3}
                        value={appFormHighlights}
                        onChange={e => setAppFormHighlights(e.target.value)}
                        placeholder="Gestion de stock en temps réel&#10;Génération de rapports PDF et Excel&#10;Mode hors-ligne sécurisé"
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                        Technologies Utilisées (séparées par des virgules)
                      </label>
                      <input
                        type="text"
                        value={appFormTechStack}
                        onChange={e => setAppFormTechStack(e.target.value)}
                        placeholder="React, TypeScript, Tailwind CSS, SQLite, Android APK..."
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                          Badge Spécial (optionnel)
                        </label>
                        <input
                          type="text"
                          value={appFormBadgeText}
                          onChange={e => setAppFormBadgeText(e.target.value)}
                          placeholder="Ex: Recommandé, Exclusif, V2..."
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">
                          Thème Visuel (Dégradé d'en-tête)
                        </label>
                        <select
                          value={appFormGradient}
                          onChange={e => setAppFormGradient(e.target.value)}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono cursor-pointer"
                        >
                          <option value="from-amber-600 to-amber-950">Ambre & Or (DevApp / Package)</option>
                          <option value="from-blue-600 to-slate-950">Bleu Océan (Finance / PWA)</option>
                          <option value="from-emerald-600 to-slate-950">Émeraude (SaaS / Commerce)</option>
                          <option value="from-purple-600 to-slate-950">Pourpre Royal (IA & Formation)</option>
                          <option value="from-rose-600 to-slate-950">Rubis & Rose (Créatif)</option>
                          <option value="from-cyan-600 to-slate-950">Cyan Électrique (Cloud & API)</option>
                        </select>
                      </div>
                    </div>

                    {/* Spotlight Checkbox */}
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star size={16} className={appFormIsSpotlight ? 'fill-amber-400 text-amber-400' : 'text-slate-500'} />
                        <span className="text-xs font-bold text-white">Mettre en avant cette application</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={appFormIsSpotlight}
                        onChange={e => setAppFormIsSpotlight(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0 w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Feedback Message */}
                  {appFormError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-mono">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{appFormError}</span>
                    </div>
                  )}

                  {appFormSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
                      <CheckCircle2 size={15} className="shrink-0" />
                      <span>{appFormSuccess}</span>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAppModal(false)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingApp}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSavingApp ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Enregistrement...</span>
                        </>
                      ) : (
                        <>
                          <Check size={14} />
                          <span>{editingApp ? 'Mettre à Jour' : 'Créer l\'Application'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 2: Confirmation de Suppression d'une Application */}
        <AnimatePresence>
          {deleteAppTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-red-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
                  <Trash2 size={24} />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-base font-bold text-white">Supprimer l'application ?</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Êtes-vous sûr de vouloir supprimer définitivement <strong className="text-white">"{deleteAppTarget.name}"</strong> ({deleteAppTarget.appType === 'file' ? 'Fichier' : 'Lien Web'}) de l'écosystème YOU KNOW ?
                  </p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-400 space-y-1">
                  <div>ID : {deleteAppTarget.id}</div>
                  <div>Catégorie : {deleteAppTarget.category}</div>
                  <div>Type : {deleteAppTarget.appType === 'file' ? `Fichier (${deleteAppTarget.fileName || 'Archive'})` : `Lien (${deleteAppTarget.url})`}</div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setDeleteAppTarget(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    disabled={isDeletingApp}
                    onClick={() => handleDeleteApplication(deleteAppTarget)}
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isDeletingApp ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Suppression...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 size={14} />
                        <span>Confirmer la suppression</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 3: Aperçu interactif d'application en direct (Admin) */}
        <AnimatePresence>
          {adminPreviewApp && adminPreviewApp.url && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md"
              onClick={() => setAdminPreviewApp(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Browser Bar */}
                <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex gap-1.5 shrink-0">
                      <button 
                        onClick={() => setAdminPreviewApp(null)} 
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                        title="Fermer (Echap)"
                      />
                      <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono truncate max-w-xs sm:max-w-md">
                      <Lock size={12} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{adminPreviewApp.url}</span>
                      <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400">
                        {adminUseProxy ? 'Proxy YOU KNOW' : 'Direct'}
                      </span>
                    </div>
                  </div>

                  {/* Device Switcher */}
                  <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                    <button
                      onClick={() => setAdminPreviewViewport('desktop')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                        adminPreviewViewport === 'desktop'
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Monitor size={13} />
                      <span>Bureau</span>
                    </button>
                    <button
                      onClick={() => setAdminPreviewViewport('tablet')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                        adminPreviewViewport === 'tablet'
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Tablet size={13} />
                      <span>Tablette</span>
                    </button>
                    <button
                      onClick={() => setAdminPreviewViewport('mobile')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                        adminPreviewViewport === 'mobile'
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone size={13} />
                      <span>Mobile</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setAdminIframeLoading(true);
                        setAdminIframeKey(k => k + 1);
                      }}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                      title="Recharger l'aperçu"
                    >
                      <RefreshCw size={14} className={adminIframeLoading ? 'animate-spin text-blue-400' : ''} />
                    </button>

                    <button
                      onClick={() => {
                        setAdminUseProxy(!adminUseProxy);
                        setAdminIframeLoading(true);
                        setAdminIframeKey(k => k + 1);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold transition-all border cursor-pointer hidden sm:block ${
                        adminUseProxy 
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {adminUseProxy ? '🛡️ Proxy Actif' : '🌐 Mode Direct'}
                    </button>

                    <a
                      href={adminPreviewApp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold font-mono shadow-md shadow-blue-600/30"
                    >
                      <span>Lancer</span>
                      <ExternalLink size={13} />
                    </a>

                    <button
                      onClick={() => setAdminPreviewApp(null)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Viewport Frame */}
                <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-2 sm:p-4">
                  {adminIframeLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs space-y-3 pointer-events-none">
                      <RefreshCw size={28} className="text-blue-400 animate-spin" />
                      <p className="text-xs font-mono text-slate-300">Chargement de l'application interactive...</p>
                    </div>
                  )}

                  <div 
                    className={`h-full transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 ${
                      adminPreviewViewport === 'mobile' 
                        ? 'w-[385px] max-w-full border-4 border-slate-700' 
                        : adminPreviewViewport === 'tablet' 
                        ? 'w-[768px] max-w-full border-2 border-slate-700' 
                        : 'w-full'
                    }`}
                  >
                    <iframe
                      key={adminIframeKey}
                      src={adminUseProxy 
                        ? `/api/preview-proxy?url=${encodeURIComponent(adminPreviewApp.url || '')}&id=${encodeURIComponent(adminPreviewApp.id)}&name=${encodeURIComponent(adminPreviewApp.name)}`
                        : adminPreviewApp.url
                      }
                      title={`Aperçu interactif de ${adminPreviewApp.name}`}
                      onLoad={() => setAdminIframeLoading(false)}
                      className="w-full h-full border-0 bg-slate-900"
                      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; autoplay"
                      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    />
                  </div>
                </div>

                {/* Footer Info */}
                <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white">{adminPreviewApp.name}</span>
                    <span className="text-slate-500">• {adminPreviewApp.subsidiary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-slate-500">Testeur d'Iframe Administratif</span>
                    <a 
                      href={adminPreviewApp.url}
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
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
