export const PHONE_NUMBER = '+918884447229';
export const WHATSAPP_NUMBER = '918884447229';

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Legacy ServiceItem interface (kept for backward compatibility) ────────────
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

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  features: string[];
  category?: string;
}

export interface PaintingPackage {
  id: string;
  name: string;
  pricePerSqft: number;
  oldPricePerSqft: number;
  label: string;
  jobCount: number;
  rating: number;
  reviewCount: number;
  features: string[];
  image: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  subcategories?: Subcategory[];
  packages?: PaintingPackage[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  services: Service[];
}

// ─── Pest Control Subcategories ───────────────────────────────────────────────
const pestControlSubcategories: Subcategory[] = [
  {
    id: 'general-pest-control',
    name: 'General Pest Control',
    description: 'Comprehensive treatment for all common household pests',
    image: '/assets/generated/pest-control-spray.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['All common pests covered', 'Safe chemicals used', 'Post-treatment support'],
    category: 'Pest Control',
  },
  {
    id: 'cockroach-control',
    name: 'Cockroach Control',
    description: 'Targeted gel-bait and spray treatment to eliminate cockroaches',
    image: '/assets/generated/cockroach-control.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Gel bait treatment', 'Crack & crevice spray', '30-day warranty'],
    category: 'Pest Control',
  },
  {
    id: 'ant-control',
    name: 'Ant Control',
    description: 'Effective ant colony elimination with residual barrier treatment',
    image: '/assets/generated/ant-control.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Colony elimination', 'Barrier treatment', 'Entry point sealing'],
    category: 'Pest Control',
  },
  {
    id: 'termite-treatment',
    name: 'Termite Treatment',
    description: 'Anti-termite soil treatment and wood injection for complete protection',
    image: '/assets/generated/termite-treatment.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Soil treatment', 'Wood injection', '1-year warranty'],
    category: 'Pest Control',
  },
  {
    id: 'bed-bug-treatment',
    name: 'Bed Bug Treatment',
    description: 'Heat and chemical treatment to completely eradicate bed bugs',
    image: '/assets/generated/bed-bug-treatment.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Heat treatment option', 'Mattress treatment', '45-day warranty'],
    category: 'Pest Control',
  },
  {
    id: 'mosquito-fogging',
    name: 'Mosquito Fogging',
    description: 'Thermal fogging to eliminate mosquitoes from indoor and outdoor areas',
    image: '/assets/generated/mosquito-control.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Thermal fogging', 'Larval treatment', 'Outdoor coverage'],
    category: 'Pest Control',
  },
  {
    id: 'rodent-control',
    name: 'Rodent Control',
    description: 'Trapping and baiting solutions to remove rats and mice effectively',
    image: '/assets/generated/rodent-control.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Bait stations', 'Glue traps', 'Entry point sealing'],
    category: 'Pest Control',
  },
  {
    id: 'pre-construction-anti-termite',
    name: 'Pre-construction Anti-Termite',
    description: 'Chemical soil treatment before construction to prevent termite infestation',
    image: '/assets/generated/termite-control.dim_600x400.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['Pre-slab treatment', 'Post-slab treatment', 'Completion certificate'],
    category: 'Pest Control',
  },
  {
    id: 'office-pest-control',
    name: 'Office Pest Control',
    description: 'Discreet and effective pest management for commercial office spaces',
    image: '/assets/generated/pest-control-tech.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['After-hours service', 'Odorless treatment', 'Monthly contracts available'],
    category: 'Pest Control',
  },
  {
    id: 'restaurant-pest-control',
    name: 'Restaurant Pest Control',
    description: 'FSSAI-compliant pest control for restaurants and food establishments',
    image: '/assets/generated/general-pest-control.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['FSSAI compliant', 'Food-safe chemicals', 'Compliance certificate'],
    category: 'Pest Control',
  },
];

