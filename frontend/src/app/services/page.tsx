'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { loadCmsContent, defaultCmsContent, CmsContent } from '@/lib/cms';

export default function ServicesPage() {
  const [cms, setCms] = useState<CmsContent>(defaultCmsContent);

  useEffect(() => {
    setCms(loadCmsContent());
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{cms.services.hero.title}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">{cms.services.hero.subtitle}</p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8" asChild>
            <Link href="/devis">Obtenir un devis gratuit <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700">
            {['Garantie 6 mois', 'Devis gratuit', 'Intervention rapide', 'Techniciens certifiés', 'Pièces de qualité'].map(b => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cms.services.items.map((service, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1 duration-200 border-2 hover:border-indigo-200">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <span className="text-indigo-600 font-semibold text-sm">{service.price}</span>
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
          <h2 className="text-3xl font-bold mb-4">Votre appareil a besoin d'une réparation ?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Devis gratuit, sans engagement, en moins de 2 minutes.</p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-10" asChild>
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
