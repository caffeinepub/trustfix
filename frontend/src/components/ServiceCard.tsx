interface ServiceCardProps {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

export default function ServiceCard({ name, category, description, price, image }: ServiceCardProps) {
  const handleBook = () => {
    const message = encodeURIComponent(
      `Hi TrustFix! I'd like to book: ${name} (${category})\nStarting from: ${price}`
    );
    window.open(`https://wa.me/918884447229?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-glass transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-brand-blue font-bold">Starting {price}</span>
          <button
            onClick={handleBook}
            className="bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-blue-dark transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
