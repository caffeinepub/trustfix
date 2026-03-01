import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import StarRating from '@/components/StarRating';
import type { Review } from '@/backend';

const serviceLabels: Record<string, string> = {
  pestControl: 'Pest Control',
  deepCleaning: 'Cleaning',
  carpetUpholstery: 'Carpet & Upholstery',
  painting: 'Painting',
  other: 'Other Services',
};

const FALLBACK_REVIEWS = [
  {
    id: '1',
    name: 'Priya Sharma',
    serviceLabel: 'Deep Cleaning',
    rating: 5,
    reviewText: 'Excellent service! The team was professional and thorough. My home has never been cleaner. Highly recommend TrustFix!',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    serviceLabel: 'Pest Control',
    rating: 5,
    reviewText: 'Very effective pest control treatment. The technicians were knowledgeable and used safe products. No more cockroaches!',
  },
  {
    id: '3',
    name: 'Anita Reddy',
    serviceLabel: 'Painting',
    rating: 5,
    reviewText: 'Beautiful painting work done on our entire apartment. The finish is smooth and the colors are exactly as we wanted.',
  },
];

function ReviewCard({
  name,
  serviceLabel,
  rating,
  reviewText,
}: {
  name: string;
  serviceLabel: string;
  rating: number;
  reviewText: string;
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{serviceLabel}</p>
          <StarRating rating={rating} size={16} />
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed italic">"{reviewText}"</p>
    </div>
  );
}

export default function FeaturedReviewsCarousel() {
  const { actor, isFetching } = useActor();

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ['featured-reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedReviews();
    },
    enabled: !!actor && !isFetching,
  });

  if (reviews.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => {
          const serviceKey = Object.keys(review.service)[0] || 'other';
          return (
            <ReviewCard
              key={review.id}
              name={review.name}
              serviceLabel={serviceLabels[serviceKey] || 'Service'}
              rating={Number(review.rating)}
              reviewText={review.reviewText}
            />
          );
        })}
      </div>
    );
  }

  // Fallback static reviews when no backend data
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {FALLBACK_REVIEWS.map((review) => (
        <ReviewCard
          key={review.id}
          name={review.name}
          serviceLabel={review.serviceLabel}
          rating={review.rating}
          reviewText={review.reviewText}
        />
      ))}
    </div>
  );
}
