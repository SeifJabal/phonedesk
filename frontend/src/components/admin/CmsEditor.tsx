'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';
import {
  loadCmsContent, saveCmsContent, defaultCmsContent,
  CmsContent, ServiceItem, FaqItem, TestimonialItem, RealisationItem, AboutValue, AboutStat, HourItem
} from '@/lib/cms';

type CmsTab = 'services' | 'about' | 'realisations' | 'faq' | 'temoignages' | 'contact';

const TABS: { key: CmsTab; label: string; icon: string }[] = [
  { key: 'services', label: 'Nos Services', icon: '🔧' },
  { key: 'about', label: 'À Propos', icon: 'ℹ️' },
  { key: 'realisations', label: 'Réalisations', icon: '✅' },
  { key: 'faq', label: 'FAQ', icon: '❓' },
  { key: 'temoignages', label: 'Témoignages', icon: '⭐' },
  { key: 'contact', label: 'Contact', icon: '📞' },
];

// ─── Generic field ──────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)} className="text-sm" />
      )}
    </div>
  );
}

// ─── Section hero editor ────────────────────────────────────────────────────
function HeroEditor({ title, subtitle, onChange }: { title: string; subtitle: string; onChange: (t: string, s: string) => void }) {
  return (
    <div className="space-y-3 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
      <h4 className="text-sm font-bold text-indigo-800">🎯 Bandeau hero</h4>
      <Field label="Titre" value={title} onChange={t => onChange(t, subtitle)} />
      <Field label="Sous-titre" value={subtitle} onChange={s => onChange(title, s)} />
    </div>
  );
}