// ─── Cleaning Subcategories ───────────────────────────────────────────────────
const cleaningSubcategories: Subcategory[] = [
  {
    id: 'balcony-cleaning',
    name: 'Balcony Cleaning',
    description: 'Deep cleaning of balcony floors, railings, and walls',
    image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Floor scrubbing', 'Railing cleaning', 'Drain unclogging'],
    category: 'Cleaning',
  },
  {
    id: 'curtain-cleaning',
    name: 'Curtain Cleaning',
    description: 'On-site steam cleaning and dry cleaning for all curtain types',
    image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Steam cleaning', 'Stain removal', 'Fabric care'],
    category: 'Cleaning',
  },
  {
    id: 'water-tank-cleaning',
    name: 'Water Tank Cleaning',
    description: 'Professional cleaning and disinfection of overhead and underground tanks',
    image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Tank scrubbing', 'Disinfection', 'Water quality check'],
    category: 'Cleaning',
  },
  {
    id: 'move-in-cleaning',
    name: 'Move-in Cleaning',
    description: 'Thorough cleaning of your new home before you move in',
    image: '/assets/generated/home-cleaning.dim_400x300.png',
    price: 'Quote Based',
    features: ['Full home cleaning', 'Kitchen deep clean', 'Bathroom sanitization'],
    category: 'Cleaning',
  },
  {
    id: 'move-out-cleaning',
    name: 'Move-out Cleaning',
    description: 'Complete cleaning service to ensure full security deposit return',
    image: '/assets/generated/home-cleaning.dim_400x300.png',
    price: 'Quote Based',
    features: ['Wall cleaning', 'Appliance cleaning', 'Floor polishing'],
    category: 'Cleaning',
  },
  {
    id: '4bhk-cleaning',
    name: '4BHK Cleaning',
    description: 'Comprehensive deep cleaning for large 4BHK homes',
    image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
    price: '₹7,999',
    features: ['All rooms covered', 'Kitchen & bathrooms', 'Balcony included'],
    category: 'Cleaning',
  },
  {
    id: 'office-cleaning',
    name: 'Office Cleaning',
    description: 'Professional daily or weekly cleaning for office spaces',
    image: '/assets/generated/commercial-cleaning.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['Workstation cleaning', 'Common area cleaning', 'Restroom sanitization'],
    category: 'Cleaning',
  },
  {
    id: 'school-cleaning',
    name: 'School Cleaning',
    description: 'Safe and thorough cleaning for classrooms and school premises',
    image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Classroom cleaning', 'Washroom sanitization', 'Playground cleaning'],
    category: 'Cleaning',
  },
  {
    id: 'hospital-cleaning',
    name: 'Hospital Cleaning',
    description: 'Medical-grade disinfection and cleaning for healthcare facilities',
    image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Medical-grade disinfectants', 'Bio-hazard protocols', 'Certified staff'],
    category: 'Cleaning',
  },
  {
    id: 'apartment-common-area-cleaning',
    name: 'Apartment Common Area Cleaning',
    description: 'Regular cleaning of lobbies, staircases, and common areas',
    image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Lobby cleaning', 'Staircase mopping', 'Lift cleaning'],
    category: 'Cleaning',
  },
];

