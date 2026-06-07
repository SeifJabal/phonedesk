'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { loadCmsContent, defaultCmsContent, CmsContent } from '@/lib/cms';

export default function TemoignagesPage() {
  const [cms, setCms] = useState<CmsContent>(defaultCmsContent);

  useEffect(() => {
    setCms(loadCmsContent());
  }, []);

  const { temoignages } = cms;
  const avgRating = temoignages.items.length
    ? (temoignages.items.reduce((s, t) => s + t.rating, 0) / temoignages.items.length).toFixed(1)
    : '5.0';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{temoignages.hero.title}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-6">{temoignages.hero.subtitle}</p>
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-2xl px-6 py-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold">{avgRating}/5</span>
            <span className="text-indigo-200 text-sm">({temoignages.items.length} avis)</span>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temoignages.items.map((t, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1 duration-200 border-2 hover:border-indigo-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-lg font-bold">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`h-3.5 w-3.5 ${j < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">"{t.text}"</p>
                  {t.device && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {t.device}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez nos clients satisfaits !</h2>
          <p className="text-indigo-100 mb-8">Devis gratuit, intervention rapide, garantie 6 mois.</p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-10" asChild>
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
