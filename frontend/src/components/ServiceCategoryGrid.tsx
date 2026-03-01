import { useRef, useEffect, useState } from "react";
import { servicesData, categoryOrder } from "../data/services";

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

function AnimatedCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const { ref, isVisible } = useScrollRevealOnce();
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(48px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default function ServiceCategoryGrid() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2">
        {categoryOrder.map((categoryId, index) => {
          const category = servicesData[categoryId];
          if (!category) return null;
          return (
            <AnimatedCard key={categoryId} delay={index * 70}>
              <button
                onClick={() => {
                  window.location.href = `/services?category=${categoryId}`;
                }}
                className="w-full group bg-card hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl p-4 flex flex-col items-center gap-3 shadow-soft hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/generated/cleaning-category.dim_400x300.png";
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                    {category.name}
                  </h3>
                  {category.services && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.services.length} services
                    </p>
                  )}
                </div>
              </button>
            </AnimatedCard>
          );
        })}
      </div>
    </div>
  );
}
