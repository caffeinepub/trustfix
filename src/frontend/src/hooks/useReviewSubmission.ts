import { useState } from 'react';
import { useActor } from './useActor';
import { ServiceType, ExternalBlob } from '@/backend';
import { useQueryClient } from '@tanstack/react-query';

interface ReviewFormData {
  name: string;
  service: string;
  rating: number;
  reviewText: string;
  photo: File | null;
}

export function useReviewSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitReview = async (formData: ReviewFormData) => {
    if (!actor) {
      alert('Backend not available. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Map service to ServiceType enum (simplified - using 'other' for most)
      const serviceType = ServiceType.other;

      // Handle photo upload if present
      let photoBlob: ExternalBlob | null = null;
      if (formData.photo) {
        const arrayBuffer = await formData.photo.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        photoBlob = ExternalBlob.fromBytes(uint8Array);
      }

      // Submit to backend
      await actor.addReview(
        formData.name,
        serviceType,
        BigInt(formData.rating),
        formData.reviewText,
        photoBlob
      );

      // Invalidate reviews query to refresh data
      queryClient.invalidateQueries({ queryKey: ['reviews'] });

      setIsSuccess(true);
    } catch (error) {
      console.error('Review submission error:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
  };

  return { submitReview, isSubmitting, isSuccess, reset };
}