// ─── Painting Packages ────────────────────────────────────────────────────────
const paintingPackages: PaintingPackage[] = [
  {
    id: 'tractor-uno',
    name: 'Tractor UNO',
    pricePerSqft: 5,
    oldPricePerSqft: 8,
    label: 'Including Labor & Material',
    jobCount: 142,
    rating: 4.9,
    reviewCount: 89,
    features: ['Basic interior finish', 'Single coat application', 'Wall preparation included'],
    image: '/assets/generated/painting-tractor-uno.dim_800x600.png',
  },
  {
    id: 'tractor-emulsion',
    name: 'Tractor Emulsion',
    pricePerSqft: 9,
    oldPricePerSqft: 13,
    label: 'Including Labor & Material',
    jobCount: 218,
    rating: 4.9,
    reviewCount: 134,
    features: ['Smooth emulsion finish', 'Double coat application', 'Putty work included'],
    image: '/assets/generated/painting-emulsion.dim_800x600.png',
  },
  {
    id: 'premium-emulsion',
    name: 'Premium Emulsion',
    pricePerSqft: 13,
    oldPricePerSqft: 18,
    label: 'Including Labor & Material',
    jobCount: 176,
    rating: 4.9,
    reviewCount: 112,
    features: ['Premium smooth finish', 'Washable surface', 'Primer + 2 coats'],
    image: '/assets/generated/painting-premium.dim_800x600.png',
  },
  {
    id: 'royale-luxury',
    name: 'Royale Luxury',
    pricePerSqft: 17,
    oldPricePerSqft: 23,
    label: 'Including Labor & Material',
    jobCount: 98,
    rating: 4.9,
    reviewCount: 67,
    features: ['Asian Paints Royale', 'Superior sheen finish', 'Stain resistant'],
    image: '/assets/generated/painting-royale-luxury.dim_800x600.png',
  },
  {
    id: 'royale-matt',
    name: 'Royale Matt',
    pricePerSqft: 18,
    oldPricePerSqft: 24,
    label: 'Including Labor & Material',
    jobCount: 87,
    rating: 4.9,
    reviewCount: 54,
    features: ['Matt finish texture', 'Hides surface imperfections', 'Easy to clean'],
    image: '/assets/generated/painting-royale-matt.dim_800x600.png',
  },
  {
    id: 'royale-shyne',
    name: 'Royale Shyne',
    pricePerSqft: 19,
    oldPricePerSqft: 25,
    label: 'Including Labor & Material',
    jobCount: 73,
    rating: 4.9,
    reviewCount: 48,
    features: ['High gloss shyne finish', 'Moisture resistant', 'Long-lasting durability'],
    image: '/assets/generated/interior-painting-pro.dim_600x400.jpg',
  },
  {
    id: 'royale-health-shield',
    name: 'Royale Health Shield',
    pricePerSqft: 19,
    oldPricePerSqft: 26,
    label: 'Including Labor & Material',
    jobCount: 61,
    rating: 4.9,
    reviewCount: 39,
    features: ['Anti-bacterial protection', 'Virus Shield technology', 'Safe for kids & elderly'],
    image: '/assets/generated/interior-painting-pro.dim_600x400.jpg',
  },
];

// ─── Painting Subcategories ───────────────────────────────────────────────────
const paintingSubcategories: Subcategory[] = [
  {
    id: 'exterior-weather-coat',
    name: 'Exterior Weather Coat',
    description: 'Weather-resistant exterior coating for long-lasting protection',
    image: '/assets/generated/exterior-painting.dim_800x600.png',
    price: 'Quote Based',
    features: ['Weather resistant', '5-year warranty', 'UV protection'],
    category: 'Painting',
  },
  {
    id: 'waterproof-exterior-paint',
    name: 'Waterproof Exterior Paint',
    description: 'Waterproof paint solution for exterior walls and facades',
    image: '/assets/generated/exterior-painting.dim_800x600.png',
    price: 'Quote Based',
    features: ['100% waterproof', 'Crack bridging', 'Anti-algae formula'],
    category: 'Painting',
  },
  {
    id: 'texture-finish',
    name: 'Texture Finish',
    description: 'Decorative texture finishes to add character to your walls',
    image: '/assets/generated/wall-texture-apply.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Multiple patterns', 'Durable finish', 'Custom designs'],
    category: 'Painting',
  },
  {
    id: 'putty-work',
    name: 'Putty Work',
    description: 'Wall putty application for smooth and even surface preparation',
    image: '/assets/generated/wall-putty.dim_800x600.png',
    price: 'Quote Based',
    features: ['Surface leveling', 'Crack filling', 'Smooth base coat'],
    category: 'Painting',
  },
  {
    id: 'primer-work',
    name: 'Primer Work',
    description: 'Professional primer application for better paint adhesion',
    image: '/assets/generated/primer-work-roller.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Better adhesion', 'Stain blocking', 'Uniform base'],
    category: 'Painting',
  },
  {
    id: 'stencil-design',
    name: 'Stencil Design',
    description: 'Artistic stencil patterns to create unique accent walls',
    image: '/assets/generated/interior-painting-pro.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['100+ patterns', 'Custom stencils', 'Multi-color options'],
    category: 'Painting',
  },
  {
    id: 'wall-texture',
    name: 'Wall Texture',
    description: 'Premium wall texture application for a luxurious interior look',
    image: '/assets/generated/wall-texture-apply.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Sand texture', 'Venetian plaster', 'Metallic finish'],
    category: 'Painting',
  },
  {
    id: 'kids-room-theme-painting',
    name: 'Kids Room Theme Painting',
    description: "Fun and vibrant themed painting for children's bedrooms",
    image: '/assets/generated/kids-room-theme-wall.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Custom themes', 'Child-safe paints', 'Character designs'],
    category: 'Painting',
  },
  {
    id: 'waterproof-coating',
    name: 'Waterproof Coating',
    description: 'Protective waterproof coating for terraces, bathrooms, and wet areas',
    image: '/assets/generated/exterior-painting.dim_800x600.png',
    price: 'Quote Based',
    features: ['Terrace waterproofing', 'Bathroom coating', '10-year warranty'],
    category: 'Painting',
  },
];

