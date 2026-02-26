import { useState, useEffect } from 'react';
import { X, MessageCircle, Loader2 } from 'lucide-react';
import { getWhatsAppLink } from '../data/services';

interface BookingFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

interface FormData {
  name: string;
  mobile: string;
  address: string;
  service: string;
  propertyType: string;
  squareFeet: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const PROPERTY_TYPES = ['1BHK', '2BHK', '3BHK', 'Square Feet', 'Villa', 'Commercial'];

const NEEDS_PROPERTY_TYPE = ['Pest Control', 'Cleaning', 'Painting'];

function needsPropertyType(serviceName: string): boolean {
  return NEEDS_PROPERTY_TYPE.some((s) => serviceName.includes(s));
}

function isPaintingService(serviceName: string): boolean {
  return serviceName.toLowerCase().includes('painting') || serviceName.toLowerCase().includes('paint');
}

export default function BookingFormPopup({ isOpen, onClose, serviceName = '' }: BookingFormPopupProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    address: '',
    service: serviceName,
    propertyType: '',
    squareFeet: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, service: serviceName }));
      setErrors({});
    }
  }, [isOpen, serviceName]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
    if (needsPropertyType(formData.service) && !formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const paintingService = isPaintingService(formData.service);

    let message = `Hi TrustFix! I would like to book a service.\n\n`;
    message += `📋 *Service:* ${formData.service}\n`;
    message += `👤 *Name:* ${formData.name}\n`;
    message += `📱 *Mobile:* ${formData.mobile}\n`;
    message += `📍 *Address:* ${formData.address}\n`;
    if (formData.propertyType) {
      message += `🏠 *Property Type:* ${formData.propertyType}\n`;
    }
    if (paintingService && formData.squareFeet) {
      message += `📐 *Square Feet:* ${formData.squareFeet} sqft\n`;
    }
    message += `📅 *Preferred Date:* ${formData.preferredDate}\n`;
    message += `⏰ *Preferred Time:* ${formData.preferredTime}\n`;
    if (formData.notes.trim()) {
      message += `📝 *Notes:* ${formData.notes}\n`;
    }
    message += `\nThank you!`;

    const whatsappUrl = getWhatsAppLink(message);

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
      onClose();
    }, 500);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  const showPropertyType = needsPropertyType(formData.service);
  const showSquareFeet = isPaintingService(formData.service);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Book a Service</h2>
            <p className="text-blue-100 text-sm">Fill in your details below</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Service (auto-filled) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Selected Service
            </label>
            <input
              type="text"
              value={formData.service}
              onChange={(e) => handleChange('service', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Service name"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.mobile ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="10-digit mobile number"
              maxLength={10}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Enter your full address"
              rows={2}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Property Type (conditional) */}
          {showPropertyType && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleChange('propertyType', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                  errors.propertyType ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              >
                <option value="">Select property type</option>
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
              {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
            </div>
          )}

          {/* Square Feet (conditional for Painting) */}
          {showSquareFeet && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Square Feet
              </label>
              <input
                type="number"
                value={formData.squareFeet}
                onChange={(e) => handleChange('squareFeet', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter area in square feet"
                min="1"
              />
            </div>
          )}

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.preferredDate ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) => handleChange('preferredTime', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.preferredTime ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Any special requirements or notes..."
              rows={2}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Opening WhatsApp...
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                Confirm Booking via WhatsApp
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Your booking details will be sent via WhatsApp to our team
          </p>
        </form>
      </div>
    </div>
  );
}
