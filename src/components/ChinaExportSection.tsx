import React from 'react';
import { 
  Globe2, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Ship, 
  Building2,
  Boxes
} from 'lucide-react';

interface ChinaExportSectionProps {
  onExploreChinaExport: () => void;
}

export const ChinaExportSection: React.FC<ChinaExportSectionProps> = ({
  onExploreChinaExport
}) => {
  const steps = [
    {
      num: '01',
      title: 'CHINA EXPORT BASE',
      desc: 'Vehicles cataloged at our 5,000-square-meter international export yard in China.',
      icon: Building2
    },
    {
      num: '02',
      title: 'MULTI-POINT INSPECTION',
      desc: 'Rigorous 150-point engine, frame, battery, and electrical system diagnostics.',
      icon: ShieldCheck
    },
    {
      num: '03',
      title: 'PORT & SHIPPING LOGISTICS',
      desc: 'RoRo or container batch loading with full export documentation and bill of lading.',
      icon: Ship
    },
    {
      num: '04',
      title: 'TEMA PORT CLEARING',
      desc: 'Customs clearance and vehicle staging at Trust Auto Trader Tema yard opposite Tema Golf City.',
      icon: MapPin
    }
  ];

  return (
    <section id="china-export" className="py-16 bg-[#050505] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
              <Globe2 className="w-3.5 h-3.5" />
              <span>INTERNATIONAL EXPORT OPERATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              FROM CHINA TO GHANA.<br />
              <span className="text-[#D4AF37]">5,000 m² EXPORT BASE.</span>
            </h2>

            <p className="text-slate-400 text-sm font-light">
              Trust Auto Trader manages an international export operation anchored by a 5,000m² vehicle staging facility in China, delivering new and pre-owned vehicles straight to Tema Port.
            </p>
          </div>

          <button
            onClick={onExploreChinaExport}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs px-6 py-3.5 uppercase tracking-widest transition-colors cursor-pointer shrink-0"
          >
            <span>VIEW CHINA EXPORT STOCK</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Supply Chain Journey Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div 
                key={idx}
                className="relative p-6 bg-[#080809] border border-[#1A1A1C] hover:border-[#D4AF37] transition-colors flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors font-mono">
                    {step.num}
                  </span>
                  <div className="p-2 bg-[#050505] border border-[#1A1A1C] text-[#D4AF37]">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-mono font-bold text-white text-xs uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] font-sans font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 bg-[#050505] border border-[#1A1A1C] text-[#D4AF37]">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* China Base Callout Banner */}
        <div className="bg-[#080809] border border-[#1A1A1C] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 font-mono">
            <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
              <Boxes className="w-3.5 h-3.5" />
              <span>DIRECT FACTORY & FLEET ACCESS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-sans tracking-tight">
              NEED NEW CHINESE ELECTRIC OR HYBRID VEHICLES IN GHANA?
            </h3>
            <p className="text-slate-400 text-xs font-light max-w-2xl font-sans">
              We export BYD, Geely, Changan, Haval, Chery, Sinotruk, and Dongfeng models direct from China to Tema Port with full clearance support.
            </p>
          </div>

          <button
            onClick={onExploreChinaExport}
            className="bg-[#050505] hover:bg-[#101012] border border-[#D4AF37] text-[#D4AF37] font-bold text-xs px-6 py-3.5 font-mono uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap"
          >
            BROWSE CHINA EXPORT UNITS
          </button>
        </div>

      </div>
    </section>
  );
};
