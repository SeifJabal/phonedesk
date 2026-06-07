'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { loadCmsContent, defaultCmsContent, CmsContent } from '@/lib/cms';

export default function ContactPage() {
  const [cms, setCms] = useState<CmsContent>(defaultCmsContent);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setCms(loadCmsContent());
  }, []);

  const { contact } = cms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Une question ? N'hésitez pas à nous écrire ou à nous appeler directement.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-6 space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Nos coordonnées</h2>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Adresse</p>
                      <p className="text-gray-500 text-sm mt-0.5">{contact.address}</p>
                      <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm font-medium hover:underline mt-1 inline-block">
                        Voir sur Google Maps →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Téléphone</p>
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-indigo-600 text-sm font-medium hover:underline mt-0.5 inline-block">
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <a href={`mailto:${contact.email}`} className="text-indigo-600 text-sm font-medium hover:underline mt-0.5 inline-block">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-xl font-bold text-gray-900">Horaires d'ouverture</h2>
                  </div>
                  <div className="space-y-2">
                    {contact.hours.map((h, i) => (
                      <div key={i} className={`flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0 ${new Date().getDay() === [1,2,3,4,5,6,0][i] ? 'font-semibold text-indigo-700' : ''}`}>
                        <span className="text-gray-700">{h.day}</span>
                        <span className={h.hours === 'Fermé' ? 'text-red-500 font-medium' : 'text-gray-600'}>
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                <Link href="/devis">📋 Prendre un rendez-vous en ligne</Link>
              </Button>
            </div>

            {/* Contact Form */}
            <Card className="border-2">
              <CardContent className="p-8">
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                    <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
                    <Button className="mt-6" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Envoyer un message</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom complet *</label>
                        <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" className="p-3" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone</label>
                        <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="06 XX XX XX XX" className="p-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                      <Input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jean@exemple.fr" className="p-3" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sujet</label>
                      <Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Réparation écran iPhone 15..." className="p-3" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        placeholder="Décrivez votre problème ou posez votre question..."
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={sending} className="w-full bg-indigo-600 hover:bg-indigo-700 py-6">
                      {sending ? (
                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi...</span>
                      ) : (
                        <span className="flex items-center gap-2"><Send className="h-4 w-4" /> Envoyer le message</span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
