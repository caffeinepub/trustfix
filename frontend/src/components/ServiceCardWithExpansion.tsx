import { useRef, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ServiceCategory } from "../data/services";
import ExpandedServicePanel from "./ExpandedServicePanel";

interface ServiceCardWithExpansionProps {
  category: ServiceCategory;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ServiceCardWithExpansion({
  category,
  index,
  isExpanded,
  onToggle,
}: ServiceCardWithExpansionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stagger delay: each card gets a slightly longer delay
  const staggerDelay = index * 120;

  return (
    <div
      ref={cardRef}
      className="service-wave-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.92)",
        transition: `opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {/* Card Header — always visible, clickable */}
      <button
        onClick={onToggle}
        className="w-full group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/40 shadow-soft hover:shadow-card-hover transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-expanded={isExpanded}
      >
        {/* Background image with overlay */}
        <div className="relative h-44 sm:h-52 overflow-hidden rounded-t-2xl">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/cleaning-category.dim_800x500.jpg";
            }}
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
          {/* Icon badge */}
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
          </div>
          {/* Service count badge */}
          <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs font-semibold rounded-full px-2.5 py-1">
            {category.services.length} services
          </div>
        </div>

        {/* Card footer */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="text-left">
            <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {category.description}
            </p>
          </div>
          <div
            className={`flex-shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isExpanded
                ? "bg-primary text-primary-foreground rotate-0"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded panel — inline below card */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-card border border-t-0 border-border rounded-b-2xl px-5 pb-5">
          <ExpandedServicePanel category={category} />
        </div>
      </div>
    </div>
  );
}
