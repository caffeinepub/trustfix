import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'trustfix-app'
  );

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200 relative z-10">
      {/* Service Availability Banner */}
      <div className="bg-gradient-to-r from-trustfix-green to-trustfix-orange text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base font-semibold">
            TrustFix Services Available All Over Bangalore — 24/7 Support
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <img
              src="/assets/file_00000000d2747206831923d1f7e53476.png"
              alt="TrustFix Logo"
              className="h-16 w-auto"
            />
            <p className="text-sm text-gray-600">
              Professional home services you can trust. Quality workmanship, reliable service.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:8884447229"
                className="flex items-center space-x-2 text-gray-600 hover:text-trustfix-green transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">8884447229</span>
              </a>
              <a
                href="mailto:htrustfix@gmail.com"
                className="flex items-center space-x-2 text-gray-600 hover:text-trustfix-green transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">htrustfix@gmail.com</span>
              </a>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">12th Cross, Mookambika Nagar, Bangalore</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link
                to="/services"
                className="text-sm text-gray-600 hover:text-trustfix-orange transition-colors"
              >
                Our Services
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-gray-600 hover:text-trustfix-orange transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/booking"
                className="text-sm text-gray-600 hover:text-trustfix-orange transition-colors"
              >
                Book Now
              </Link>
              <Link
                to="/reviews"
                className="text-sm text-gray-600 hover:text-trustfix-orange transition-colors"
              >
                Customer Reviews
              </Link>
            </div>
          </div>

          {/* Social & Payment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:text-[#1877F2]/80 transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E4405F] hover:text-[#E4405F]/80 transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/918884447229"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:text-[#25D366]/80 transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-6 w-6 fill-current" />
              </a>
            </div>

            <div className="pt-4">
              <p className="text-xs text-gray-500 mb-2">We Accept</p>
              <div className="flex flex-wrap gap-2">
                {['UPI', 'GPay', 'PhonePe', 'Paytm', 'Visa', 'Mastercard'].map((payment) => (
                  <span
                    key={payment}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded grayscale hover:grayscale-0 transition-all"
                  >
                    {payment}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} TrustFix Home Services. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-trustfix-orange hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
