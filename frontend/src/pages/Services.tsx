import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { services, getWhatsAppLink } from '../data/services';
import CleaningServiceCard from '../components/CleaningServiceCard';
import PaintingServiceCard from '../components/PaintingServiceCard';
import SubcategoryCard from '../components/SubcategoryCard';
import PestControlCard from '../components/PestControlCard';

export default function Services() {
  const { serviceId } = useParams({ from: '/services/$serviceId' });
  const navigate = useNavigate();

  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-gray-500 text-lg mb-4">Service not found.</p>
        <button
          onClick={() => navigate({ to: '/' })}
          className="text-brand-blue font-medium hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const bookingServices = ['pest-control', 'cleaning', 'painting'];
  const showBookingForm = bookingServices.includes(service.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Back to All Services
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 overflow-hidden flex items-center justify-center">
              <img
                src={service.icon}
                alt={service.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = service.image;
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{service.name}</h1>
              <p className="text-white/80 text-sm mt-1">{service.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* PEST CONTROL */}
        {service.type === 'pest-control' && service.pestControlItems && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Pest Control Services</h2>
              {showBookingForm && (
                <a
                  href={getWhatsAppLink(`Hello TrustFix! I want to book Pest Control service.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-blue-dark transition-colors"
                >
                  Book Now
                </a>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.pestControlItems.map((item, i) => (
                <PestControlCard key={item.name} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* CLEANING */}
        {service.type === 'cleaning' && service.cleaningItems && (
          <div className="wave-section">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Cleaning Services</h2>
              {showBookingForm && (
                <a
                  href={getWhatsAppLink(`Hello TrustFix! I want to book a Cleaning service.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-blue-dark transition-colors"
                >
                  Book Now
                </a>
              )}
            </div>

            {/* Main cleaning cards (non-secondary) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {service.cleaningItems
                .filter((item) => !item.isSecondary)
                .map((item, i) => (
                  <CleaningServiceCard key={item.name} item={item} index={i} />
                ))}
            </div>

            {/* Secondary: Sofa & Mattress */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Upholstery & Mattress Cleaning</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                {service.cleaningItems
                  .filter((item) => item.isSecondary)
                  .map((item, i) => (
                    <CleaningServiceCard key={item.name} item={item} index={i} />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* PAINTING */}
        {service.type === 'painting' && service.paintingPackages && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Painting Packages</h2>
              {showBookingForm && (
                <a
                  href={getWhatsAppLink(`Hello TrustFix! I want a free inspection for painting.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-blue-dark transition-colors"
                >
                  Free Inspection
                </a>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.paintingPackages.map((pkg, i) => (
                <PaintingServiceCard key={pkg.name} pkg={pkg} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* QUOTE-ONLY (Electrical, Carpentry, AC, Appliances, Plumbing) */}
        {service.type === 'quote-only' && service.subcategories && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{service.name} Services</h2>
              <a
                href={getWhatsAppLink(`Hello TrustFix! I need ${service.name} service. Please provide a quote.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-blue-dark transition-colors"
              >
                Get Quote
              </a>
            </div>

            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-blue-900 text-sm">Get a Free Quote</p>
                <p className="text-blue-700 text-xs mt-0.5">
                  Our experts will visit your location and provide a transparent quote before starting any work.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.subcategories.map((item, i) => (
                <SubcategoryCard key={item.name} item={item} serviceName={service.name} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
