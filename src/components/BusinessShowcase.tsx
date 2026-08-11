import React from 'react';
import { Building2, Globe2, Truck, ShieldCheck, ArrowRight, Plus, Equal } from 'lucide-react';

export const BusinessShowcase: React.FC = () => {
  return (
    <section id="business" className="py-16 bg-[#080809] text-[#F0F0F0] border-y border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>BUSINESS & NETWORK SCALE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            MORE THAN A <span className="text-[#D4AF37]">DEALERSHIP.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            "Trust Auto Trader operates as a wholesale vehicle sourcing network, connecting buyers and dealers to vehicles through its Ghana operation and international export base."
          </p>
        </div>

        {/* Visual Sourcing Network Equation */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center font-mono">
          
          {/* Ghana Node */}
          <div className="md:col-span-3 bg-[#050505] border border-[#1A1A1C] p-6 sm:p-8 space-y-4 relative group hover:border-[#D4AF37] transition-colors">
            <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-3">
              <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">WEST AFRICA HUB</span>
              <Building2 className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                GHANA
              </h3>
              <div className="text-xs text-[#00FF41] font-bold uppercase tracking-wider">
                TEMA OPERATIONS
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
              Ghana distribution center, inspection yard, and regional customer fulfillment point opposite Tema Golf City.
            </p>
          </div>

          {/* Plus Symbol */}
          <div className="md:col-span-1 text-center py-2 md:py-0">
            <div className="w-10 h-10 rounded-full bg-[#121215] border border-[#2A2A30] text-[#D4AF37] flex items-center justify-center mx-auto">
              <Plus className="w-5 h-5" />
            </div>
          </div>

          {/* China Export Base Node */}
          <div className="md:col-span-3 bg-[#050505] border border-[#1A1A1C] p-6 sm:p-8 space-y-4 relative group hover:border-[#D4AF37] transition-colors">
            <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-3">
              <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">EXPORT STAGING</span>
              <Globe2 className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                CHINA
              </h3>
              <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                5,000 m² EXPORT BASE
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
              Direct factory procurement, quality control inspection staging, and containerized export facility in Guangdong, China.
            </p>
          </div>

          {/* Equals Symbol */}
          <div className="md:col-span-1 text-center py-2 md:py-0">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black flex items-center justify-center mx-auto">
              <Equal className="w-5 h-5" />
            </div>
          </div>

          {/* Outcome Node */}
          <div className="md:col-span-3 bg-[#0D0D10] border-2 border-[#D4AF37] p-6 sm:p-8 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <span className="text-[10px] text-black bg-[#D4AF37] px-2 py-0.5 font-black uppercase">CORE VALUE</span>
              <Truck className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-sans leading-tight">
                INTERNATIONAL VEHICLE SOURCING
              </h3>
            </div>

            <p className="text-xs text-slate-300 font-sans font-light leading-relaxed">
              Seamless wholesale access connecting buyers and dealers directly to verified international supply channels.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
