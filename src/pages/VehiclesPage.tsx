import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleFilterState } from '../types';
import { 
  Search, Filter, RotateCcw, ArrowRight, MessageSquare, ShieldCheck, 
  Car, Compass, Sparkles, MapPin, Fuel, Gauge, SlidersHorizontal, CheckCircle2, X
} from 'lucide-react';
import { formatGhs, formatUsd, getStatusBadgeInfo, getVehicleSlug, getWhatsAppVehicleLink } from '../utils/formatters';

interface VehiclesPageProps {
  vehicles: Vehicle[];
  loading: boolean;
  currency: 'GHS' | 'USD';
  onSelectVehicle: (vehicle: Vehicle) => void;
  onNavigateToDetail: (slug: string) => void;
  onRequestSourcing: () => void;
  onRequestPrice: (vehicle: Vehicle) => void;
}

const CATEGORY_TABS = [
  { id: 'ALL', label: 'All Vehicles' },
  { id: 'Toyota', label: 'Toyota' },
  { id: 'Geely', label: 'Geely' },
  { id: 'Changan', label: 'Changan' },
  { id: 'SUVs', label: 'SUVs' },
  { id: 'Sedans', label: 'Sedans' },
  { id: 'Pickups', label: 'Pickups' },
  { id: 'Luxury', label: 'Luxury' },
  { id: 'Commercial', label: 'Commercial' },
];

