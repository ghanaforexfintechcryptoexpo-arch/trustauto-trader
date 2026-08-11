import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  X, 
  Send, 
  CheckCircle2, 
  Truck, 
  Building2, 
  Globe2,
  Info
} from 'lucide-react';
import { getWhatsAppSourcingLink } from '../utils/formatters';

interface ShowcaseCategory {
  id: string;
  title: string;
  buttonLabel: string;
  subtitle: string;
  image: string;
  popularModels: string[];
  specsSummary: string;
  powertrains: string;
  originBase: string;
  description: string;
}

const SHOWCASE_ITEMS: ShowcaseCategory[] = [
  {
    id: 'toyota',
    title: 'TOYOTA & JAPANESE BRANDS',
    buttonLabel: 'EXPLORE TOYOTA',
    subtitle: 'Proven Durability & High Resale Retention',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Land Cruiser Prado / 300 Series', 'RAV4 Hybrid & Petrol', 'Hilux Revo 4x4 Double Cab', 'Camry & Corolla Executive'],
    specsSummary: '2.0L - 3.5L V6 Twin-Turbo, Dual VVT-i, AWD & 4WD Heavy Duty Chassis',
    powertrains: 'Petrol, Hybrid (HEV), Diesel (GD-6)',
    originBase: 'Tema Staging Yard & Global Wholesale Channels',
    description: 'The backbone of West African automotive demand. Trust Auto Trader sources factory-grade Toyota Land Cruisers, RAV4s, and Hilux double cabs tailored for commercial fleet reliability and personal prestige.'
  },
  {
    id: 'geely',
    title: 'GEELY AUTOMOTIVE RANGE',
    buttonLabel: 'EXPLORE GEELY',
    subtitle: 'Volvo-Engineered Tech & Modern SUV Design',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Monjaro (Xingyue L) 2.0T AWD', 'Tugella 2.0T Coupe SUV', 'Azkarra / Boyue Pro 1.5T AWD', 'Coolray Sport Turbo'],
    specsSummary: '2.0T Drive-E Volvo Engine (238 HP), 8-Speed Aisin Transmission, BorgWarner AWD',
    powertrains: 'Turbo Petrol, 48V Mild Hybrid (MHEV)',
    originBase: '5,000m² China Export Base',
    description: 'Combining Swedish engineering with cutting-edge infotainment. Geely SUVs are among the highest-demand executive utility vehicles sourced through our China export base.'
  },
  {
    id: 'changan',
    title: 'CHANGAN AUTOMOTIVE',
    buttonLabel: 'EXPLORE CHANGAN',
    subtitle: 'Futuristic Styling & High-Efficiency Blue Core Powertrains',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['UNI-K AWD Executive Crossover', 'UNI-T Cyberpunk Sport Crossover', 'CS75 Plus 2.0T Family SUV', 'Hunter 4x4 Turbo Pickup'],
    specsSummary: '2.0T Blue Core Engine (233 HP, 390 Nm), Aisin 8AT, Level 2+ Autonomous ADAS',
    powertrains: 'Turbo Petrol, iDD Plug-in Hybrid (PHEV)',
    originBase: '5,000m² China Export Base',
    description: 'Recognized for stunning futuristic architecture and ultra-reliable Blue Core turbo engines, Changan models deliver top-tier luxury amenities at wholesale import economics.'
  },
  {
    id: 'byd',
    title: 'BYD ELECTRIC VEHICLES',
    buttonLabel: 'EXPLORE BYD',
    subtitle: 'World-Leading Blade Battery & EV Innovation',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['BYD Seal AWD Sport Sedan (523 HP)', 'BYD Han EV Executive Flagship', 'BYD Atto 3 (Yuan Plus) Compact SUV', 'BYD Dolphin Urban Hatchback'],
    specsSummary: 'Ultra-Safe Blade Battery Technology, e-Platform 3.0, 0-100 km/h in 3.8s',
    powertrains: '100% Pure Electric (BEV), DM-i Super Hybrid',
    originBase: '5,000m² China Export Base',
    description: 'The global leader in EV technology. BYD vehicles feature flame-proof Blade Battery cells, zero fuel expenses, and superior thermal efficiency built for modern urban transportation.'
  },
  {
    id: 'suvs',
    title: 'SUVs & CROSSOVERS',
    buttonLabel: 'EXPLORE SUVs',
    subtitle: 'Compact, Mid-size & 7-Seater Family Off-Roaders',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['GAC GS8 7-Seater AWD', 'GWM Tank 300 Off-Road 4WD', 'Honda CR-V Turbo Touring', 'Jetour Dashing & X70 Plus'],
    specsSummary: 'All-Wheel Drive (AWD), Intelligent Terrain Modes, High Ground Clearance',
    powertrains: 'Petrol, Hybrid, PHEV, EV',
    originBase: 'Tema Yard & China Export Base',
    description: 'Versatile SUVs built for rough road conditions, diplomatic escort fleets, and family travel. Available in diverse seating configurations and trim levels.'
  },
  {
    id: 'sedans',
    title: 'SEDANS & EXECUTIVE CARS',
    buttonLabel: 'EXPLORE SEDANS',
    subtitle: 'Sleek Fuel Efficiency & Diplomatic Luxury Comfort',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['BYD Seal Sport Sedan', 'BMW 5 Series & 3 Series', 'Toyota Camry Executive', 'Chery Arrizo 8 Turbo'],
    specsSummary: 'Aerodynamic Drag Efficiency (Cd 0.21), Premium Nappa Leather, Surround Sound',
    powertrains: 'Petrol, Mild Hybrid, Electric',
    originBase: 'Tema Yard & China Export Base',
    description: 'Sleek executive sedans offering quiet highway acoustics, low running costs, and impressive corporate executive appeal.'
  },
  {
    id: 'pickups',
    title: 'PICKUP TRUCKS & 4x4 UTILITY',
    buttonLabel: 'EXPLORE PICKUPS',
    subtitle: 'Heavy Commercial Payloads & Off-Road Fleet Durability',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Ford Ranger Wildtrak Bi-Turbo 4x4', 'Toyota Hilux Revo Rocco 2.8L GD-6', 'ISUZU D-Max V-Cross', 'Great Wall Poer 4x4'],
    specsSummary: '1-Ton Payload Capability, 3.5-Ton Towing Rating, Low-Range 4WD Lockers',
    powertrains: 'Turbo Diesel, Petrol 4x4',
    originBase: 'Tema Yard & China Export Base',
    description: 'Engineered for mining, agriculture, construction, and security fleets. Rugged 4x4 utility pickups equipped with reinforced chassis frame rails.'
  },
  {
    id: 'commercial',
    title: 'COMMERCIAL & HEAVY TRUCKS',
    buttonLabel: 'EXPLORE COMMERCIAL',
    subtitle: 'Tractor Heads, Tipper Dumpers & Industrial Fleets',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['FAW Jiefang J6P 380HP 6x4 Tractor Head', 'Sinotruk HOWO 371HP Dumper', 'Shacman F3000 Heavy Tipper', 'Foton Auman Heavy Duty'],
    specsSummary: '380HP - 430HP Weichai / FAW Diesel Engines, 12-Speed FAST Gearbox, 40-Ton Payload',
    powertrains: 'Heavy Duty Intercooled Turbo Diesel',
    originBase: 'Direct China Heavy Machinery Export Staging',
    description: 'Direct procurement channels for heavy-duty construction transport, logistics tractor units, and mining dumpers directly sourced from China manufacturer bases.'
  }
];

