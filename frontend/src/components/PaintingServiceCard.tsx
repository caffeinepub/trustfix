import { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Phone, CalendarCheck } from 'lucide-react';
import { ServiceItem } from '../data/services';

const WHATSAPP_URL = 'https://wa.me/918884447229';

interface PaintingServiceCardProps {
  service: ServiceItem;
  index?: number;
  onBookNow?: (serviceName: string) => void;
}

export default function PaintingServiceCard({ service, index = 0, onBookNow }: PaintingServiceCardProps) {
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
    const message = `Hi, I'm interested in ${service.name} painting service. Price: ${service.price}/sq.ft. Please provide more details.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openFreeInspection = () => {
    const message = `Hi, I'd like a Free Inspection for ${service.name} painting service.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(`${service.name} (Painting)`);
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-brand-orange text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          {service.price}/sq.ft
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-base mb-1">{service.name}</h3>

        {/* Including Labor & Material */}
        <div className="flex items-center gap-1 mb-2">
          <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
          <span className="text-xs text-green-600 font-medium">Including Labor & Material</span>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={12} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.8)</span>
        </div>

        {/* Features */}
        {service.features && (
          <ul className="space-y-1 mb-3 flex-1">
            {service.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{service.description}</p>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={openFreeInspection}
            className="flex-1 flex items-center justify-center gap-1 bg-brand-orange text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-brand-orange/90 transition-colors"
          >
            <Phone size={13} />
            Free Inspection
          </button>
          <button
            onClick={handleBookNow}
            className="flex-1 flex items-center justify-center gap-1 bg-brand-blue text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            <CalendarCheck size={13} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
