import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, MapPin, FileText, Home } from 'lucide-react';

interface BookingFormData {
  customerName: string;
  mobileNumber: string;
  address: string;
  selectedService: string;
  propertyType: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

interface BookingFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const PROPERTY_TYPES = ['1BHK', '2BHK', '3BHK', 'Square Feet', 'Villa', 'Commercial'];

export default function BookingFormPopup({ isOpen, onClose, selectedService }: BookingFormPopupProps) {
  const [form, setForm] = useState<BookingFormData>({
    customerName: '',
    mobileNumber: '',
    address: '',
    selectedService: selectedService,
    propertyType: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  // Sync selectedService when it changes
  useEffect(() => {
    setForm((prev) => ({ ...prev, selectedService }));
  }, [selectedService]);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setForm({
        customerName: '',
        mobileNumber: '',
        address: '',
        selectedService,
        propertyType: '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
      });
      setErrors({});
    }
  }, [isOpen, selectedService]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Partial<BookingFormData> = {};
    if (!form.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message =
      `Hello TrustFix,\nI want to book a service.\n\n` +
      `Name: ${form.customerName}\n` +
      `Phone: ${form.mobileNumber}\n` +
      `Address: ${form.address}\n` +
      `Service: ${form.selectedService}\n` +
      `Property Type: ${form.propertyType || 'Not specified'}\n` +
      `Date: ${form.preferredDate || 'Not specified'}\n` +
      `Time: ${form.preferredTime || 'Not specified'}\n` +
      `Notes: ${form.notes || 'None'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918884447229?text=${encodedMessage}`, '_blank');
    onClose();
  };

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Book a Service</h2>
            <p className="text-xs text-gray-500 mt-0.5">Fill in your details and we'll confirm via WhatsApp</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Customer Name */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
              <User size={14} className="text-brand-blue" />
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              placeholder="Enter your full name"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                errors.customerName ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            />
            {errors.customerName && (
              <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
              <Phone size={14} className="text-brand-blue" />
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.mobileNumber}
              onChange={(e) => handleChange('mobileNumber', e.target.value)}
              placeholder="Enter your mobile number"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                errors.mobileNumber ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            />
            {errors.mobileNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.mobileNumber}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
              <MapPin size={14} className="text-brand-blue" />
              Address / Location <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter your full address"
              rows={2}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 resize-none ${
                errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Selected Service (auto-filled, read-only) */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
              <FileText size={14} className="text-brand-blue" />
              Selected Service
            </label>
            <input
              type="text"
              value={form.selectedService}
              readOnly
              className="w-full border border-gray-200 bg-blue-50 rounded-xl px-4 py-2.5 text-sm text-brand-blue font-medium cursor-not-allowed"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
              <Home size={14} className="text-brand-blue" />
              Property Type
            </label>
            <select
              value={form.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 appearance-none cursor-pointer"
            >
              <option value="">Select property type</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date & Time row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
                <Calendar size={14} className="text-brand-blue" />
                Preferred Date
              </label>
              <input
                type="date"
                value={form.preferredDate}
                onChange={(e) => handleChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
                <Clock size={14} className="text-brand-blue" />
                Preferred Time
              </label>
              <input
                type="time"
                value={form.preferredTime}
                onChange={(e) => handleChange('preferredTime', e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
              <FileText size={14} className="text-brand-blue" />
              Notes / Problem Description
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Describe your problem or any special requirements..."
              rows={3}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-base shadow-md"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send Booking via WhatsApp
          </button>

          <p className="text-center text-xs text-gray-400">
            Your booking details will be sent to TrustFix via WhatsApp
          </p>
        </form>
      </div>
    </div>
  );
}
