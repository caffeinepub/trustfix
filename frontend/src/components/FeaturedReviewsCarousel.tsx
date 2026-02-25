import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import StarRating from './StarRating';
import type { Review } from '../backend';

const serviceLabels: Record<string, string> = {
  pestControl: 'Pest Control',
  deepCleaning: 'Cleaning',
  carpetUpholstery: 'Carpet & Upholstery',
  painting: 'Painting',
  other: 'Other Services',
};

export default function FeaturedReviewsCarousel() {
  const { actor, isFetching } = useActor();
  const [current, setCurrent] = useState(0);

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ['featured-reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedReviews();
    },
    enabled: !!actor && !isFetching,
  });

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  const review = reviews[current];
  const initials = review.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
          <p className="text-gray-500 text-sm">Trusted by thousands of happy customers in Bangalore</p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-card p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-gray-900">{review.name}</p>
              <p className="text-sm text-gray-500">{serviceLabels[review.service] || 'Service'}</p>
              <StarRating rating={Number(review.rating)} size={16} />
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed italic">"{review.reviewText}"</p>

          {reviews.length > 1 && (
            <div className="flex items-center justify-between mt-6">
              <button onClick={prev} className="p-2 rounded-full bg-gray-100 hover:bg-brand-blue hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-brand-blue' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full bg-gray-100 hover:bg-brand-blue hover:text-white transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
