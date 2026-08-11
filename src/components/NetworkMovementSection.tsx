import React from 'react';
import { 
  Activity, 
  MapPin, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Truck,
  Boxes
} from 'lucide-react';
import { Vehicle } from '../types';

interface NetworkMovementProps {
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
}

export const NetworkMovementSection: React.FC<NetworkMovementProps> = ({
  vehicles,
  onSelectVehicle
}) => {
  // Sort or group vehicles by recent activity status
  const recentMovements = vehicles.slice(0, 6);

  return (
    <section id="network" className="py-16 bg-[#080809] text-[#F0F0F0] border-b border-[#1A1A1C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#00FF41] text-[#00FF41] text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 bg-[#00FF41] animate-ping"></span>
              <span>LIVE LOGISTICS MONITOR</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              THE NETWORK IS <span className="text-[#D4AF37]">MOVING.</span>
            </h2>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Active status tracker across Tema Port, Tema Golf City distribution yard, and China Export Base.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="px-3 py-1.5 bg-[#050505] border border-[#1A1A1C] text-[#00FF41] font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-[#00FF41]"></span>
              STOCK MOVING DAILY
            </span>
          </div>
        </div>

        {/* Live Network Activity Feed Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono">
          {recentMovements.map((veh, idx) => (
            <div
              key={veh.id || idx}
              onClick={() => onSelectVehicle(veh)}
              className="p-4 bg-[#050505] border border-[#1A1A1C] hover:border-[#D4AF37] transition-colors cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-bold px-2 py-0.5 border flex items-center gap-1.5 tracking-wider ${
                  veh.status === 'AVAILABLE' ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]' :
                  veh.status === 'JUST ARRIVED' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500' :
                  veh.status === 'RESERVED' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]' :
                  veh.status === 'SOLD' ? 'bg-rose-500/10 text-rose-400 border-rose-500' :
                  'bg-indigo-500/10 text-indigo-400 border-indigo-500'
                }`}>
                  <span className="w-1 h-1 bg-current" />
                  {veh.status}
                </span>

                <span className="text-[10px] text-slate-500 font-mono">
                  {veh.stockId}
                </span>
              </div>

              <div>
                <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{veh.year} • {veh.make}</div>
                <h3 className="font-sans font-bold text-white text-sm uppercase group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                  {veh.model} {veh.trim}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1C] text-[10px]">
                <span className="text-slate-400 flex items-center gap-1 uppercase">
                  {veh.location === 'GHANA' ? <MapPin className="w-3 h-3 text-[#00FF41]" /> : <Globe2 className="w-3 h-3 text-[#D4AF37]" />}
                  <span>{veh.location === 'GHANA' ? 'Tema Yard' : 'China Base'}</span>
                </span>

                <span className="text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 tracking-wider">
                  <span>INSPECT</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
