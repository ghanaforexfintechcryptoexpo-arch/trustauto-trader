import React from 'react';
import { 
  Building2, 
  Globe2, 
  MapPin, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Lock
} from 'lucide-react';

interface FooterProps {
  onSelectSection: (s: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSection, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0A0A0B] text-[#F0F0F0] border-t border-[#1A1A1C] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand & Positioning */}
          <div className="md:col-span-5 space-y-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-[#D4AF37] rotate-45 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 bg-black -rotate-45" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tighter text-white uppercase font-sans">
                  TRUST AUTO <span className="text-[#D4AF37]">TRADER</span>
                </span>
                <div className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-mono">
                  TEMA, GHANA • CHINA EXPORT BASE
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed font-light">
              Large wholesale vehicle trading company based in Tema, Ghana, operating a 5,000-square-meter international export facility in China. Servicing individual buyers, fleet operators, and car dealers.
            </p>

            <div className="p-4 bg-[#050505] border border-[#1A1A1C] space-y-1 font-mono">
              <div className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider">TEMA DISTRIBUTION LOCATION:</div>
              <p className="text-slate-300 text-[11px]">
                Opposite Tema Golf City, 100 meters to the right of the Free Zone exit, Tema, Ghana
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <h3 className="font-black text-[#D4AF37] text-xs uppercase tracking-widest">
              TRADING PLATFORM
            </h3>
            <ul className="space-y-2 text-slate-400 text-[11px] uppercase tracking-wider">
              <li>
                <button onClick={() => onSelectSection('inventory')} className="hover:text-white transition-colors cursor-pointer">
                  LIVE INVENTORY
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('sourcing')} className="hover:text-white transition-colors cursor-pointer">
                  SOURCE MY VEHICLE
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('dealers')} className="hover:text-white transition-colors cursor-pointer">
                  DEALER & FLEET SERVICES
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('china-export')} className="hover:text-white transition-colors cursor-pointer">
                  CHINA EXPORT BASE (5,000m²)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('network')} className="hover:text-white transition-colors cursor-pointer">
                  NETWORK LOGISTICS MOVEMENT
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('location')} className="hover:text-white transition-colors cursor-pointer">
                  TEMA LOCATION & INSPECTION
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Channels & Social */}
          <div className="md:col-span-4 space-y-4 font-mono">
            <h3 className="font-black text-[#D4AF37] text-xs uppercase tracking-widest">
              DIRECT LOGISTICS CHANNELS
            </h3>
            
            <p className="text-slate-400 text-xs font-sans font-light">
              Connect with Trust Auto Trader for immediate vehicle inspection reports, bulk pricing schedules, and live video walk-throughs.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/233533877588"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-[#050505] border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP SALES DESK: 0533877588</span>
              </a>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#050505] border border-[#1A1A1C] text-slate-300 hover:text-[#D4AF37] font-bold uppercase text-[10px] tracking-widest transition-colors"
                >
                  FACEBOOK
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#050505] border border-[#1A1A1C] text-slate-300 hover:text-[#D4AF37] font-bold uppercase text-[10px] tracking-widest transition-colors"
                >
                  TIKTOK
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1A1A1C] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} TRUST AUTO TRADER. TEMA, GHANA. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-400 hover:text-[#D4AF37] font-bold transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>COMMAND CENTER PORTAL</span>
            </button>
          </div>
        </div>

      </div>

      {/* Terminal Log Footer Strip */}
      <div className="bg-[#050505] border-t border-[#1A1A1C] py-2 px-4 text-[9px] font-mono text-slate-600 flex items-center justify-between overflow-hidden">
        <div className="flex gap-6 items-center whitespace-nowrap">
          <span className="text-[#00FF41]">LOG: SYSTEM READY</span>
          <span>LOG: NEW TOYOTA STOCK ADDED (GH)</span>
          <span>LOG: SHIPMENT TA-294 DEPARTED SHANGHAI</span>
          <span>LOG: EXPORT PIPELINE ACTIVE [OK]</span>
        </div>
        <div className="text-[#D4AF37] font-bold hidden sm:block">
          TRUST AUTO TRADER HIGH-DENSITY TERMINAL v2.4
        </div>
      </div>
    </footer>
  );
};

