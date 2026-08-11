import React, { useState } from 'react';
import { 
  MapPin, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Navigation, 
  Copy, 
  Check, 
  Calendar, 
  Send,
  CheckCircle2
} from 'lucide-react';

export const TrustLocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    preferredDate: '',
    vehicleInterest: ''
  });

  const addressText = "Trust Auto Trader, Opposite Tema Golf City, 100 meters to the right of the Free Zone exit, Tema, Ghana";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <section id="location" className="py-16 bg-[#050505] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED CORPORATE CREDIBILITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            BUILT AROUND <span className="text-[#D4AF37]">VEHICLE ACCESS.</span>
          </h2>

          <p className="text-slate-400 text-sm font-light">
            Visit our physical distribution and staging yard in Tema, Ghana or connect directly with our international export team.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Facts & Address Card */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 bg-[#080809] border border-[#1A1A1C] space-y-6">
              <div className="flex items-center gap-3 border-b border-[#1A1A1C] pb-4">
                <div className="w-10 h-10 bg-[#050505] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight font-sans">
                    TRUST AUTO TRADER — TEMA HQ
                  </h3>
                  <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">DISTRIBUTION & INSPECTION FACILITY</p>
                </div>
              </div>

              {/* Exact Location Text */}
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="p-4 bg-[#050505] border border-[#1A1A1C] space-y-1">
                  <div className="text-slate-500 text-[9px] uppercase tracking-wider">PHYSICAL ADDRESS:</div>
                  <div className="text-white font-bold text-xs leading-relaxed font-sans">
                    Opposite Tema Golf City, 100 meters to the right of the Free Zone exit, Tema, Ghana
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#050505] border border-[#1A1A1C] space-y-1">
                    <span className="text-slate-500 text-[9px] uppercase tracking-wider block">WHATSAPP DIRECT:</span>
                    <a 
                      href="https://wa.me/233533877588"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00FF41] font-bold text-xs hover:underline block"
                    >
                      0533877588 (+233 53 387 7588)
                    </a>
                  </div>

                  <div className="p-3 bg-[#050505] border border-[#1A1A1C] space-y-1">
                    <span className="text-slate-500 text-[9px] uppercase tracking-wider block">WORKING HOURS:</span>
                    <span className="text-white font-bold text-xs block">MON - SAT: 8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#050505] border border-[#1A1A1C] hover:border-[#D4AF37] text-[10px] font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-[#00FF41]" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
                  <span>{copied ? 'ADDRESS COPIED!' : 'COPY ADDRESS FOR GPS'}</span>
                </button>

                <a
                  href="https://wa.me/233533877588?text=Hello%20Trust%20Auto%20Trader,%20I%20would%20like%20directions%20to%20your%20Tema%20location."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#00FF41] text-black text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP DIRECTIONS</span>
                </a>
              </div>

            </div>

            {/* Credibility Pillars */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-4 bg-[#080809] border border-[#1A1A1C] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00FF41] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">WHOLESALE FIRST APPROACH</h4>
                  <p className="text-slate-400 text-[11px] font-sans font-light leading-tight">Direct volume vehicle pricing without retail intermediary markups.</p>
                </div>
              </div>

              <div className="p-4 bg-[#080809] border border-[#1A1A1C] flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">5,000m² CHINA EXPORT BASE</h4>
                  <p className="text-slate-400 text-[11px] font-sans font-light leading-tight">Dedicated overseas staging facility for seamless batch exports.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Book Inspection Form Card */}
          <div className="lg:col-span-5 bg-[#080809] border border-[#1A1A1C] p-6 shadow-2xl">
            <h3 className="text-lg font-black uppercase text-white mb-1 font-sans">
              BOOK IN-PERSON VEHICLE INSPECTION
            </h3>
            <p className="text-slate-400 text-xs font-mono mb-6">
              Schedule a private physical inspection at our Tema yard opposite Tema Golf City.
            </p>

            {bookingSubmitted ? (
              <div className="p-6 bg-[#050505] border border-[#00FF41] text-center space-y-3 font-mono">
                <CheckCircle2 className="w-10 h-10 text-[#00FF41] mx-auto" />
                <h4 className="font-bold text-white text-xs uppercase tracking-wider font-sans">INSPECTION APPOINTMENT REQUESTED</h4>
                <p className="text-slate-300 text-xs">
                  Our Tema sales team will call or WhatsApp you at {bookingForm.phone} to confirm timing.
                </p>
                <button
                  onClick={() => setBookingSubmitted(false)}
                  className="text-[#D4AF37] font-mono text-xs underline cursor-pointer"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Mensah"
                    value={bookingForm.name}
                    onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">PHONE / WHATSAPP NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0533877588"
                    value={bookingForm.phone}
                    onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">PREFERRED DATE & TIME</label>
                  <input
                    type="datetime-local"
                    value={bookingForm.preferredDate}
                    onChange={e => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">VEHICLE OF INTEREST</label>
                  <input
                    type="text"
                    placeholder="e.g. Toyota RAV4, Land Cruiser Prado, Geely"
                    value={bookingForm.vehicleInterest}
                    onChange={e => setBookingForm({ ...bookingForm, vehicleInterest: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs py-3.5 uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>CONFIRM INSPECTION SCHEDULE</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
