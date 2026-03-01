import { MessageCircle, Calendar, CheckCircle } from "lucide-react";
import { getWhatsAppLink } from "../data/services";

interface ServiceItem {
  id?: string;
  name: string;
  description?: string;
  price?: number | string;
  priceUnit?: string;
  priceType?: string;
  image?: string;
  features?: string[];
  category?: string;
  propertyType?: string;
  [key: string]: unknown;
}

interface ServiceCardProps {
  service: ServiceItem;
  onBookNow?: () => void;
}

function formatPrice(service: ServiceItem): string {
  if (!service.price) return "Contact for price";
  // All non-pest-control services: fixed price only
  return `₹${service.price}`;
}

export default function ServiceCard({ service, onBookNow }: ServiceCardProps) {
  const handleWhatsApp = () => {
    const link = getWhatsAppLink(`I'm interested in ${service.name}`);
    window.open(link, "_blank");
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      handleWhatsApp();
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-md transition-shadow duration-300">
      {service.image && (
        <div className="h-44 overflow-hidden relative">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow">
              {formatPrice(service)}
            </span>
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-base mb-1">
          {service.name}
        </h3>

        {!service.image && (
          <div className="mb-2">
            <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
              {formatPrice(service)}
            </span>
          </div>
        )}

        {service.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {service.description}
          </p>
        )}

        {service.features && service.features.length > 0 && (
          <ul className="mb-3 space-y-1">
            {(service.features as string[]).slice(0, 3).map((f, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={handleBookNow}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium py-2 px-3 rounded-xl transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
