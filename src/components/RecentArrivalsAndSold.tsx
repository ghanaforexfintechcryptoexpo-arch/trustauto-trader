import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Tag, 
  MapPin, 
  Globe2 
} from 'lucide-react';
import { Vehicle } from '../types';
import { VehicleCard } from './VehicleCard';

interface RecentArrivalsAndSoldProps {
  vehicles: Vehicle[];
  currency: 'GHS' | 'USD';
  onSelectVehicle: (v: Vehicle) => void;
  onRequestPrice: (v: Vehicle) => void;
}

export const RecentArrivalsAndSold: React.FC<RecentArrivalsAndSoldProps> = ({
  vehicles,
  currency,
  onSelectVehicle,
  onRequestPrice
}) => {
  const [activeTab, setActiveTab] = useState<'ARRIVALS' | 'SOLD'>('ARRIVALS');

  const justArrived = vehicles.filter(v => v.status === 'JUST ARRIVED' || v.status === 'AVAILABLE').slice(0, 4);
  const recentlySold = vehicles.filter(v => v.status === 'SOLD' || v.status === 'RESERVED').slice(0, 4);

  const displayList = activeTab === 'ARRIVALS' ? justArrived : recentlySold;

  return (
    <section className="py-16 bg-[#080809] text-[#F0F0F0] border-y border-[#1A1A1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Tab Toggle Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#1A1A1C]">
          <div className="flex items-center gap-2 p-1 bg-[#050505] border border-[#1A1A1C]">
            <button
              onClick={() => setActiveTab('ARRIVALS')}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                activeTab === 'ARRIVALS'
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>JUST ARRIVED ({justArrived.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('SOLD')}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                activeTab === 'SOLD'
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RECENTLY SOLD & RESERVED ({recentlySold.length})</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            {activeTab === 'ARRIVALS' ? 'Fresh inventory cataloged at Tema & China Export Base.' : 'Demonstrated liquidity & high inventory velocity.'}
          </div>
        </div>

        {/* Vehicles Grid */}
        {displayList.length === 0 ? (
          <div className="text-center py-12 bg-[#050505] border border-[#1A1A1C] text-slate-400 text-xs font-mono">
            NO VEHICLES CURRENTLY IN THIS CATEGORY.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayList.map(veh => (
              <VehicleCard
                key={veh.id}
                vehicle={veh}
                currency={currency}
                onSelect={onSelectVehicle}
                onRequestPrice={onRequestPrice}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
