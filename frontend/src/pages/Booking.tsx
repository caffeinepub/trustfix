import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User, FileText, Home, ChevronDown } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/918884447229';

const SERVICES_WITH_PROPERTY = ['pest-control', 'cleaning', 'painting', 'Pest Control', 'Cleaning', 'Painting'];

const serviceOptions = [
  { value: 'pest-control', label: 'Pest Control' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'painting', label: 'Painting' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'ac-services', label: 'AC Services' },
  { value: 'appliances-repair', label: 'Appliances Repair' },
  { value: 'plumbing', label: 'Plumbing' },
];

const propertyOptions = [
  { value: '1bhk', label: '1BHK' },
  { value: '2bhk', label: '2BHK' },
  { value: '3bhk', label: '3BHK' },
  { value: 'square-feet', label: 'Square Feet' },
  { value: 'villa', label: 'Villa' },
  { value: 'commercial', label: 'Commercial' },
];

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM',
];

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
    propertyType: '',
    squareFeet: '',
    date: '',
    time: '',
    notes: '',
  });

  const showPropertyType = SERVICES_WITH_PROPERTY.includes(formData.service);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Reset property type when service changes to non-property service
      if (field === 'service' && !SERVICES_WITH_PROPERTY.includes(value)) {
        updated.propertyType = '';
        updated.squareFeet = '';
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service = serviceOptions.find((s) => s.value === formData.service)?.label || formData.service;
    const property = propertyOptions.find((p) => p.value === formData.propertyType)?.label || formData.propertyType;

    let message = `Hi TrustFix! I'd like to book a service.\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*Service:* ${service}\n`;
    if (showPropertyType && formData.propertyType) {
      message += `*Property Type:* ${property}\n`;
    }
    if (showPropertyType && formData.squareFeet) {
      message += `*Square Feet:* ${formData.squareFeet}\n`;
    }
    message += `*Address:* ${formData.address}\n`;
    message += `*Date:* ${formData.date}\n`;
    message += `*Time:* ${formData.time}\n`;
    if (formData.notes) {
      message += `*Notes:* ${formData.notes}\n`;
    }

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book a Service</h1>
          <p className="text-gray-500">Fill in the details below and we'll confirm via WhatsApp</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Phone size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-800">WhatsApp Booking</p>
            <p className="text-xs text-green-700 mt-0.5">
              Your booking details will be sent directly to our team via WhatsApp for instant confirmation.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-2"><User size={15} /> Full Name *</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-2"><Phone size={15} /> Phone Number *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-2"><FileText size={15} /> Service Required *</span>
            </label>
            <div className="relative">
              <select
                required
                value={formData.service}
                onChange={(e) => handleChange('service', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors appearance-none bg-white"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Property Type — only for Pest Control, Cleaning, Painting */}
          {showPropertyType && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-2"><Home size={15} /> Property Type</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleChange('propertyType', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors appearance-none bg-white"
                  >
                    <option value="">Select property type</option>
                    {propertyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Square Feet — shown when Square Feet is selected */}
              {formData.propertyType === 'square-feet' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Square Feet Area
                  </label>
                  <input
                    type="number"
                    value={formData.squareFeet}
                    onChange={(e) => handleChange('squareFeet', e.target.value)}
                    placeholder="Enter area in sq.ft"
                    min="1"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
                  />
                </div>
              )}
            </>
          )}

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-2"><MapPin size={15} /> Address *</span>
            </label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter your full address"
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors resize-none"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <span className="flex items-center gap-2"><Calendar size={15} /> Date *</span>
              </label>
              <input
                type="date"
                required
                min={today}
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <span className="flex items-center gap-2"><Clock size={15} /> Time *</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors appearance-none bg-white"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-2"><FileText size={15} /> Additional Notes</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any specific requirements or details..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-base shadow-md"
          >
            <Phone size={18} />
            Send Booking via WhatsApp
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          By submitting, you agree to be contacted via WhatsApp for booking confirmation.
        </p>
      </div>
    </div>
  );
}
