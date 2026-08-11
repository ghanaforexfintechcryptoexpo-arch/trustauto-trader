import React from 'react';
import { ShieldCheck, MessageSquare, Search, CheckCircle2, DollarSign } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'TELL US WHAT YOU NEED',
      description: 'Provide your preferred vehicle make, model, specifications, condition, and quantity requirements through our website or direct contact channel.',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'WE SOURCE',
      description: 'Our team identifies matching vehicle options through our Tema operations and 5,000 m² China export base sourcing channels.',
      icon: Search
    },
    {
      step: '03',
      title: 'WE VERIFY & COORDINATE',
      description: 'We review vehicle specifications, coordinate inspection standards, and organize international export logistics.',
      icon: CheckCircle2
    },
    {
      step: '04',
      title: 'YOU BUY',
      description: 'Finalize your purchase, review verified documentation, and take delivery of your vehicle.',
      icon: DollarSign
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#050505] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRANSPARENT SOURCING PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            HOW IT <span className="text-[#D4AF37]">WORKS</span>
          </h2>

          <p className="text-slate-400 text-sm font-light">
            A clear 4-step process for individual vehicle buyers and dealership fleets.
          </p>
        </div>

        {/* 4 Steps Process Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="bg-[#080809] border border-[#1A1A1C] hover:border-[#D4AF37] p-6 space-y-4 relative transition-colors group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-3">
                    <span className="text-3xl font-black text-[#D4AF37] group-hover:scale-110 transition-transform">
                      {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
                  </div>

                  <h3 className="text-base font-black uppercase text-white font-sans tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1A1A1C]/60 text-[10px] text-slate-500 uppercase">
                  STEP {index + 1} OF 4
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
