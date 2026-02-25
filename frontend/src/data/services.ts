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

export const services: Service[] = [
  {
    id: 'pest-control',
    name: 'Pest Control',
    icon: '/assets/generated/pest-control-icon.dim_200x200.png',
    image: '/assets/generated/pest-control.dim_800x600.png',
    description: 'Professional pest control services for homes and offices',
    type: 'pest-control',
    pestControlItems: [
      {
        name: 'General Pest Control',
        image: '/assets/generated/general-pest-control.dim_600x400.png',
        description: 'Complete treatment for ants, cockroaches, and common pests',
        price: 'Starting ₹999',
      },
      {
        name: 'Cockroach Control',
        image: '/assets/generated/cockroach-control.dim_600x400.png',
        description: 'Targeted gel-based cockroach elimination treatment',
        price: 'Starting ₹799',
      },
      {
        name: 'Mosquito Control',
        image: '/assets/generated/mosquito-control.dim_600x400.png',
        description: 'Fogging and spray treatment to eliminate mosquitoes',
        price: 'Starting ₹899',
      },
      {
        name: 'Termite Control',
        image: '/assets/generated/termite-control.dim_600x400.png',
        description: 'Pre and post-construction anti-termite treatment',
        price: 'Starting ₹2499',
      },
      {
        name: 'Bed Bug Treatment',
        image: '/assets/generated/bed-bug-treatment.dim_600x400.png',
        description: 'Heat and chemical treatment for complete bed bug elimination',
        price: 'Starting ₹1499',
      },
      {
        name: 'Rodent Control',
        image: '/assets/generated/rodent-control.dim_600x400.png',
        description: 'Trapping and baiting solutions for rodent-free spaces',
        price: 'Starting ₹1299',
      },
    ],
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '/assets/generated/cleaning-icon.dim_200x200.png',
    image: '/assets/generated/cleaning.dim_800x600.png',
    description: 'Professional cleaning services for every space',
    type: 'cleaning',
    cleaningItems: [
      {
        name: 'Bathroom Cleaning',
        price: '₹449',
        priceNum: 449,
        variant: 'fixed',
        image: '/assets/generated/bathroom-cleaning.dim_400x300.png',
        description: 'Deep cleaning of bathroom tiles, fixtures, and fittings',
      },
      {
        name: 'Kitchen Cleaning',
        price: '₹1499',
        priceNum: 1499,
        variant: 'fixed',
        image: '/assets/generated/kitchen-cleaning.dim_400x300.png',
        description: 'Thorough cleaning of kitchen surfaces, chimney, and appliances',
      },
      {
        name: 'Home Cleaning – 1BHK Vacant',
        price: '₹2499',
        priceNum: 2499,
        variant: 'package',
        image: '/assets/generated/home-cleaning.dim_400x300.png',
        description: 'Complete cleaning for vacant 1BHK apartments',
      },
      {
        name: 'Home Cleaning – 1BHK Occupied',
        price: '₹3499',
        priceNum: 3499,
        variant: 'package',
        image: '/assets/generated/home-cleaning.dim_400x300.png',
        description: 'Deep cleaning for occupied 1BHK apartments',
      },
      {
        name: 'Home Cleaning – 2BHK Vacant',
        price: '₹3999',
        priceNum: 3999,
        variant: 'package',
        image: '/assets/generated/home-cleaning.dim_400x300.png',
        description: 'Complete cleaning for vacant 2BHK apartments',
      },
      {
        name: 'Home Cleaning – 2BHK Occupied',
        price: '₹4999',
        priceNum: 4999,
        variant: 'package',
        image: '/assets/generated/home-cleaning.dim_400x300.png',
        description: 'Deep cleaning for occupied 2BHK apartments',
      },
      {
        name: 'Home Cleaning – 3BHK Vacant',
        price: '₹5999',
        priceNum: 5999,
        variant: 'package',
        image: '/assets/generated/home-cleaning.dim_400x300.png',
        description: 'Complete cleaning for vacant 3BHK apartments',
      },
      {
        name: 'Home Cleaning – 3BHK Occupied',
        price: '₹6999',
        priceNum: 6999,
        variant: 'package',
        image: '/assets/generated/home-cleaning.dim_400x300.png',
        description: 'Deep cleaning for occupied 3BHK apartments',
      },
      {
        name: 'Villa Cleaning',
        price: 'Free Inspection → Quote → Service',
        variant: 'inspection',
        image: '/assets/generated/villa-cleaning.dim_800x600.png',
        description: 'Free inspection visit → Custom quote after assessment → Service',
      },
      {
        name: 'Commercial Cleaning',
        price: 'Free Inspection → Quote → Service',
        variant: 'inspection',
        image: '/assets/generated/commercial-cleaning.dim_800x600.png',
        description: 'Inspection required → Quote provided after site visit → Service',
      },
      {
        name: 'Carpet Cleaning',
        price: 'Free Inspection → Quote → Service',
        variant: 'inspection',
        image: '/assets/generated/carpet-cleaning.dim_800x600.png',
        description: 'Professional carpet cleaning with quote after inspection → Service',
      },
      {
        name: 'Sofa Cleaning',
        price: '₹699',
        priceNum: 699,
        variant: 'fixed',
        image: '/assets/generated/sofa-cleaning.dim_400x300.png',
        description: 'Deep cleaning and sanitization of sofas and upholstery',
        isSecondary: true,
      },
      {
        name: 'Mattress Cleaning',
        price: '₹799',
        priceNum: 799,
        variant: 'fixed',
        image: '/assets/generated/bathroom-cleaning.dim_400x300.png',
        description: 'UV treatment and deep cleaning for mattresses',
        isSecondary: true,
      },
    ],
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: '/assets/generated/painting-icon.dim_200x200.png',
    image: '/assets/generated/painting.dim_800x600.png',
    description: 'Professional painting services for interiors and exteriors',
    type: 'painting',
    paintingPackages: [
      {
        name: 'Tractor UNO (Economy)',
        pricePerSqft: 3,
        rating: 4.2,
        description: 'Budget-friendly interior wall paint with good coverage and durability',
        features: ['Washable finish', '2 coats included', 'Basic color options', 'Labor included'],
        image: '/assets/generated/painting-tractor-uno.dim_800x600.png',
      },
      {
        name: 'Tractor Emulsion',
        pricePerSqft: 7,
        rating: 4.4,
        description: 'Smooth finish emulsion paint ideal for interior walls and ceilings',
        features: ['Smooth finish', '2 coats + primer', 'Wide color range', 'Labor included'],
        image: '/assets/generated/painting-emulsion.dim_800x600.png',
      },
      {
        name: 'Premium Emulsion',
        pricePerSqft: 11,
        rating: 4.6,
        description: 'Premium quality emulsion with superior coverage and long-lasting finish',
        features: ['Superior coverage', 'Stain resistant', 'Premium colors', 'Labor + putty included'],
        image: '/assets/generated/painting-premium.dim_800x600.png',
      },
      {
        name: 'Royale Luxury',
        pricePerSqft: 15,
        rating: 4.8,
        description: 'Luxury paint with silk-like finish and excellent washability',
        features: ['Silk finish', 'Highly washable', 'Anti-fungal', 'Full service included'],
        image: '/assets/generated/painting-royale-luxury.dim_800x600.png',
      },
      {
        name: 'Royale Matt',
        pricePerSqft: 16,
        rating: 4.7,
        description: 'Elegant matte finish with rich depth and premium texture',
        features: ['Matte finish', 'Rich texture', 'Moisture resistant', 'Full service included'],
        image: '/assets/generated/painting-royale-matt.dim_800x600.png',
      },
      {
        name: 'Royale Shyne',
        pricePerSqft: 17,
        rating: 4.9,
        description: 'High-gloss shyne finish for a luxurious and vibrant look',
        features: ['High gloss', 'Vibrant colors', 'Easy to clean', 'Premium full service'],
        image: '/assets/generated/painting-service.dim_800x600.png',
      },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '/assets/generated/electrical-icon.dim_200x200.png',
    image: '/assets/generated/electrical.dim_800x600.png',
    description: 'Certified electricians for all your electrical needs',
    type: 'quote-only',
    subcategories: [
      {
        name: 'Wiring & Rewiring',
        image: '/assets/generated/electrical-wiring-repair.dim_400x300.png',
        description: 'Complete home wiring and rewiring services',
      },
      {
        name: 'Switch & Socket Repair',
        image: '/assets/generated/electrical-switch-repair.dim_400x300.png',
        description: 'Repair and replacement of switches and sockets',
      },
      {
        name: 'Fan Installation',
        image: '/assets/generated/electrical-fan-installation.dim_400x300.png',
        description: 'Ceiling fan and exhaust fan installation',
      },
      {
        name: 'Light Fitting',
        image: '/assets/generated/switch-repair.dim_400x300.png',
        description: 'Installation and repair of all types of lights',
      },
      {
        name: 'MCB & Fuse Box',
        image: '/assets/generated/electrical-card.dim_400x300.png',
        description: 'MCB replacement and fuse box maintenance',
      },
      {
        name: 'Inverter & UPS',
        image: '/assets/generated/electrical-category.dim_400x300.png',
        description: 'Inverter and UPS installation and servicing',
      },
    ],
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: '/assets/generated/carpentry-icon.dim_200x200.png',
    image: '/assets/generated/carpentry.dim_800x600.png',
    description: 'Expert carpenters for furniture and woodwork',
    type: 'quote-only',
    subcategories: [
      {
        name: 'Door & Window Repair',
        image: '/assets/generated/door-window-fix.dim_400x300.png',
        description: 'Repair and alignment of doors and windows',
      },
      {
        name: 'Furniture Assembly',
        image: '/assets/generated/carpentry-furniture-assembly.dim_400x300.png',
        description: 'Assembly of flat-pack and modular furniture',
      },
      {
        name: 'Furniture Repair',
        image: '/assets/generated/furniture-repair.dim_400x300.png',
        description: 'Repair and restoration of wooden furniture',
      },
      {
        name: 'Wood Polishing',
        image: '/assets/generated/wood-polishing.dim_400x300.png',
        description: 'Professional wood polishing and finishing',
      },
      {
        name: 'Wardrobe Fitting',
        image: '/assets/generated/carpentry-door-repair.dim_400x300.png',
        description: 'Custom wardrobe installation and fitting',
      },
      {
        name: 'False Ceiling',
        image: '/assets/generated/carpentry-card.dim_400x300.png',
        description: 'POP and gypsum false ceiling installation',
      },
    ],
  },
  {
    id: 'ac-services',
    name: 'AC Services',
    icon: '/assets/generated/ac-services-icon.dim_200x200.png',
    image: '/assets/generated/ac-services.dim_800x600.png',
    description: 'Complete AC installation, service, and repair',
    type: 'quote-only',
    subcategories: [
      {
        name: 'AC Installation',
        image: '/assets/generated/ac-installation.dim_400x300.png',
        description: 'Professional split and window AC installation',
      },
      {
        name: 'AC Service & Cleaning',
        image: '/assets/generated/ac-service-card.dim_400x300.png',
        description: 'Deep cleaning and servicing of AC units',
      },
      {
        name: 'Gas Refilling',
        image: '/assets/generated/ac-gas-refill.dim_400x300.png',
        description: 'AC refrigerant gas refilling and leak repair',
      },
      {
        name: 'AC Repair',
        image: '/assets/generated/ac-deep-service.dim_400x300.png',
        description: 'Diagnosis and repair of all AC problems',
      },
      {
        name: 'AC Uninstallation',
        image: '/assets/generated/ac-services-category.dim_400x300.png',
        description: 'Safe removal and uninstallation of AC units',
      },
    ],
  },
  {
    id: 'appliances-repair',
    name: 'Appliances Repair',
    icon: '/assets/generated/appliances-repair-icon.dim_200x200.png',
    image: '/assets/generated/appliances-repair.dim_800x600.png',
    description: 'Expert repair for all home appliances',
    type: 'quote-only',
    subcategories: [
      {
        name: 'Washing Machine Repair',
        image: '/assets/generated/appliance-washing-machine.dim_400x300.png',
        description: 'Repair of all brands of washing machines',
      },
      {
        name: 'Refrigerator Repair',
        image: '/assets/generated/appliance-refrigerator.dim_400x300.png',
        description: 'Fridge cooling and compressor repair',
      },
      {
        name: 'Microwave Repair',
        image: '/assets/generated/appliance-repair-card.dim_400x300.png',
        description: 'Microwave oven repair and servicing',
      },
      {
        name: 'Water Purifier Service',
        image: '/assets/generated/appliances-repair-category.dim_400x300.png',
        description: 'RO and UV water purifier service and filter change',
      },
      {
        name: 'TV Repair',
        image: '/assets/generated/appliance-repair-card.dim_400x300.png',
        description: 'LED, LCD and Smart TV repair services',
      },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '/assets/generated/plumbing-icon.dim_200x200.png',
    image: '/assets/generated/plumbing.dim_800x600.png',
    description: 'Professional plumbing services for homes and offices',
    type: 'quote-only',
    subcategories: [
      {
        name: 'Pipe Leak Repair',
        image: '/assets/generated/plumbing-pipe-leak.dim_400x300.png',
        description: 'Detection and repair of pipe leaks',
      },
      {
        name: 'Tap Replacement',
        image: '/assets/generated/plumbing-tap-replacement.dim_400x300.png',
        description: 'Tap and faucet replacement and repair',
      },
      {
        name: 'Toilet Repair',
        image: '/assets/generated/plumbing-toilet-repair.dim_400x300.png',
        description: 'Toilet flush, seat, and cistern repair',
      },
      {
        name: 'Drain Cleaning',
        image: '/assets/generated/plumbing-card.dim_400x300.png',
        description: 'Blocked drain and pipe cleaning services',
      },
      {
        name: 'Water Tank Cleaning',
        image: '/assets/generated/plumbing-category.dim_400x300.png',
        description: 'Overhead and underground tank cleaning',
      },
      {
        name: 'Motor Installation',
        image: '/assets/generated/plumbing-service.dim_400x300.png',
        description: 'Water pump and motor installation and repair',
      },
    ],
  },
];
