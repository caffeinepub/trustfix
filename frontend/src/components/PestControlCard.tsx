import { getWhatsAppLink } from '../data/services';
import type { PestControlItem } from '../data/services';

interface Props {
  item: PestControlItem;
  index?: number;
}

export default function PestControlCard({ item, index = 0 }: Props) {
  const whatsappMsg = `Hello TrustFix! I need ${item.name}. Please provide details and booking options.`;

  return (
    <div
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-44 overflow-hidden bg-blue-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/generated/pest-control.dim_800x600.png';
          }}
        />
        {item.price && (
          <div className="absolute top-3 right-3 bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.price}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1">{item.name}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.description}</p>
        <a
          href={getWhatsAppLink(whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-2.5 px-4 rounded-xl font-semibold text-sm hover:bg-brand-blue-dark transition-colors"
        >
          📅 Book Now
        </a>
      </div>
    </div>
  );
}