export const VehiclesPage: React.FC<VehiclesPageProps> = ({
  vehicles,
  loading,
  currency,
  onSelectVehicle,
  onNavigateToDetail,
  onRequestSourcing,
  onRequestPrice
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [makeFilter, setMakeFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [locationFilter, setLocationFilter] = useState<string>('ALL');
  const [fuelFilter, setFuelFilter] = useState<string>('ALL');
  const [transmissionFilter, setTransmissionFilter] = useState<string>('ALL');
  const [conditionFilter, setConditionFilter] = useState<string>('ALL');
  const [minYearFilter, setMinYearFilter] = useState<string>('');
  const [maxYearFilter, setMaxYearFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Unique list of vehicle makes in database
  const availableMakes = Array.from(new Set(vehicles.map(v => v.make))).filter(Boolean).sort();

  // Reset filters
  const resetFilters = () => {
    setActiveCategory('ALL');
    setSearchQuery('');
    setMakeFilter('ALL');
    setTypeFilter('ALL');
    setStatusFilter('ALL');
    setLocationFilter('ALL');
    setFuelFilter('ALL');
    setTransmissionFilter('ALL');
    setConditionFilter('ALL');
    setMinYearFilter('');
    setMaxYearFilter('');
    setSortBy('newest');
  };

  // Filter & Sort Logic
  const publicVehicles = vehicles.filter(v => (v.status || '').toLowerCase() !== 'draft');

  const filteredVehicles = publicVehicles.filter(v => {
    // Category tab quick filter
    if (activeCategory === 'Toyota' && v.make.toLowerCase() !== 'toyota') return false;
    if (activeCategory === 'Geely' && v.make.toLowerCase() !== 'geely') return false;
    if (activeCategory === 'Changan' && v.make.toLowerCase() !== 'changan') return false;
    if (activeCategory === 'SUVs' && (v.type || v.bodyType || '').toUpperCase() !== 'SUV') return false;
    if (activeCategory === 'Sedans' && (v.type || v.bodyType || '').toUpperCase() !== 'SEDAN') return false;
    if (activeCategory === 'Pickups' && (v.type || v.bodyType || '').toUpperCase() !== 'PICKUP') return false;
    if (activeCategory === 'Luxury' && (v.type || v.bodyType || '').toUpperCase() !== 'LUXURY') return false;
    if (activeCategory === 'Commercial' && (v.type || v.bodyType || '').toUpperCase() !== 'COMMERCIAL' && (v.type || v.bodyType || '').toUpperCase() !== 'TRUCK' && (v.type || v.bodyType || '').toUpperCase() !== 'VAN') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchMake = v.make.toLowerCase().includes(q);
      const matchModel = v.model.toLowerCase().includes(q);
      const matchStockId = v.stockId.toLowerCase().includes(q);
      const matchTrim = (v.trim || '').toLowerCase().includes(q);
      const matchEngine = (v.engine || '').toLowerCase().includes(q);
      const matchYear = v.year.toString().includes(q);
      if (!matchMake && !matchModel && !matchStockId && !matchTrim && !matchEngine && !matchYear) return false;
    }

    // Make dropdown
    if (makeFilter !== 'ALL' && v.make.toLowerCase() !== makeFilter.toLowerCase()) return false;

    // Type dropdown
    if (typeFilter !== 'ALL' && (v.type || v.bodyType || '').toUpperCase() !== typeFilter.toUpperCase()) return false;

    // Location dropdown
    if (locationFilter !== 'ALL' && (v.location || '').toUpperCase() !== locationFilter.toUpperCase()) return false;

    // Status dropdown
    if (statusFilter !== 'ALL') {
      const s = (v.status || '').toLowerCase().replace(/[\s_-]+/g, '');
      const target = statusFilter.toLowerCase().replace(/[\s_-]+/g, '');
      if (s !== target) return false;
    }

    // Fuel dropdown
    if (fuelFilter !== 'ALL' && (v.fuel || v.fuelType || '').toUpperCase() !== fuelFilter.toUpperCase()) return false;

    // Transmission dropdown
    if (transmissionFilter !== 'ALL' && (v.transmission || '').toUpperCase() !== transmissionFilter.toUpperCase()) return false;

    // Condition dropdown
    if (conditionFilter !== 'ALL' && (v.condition || '').toUpperCase() !== conditionFilter.toUpperCase()) return false;

    // Min/Max Year
    if (minYearFilter && v.year < parseInt(minYearFilter)) return false;
    if (maxYearFilter && v.year > parseInt(maxYearFilter)) return false;

    return true;
  });

  // Sorting
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'price-asc') {
      const priceA = a.priceGhs || a.price || 0;
      const priceB = b.priceGhs || b.price || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-desc') {
      const priceA = a.priceGhs || a.price || 0;
      const priceB = b.priceGhs || b.price || 0;
      return priceB - priceA;
    }
    if (sortBy === 'year-desc') {
      return b.year - a.year;
    }
    if (sortBy === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  const activeFiltersCount = [
    searchQuery,
    makeFilter !== 'ALL',
    typeFilter !== 'ALL',
    statusFilter !== 'ALL',
    locationFilter !== 'ALL',
    fuelFilter !== 'ALL',
    transmissionFilter !== 'ALL',
    conditionFilter !== 'ALL',
    minYearFilter,
    maxYearFilter
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans pb-24">
      
      {/* Header Banner */}
      <section id="vehicles-header" className="relative pt-28 pb-16 px-4 border-b border-[#1A1A1C] bg-gradient-to-b from-[#08080A] to-[#050505]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHOLESALE AUTOMOTIVE NETWORK</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
            EXPLORE OUR VEHICLE RANGE
          </h1>

          <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Discover the vehicles and categories available through the Trust Auto Trader network. Direct sourcing across Ghana, China Export, and regional dealer hubs.
          </p>

          {/* Quick Category Pills */}
          <div className="pt-6 flex flex-wrap gap-2">
            {CATEGORY_TABS.map(tab => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                    active 
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/10' 
                      : 'bg-[#080809] text-slate-300 border-[#1A1A1C] hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section id="vehicles-filters" className="sticky top-16 z-30 bg-[#050505]/95 backdrop-blur-md border-b border-[#1A1A1C] py-4 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by Make, Model, Stock ID (e.g. Toyota RAV4, TA-2024-001)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#08080A] border border-[#1A1A1C] text-white pl-10 pr-4 py-2.5 text-xs focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Make Filter */}
              <select
                value={makeFilter}
                onChange={e => setMakeFilter(e.target.value)}
                className="bg-[#08080A] border border-[#1A1A1C] text-xs text-slate-200 px-3 py-2.5 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="ALL">All Makes</option>
                {availableMakes.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-[#08080A] border border-[#1A1A1C] text-xs text-slate-200 px-3 py-2.5 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="showcase">Showcase Vehicles</option>
                <option value="available">Confirmed Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
                <option value="coming_soon">Coming Soon</option>
              </select>

              {/* Location Filter */}
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                className="bg-[#08080A] border border-[#1A1A1C] text-xs text-slate-200 px-3 py-2.5 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="ALL">All Locations</option>
                <option value="GHANA">Ghana Stock</option>
                <option value="CHINA EXPORT">China Export Base</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-[#08080A] border border-[#1A1A1C] text-xs text-[#D4AF37] px-3 py-2.5 focus:border-[#D4AF37] focus:outline-none font-bold"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="featured">Sort: Featured First</option>
                <option value="year-desc">Sort: Year (Newest)</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
              </select>

              {/* Toggle Advanced Filters */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-1.5 px-3 py-2.5 border text-xs font-mono transition-colors cursor-pointer ${
                  showAdvancedFilters || activeFiltersCount > 0
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#08080A] border-[#1A1A1C] text-slate-400 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>FILTERS {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-slate-300 px-2 py-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET</span>
                </button>
              )}

            </div>

          </div>

          {/* Advanced Filter Panel */}
          {showAdvancedFilters && (
            <div className="pt-3 border-t border-[#1A1A1C] grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
              <div>
                <label className="block text-slate-400 text-[10px] mb-1 uppercase">Body Type</label>
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1A1A1C] text-slate-200 p-2 focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="ALL">All Body Types</option>
                  <option value="SUV">SUV</option>
                  <option value="SEDAN">Sedan</option>
                  <option value="PICKUP">Pickup</option>
                  <option value="HATCHBACK">Hatchback</option>
                  <option value="VAN">Van</option>
                  <option value="TRUCK">Truck</option>
                  <option value="LUXURY">Luxury</option>
                  <option value="COMMERCIAL">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1 uppercase">Fuel Type</label>
                <select
                  value={fuelFilter}
                  onChange={e => setFuelFilter(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1A1A1C] text-slate-200 p-2 focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="ALL">All Fuel Types</option>
                  <option value="PETROL">Petrol</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ELECTRIC">Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1 uppercase">Transmission</label>
                <select
                  value={transmissionFilter}
                  onChange={e => setTransmissionFilter(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1A1A1C] text-slate-200 p-2 focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="ALL">All Transmissions</option>
                  <option value="AUTOMATIC">Automatic</option>
                  <option value="MANUAL">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1 uppercase">Condition</label>
                <select
                  value={conditionFilter}
                  onChange={e => setConditionFilter(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1A1A1C] text-slate-200 p-2 focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="ALL">All Conditions</option>
                  <option value="NEW">Brand New</option>
                  <option value="USED">Pre-Owned / Used</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1 uppercase">Year Range</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    placeholder="Min Year"
                    value={minYearFilter}
                    onChange={e => setMinYearFilter(e.target.value)}
                    className="w-full bg-[#08080A] border border-[#1A1A1C] text-slate-200 p-2 text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                  <span className="text-slate-600">-</span>
                  <input
                    type="number"
                    placeholder="Max Year"
                    value={maxYearFilter}
                    onChange={e => setMaxYearFilter(e.target.value)}
                    className="w-full bg-[#08080A] border border-[#1A1A1C] text-slate-200 p-2 text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Main Vehicles Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Results Counter Bar */}
        <div className="flex items-center justify-between pb-6 text-xs font-mono text-slate-400">
          <span>SHOWING {sortedVehicles.length} {sortedVehicles.length === 1 ? 'VEHICLE' : 'VEHICLES'}</span>
          {activeCategory !== 'ALL' && (
            <span className="text-[#D4AF37] uppercase font-bold">CATEGORY: {activeCategory}</span>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="inline-block w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">LOADING VEHICLE CATALOG...</p>
          </div>
        ) : sortedVehicles.length > 0 ? (
          /* Grid of Vehicles */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVehicles.map(vehicle => {
              const badge = getStatusBadgeInfo(vehicle.status);
              const slug = getVehicleSlug(vehicle);
              const hasPrice = (vehicle.priceGhs && vehicle.priceGhs > 0) || (vehicle.price && vehicle.price > 0);
              const isPriceOnReq = vehicle.priceOnRequest || !hasPrice;

              return (
                <div
                  key={vehicle.id}
                  className="bg-[#080809] border border-[#1A1A1C] hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group overflow-hidden"
                >
                  {/* Top Image Box */}
                  <div className="relative aspect-[16/10] bg-[#020202] overflow-hidden">
                    <img
                      src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2.5 py-1 border text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${badge.bg} ${badge.text} ${badge.border}`}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Location Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/80 border border-[#1A1A1C] text-[10px] font-mono text-slate-300 uppercase">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span>{vehicle.location || 'GHANA'}</span>
                      </span>
                    </div>

                    {/* Stock ID pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 bg-black/80 text-[10px] font-mono text-slate-400 border border-[#1A1A1C]">
                        {vehicle.stockId}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                        <span>{vehicle.year} • {vehicle.condition || 'NEW'}</span>
                        <span className="text-[#D4AF37] uppercase">{vehicle.type || vehicle.bodyType || 'SUV'}</span>
                      </div>

                      <h3 className="text-lg font-black uppercase text-white tracking-tight mt-1 group-hover:text-[#D4AF37] transition-colors">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      
                      {vehicle.trim && (
                        <p className="text-xs font-mono text-slate-400">{vehicle.trim}</p>
                      )}
                    </div>

                    {/* Key Specs Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1A1A1C] text-[11px] font-mono text-slate-300">
                      <div>
                        <span className="block text-[9px] text-slate-500 uppercase">Engine</span>
                        <span className="truncate block">{vehicle.engine || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-500 uppercase">Fuel</span>
                        <span className="truncate block">{vehicle.fuel || vehicle.fuelType || 'PETROL'}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-500 uppercase">Transmission</span>
                        <span className="truncate block">{vehicle.transmission || 'AUTO'}</span>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-1 flex items-end justify-between gap-2">
                      <div>
                        <span className="block text-[9px] font-mono text-slate-500 uppercase">Wholesale Price</span>
                        {isPriceOnReq ? (
                          <span className="text-sm font-black text-[#D4AF37] font-mono tracking-wider">
                            REQUEST PRICE
                          </span>
                        ) : (
                          <div className="font-mono">
                            <span className="text-base font-black text-white">
                              {currency === 'GHS' ? formatGhs(vehicle.priceGhs || vehicle.price) : formatUsd(vehicle.priceUsd)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <a
                          href={getWhatsAppVehicleLink(vehicle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat on WhatsApp"
                          className="p-2.5 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => onNavigateToDetail(slug)}
                          className="px-3 py-2 bg-[#D4AF37] text-black font-black text-xs font-mono uppercase tracking-wider hover:bg-[#c29f2e] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>DETAILS</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ELEGANT EMPTY STATE FOR 0 VEHICLES / MATCHES */
          <div className="py-20 px-6 max-w-xl mx-auto text-center space-y-6 bg-[#080809] border border-[#1A1A1C] p-8 shadow-2xl my-8">
            <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Compass className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase text-white tracking-tight font-sans">
                {publicVehicles.length === 0 ? "Vehicle listings are being updated." : "No vehicles match your search."}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                {publicVehicles.length === 0 
                  ? "Our wholesale inventory team is currently updating active listings across our Tema inspection yard and China export base." 
                  : "We couldn't find any vehicles matching your current search parameters. You can reset your filters or request custom sourcing."}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1A1A1C] space-y-3 font-mono">
              <p className="text-xs text-white font-bold uppercase tracking-wider">
                Looking for a specific vehicle?
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onRequestSourcing}
                  className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs uppercase tracking-widest cursor-pointer transition-colors"
                >
                  SOURCE A VEHICLE
                </button>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="w-full sm:w-auto px-6 py-3 bg-[#050505] border border-[#1A1A1C] hover:border-slate-600 text-slate-300 font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    RESET ALL FILTERS
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
