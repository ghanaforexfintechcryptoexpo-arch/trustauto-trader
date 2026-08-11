/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VehicleShowcase } from './components/VehicleShowcase';
import { BusinessShowcase } from './components/BusinessShowcase';
import { SourceVehicleSection } from './components/SourceVehicleSection';
import { DealerWholesaleSection } from './components/DealerWholesaleSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SocialChannelsSection } from './components/SocialChannelsSection';
import { InventoryFilter } from './components/InventoryFilter';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { TrustLocationSection } from './components/TrustLocationSection';
import { AdminCenter } from './components/AdminCenter';
import { Footer } from './components/Footer';

import { Vehicle, AdminStats, VehicleFilterState } from './types';
import { MessageSquare, Send, X, CheckCircle2, ShieldCheck, PhoneCall, RotateCcw, SearchX, Sparkles, Globe2 } from 'lucide-react';
import { formatGhs, formatUsd, getWhatsAppVehicleLink } from './utils/formatters';
import { testFirestoreConnection, subscribeToVehicles, submitEnquiryToFirestore } from './lib/firebase';

export default function App() {
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  const [activeSection, setActiveSection] = useState<string>('showcase');

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Selected Vehicle for inspection detail view
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Wholesale Price Request Modal Vehicle
  const [wholesalePriceModalVehicle, setWholesalePriceModalVehicle] = useState<Vehicle | null>(null);
  const [priceInquiryForm, setPriceInquiryForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [priceInquirySubmitted, setPriceInquirySubmitted] = useState(false);

  // Admin Center modal toggle
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  const handleSourceRequestWithPrefill = (categoryName: string) => {
    handleScrollTo('sourcing');
  };

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

  const resetAllFilters = () => {
    setFilters({
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
  };

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
        if (allVehicles.length === 0 || (!filters.search && filters.make === 'ALL' && filters.type === 'ALL' && filters.location === 'ALL')) {
          setAllVehicles(resVehicles.data);
        }
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
    // Fetch initial complete list of vehicles for recommendation fallback
    fetch('/api/vehicles')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) setAllVehicles(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [filters]);

  // Unique list of vehicle makes for filter dropdown
  const uniqueMakes = Array.from(new Set((allVehicles.length > 0 ? allVehicles : vehicles).map(v => v.make))).sort();

  // Active Filter Badges list
  const activeFilterBadges = [
    filters.search ? { label: `Search: "${filters.search}"`, clear: () => setFilters(p => ({ ...p, search: '' })) } : null,
    filters.make !== 'ALL' ? { label: `Make: ${filters.make}`, clear: () => setFilters(p => ({ ...p, make: 'ALL' })) } : null,
    filters.type !== 'ALL' ? { label: `Type: ${filters.type}`, clear: () => setFilters(p => ({ ...p, type: 'ALL' })) } : null,
    filters.location !== 'ALL' ? { label: `Location: ${filters.location}`, clear: () => setFilters(p => ({ ...p, location: 'ALL' })) } : null,
    filters.status !== 'ALL' ? { label: `Status: ${filters.status}`, clear: () => setFilters(p => ({ ...p, status: 'ALL' })) } : null,
    filters.fuel !== 'ALL' ? { label: `Fuel: ${filters.fuel}`, clear: () => setFilters(p => ({ ...p, fuel: 'ALL' })) } : null,
    filters.transmission !== 'ALL' ? { label: `Transmission: ${filters.transmission}`, clear: () => setFilters(p => ({ ...p, transmission: 'ALL' })) } : null,
    filters.condition !== 'ALL' ? { label: `Condition: ${filters.condition}`, clear: () => setFilters(p => ({ ...p, condition: 'ALL' })) } : null,
    filters.minYear ? { label: `Min Year: ${filters.minYear}`, clear: () => setFilters(p => ({ ...p, minYear: '' })) } : null,
    filters.maxYear ? { label: `Max Year: ${filters.maxYear}`, clear: () => setFilters(p => ({ ...p, maxYear: '' })) } : null,
    filters.minPrice ? { label: `Min Price: GHS ${filters.minPrice}`, clear: () => setFilters(p => ({ ...p, minPrice: '' })) } : null,
    filters.maxPrice ? { label: `Max Price: GHS ${filters.maxPrice}`, clear: () => setFilters(p => ({ ...p, maxPrice: '' })) } : null,
  ].filter(Boolean) as { label: string; clear: () => void }[];

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

      {/* Hero Section */}
      <Hero
        stats={stats}
        onExploreVehicles={() => handleScrollTo('showcase')}
        onSourceVehicle={() => handleScrollTo('sourcing')}
      />

      {/* Main Content Area */}
      <main className="space-y-4">
        
        {/* 1. VEHICLE SHOWCASE (Aesthetic showcase replacing inventory hero) */}
        <VehicleShowcase
          onSourceRequest={handleSourceRequestWithPrefill}
        />

        {/* 2. BUSINESS SHOWCASE (MORE THAN A DEALERSHIP) */}
        <BusinessShowcase />

        {/* 3. VEHICLE SOURCING (CAN'T FIND THE RIGHT VEHICLE? WE'LL SOURCE IT) */}
        <SourceVehicleSection />

        {/* 4. BUILT FOR DEALERS */}
        <DealerWholesaleSection />

        {/* 5. HOW IT WORKS */}
        <HowItWorksSection />

        {/* 6. SOCIAL CHANNELS (FOLLOW THE VEHICLES) */}
        <SocialChannelsSection />

        {/* 7. TEMA LOCATION & INSPECTION YARD */}
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
