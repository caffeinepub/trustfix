import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, Hammer, Sparkles, Zap, Snowflake, Wrench, Droplet, Paintbrush } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const categories = [
  {
    name: 'Pest Control',
    image: '/assets/generated/pest-control-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/pest-control-service.dim_800x600.png',
    icon: ShieldAlert,
    path: '/services',
    category: 'Pest Control',
  },
  {
    name: 'Carpentry',
    image: '/assets/generated/carpentry-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/carpentry-service.dim_800x600.png',
    icon: Hammer,
    path: '/services',
    category: 'Carpentry',
  },
  {
    name: 'Cleaning',
    image: '/assets/generated/cleaning-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/cleaning-service.dim_800x600.png',
    icon: Sparkles,
    path: '/services',
    category: 'Cleaning',
  },
  {
    name: 'Electrical',
    image: '/assets/generated/electrical-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/electrical-service.dim_800x600.png',
    icon: Zap,
    path: '/services',
    category: 'Electrical',
  },
  {
    name: 'AC Services',
    image: '/assets/generated/ac-services-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/ac-service.dim_800x600.png',
    icon: Snowflake,
    path: '/services',
    category: 'AC Services',
  },
  {
    name: 'Appliances Repair',
    image: '/assets/generated/appliances-repair-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/appliance-repair-service.dim_800x600.png',
    icon: Wrench,
    path: '/services',
    category: 'Appliances Repair',
  },
  {
    name: 'Plumbing',
    image: '/assets/generated/plumbing-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/plumbing-service.dim_800x600.png',
    icon: Droplet,
    path: '/services',
    category: 'Plumbing',
  },
  {
    name: 'Painting',
    image: '/assets/generated/painting-category.dim_800x500.jpg',
    fallbackImage: '/assets/generated/painting-service.dim_800x600.png',
    icon: Paintbrush,
    path: '/services',
    category: 'Painting',
  },
];

export default function ServiceCategoryGrid() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [fallbackErrors, setFallbackErrors] = useState<Record<string, boolean>>({});
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleImageError = (categoryName: string) => {
    if (!imageErrors[categoryName]) {
      setImageErrors((prev) => ({ ...prev, [categoryName]: true }));
    } else {
      setFallbackErrors((prev) => ({ ...prev, [categoryName]: true }));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('in-view');
            }, index * 100);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const hasError = imageErrors[category.name];
        const hasFallbackError = fallbackErrors[category.name];
        const currentSrc = hasError ? category.fallbackImage : category.image;

        return (
          <div
            key={category.name}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="scroll-animate"
          >
            <Link
              to={category.path}
              search={{ category: category.category }}
            >
              <Card className="group cursor-pointer overflow-hidden bg-white/80 backdrop-blur-sm border-gray-200 hover:border-trustfix-green transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    {!hasFallbackError ? (
                      <img
                        src={currentSrc}
                        alt={category.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        onError={() => handleImageError(category.name)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon className="h-20 w-20 text-trustfix-green/60 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
