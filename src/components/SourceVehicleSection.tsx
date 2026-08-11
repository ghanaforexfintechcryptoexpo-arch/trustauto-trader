import React, { useState } from 'react';
import { 
  Truck, 
  Send, 
  CheckCircle2, 
  Globe2, 
  Building2, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { getWhatsAppSourcingLink } from '../utils/formatters';
import { submitSourcingRequestToFirestore } from '../lib/firebase';

export const SourceVehicleSection: React.FC = () => {
  const [buyerType, setBuyerType] = useState<'INDIVIDUAL BUYER' | 'DEALER / WHOLESALE'>('INDIVIDUAL BUYER');
  
  const [form, setForm] = useState({
    customerName: '',
    companyName: '',
    phone: '',
    email: '',
    make: '',
    model: '',
    minYear: '2021',
    maxYear: '2024',
    budgetGhs: '',
    quantity: '1',
    condition: 'NEW',
    fuel: 'PETROL',
    transmission: 'AUTOMATIC',
    preferredLocation: 'China Export Base',
    destinationPort: 'Tema Port, Ghana',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const refNo = `SRC-${Date.now().toString().slice(-6)}`;
      await submitSourcingRequestToFirestore({
        refNumber: refNo,
        buyerType: buyerType,
        customerName: form.customerName,
        companyName: form.companyName,
        phone: form.phone,
        email: form.email,
        make: form.make,
        model: form.model,
        minYear: parseInt(form.minYear || '2021'),
        maxYear: parseInt(form.maxYear || '2024'),
        budgetGhs: parseFloat(form.budgetGhs || '0'),
        quantity: parseInt(form.quantity || '1'),
        condition: form.condition,
        fuel: form.fuel,
        transmission: form.transmission,
        preferredLocation: form.preferredLocation,
        destinationPort: form.destinationPort,
        additionalNotes: form.additionalNotes,
        status: 'NEW',
        createdAt: new Date().toISOString()
      });

      const res = await fetch('/api/sourcing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          buyerType
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedRef(data.refNumber);
      } else {
        setErrorMsg(data.message || 'Failed submitting sourcing request. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setForm({
      customerName: '',
      companyName: '',
      phone: '',
      email: '',
      make: '',
      model: '',
      minYear: '2021',
      maxYear: '2024',
      budgetGhs: '',
      quantity: '1',
      condition: 'NEW',
      fuel: 'PETROL',
      transmission: 'AUTOMATIC',
      preferredLocation: 'China Export Base',
      destinationPort: 'Tema Port, Ghana',
      additionalNotes: ''
    });
  };

  return (
    <section id="sourcing" className="py-16 bg-[#050505] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5" />
            <span>GLOBAL VEHICLE SOURCING NETWORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            CAN'T FIND THE RIGHT VEHICLE?<br />
            <span className="text-[#D4AF37]">WE'LL SOURCE IT.</span>
          </h2>

          <p className="text-slate-400 text-sm font-light">
            Tell us what you need and our sourcing team can search through our international vehicle network across China, Japan, and Tema Port.
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedRef ? (
          <div className="max-w-2xl mx-auto bg-[#080809] border border-[#00FF41] p-8 text-center space-y-6 shadow-2xl font-mono">
            <div className="w-16 h-16 bg-[#00FF41]/10 border border-[#00FF41] flex items-center justify-center mx-auto text-[#00FF41]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs text-[#00FF41] font-bold uppercase tracking-widest">
                SOURCING REQUEST REGISTERED
              </span>
              <h3 className="text-2xl font-black uppercase text-white font-sans">
                REQUEST REFERENCE: <span className="text-[#D4AF37]">{submittedRef}</span>
              </h3>
              <p className="text-slate-300 text-xs max-w-md mx-auto">
                Your request has been logged in the Trust Auto Trader sourcing command center. Our Tema & China procurement desks will review matching units.
              </p>
            </div>

            <div className="p-4 bg-[#050505] border border-[#1A1A1C] text-left text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">BUYER TYPE:</span>
                <span className="font-bold text-white">{buyerType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">REQUESTED VEHICLE:</span>
                <span className="font-bold text-[#D4AF37]">{form.make} {form.model} ({form.minYear}-{form.maxYear})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">UNITS REQUIRED:</span>
                <span className="font-bold text-white">{form.quantity} UNIT(S)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsAppSourcingLink(submittedRef, `Sourcing for ${form.make} ${form.model}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#00FF41] text-black font-bold text-xs px-6 py-3.5 uppercase tracking-wider shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>FOLLOW UP ON WHATSAPP (0533877588)</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#1A1A1C] bg-[#050505] text-slate-200 text-xs font-bold px-5 py-3.5 uppercase transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>SUBMIT ANOTHER REQUEST</span>
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Sourcing Form Container */
          <div className="max-w-4xl mx-auto bg-[#080809] border border-[#1A1A1C] p-6 sm:p-10 shadow-2xl">
            
            {/* Buyer Type Toggle */}
            <div className="mb-8">
              <label className="block text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">SELECT PURCHASER TYPE</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#050505] border border-[#1A1A1C]">
                <button
                  type="button"
                  onClick={() => setBuyerType('INDIVIDUAL BUYER')}
                  className={`py-3 px-4 text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    buyerType === 'INDIVIDUAL BUYER'
                      ? 'bg-[#D4AF37] text-black font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  INDIVIDUAL BUYER
                </button>

                <button
                  type="button"
                  onClick={() => setBuyerType('DEALER / WHOLESALE')}
                  className={`py-3 px-4 text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    buyerType === 'DEALER / WHOLESALE'
                      ? 'bg-[#D4AF37] text-black font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  DEALER / WHOLESALE FLEET
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
              
              {/* Contact Information */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame Adjei"
                    value={form.customerName}
                    onChange={e => setForm({ ...form, customerName: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                {buyerType === 'DEALER / WHOLESALE' ? (
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">COMPANY / DEALERSHIP NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Accra Motors Ltd"
                      value={form.companyName}
                      onChange={e => setForm({ ...form, companyName: e.target.value })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="e.g. kwame@gmail.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">PHONE / WHATSAPP NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0244123456"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">REQUIRED QUANTITY (UNITS)</label>
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Vehicle Requirements */}
              <div className="pt-4 border-t border-[#1A1A1C] grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">MAKE / BRAND *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota, Geely, ISUZU"
                    value={form.make}
                    onChange={e => setForm({ ...form, make: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">MODEL *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RAV4, Coolray, D-Max"
                    value={form.model}
                    onChange={e => setForm({ ...form, model: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">ESTIMATED BUDGET (GHS)</label>
                  <input
                    type="number"
                    placeholder="e.g. 400000"
                    value={form.budgetGhs}
                    onChange={e => setForm({ ...form, budgetGhs: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">MINIMUM YEAR</label>
                  <input
                    type="number"
                    value={form.minYear}
                    onChange={e => setForm({ ...form, minYear: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">MAXIMUM YEAR</label>
                  <input
                    type="number"
                    value={form.maxYear}
                    onChange={e => setForm({ ...form, maxYear: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">CONDITION</label>
                  <select
                    value={form.condition}
                    onChange={e => setForm({ ...form, condition: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  >
                    <option value="NEW">BRAND NEW (0 KM)</option>
                    <option value="USED">PRE-OWNED / USED</option>
                    <option value="CERTIFIED RECONDITIONED">CERTIFIED RECONDITIONED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">FUEL SYSTEM</label>
                  <select
                    value={form.fuel}
                    onChange={e => setForm({ ...form, fuel: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  >
                    <option value="PETROL">PETROL</option>
                    <option value="DIESEL">DIESEL</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="ELECTRIC">ELECTRIC (EV)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">PREFERRED SOURCING ORIGIN</label>
                  <select
                    value={form.preferredLocation}
                    onChange={e => setForm({ ...form, preferredLocation: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  >
                    <option value="Ghana Stock">GHANA STOCK (TEMA YARD)</option>
                    <option value="China Export Base">CHINA EXPORT BASE (5,000m² HUB)</option>
                    <option value="Global Sourcing Network">GLOBAL NETWORK (JAPAN/EUROPE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">DESTINATION PORT / YARD</label>
                  <select
                    value={form.destinationPort}
                    onChange={e => setForm({ ...form, destinationPort: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  >
                    <option value="Tema Port, Ghana">TEMA PORT, GHANA</option>
                    <option value="Tema Yard Pickup">TEMA GOLF CITY YARD PICKUP</option>
                    <option value="Kumasi Freight Depot">KUMASI FREIGHT DEPOT</option>
                    <option value="Direct Fleet Delivery">DIRECT FLEET DELIVERY (NATIONWIDE)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">ADDITIONAL SPECIFICATIONS & REQUIREMENTS</label>
                <textarea
                  rows={3}
                  placeholder="Specify trim preference, interior color, towing package, batch container requirements..."
                  value={form.additionalNotes}
                  onChange={e => setForm({ ...form, additionalNotes: e.target.value })}
                  className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs py-4 uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>TRANSMITTING SOURCING DATA...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT SOURCING REQUEST TO NETWORK</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
