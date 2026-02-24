import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useGetApprovedReviews } from '@/hooks/useQueries';
import StarRating from './StarRating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedReviewsCarousel() {
  const { data: reviews, isLoading } = useGetApprovedReviews();
  const [featuredReviews, setFeaturedReviews] = useState<any[]>([]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Get up to 6 featured reviews
      const featured = reviews.slice(0, 6);
      setFeaturedReviews(featured);
    }
  }, [reviews]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!featuredReviews || featuredReviews.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
        <CardContent className="p-12 text-center">
          <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent>
        {featuredReviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-trustfix-green text-white">
                      {review.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.service}</p>
                  </div>
                </div>

                <StarRating rating={Number(review.rating)} readonly />

                <p className="text-gray-700 mt-4 flex-1 line-clamp-4">{review.reviewText}</p>

                <p className="text-xs text-gray-400 mt-4">
                  {new Date(Number(review.date) / 1000000).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
