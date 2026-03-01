import { servicesData, categoryOrder } from '@/data/services';

const WHATSAPP_NUMBER = '918884447229';

export default function ServiceCarousel() {
  const handleCategoryClick = (categoryId: string) => {
    window.location.href = `/services?category=${categoryId}`;
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20TrustFix!%20I%20need%20help%20with%20a%20home%20service.`,
      '_blank'
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categoryOrder.map((categoryId) => {
          const category = servicesData[categoryId];
          if (!category) return null;
          return (
            <button
              key={categoryId}
              onClick={() => handleCategoryClick(categoryId)}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer text-center"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-brand-blue transition-colors duration-200 leading-tight">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mt-2">
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          💬 Chat on WhatsApp
        </button>
      </div>
    </div>
  );
}
