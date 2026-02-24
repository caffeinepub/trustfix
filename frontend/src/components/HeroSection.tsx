import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-fade-in"
        style={{
          backgroundImage: 'url(/assets/IMG-20260218-WA0000.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
          TrustFix Home Services
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up animation-delay-200">
          Professional solutions for all your home service needs
        </p>
        <Link to="/booking">
          <Button
            size="lg"
            className="bg-trustfix-orange hover:bg-trustfix-orange/90 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-trustfix-orange/50 transition-all duration-300 transform hover:scale-105 animate-slide-up animation-delay-400"
          >
            Book Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
