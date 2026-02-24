import { useState } from 'react';
import { useActor } from './useActor';
import { ServiceType } from '@/backend';

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  message: string;
}

export function useBookingSubmission() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitBooking = async (formData: BookingFormData) => {
    if (!actor) {
      alert('Backend not available. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Map service to ServiceType enum (simplified - using 'other' for most)
      const serviceType = ServiceType.other;

      // Submit to backend
      await actor.addBooking(
        formData.name,
        formData.phone,
        formData.email,
        serviceType,
        formData.address,
        formData.message
      );

      // Open WhatsApp with prefilled message
      const whatsappMessage = encodeURIComponent(
        `Hi TrustFix! I would like to book the following service:\n\n` +
          `Name: ${formData.name}\n` +
          `Phone: ${formData.phone}\n` +
          `Email: ${formData.email}\n` +
          `Service: ${formData.service}\n` +
          `Address: ${formData.address}\n` +
          `Message: ${formData.message}`
      );

      window.open(`https://wa.me/918884447229?text=${whatsappMessage}`, '_blank');

      setIsSuccess(true);
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
  };

  return { submitBooking, isSubmitting, isSuccess, reset };
}
