import React from 'react';
import { Vehicle } from '../types';
import { Sparkles, ArrowRight, MessageSquare, MapPin } from 'lucide-react';
import { formatGhs, formatUsd, getStatusBadgeInfo, getVehicleSlug, getWhatsAppVehicleLink } from '../utils/formatters';

interface FeaturedVehiclesSectionProps {
  vehicles: Vehicle[];
  currency: 'GHS' | 'USD';
  onNavigateToVehicles: () => void;
  onNavigateToDetail: (slug: string) => void;
  onRequestPrice: (vehicle: Vehicle) => void;
}

export const FeaturedVehiclesSection: React.FC<FeaturedVehiclesSectionProps> = ({
  vehicles,
  currency,
  onNavigateToVehicles,
  onNavigateToDetail,
  onRequestPrice
}) => {
  // Only public vehicles with featured = true and status != 'draft'
  const featuredVehicles = vehicles.filter(
    v => v.featured && (v.status || '').toLowerCase() !== 'draft'
  );

  return (
    <section id="featured-vehicles" className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1C] pb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED SHOWCASE INVENTORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            FEATURED <span className="text-[#D4AF37]">VEHICLES</span>
          </h2>

          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Handpicked wholesale inventory highlight units verified across our Tema staging yard and China export logistics hub.
          </p>
        </div>

        <button
          onClick={onNavigateToVehicles}
          className="flex items-center gap-2 px-5 py-3 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0"
        >
          <span>EXPLORE ALL VEHICLES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid or Empty State */}
      {featuredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map(vehicle => {
            const badge = getStatusBadgeInfo(vehicle.status);
            const slug = getVehicleSlug(vehicle);
            const hasPrice = (vehicle.priceGhs && vehicle.priceGhs > 0) || (vehicle.price && vehicle.price > 0);
            const isPriceOnReq = vehicle.priceOnRequest || !hasPrice;

            return (
              <div
                key={vehicle.id}
                className="bg-[#080809] border border-[#1A1A1C] hover:border-[#D4AF37] transition-all flex flex-col justify-between group overflow-hidden"
              >
                {/* Image Box */}
                <div className="relative aspect-[16/10] bg-[#020202] overflow-hidden">
                  <img
                    src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-1 border text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${badge.bg} ${badge.text} ${badge.border}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/80 border border-[#1A1A1C] text-[10px] font-mono text-slate-300 uppercase">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{vehicle.location || 'GHANA'}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                      <span>{vehicle.year} • {vehicle.stockId}</span>
                      <span className="text-[#D4AF37] uppercase">{vehicle.type || vehicle.bodyType || 'SUV'}</span>
                    </div>

                    <h3 className="text-lg font-black uppercase text-white tracking-tight mt-1 group-hover:text-[#D4AF37] transition-colors">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-2 border-t border-[#1A1A1C] flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase">WHOLESALE PRICE</span>
                      {isPriceOnReq ? (
                        <span className="text-sm font-black text-[#D4AF37] font-mono tracking-wider">
                          REQUEST PRICE
                        </span>
                      ) : (
                        <span className="text-base font-black text-white font-mono">
                          {currency === 'GHS' ? formatGhs(vehicle.priceGhs || vehicle.price) : formatUsd(vehicle.priceUsd)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onNavigateToDetail(slug)}
                      className="px-3.5 py-2 bg-[#D4AF37] text-black font-black text-xs font-mono uppercase tracking-wider hover:bg-[#c29f2e] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-12 px-6 bg-[#080809] border border-[#1A1A1C] text-center space-y-3 font-mono">
          <p className="text-slate-300 text-xs font-sans">
            Featured vehicles will appear here as our showcase is updated.
          </p>
          <button
            onClick={onNavigateToVehicles}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#050505] border border-[#1A1A1C] text-[#D4AF37] hover:border-[#D4AF37] text-xs font-bold uppercase tracking-wider"
          >
            <span>BROWSE VEHICLE CATALOGUE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </section>
  );
};
