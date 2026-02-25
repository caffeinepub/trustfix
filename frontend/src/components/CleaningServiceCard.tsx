import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Phone, ArrowRight, CalendarCheck } from 'lucide-react';
import { ServiceItem } from '../data/services';

const WHATSAPP_URL = 'https://wa.me/918884447229';

interface CleaningServiceCardProps {
  service: ServiceItem;
  index?: number;
  onBookNow?: (serviceName: string) => void;
}

export default function CleaningServiceCard({ service, index = 0, onBookNow }: CleaningServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const openWhatsApp = (msg?: string) => {
    const message = msg || `Hi, I'm interested in ${service.name}. Please provide more details.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isInspection = service.variant === 'inspection';
  const isPackage = service.variant === 'package';

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(`${service.name} (Cleaning)`);
    } else {
      openWhatsApp(`Hi, I'd like to book ${service.name}. Price: ${service.price}. Please confirm availability.`);
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
        transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Price badge */}
        {!isInspection && (
          <div className="absolute top-3 right-3 bg-brand-blue text-white text-sm font-bold px-3 py-1 rounded-full shadow">
            {service.price}
          </div>
        )}
        {isInspection && (
          <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            Free Inspection
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-base mb-1">{service.name}</h3>

        {/* Inspection flow label */}
        {isInspection && (
          <div className="flex items-center gap-1 mb-2 flex-wrap">
            <span className="text-xs font-semibold text-brand-orange">Free Inspection</span>
            <ArrowRight size={12} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-600">Quote</span>
            <ArrowRight size={12} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-600">Service</span>
          </div>
        )}

        {/* Price note */}
        {!isInspection && service.priceNote && (
          <p className="text-xs text-gray-500 mb-2">{service.priceNote}</p>
        )}

        {/* Package sub-items */}
        {isPackage && service.subItems && (
          <div className="mb-3 space-y-1">
            {service.subItems.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold text-brand-blue">{item.price}</span>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        {service.features && !isPackage && (
          <ul className="space-y-1 mb-3 flex-1">
            {service.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{service.description}</p>

        {/* CTA Buttons */}
        <div className="mt-auto">
          {isInspection ? (
            <div className="flex gap-2">
              <button
                onClick={() => openWhatsApp(`Hi, I'd like a Free Inspection for ${service.name}. Please contact me.`)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-brand-orange text-white text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-brand-orange/90 transition-colors"
              >
                <Phone size={13} />
                Free Inspection
              </button>
              <button
                onClick={handleBookNow}
                className="flex-1 flex items-center justify-center gap-1.5 bg-brand-blue text-white text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-brand-blue/90 transition-colors"
              >
                <CalendarCheck size={13} />
                Book Now
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => openWhatsApp(`Hi, I'd like to book ${service.name}. Price: ${service.price}. Please confirm availability.`)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Phone size={13} />
                WhatsApp
              </button>
              <button
                onClick={handleBookNow}
                className="flex-1 flex items-center justify-center gap-1.5 bg-brand-blue text-white text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-brand-blue/90 transition-colors"
              >
                <CalendarCheck size={13} />
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
