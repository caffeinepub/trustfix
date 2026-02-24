import { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import ServiceCard from '@/components/ServiceCard';
import { servicesData } from '@/data/services';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Services() {
  const search = useSearch({ strict: false }) as { category?: string };
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    if (search.category) {
      setActiveCategory(search.category);
    }
  }, [search.category]);

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
          <TabsList className="flex flex-wrap justify-center gap-2 mb-12 glass-panel p-2 rounded-lg shadow-glass">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-trustfix-green data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
