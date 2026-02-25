import { Star } from 'lucide-react';
import { getWhatsAppLink } from '../data/services';
import type { PaintingPackage } from '../data/services';

interface Props {
  pkg: PaintingPackage;
  index?: number;
}

export default function PaintingServiceCard({ pkg, index = 0 }: Props) {
  const whatsappMsg = `Hello TrustFix! I'm interested in ${pkg.name} painting at ₹${pkg.pricePerSqft}/sqft. Please arrange a free inspection.`;

  return (
    <div
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-blue-50">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/generated/painting.dim_800x600.png';
          }}
        />
        <div className="absolute top-3 left-3 bg-brand-blue text-white text-sm font-bold px-3 py-1.5 rounded-full shadow">
          ₹{pkg.pricePerSqft}/sqft
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          {pkg.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-1">{pkg.name}</h3>
        <p className="text-xs text-brand-blue font-medium mb-2">Including Labor & Material</p>
        <p className="text-gray-500 text-sm mb-3 leading-relaxed">{pkg.description}</p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-brand-blue text-white text-sm font-semibold py-2.5 px-3 rounded-xl text-center hover:bg-brand-blue-dark transition-colors"
          >
            Free Inspection
          </a>
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue text-sm font-medium py-2.5 px-3 rounded-xl border border-brand-blue hover:bg-blue-50 transition-colors"
          >
            Details →
          </a>
        </div>
      </div>
    </div>
  );
}
