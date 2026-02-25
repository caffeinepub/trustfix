import StarRating from './StarRating';
import type { Review } from '../backend';

interface Props {
  review: Review;
}

const serviceLabels: Record<string, string> = {
  pestControl: 'Pest Control',
  deepCleaning: 'Cleaning',
  carpetUpholstery: 'Carpet & Upholstery',
  painting: 'Painting',
  other: 'Other Services',
};

export default function ReviewCard({ review }: Props) {
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const date = new Date(Number(review.date) / 1_000_000).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
          <p className="text-xs text-gray-500">{serviceLabels[review.service] || 'Service'}</p>
        </div>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <StarRating rating={Number(review.rating)} size={14} />
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{review.reviewText}</p>
    </div>
  );
}
