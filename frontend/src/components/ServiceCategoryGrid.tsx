import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { services } from '../data/services';

export default function ServiceCategoryGrid() {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, index]));
            }, index * 80);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">All Home Services</h2>
        <p className="text-gray-500 text-sm sm:text-base">Click a service to explore options and pricing</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            onClick={() => navigate({ to: '/services/$serviceId', params: { serviceId: service.id } })}
            className={`
              bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100
              cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30
              p-4 flex flex-col items-center text-center group
              ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              transition-all duration-500
            `}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 rounded-xl overflow-hidden bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight group-hover:text-brand-blue transition-colors">
              {service.name}
            </h3>
            <span className="mt-2 text-xs text-brand-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View Options →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
