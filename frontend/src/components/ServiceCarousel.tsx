import { useEffect, useRef, useState, useCallback } from 'react';
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

interface ServiceCardItemProps {
  categoryId: string;
}

function ServiceCardItem({ categoryId }: ServiceCardItemProps) {
  const category = servicesData[categoryId];
  const [imgIndex, setImgIndex] = useState(0);

  const images = serviceImages[categoryId] || [];
  const currentImage = images[imgIndex] || category?.image || '';

  const handleImageError = () => {
    if (imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1);
    }
  };

  const handleClick = () => {
    const url = new URL(window.location.href);
    url.pathname = '/services';
    url.searchParams.set('category', categoryId);
    window.location.href = url.toString();
  };

  if (!category) return null;

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100 hover:-translate-y-1 w-full"
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
  );
}

export default function ServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = categoryOrder.length;

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((index + total) % total);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, total]
  );

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setDragDelta(0);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    setDragDelta(e.touches[0].clientX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (dragDelta > 50) goPrev();
    else if (dragDelta < -50) goNext();
    setDragStartX(null);
    setDragDelta(0);
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setDragDelta(0);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null || !isDragging) return;
    setDragDelta(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (dragDelta > 50) goPrev();
    else if (dragDelta < -50) goNext();
    setDragStartX(null);
    setDragDelta(0);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      if (dragDelta > 50) goPrev();
      else if (dragDelta < -50) goNext();
      setDragStartX(null);
      setDragDelta(0);
      setIsDragging(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  const translateX = isDragging ? dragDelta : 0;

  return (
    <section className="py-12 px-4">
      <div className="max-w-lg mx-auto sm:max-w-xl md:max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Services</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Professional home services at your doorstep. Trusted by thousands of happy customers.
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative select-none">
          {/* Prev button */}
          <button
            onClick={goPrev}
            aria-label="Previous service"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors duration-200 focus:outline-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Card track */}
          <div
            ref={trackRef}
            className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              style={{
                display: 'flex',
                transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                willChange: 'transform',
              }}
            >
              {categoryOrder.map((categoryId) => (
                <div
                  key={categoryId}
                  style={{ minWidth: '100%', maxWidth: '100%' }}
                  className="px-1"
                >
                  <ServiceCardItem categoryId={categoryId} />
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={goNext}
            aria-label="Next service"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors duration-200 focus:outline-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {categoryOrder.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to service ${i + 1}`}
              className={`rounded-full transition-all duration-300 focus:outline-none ${
                i === currentIndex
                  ? 'bg-brand-blue w-6 h-2'
                  : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-gray-400 text-xs mt-2">
          {currentIndex + 1} / {total}
        </p>

        <div className="text-center mt-8">
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
