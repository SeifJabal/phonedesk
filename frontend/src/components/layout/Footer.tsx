'use client';

import Link from 'next/link';
import { siteConfig, navigation } from '@/config/site';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold text-gray-900">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              <a href="mailto:contact@phonerepair.com" className="text-gray-400 hover:text-gray-600">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+33123456789" className="text-gray-400 hover:text-gray-600">
                <Phone className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {navigation.footer.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} {siteConfig.name} – Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
