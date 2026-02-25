export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  image: string;
  features?: string[];
  variant?: 'fixed' | 'package' | 'inspection';
  subItems?: { name: string; price: string }[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  services: ServiceItem[];
}

// Legacy compat types
export interface CleaningItem {
  name: string;
  price: string;
  priceNum?: number;
  variant: 'fixed' | 'package' | 'inspection';
  image: string;
  description: string;
  isSecondary?: boolean;
}

export interface PaintingPackage {
  name: string;
  pricePerSqft: number;
  rating: number;
  description: string;
  features: string[];
  image: string;
}

export interface SubcategoryItem {
  name: string;
  image: string;
  description: string;
}

export interface PestControlItem {
  name: string;
  image: string;
  description: string;
  price?: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  type: 'cleaning' | 'painting' | 'pest-control' | 'quote-only';
  subcategories?: SubcategoryItem[];
  cleaningItems?: CleaningItem[];
  paintingPackages?: PaintingPackage[];
  pestControlItems?: PestControlItem[];
}

export const WHATSAPP_NUMBER = '918884447229';
export const PHONE_NUMBER = '8884447229';

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const categoryOrder = [
  'pest-control',
  'cleaning',
  'painting',
  'electrical',
  'carpentry',
  'ac-services',
  'appliances-repair',
  'plumbing',
];

