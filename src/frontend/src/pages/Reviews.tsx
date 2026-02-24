import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useGetApprovedReviews } from '@/hooks/useQueries';
import ReviewCard from '@/components/ReviewCard';
import WriteReviewForm from '@/components/WriteReviewForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { servicesData } from '@/data/services';

export default function Reviews() {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const { data: reviews, isLoading } = useGetApprovedReviews();

  const categories = ['All', ...Object.keys(servicesData)];

  const filteredReviews =
    filterCategory === 'All'
      ? reviews || []
      : reviews?.filter((review) => review.service === filterCategory) || [];

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length
      : 0;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say about our services
          </p>
        </div>

        {/* Average Rating */}
        {reviews && reviews.length > 0 && (
          <Card className="glass-panel bg-gradient-to-br from-trustfix-green/10 to-trustfix-orange/10 border-gray-200 mb-8 shadow-glass">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                <span className="text-5xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Filter */}
        <div className="mb-8">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-64 glass-panel shadow-glass">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="glass-panel shadow-glass">
                <CardContent className="p-6">
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <Card className="glass-panel border-gray-200 mb-12 shadow-glass">
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">
                {filterCategory === 'All'
                  ? 'No reviews yet. Be the first to share your experience!'
                  : `No reviews for ${filterCategory} yet.`}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Write Review Form */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Write a Review</h2>
          <WriteReviewForm />
        </div>
      </div>
    </div>
  );
}
