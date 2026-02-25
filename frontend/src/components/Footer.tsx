import { Phone, MessageCircle, Heart } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, getWhatsAppLink, categoryOrder, servicesData } from '../data/services';
import { SiFacebook, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = typeof window !== 'undefined' ? window.location.hostname : 'trustfix-app';

  return (
    <footer className="bg-brand-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/trustfix-logo.dim_400x120.png"
                alt="TrustFix"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <span className="text-white font-bold text-2xl">TrustFix</span>
            </div>
            <p className="text-white/80 text-sm mb-4">
              Professional home services you can trust. Serving Bangalore with quality and care.
            </p>
            <div className="space-y-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-white text-sm transition-colors"
              >
                <Phone size={16} />
                {PHONE_NUMBER}
              </a>
              <a
                href={getWhatsAppLink('Hello TrustFix, I need home services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-white text-sm transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <SiFacebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <SiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {categoryOrder.map((id) => {
                const cat = servicesData[id];
                if (!cat) return null;
                return (
                  <li key={id}>
                    <a
                      href={`/services?category=${id}`}
                      className="text-white/80 hover:text-white text-sm transition-colors"
                    >
                      {cat.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-white text-sm transition-colors">Home</a></li>
              <li><a href="/services" className="text-white/80 hover:text-white text-sm transition-colors">Services</a></li>
              <li><a href="/booking" className="text-white/80 hover:text-white text-sm transition-colors">Book a Service</a></li>
              <li><a href="/reviews" className="text-white/80 hover:text-white text-sm transition-colors">Reviews</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-white text-sm transition-colors">Contact Us</a></li>
            </ul>
            <div className="mt-6">
              <p className="text-white/70 text-xs">📍 12th Cross, Mookambika Nagar, Bangalore</p>
              <p className="text-white/70 text-xs mt-1">✉️ htrustfix@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-xs">
            © {year} TrustFix. All rights reserved.
          </p>
          <p className="text-white/60 text-xs flex items-center gap-1">
            Built with <Heart size={12} className="text-red-400 fill-red-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