interface VehicleShowcaseProps {
  onSourceRequest: (categoryOrBrand: string) => void;
}

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({ onSourceRequest }) => {
  const [selectedCategory, setSelectedCategory] = useState<ShowcaseCategory | null>(null);

  return (
    <section id="showcase" className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1C] pb-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>WHOLESALE VEHICLE CATALOGUE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            EXPLORE OUR <span className="text-[#D4AF37]">VEHICLE RANGE</span>
          </h2>

          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Visually showcasing the core brands, categories, and commercial vehicles Trust Auto Trader sources through our international wholesale network.
          </p>
        </div>

        <div className="font-mono text-xs text-slate-400 bg-[#080809] border border-[#1A1A1C] p-3 shrink-0">
          <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">
            CATALOGUE NOTICE:
          </div>
          <p className="text-[11px] leading-tight font-sans">
            Showcasing sourcing capabilities & specifications.<br />
            Submit a request for exact model availability.
          </p>
        </div>
      </div>

      {/* Showcase Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SHOWCASE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group bg-[#080809] border border-[#1A1A1C] hover:border-[#D4AF37] transition-all flex flex-col overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-black/20" />
              
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono text-[#D4AF37] font-bold uppercase border border-[#2A2A30]">
                {item.originBase}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-black uppercase tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Micro Models preview */}
                <div className="pt-2 border-t border-[#1A1A1C]/80 space-y-1 font-mono text-[10px]">
                  <span className="text-slate-500 uppercase tracking-wider block font-bold">POPULAR SOURCING MODELS:</span>
                  <p className="text-slate-300 line-clamp-2">
                    {item.popularModels.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedCategory(item)}
                className="w-full py-3 bg-[#121215] group-hover:bg-[#D4AF37] text-white group-hover:text-black font-mono font-black text-xs uppercase tracking-widest transition-all border border-[#2A2A30] group-hover:border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer mt-auto"
              >
                <span>{item.buttonLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sourcing Callout Banner */}
      <div className="bg-[#080809] border border-[#D4AF37]/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>CUSTOM VEHICLE & FLEET SOURCING</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white font-sans">
            NEED A SPECIFIC MAKE, MODEL, OR COMMERCIAL SPECIFICATION?
          </h3>
          <p className="text-xs text-slate-400 font-sans font-light max-w-2xl">
            We source any brand, powertrain, or heavy utility truck directly through our 5,000m² China export base and global automotive channels.
          </p>
        </div>

        <button
          onClick={() => onSourceRequest('All Brands & Categories')}
          className="whitespace-nowrap px-8 py-4 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-mono font-black text-xs uppercase tracking-widest transition-colors cursor-pointer shrink-0"
        >
          SOURCE A CUSTOM VEHICLE →
        </button>
      </div>

      {/* Detail / Sourcing Spec Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A0A0C] border border-[#2A2A30] max-w-2xl w-full p-6 sm:p-8 space-y-6 relative text-[#F0F0F0]">
            
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-[#121215] border border-[#2A2A30] hover:text-[#D4AF37] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest block">
                VEHICLE RANGE & SPECIFICATION CATALOGUE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {selectedCategory.title}
              </h3>
              <p className="text-slate-400 text-xs font-light">
                {selectedCategory.subtitle}
              </p>
            </div>

            {/* Image */}
            <div className="aspect-video w-full overflow-hidden border border-[#1A1A1C]">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Specifications Breakdown */}
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 bg-[#121215] border border-[#1A1A1C] space-y-2">
                <span className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider block">OVERVIEW & SOURCING FIT:</span>
                <p className="text-slate-300 font-sans font-light leading-relaxed">
                  {selectedCategory.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#121215] border border-[#1A1A1C]">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1">POPULAR MODELS:</span>
                  <ul className="space-y-1 text-white font-sans text-xs">
                    {selectedCategory.popularModels.map((m, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-[#D4AF37]"></span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-[#121215] border border-[#1A1A1C] space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">POWERTRAIN OPTIONS:</span>
                    <span className="text-white text-xs">{selectedCategory.powertrains}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">ORIGIN CHANNEL:</span>
                    <span className="text-[#D4AF37] text-xs font-bold">{selectedCategory.originBase}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#1A1A1C] flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const categoryName = selectedCategory.title;
                  setSelectedCategory(null);
                  onSourceRequest(categoryName);
                }}
                className="flex-1 py-4 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-mono font-black text-xs uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                REQUEST SOURCING FOR THIS RANGE →
              </button>

              <a
                href={getWhatsAppSourcingLink(`Hi Trust Auto Trader, I am interested in sourcing ${selectedCategory.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                WHATSAPP ENQUIRY
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
