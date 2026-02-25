import HeroSection from '../components/HeroSection';
import ServiceCategoryGrid from '../components/ServiceCategoryGrid';
import FeaturedReviewsCarousel from '../components/FeaturedReviewsCarousel';
import { getWhatsAppLink } from '../data/services';

const trustBadges = [
  { icon: '🏆', title: '5000+', subtitle: 'Happy Customers' },
  { icon: '⭐', title: '4.8/5', subtitle: 'Average Rating' },
  { icon: '🔧', title: '8+', subtitle: 'Services Offered' },
  { icon: '📍', title: 'Bangalore', subtitle: 'Serving All Areas' },
];

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Trust Badges */}
      <section className="bg-brand-blue py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="text-center text-white">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="font-bold text-lg">{badge.title}</div>
                <div className="text-white/80 text-xs">{badge.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <ServiceCategoryGrid />

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Why Choose TrustFix?</h2>
            <p className="text-gray-500 text-sm">We deliver quality, reliability, and trust</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '✅', title: 'Verified Professionals', desc: 'All our technicians are background-verified and trained' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges. Fixed prices for most services' },
              { icon: '⏰', title: 'On-Time Service', desc: 'We respect your time and always arrive on schedule' },
              { icon: '🛡️', title: 'Service Guarantee', desc: 'Not satisfied? We will redo the service for free' },
              { icon: '📱', title: 'Easy Booking', desc: 'Book via WhatsApp in seconds, no app needed' },
              { icon: '🌟', title: '4.8 Star Rated', desc: 'Consistently rated 5 stars by our happy customers' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 flex gap-4">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <FeaturedReviewsCarousel />

      {/* CTA Banner */}
      <section className="py-12 bg-brand-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Book a Service?
          </h2>
          <p className="text-white/80 mb-6 text-sm sm:text-base">
            Get instant quotes and book via WhatsApp. Available 7 days a week.
          </p>
          <a
            href={getWhatsAppLink('Hello TrustFix! I want to book a home service.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand-blue font-bold px-8 py-4 rounded-full text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg"
          >
            📲 Book on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
