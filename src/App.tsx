/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InventoryFilter } from './components/InventoryFilter';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { SourceVehicleSection } from './components/SourceVehicleSection';
import { DealerWholesaleSection } from './components/DealerWholesaleSection';
import { ChinaExportSection } from './components/ChinaExportSection';
import { NetworkMovementSection } from './components/NetworkMovementSection';
import { RecentArrivalsAndSold } from './components/RecentArrivalsAndSold';
import { TrustLocationSection } from './components/TrustLocationSection';
import { AdminCenter } from './components/AdminCenter';
import { Footer } from './components/Footer';

import { Vehicle, AdminStats, VehicleFilterState } from './types';
import { MessageSquare, Send, X, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { formatGhs, formatUsd, getWhatsAppVehicleLink } from './utils/formatters';
import { testFirestoreConnection, subscribeToVehicles, submitEnquiryToFirestore } from './lib/firebase';

export default function App() {
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  const [activeSection, setActiveSection] = useState<string>('inventory');

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Selected Vehicle for inspection detail view
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Wholesale Price Request Modal Vehicle
  const [wholesalePriceModalVehicle, setWholesalePriceModalVehicle] = useState<Vehicle | null>(null);
  const [priceInquiryForm, setPriceInquiryForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [priceInquirySubmitted, setPriceInquirySubmitted] = useState(false);

  // Admin Center modal toggle
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Filtering State
  const [filters, setFilters] = useState<VehicleFilterState>({
    search: '',
    make: 'ALL',
    type: 'ALL',
    location: 'ALL',
    status: 'ALL',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    fuel: 'ALL',
    transmission: 'ALL',
    condition: 'ALL',
    sortBy: 'newest'
  });

  // Fetch Vehicles & Stats from Backend Express API
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.make) params.append('make', filters.make);
      if (filters.type) params.append('type', filters.type);
      if (filters.location) params.append('location', filters.location);
      if (filters.status) params.append('status', filters.status);
      if (filters.fuel) params.append('fuel', filters.fuel);
      if (filters.transmission) params.append('transmission', filters.transmission);
      if (filters.condition) params.append('condition', filters.condition);
      if (filters.minYear) params.append('minYear', filters.minYear);
      if (filters.maxYear) params.append('maxYear', filters.maxYear);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const [resVehicles, resStats] = await Promise.all([
        fetch(`/api/vehicles?${params.toString()}`).then(r => r.json()),
        fetch('/api/stats').then(r => r.json())
      ]);

      if (resVehicles.success) {
        setVehicles(resVehicles.data);
      }
      if (resStats.success) {
        setStats(resStats.data);
      }
    } catch (err) {
      console.error('Failed fetching data from API', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testFirestoreConnection();
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [filters]);

  // Unique list of vehicle makes for filter dropdown
  const uniqueMakes = Array.from(new Set(vehicles.map(v => v.make))).sort();

  // Handle Wholesale Price Request Submit
  const handlePriceInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wholesalePriceModalVehicle) return;

    try {
      await submitEnquiryToFirestore({
        vehicleId: wholesalePriceModalVehicle.id,
        vehicleStockId: wholesalePriceModalVehicle.stockId,
        vehicleTitle: `${wholesalePriceModalVehicle.year} ${wholesalePriceModalVehicle.make} ${wholesalePriceModalVehicle.model}`,
        customerName: priceInquiryForm.name,
        phone: priceInquiryForm.phone,
        email: priceInquiryForm.email,
        message: `Wholesale Price Request for ${wholesalePriceModalVehicle.stockId} (${wholesalePriceModalVehicle.make} ${wholesalePriceModalVehicle.model}). Notes: ${priceInquiryForm.notes}`,
        source: 'DIRECT',
        status: 'NEW',
        createdAt: new Date().toISOString()
      });

      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: wholesalePriceModalVehicle.id,
          vehicleStockId: wholesalePriceModalVehicle.stockId,
          vehicleTitle: `${wholesalePriceModalVehicle.year} ${wholesalePriceModalVehicle.make} ${wholesalePriceModalVehicle.model}`,
          customerName: priceInquiryForm.name,
          phone: priceInquiryForm.phone,
          email: priceInquiryForm.email,
          message: `Wholesale Price Request for ${wholesalePriceModalVehicle.stockId} (${wholesalePriceModalVehicle.make} ${wholesalePriceModalVehicle.model}). Notes: ${priceInquiryForm.notes}`,
          source: 'DIRECT'
        })
      });

      setPriceInquirySubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleScrollTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Header Command Bar */}
      <Header
        stats={stats}
        activeSection={activeSection}
        setActiveSection={handleScrollTo}
        onOpenAdmin={() => setAdminOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Unforgettable Hero Experience */}
      <Hero
        stats={stats}
        onExploreInventory={() => handleScrollTo('inventory')}
        onSourceVehicle={() => handleScrollTo('sourcing')}
      />

      {/* Main Content Area */}
      <main className="space-y-12">
        
        {/* LIVE INVENTORY DISCOVERY SECTION */}
        <section id="inventory" className="py-12 max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DIRECT WHOLESALE ACCESS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              LIVE VEHICLE <span className="text-[#D4AF37]">INVENTORY</span>
            </h2>

            <p className="text-slate-400 text-sm font-light max-w-2xl">
              Explore vehicles currently available through the Trust Auto Trader network across Tema, Ghana and our China export staging base.
            </p>
          </div>

          {/* Filtering Panel */}
          <InventoryFilter
            filters={filters}
            setFilters={setFilters}
            totalCount={stats?.totalVehicles || vehicles.length}
            filteredCount={vehicles.length}
            makes={uniqueMakes}
          />

          {/* Vehicles Grid Display */}
          {loading ? (
            <div className="text-center py-20 font-mono text-xs text-[#D4AF37] space-y-3">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent animate-spin mx-auto" />
              <div>QUERYING TRUST AUTO TRADER INVENTORY DATABASE...</div>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-16 bg-[#080809] border border-[#1A1A1C] p-8 space-y-4 font-mono">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                NO VEHICLES MATCH YOUR EXACT SEARCH FILTERS.
              </div>
              <p className="text-slate-500 text-xs max-w-md mx-auto font-sans font-light">
                We can source any make or model through our 5,000m² China export base or global network.
              </p>
              <button
                onClick={() => handleScrollTo('sourcing')}
                className="bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs px-6 py-3 uppercase tracking-widest transition-colors cursor-pointer"
              >
                REQUEST CUSTOM VEHICLE SOURCING
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {vehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  currency={currency}
                  onSelect={setSelectedVehicle}
                  onRequestPrice={setWholesalePriceModalVehicle}
                />
              ))}
            </div>
          )}

        </section>

        {/* RECENT ARRIVALS & SOLD */}
        <RecentArrivalsAndSold
          vehicles={vehicles}
          currency={currency}
          onSelectVehicle={setSelectedVehicle}
          onRequestPrice={setWholesalePriceModalVehicle}
        />

        {/* SOURCE MY VEHICLE SYSTEM */}
        <SourceVehicleSection />

        {/* CHINA EXPORT BASE EXPERIENCE */}
        <ChinaExportSection
          onExploreChinaExport={() => {
            setFilters(prev => ({ ...prev, location: 'CHINA EXPORT' }));
            handleScrollTo('inventory');
          }}
        />

        {/* BUILT FOR DEALERS & FLEETS */}
        <DealerWholesaleSection />

        {/* NETWORK LOGISTICS MOVEMENT */}
        <NetworkMovementSection
          vehicles={vehicles}
          onSelectVehicle={setSelectedVehicle}
        />

        {/* TEMA LOCATION & TRUST SECTION */}
        <TrustLocationSection />

      </main>

      {/* Footer */}
      <Footer
        onSelectSection={handleScrollTo}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Modal: Vehicle Inspection Detail View */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        currency={currency}
        onClose={() => setSelectedVehicle(null)}
        onRequestWholesalePrice={(v) => {
          setSelectedVehicle(null);
          setWholesalePriceModalVehicle(v);
        }}
      />

      {/* Modal: Wholesale Price Request Modal */}
      {wholesalePriceModalVehicle && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 font-sans">
          <div className="w-full max-w-lg bg-[#080809] border border-[#1A1A1C] p-6 space-y-5 text-[#F0F0F0] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">WHOLESALE INQUIRY</span>
                <h3 className="text-base font-black uppercase text-white font-sans">
                  {wholesalePriceModalVehicle.year} {wholesalePriceModalVehicle.make} {wholesalePriceModalVehicle.model}
                </h3>
                <p className="text-[10px] font-mono text-slate-400">STOCK ID: {wholesalePriceModalVehicle.stockId}</p>
              </div>
              <button
                onClick={() => {
                  setWholesalePriceModalVehicle(null);
                  setPriceInquirySubmitted(false);
                }}
                className="p-1 bg-[#050505] border border-[#1A1A1C] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {priceInquirySubmitted ? (
              <div className="text-center py-6 space-y-4 font-mono">
                <CheckCircle2 className="w-12 h-12 text-[#00FF41] mx-auto" />
                <h4 className="font-bold text-white text-sm uppercase tracking-wider font-sans">INQUIRY TRANSMITTED</h4>
                <p className="text-slate-300 text-xs">
                  Your request for {wholesalePriceModalVehicle.stockId} has been logged.
                </p>
                <a
                  href={getWhatsAppVehicleLink(wholesalePriceModalVehicle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00FF41] text-black font-bold text-xs px-6 py-3 uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP NOW (0533877588)</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handlePriceInquirySubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Boateng"
                    value={priceInquiryForm.name}
                    onChange={e => setPriceInquiryForm({ ...priceInquiryForm, name: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">PHONE / WHATSAPP NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0533877588"
                    value={priceInquiryForm.phone}
                    onChange={e => setPriceInquiryForm({ ...priceInquiryForm, phone: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    placeholder="e.g. samuel@gmail.com"
                    value={priceInquiryForm.email}
                    onChange={e => setPriceInquiryForm({ ...priceInquiryForm, email: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px] tracking-wider">ADDITIONAL NOTES / QUANTITY</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Requesting wholesale price for 2 units shipped to Tema."
                    value={priceInquiryForm.notes}
                    onChange={e => setPriceInquiryForm({ ...priceInquiryForm, notes: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                  <a
                    href={getWhatsAppVehicleLink(wholesalePriceModalVehicle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1.5 bg-[#00FF41] text-black font-bold py-3 uppercase text-[10px] tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>INSTANT WHATSAPP</span>
                  </a>

                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black py-3 uppercase text-[10px] tracking-widest cursor-pointer"
                  >
                    SUBMIT PRICE REQUEST
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Admin Center Modal */}
      {adminOpen && (
        <AdminCenter
          onClose={() => setAdminOpen(false)}
          onDataChanged={fetchInventory}
        />
      )}

    </div>
  );
}
