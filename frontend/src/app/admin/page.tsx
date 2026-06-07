'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Smartphone, Tablet, Laptop, Gamepad2, Watch,
  LogOut, Search, RefreshCw, Trash2, Eye, ChevronDown, ChevronUp, LayoutDashboard, Pencil, Mail, CheckCircle2
} from 'lucide-react';
import CmsEditor from '@/components/admin/CmsEditor';

interface Devis {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  device: string;
  brand: string;
  model: string;
  issues: string[];
  issueDescription: string;
  imei: string;
  hasPart: boolean;
  date: string;
  time: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const STATUS_LABELS: Record<Devis['status'], string> = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  in_progress: 'En cours',
  completed: 'Terminé',
  cancelled: 'Annulé',
};

const STATUS_COLORS: Record<Devis['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const DEVICE_ICONS: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  tablet: Tablet,
  computer: Laptop,
  console: Gamepad2,
  watch: Watch,
};

const DEVICE_LABELS: Record<string, string> = {
  smartphone: 'Smartphone',
  tablet: 'Tablette',
  computer: 'Ordinateur',
  console: 'Console',
  watch: 'Montre',
};

const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [devisList, setDevisList] = useState<Devis[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'devis' | 'content' | 'settings'>('devis');
  const [adminEmail, setAdminEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') {
      setAuthenticated(true);
    }
    // Load saved admin email from localStorage
    const savedEmail = localStorage.getItem('admin_email');
    if (savedEmail) setAdminEmail(savedEmail);
  }, []);

  const saveAdminEmail = () => {
    localStorage.setItem('admin_email', adminEmail);
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 3000);
  };

  const loadDevis = async () => {
    try {
      // First try to fetch from backend API
      const res = await fetch('http://localhost:5000/api/v1/devis', {
        headers: {
          'x-admin-token': 'change-this-secret-admin-token-123'
        }
      });
      
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          const formatted = result.data.map((d: any) => ({
            id: d._id,
            createdAt: d.createdAt,
            status: d.status || 'pending',
            device: d.device,
            brand: d.brand,
            model: d.model,
            issues: d.issues,
            issueDescription: d.issueDescription,
            imei: d.imei,
            hasPart: d.hasPart,
            date: d.date,
            time: d.time,
            customer: d.customer,
          }));
          setDevisList(formatted);
          return;
        }
      }
      
      // Fallback to localStorage if API fails
      const stored = JSON.parse(localStorage.getItem('devis') || '[]') as Devis[];
      setDevisList(stored.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading devis:', error);
      // Fallback to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('devis') || '[]') as Devis[];
        setDevisList(stored.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch {
        setDevisList([]);
      }
    }
  };

  useEffect(() => {
    if (authenticated) loadDevis();
  }, [authenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthenticated(false);
  };

  const updateStatus = (id: string, status: Devis['status']) => {
    const updated = devisList.map(d => d.id === id ? { ...d, status } : d);
    setDevisList(updated);
    localStorage.setItem('devis', JSON.stringify(updated));
  };

  const deleteDevis = (id: string) => {
    if (!confirm('Supprimer ce devis ?')) return;
    const updated = devisList.filter(d => d.id !== id);
    setDevisList(updated);
    localStorage.setItem('devis', JSON.stringify(updated));
  };

  const filtered = devisList.filter(d => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.customer.firstName.toLowerCase().includes(q) ||
      d.customer.lastName.toLowerCase().includes(q) ||
      d.customer.email.toLowerCase().includes(q) ||
      d.customer.phone.includes(q) ||
      d.brand.toLowerCase().includes(q) ||
      d.model.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: devisList.length,
    pending: devisList.filter(d => d.status === 'pending').length,
    confirmed: devisList.filter(d => d.status === 'confirmed').length,
    in_progress: devisList.filter(d => d.status === 'in_progress').length,
    completed: devisList.filter(d => d.status === 'completed').length,
    cancelled: devisList.filter(d => d.status === 'cancelled').length,
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔐</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Admin</h1>
              <p className="text-gray-500 text-sm mt-1">Accès réservé au personnel</p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className={`p-4 ${passwordError ? 'border-red-500' : ''}`}
              />
              {passwordError && <p className="text-red-500 text-sm">Mot de passe incorrect</p>}
              <Button onClick={handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-700 py-6">
                Se connecter
              </Button>
            </div>
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← Retour au site</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-xs text-gray-500">Administration</p>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveTab('devis')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors ${activeTab === 'devis' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <LayoutDashboard className="h-4 w-4" /> Devis
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors border-l border-gray-200 ${activeTab === 'content' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Pencil className="h-4 w-4" /> Contenu du site
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors border-l border-gray-200 ${activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Paramètres
            </button>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'devis' && (
              <Button variant="outline" size="sm" onClick={loadDevis}>
                <RefreshCw className="h-4 w-4 mr-1" /> Actualiser
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-1" /> Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CMS Content Editor */}
        {activeTab === 'content' && <CmsEditor />}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card>
            <CardContent className="p-8">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Paramètres des notifications</h2>
                  <p className="text-gray-600">Configurez l'adresse email où vous souhaitez recevoir les notifications de nouveaux devis</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email de notification
                    </label>
                    <Input
                      type="email"
                      placeholder="admin@votreboutique.com"
                      value={adminEmail}
                      onChange={(e) => { setAdminEmail(e.target.value); setEmailSaved(false); }}
                      className="p-4 text-base"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Tous les nouveaux devis seront envoyés à cette adresse
                    </p>
                  </div>

                  {emailSaved && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Email enregistré avec succès</span>
                    </div>
                  )}

                  <Button
                    onClick={saveAdminEmail}
                    disabled={!adminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-base"
                  >
                    Enregistrer l'adresse email
                  </Button>

                  <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Que recevez-vous ?
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">•</span>
                        <span>Notifications instantanées pour chaque nouveau devis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">•</span>
                        <span>Informations complètes du client (nom, téléphone, email)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">•</span>
                        <span>Détails de l'appareil et des réparations demandées</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">•</span>
                        <span>Date et heure du rendez-vous souhaité</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Devis Tab */}
        {activeTab === 'devis' && (<>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {[
            { key: 'all', label: 'Total', color: 'bg-gray-900' },
            { key: 'pending', label: 'En attente', color: 'bg-yellow-500' },
            { key: 'confirmed', label: 'Confirmés', color: 'bg-blue-500' },
            { key: 'in_progress', label: 'En cours', color: 'bg-purple-500' },
            { key: 'completed', label: 'Terminés', color: 'bg-green-500' },
            { key: 'cancelled', label: 'Annulés', color: 'bg-red-500' },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all text-left ${statusFilter === key ? 'border-indigo-500' : 'border-transparent hover:border-gray-200'}`}
            >
              <p className="text-2xl font-bold text-gray-900">{counts[key as keyof typeof counts]}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par nom, email, téléphone, appareil..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-16 text-center">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-xl font-semibold text-gray-700">Aucun devis trouvé</p>
            <p className="text-gray-400 mt-2">
              {devisList.length === 0
                ? 'Les demandes de devis soumises apparaîtront ici'
                : 'Essayez de modifier vos filtres'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((d) => {
              const DeviceIcon = DEVICE_ICONS[d.device] || Smartphone;
              const isExpanded = expandedId === d.id;
              const date = new Date(d.createdAt);
              return (
                <div key={d.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  {/* Row */}
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                      <DeviceIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900">{d.customer.firstName} {d.customer.lastName}</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-600 text-sm">{d.brand} {d.model}</span>
                        {d.hasPart && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Pièce fournie</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                        <span>{d.customer.phone}</span>
                        <span>·</span>
                        <span>{d.customer.email}</span>
                        <span>·</span>
                        <span>RDV {d.date} à {d.time}</span>
                        <span>·</span>
                        <span className="text-xs">{date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {d.issues.slice(0, 3).map(issue => (
                          <span key={issue} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{issue}</span>
                        ))}
                        {d.issues.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{d.issues.length - 3} autre(s)</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Status selector */}
                      <select
                        value={d.status}
                        onChange={(e) => updateStatus(d.id, e.target.value as Devis['status'])}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer ${STATUS_COLORS[d.status]}`}
                      >
                        {(Object.entries(STATUS_LABELS) as [Devis['status'], string][]).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : d.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                        title="Voir détails"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => deleteDevis(d.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t bg-gray-50 p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">👤 Client</h4>
                        <p><span className="text-gray-500">Nom :</span> {d.customer.firstName} {d.customer.lastName}</p>
                        <p><span className="text-gray-500">Email :</span> {d.customer.email}</p>
                        <p><span className="text-gray-500">Tél :</span> {d.customer.phone}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">📱 Appareil</h4>
                        <p><span className="text-gray-500">Type :</span> {DEVICE_LABELS[d.device] || d.device}</p>
                        <p><span className="text-gray-500">Marque :</span> {d.brand}</p>
                        <p><span className="text-gray-500">Modèle :</span> {d.model}</p>
                        {d.imei && <p><span className="text-gray-500">IMEI :</span> {d.imei}</p>}
                        <p><span className="text-gray-500">Pièce fournie :</span> {d.hasPart ? '✅ Oui' : '❌ Non'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">🔧 Problèmes</h4>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {d.issues.map(i => (
                            <span key={i} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{i}</span>
                          ))}
                        </div>
                        {d.issueDescription && (
                          <p className="text-gray-600 italic text-xs mt-2 bg-white p-2 rounded border">
                            &quot;{d.issueDescription}&quot;
                          </p>
                        )}
                        <p className="mt-2"><span className="text-gray-500">RDV :</span> {d.date} à {d.time}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        </>)}
      </div>
    </div>
  );
}
