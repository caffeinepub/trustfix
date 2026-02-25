import { useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { categoryOrder, servicesData } from '../data/services';
import PaintingServiceCard from '../components/PaintingServiceCard';
import CleaningServiceCard from '../components/CleaningServiceCard';
import SubcategoryCard from '../components/SubcategoryCard';
import ServiceCard from '../components/ServiceCard';
import BookingFormPopup from '../components/BookingFormPopup';

const WHATSAPP_URL = 'https://wa.me/918884447229';

function openWhatsApp(message?: string) {
  const url = message
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_URL;
  window.open(url, '_blank');
}

// Cleaning page layout order
const CLEANING_TOP_IDS = ['bathroom-cleaning', 'kitchen-cleaning', 'home-cleaning'];
const CLEANING_BELOW_IDS = ['sofa-cleaning', 'mattress-cleaning'];
const CLEANING_INSPECTION_IDS = ['villa-cleaning', 'commercial-cleaning', 'carpet-cleaning'];

export default function Services() {
  const navigate = useNavigate();

  // Read category from URL search params manually to avoid router type issues
  const [categoryId, setCategoryId] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('category') || undefined;
    }
    return undefined;
  });

  // Booking popup state
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('');

  const handleBookNow = (serviceName: string) => {
    setSelectedServiceName(serviceName);
    setIsBookingPopupOpen(true);
  };

  // Also handle /services/$serviceId legacy route
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const servicesIdx = pathParts.indexOf('services');
    if (servicesIdx !== -1 && pathParts[servicesIdx + 1]) {
      const legacyId = pathParts[servicesIdx + 1];
      if (servicesData[legacyId]) {
        setCategoryId(legacyId);
      }
    }
    // Also check search params on mount/navigation
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) setCategoryId(cat);
  }, []);

  // Listen for popstate to handle back/forward
  useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      setCategoryId(cat || undefined);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const handleSelectCategory = (id: string) => {
    setCategoryId(id);
    // Update URL without full navigation to avoid router type issues
    const url = new URL(window.location.href);
    url.pathname = '/services';
    url.searchParams.set('category', id);
    window.history.pushState({}, '', url.toString());
  };

  const handleBack = () => {
    setCategoryId(undefined);
    const url = new URL(window.location.href);
    url.pathname = '/services';
    url.searchParams.delete('category');
    window.history.pushState({}, '', url.toString());
  };

  // If no category selected, show category selection grid
  if (!categoryId || !servicesData[categoryId]) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Our Services</h1>
            <p className="text-gray-500">Select a service to view details and book</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categoryOrder.map((id) => {
              const cat = servicesData[id];
              if (!cat) return null;
              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100 hover:-translate-y-1"
                  onClick={() => handleSelectCategory(id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectCategory(id)}
                >
                  <div className="relative overflow-hidden h-36">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 text-sm group-hover:text-brand-blue transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{cat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const category = servicesData[categoryId];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">All Services</span>
            </button>
            <div className="h-5 w-px bg-gray-200" />
            <h1 className="text-lg font-bold text-gray-800">{category.name}</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Category description */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name} Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{category.description}</p>
          </div>

          {/* PAINTING */}
          {categoryId === 'painting' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, index) => (
                  <PaintingServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={() => openWhatsApp('Hi, I need a Free Inspection for Painting service.')}
                  className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-orange/90 transition-colors shadow-md"
                >
                  <Phone size={18} />
                  Free Inspection
                </button>
              </div>
            </div>
          )}

          {/* CLEANING */}
          {categoryId === 'cleaning' && (
            <div>
              {/* Top section: Bathroom, Kitchen, Home Cleaning */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Cleaning Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CLEANING_TOP_IDS.map((id, index) => {
                    const service = category.services.find((s) => s.id === id);
                    if (!service) return null;
                    return (
                      <CleaningServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                        onBookNow={handleBookNow}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Below section: Sofa, Mattress */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Upholstery & Mattress</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                  {CLEANING_BELOW_IDS.map((id, index) => {
                    const service = category.services.find((s) => s.id === id);
                    if (!service) return null;
                    return (
                      <CleaningServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                        onBookNow={handleBookNow}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Inspection flow: Villa, Commercial, Carpet */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Specialized Cleaning</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CLEANING_INSPECTION_IDS.map((id, index) => {
                    const service = category.services.find((s) => s.id === id);
                    if (!service) return null;
                    return (
                      <CleaningServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                        onBookNow={handleBookNow}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PEST CONTROL */}
          {categoryId === 'pest-control' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  categoryId={categoryId}
                  index={index}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}

          {/* ELECTRICAL, CARPENTRY, AC SERVICES, APPLIANCES REPAIR, PLUMBING */}
          {['electrical', 'carpentry', 'ac-services', 'appliances-repair', 'plumbing'].includes(categoryId) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, index) => (
                <SubcategoryCard
                  key={service.id}
                  service={service}
                  categoryName={category.name}
                  index={index}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-12 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Need Help Choosing?</h3>
            <p className="text-gray-500 mb-4">Chat with us on WhatsApp for instant assistance and booking.</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors shadow-md"
            >
              <Phone size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Booking Popup */}
      <BookingFormPopup
        isOpen={isBookingPopupOpen}
        onClose={() => setIsBookingPopupOpen(false)}
        selectedService={selectedServiceName}
      />
    </>
  );
}
