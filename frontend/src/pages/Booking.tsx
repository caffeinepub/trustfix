import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useActor } from '../hooks/useActor';
import { useMutation } from '@tanstack/react-query';
import { ServiceType, PropertyType } from '../backend';
import { getWhatsAppLink, PHONE_NUMBER } from '../data/services';

const bookingServices = [
  { value: ServiceType.pestControl, label: 'Pest Control', hasPropertyType: true },
  { value: ServiceType.deepCleaning, label: 'Cleaning', hasPropertyType: true },
  { value: ServiceType.painting, label: 'Painting', hasPropertyType: true },
  { value: ServiceType.carpetUpholstery, label: 'Carpet & Upholstery', hasPropertyType: false },
  { value: ServiceType.other, label: 'Other Services', hasPropertyType: false },
];

const propertyTypes = [
  { value: PropertyType.oneBhk, label: '1BHK' },
  { value: PropertyType.twoBhk, label: '2BHK' },
  { value: PropertyType.threeBhk, label: '3BHK' },
  { value: PropertyType.squareFeet, label: 'Square Feet' },
  { value: PropertyType.villa, label: 'Villa' },
  { value: PropertyType.commercial, label: 'Commercial' },
];

export default function Booking() {
  const { actor } = useActor();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState<ServiceType>(ServiceType.deepCleaning);
  const [propertyType, setPropertyType] = useState<PropertyType>(PropertyType.oneBhk);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedService = bookingServices.find((s) => s.value === service);
  const showPropertyType = selectedService?.hasPropertyType ?? false;

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Not connected');
      await actor.addBooking(name, phone, address, service, propertyType, date, time, notes);
    },
    onSuccess: () => {
      const propLabel = showPropertyType
        ? propertyTypes.find((p) => p.value === propertyType)?.label || ''
        : '';
      const msg = `Hello TrustFix! I've submitted a booking request.\n\nName: ${name}\nPhone: ${phone}\nService: ${selectedService?.label}\n${propLabel ? `Property: ${propLabel}\n` : ''}Address: ${address}\nDate: ${date}\nTime: ${time}\n${notes ? `Notes: ${notes}` : ''}`;
      window.open(getWhatsAppLink(msg), '_blank');
      setSubmitted(true);
    },
  });

  const handleQuoteOnly = () => {
    const msg = `Hello TrustFix! I need ${selectedService?.label} service. Please provide a quote.\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-card p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Your booking request has been submitted. Our team will contact you shortly.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="bg-brand-blue text-white font-semibold py-3 rounded-xl hover:bg-brand-blue-dark transition-colors"
            >
              📞 Call Now
            </a>
            <button
              onClick={() => navigate({ to: '/' })}
              className="border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Book a Service</h1>
          <p className="text-gray-500 text-sm">Fill in the details and we'll get back to you shortly</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (showPropertyType) {
                mutation.mutate();
              } else {
                handleQuoteOnly();
              }
            }}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="10-digit mobile number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value as ServiceType)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              >
                {bookingServices.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Property Type — only for Pest Control, Cleaning, Painting */}
            {showPropertyType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                >
                  {propertyTypes.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={2}
                placeholder="Your full address"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                >
                  <option value="">Select time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any specific requirements or notes..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
              />
            </div>

            {/* Submit */}
            {showPropertyType ? (
              <button
                type="submit"
                disabled={mutation.isPending || !name || !phone || !address}
                className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl hover:bg-brand-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                {mutation.isPending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Booking...
                  </>
                ) : '📅 Confirm Booking'}
              </button>
            ) : (
              <button
                type="submit"
                disabled={!name || !phone}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                💬 Get Quote on WhatsApp
              </button>
            )}

            {mutation.isError && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          By submitting, you agree to be contacted by TrustFix for service-related communication.
        </p>
      </div>
    </div>
  );
}
