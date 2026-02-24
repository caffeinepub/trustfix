import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from './StarRating';
import type { Review } from '@/backend';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar>
            {review.photo ? (
              <AvatarImage src={review.photo.getDirectURL()} alt={review.name} />
            ) : (
              <AvatarFallback className="bg-trustfix-green text-white">
                {review.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900">{review.name}</h4>
            <p className="text-sm text-gray-500">{review.service}</p>
          </div>
        </div>

        <StarRating rating={Number(review.rating)} readonly />

        <p className="text-gray-700 mt-4 flex-1">{review.reviewText}</p>

        <p className="text-xs text-gray-400 mt-4">
          {new Date(Number(review.date) / 1000000).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
