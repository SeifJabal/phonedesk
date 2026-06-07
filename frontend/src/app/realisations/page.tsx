'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { loadCmsContent, defaultCmsContent, CmsContent } from '@/lib/cms';

const CATEGORY_COLORS: Record<string, string> = {
  Smartphone: 'bg-indigo-100 text-indigo-700',
  Tablette: 'bg-purple-100 text-purple-700',
  Ordinateur: 'bg-blue-100 text-blue-700',
  Console: 'bg-green-100 text-green-700',
  Montre: 'bg-orange-100 text-orange-700',
};

export default function RealisationsPage() {
  const [cms, setCms] = useState<CmsContent>(defaultCmsContent);

  useEffect(() => {
    setCms(loadCmsContent());
  }, []);

  const { realisations } = cms;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{realisations.hero.title}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">{realisations.hero.subtitle}</p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realisations.items.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1 duration-200 border-2 hover:border-indigo-200 overflow-hidden">
                <CardContent className="p-0">
                  {/* Colored top bar */}
                  <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${CATEGORY_COLORS[item.category] || 'bg-gray-100 text-gray-600'}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-green-700 text-sm font-semibold bg-green-50 rounded-lg px-3 py-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      {item.result}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Votre appareil mérite le même traitement ?</h2>
          <p className="text-indigo-100 mb-8">Devis gratuit en 2 minutes.</p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-10" asChild>
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
