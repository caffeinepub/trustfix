import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useGetApprovedReviews } from '@/hooks/useQueries';
import ReviewCard from '@/components/ReviewCard';
import WriteReviewForm from '@/components/WriteReviewForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { servicesData } from '@/data/services';

export default function Reviews() {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say about our services
          </p>

          {reviews && reviews.length > 0 && (
            <Card className="glass-panel border-gray-200 shadow-glass-lg mt-8 max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-8 w-8 fill-trustfix-orange text-trustfix-orange" />
                  <span className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                </div>
                <p className="text-gray-600 mt-2">Average Rating from {reviews.length} reviews</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mb-8">
          <Label htmlFor="category-filter" className="text-lg font-semibold mb-2 block">
            Filter by Service
          </Label>
          <Select 
            value={filterCategory} 
            onValueChange={setFilterCategory}
            onOpenChange={setIsDropdownOpen}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent 
              className="max-h-[260px] overflow-y-auto z-[9999]"
              style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
              }}
            >
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="glass-panel border-gray-200 shadow-glass-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
          ) : filteredReviews.length > 0 ? (
            filteredReviews.map((review) => <ReviewCard key={review.id} review={review} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No reviews found for this category.</p>
            </div>
          )}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Write a Review</h2>
          <WriteReviewForm />
        </div>
      </div>
    </div>
  );
}
