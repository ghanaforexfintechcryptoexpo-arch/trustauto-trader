import React from 'react';
import { 
  Building2, 
  Globe2, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  SlidersHorizontal, 
  Truck, 
  ChevronRight,
  PhoneCall,
  Lock
} from 'lucide-react';
import { AdminStats } from '../types';

interface HeaderProps {
  stats: AdminStats | null;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenAdmin: () => void;
  currency: 'GHS' | 'USD';
  setCurrency: (c: 'GHS' | 'USD') => void;
  onNavigateVehicles?: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  activeSection,
  setActiveSection,
  onOpenAdmin,
  currency,
  setCurrency,
  onNavigateVehicles,
  onNavigateHome
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-[#1A1A1C] text-[#F0F0F0] transition-all font-sans">
      {/* Top Live Command Bar */}
      <div className="bg-[#080809] border-b border-[#1A1A1C] py-1.5 px-4 sm:px-8 text-[11px] text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Live Node Indicators */}
          <div className="flex items-center gap-5 flex-wrap">
            <span className="flex items-center gap-2 font-medium text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
              </span>
              TEMA, GHANA: <span className="text-[#00FF41] font-bold">OPERATIONAL HUB</span>
            </span>
            <span className="hidden md:inline text-[#1A1A1C]">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              CHINA EXPORT BASE: <span className="text-[#D4AF37] font-bold">5,000 m² STAGING FACILITY</span>
            </span>
          </div>

          {/* Quick Contact & Currency Switch */}
          <div className="flex items-center gap-4 ml-auto">
            <a 
              href="https://wa.me/233533877588?text=Hello%20Trust%20Auto%20Trader,%20I%20am%20inquiring%20about%20vehicle%20wholesale%20inventory."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#00FF41] hover:underline font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WHATSAPP: 0533877588</span>
            </a>

            <div className="h-3 w-[1px] bg-[#1A1A1C]"></div>

            {/* Currency Selector */}
            <div className="flex items-center bg-[#050505] border border-[#1A1A1C] px-1 py-0.5 text-[10px] font-bold uppercase">
              <button
                onClick={() => setCurrency('GHS')}
                className={`px-2 py-0.5 transition-all ${currency === 'GHS' ? 'bg-[#D4AF37] text-black font-black' : 'text-slate-400 hover:text-white'}`}
              >
                GHS
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 transition-all ${currency === 'USD' ? 'bg-[#D4AF37] text-black font-black' : 'text-slate-400 hover:text-white'}`}
              >
                USD
              </button>
            </div>

            <div className="h-3 w-[1px] bg-[#1A1A1C]"></div>

            <button
              onClick={onOpenAdmin}
              className="px-3 py-1 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
              title="Admin Command Center"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">ADMIN PORTAL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => onNavigateHome ? onNavigateHome() : setActiveSection('showcase')}
          className="cursor-pointer flex items-center gap-3"
        >
          <div className="w-6 h-6 bg-[#D4AF37] rotate-45 flex items-center justify-center shrink-0">
            <div className="w-2 h-2 bg-black -rotate-45" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter uppercase text-white font-sans">
              TRUST AUTO <span className="text-[#D4AF37]">TRADER</span>
            </span>
            <div className="text-[9px] tracking-[0.2em] text-slate-400 uppercase font-mono">
              TEMA, GHANA • CHINA EXPORT BASE
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-widest font-semibold opacity-80">
          <button
            onClick={() => onNavigateVehicles ? onNavigateVehicles() : setActiveSection('showcase')}
            className="text-[#D4AF37] font-bold hover:text-white transition-colors cursor-pointer py-1"
          >
            EXPLORE VEHICLES
          </button>
          {[
            { id: 'showcase', label: 'CATEGORIES' },
            { id: 'business', label: 'BUSINESS & SCALE' },
            { id: 'sourcing', label: 'VEHICLE SOURCING' },
            { id: 'dealers', label: 'FOR DEALERS' },
            { id: 'how-it-works', label: 'HOW IT WORKS' },
            { id: 'social', label: 'FOLLOW US' },
            { id: 'location', label: 'LOCATION' },
          ].map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`hover:text-white transition-colors cursor-pointer py-1 ${
                  isActive ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] opacity-100' : 'text-slate-300 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveSection('sourcing')}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black uppercase text-[11px] tracking-widest transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>SOURCE VEHICLE</span>
          </button>

          <a
            href="https://wa.me/233533877588?text=Hello%20Trust%20Auto%20Trader,%20I%20am%20interested%20in%20buying/sourcing%20a%20vehicle."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black font-mono font-bold text-[11px] uppercase tracking-wider transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden md:inline">0533877588</span>
          </a>
        </div>
      </div>

      {/* Mobile Nav Scroll Strip */}
      <div className="lg:hidden bg-[#080809] border-t border-[#1A1A1C] px-4 py-2 overflow-x-auto flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest scrollbar-none">
        {[
          { id: 'showcase', label: 'VEHICLES' },
          { id: 'business', label: 'BUSINESS' },
          { id: 'sourcing', label: 'SOURCING' },
          { id: 'dealers', label: 'DEALERS' },
          { id: 'how-it-works', label: 'HOW IT WORKS' },
          { id: 'social', label: 'FOLLOW US' },
          { id: 'location', label: 'LOCATION' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${
              activeSection === item.id
                ? 'bg-[#D4AF37] text-black font-black'
                : 'bg-[#050505] text-slate-400 hover:text-white border border-[#1A1A1C]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

