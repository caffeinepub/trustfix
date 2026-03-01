import { useRef, useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedReviewsCarousel from "../components/FeaturedReviewsCarousel";
import ServiceCardWithExpansion from "../components/ServiceCardWithExpansion";
import { Shield, Clock, Star, Users, CheckCircle, Phone } from "lucide-react";
import { PHONE_NUMBER, getWhatsAppLink, servicesData, categoryOrder } from "../data/services";

function useScrollReveal() {
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

const stats = [
  { icon: Users, value: "5000+", label: "Happy Customers" },
  { icon: CheckCircle, value: "10000+", label: "Services Completed" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Clock, value: "Same Day", label: "Service Available" },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Verified Professionals",
    desc: "All our technicians are background-verified and trained.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    desc: "We respect your time and always arrive as scheduled.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    desc: "100% satisfaction guarantee on every service we provide.",
  },
  {
    icon: CheckCircle,
    title: "Transparent Pricing",
    desc: "No hidden charges. Fixed prices for all services.",
  },
];

export default function Home() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleToggle = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero - no animation, always visible */}
      <HeroSection />

      {/* Stats */}
      <FadeSection className="bg-primary text-primary-foreground py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <FadeSection key={stat.label} delay={i * 80}>
                <div className="flex flex-col items-center gap-2">
                  <stat.icon className="w-7 h-7 opacity-80" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Services Section — vertical stacked cards with water-waves animation */}
      <section className="py-14 px-4 bg-background">
        <FadeSection className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Our Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professional home services at your doorstep. Tap any service to see all options &amp; pricing.
          </p>
        </FadeSection>

        <div className="max-w-2xl mx-auto space-y-4">
          {categoryOrder.map((categoryId, index) => {
            const category = servicesData[categoryId];
            if (!category) return null;
            return (
              <ServiceCardWithExpansion
                key={categoryId}
                category={category}
                index={index}
                isExpanded={expandedCategory === categoryId}
                onToggle={() => handleToggle(categoryId)}
              />
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 px-4 bg-muted/40">
        <FadeSection className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Why Choose TrustFix?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are committed to delivering the best home services experience.
          </p>
        </FadeSection>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyChooseUs.map((item, i) => (
            <FadeSection key={item.title} delay={i * 100}>
              <div className="bg-card rounded-2xl p-6 shadow-soft flex gap-4 items-start">
                <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 px-4 bg-background">
        <FadeSection className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real reviews from real customers who trust TrustFix.
          </p>
        </FadeSection>
        <FadeSection delay={100}>
          <FeaturedReviewsCarousel />
        </FadeSection>
      </section>

      {/* CTA */}
      <FadeSection className="py-14 px-4 bg-primary text-primary-foreground text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Book a Service?</h2>
        <p className="mb-6 opacity-90 max-w-md mx-auto">
          Get professional home services at your doorstep. Call or WhatsApp us now!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getWhatsAppLink("Book a service")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-full shadow hover:bg-white/90 transition"
          >
            Book on WhatsApp
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </FadeSection>
    </div>
  );
}
