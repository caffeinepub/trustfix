import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { ServiceType } from '../backend';
import StarRating from './StarRating';

const serviceOptions = [
  { value: ServiceType.pestControl, label: 'Pest Control' },
  { value: ServiceType.deepCleaning, label: 'Cleaning' },
  { value: ServiceType.painting, label: 'Painting' },
  { value: ServiceType.carpetUpholstery, label: 'Carpet & Upholstery' },
  { value: ServiceType.other, label: 'Other Services' },
];

export default function WriteReviewForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [service, setService] = useState<ServiceType>(ServiceType.deepCleaning);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Not connected');
      await actor.addReview(name, service, BigInt(rating), reviewText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['all-reviews'] });
      setSubmitted(true);
      setName('');
      setReviewText('');
      setRating(5);
    },
  });

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-bold text-green-800 text-lg mb-1">Thank You!</h3>
        <p className="text-green-700 text-sm">Your review has been submitted successfully.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-brand-blue text-sm font-medium hover:underline"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name || !reviewText) return;
        mutation.mutate();
      }}
      className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 space-y-4"
    >
      <h3 className="font-bold text-gray-900 text-lg">Write a Review</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value as ServiceType)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
        >
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
        <StarRating rating={rating} interactive onRate={setRating} size={24} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          rows={4}
          placeholder="Share your experience..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending || !name || !reviewText}
        className="w-full bg-brand-blue text-white font-semibold py-3 rounded-xl hover:bg-brand-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {mutation.isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </>
        ) : 'Submit Review'}
      </button>

      {mutation.isError && (
        <p className="text-red-500 text-sm text-center">Failed to submit. Please try again.</p>
      )}
    </form>
  );
}
