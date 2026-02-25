import { useState, useEffect, useRef } from 'react';
import { Phone, CheckCircle, CalendarCheck } from 'lucide-react';
import { ServiceItem } from '../data/services';

const WHATSAPP_URL = 'https://wa.me/918884447229';

interface ServiceCardProps {
  service: ServiceItem;
  categoryId: string;
  index?: number;
  onBookNow?: (serviceName: string) => void;
}

export default function ServiceCard({ service, categoryId, index = 0, onBookNow }: ServiceCardProps) {
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

  const openWhatsApp = () => {
    const message = `Hi, I'm interested in ${service.name}. Price: ${service.price}. Please confirm availability.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(`${service.name} (Pest Control)`);
    } else {
      openWhatsApp();
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
      <div className="relative h-44 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 right-3 bg-brand-blue text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          {service.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-base mb-1">{service.name}</h3>
        {service.priceNote && (
          <p className="text-xs text-gray-500 mb-2">{service.priceNote}</p>
        )}

        {/* Features */}
        {service.features && (
          <ul className="space-y-1 mb-3 flex-1">
            {service.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{service.description}</p>

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={openWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Phone size={13} />
            WhatsApp
          </button>
          <button
            onClick={handleBookNow}
            className="flex-1 flex items-center justify-center gap-1.5 bg-brand-blue text-white text-sm font-semibold py-2.5 px-3 rounded-xl hover:bg-brand-blue/90 transition-colors"
          >
            <CalendarCheck size={13} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