// ─── Electrical Subcategories ─────────────────────────────────────────────────
const electricalSubcategories: Subcategory[] = [
  {
    id: 'cctv-installation',
    name: 'CCTV Installation',
    description: 'Professional CCTV camera installation for home and office security',
    image: '/assets/generated/cctv-installation-tech.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['HD cameras', 'Night vision', 'Remote monitoring'],
    category: 'Electrical',
  },
  {
    id: 'inverter-installation',
    name: 'Inverter Installation',
    description: 'Safe and efficient inverter and battery installation at home',
    image: '/assets/generated/electrical-installation.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['All brands supported', 'Battery fitting', 'Wiring included'],
    category: 'Electrical',
  },
  {
    id: 'door-bell-installation',
    name: 'Door Bell Installation',
    description: 'Wired and wireless doorbell installation and replacement',
    image: '/assets/generated/electrical-installation.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Wired & wireless', 'Video doorbell option', 'Quick installation'],
    category: 'Electrical',
  },
  {
    id: 'led-strip-installation',
    name: 'LED Strip Installation',
    description: 'Decorative LED strip lighting installation for ceilings and cabinets',
    image: '/assets/generated/electrical-installation.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['RGB options', 'Dimmer control', 'False ceiling fitting'],
    category: 'Electrical',
  },
  {
    id: 'geyser-wiring',
    name: 'Geyser Wiring',
    description: 'Safe electrical wiring and connection for water geysers',
    image: '/assets/generated/electrical-installation.dim_600x400.jpg',
    price: 'Quote Based',
    features: ['Safe wiring', 'MCB fitting', 'Earthing check'],
    category: 'Electrical',
  },
];

// ─── Carpentry Subcategories ──────────────────────────────────────────────────
const carpentrySubcategories: Subcategory[] = [
  {
    id: 'custom-wardrobe',
    name: 'Custom Wardrobe',
    description: 'Bespoke wardrobe design and installation to fit your space perfectly',
    image: '/assets/generated/carpenter-working.dim_800x600.png',
    price: 'Quote Based',
    features: ['Custom dimensions', 'Multiple finishes', 'Sliding/hinged doors'],
    category: 'Carpentry',
  },
  {
    id: 'modular-kitchen-work',
    name: 'Modular Kitchen Work',
    description: 'Design and installation of modular kitchen cabinets and fittings',
    image: '/assets/generated/carpenter-working.dim_800x600.png',
    price: 'Quote Based',
    features: ['Custom layout', 'Premium hardware', 'Soft-close hinges'],
    category: 'Carpentry',
  },
  {
    id: 'door-repair',
    name: 'Door Repair',
    description: 'Repair and restoration of wooden doors, frames, and hinges',
    image: '/assets/generated/door-window-fixing.dim_800x600.png',
    price: 'Quote Based',
    features: ['Hinge replacement', 'Frame repair', 'Lock fitting'],
    category: 'Carpentry',
  },
  {
    id: 'window-repair',
    name: 'Window Repair',
    description: 'Repair and replacement of wooden window frames and shutters',
    image: '/assets/generated/door-window-fixing.dim_800x600.png',
    price: 'Quote Based',
    features: ['Frame repair', 'Glass replacement', 'Weatherproofing'],
    category: 'Carpentry',
  },
  {
    id: 'furniture-assembly',
    name: 'Furniture Assembly',
    description: 'Professional assembly of flat-pack and modular furniture',
    image: '/assets/generated/furniture-assembly.dim_600x400.png',
    price: 'Quote Based',
    features: ['All brands', 'Tools provided', 'Quick turnaround'],
    category: 'Carpentry',
  },
  {
    id: 'furniture-repair',
    name: 'Furniture Repair',
    description: 'Repair and restoration of damaged wooden furniture',
    image: '/assets/generated/furniture-repair.dim_400x300.png',
    price: 'Quote Based',
    features: ['Wood repair', 'Polish restoration', 'Joint fixing'],
    category: 'Carpentry',
  },
  {
    id: 'wood-polishing',
    name: 'Wood Polishing',
    description: 'Professional wood polishing and finishing for furniture and floors',
    image: '/assets/generated/wood-polishing.dim_400x300.png',
    price: 'Quote Based',
    features: ['French polish', 'Melamine finish', 'Wax coating'],
    category: 'Carpentry',
  },
  {
    id: 'false-ceiling',
    name: 'False Ceiling',
    description: 'Design and installation of gypsum and PVC false ceilings',
    image: '/assets/generated/carpenter-working.dim_800x600.png',
    price: 'Quote Based',
    features: ['Gypsum board', 'PVC panels', 'LED integration'],
    category: 'Carpentry',
  },
];

