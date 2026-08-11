import React from 'react';
import { 
  Building2, 
  Fuel, 
  Gauge, 
  Globe2, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  Eye,
  Tag
} from 'lucide-react';
import { Vehicle } from '../types';
import { formatGhs, formatUsd, getWhatsAppVehicleLink } from '../utils/formatters';
import { handleImageError, DEFAULT_VEHICLE_IMAGE } from '../utils/imageUtils';

interface VehicleCardProps {
  vehicle: Vehicle;
  currency: 'GHS' | 'USD';
  onSelect: (v: Vehicle) => void;
  onRequestPrice: (v: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  currency,
  onSelect,
  onRequestPrice
}) => {
  const whatsappUrl = getWhatsAppVehicleLink(vehicle);

  // Status Badge Colors
  const getStatusBadge = (status: Vehicle['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: 'AVAILABLE',
          bg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
          dot: 'bg-emerald-500 animate-pulse'
        };
      case 'JUST ARRIVED':
        return {
          label: 'JUST ARRIVED',
          bg: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400',
          dot: 'bg-cyan-400 animate-ping'
        };
      case 'RESERVED':
        return {
          label: 'RESERVED',
          bg: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
          dot: 'bg-amber-500'
        };
      case 'SOLD':
        return {
          label: 'SOLD',
          bg: 'bg-rose-500/10 border-rose-500/40 text-rose-400',
          dot: 'bg-rose-500'
        };
      case 'COMING SOON':
        return {
          label: 'COMING SOON',
          bg: 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400',
          dot: 'bg-indigo-400'
        };
      default:
        return {
          label: status,
          bg: 'bg-slate-800 text-slate-300',
          dot: 'bg-slate-400'
        };
    }
  };

  const statusBadge = getStatusBadge(vehicle.status);

  return (
    <div className="group relative bg-[#080809] border border-[#1A1A1C] hover:border-[#D4AF37] transition-all duration-300 flex flex-col overflow-hidden font-sans">
      
      {/* Vehicle Media Box */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-[#050505] cursor-pointer" onClick={() => onSelect(vehicle)}>
        <img
          src={vehicle.images?.[0] || DEFAULT_VEHICLE_IMAGE}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Location Badge */}
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border shadow-md flex items-center gap-1 uppercase tracking-wider ${
            vehicle.location === 'GHANA'
              ? 'bg-[#050505] text-[#00FF41] border-[#00FF41]/40'
              : 'bg-[#050505] text-[#D4AF37] border-[#D4AF37]/40'
          }`}>
            {vehicle.location === 'GHANA' ? <MapPin className="w-3 h-3" /> : <Globe2 className="w-3 h-3" />}
            <span>{vehicle.location === 'GHANA' ? 'TEMA STOCK' : 'CHINA BASE'}</span>
          </span>

          {/* Stock ID */}
          <span className="text-[10px] font-mono font-bold bg-[#050505] text-slate-300 px-2 py-0.5 border border-[#1A1A1C]">
            {vehicle.stockId}
          </span>
        </div>

        {/* Bottom Media Bar Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Status Indicator */}
          <span className={`text-[9px] font-mono font-black px-2 py-0.5 border flex items-center gap-1.5 uppercase tracking-widest ${
            vehicle.status === 'AVAILABLE' ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/40' :
            vehicle.status === 'JUST ARRIVED' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/40' :
            vehicle.status === 'RESERVED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/40' :
            'bg-slate-800 text-slate-300 border-slate-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${vehicle.status === 'AVAILABLE' ? 'bg-[#00FF41] animate-ping' : 'bg-[#D4AF37]'}`} />
            {vehicle.status}
          </span>

          {/* Image Counter */}
          {vehicle.images.length > 1 && (
            <span className="text-[9px] font-mono text-slate-400 bg-[#050505] px-2 py-0.5 border border-[#1A1A1C]">
              {vehicle.images.length} PHOTOS
            </span>
          )}
        </div>
      </div>

      {/* Vehicle Info Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title & Trim */}
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] font-bold mb-1 uppercase tracking-widest">
            <span>{vehicle.year}</span>
            <span>•</span>
            <span>{vehicle.make}</span>
            <span>•</span>
            <span className="text-slate-400">{vehicle.condition}</span>
          </div>

          <h3 
            onClick={() => onSelect(vehicle)}
            className="text-base font-black text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 cursor-pointer uppercase tracking-tight"
          >
            {vehicle.make} {vehicle.model}
          </h3>

          <p className="text-slate-400 text-xs font-normal line-clamp-1 mt-0.5">
            {vehicle.trim}
          </p>
        </div>

        {/* Key Specs Pill Grid */}
        <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#1A1A1C] text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5 truncate">
            <Gauge className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span>{vehicle.mileageKm === 0 ? '0 KM (NEW)' : `${vehicle.mileageKm.toLocaleString()} KM`}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Fuel className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span className="uppercase">{vehicle.fuel}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Tag className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span className="uppercase">{vehicle.transmission}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span className="uppercase">{vehicle.drivetrain}</span>
          </div>
        </div>

        {/* Pricing & Primary Action Row */}
        <div className="pt-1 flex items-end justify-between gap-2">
          <div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">WHOLESALE PRICE</div>
            {vehicle.priceOnRequest ? (
              <div className="text-[#D4AF37] font-black text-sm uppercase">PRICE ON REQUEST</div>
            ) : (
              <div>
                <div className="text-white font-black text-lg tracking-tight font-sans">
                  {currency === 'GHS' ? formatGhs(vehicle.priceGhs) : formatUsd(vehicle.priceUsd)}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {currency === 'GHS' ? `(~${formatUsd(vehicle.priceUsd)})` : `(~${formatGhs(vehicle.priceGhs)})`}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp about this vehicle"
              className="p-2 bg-[#050505] hover:bg-[#00FF41] border border-[#00FF41] text-[#00FF41] hover:text-black transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onSelect(vehicle)}
              className="px-3 py-2 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-[10px] tracking-widest uppercase flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>INSPECT</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
