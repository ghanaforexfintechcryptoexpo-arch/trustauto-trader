import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  SlidersHorizontal, 
  X, 
  Check, 
  MapPin, 
  Globe2,
  ChevronDown
} from 'lucide-react';
import { VehicleFilterState } from '../types';

interface InventoryFilterProps {
  filters: VehicleFilterState;
  setFilters: React.Dispatch<React.SetStateAction<VehicleFilterState>>;
  totalCount: number;
  filteredCount: number;
  makes: string[];
}

export const InventoryFilter: React.FC<InventoryFilterProps> = ({
  filters,
  setFilters,
  totalCount,
  filteredCount,
  makes
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const resetFilters = () => {
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

  const categories = [
    { id: 'ALL', label: 'ALL TYPES' },
    { id: 'SUV', label: 'SUV' },
    { id: 'PICKUP', label: 'PICKUP' },
    { id: 'SEDAN', label: 'SEDAN' },
    { id: 'TRUCK', label: 'HEAVY TRUCK' },
    { id: 'VAN', label: 'COMMERCIAL VAN' },
    { id: 'LUXURY', label: 'LUXURY' },
    { id: 'HATCHBACK', label: 'HATCHBACK' },
  ];

  const locations = [
    { id: 'ALL', label: 'ALL LOCATIONS' },
    { id: 'GHANA', label: 'GHANA STOCK (TEMA)' },
    { id: 'CHINA EXPORT', label: 'CHINA EXPORT BASE' },
  ];

  const statuses = [
    { id: 'ALL', label: 'ALL STATUSES' },
    { id: 'AVAILABLE', label: 'AVAILABLE NOW' },
    { id: 'JUST ARRIVED', label: 'JUST ARRIVED' },
    { id: 'RESERVED', label: 'RESERVED' },
    { id: 'SOLD', label: 'RECENTLY SOLD' },
    { id: 'COMING SOON', label: 'COMING SOON' },
  ];

  const activeFilterCount = [
    filters.search,
    filters.make !== 'ALL' ? filters.make : '',
    filters.type !== 'ALL' ? filters.type : '',
    filters.location !== 'ALL' ? filters.location : '',
    filters.status !== 'ALL' ? filters.status : '',
    filters.fuel !== 'ALL' ? filters.fuel : '',
    filters.transmission !== 'ALL' ? filters.transmission : '',
    filters.condition !== 'ALL' ? filters.condition : '',
    filters.minYear,
    filters.maxYear,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      
      {/* Search & Location Bar */}
      <div className="bg-[#080809] border border-[#1A1A1C] p-4 sm:p-6 shadow-xl space-y-4 font-sans">
        
        {/* Main Search Input */}
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search make, model, stock ID (e.g. Toyota RAV4, Geely, TA-2024-001)..."
              className="w-full bg-[#050505] border border-[#1A1A1C] focus:border-[#D4AF37] pl-11 pr-10 py-3 text-xs text-white placeholder-slate-500 font-mono focus:outline-none transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Toggle Tabs */}
          <div className="flex bg-[#050505] p-1 border border-[#1A1A1C] text-[10px] font-mono font-bold uppercase tracking-wider">
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setFilters(prev => ({ ...prev, location: loc.id }))}
                className={`px-3 py-2 transition-all flex items-center gap-1.5 ${
                  filters.location === loc.id
                    ? 'bg-[#D4AF37] text-black font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {loc.id === 'GHANA' && <MapPin className="w-3 h-3" />}
                {loc.id === 'CHINA EXPORT' && <Globe2 className="w-3 h-3" />}
                <span>{loc.label}</span>
              </button>
            ))}
          </div>

          {/* Toggle Advanced Filters Button */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-2 px-4 py-3 border text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
              showAdvanced || activeFilterCount > 0
                ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                : 'bg-[#050505] border-[#1A1A1C] text-slate-300 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>FILTERS</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-[#D4AF37] text-black font-black text-[9px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none border-t border-[#1A1A1C]">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, type: cat.id }))}
              className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                filters.type === cat.id
                  ? 'bg-[#D4AF37] text-black'
                  : 'bg-[#050505] border border-[#1A1A1C] text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Advanced Expanded Filters Panel */}
        {showAdvanced && (
          <div className="pt-4 border-t border-[#1A1A1C] grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            
            {/* Make Select */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">MAKE / BRAND</label>
              <select
                value={filters.make}
                onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
              >
                <option value="ALL">ALL MAKES</option>
                {makes.map(m => (
                  <option key={m} value={m}>{m.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">AVAILABILITY STATUS</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
              >
                {statuses.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">FUEL TYPE</label>
              <select
                value={filters.fuel}
                onChange={(e) => setFilters(prev => ({ ...prev, fuel: e.target.value }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
              >
                <option value="ALL">ALL FUELS</option>
                <option value="PETROL">PETROL</option>
                <option value="DIESEL">DIESEL</option>
                <option value="HYBRID">HYBRID</option>
                <option value="ELECTRIC">ELECTRIC (EV)</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">TRANSMISSION</label>
              <select
                value={filters.transmission}
                onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
              >
                <option value="ALL">ALL TRANSMISSIONS</option>
                <option value="AUTOMATIC">AUTOMATIC</option>
                <option value="MANUAL">MANUAL</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">MIN PRICE (GHS)</label>
              <input
                type="number"
                placeholder="e.g. 200000"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">MAX PRICE (GHS)</label>
              <input
                type="number"
                placeholder="e.g. 1000000"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none text-xs"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">CONDITION</label>
              <select
                value={filters.condition}
                onChange={(e) => setFilters(prev => ({ ...prev, condition: e.target.value }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
              >
                <option value="ALL">ALL CONDITIONS</option>
                <option value="NEW">BRAND NEW (0 KM)</option>
                <option value="USED">PRE-OWNED / USED</option>
                <option value="CERTIFIED RECONDITIONED">RECONDITIONED</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase text-[10px] tracking-wider">SORT BY</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-2.5 text-white focus:border-[#D4AF37] focus:outline-none text-xs"
              >
                <option value="newest">NEWEST LISTINGS</option>
                <option value="featured">FEATURED FIRST</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="year-desc">MODEL YEAR: NEWEST</option>
              </select>
            </div>

          </div>
        )}

        {/* Results Bar & Active Filter Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1A1A1C] text-[10px] font-mono uppercase tracking-widest">
          <div className="text-slate-300">
            SHOWING <span className="text-[#D4AF37] font-black">{filteredCount}</span> OF <span className="text-white font-bold">{totalCount}</span> WHOLESALE UNITS
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET ALL FILTERS</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
