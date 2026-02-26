import { useState } from 'react';
import { useSearch } from '@tanstack/react-router';
import { ChevronDown, ChevronUp, Star, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { servicesData, categoryOrder, getWhatsAppLink, WHATSAPP_NUMBER, type Subcategory, type PaintingPackage } from '../data/services';
import BookingFormPopup from '../components/BookingFormPopup';

// ─── Painting Package Card ────────────────────────────────────────────────────
function PaintingPackageCard({
  pkg,
  onBookNow,
}: {
  pkg: PaintingPackage;
  onBookNow: (name: string) => void;
}) {
  const whatsappMsg = `Hi TrustFix, I'm interested in the ${pkg.name} painting package at Rs. ${pkg.pricePerSqft}/sqft. Please provide more details.`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/painting-service.dim_800x600.png';
          }}
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          Rs. {pkg.pricePerSqft}/sqft
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{pkg.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{pkg.label}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs font-semibold text-gray-700 ml-1">{pkg.rating}</span>
          <span className="text-xs text-gray-400">({pkg.reviewCount} reviews)</span>
        </div>

        {/* Jobs completed */}
        <p className="text-xs text-green-600 font-medium mb-3">
          ✅ Completed {pkg.jobCount} Jobs in Last 24 days
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-400 line-through text-sm">Rs. {pkg.oldPricePerSqft}/sqft</span>
          <span className="text-blue-700 font-bold text-lg">Rs. {pkg.pricePerSqft}/sqft</span>
        </div>

        {/* Features */}
        <ul className="space-y-1 mb-4 flex-1">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="space-y-2 mt-auto">
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
          >
            Free Inspection
          </a>
          <button
            onClick={() => onBookNow(`${pkg.name} (Painting)`)}
            className="block w-full text-center border-2 border-blue-600 text-blue-600 text-sm font-semibold py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            Book Now
          </button>
          <button
            onClick={() => {
              const msg = `Hi TrustFix, I'd like to know more about the ${pkg.name} painting package.`;
              window.open(getWhatsAppLink(msg), '_blank');
            }}
            className="block w-full text-center text-blue-600 text-xs underline py-1"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Subcategory Card ─────────────────────────────────────────────────────────
function SubcategoryCardInline({
  sub,
  onBookNow,
}: {
  sub: Subcategory;
  onBookNow: (name: string) => void;
}) {
  const whatsappMsg = `Hi TrustFix, I'm interested in ${sub.name}. Please provide more details.`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img
          src={sub.image}
          alt={sub.name}
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/pest-control-service.dim_800x600.png';
          }}
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full max-w-[80%] truncate">
          {sub.price}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{sub.name}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-1">{sub.description}</p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {sub.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="space-y-2 mt-auto">
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            Get Quote
          </a>
          <button
            onClick={() => onBookNow(`${sub.name}${sub.category ? ` (${sub.category})` : ''}`)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Service Card ────────────────────────────────────────────────────────
function MainServiceCard({
  service,
  isExpanded,
  onToggle,
  onBookNow,
}: {
  service: { id: string; name: string; description: string; price: string; image: string; features: string[]; subcategories?: Subcategory[]; packages?: PaintingPackage[] };
  isExpanded: boolean;
  onToggle: () => void;
  onBookNow: (name: string) => void;
}) {
  const hasExpandable = (service.subcategories && service.subcategories.length > 0) || (service.packages && service.packages.length > 0);
  const whatsappMsg = `Hi TrustFix, I'm interested in ${service.name}. Please provide more details.`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Card Header */}
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/pest-control-service.dim_800x600.png';
          }}
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {service.price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-2">{service.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{service.description}</p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={() => onBookNow(`${service.name}`)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
          >
            Book Now
          </button>

          {/* Expand/Collapse Button */}
          {hasExpandable && (
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 text-sm font-semibold py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Subcategories
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  View All Options
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Subcategories / Packages */}
      {hasExpandable && isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          {/* Painting Packages */}
          {service.packages && service.packages.length > 0 && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full inline-block"></span>
                Painting Packages (Price Per Sqft)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.packages.map((pkg) => (
                  <PaintingPackageCard key={pkg.id} pkg={pkg} onBookNow={onBookNow} />
                ))}
              </div>
            </div>
          )}

          {/* Subcategories */}
          {service.subcategories && service.subcategories.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full inline-block"></span>
                {service.packages && service.packages.length > 0 ? 'Additional Services' : 'Subcategories'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.subcategories.map((sub) => (
                  <SubcategoryCardInline key={sub.id} sub={sub} onBookNow={onBookNow} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Services Page ────────────────────────────────────────────────────────────
export default function Services() {
  const search = useSearch({ from: '/services' });
  const categoryParam = (search as { category?: string }).category;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam && servicesData[categoryParam] ? categoryParam : categoryOrder[0]
  );
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('');

  const currentCategory = servicesData[selectedCategory];

  const toggleService = (serviceId: string) => {
    setExpandedServices((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  };

  const handleBookNow = (serviceName: string) => {
    setSelectedServiceName(serviceName);
    setIsBookingPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-blue-100 text-lg">Professional home services at your doorstep</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {categoryOrder.map((catId) => {
              const cat = servicesData[catId];
              return (
                <button
                  key={catId}
                  onClick={() => setSelectedCategory(catId)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === catId
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentCategory && (
          <>
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {currentCategory.icon} {currentCategory.name}
              </h2>
              <p className="text-gray-600">{currentCategory.description}</p>
            </div>

            {/* Services Grid */}
            <div className="space-y-6">
              {currentCategory.services.map((service) => (
                <MainServiceCard
                  key={service.id}
                  service={service}
                  isExpanded={expandedServices.has(service.id)}
                  onToggle={() => toggleService(service.id)}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Booking Popup */}
      <BookingFormPopup
        isOpen={isBookingPopupOpen}
        onClose={() => setIsBookingPopupOpen(false)}
        serviceName={selectedServiceName}
      />
    </div>
  );
}
