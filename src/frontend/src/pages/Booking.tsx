import { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import SuccessPopup from '@/components/SuccessPopup';
import { servicesData } from '@/data/services';

export default function Booking() {
  const search = useSearch({ strict: false }) as { service?: string };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    address: '',
    message: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { submitBooking, isSubmitting, isSuccess, reset } = useBookingSubmission();

  useEffect(() => {
    if (search.service) {
      setFormData((prev) => ({ ...prev, service: search.service || '' }));
    }
  }, [search.service]);

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

  const allServices = Object.entries(servicesData).flatMap(([category, services]) =>
    services.map((service) => ({ name: service.name, category }))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBooking(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Book a Service</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you shortly
          </p>
        </div>

        <Card className="glass-panel border-gray-200 shadow-glass-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Service Booking Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="service">Select Service *</Label>
                <Select 
                  value={formData.service} 
                  onValueChange={(value) => handleChange('service', value)}
                  onOpenChange={setIsDropdownOpen}
                  required
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent 
                    className="max-h-[260px] overflow-y-auto z-[9999]"
                    style={{
                      WebkitOverflowScrolling: 'touch',
                      overscrollBehavior: 'contain',
                    }}
                  >
                    {allServices.map((service, index) => (
                      <SelectItem key={index} value={service.name}>
                        {service.name} ({service.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address">Service Address *</Label>
                <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter your complete address"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Any specific requirements or questions?"
                  className="mt-2"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-trustfix-green hover:bg-trustfix-green/90 text-white py-6 text-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Book Now'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isSuccess && (
          <SuccessPopup
            title="Booking Confirmed!"
            message="Your booking has been submitted successfully. We'll contact you shortly."
            onClose={reset}
          />
        )}
      </div>
    </div>
  );
}
