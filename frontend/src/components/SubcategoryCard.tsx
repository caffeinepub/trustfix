import { useRef, useEffect, useState } from "react";
import { MessageCircle, Calendar } from "lucide-react";
import { getWhatsAppLink } from "../data/services";

interface SubcategoryService {
  id?: string;
  name: string;
  description?: string;
  price?: number | string;
  priceUnit?: string;
  priceType?: string;
  image?: string;
  features?: string[];
  category?: string;
  [key: string]: unknown;
}

interface SubcategoryCardProps {
  service: SubcategoryService;
  onBookNow?: () => void;
}

function useScrollRevealOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function formatPrice(service: SubcategoryService): string {
  if (!service.price) return "Contact for price";
  const price = service.price;
  const unit = service.priceUnit || "";
  if (unit === "per sq.ft" || unit === "sqft") {
    return `₹${price}/sq.ft`;
  }
  return `₹${price}`;
}

export default function SubcategoryCard({ service, onBookNow }: SubcategoryCardProps) {
  const { ref, isVisible } = useScrollRevealOnce();

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
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        willChange: "opacity, transform",
      }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-md transition-shadow duration-300"
    >
      {service.image && (
        <div className="h-44 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground text-base leading-tight">
            {service.name}
          </h3>
          <span className="flex-shrink-0 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
            {formatPrice(service)}
          </span>
        </div>

        {service.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {service.description}
          </p>
        )}

        {service.features && service.features.length > 0 && (
          <ul className="mb-3 space-y-1">
            {(service.features as string[]).slice(0, 3).map((f, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
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
