'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { loadCmsContent, defaultCmsContent, CmsContent } from '@/lib/cms';

export default function FaqPage() {
  const [cms, setCms] = useState<CmsContent>(defaultCmsContent);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    setCms(loadCmsContent());
  }, []);

  const { faq } = cms;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{faq.hero.title}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">{faq.hero.subtitle}</p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-3">
            {faq.items.map((item, i) => (
              <Card key={i} className="overflow-hidden border-2 transition-all hover:border-indigo-200">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-indigo-500 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed mt-3">{item.answer}</p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-indigo-100 mb-8">Notre chatbot ou notre équipe sont là pour vous aider.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8" asChild>
              <Link href="/devis">Devis gratuit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
