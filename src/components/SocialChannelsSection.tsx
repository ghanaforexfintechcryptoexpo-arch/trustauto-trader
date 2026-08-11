import React from 'react';
import { MessageSquare, ExternalLink, Globe2 } from 'lucide-react';

export const SocialChannelsSection: React.FC = () => {
  return (
    <section id="social" className="py-16 bg-[#080809] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#050505] border border-[#1A1A1C] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-8 relative overflow-hidden">
          
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-[0.3em] block">
              VERIFIED OFFICIAL SOCIAL CHANNELS
            </span>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              FOLLOW THE <span className="text-[#D4AF37]">VEHICLES.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
              "See our latest vehicle showcases and updates on social media."
            </p>
          </div>

          {/* Social Channel Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono">
            {/* FACEBOOK */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#121215] hover:bg-[#1877F2] text-white hover:text-white border border-[#2A2A30] font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>FACEBOOK</span>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
            </a>

            {/* TIKTOK */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#121215] hover:bg-black text-white border border-[#2A2A30] hover:border-white font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>TIKTOK</span>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/233533877588?text=Hello%20Trust%20Auto%20Trader,%20I%20am%20following%20your%20vehicle%20showcases."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#00FF41] hover:bg-[#00cc34] text-black font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>WHATSAPP</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
