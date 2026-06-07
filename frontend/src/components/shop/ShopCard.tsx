'use client';

import Link from 'next/link';
import { MapPin, Star, Clock, CheckCircle, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Shop } from '@/types';

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const isOpen = checkIfOpen(shop.hours);

  return (
    <Link href={`/${shop.address.regionSlug}/${shop.address.citySlug}/${shop.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {shop.coverImage ? (
            <img
              src={shop.coverImage}
              alt={shop.businessName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl font-bold">{shop.businessName[0]}</span>
            </div>
          )}
          
          {/* Verified Badge */}
          {shop.verified && (
            <div className="absolute top-3 right-3">
              <Badge variant="success" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                Vérifié
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {/* Shop Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {shop.businessName}
          </h3>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {shop.features.expressRepair && (
              <Badge variant="warning" className="text-xs">⚡ Réparation Express</Badge>
            )}
            {shop.features.warranty && (
              <Badge variant="outline" className="text-xs">
                Garantie {shop.features.warrantyDuration}j
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(shop.rating.average)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold">{shop.rating.average.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({shop.rating.count.toLocaleString()} avis)</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{shop.address.city}, {shop.address.postalCode}</span>
          </div>

          {/* Opening Status */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className={isOpen ? 'text-green-600 font-medium' : 'text-red-600'}>
              {isOpen ? 'Ouvert' : 'Fermé'}
            </span>
          </div>

          {/* CTA */}
          <Button className="w-full" onClick={(e) => e.preventDefault()}>
            Voir les services
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

function checkIfOpen(hours: Shop['hours']): boolean {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof hours;
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const todayHours = hours[day];
  if (!todayHours || todayHours.closed) return false;
  
  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
  
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;
  
  return currentTime >= openTime && currentTime <= closeTime;
}
