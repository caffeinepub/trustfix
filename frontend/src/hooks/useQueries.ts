import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Review, Booking } from '../backend';

export function useGetFeaturedReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ['featured-reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ['all-bookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}
