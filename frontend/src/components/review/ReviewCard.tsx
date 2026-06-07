'use client';

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {review.user?.avatar ? (
                <img
                  src={review.user.avatar}
                  alt={`${review.user.firstName} ${review.user.lastName}`}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-primary font-semibold text-lg">
                  {review.user?.firstName?.[0]}{review.user?.lastName?.[0]}
                </span>
              )}
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {review.user?.firstName} {review.user?.lastName?.[0]}.
              </p>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Verified Badge */}
          {review.verified && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              Vérifié
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Title */}
        {review.title && (
          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
        )}

        {/* Content */}
        <p className="text-gray-700 mb-4">{review.content}</p>

        {/* Service Info */}
        {(review.serviceType || review.deviceType) && (
          <div className="flex gap-2 text-xs text-gray-500 mb-4">
            {review.deviceType && (
              <span className="bg-gray-100 px-2 py-1 rounded">{review.deviceType}</span>
            )}
            {review.serviceType && (
              <span className="bg-gray-100 px-2 py-1 rounded">{review.serviceType}</span>
            )}
          </div>
        )}

        {/* Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="flex gap-2 mb-4">
            {review.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Review photo ${index + 1}`}
                className="h-20 w-20 rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        {/* Shop Response */}
        {review.response && (
          <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-xl">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Réponse du propriétaire
            </p>
            <p className="text-sm text-gray-700">{review.response.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(review.response.respondedAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        )}

        {/* Helpful */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm">
          <span className="text-gray-600">Cette évaluation vous a-t-elle été utile?</span>
          <button className="text-gray-700 hover:text-primary font-medium">
            👍 Oui ({review.helpful.yes})
          </button>
          <button className="text-gray-700 hover:text-primary font-medium">
            👎 Non ({review.helpful.no})
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
