import { useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import ServiceCategoryGrid from '@/components/ServiceCategoryGrid';
import FeaturedReviewsCarousel from '@/components/FeaturedReviewsCarousel';

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section 
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="py-16 px-4 scroll-animate"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional home services delivered with excellence and care
            </p>
          </div>
          <ServiceCategoryGrid />
        </div>
      </section>

      <section 
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="py-16 px-4 scroll-animate"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from satisfied customers
            </p>
          </div>
          <FeaturedReviewsCarousel />
        </div>
      </section>
    </div>
  );
}
