import { useEffect, useRef, useState } from 'react';
import { categoryOrder, servicesData } from '../data/services';

const WHATSAPP_URL = 'https://wa.me/918884447229';

const serviceImages: Record<string, string[]> = {
  'pest-control': [
    '/assets/generated/pest-control-category.dim_400x300.png',
    '/assets/generated/pest-control-category.dim_800x500.jpg',
    '/assets/generated/pest-control.dim_800x600.png',
  ],
  'cleaning': [
    '/assets/generated/cleaning-category.dim_400x300.png',
    '/assets/generated/cleaning-category.dim_800x500.jpg',
    '/assets/generated/cleaning.dim_800x600.png',
  ],
  'painting': [
    '/assets/generated/painting-category.dim_400x300.png',
    '/assets/generated/painting-category.dim_800x500.jpg',
    '/assets/generated/painting.dim_800x600.png',
  ],
  'electrical': [
    '/assets/generated/electrical-category.dim_400x300.png',
    '/assets/generated/electrical-category.dim_800x500.jpg',
    '/assets/generated/electrical.dim_800x600.png',
  ],
  'carpentry': [
    '/assets/generated/carpentry-category.dim_400x300.png',
    '/assets/generated/carpentry-category.dim_800x500.jpg',
    '/assets/generated/carpentry.dim_800x600.png',
  ],
  'ac-services': [
    '/assets/generated/ac-services-category.dim_400x300.png',
    '/assets/generated/ac-services-category.dim_800x500.jpg',
    '/assets/generated/ac-services.dim_800x600.png',
  ],
  'appliances-repair': [
    '/assets/generated/appliances-repair-category.dim_400x300.png',
    '/assets/generated/appliances-repair-category.dim_800x500.jpg',
    '/assets/generated/appliances-repair.dim_800x600.png',
  ],
  'plumbing': [
    '/assets/generated/plumbing-category.dim_400x300.png',
    '/assets/generated/plumbing-category.dim_800x500.jpg',
    '/assets/generated/plumbing.dim_800x600.png',
  ],
};

interface ServiceCardProps {
  categoryId: string;
  index: number;
}

function ServiceCard({ categoryId, index }: ServiceCardProps) {
  const category = servicesData[categoryId];
  const [imgIndex, setImgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const images = serviceImages[categoryId] || [];
  const currentImage = images[imgIndex] || category?.image || '';

  const handleImageError = () => {
    if (imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1);
    }
  };

  const handleClick = () => {
    // Navigate to /services with category search param
    const url = new URL(window.location.href);
    url.pathname = '/services';
    url.searchParams.set('category', categoryId);
    window.location.href = url.toString();
  };

  if (!category) return null;

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
        transition: `opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100 hover:-translate-y-1"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        aria-label={`View ${category.name} services`}
      >
        <div className="relative overflow-hidden h-44">
          <img
            src={currentImage}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-brand-blue text-xs font-semibold px-2 py-1 rounded-full">
              {category.services.length} Services
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-brand-blue transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
            {category.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-brand-blue text-xs font-medium">View Services →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceCategoryGrid() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Services</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Professional home services at your doorstep. Trusted by thousands of happy customers.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categoryOrder.map((categoryId, index) => (
            <ServiceCard key={categoryId} categoryId={categoryId} index={index} />
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-blue/90 transition-colors shadow-md"
          >
            Book Any Service on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
