import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ServiceType } from '@/backend';

export function useGetApprovedReviews() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['reviews', 'approved'],
    queryFn: async () => {
      if (!actor) return [];
      // Get all approved reviews across all service types
      const allReviews = await Promise.all([
        actor.getApprovedReviewsByService(ServiceType.pestControl),
        actor.getApprovedReviewsByService(ServiceType.residentialDeepCleaning),
        actor.getApprovedReviewsByService(ServiceType.commercialCleaning),
        actor.getApprovedReviewsByService(ServiceType.carpetUpholstery),
        actor.getApprovedReviewsByService(ServiceType.other),
      ]);
      return allReviews.flat();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}