// ─── AC Services Subcategories ────────────────────────────────────────────────
const acSubcategories: Subcategory[] = [
  {
    id: 'ac-service-cleaning',
    name: 'AC Service & Cleaning',
    description: 'Complete AC servicing including filter cleaning and coil wash',
    image: '/assets/generated/ac-service-tech.dim_600x400.jpg',
    price: '₹499',
    features: ['Filter cleaning', 'Coil wash', 'Performance check'],
    category: 'AC Services',
  },
  {
    id: 'ac-gas-refill',
    name: 'AC Gas Refill',
    description: 'Refrigerant gas refilling for optimal AC cooling performance',
    image: '/assets/generated/ac-gas-refill.dim_400x300.png',
    price: '₹1,499',
    features: ['R22 & R32 gas', 'Leak check', 'Cooling test'],
    category: 'AC Services',
  },
  {
    id: 'ac-installation',
    name: 'AC Installation',
    description: 'Professional split and window AC installation with piping',
    image: '/assets/generated/ac-installation.dim_400x300.png',
    price: '₹1,299',
    features: ['All brands', 'Copper piping', 'Stabilizer fitting'],
    category: 'AC Services',
  },
  {
    id: 'ac-uninstallation',
    name: 'AC Uninstallation',
    description: 'Safe removal and uninstallation of split and window AC units',
    image: '/assets/generated/ac-service-tech.dim_600x400.jpg',
    price: '₹699',
    features: ['Gas recovery', 'Safe dismounting', 'Pipe capping'],
    category: 'AC Services',
  },
  {
    id: 'ac-repair',
    name: 'AC Repair',
    description: 'Diagnosis and repair of all AC faults and malfunctions',
    image: '/assets/generated/ac-service-tech.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['PCB repair', 'Compressor check', 'All brands'],
    category: 'AC Services',
  },
  {
    id: 'ac-deep-service',
    name: 'AC Deep Service',
    description: 'Thorough deep cleaning of indoor and outdoor AC units',
    image: '/assets/generated/ac-deep-service.dim_400x300.png',
    price: '₹799',
    features: ['Jet wash', 'Drain cleaning', 'Sanitization'],
    category: 'AC Services',
  },
];

// ─── Appliances Repair Subcategories ─────────────────────────────────────────
const appliancesSubcategories: Subcategory[] = [
  {
    id: 'washing-machine-repair',
    name: 'Washing Machine Repair',
    description: 'Repair of all washing machine brands and models',
    image: '/assets/generated/washing-machine-repair.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['All brands', 'Same-day service', 'Genuine parts'],
    category: 'Appliances Repair',
  },
  {
    id: 'refrigerator-repair',
    name: 'Refrigerator Repair',
    description: 'Expert repair for all refrigerator types and brands',
    image: '/assets/generated/refrigerator-repair.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['Cooling issues', 'Compressor repair', 'All brands'],
    category: 'Appliances Repair',
  },
  {
    id: 'microwave-repair',
    name: 'Microwave Repair',
    description: 'Fast and reliable microwave oven repair service',
    image: '/assets/generated/microwave-repair.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['All types', 'Magnetron repair', 'Door fix'],
    category: 'Appliances Repair',
  },
  {
    id: 'ro-repair',
    name: 'RO Repair',
    description: 'RO water purifier repair, service, and filter replacement',
    image: '/assets/generated/ro-repair-tech.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Filter change', 'Membrane replacement', 'All brands'],
    category: 'Appliances Repair',
  },
  {
    id: 'geyser-repair',
    name: 'Geyser Repair',
    description: 'Repair and servicing of electric and gas water geysers',
    image: '/assets/generated/appliance-repair-service.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['Heating element', 'Thermostat fix', 'All brands'],
    category: 'Appliances Repair',
  },
  {
    id: 'dishwasher-repair',
    name: 'Dishwasher Repair',
    description: 'Professional dishwasher repair and maintenance service',
    image: '/assets/generated/appliance-repair-service.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['Pump repair', 'Spray arm fix', 'All brands'],
    category: 'Appliances Repair',
  },
];

