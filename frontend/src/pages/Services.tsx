import { useState, useEffect, useRef } from 'react';
import { useSearch } from '@tanstack/react-router';
import ServiceCard from '@/components/ServiceCard';
import { servicesData } from '@/data/services';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Services() {
  const search = useSearch({ strict: false }) as { category?: string; serviceId?: string };
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (search.category) {
      setActiveCategory(search.category);
    }
  }, [search.category]);

  useEffect(() => {
    if (search.serviceId && search.category) {
      // Wait for the category to be set and DOM to update
      const timer = setTimeout(() => {
        const serviceId = search.serviceId;
        if (serviceId) {
          const serviceElement = serviceRefs.current[serviceId];
          if (serviceElement) {
            serviceElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add highlight animation
            serviceElement.classList.add('ring-4', 'ring-trustfix-orange', 'ring-offset-4');
            setTimeout(() => {
              serviceElement.classList.remove('ring-4', 'ring-trustfix-orange', 'ring-offset-4');
            }, 2000);
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [search.serviceId, search.category, activeCategory]);

  const categories = ['All', ...Object.keys(servicesData)];

  const filteredServices =
    activeCategory === 'All'
      ? Object.entries(servicesData).flatMap(([category, services]) =>
          services.map((service) => ({ ...service, category }))
        )
      : servicesData[activeCategory]?.map((service) => ({ ...service, category: activeCategory })) || [];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional home services tailored to your needs
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="mb-12 overflow-x-auto -webkit-overflow-scrolling-touch overscroll-behavior-x-contain">
            <TabsList className="flex flex-nowrap justify-start md:justify-center gap-2 glass-panel p-2 rounded-lg shadow-glass min-w-max">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-trustfix-green data-[state=active]:text-white whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  ref={(el) => {
                    serviceRefs.current[service.id] = el;
                  }}
                  className="transition-all duration-300"
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