export default function CmsEditor() {
  const [activeTab, setActiveTab] = useState<CmsTab>('services');
  const [cms, setCms] = useState<CmsContent>(defaultCmsContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCms(loadCmsContent());
  }, []);

  const save = () => {
    saveCmsContent(cms);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // ─── Services ───────────────────────────────────────────────────────────
  const updateServiceItem = (i: number, field: keyof ServiceItem, val: string) => {
    const items = [...cms.services.items];
    items[i] = { ...items[i], [field]: val };
    setCms(c => ({ ...c, services: { ...c.services, items } }));
  };
  const addService = () => setCms(c => ({ ...c, services: { ...c.services, items: [...c.services.items, { icon: '🔧', title: '', description: '', price: '' }] } }));
  const removeService = (i: number) => setCms(c => ({ ...c, services: { ...c.services, items: c.services.items.filter((_, idx) => idx !== i) } }));

  // ─── About ──────────────────────────────────────────────────────────────
  const updateStat = (i: number, f: keyof AboutStat, v: string) => {
    const stats = [...cms.about.stats]; stats[i] = { ...stats[i], [f]: v };
    setCms(c => ({ ...c, about: { ...c.about, stats } }));
  };
  const addStat = () => setCms(c => ({ ...c, about: { ...c.about, stats: [...c.about.stats, { value: '', label: '' }] } }));
  const removeStat = (i: number) => setCms(c => ({ ...c, about: { ...c.about, stats: c.about.stats.filter((_, idx) => idx !== i) } }));

  const updateValue = (i: number, f: keyof AboutValue, v: string) => {
    const values = [...cms.about.values]; values[i] = { ...values[i], [f]: v };
    setCms(c => ({ ...c, about: { ...c.about, values } }));
  };
  const addValue = () => setCms(c => ({ ...c, about: { ...c.about, values: [...c.about.values, { icon: '🏆', title: '', description: '' }] } }));
  const removeValue = (i: number) => setCms(c => ({ ...c, about: { ...c.about, values: c.about.values.filter((_, idx) => idx !== i) } }));

  // ─── Réalisations ────────────────────────────────────────────────────────
  const updateRealisation = (i: number, f: keyof RealisationItem, v: string) => {
    const items = [...cms.realisations.items]; items[i] = { ...items[i], [f]: v };
    setCms(c => ({ ...c, realisations: { ...c.realisations, items } }));
  };
  const addRealisation = () => setCms(c => ({ ...c, realisations: { ...c.realisations, items: [...c.realisations.items, { title: '', description: '', category: 'Smartphone', result: '' }] } }));
  const removeRealisation = (i: number) => setCms(c => ({ ...c, realisations: { ...c.realisations, items: c.realisations.items.filter((_, idx) => idx !== i) } }));

  // ─── FAQ ────────────────────────────────────────────────────────────────
  const updateFaq = (i: number, f: keyof FaqItem, v: string) => {
    const items = [...cms.faq.items]; items[i] = { ...items[i], [f]: v };
    setCms(c => ({ ...c, faq: { ...c.faq, items } }));
  };
  const addFaq = () => setCms(c => ({ ...c, faq: { ...c.faq, items: [...c.faq.items, { question: '', answer: '' }] } }));
  const removeFaq = (i: number) => setCms(c => ({ ...c, faq: { ...c.faq, items: c.faq.items.filter((_, idx) => idx !== i) } }));

  // ─── Témoignages ─────────────────────────────────────────────────────────
  const updateTestimonial = (i: number, f: keyof TestimonialItem, v: string | number) => {
    const items = [...cms.temoignages.items]; items[i] = { ...items[i], [f]: v };
    setCms(c => ({ ...c, temoignages: { ...c.temoignages, items } }));
  };
  const addTestimonial = () => setCms(c => ({ ...c, temoignages: { ...c.temoignages, items: [...c.temoignages.items, { name: '', rating: 5, text: '', device: '' }] } }));
  const removeTestimonial = (i: number) => setCms(c => ({ ...c, temoignages: { ...c.temoignages, items: c.temoignages.items.filter((_, idx) => idx !== i) } }));

  // ─── Contact hours ────────────────────────────────────────────────────────
  const updateHour = (i: number, f: keyof HourItem, v: string) => {
    const hours = [...cms.contact.hours]; hours[i] = { ...hours[i], [f]: v };
    setCms(c => ({ ...c, contact: { ...c.contact, hours } }));
  };

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === t.key ? 'bg-indigo-600 text-white shadow' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* ── SERVICES ── */}
      {activeTab === 'services' && (
        <div className="space-y-5">
          <HeroEditor
            title={cms.services.hero.title}
            subtitle={cms.services.hero.subtitle}
            onChange={(title, subtitle) => setCms(c => ({ ...c, services: { ...c.services, hero: { title, subtitle } } }))}
          />
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-800">Services ({cms.services.items.length})</h4>
            <Button size="sm" variant="outline" onClick={addService}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cms.services.items.map((s, i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-400 font-medium">#{i + 1}</span>
                    <button onClick={() => removeService(i)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Icône (emoji)" value={s.icon} onChange={v => updateServiceItem(i, 'icon', v)} />
                    <Field label="Prix" value={s.price} onChange={v => updateServiceItem(i, 'price', v)} />
                  </div>
                  <Field label="Titre" value={s.title} onChange={v => updateServiceItem(i, 'title', v)} />
                  <Field label="Description" value={s.description} onChange={v => updateServiceItem(i, 'description', v)} multiline />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      {activeTab === 'about' && (
        <div className="space-y-5">
          <HeroEditor
            title={cms.about.hero.title}
            subtitle={cms.about.hero.subtitle}
            onChange={(title, subtitle) => setCms(c => ({ ...c, about: { ...c.about, hero: { title, subtitle } } }))}
          />
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800">Notre histoire</h4>
            <Field label="Texte" value={cms.about.story} onChange={v => setCms(c => ({ ...c, about: { ...c.about, story: v } }))} multiline />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800">Chiffres clés</h4>
              <Button size="sm" variant="outline" onClick={addStat}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cms.about.stats.map((s, i) => (
                <Card key={i} className="border border-gray-200">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex justify-end"><button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button></div>
                    <Field label="Valeur" value={s.value} onChange={v => updateStat(i, 'value', v)} />
                    <Field label="Label" value={s.label} onChange={v => updateStat(i, 'label', v)} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800">Valeurs</h4>
              <Button size="sm" variant="outline" onClick={addValue}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cms.about.values.map((v, i) => (
                <Card key={i} className="border border-gray-200">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">#{i + 1}</span>
                      <button onClick={() => removeValue(i)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Icône" value={v.icon} onChange={val => updateValue(i, 'icon', val)} />
                      <Field label="Titre" value={v.title} onChange={val => updateValue(i, 'title', val)} />
                    </div>
                    <Field label="Description" value={v.description} onChange={val => updateValue(i, 'description', val)} multiline />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RÉALISATIONS ── */}
      {activeTab === 'realisations' && (
        <div className="space-y-5">
          <HeroEditor
            title={cms.realisations.hero.title}
            subtitle={cms.realisations.hero.subtitle}
            onChange={(title, subtitle) => setCms(c => ({ ...c, realisations: { ...c.realisations, hero: { title, subtitle } } }))}
          />
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-800">Réalisations ({cms.realisations.items.length})</h4>
            <Button size="sm" variant="outline" onClick={addRealisation}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cms.realisations.items.map((r, i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">#{i + 1}</span>
                    <button onClick={() => removeRealisation(i)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Catégorie" value={r.category} onChange={v => updateRealisation(i, 'category', v)} />
                    <Field label="Résultat" value={r.result} onChange={v => updateRealisation(i, 'result', v)} />
                  </div>
                  <Field label="Titre" value={r.title} onChange={v => updateRealisation(i, 'title', v)} />
                  <Field label="Description" value={r.description} onChange={v => updateRealisation(i, 'description', v)} multiline />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── FAQ ── */}
      {activeTab === 'faq' && (
        <div className="space-y-5">
          <HeroEditor
            title={cms.faq.hero.title}
            subtitle={cms.faq.hero.subtitle}
            onChange={(title, subtitle) => setCms(c => ({ ...c, faq: { ...c.faq, hero: { title, subtitle } } }))}
          />
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-800">Questions / Réponses ({cms.faq.items.length})</h4>
            <Button size="sm" variant="outline" onClick={addFaq}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
          </div>
          <div className="space-y-4">
            {cms.faq.items.map((f, i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-400">Question {i + 1}</span>
                    <button onClick={() => removeFaq(i)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <Field label="Question" value={f.question} onChange={v => updateFaq(i, 'question', v)} />
                  <Field label="Réponse" value={f.answer} onChange={v => updateFaq(i, 'answer', v)} multiline />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── TÉMOIGNAGES ── */}
      {activeTab === 'temoignages' && (
        <div className="space-y-5">
          <HeroEditor
            title={cms.temoignages.hero.title}
            subtitle={cms.temoignages.hero.subtitle}
            onChange={(title, subtitle) => setCms(c => ({ ...c, temoignages: { ...c.temoignages, hero: { title, subtitle } } }))}
          />
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-800">Avis clients ({cms.temoignages.items.length})</h4>
            <Button size="sm" variant="outline" onClick={addTestimonial}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cms.temoignages.items.map((t, i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">#{i + 1}</span>
                    <button onClick={() => removeTestimonial(i)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Nom" value={t.name} onChange={v => updateTestimonial(i, 'name', v)} />
                    <Field label="Appareil" value={t.device} onChange={v => updateTestimonial(i, 'device', v)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Note (1-5)</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} onClick={() => updateTestimonial(i, 'rating', n)}
                          className={`text-xl transition-transform hover:scale-110 ${n <= t.rating ? 'opacity-100' : 'opacity-30'}`}>
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="Témoignage" value={t.text} onChange={v => updateTestimonial(i, 'text', v)} multiline />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTACT ── */}
      {activeTab === 'contact' && (
        <div className="space-y-5">
          <Card className="border border-gray-200">
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-gray-800">Informations de contact</h4>
              <Field label="Adresse" value={cms.contact.address} onChange={v => setCms(c => ({ ...c, contact: { ...c.contact, address: v } }))} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Téléphone" value={cms.contact.phone} onChange={v => setCms(c => ({ ...c, contact: { ...c.contact, phone: v } }))} />
                <Field label="Email" value={cms.contact.email} onChange={v => setCms(c => ({ ...c, contact: { ...c.contact, email: v } }))} />
              </div>
              <Field label="URL Google Maps" value={cms.contact.mapUrl} onChange={v => setCms(c => ({ ...c, contact: { ...c.contact, mapUrl: v } }))} />
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 space-y-3">
              <h4 className="font-bold text-gray-800">Horaires d'ouverture</h4>
              {cms.contact.hours.map((h, i) => (
                <div key={i} className="grid grid-cols-2 gap-3 items-center">
                  <Field label={i === 0 ? 'Jour' : ''} value={h.day} onChange={v => updateHour(i, 'day', v)} />
                  <Field label={i === 0 ? 'Horaires' : ''} value={h.hours} onChange={v => updateHour(i, 'hours', v)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Save button */}
      <div className="flex items-center gap-4 pt-4 border-t">
        <Button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 px-8">
          <Save className="h-4 w-4 mr-2" /> Enregistrer les modifications
        </Button>
        {saved && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
            <CheckCircle2 className="h-4 w-4" /> Sauvegardé !
          </div>
        )}
      </div>
    </div>
  );
}