export const servicesData: Record<string, ServiceCategory> = {
  'pest-control': {
    id: 'pest-control',
    name: 'Pest Control',
    icon: '/assets/generated/pest-control-icon.dim_200x200.png',
    image: '/assets/generated/pest-control-category.dim_400x300.png',
    description: 'Professional pest control services to keep your home and office pest-free.',
    services: [
      {
        id: 'general-pest-control',
        name: 'General Pest Control',
        description: 'Comprehensive treatment for common household pests including ants, cockroaches, and spiders.',
        price: '₹999',
        priceNote: 'Starting price',
        image: '/assets/generated/general-pest-control.dim_600x400.png',
        features: ['Safe chemicals', 'Trained technicians', '30-day warranty'],
        variant: 'fixed',
      },
      {
        id: 'cockroach-control',
        name: 'Cockroach Control',
        description: 'Targeted treatment to eliminate cockroach infestations from your property.',
        price: '₹799',
        priceNote: 'Starting price',
        image: '/assets/generated/cockroach-control.dim_600x400.png',
        features: ['Gel-based treatment', 'No smell', 'Child safe'],
        variant: 'fixed',
      },
      {
        id: 'bed-bug-treatment',
        name: 'Bed Bug Treatment',
        description: 'Effective bed bug elimination using heat and chemical treatments.',
        price: '₹1499',
        priceNote: 'Starting price',
        image: '/assets/generated/bed-bug-treatment.dim_600x400.png',
        features: ['Heat treatment', 'Chemical spray', '60-day warranty'],
        variant: 'fixed',
      },
      {
        id: 'termite-control',
        name: 'Termite Control',
        description: 'Pre and post-construction termite treatment to protect your property.',
        price: '₹2499',
        priceNote: 'Starting price',
        image: '/assets/generated/termite-control.dim_600x400.png',
        features: ['Pre-construction', 'Post-construction', '1-year warranty'],
        variant: 'fixed',
      },
      {
        id: 'mosquito-control',
        name: 'Mosquito Control',
        description: 'Fogging and larvicide treatment to reduce mosquito population.',
        price: '₹1299',
        priceNote: 'Starting price',
        image: '/assets/generated/mosquito-control.dim_600x400.png',
        features: ['Fogging treatment', 'Larvicide', 'Safe for family'],
        variant: 'fixed',
      },
      {
        id: 'rodent-control',
        name: 'Rodent Control',
        description: 'Trapping and baiting solutions to eliminate rats and mice.',
        price: '₹1199',
        priceNote: 'Starting price',
        image: '/assets/generated/rodent-control.dim_600x400.png',
        features: ['Bait stations', 'Trapping', 'Entry point sealing'],
        variant: 'fixed',
      },
    ],
  },

  'cleaning': {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '/assets/generated/cleaning-icon.dim_200x200.png',
    image: '/assets/generated/cleaning-category.dim_400x300.png',
    description: 'Professional cleaning services for homes, offices, and commercial spaces.',
    services: [
      {
        id: 'bathroom-cleaning',
        name: 'Bathroom Cleaning',
        description: 'Deep cleaning of bathrooms including tiles, fixtures, and sanitization.',
        price: '₹449',
        priceNote: 'Per bathroom',
        image: '/assets/generated/bathroom-cleaning.dim_400x300.png',
        features: ['Tile scrubbing', 'Fixture cleaning', 'Sanitization'],
        variant: 'fixed',
      },
      {
        id: 'kitchen-cleaning',
        name: 'Kitchen Cleaning',
        description: 'Thorough kitchen cleaning including chimney, stove, and countertops.',
        price: '₹1499',
        priceNote: 'Per kitchen',
        image: '/assets/generated/kitchen-cleaning.dim_400x300.png',
        features: ['Chimney cleaning', 'Stove degreasing', 'Cabinet wipe-down'],
        variant: 'fixed',
      },
      {
        id: 'home-cleaning',
        name: 'Home Cleaning',
        description: 'Complete home cleaning service for all room types and sizes.',
        price: '₹2499',
        priceNote: '1BHK Vacant starting',
        image: '/assets/generated/home-cleaning.dim_400x300.png',
        features: ['All rooms', 'Kitchen & bathrooms', 'Dusting & mopping'],
        variant: 'package',
        subItems: [
          { name: '1BHK Vacant', price: '₹2499' },
          { name: '1BHK Occupied', price: '₹3499' },
          { name: '2BHK Vacant', price: '₹3999' },
          { name: '2BHK Occupied', price: '₹4999' },
          { name: '3BHK Vacant', price: '₹5999' },
          { name: '3BHK Occupied', price: '₹6999' },
        ],
      },
      {
        id: 'sofa-cleaning',
        name: 'Sofa Cleaning',
        description: 'Professional sofa and upholstery cleaning to remove stains and odors.',
        price: '₹699',
        priceNote: 'Per sofa set',
        image: '/assets/generated/sofa-cleaning.dim_400x300.png',
        features: ['Stain removal', 'Deodorizing', 'Fabric protection'],
        variant: 'fixed',
      },
      {
        id: 'mattress-cleaning',
        name: 'Mattress Cleaning',
        description: 'Deep cleaning and sanitization of mattresses to remove dust mites and allergens.',
        price: '₹799',
        priceNote: 'Per mattress',
        image: '/assets/generated/sofa-cleaning.dim_400x300.png',
        features: ['Dust mite removal', 'Sanitization', 'Deodorizing'],
        variant: 'fixed',
      },
      {
        id: 'villa-cleaning',
        name: 'Villa Cleaning',
        description: 'Comprehensive cleaning service for villas and large properties.',
        price: 'Free Inspection → Quote → Service',
        priceNote: 'Custom quote',
        image: '/assets/generated/villa-cleaning.dim_800x600.png',
        features: ['Full property cleaning', 'Custom schedule', 'Dedicated team'],
        variant: 'inspection',
      },
      {
        id: 'commercial-cleaning',
        name: 'Commercial Cleaning',
        description: 'Professional cleaning for offices, shops, and commercial establishments.',
        price: 'Free Inspection → Quote → Service',
        priceNote: 'Custom quote',
        image: '/assets/generated/commercial-cleaning.dim_800x600.png',
        features: ['Office cleaning', 'Floor care', 'Waste management'],
        variant: 'inspection',
      },
      {
        id: 'carpet-cleaning',
        name: 'Carpet Cleaning',
        description: 'Deep cleaning of carpets and rugs using professional equipment.',
        price: 'Free Inspection → Quote → Service',
        priceNote: 'Custom quote',
        image: '/assets/generated/carpet-cleaning.dim_800x600.png',
        features: ['Steam cleaning', 'Stain removal', 'Drying service'],
        variant: 'inspection',
      },
    ],
  },

  'painting': {
    id: 'painting',
    name: 'Painting',
    icon: '/assets/generated/painting-icon.dim_200x200.png',
    image: '/assets/generated/painting-category.dim_400x300.png',
    description: 'Professional painting services with premium quality paints and skilled painters.',
    services: [
      {
        id: 'tractor-uno',
        name: 'Tractor UNO',
        description: 'Economy interior wall paint with smooth finish. Ideal for budget-conscious customers.',
        price: '₹2',
        priceNote: 'Per sq.ft | Including Labor & Material',
        image: '/assets/generated/painting-tractor-uno.dim_800x600.png',
        features: ['Economy paint', 'Smooth finish', 'Quick drying'],
        variant: 'fixed',
      },
      {
        id: 'tractor-emulsion',
        name: 'Tractor Emulsion',
        description: 'Standard emulsion paint for interior walls with good coverage and durability.',
        price: '₹6',
        priceNote: 'Per sq.ft | Including Labor & Material',
        image: '/assets/generated/painting-emulsion.dim_800x600.png',
        features: ['Good coverage', 'Washable', 'Durable finish'],
        variant: 'fixed',
      },
      {
        id: 'premium-emulsion',
        name: 'Premium Emulsion',
        description: 'Premium quality emulsion paint with excellent coverage and long-lasting finish.',
        price: '₹10',
        priceNote: 'Per sq.ft | Including Labor & Material',
        image: '/assets/generated/painting-premium.dim_800x600.png',
        features: ['Premium quality', 'Excellent coverage', 'Long-lasting'],
        variant: 'fixed',
      },
      {
        id: 'royale-luxury',
        name: 'Royale Luxury',
        description: 'Asian Paints Royale Luxury for a rich, velvety finish on interior walls.',
        price: '₹14',
        priceNote: 'Per sq.ft | Including Labor & Material',
        image: '/assets/generated/painting-royale-luxury.dim_800x600.png',
        features: ['Velvety finish', 'Anti-bacterial', 'Stain resistant'],
        variant: 'fixed',
      },
      {
        id: 'royale-matt',
        name: 'Royale Matt',
        description: 'Asian Paints Royale Matt for a sophisticated matte finish on interior walls.',
        price: '₹15',
        priceNote: 'Per sq.ft | Including Labor & Material',
        image: '/assets/generated/painting-royale-matt.dim_800x600.png',
        features: ['Matte finish', 'Smooth texture', 'Premium look'],
        variant: 'fixed',
      },
      {
        id: 'royale-shyne',
        name: 'Royale Shyne',
        description: 'Asian Paints Royale Shyne for a glossy, luxurious finish on interior walls.',
        price: '₹16',
        priceNote: 'Per sq.ft | Including Labor & Material',
        image: '/assets/generated/painting-service.dim_800x600.png',
        features: ['Glossy finish', 'Easy to clean', 'Luxurious look'],
        variant: 'fixed',
      },
    ],
  },

  'electrical': {
    id: 'electrical',
    name: 'Electrical',
    icon: '/assets/generated/electrical-icon.dim_200x200.png',
    image: '/assets/generated/electrical-category.dim_400x300.png',
    description: 'Certified electricians for all your electrical repair and installation needs.',
    services: [
      {
        id: 'wiring-repair',
        name: 'Wiring Repair',
        description: 'Expert electrical wiring repair and replacement services.',
        price: '₹499',
        priceNote: 'Starting price',
        image: '/assets/generated/electrical-wiring-repair.dim_400x300.png',
        features: ['Safe wiring', 'ISI certified', 'Quick service'],
        variant: 'fixed',
      },
      {
        id: 'switch-repair',
        name: 'Switch & Socket Repair',
        description: 'Repair and replacement of switches, sockets, and electrical fittings.',
        price: '₹299',
        priceNote: 'Starting price',
        image: '/assets/generated/electrical-switch-repair.dim_400x300.png',
        features: ['All brands', 'Quick fix', 'Quality parts'],
        variant: 'fixed',
      },
      {
        id: 'fan-installation',
        name: 'Fan Installation',
        description: 'Professional ceiling fan and exhaust fan installation services.',
        price: '₹399',
        priceNote: 'Per fan',
        image: '/assets/generated/electrical-fan-installation.dim_400x300.png',
        features: ['All fan types', 'Safe installation', 'Testing included'],
        variant: 'fixed',
      },
    ],
  },

  'carpentry': {
    id: 'carpentry',
    name: 'Carpentry',
    icon: '/assets/generated/carpentry-icon.dim_200x200.png',
    image: '/assets/generated/carpentry-category.dim_400x300.png',
    description: 'Skilled carpenters for furniture repair, installation, and custom woodwork.',
    services: [
      {
        id: 'furniture-repair',
        name: 'Furniture Repair',
        description: 'Expert repair of all types of wooden furniture.',
        price: '₹599',
        priceNote: 'Starting price',
        image: '/assets/generated/furniture-repair.dim_400x300.png',
        features: ['All wood types', 'Polish & finish', 'Quick turnaround'],
        variant: 'fixed',
      },
      {
        id: 'door-window-fix',
        name: 'Door & Window Fix',
        description: 'Repair and adjustment of doors, windows, and hinges.',
        price: '₹499',
        priceNote: 'Starting price',
        image: '/assets/generated/door-window-fix.dim_400x300.png',
        features: ['All door types', 'Lock repair', 'Hinge replacement'],
        variant: 'fixed',
      },
      {
        id: 'furniture-assembly',
        name: 'Furniture Assembly',
        description: 'Professional assembly of flat-pack and modular furniture.',
        price: '₹699',
        priceNote: 'Starting price',
        image: '/assets/generated/furniture-assembly.dim_400x300.png',
        features: ['All brands', 'Tools provided', 'Neat & tidy'],
        variant: 'fixed',
      },
      {
        id: 'wood-polishing',
        name: 'Wood Polishing',
        description: 'Restore the shine and beauty of your wooden furniture and floors.',
        price: '₹799',
        priceNote: 'Starting price',
        image: '/assets/generated/wood-polishing.dim_400x300.png',
        features: ['All wood types', 'Premium polish', 'Long-lasting'],
        variant: 'fixed',
      },
    ],
  },

  'ac-services': {
    id: 'ac-services',
    name: 'AC Services',
    icon: '/assets/generated/ac-services-icon.dim_200x200.png',
    image: '/assets/generated/ac-services-category.dim_400x300.png',
    description: 'Expert AC installation, servicing, and repair for all brands.',
    services: [
      {
        id: 'ac-service',
        name: 'AC Service & Cleaning',
        description: 'Complete AC servicing including filter cleaning and performance check.',
        price: '₹599',
        priceNote: 'Per unit',
        image: '/assets/generated/ac-service-card.dim_400x300.png',
        features: ['Filter cleaning', 'Coil cleaning', 'Performance check'],
        variant: 'fixed',
      },
      {
        id: 'ac-gas-refill',
        name: 'AC Gas Refill',
        description: 'Refrigerant gas refilling for optimal AC cooling performance.',
        price: '₹1499',
        priceNote: 'Per unit',
        image: '/assets/generated/ac-gas-refill.dim_400x300.png',
        features: ['All gas types', 'Leak check', 'Performance test'],
        variant: 'fixed',
      },
      {
        id: 'ac-installation',
        name: 'AC Installation',
        description: 'Professional AC installation for split and window AC units.',
        price: '₹1999',
        priceNote: 'Per unit',
        image: '/assets/generated/ac-installation.dim_400x300.png',
        features: ['All brands', 'Pipe fitting', 'Testing included'],
        variant: 'fixed',
      },
      {
        id: 'ac-deep-service',
        name: 'AC Deep Service',
        description: 'Comprehensive deep cleaning and servicing of AC units.',
        price: '₹999',
        priceNote: 'Per unit',
        image: '/assets/generated/ac-deep-service.dim_400x300.png',
        features: ['Deep cleaning', 'Chemical wash', 'Full inspection'],
        variant: 'fixed',
      },
    ],
  },

  'appliances-repair': {
    id: 'appliances-repair',
    name: 'Appliances Repair',
    icon: '/assets/generated/appliances-repair-icon.dim_200x200.png',
    image: '/assets/generated/appliances-repair-category.dim_400x300.png',
    description: 'Expert repair services for all home appliances and electronics.',
    services: [
      {
        id: 'washing-machine-repair',
        name: 'Washing Machine Repair',
        description: 'Repair of all types of washing machines - front load and top load.',
        price: '₹499',
        priceNote: 'Starting price',
        image: '/assets/generated/appliance-washing-machine.dim_400x300.png',
        features: ['All brands', 'Genuine parts', 'Warranty on repair'],
        variant: 'fixed',
      },
      {
        id: 'refrigerator-repair',
        name: 'Refrigerator Repair',
        description: 'Expert refrigerator repair including cooling issues and compressor problems.',
        price: '₹599',
        priceNote: 'Starting price',
        image: '/assets/generated/appliance-refrigerator.dim_400x300.png',
        features: ['All brands', 'Gas refilling', 'Compressor repair'],
        variant: 'fixed',
      },
      {
        id: 'microwave-repair',
        name: 'Microwave Repair',
        description: 'Repair of microwave ovens including heating and electrical issues.',
        price: '₹399',
        priceNote: 'Starting price',
        image: '/assets/generated/appliance-repair-card.dim_400x300.png',
        features: ['All brands', 'Quick repair', 'Genuine parts'],
        variant: 'fixed',
      },
    ],
  },

  'plumbing': {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '/assets/generated/plumbing-icon.dim_200x200.png',
    image: '/assets/generated/plumbing-category.dim_400x300.png',
    description: 'Professional plumbing services for repairs, installations, and maintenance.',
    services: [
      {
        id: 'pipe-leak-repair',
        name: 'Pipe Leak Repair',
        description: 'Quick and effective repair of pipe leaks and water seepage.',
        price: '₹499',
        priceNote: 'Starting price',
        image: '/assets/generated/plumbing-pipe-leak.dim_400x300.png',
        features: ['All pipe types', 'Quick fix', 'Leak guarantee'],
        variant: 'fixed',
      },
      {
        id: 'tap-replacement',
        name: 'Tap Replacement',
        description: 'Replacement and repair of taps, faucets, and mixers.',
        price: '₹399',
        priceNote: 'Starting price',
        image: '/assets/generated/plumbing-tap-replacement.dim_400x300.png',
        features: ['All brands', 'Quality fittings', 'Quick service'],
        variant: 'fixed',
      },
      {
        id: 'toilet-repair',
        name: 'Toilet Repair',
        description: 'Repair of toilet flush, seat, and other toilet fixtures.',
        price: '₹599',
        priceNote: 'Starting price',
        image: '/assets/generated/plumbing-toilet-repair.dim_400x300.png',
        features: ['All types', 'Genuine parts', 'Same day service'],
        variant: 'fixed',
      },
    ],
  },
};

// Legacy `services` array for backward compatibility (Footer, etc.)
export const services: Service[] = categoryOrder.map((id) => {
  const cat = servicesData[id];
  return {
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    image: cat.image,
    description: cat.description,
    type: id === 'pest-control'
      ? 'pest-control'
      : id === 'cleaning'
      ? 'cleaning'
      : id === 'painting'
      ? 'painting'
      : 'quote-only',
  };
});
