import { Phone, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/918884447229';

export default function HeroSection() {
  const openWhatsApp = (message?: string) => {
    const url = message
      ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
      : WHATSAPP_URL;
    window.open(url, '_blank');
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Banner Image */}
      <div className="relative w-full h-[340px] sm:h-[420px] md:h-[500px]">
        <img
          src="/assets/generated/hero-banner.dim_1440x600.png"
          alt="TrustFix Home Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="max-w-lg">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                Trusted Home Services
                <span className="block text-brand-orange">At Your Doorstep</span>
              </h1>
              <p className="text-white/85 text-sm sm:text-base mb-6 leading-relaxed">
                Professional pest control, cleaning, painting, electrical, and more.
                Serving Bangalore with quality and trust.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openWhatsApp('Hi TrustFix! I want to book a service.')}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg"
                >
                  <MessageCircle size={18} />
                  Book Service
                </button>
                <button
                  onClick={() => openWhatsApp('Hi TrustFix! I need to speak with someone.')}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full transition-colors border border-white/40"
                >
                  <Phone size={18} />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
