/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VehicleShowcase } from './components/VehicleShowcase';
import { FeaturedVehiclesSection } from './components/FeaturedVehiclesSection';
import { BusinessShowcase } from './components/BusinessShowcase';
import { SourceVehicleSection } from './components/SourceVehicleSection';
import { DealerWholesaleSection } from './components/DealerWholesaleSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SocialChannelsSection } from './components/SocialChannelsSection';
import { TrustLocationSection } from './components/TrustLocationSection';
import { AdminCenter } from './components/AdminCenter';
import { Footer } from './components/Footer';

import { VehiclesPage } from './pages/VehiclesPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';

import { Vehicle, AdminStats } from './types';
import { MessageSquare, Send, X, CheckCircle2 } from 'lucide-react';
import { formatGhs, formatUsd, getWhatsAppVehicleLink } from './utils/formatters';
import { testFirestoreConnection, submitEnquiryToFirestore } from './lib/firebase';

export default function App() {
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  const [activeSection, setActiveSection] = useState<string>('showcase');

  // Page Routing State
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [detailSlug, setDetailSlug] = useState<string | null>(null);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Selected vehicle for detail page view
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);
  const [loadingDetailVehicle, setLoadingDetailVehicle] = useState<boolean>(false);

  // Wholesale Price Request Modal Vehicle
  const [wholesalePriceModalVehicle, setWholesalePriceModalVehicle] = useState<Vehicle | null>(null);
  const [priceInquiryForm, setPriceInquiryForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [priceInquirySubmitted, setPriceInquirySubmitted] = useState(false);

  // Admin Center modal toggle
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Sync state with URL pathname & browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      if (path.startsWith('/vehicles/')) {
        const slug = path.replace('/vehicles/', '');
        setDetailSlug(slug);
      } else {
        setDetailSlug(null);
      }
      if (path === '/admin') {
        setAdminOpen(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Check on initial load

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (path.startsWith('/vehicles/')) {
      const slug = path.replace('/vehicles/', '');
      setDetailSlug(slug);
    } else {
      setDetailSlug(null);
    }
    if (path === '/admin') {
      setAdminOpen(true);
    } else {
      setAdminOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch Inventory & Stats from API
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const [resVehicles, resStats] = await Promise.all([
        fetch('/api/vehicles').then(r => r.json()),
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
    fetchInventory();
  }, []);

  // Fetch individual vehicle detail by slug if viewing detail page
  useEffect(() => {
    if (detailSlug) {
      setLoadingDetailVehicle(true);
      fetch(`/api/vehicles/${detailSlug}`)
        .then(r => r.json())
        .then(res => {
          if (res.success && res.data) {
            setDetailVehicle(res.data);
          } else {
            setDetailVehicle(null);
          }
        })
        .catch(() => setDetailVehicle(null))
        .finally(() => setLoadingDetailVehicle(false));
    } else {
      setDetailVehicle(null);
    }
  }, [detailSlug]);

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
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSourceRequestWithPrefill = (categoryName: string) => {
    handleScrollTo('sourcing');
  };

  // Determine current page view
  const isVehiclesListPage = currentPath === '/vehicles';
  const isVehicleDetailPage = currentPath.startsWith('/vehicles/') && detailSlug;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Header Command Bar */}
      <Header
        stats={stats}
        activeSection={activeSection}
        setActiveSection={handleScrollTo}
        onOpenAdmin={() => navigateTo('/admin')}
        currency={currency}
        setCurrency={setCurrency}
        onNavigateVehicles={() => navigateTo('/vehicles')}
        onNavigateHome={() => navigateTo('/')}
      />

      {/* RENDER PAGES BASED ON ROUTE */}
      {isVehicleDetailPage ? (
        /* VEHICLE DETAIL PAGE (/vehicles/[slug]) */
        <VehicleDetailPage
          vehicle={detailVehicle}
          loading={loadingDetailVehicle}
          currency={currency}
          onBack={() => navigateTo('/vehicles')}
          onRequestPrice={(v) => setWholesalePriceModalVehicle(v)}
          onRequestSourcing={(v) => {
            navigateTo('/');
            setTimeout(() => {
              const el = document.getElementById('sourcing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      ) : isVehiclesListPage ? (
        /* VEHICLES CATALOG LISTING PAGE (/vehicles) */
        <VehiclesPage
          vehicles={vehicles}
          loading={loading}
          currency={currency}
          onSelectVehicle={(v) => navigateTo(`/vehicles/${v.slug || v.id}`)}
          onNavigateToDetail={(slug) => navigateTo(`/vehicles/${slug}`)}
          onRequestSourcing={() => {
            navigateTo('/');
            setTimeout(() => {
              const el = document.getElementById('sourcing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onRequestPrice={(v) => setWholesalePriceModalVehicle(v)}
        />
      ) : (
        /* HOMEPAGE EXPERIENCE (/) */
        <>
          <Hero
            stats={stats}
            onExploreVehicles={() => navigateTo('/vehicles')}
            onSourceVehicle={() => handleScrollTo('sourcing')}
          />

          <main className="space-y-4">
            {/* FEATURED VEHICLES SECTION (Connected to DB) */}
            <FeaturedVehiclesSection
              vehicles={vehicles}
              currency={currency}
              onNavigateToVehicles={() => navigateTo('/vehicles')}
              onNavigateToDetail={(slug) => navigateTo(`/vehicles/${slug}`)}
              onRequestPrice={(v) => setWholesalePriceModalVehicle(v)}
            />

            {/* VEHICLE SHOWCASE (Sourcing capability showcase) */}
            <VehicleShowcase
              onSourceRequest={handleSourceRequestWithPrefill}
            />

            {/* BUSINESS SHOWCASE */}
            <BusinessShowcase />

            {/* VEHICLE SOURCING */}
            <SourceVehicleSection />

            {/* BUILT FOR DEALERS */}
            <DealerWholesaleSection />

            {/* HOW IT WORKS */}
            <HowItWorksSection />

            {/* SOCIAL CHANNELS */}
            <SocialChannelsSection />

            {/* TEMA LOCATION & INSPECTION YARD */}
            <TrustLocationSection />
          </main>
        </>
      )}

      {/* Footer */}
      <Footer
        onSelectSection={handleScrollTo}
        onOpenAdmin={() => navigateTo('/admin')}
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
          onClose={() => {
            setAdminOpen(false);
            if (currentPath === '/admin') {
              navigateTo('/');
            }
          }}
          onDataChanged={fetchInventory}
        />
      )}

    </div>
  );
}
