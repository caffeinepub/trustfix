import { useState, useEffect } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { servicesData, categoryOrder } from "../data/services";
import ServiceCard from "../components/ServiceCard";
import SubcategoryCard from "../components/SubcategoryCard";
import PestControlCard from "../components/PestControlCard";
import CleaningServiceCard from "../components/CleaningServiceCard";
import PaintingServiceCard from "../components/PaintingServiceCard";
import BookingFormPopup from "../components/BookingFormPopup";

type ServiceItem = {
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
};

export default function Services() {
  const search = useSearch({ from: "/services" }) as { category?: string };
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>(
    search.category || categoryOrder[0]
  );
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState("");

  useEffect(() => {
    if (search.category && categoryOrder.includes(search.category)) {
      setActiveCategory(search.category);
    }
  }, [search.category]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    navigate({ to: "/services", search: { category: catId } });
  };

  const handleBookNow = (serviceName: string) => {
    setSelectedServiceName(serviceName);
    setIsBookingOpen(true);
  };

  const currentCategory = servicesData[activeCategory];

  const renderServiceCard = (service: ServiceItem, index: number) => {
    const onBookNow = () => handleBookNow(service.name);

    if (activeCategory === "pestControl") {
      return (
        <PestControlCard
          key={service.id ?? `${activeCategory}-${index}`}
          service={service}
          onBookNow={onBookNow}
        />
      );
    }
    if (activeCategory === "cleaning") {
      return (
        <CleaningServiceCard
          key={service.id ?? `${activeCategory}-${index}`}
          service={service}
          onBookNow={onBookNow}
        />
      );
    }
    if (activeCategory === "painting") {
      return (
        <PaintingServiceCard
          key={service.id ?? `${activeCategory}-${index}`}
          service={service}
          onBookNow={onBookNow}
        />
      );
    }
    if (
      service.subcategories &&
      Array.isArray(
        (service as unknown as { subcategories: unknown[] }).subcategories
      )
    ) {
      return (
        <SubcategoryCard
          key={service.id ?? `${activeCategory}-${index}`}
          service={service}
          onBookNow={onBookNow}
        />
      );
    }
    return (
      <ServiceCard
        key={service.id ?? `${activeCategory}-${index}`}
        service={service}
        onBookNow={onBookNow}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Our Services</h1>
        <p className="opacity-90 max-w-xl mx-auto">
          Professional home services at your doorstep. Trusted by thousands
          across Bangalore.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-background border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-2">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
            {categoryOrder.map((catId) => {
              const cat = servicesData[catId];
              if (!cat) return null;
              return (
                <button
                  key={catId}
                  onClick={() => handleCategoryChange(catId)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === catId
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {currentCategory ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {currentCategory.name}
              </h2>
              {currentCategory.description && (
                <p className="text-muted-foreground mt-1">
                  {currentCategory.description}
                </p>
              )}
            </div>

            {/* For Pest Control: render subcategoryGroups directly */}
            {currentCategory.subcategoryGroups &&
            currentCategory.subcategoryGroups.length > 0 ? (
              <div className="space-y-10">
                {currentCategory.subcategoryGroups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h3 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                      {group.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.services.map((service: ServiceItem, sIdx: number) =>
                        renderServiceCard(service, sIdx)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : currentCategory.services && currentCategory.services.length > 0 ? (
              /* Direct display of all services — no toggle, no dropdown */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.services.map(
                  (service: ServiceItem, index: number) =>
                    renderServiceCard(service, index)
                )}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p>No services available in this category yet.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>Select a category to view services.</p>
          </div>
        )}
      </div>

      {/* Booking Popup — uses isOpen + serviceName props as per BookingFormPopup interface */}
      <BookingFormPopup
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceName={selectedServiceName}
      />
    </div>
  );
}
