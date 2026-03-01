export const PHONE_NUMBER = "8884447229";
export const WHATSAPP_NUMBER = "918884447229";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  price?: number | string;
  priceUnit?: string;
  priceType?: "fixed" | "per_sqft";
  image?: string;
  features?: string[];
  propertyType?: string;
  subcategories?: SubcategoryGroup[];
  [key: string]: unknown;
}

export interface SubcategoryGroup {
  name: string;
  pricingType: "flat" | "per_sqft";
  services: ServiceItem[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  image: string;
  icon: string;
  color: string;
  services: ServiceItem[];
  subcategoryGroups?: SubcategoryGroup[];
  serviceVisitCharge?: number;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  alwaysIncluded?: boolean;
}

export const addOnOptions: AddOnOption[] = [
  { id: "emergency", name: "Same Day Emergency", price: 999 },
  { id: "holiday", name: "Sunday / Holiday", price: 799 },
  { id: "warranty", name: "Warranty Certificate", price: 0, alwaysIncluded: true },
];

export const categoryOrder: string[] = [
  "pestControl",
  "cleaning",
  "painting",
  "electrical",
  "plumbing",
  "carpentry",
  "ac",
  "appliances",
];

export const servicesData: Record<string, ServiceCategory> = {
  pestControl: {
    id: "pestControl",
    name: "Pest Control",
    description: "Professional pest control services for homes and businesses.",
    image: "/assets/generated/pest-control-category.dim_800x500.jpg",
    icon: "🐜",
    color: "from-orange-500 to-red-500",
    services: [
      {
        id: "general-pest-control",
        name: "General Pest Control",
        description: "Comprehensive pest control covering all common household pests.",
        price: 1499,
        priceType: "fixed",
        image: "/assets/generated/general-pest-control.dim_600x400.jpg",
        features: ["All pests covered", "Eco-friendly chemicals", "1-month warranty"],
      },
      {
        id: "cockroach-control",
        name: "Cockroach Control",
        description: "Effective gel-based cockroach treatment for kitchen and bathrooms.",
        price: 1299,
        priceType: "fixed",
        image: "/assets/generated/cockroach-control.dim_600x400.jpg",
        features: ["Gel-based treatment", "Safe for family & pets", "3-month warranty"],
      },
      {
        id: "ant-control",
        name: "Ant Control",
        description: "Targeted ant colony elimination treatment.",
        price: 1099,
        priceType: "fixed",
        image: "/assets/generated/ant-control.dim_600x400.jpg",
        features: ["Gel bait treatment", "Spray treatment", "Safe for children"],
      },
      {
        id: "bed-bug-treatment",
        name: "Bed Bug Treatment",
        description: "Complete bed bug elimination with heat and chemical treatment.",
        price: 3499,
        priceType: "fixed",
        image: "/assets/generated/bed-bug-treatment.dim_600x400.jpg",
        features: ["Heat treatment", "Chemical spray", "Follow-up visit included"],
      },
      {
        id: "mosquito-control",
        name: "Mosquito Control",
        description: "Indoor and outdoor mosquito fogging and spray treatment.",
        price: 1799,
        priceType: "fixed",
        image: "/assets/generated/mosquito-control.dim_600x400.jpg",
        features: ["Fogging treatment", "Larvicide application", "Long-lasting effect"],
      },
      {
        id: "termite-treatment",
        name: "Termite Treatment",
        description: "Pre and post-construction termite treatment.",
        price: 5999,
        priceType: "fixed",
        image: "/assets/generated/termite-treatment.dim_600x400.jpg",
        features: ["Soil treatment", "Wood treatment", "5-year warranty available"],
      },
      {
        id: "office-pest-control",
        name: "Office Pest Control",
        description: "Discreet and effective pest control for office environments.",
        price: 6,
        priceType: "per_sqft",
        priceUnit: "per sq.ft",
        propertyType: "commercial",
        image: "/assets/generated/pest-control-spray.dim_600x400.jpg",
        features: ["Weekend service available", "Odorless treatment", "Certificate provided"],
      },
      {
        id: "shop-pest-control",
        name: "Shop Pest Control",
        description: "Comprehensive pest management for shops and retail spaces.",
        price: 6,
        priceType: "per_sqft",
        priceUnit: "per sq.ft",
        propertyType: "commercial",
        image: "/assets/generated/pest-control-spray.dim_600x400.jpg",
        features: ["AMC available", "Certified chemicals", "Minimal disruption"],
      },
      {
        id: "warehouse-pest-control",
        name: "Warehouse Pest Control",
        description: "Large-scale pest management for warehouses and storage facilities.",
        price: 5,
        priceType: "per_sqft",
        priceUnit: "per sq.ft",
        propertyType: "commercial",
        image: "/assets/generated/pest-control-spray.dim_600x400.jpg",
        features: ["Bulk treatment", "Rodent control", "Compliance certificate"],
      },
      {
        id: "restaurant-pest-control",
        name: "Restaurant Pest Control",
        description: "Food-safe pest control for restaurants and food businesses.",
        price: 6,
        priceType: "per_sqft",
        priceUnit: "per sq.ft",
        propertyType: "commercial",
        image: "/assets/generated/pest-control-spray.dim_600x400.jpg",
        features: ["FSSAI compliant", "Food-safe chemicals", "Regular AMC"],
      },
      {
        id: "pre-construction-termite",
        name: "Pre-Construction Anti-Termite",
        description: "Pre-construction soil treatment to prevent termite infestation.",
        price: 6,
        priceType: "per_sqft",
        priceUnit: "per sq.ft",
        propertyType: "construction",
        image: "/assets/generated/termite-control.dim_400x300.png",
        features: ["Soil treatment", "Anti-termite barrier", "Compliance certificate"],
      },
      {
        id: "post-construction-termite",
        name: "Post-Construction Anti-Termite",
        description: "Post-construction termite treatment for existing structures.",
        price: 5,
        priceType: "per_sqft",
        priceUnit: "per sq.ft",
        propertyType: "construction",
        image: "/assets/generated/termite-control.dim_400x300.png",
        features: ["Drill & fill method", "Chemical barrier", "5-year warranty"],
      },
    ],
    subcategoryGroups: [
      {
        name: "Residential",
        pricingType: "flat",
        services: [
          { id: "general-pest-control", name: "General Pest Control", price: 1499, priceType: "fixed" },
          { id: "cockroach-control", name: "Cockroach Control", price: 1299, priceType: "fixed" },
          { id: "ant-control", name: "Ant Control", price: 1099, priceType: "fixed" },
          { id: "bed-bug-treatment", name: "Bed Bug Treatment", price: 3499, priceType: "fixed" },
          { id: "mosquito-control", name: "Mosquito Control", price: 1799, priceType: "fixed" },
          { id: "termite-treatment", name: "Termite Treatment", price: 5999, priceType: "fixed" },
        ],
      },
      {
        name: "Commercial (Sq.ft)",
        pricingType: "per_sqft",
        services: [
          { id: "office-pest-control", name: "Office Pest Control", price: 6, priceType: "per_sqft", priceUnit: "per sq.ft" },
          { id: "shop-pest-control", name: "Shop Pest Control", price: 6, priceType: "per_sqft", priceUnit: "per sq.ft" },
          { id: "warehouse-pest-control", name: "Warehouse Pest Control", price: 5, priceType: "per_sqft", priceUnit: "per sq.ft" },
          { id: "restaurant-pest-control", name: "Restaurant Pest Control", price: 6, priceType: "per_sqft", priceUnit: "per sq.ft" },
        ],
      },
      {
        name: "Construction (Sq.ft)",
        pricingType: "per_sqft",
        services: [
          { id: "pre-construction-termite", name: "Pre-Construction Anti-Termite", price: 6, priceType: "per_sqft", priceUnit: "per sq.ft" },
          { id: "post-construction-termite", name: "Post-Construction Anti-Termite", price: 5, priceType: "per_sqft", priceUnit: "per sq.ft" },
        ],
      },
    ],
  },

  cleaning: {
    id: "cleaning",
    name: "Deep Cleaning",
    description: "Professional deep cleaning for homes and offices.",
    image: "/assets/generated/cleaning-category.dim_800x500.jpg",
    icon: "🧹",
    color: "from-cyan-500 to-blue-500",
    services: [
      { id: "1bhk-cleaning", name: "1BHK Deep Cleaning", price: 3499, priceType: "fixed" },
      { id: "2bhk-cleaning", name: "2BHK Deep Cleaning", price: 4999, priceType: "fixed" },
      { id: "3bhk-cleaning", name: "3BHK Deep Cleaning", price: 6499, priceType: "fixed" },
      { id: "4bhk-cleaning", name: "4BHK Deep Cleaning", price: 7999, priceType: "fixed" },
      { id: "kitchen-cleaning", name: "Kitchen Deep Cleaning", price: 2499, priceType: "fixed", image: "/assets/generated/kitchen-cleaning.dim_400x300.png" },
      { id: "bathroom-cleaning", name: "Bathroom Deep Cleaning", price: 1499, priceType: "fixed", image: "/assets/generated/bathroom-cleaning.dim_400x300.png" },
      { id: "sofa-cleaning", name: "Sofa Cleaning", price: 799, priceType: "fixed", priceUnit: "per seat", image: "/assets/generated/sofa-cleaning.dim_400x300.png" },
      { id: "mattress-cleaning", name: "Mattress Cleaning", price: 799, priceType: "fixed", image: "/assets/generated/mattress-cleaning.dim_800x600.png" },
      { id: "carpet-cleaning", name: "Carpet Cleaning", price: 18, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/carpet-cleaning.dim_800x600.png" },
      { id: "water-tank-cleaning", name: "Water Tank Cleaning", price: 2499, priceType: "fixed" },
      { id: "office-cleaning", name: "Office Deep Cleaning", price: 8, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/commercial-cleaning.dim_800x600.png" },
    ],
  },

  painting: {
    id: "painting",
    name: "Painting Services",
    description: "Interior and exterior painting with premium quality paints.",
    image: "/assets/generated/painting-category.dim_800x500.jpg",
    icon: "🎨",
    color: "from-yellow-500 to-orange-500",
    services: [
      { id: "interior-basic", name: "Interior Basic", price: 18, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/interior-painting-pro.dim_600x400.jpg" },
      { id: "interior-premium", name: "Interior Premium", price: 25, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/painting-premium.dim_800x600.png" },
      { id: "luxury-finish", name: "Luxury Finish", price: 35, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/painting-royale-luxury.dim_800x600.png" },
      { id: "exterior-painting", name: "Exterior Painting", price: 22, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/exterior-painting.dim_800x600.png" },
      { id: "single-room", name: "Single Room", price: 6999, priceType: "fixed", image: "/assets/generated/interior-painting.dim_800x600.png" },
      { id: "waterproof-coating", name: "Waterproof Coating", price: 28, priceType: "per_sqft", priceUnit: "per sq.ft" },
      { id: "texture-painting", name: "Texture Painting", price: 45, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/wall-texture-apply.dim_600x400.jpg" },
    ],
  },

  electrical: {
    id: "electrical",
    name: "Electrical Services",
    description: "Certified electricians for all your electrical needs.",
    image: "/assets/generated/electrical-category.dim_800x500.jpg",
    icon: "⚡",
    color: "from-yellow-400 to-amber-500",
    serviceVisitCharge: 499,
    services: [
      { id: "wiring-repair", name: "Wiring Repair", price: 699, priceType: "fixed", image: "/assets/generated/electrical-installation.dim_600x400.jpg" },
      { id: "switch-socket", name: "Switch / Socket", price: 299, priceType: "fixed", image: "/assets/generated/electrical-switch-repair.dim_400x300.png" },
      { id: "fan-installation", name: "Fan Installation", price: 499, priceType: "fixed", image: "/assets/generated/electrical-fan-installation.dim_400x300.png" },
      { id: "light-installation", name: "Light Installation", price: 299, priceType: "fixed" },
      { id: "mcb-replacement", name: "MCB Replacement", price: 799, priceType: "fixed" },
      { id: "inverter-installation", name: "Inverter Installation", price: 1499, priceType: "fixed" },
      { id: "db-board-installation", name: "DB Board Installation", price: 2999, priceType: "fixed" },
      { id: "earthing", name: "Earthing", price: 3999, priceType: "fixed" },
    ],
  },

  plumbing: {
    id: "plumbing",
    name: "Plumbing Services",
    description: "Expert plumbers for all plumbing repairs and installations.",
    image: "/assets/generated/plumbing-category.dim_800x500.jpg",
    icon: "🚰",
    color: "from-blue-500 to-indigo-500",
    serviceVisitCharge: 499,
    services: [
      { id: "leak-repair", name: "Leak Repair", price: 699, priceType: "fixed", image: "/assets/generated/plumbing-pipe-leak.dim_400x300.png" },
      { id: "tap-installation", name: "Tap Installation", price: 499, priceType: "fixed", image: "/assets/generated/plumbing-tap-replacement.dim_400x300.png" },
      { id: "pipe-replacement", name: "Pipe Replacement", price: 799, priceType: "fixed" },
      { id: "drain-block-removal", name: "Drain Block Removal", price: 999, priceType: "fixed" },
      { id: "bathroom-fittings", name: "Bathroom Fittings", price: 1499, priceType: "fixed", image: "/assets/generated/plumbing-toilet-repair.dim_400x300.png" },
      { id: "motor-installation", name: "Motor Installation", price: 2499, priceType: "fixed", image: "/assets/generated/motor-installation.dim_800x600.png" },
      { id: "borewell-connection", name: "Borewell Connection", price: 3999, priceType: "fixed", image: "/assets/generated/borewell-motor-plumber.dim_600x400.jpg" },
    ],
  },

  carpentry: {
    id: "carpentry",
    name: "Carpentry Services",
    description: "Skilled carpenters for furniture, doors, and woodwork.",
    image: "/assets/generated/carpentry-category.dim_800x500.jpg",
    icon: "🔨",
    color: "from-amber-600 to-yellow-600",
    serviceVisitCharge: 499,
    services: [
      { id: "door-repair", name: "Door Repair", price: 799, priceType: "fixed", image: "/assets/generated/carpentry-door-repair.dim_400x300.png" },
      { id: "cupboard-repair", name: "Cupboard Repair", price: 999, priceType: "fixed" },
      { id: "furniture-assembly", name: "Furniture Assembly", price: 1299, priceType: "fixed", image: "/assets/generated/carpentry-furniture-assembly.dim_400x300.png" },
      { id: "modular-kitchen-repair", name: "Modular Kitchen Repair", price: 2999, priceType: "fixed" },
      { id: "wood-polishing", name: "Wood Polishing", price: 35, priceType: "per_sqft", priceUnit: "per sq.ft", image: "/assets/generated/wood-polishing.dim_400x300.png" },
      { id: "wardrobe-installation", name: "New Wardrobe Installation", price: 8999, priceType: "fixed", description: "Starting price" },
    ],
  },

  ac: {
    id: "ac",
    name: "AC Services",
    description: "Expert AC installation, service, and repair.",
    image: "/assets/generated/ac-services-category.dim_800x500.jpg",
    icon: "❄",
    color: "from-sky-500 to-cyan-500",
    serviceVisitCharge: 499,
    services: [
      { id: "ac-general-service", name: "AC General Service", price: 799, priceType: "fixed", image: "/assets/generated/ac-service-tech.dim_600x400.jpg" },
      { id: "ac-deep-service", name: "AC Deep Service", price: 1499, priceType: "fixed", image: "/assets/generated/ac-deep-service.dim_400x300.png" },
      { id: "ac-installation", name: "AC Installation", price: 2499, priceType: "fixed", image: "/assets/generated/ac-installation.dim_400x300.png" },
      { id: "ac-uninstallation", name: "AC Uninstallation", price: 999, priceType: "fixed" },
      { id: "gas-refill", name: "Gas Refill", price: 3499, priceType: "fixed", image: "/assets/generated/ac-gas-refill.dim_400x300.png" },
      { id: "pcb-repair", name: "PCB Repair", price: 4999, priceType: "fixed" },
      { id: "ac-jet-wash", name: "AC Jet Wash", price: 1299, priceType: "fixed" },
    ],
  },

  appliances: {
    id: "appliances",
    name: "Appliances Repair",
    description: "Expert repair for all home appliances.",
    image: "/assets/generated/appliances-repair-category.dim_800x500.jpg",
    icon: "🛠",
    color: "from-purple-500 to-violet-500",
    serviceVisitCharge: 499,
    services: [
      { id: "washing-machine", name: "Washing Machine", price: 699, priceType: "fixed", description: "Starting price", image: "/assets/generated/appliance-washing-machine.dim_400x300.png" },
      { id: "refrigerator", name: "Refrigerator", price: 799, priceType: "fixed", description: "Starting price", image: "/assets/generated/appliance-refrigerator.dim_400x300.png" },
      { id: "microwave", name: "Microwave", price: 699, priceType: "fixed", description: "Starting price", image: "/assets/generated/microwave-repair.dim_800x600.png" },
      { id: "tv-repair", name: "TV Repair", price: 999, priceType: "fixed", description: "Starting price" },
      { id: "geyser-repair", name: "Geyser Repair", price: 699, priceType: "fixed", description: "Starting price" },
      { id: "chimney-service", name: "Chimney Service", price: 1299, priceType: "fixed" },
      { id: "hob-repair", name: "Hob Repair", price: 1499, priceType: "fixed" },
    ],
  },
};
