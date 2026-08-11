import React, { useState } from 'react';
import { 
  Building2, 
  Boxes, 
  TrendingUp, 
  ShieldCheck, 
  Globe2, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Award
} from 'lucide-react';
import { getWhatsAppSourcingLink } from '../utils/formatters';

export const DealerWholesaleSection: React.FC = () => {
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    businessLocation: '',
    fleetQuantityNeeded: '5',
    vehicleMix: 'Mix of SUVs (Geely/Changan) and Pickups (ISUZU/Nissan)',
    targetDeliveryDate: '',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/dealer-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedRef(data.refNumber);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="dealers" className="py-16 bg-[#080809] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>BUILT FOR DEALERS & WHOLESALERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            YOUR INVENTORY SHOULD<br />
            <span className="text-[#D4AF37]">NEVER STOP MOVING.</span>
          </h2>

          <p className="text-slate-400 text-sm font-light">
            Trust Auto Trader powers vehicle dealers, car rental operators, and corporate fleet buyers with container-level wholesale pricing from China to Tema Port.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12 text-xs font-mono">
          <div className="p-5 bg-[#050505] border border-[#1A1A1C] space-y-2">
            <Boxes className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">BULK CONTAINER PRICING</h3>
            <p className="text-slate-400 text-[11px] font-sans font-light">Aggressive tier pricing for batch orders of 3, 5, 10, or 20+ vehicle units.</p>
          </div>

          <div className="p-5 bg-[#050505] border border-[#1A1A1C] space-y-2">
            <Globe2 className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">5,000 m² CHINA BASE</h3>
            <p className="text-slate-400 text-[11px] font-sans font-light">Direct access to export-ready factory inventory at our China export facility.</p>
          </div>

          <div className="p-5 bg-[#050505] border border-[#1A1A1C] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">TEMA PORT CLEARANCE</h3>
            <p className="text-slate-400 text-[11px] font-sans font-light">Fast-track customs handling, duty verification, and staging at Tema Golf City yard.</p>
          </div>

          <div className="p-5 bg-[#050505] border border-[#1A1A1C] space-y-2">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">HIGH-MARGIN DEMAND</h3>
            <p className="text-slate-400 text-[11px] font-sans font-light">Curated vehicle selections with verified resale liquidity across West Africa.</p>
          </div>
        </div>

        {/* Dealer Request Form Area */}
        <div className="max-w-3xl mx-auto bg-[#050505] border border-[#1A1A1C] p-6 sm:p-8 shadow-2xl">
          {submittedRef ? (
            <div className="text-center py-6 space-y-4 font-mono">
              <CheckCircle2 className="w-12 h-12 text-[#00FF41] mx-auto" />
              <h3 className="text-xl font-bold uppercase text-white font-sans">DEALER ENQUIRY REGISTERED</h3>
              <p className="text-slate-300 text-xs">
                REFERENCE: <span className="text-[#D4AF37] font-bold">{submittedRef}</span>
              </p>
              <a
                href={getWhatsAppSourcingLink(submittedRef, `Dealer Wholesale inquiry for ${form.companyName}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00FF41] text-black font-bold text-xs px-6 py-3 uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONNECT WITH EXECUTIVE DESK ON WHATSAPP</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
                REGISTER DEALER WHOLESALE ENQUIRY
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">DEALERSHIP / COMPANY NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tema Auto Imports Gh"
                    value={form.companyName}
                    onChange={e => setForm({ ...form, companyName: e.target.value })}
                    className="w-full bg-[#080809] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">CONTACT PERSON *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emmanuel Osei"
                    value={form.contactPerson}
                    onChange={e => setForm({ ...form, contactPerson: e.target.value })}
                    className="w-full bg-[#080809] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">PHONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0533877588"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#080809] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">BUSINESS LOCATION</label>
                  <input
                    type="text"
                    placeholder="e.g. Tema, Accra, Kumasi"
                    value={form.businessLocation}
                    onChange={e => setForm({ ...form, businessLocation: e.target.value })}
                    className="w-full bg-[#080809] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">FLEET UNITS REQUIRED</label>
                  <input
                    type="number"
                    min="1"
                    value={form.fleetQuantityNeeded}
                    onChange={e => setForm({ ...form, fleetQuantityNeeded: e.target.value })}
                    className="w-full bg-[#080809] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">TARGET DELIVERY TIMELINE</label>
                  <input
                    type="date"
                    value={form.targetDeliveryDate}
                    onChange={e => setForm({ ...form, targetDeliveryDate: e.target.value })}
                    className="w-full bg-[#080809] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">PREFERRED VEHICLE MIX & SPECS</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 3x Toyota RAV4 + 2x ISUZU D-Max Pickups"
                  value={form.vehicleMix}
                  onChange={e => setForm({ ...form, vehicleMix: e.target.value })}
                  className="w-full bg-[#080809] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs py-3.5 uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>REQUEST DEALER WHOLESALE PRICING</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
