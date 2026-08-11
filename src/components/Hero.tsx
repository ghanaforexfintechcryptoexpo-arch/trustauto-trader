import React from 'react';
import { 
  Globe2, 
  Search, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Boxes
} from 'lucide-react';
import { AdminStats } from '../types';

interface HeroProps {
  stats: AdminStats | null;
  onExploreInventory: () => void;
  onSourceVehicle: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onExploreInventory,
  onSourceVehicle
}) => {
  return (
    <div className="relative bg-[#050505] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans overflow-hidden">
      
      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Main Content Area (8 Cols) */}
        <section className="lg:col-span-8 flex flex-col p-6 sm:p-12 relative border-r border-[#1A1A1C]">
          <div className="w-32 h-1 bg-[#D4AF37] opacity-50 mb-6"></div>
          
          <div className="my-auto">
            <span className="text-[12px] font-mono text-[#D4AF37] uppercase tracking-[0.3em] mb-4 block">
              INTERNATIONAL WHOLESALE NETWORK
            </span>

            <h1 className="text-[52px] sm:text-[76px] lg:text-[88px] leading-[0.85] font-black uppercase tracking-tighter mb-6">
              500+ Vehicles. <br />
              <span className="text-transparent text-stroke-1">One Network.</span>
            </h1>

            <p className="text-base sm:text-lg opacity-60 max-w-xl font-light leading-relaxed mb-8">
              Wholesale vehicle trading in Ghana. Direct sourcing from our 5,000 m² export base in China. Professional grade automotive logistics across West Africa.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onExploreInventory}
                className="px-8 py-5 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black uppercase text-xs tracking-widest flex items-center gap-3 transition-colors cursor-pointer"
              >
                <span>EXPLORE LIVE INVENTORY</span>
                <span className="text-lg">→</span>
              </button>

              <button
                onClick={onSourceVehicle}
                className="px-8 py-5 border border-white/20 hover:border-white text-white font-black uppercase text-xs tracking-widest transition-colors cursor-pointer"
              >
                SOURCE MY VEHICLE
              </button>
            </div>
          </div>

          {/* Micro Stats Bar */}
          <div className="mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono">
            <div>
              <span className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">GHANA STOCK</span>
              <span className="text-2xl sm:text-3xl font-mono text-white font-bold">
                {stats?.ghanaStockCount || 184}<span className="text-xs opacity-50 ml-1">UNITS</span>
              </span>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">CHINA BASE</span>
              <span className="text-2xl sm:text-3xl font-mono text-white font-bold">
                {stats?.chinaExportCount || 342}<span className="text-xs opacity-50 ml-1">UNITS</span>
              </span>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">ACTIVE EXPORTS</span>
              <span className="text-2xl sm:text-3xl font-mono text-[#00FF41] font-bold">
                22<span className="text-xs opacity-50 ml-1">UNITS</span>
              </span>
            </div>
          </div>
        </section>

        {/* Aside: High Density Logistics Live Feed (4 Cols) */}
        <aside className="lg:col-span-4 bg-[#080809] flex flex-col">
          <div className="p-5 border-b border-[#1A1A1C] flex justify-between items-center font-mono">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-200">The Network is Moving</span>
            <span className="flex items-center gap-2 text-[10px] text-[#00FF41]">
              <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></span>
              LIVE LOGISTICS
            </span>
          </div>

          {/* Feed Items */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[460px]">
            <div className="p-4 bg-white/5 border border-white/10 font-mono">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] bg-[#D4AF37] text-black px-1.5 py-0.5 font-black uppercase">JUST ARRIVED</span>
                <span className="text-[10px] opacity-40">TEMA PORT YARD</span>
              </div>
              <h3 className="text-xs font-bold uppercase text-white font-sans">2023 TOYOTA RAV4 HYBRID</h3>
              <div className="flex justify-between mt-2 text-[10px] opacity-60 uppercase">
                <span>STOCK: TA-8821</span>
                <span className="text-[#00FF41]">LOC: GHANA</span>
              </div>
            </div>

            <div className="p-4 bg-white/[0.03] border border-white/5 font-mono">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] border border-white/40 px-1.5 py-0.5 font-bold uppercase text-slate-300">COMING FROM CHINA</span>
                <span className="text-[10px] opacity-40">IN TRANSIT</span>
              </div>
              <h3 className="text-xs font-bold uppercase text-white font-sans">CHANGAN UNI-K AWD EXECUTIVE</h3>
              <div className="flex justify-between mt-2 text-[10px] opacity-60 uppercase">
                <span>STOCK: TA-9044</span>
                <span className="text-[#D4AF37]">LOC: 5,000m² BASE</span>
              </div>
            </div>

            <div className="p-4 bg-white/[0.03] border border-white/5 font-mono">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] border border-[#00FF41] text-[#00FF41] px-1.5 py-0.5 font-bold uppercase">RESERVED</span>
                <span className="text-[10px] opacity-40">WHOLESALE BATCH</span>
              </div>
              <h3 className="text-xs font-bold uppercase text-white font-sans">2022 MERCEDES-BENZ G63 AMG</h3>
              <div className="flex justify-between mt-2 text-[10px] opacity-60 uppercase">
                <span>STOCK: TA-8500</span>
                <span className="text-[#00FF41]">LOC: GHANA</span>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 font-mono">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] bg-[#D4AF37] text-black px-1.5 py-0.5 font-black uppercase">JUST ARRIVED</span>
                <span className="text-[10px] opacity-40">TEMA GOLF CITY YARD</span>
              </div>
              <h3 className="text-xs font-bold uppercase text-white font-sans">2024 GEELY AZKARRA AWD</h3>
              <div className="flex justify-between mt-2 text-[10px] opacity-60 uppercase">
                <span>STOCK: TA-9120</span>
                <span className="text-[#00FF41]">LOC: GHANA</span>
              </div>
            </div>
          </div>

          {/* Terminal Status Panel */}
          <div className="p-5 bg-[#050505] mt-auto border-t border-[#1A1A1C] font-mono">
            <div className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Global Sourcing Terminal</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 text-[11px] opacity-60">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
                <span>Connecting to China Export Base...</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-[#00FF41]">
                <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full"></div>
                <span>Export Pipeline Active [OK]</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Ticker Bar */}
      <div className="bg-[#0A0A0B] border-t border-[#1A1A1C] h-11 flex items-center px-4 sm:px-8 gap-8 overflow-hidden font-mono text-[10px] uppercase tracking-widest">
        <div className="whitespace-nowrap flex items-center gap-2">
          <span className="text-[#D4AF37]">LOCATION:</span> TEMA GOLF CITY, GHANA
        </div>
        <div className="whitespace-nowrap flex items-center gap-2 hidden sm:flex">
          <span className="text-[#D4AF37]">EXPORT BASE:</span> GUANGDONG, CHINA (5,000 m²)
        </div>
        <div className="whitespace-nowrap flex items-center gap-2">
          <span className="text-[#D4AF37]">WHATSAPP:</span> 0533877588
        </div>
        <div className="flex-1 h-full bg-[#111111] hidden lg:flex items-center px-4 overflow-hidden">
          <div className="flex gap-8 text-[9px] text-[#666] items-center">
            <span>LOG: NEW TOYOTA STOCK ADDED (GH)</span>
            <span>LOG: SHIPMENT TA-294 DEPARTED SHANGHAI</span>
            <span>LOG: DEALER SOURCING REQUEST #882 APPROVED</span>
            <span>LOG: EXPORT PIPELINE ACTIVE [OK]</span>
          </div>
        </div>
      </div>

    </div>
  );
};

