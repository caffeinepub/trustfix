import { Phone, CheckCircle, CalendarCheck } from 'lucide-react';
import { getWhatsAppLink } from '../data/services';
import type { ServiceItem } from '../data/services';

interface Props {
  service: ServiceItem;
  index?: number;
  onBookNow?: (serviceName: string) => void;
}

export default function PestControlCard({ service, index = 0, onBookNow }: Props) {
  const whatsappMsg = `Hello TrustFix! I need ${service.name}. Price: ${service.price}. Please provide details and booking options.`;

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(`${service.name} (Pest Control)`);
    } else {
      window.open(getWhatsAppLink(whatsappMsg), '_blank');
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-44 overflow-hidden bg-blue-50">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/generated/pest-control.dim_800x600.png';
          }}
        />
        {service.price && (
          <div className="absolute top-3 right-3 bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded-full">
            {service.price}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1">{service.name}</h3>
        {service.priceNote && (
          <p className="text-xs text-gray-500 mb-2">{service.priceNote}</p>
        )}
        {service.features && (
          <ul className="space-y-1 mb-3">
            {service.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}
        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{service.description}</p>

        {/* Buttons */}
        <div className="flex gap-2">
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 py-2.5 px-3 rounded-xl font-semibold text-xs hover:bg-gray-200 transition-colors"
          >
            <Phone size={13} />
            WhatsApp
          </a>
          <button
            onClick={handleBookNow}
            className="flex-1 flex items-center justify-center gap-1.5 bg-brand-blue text-white py-2.5 px-3 rounded-xl font-semibold text-xs hover:bg-brand-blue-dark transition-colors"
          >
            <CalendarCheck size={13} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