// ─── Plumbing Subcategories ───────────────────────────────────────────────────
const plumbingSubcategories: Subcategory[] = [
  {
    id: 'pipe-leakage-repair',
    name: 'Pipe Leakage Repair',
    description: 'Fast detection and repair of pipe leaks in walls and floors',
    image: '/assets/generated/plumbing-repair-sink.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Leak detection', 'Pipe sealing', 'Wall repair'],
    category: 'Plumbing',
  },
  {
    id: 'tap-replacement',
    name: 'Tap Replacement',
    description: 'Replacement and installation of kitchen and bathroom taps',
    image: '/assets/generated/tap-repair.dim_800x600.png',
    price: '₹299',
    features: ['All tap types', 'Mixer taps', 'Sensor taps'],
    category: 'Plumbing',
  },
  {
    id: 'toilet-repair',
    name: 'Toilet Repair',
    description: 'Repair of flush tanks, toilet seats, and cistern mechanisms',
    image: '/assets/generated/plumbing-repair-sink.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Flush repair', 'Seat replacement', 'Cistern fix'],
    category: 'Plumbing',
  },
  {
    id: 'borewell-motor',
    name: 'Borewell Motor',
    description: 'Installation, repair, and servicing of borewell submersible pumps',
    image: '/assets/generated/borewell-motor-plumber.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Submersible pumps', 'Motor winding', 'Pipe fitting'],
    category: 'Plumbing',
  },
  {
    id: 'bathroom-fitting',
    name: 'Bathroom Fitting',
    description: 'Complete bathroom fitting including showers, basins, and accessories',
    image: '/assets/generated/bathroom-plumbing.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['Shower fitting', 'Basin installation', 'Accessories'],
    category: 'Plumbing',
  },
  {
    id: 'drainage-cleaning',
    name: 'Drainage Cleaning',
    description: 'High-pressure jetting and manual cleaning of blocked drains',
    image: '/assets/generated/plumbing-repair-sink.dim_600x400.jpg',
    price: 'Free Inspection – Quote After Visit',
    features: ['Jet cleaning', 'Blockage removal', 'CCTV inspection'],
    category: 'Plumbing',
  },
  {
    id: 'water-purifier-installation',
    name: 'Water Purifier Installation',
    description: 'Installation and setup of RO and UV water purifiers',
    image: '/assets/generated/water-purifier-service.dim_800x600.png',
    price: '₹499',
    features: ['All brands', 'Wall mounting', 'Demo included'],
    category: 'Plumbing',
  },
  {
    id: 'motor-pump-installation',
    name: 'Motor Pump Installation',
    description: 'Installation of water motor pumps for overhead and sump tanks',
    image: '/assets/generated/motor-installation.dim_800x600.png',
    price: 'Free Inspection – Quote After Visit',
    features: ['All pump types', 'Wiring included', 'Auto switch'],
    category: 'Plumbing',
  },
];

