import { getWhatsAppLink } from '../data/services';
import type { CleaningItem } from '../data/services';

interface Props {
  item: CleaningItem;
  index?: number;
}

export default function CleaningServiceCard({ item, index = 0 }: Props) {
  const isInspection = item.variant === 'inspection';

  const whatsappMsg = isInspection
    ? `Hello TrustFix! I need ${item.name}. Please arrange an inspection.`
    : `Hello TrustFix! I want to book ${item.name} at ${item.price}.`;

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
            target.src = '/assets/generated/cleaning.dim_800x600.png';
          }}
        />
        <div className="absolute top-3 right-3">
          {isInspection ? (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Free Inspection
            </span>
          ) : (
            <span className="bg-brand-blue text-white text-sm font-bold px-3 py-1 rounded-full">
              {item.price}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1">{item.name}</h3>

        {isInspection ? (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-orange-600 text-xs font-semibold bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg">
              Free Inspection → Quote → Service
            </span>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.description}</p>
        )}

        <a
          href={getWhatsAppLink(whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200
            ${isInspection
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-brand-blue text-white hover:bg-brand-blue-dark'
            }
          `}
        >
          {isInspection ? '🔍 Free Inspection' : '📅 Book Now'}
        </a>
      </div>
    </div>
  );
}
