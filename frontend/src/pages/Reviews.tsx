import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import ReviewCard from '../components/ReviewCard';
import WriteReviewForm from '../components/WriteReviewForm';
import type { Review } from '../backend';

export default function Reviews() {
  const { actor, isFetching } = useActor();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
          <p className="text-gray-500 text-sm">See what our customers say about TrustFix</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 animate-pulse">
                    <div className="flex gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
                        <div className="h-3 bg-gray-100 rounded w-16" />
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-10 text-center">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>

          {/* Write Review */}
          <div className="lg:col-span-1">
            <WriteReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
}
