import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ServiceType, PropertyType } from '../backend';
import { getWhatsAppLink } from '../data/services';

interface BookingData {
  name: string;
  phone: string;
  address: string;
  service: ServiceType;
  propertyType: PropertyType;
  date: string;
  time: string;
  notes: string;
}

export function useBookingSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookingData) => {
      if (!actor) throw new Error('Not connected');
      await actor.addBooking(
        data.name,
        data.phone,
        data.address,
        data.service,
        data.propertyType,
        data.date,
        data.time,
        data.notes
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['all-bookings'] });
      const msg = `Hello TrustFix! Booking confirmed.\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nAddress: ${data.address}\nDate: ${data.date}\nTime: ${data.time}`;
      window.open(getWhatsAppLink(msg), '_blank');
    },
  });
}
