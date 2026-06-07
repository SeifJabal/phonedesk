'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { loadCmsContent, defaultCmsContent, CmsContent } from '@/lib/cms';

export default function AboutPage() {
  const [cms, setCms] = useState<CmsContent>(defaultCmsContent);

  useEffect(() => {
    setCms(loadCmsContent());
  }, []);

  const { about } = cms;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{about.hero.title}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">{about.hero.subtitle}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {about.stats.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-extrabold text-indigo-600 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre histoire</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{about.story}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((v, i) => (
              <Card key={i} className="text-center hover:shadow-md transition-all border-2 hover:border-indigo-200">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à nous confier votre appareil ?</h2>
          <p className="text-indigo-100 mb-8">Devis 100% gratuit et sans engagement.</p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-10" asChild>
            <Link href="/devis">Obtenir un devis gratuit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
