import React, { useState } from 'react';
import { Vehicle } from '../types';
import { 
  ArrowLeft, MessageSquare, MapPin, Fuel, Gauge, ShieldCheck, 
  CheckCircle2, Compass, Sparkles, Send, PhoneCall, Share2, AlertCircle
} from 'lucide-react';
import { formatGhs, formatUsd, formatNumber, getStatusBadgeInfo, getWhatsAppVehicleLink, getWhatsAppSourcingLink } from '../utils/formatters';

interface VehicleDetailPageProps {
  vehicle: Vehicle | null;
  loading: boolean;
  currency: 'GHS' | 'USD';
  onBack: () => void;
  onRequestPrice: (vehicle: Vehicle) => void;
  onRequestSourcing: (vehicle?: Vehicle) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicle,
  loading,
  currency,
  onBack,
  onRequestPrice,
  onRequestSourcing
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans pt-28 pb-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">LOADING VEHICLE DATA...</p>
        </div>
      </div>
    );
  }

  // Handle vehicle not found or draft status (draft is hidden from public)
  if (!vehicle || (vehicle.status && vehicle.status.toLowerCase() === 'draft')) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans pt-28 pb-20 px-4">
        <div className="max-w-xl mx-auto py-20 text-center space-y-6 bg-[#080809] border border-[#1A1A1C] p-8 shadow-2xl">
          <AlertCircle className="w-12 h-12 text-[#D4AF37] mx-auto" />
          <h2 className="text-2xl font-black uppercase text-white font-sans">VEHICLE NOT FOUND</h2>
          <p className="text-slate-400 text-xs font-sans leading-relaxed">
            The vehicle listing you are trying to view is unavailable or may have been updated.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3 font-mono text-xs">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black uppercase tracking-wider cursor-pointer"
            >
              EXPLORE VEHICLE RANGE
            </button>
          </div>
        </div>
      </div>
    );
  }

  const badge = getStatusBadgeInfo(vehicle.status);
  const galleryImages = Array.isArray(vehicle.images) && vehicle.images.length > 0 
    ? vehicle.images 
    : ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'];

  const currentImage = typeof galleryImages[selectedImageIndex] === 'string'
    ? (galleryImages[selectedImageIndex] as string)
    : (galleryImages[selectedImageIndex] as any)?.imageUrl || galleryImages[0];

  const hasPrice = (vehicle.priceGhs && vehicle.priceGhs > 0) || (vehicle.price && vehicle.price > 0);
  const isPriceOnReq = vehicle.priceOnRequest || !hasPrice;

  const vehicleTitle = `${vehicle.year ? vehicle.year + ' ' : ''}${vehicle.make} ${vehicle.model}`;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans pt-24 pb-24">
      
      {/* Top Breadcrumb & Action Header */}
      <div className="border-b border-[#1A1A1C] bg-[#08080A] py-4 px-4 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO VEHICLE RANGE</span>
          </button>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-500 hidden sm:inline">STOCK ID:</span>
            <span className="px-2.5 py-1 bg-[#050505] border border-[#1A1A1C] text-[#D4AF37] font-bold">
              {vehicle.stockId}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        
        {/* Main Grid: Gallery + Main Specs & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[16/10] bg-[#020202] border border-[#1A1A1C] overflow-hidden group">
              <img
                src={currentImage}
                alt={vehicleTitle}
                className="w-full h-full object-cover"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 border text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md ${badge.bg} ${badge.text} ${badge.border}`}>
                  {badge.label}
                </span>
              </div>

              {/* Location Tag */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/90 border border-[#1A1A1C] text-xs font-mono text-slate-200 uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{vehicle.location || 'GHANA'}</span>
                </span>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {galleryImages.map((img, idx) => {
                  const imgUrl = typeof img === 'string' ? img : (img as any)?.imageUrl;
                  const active = idx === selectedImageIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-[16/10] bg-[#020202] border overflow-hidden transition-all cursor-pointer ${
                        active ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-[#1A1A1C] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Inspection & Verification Guarantee Box */}
            <div className="p-5 bg-[#080809] border border-[#1A1A1C] space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#00FF41]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider">TRUST AUTO TRADER INSPECTION VERIFIED</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                {vehicle.insight?.conditionSummary || 'Verified by Trust Auto Trader automotive technicians at our Tema inspection hub or China export base. Full chassis and engine health reports available upon inquiry.'}
              </p>
            </div>

          </div>

          {/* Right Column: Vehicle Title, Pricing & Primary CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Category & Subhead */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-[#D4AF37] uppercase font-bold">{vehicle.type || vehicle.bodyType || 'SUV'}</span>
                  <span>STOCK ID: {vehicle.stockId}</span>
                </div>

                <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white font-sans">
                  {vehicleTitle}
                </h1>

                {vehicle.trim && (
                  <p className="text-sm font-mono text-slate-400">{vehicle.trim}</p>
                )}
              </div>

              {/* Price Box */}
              <div className="p-5 bg-[#08080A] border border-[#1A1A1C] space-y-2">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  WHOLESALE VEHICLE PRICE
                </span>

                {isPriceOnReq ? (
                  <div className="space-y-1">
                    <span className="text-2xl font-black text-[#D4AF37] font-mono tracking-wider block">
                      REQUEST PRICE
                    </span>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Wholesale quote calculated based on target port delivery (Tema, Takoradi, or CIF International).
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 font-mono">
                    <span className="text-3xl font-black text-white block">
                      {currency === 'GHS' ? formatGhs(vehicle.priceGhs || vehicle.price) : formatUsd(vehicle.priceUsd)}
                    </span>
                    <p className="text-[10px] text-slate-400 uppercase">
                      WHOLESALE RATE • TAXES & SHIPPING FEES ITEMIZED ON QUOTE
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Specs Cards Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#080809] border border-[#1A1A1C]">
                  <span className="block text-[9px] text-slate-500 uppercase">YEAR</span>
                  <span className="text-sm font-bold text-white">{vehicle.year}</span>
                </div>

                <div className="p-3 bg-[#080809] border border-[#1A1A1C]">
                  <span className="block text-[9px] text-slate-500 uppercase">CONDITION</span>
                  <span className="text-sm font-bold text-white uppercase">{vehicle.condition || 'NEW'}</span>
                </div>

                <div className="p-3 bg-[#080809] border border-[#1A1A1C]">
                  <span className="block text-[9px] text-slate-500 uppercase">LOCATION</span>
                  <span className="text-sm font-bold text-white uppercase">{vehicle.location || 'GHANA'}</span>
                </div>

                <div className="p-3 bg-[#080809] border border-[#1A1A1C]">
                  <span className="block text-[9px] text-slate-500 uppercase">TRANSMISSION</span>
                  <span className="text-sm font-bold text-white uppercase">{vehicle.transmission || 'AUTOMATIC'}</span>
                </div>
              </div>

              {/* PRIMARY ACTION BUTTONS */}
              <div className="space-y-3 font-mono">
                
                {/* WhatsApp Button */}
                <a
                  href={getWhatsAppVehicleLink(vehicle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#00FF41] hover:bg-[#00dd38] text-black font-black py-4 uppercase text-xs tracking-widest transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>INQUIRE VIA WHATSAPP (0533877588)</span>
                </a>

                {/* Request Price Button */}
                <button
                  onClick={() => onRequestPrice(vehicle)}
                  className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black py-4 uppercase text-xs tracking-widest transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>REQUEST FORMAL WHOLESALE PRICE</span>
                </button>

                {/* Source Similar Vehicle */}
                <button
                  onClick={() => onRequestSourcing(vehicle)}
                  className="w-full flex items-center justify-center gap-2 bg-[#08080A] border border-[#1A1A1C] hover:border-slate-600 text-slate-200 font-bold py-3.5 uppercase text-xs tracking-wider transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#D4AF37]" />
                  <span>SOURCE SIMILAR SPECIFICATION</span>
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Detailed Specification Table & Insight Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#1A1A1C]">
          
          {/* Detailed Specs Table (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-black uppercase text-white tracking-tight font-sans">
              FULL VEHICLE SPECIFICATIONS
            </h3>

            <div className="bg-[#080809] border border-[#1A1A1C] divide-y divide-[#1A1A1C] text-xs font-mono">
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">STOCK TRACKING ID</span>
                <span className="text-white font-bold">{vehicle.stockId}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">MAKE & MODEL</span>
                <span className="text-white font-bold">{vehicle.make} {vehicle.model}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">MANUFACTURE YEAR</span>
                <span className="text-white font-bold">{vehicle.year}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">TRIM / SPECIFICATION</span>
                <span className="text-white font-bold">{vehicle.trim || 'Standard Trim'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">BODY TYPE</span>
                <span className="text-[#D4AF37] font-bold">{vehicle.type || vehicle.bodyType || 'SUV'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">FUEL TYPE</span>
                <span className="text-white font-bold">{vehicle.fuel || vehicle.fuelType || 'PETROL'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">TRANSMISSION</span>
                <span className="text-white font-bold">{vehicle.transmission || 'AUTOMATIC'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">DRIVETRAIN</span>
                <span className="text-white font-bold">{vehicle.drivetrain || 'FWD'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">ENGINE SPECIFICATION</span>
                <span className="text-white font-bold">{vehicle.engine || 'Standard Engine'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">ODOMETER (KM)</span>
                <span className="text-white font-bold">{formatNumber(vehicle.mileageKm || vehicle.mileage)} KM</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">COLOR</span>
                <span className="text-white font-bold">{vehicle.color || 'Standard'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400">YARD / DISPATCH LOCATION</span>
                <span className="text-white font-bold">{vehicle.location || 'GHANA'}</span>
              </div>
            </div>
          </div>

          {/* Features & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Vehicle Description */}
            {vehicle.description && (
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase text-white tracking-tight font-sans">
                  VEHICLE OVERVIEW
                </h3>
                <p className="text-slate-300 text-xs font-sans leading-relaxed bg-[#080809] border border-[#1A1A1C] p-4 whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            )}

            {/* Features Checklist */}
            {Array.isArray(vehicle.features) && vehicle.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase text-white tracking-tight font-sans">
                  EQUIPPED FEATURES
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  {vehicle.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-[#080809] border border-[#1A1A1C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-slate-300 truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wholesale Dealer suitability box */}
            {vehicle.insight && (
              <div className="p-5 bg-[#08080A] border border-[#1A1A1C] space-y-3 font-mono text-xs">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block">
                  WHOLESALE DEALER INSIGHT
                </span>
                <div className="space-y-2 text-slate-300">
                  <p><strong className="text-white">Best Suited For:</strong> {vehicle.insight.bestSuitedFor || 'Ghanaian road conditions & commercial fleet operations.'}</p>
                  <p><strong className="text-white">Resale Potential:</strong> {vehicle.insight.resalePotential || 'High demand market retention.'}</p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
