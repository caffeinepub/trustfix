import { getWhatsAppLink } from '../data/services';

export default function HeroSection() {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-background.dim_1600x900.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/75 to-brand-blue/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available 24/7 in Bangalore
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Professional Home Services{' '}
            <span className="text-yellow-300">You Can Trust</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            Cleaning, Painting, Pest Control & Repairs
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={getWhatsAppLink('Hello TrustFix! I want to book a home service.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue font-bold px-8 py-4 rounded-full text-lg hover:bg-yellow-300 hover:text-brand-blue-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.469-2.004A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.849l-.485-.288-5.027 1.189 1.213-4.896-.317-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.295-.365-.133-.631-.199-.897.199-.266.398-1.031 1.295-1.264 1.561-.233.266-.465.299-.863.1-.398-.199-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.233-.398-.025-.613.175-.811.18-.178.398-.465.597-.698.199-.233.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.777-.653-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.325s1.428 3.857 1.627 4.123c.199.266 2.811 4.291 6.812 6.019.952.411 1.695.657 2.274.841.955.304 1.824.261 2.511.158.766-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.233-1.893-.1-.166-.365-.266-.763-.465z" />
              </svg>
              BOOK SERVICE
            </a>
            <a
              href={getWhatsAppLink('Hello TrustFix! I want to enquire about your services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white hover:text-brand-blue transition-all duration-300"
            >
              📞 Call Now
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { icon: '✅', text: '5000+ Happy Customers' },
              { icon: '⭐', text: '4.8 Rating' },
              { icon: '🏠', text: 'Serving Bangalore' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/90 text-sm">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