// ─── Services Data ────────────────────────────────────────────────────────────
export const servicesData: Record<string, ServiceCategory> = {
  'pest-control': {
    id: 'pest-control',
    name: 'Pest Control',
    icon: '🐛',
    image: '/assets/generated/pest-control-category.dim_800x500.jpg',
    description: 'Professional pest control services for homes and offices. Safe, effective, and guaranteed.',
    services: [
      {
        id: 'pest-control-general',
        name: 'Pest Control Services',
        description: 'Complete pest management solutions for all types of pests',
        price: 'Free Inspection',
        image: '/assets/generated/pest-control-spray.dim_600x400.jpg',
        features: ['Certified technicians', 'Safe chemicals', 'Guaranteed results'],
        subcategories: pestControlSubcategories,
      },
    ],
  },
  'cleaning': {
    id: 'cleaning',
    name: 'Deep Cleaning',
    icon: '🧹',
    image: '/assets/generated/cleaning-category.dim_800x500.jpg',
    description: 'Professional deep cleaning services for homes, offices, and commercial spaces.',
    services: [
      {
        id: 'cleaning-1bhk',
        name: '1BHK Deep Cleaning',
        description: 'Complete deep cleaning for 1BHK apartments',
        price: '₹1,999',
        image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
        features: ['Kitchen deep clean', 'Bathroom sanitization', 'Floor mopping'],
      },
      {
        id: 'cleaning-2bhk',
        name: '2BHK Deep Cleaning',
        description: 'Complete deep cleaning for 2BHK apartments',
        price: '₹2,999',
        image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
        features: ['All rooms covered', 'Kitchen & bathrooms', 'Balcony cleaning'],
      },
      {
        id: 'cleaning-3bhk',
        name: '3BHK Deep Cleaning',
        description: 'Complete deep cleaning for 3BHK apartments',
        price: '₹3,999',
        image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
        features: ['All rooms covered', 'Kitchen & bathrooms', 'Balcony cleaning'],
      },
      {
        id: 'cleaning-villa',
        name: 'Villa Cleaning',
        description: 'Comprehensive cleaning for villas and large homes',
        price: '₹5,999',
        image: '/assets/generated/villa-cleaning.dim_800x600.png',
        features: ['All floors covered', 'Garden area', 'Garage cleaning'],
      },
      {
        id: 'cleaning-sofa',
        name: 'Sofa Cleaning',
        description: 'Deep cleaning and sanitization of sofas and upholstery',
        price: '₹799',
        image: '/assets/generated/sofa-cleaning.dim_400x300.png',
        features: ['Foam extraction', 'Stain removal', 'Sanitization'],
      },
      {
        id: 'cleaning-carpet',
        name: 'Carpet Cleaning',
        description: 'Professional carpet cleaning with hot water extraction',
        price: '₹999',
        image: '/assets/generated/carpet-cleaning.dim_800x600.png',
        features: ['Hot water extraction', 'Stain removal', 'Deodorizing'],
      },
      {
        id: 'cleaning-mattress',
        name: 'Mattress Cleaning',
        description: 'Deep cleaning and sanitization of mattresses',
        price: '₹599',
        image: '/assets/generated/mattress-cleaning.dim_800x600.png',
        features: ['UV sanitization', 'Dust mite removal', 'Deodorizing'],
      },
      {
        id: 'cleaning-kitchen',
        name: 'Kitchen Deep Cleaning',
        description: 'Thorough cleaning of kitchen including chimney and appliances',
        price: '₹1,499',
        image: '/assets/generated/kitchen-cleaning.dim_400x300.png',
        features: ['Chimney cleaning', 'Appliance cleaning', 'Cabinet cleaning'],
      },
      {
        id: 'cleaning-bathroom',
        name: 'Bathroom Deep Cleaning',
        description: 'Complete bathroom sanitization and deep cleaning',
        price: '₹499',
        image: '/assets/generated/bathroom-cleaning.dim_400x300.png',
        features: ['Tile scrubbing', 'Sanitization', 'Drain cleaning'],
      },
      {
        id: 'cleaning-other',
        name: 'Other Cleaning Services',
        description: 'Specialized cleaning for unique requirements',
        price: 'Free Inspection – Quote After Visit',
        image: '/assets/generated/deep-cleaning-team.dim_600x400.jpg',
        features: ['Custom solutions', 'Commercial spaces', 'Post-construction'],
        subcategories: cleaningSubcategories,
      },
    ],
  },
  'painting': {
    id: 'painting',
    name: 'Painting',
    icon: '🎨',
    image: '/assets/generated/painting-category.dim_800x500.jpg',
    description: 'Professional interior and exterior painting services with premium quality paints.',
    services: [
      {
        id: 'painting-interior',
        name: 'Interior Painting',
        description: 'Transform your home interiors with premium quality paints',
        price: 'Starting ₹5/sqft',
        image: '/assets/generated/interior-painting-pro.dim_600x400.jpg',
        features: ['Premium paints', 'Expert painters', 'Clean work'],
        packages: paintingPackages,
      },
      {
        id: 'painting-exterior',
        name: 'Exterior Painting',
        description: 'Weather-resistant exterior painting for lasting beauty',
        price: 'Quote Based',
        image: '/assets/generated/exterior-painting.dim_800x600.png',
        features: ['Weather resistant', 'UV protection', 'Long lasting'],
        subcategories: paintingSubcategories,
      },
    ],
  },
  'electrical': {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    image: '/assets/generated/electrical-category.dim_800x500.jpg',
    description: 'Licensed electricians for all your home and office electrical needs.',
    services: [
      {
        id: 'electrical-wiring',
        name: 'Wiring & Repair',
        description: 'Complete electrical wiring, repair, and maintenance',
        price: 'Free Inspection – Quote After Visit',
        image: '/assets/generated/electrical-installation.dim_600x400.jpg',
        features: ['Licensed electricians', 'Safety certified', 'All work guaranteed'],
        subcategories: electricalSubcategories,
      },
      {
        id: 'electrical-fan',
        name: 'Fan Installation',
        description: 'Ceiling fan and exhaust fan installation and repair',
        price: '₹299',
        image: '/assets/generated/electrical-fan-installation.dim_400x300.png',
        features: ['All fan types', 'Regulator fitting', 'Safe installation'],
      },
      {
        id: 'electrical-switch',
        name: 'Switch & Socket Repair',
        description: 'Repair and replacement of switches, sockets, and MCBs',
        price: '₹199',
        image: '/assets/generated/electrical-switch-repair.dim_400x300.png',
        features: ['All brands', 'MCB fitting', 'Quick fix'],
      },
      {
        id: 'electrical-light',
        name: 'Light Installation',
        description: 'Installation of LED lights, chandeliers, and decorative lighting',
        price: '₹199',
        image: '/assets/generated/electrical-installation.dim_600x400.jpg',
        features: ['LED lights', 'Chandeliers', 'Outdoor lights'],
      },
    ],
  },
  'carpentry': {
    id: 'carpentry',
    name: 'Carpentry',
    icon: '🔨',
    image: '/assets/generated/carpentry-category.dim_800x500.jpg',
    description: 'Expert carpenters for furniture repair, installation, and custom woodwork.',
    services: [
      {
        id: 'carpentry-general',
        name: 'Carpentry Services',
        description: 'All types of carpentry work for homes and offices',
        price: 'Free Inspection – Quote After Visit',
        image: '/assets/generated/carpenter-working.dim_800x600.png',
        features: ['Expert carpenters', 'Quality materials', 'Timely delivery'],
        subcategories: carpentrySubcategories,
      },
    ],
  },
  'ac-services': {
    id: 'ac-services',
    name: 'AC Services',
    icon: '❄️',
    image: '/assets/generated/ac-services-category.dim_800x500.jpg',
    description: 'Expert AC installation, servicing, repair, and gas refilling for all brands.',
    services: [
      {
        id: 'ac-general',
        name: 'AC Services',
        description: 'Complete AC solutions for all brands and models',
        price: 'Starting ₹499',
        image: '/assets/generated/ac-service-tech.dim_600x400.jpg',
        features: ['All brands', 'Certified technicians', 'Same-day service'],
        subcategories: acSubcategories,
      },
    ],
  },
  'appliances-repair': {
    id: 'appliances-repair',
    name: 'Appliances Repair',
    icon: '🔧',
    image: '/assets/generated/appliances-repair-category.dim_800x500.jpg',
    description: 'Fast and reliable repair for all home appliances by certified technicians.',
    services: [
      {
        id: 'appliances-general',
        name: 'Appliance Repair',
        description: 'Expert repair for all home appliances',
        price: 'Free Inspection – Quote After Visit',
        image: '/assets/generated/appliance-repair-service.dim_800x600.png',
        features: ['All brands', 'Genuine parts', '90-day warranty'],
        subcategories: appliancesSubcategories,
      },
    ],
  },
  'plumbing': {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '🚿',
    image: '/assets/generated/plumbing-category.dim_800x500.jpg',
    description: 'Professional plumbing services for leaks, installations, and repairs.',
    services: [
      {
        id: 'plumbing-general',
        name: 'Plumbing Services',
        description: 'Complete plumbing solutions for homes and offices',
        price: 'Free Inspection – Quote After Visit',
        image: '/assets/generated/plumbing-repair-sink.dim_600x400.jpg',
        features: ['Licensed plumbers', 'All work guaranteed', 'Emergency service'],
        subcategories: plumbingSubcategories,
      },
    ],
  },
};

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
