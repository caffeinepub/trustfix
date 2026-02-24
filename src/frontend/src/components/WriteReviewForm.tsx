import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReviewSubmission } from '@/hooks/useReviewSubmission';
import StarRating from './StarRating';
import SuccessPopup from './SuccessPopup';
import { servicesData } from '@/data/services';

export default function WriteReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    rating: 0,
    reviewText: '',
    photo: null as File | null,
  });

  const { submitReview, isSubmitting, isSuccess, reset } = useReviewSubmission();

  const allServices = Object.entries(servicesData).flatMap(([category, services]) =>
    services.map((service) => ({ name: service.name, category }))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    await submitReview(formData);
    setFormData({
      name: '',
      service: '',
      rating: 0,
      reviewText: '',
      photo: null,
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-xl max-w-2xl mx-auto">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="review-name">Your Name *</Label>
              <Input
                id="review-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-service">Service Used *</Label>
              <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {allServices.map((service, index) => (
                    <SelectItem key={index} value={service.name}>
                      {service.name} ({service.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Rating *</Label>
              <StarRating
                rating={formData.rating}
                onRatingChange={(rating) => handleChange('rating', rating)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-text">Your Review *</Label>
              <Textarea
                id="review-text"
                required
                value={formData.reviewText}
                onChange={(e) => handleChange('reviewText', e.target.value)}
                placeholder="Share your experience with us..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-photo">Photo (Optional)</Label>
              <Input
                id="review-photo"
                type="file"
                accept="image/*"
                onChange={(e) => handleChange('photo', e.target.files?.[0] || null)}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-trustfix-orange hover:bg-trustfix-orange/90 text-white py-6 text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isSuccess && (
        <SuccessPopup
          title="Review Submitted!"
          message="Thank you for your review! It will be visible after admin approval."
          onClose={reset}
        />
      )}
    </>
  );
}
