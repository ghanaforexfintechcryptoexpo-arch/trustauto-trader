import React from 'react';
import { 
  Globe2, 
  MapPin, 
  Truck, 
  ArrowRight, 
  ShieldCheck,
  Building2,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { AdminStats } from '../types';

interface HeroProps {
  stats: AdminStats | null;
  onExploreVehicles: () => void;
  onSourceVehicle: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onExploreVehicles,
  onSourceVehicle
}) => {
  return (
    <div className="relative bg-[#050505] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans overflow-hidden">
      
      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
        
        {/* Main Content Area (7 Cols) */}
        <section className="lg:col-span-7 flex flex-col p-6 sm:p-12 relative lg:border-r border-[#1A1A1C]">
          <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
          
          <div className="my-auto space-y-6">
            {/* Network Badges */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121215] border border-[#2A2A30] text-[#D4AF37]">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>TEMA, GHANA</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121215] border border-[#2A2A30] text-slate-300">
                <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>CHINA EXPORT BASE (5,000 m²)</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[48px] sm:text-[72px] lg:text-[80px] leading-[0.88] font-black uppercase tracking-tighter text-white">
              500+ VEHICLES.<br />
              <span className="text-transparent text-stroke-1">ONE WHOLESALE NETWORK.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              Wholesale vehicle sourcing from Ghana to the international market.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onExploreVehicles}
                className="px-8 py-4.5 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-mono font-black uppercase text-xs tracking-widest flex items-center gap-3 transition-colors cursor-pointer"
              >
                <span>EXPLORE VEHICLES</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSourceVehicle}
                className="px-8 py-4.5 bg-[#121215] hover:bg-[#1A1A20] border border-[#2A2A30] hover:border-white text-white font-mono font-black uppercase text-xs tracking-widest transition-colors cursor-pointer flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>SOURCE A VEHICLE</span>
              </button>
            </div>
          </div>

          {/* Location Network Micro Info */}
          <div className="mt-10 grid grid-cols-2 gap-4 pt-6 border-t border-[#1A1A1C] font-mono text-xs">
            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] uppercase text-slate-400 font-bold tracking-widest">TEMA OPERATIONS</span>
                <span className="text-white font-bold text-xs">Distribution & Inspection Hub</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Globe2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] uppercase text-slate-400 font-bold tracking-widest">CHINA EXPORT BASE</span>
                <span className="text-white font-bold text-xs">5,000 m² Staging & Logistics</span>
              </div>
            </div>
          </div>
        </section>

        {/* Wholesale Business Visual (5 Cols) */}
        <aside className="lg:col-span-5 bg-[#080809] flex flex-col justify-between p-6 sm:p-10 border-t lg:border-t-0 border-[#1A1A1C] font-mono relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-200">WHOLESALE SOURCING NETWORK</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] font-bold">
                INTERNATIONAL NETWORK
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#0A0A0C] border border-[#1A1A1C] space-y-2">
                <div className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold flex items-center justify-between">
                  <span>GHANA TO GLOBAL MARKET</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-300 font-sans font-light leading-relaxed">
                  Connecting individual buyers, commercial fleets, and car dealers to high-grade SUV, pickup, sedan, and heavy truck sourcing pipelines.
                </p>
              </div>

              <div className="p-4 bg-[#0A0A0C] border border-[#1A1A1C] space-y-3">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">CORE SOURCING CHANNELS:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-white">
                  <div className="p-2.5 bg-[#121215] border border-[#1A1A1C] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]"></span>
                    <span>TOYOTA & JAPANESE</span>
                  </div>
                  <div className="p-2.5 bg-[#121215] border border-[#1A1A1C] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]"></span>
                    <span>BYD & ELECTRIC</span>
                  </div>
                  <div className="p-2.5 bg-[#121215] border border-[#1A1A1C] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]"></span>
                    <span>GEELY / CHANGAN</span>
                  </div>
                  <div className="p-2.5 bg-[#121215] border border-[#1A1A1C] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]"></span>
                    <span>HEAVY TRUCKS & FLEETS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1A1A1C] mt-6 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase">
              <span>Sourcing Response Time:</span>
              <span className="text-[#00FF41] font-bold">Within 24 Hours</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase">
              <span>Inspection Standard:</span>
              <span className="text-white font-bold">Verified Quality Standard</span>
            </div>
          </div>
        </aside>

      </div>

      {/* Ticker Bar */}
      <div className="bg-[#0A0A0B] border-t border-[#1A1A1C] h-11 flex items-center px-4 sm:px-8 gap-8 overflow-hidden font-mono text-[10px] uppercase tracking-widest">
        <div className="whitespace-nowrap flex items-center gap-2">
          <span className="text-[#D4AF37]">GHANA OPERATIONS:</span> TEMA GOLF CITY AREA
        </div>
        <div className="whitespace-nowrap flex items-center gap-2 hidden sm:flex">
          <span className="text-[#D4AF37]">CHINA EXPORT BASE:</span> GUANGDONG (5,000 m²)
        </div>
        <div className="whitespace-nowrap flex items-center gap-2 ml-auto">
          <span className="text-[#00FF41]">WHATSAPP SOURCING:</span> 0533877588
        </div>
      </div>

    </div>
  );
};


