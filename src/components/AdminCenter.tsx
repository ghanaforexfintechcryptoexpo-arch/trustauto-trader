import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Plus, 
  Trash2, 
  Edit, 
  RefreshCw, 
  Check, 
  X, 
  Search, 
  Building2, 
  Globe2, 
  Boxes, 
  Users, 
  FileText, 
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  LogOut,
  Image as ImageIcon,
  FileDown
} from 'lucide-react';
import { Vehicle, SourcingRequest, DealerRequest, Enquiry, AdminStats } from '../types';
import { formatGhs, formatUsd } from '../utils/formatters';
import { exportInventoryPdf, exportSingleVehiclePdf } from '../utils/pdfExport';

interface AdminCenterProps {
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminCenter: React.FC<AdminCenterProps> = ({ onClose, onDataChanged }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'VEHICLES' | 'SOURCING' | 'DEALERS' | 'ENQUIRIES'>('ANALYTICS');

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [sourcingList, setSourcingList] = useState<SourcingRequest[]>([]);
  const [dealerList, setDealerList] = useState<DealerRequest[]>([]);
  const [enquiryList, setEnquiryList] = useState<Enquiry[]>([]);

  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle> | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // Check auth session
  useEffect(() => {
    const savedToken = localStorage.getItem('tat_admin_token');
    if (savedToken === 'tat_admin_auth_token_98314') {
      setIsAuthenticated(true);
      fetchAllAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('tat_admin_token', data.token);
        setIsAuthenticated(true);
        fetchAllAdminData();
      } else {
        setAuthError('Invalid administrator credentials.');
      }
    } catch (err) {
      setAuthError('Failed authenticating with admin server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tat_admin_token');
    setIsAuthenticated(false);
  };

  const fetchAllAdminData = async () => {
    try {
      const [resStats, resVeh, resSrc, resDlr, resEnq] = await Promise.all([
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/vehicles').then(r => r.json()),
        fetch('/api/sourcing').then(r => r.json()),
        fetch('/api/dealer-requests').then(r => r.json()),
        fetch('/api/enquiries').then(r => r.json())
      ]);

      if (resStats.success) setStats(resStats.data);
      if (resVeh.success) setVehicles(resVeh.data);
      if (resSrc.success) setSourcingList(resSrc.data);
      if (resDlr.success) setDealerList(resDlr.data);
      if (resEnq.success) setEnquiryList(resEnq.data);
    } catch (err) {
      console.error('Failed fetching admin data', err);
    }
  };

  // Save/Update Vehicle
  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    setLoadingAction(true);
    try {
      const isEdit = !!editingVehicle.id;
      const url = isEdit ? `/api/vehicles/${editingVehicle.id}` : '/api/vehicles';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVehicle)
      });

      const data = await res.json();
      if (data.success) {
        setEditingVehicle(null);
        setIsCreatingNew(false);
        fetchAllAdminData();
        onDataChanged();
      }
    } catch (err) {
      console.error('Failed saving vehicle', err);
    } finally {
      setLoadingAction(false);
    }
  };

  // Delete Vehicle
  const handleDeleteVehicle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle listing?')) return;
    try {
      await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      fetchAllAdminData();
      onDataChanged();
    } catch (err) {
      console.error('Failed deleting vehicle', err);
    }
  };

  // Seed DB
  const handleSeedDatabase = async () => {
    if (!window.confirm('Reset database to initial verified vehicle inventory?')) return;
    try {
      await fetch('/api/seed', { method: 'POST' });
      fetchAllAdminData();
      onDataChanged();
    } catch (err) {
      console.error(err);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#080809] border border-[#1A1A1C] p-6 sm:p-8 space-y-6 shadow-2xl text-[#F0F0F0]">
          <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-4">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono font-bold text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>ADMIN COMMAND CENTER</span>
            </div>
            <button onClick={onClose} className="p-1 bg-[#050505] border border-[#1A1A1C] text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black uppercase text-white font-sans">TRUST AUTO TRADER ADMIN</h2>
            <p className="text-xs font-mono text-slate-400">Enter access passcode to manage inventory & leads.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 font-bold mb-1 uppercase text-[10px] tracking-wider">ADMIN PASSCODE</label>
              <input
                type="password"
                required
                placeholder="Enter passcode (e.g. trustauto2024)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-[#1A1A1C] p-3 text-white focus:border-[#D4AF37] focus:outline-none font-sans text-xs"
              />
            </div>

            {authError && (
              <p className="text-rose-400 font-bold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs py-3.5 uppercase tracking-widest cursor-pointer transition-colors"
            >
              AUTHENTICATE COMMAND CENTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050505] text-[#F0F0F0] flex flex-col font-sans">
      
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-[#080809] border-b border-[#1A1A1C] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-2 py-1 bg-[#D4AF37] text-black font-black text-xs font-mono">
            TAT-ADMIN
          </div>
          <div>
            <h1 className="font-black text-base uppercase text-white tracking-tight">ADMIN COMMAND CENTER</h1>
            <p className="text-[10px] font-mono text-slate-400">TEMA, GHANA & CHINA EXPORT BASE</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <button
            onClick={() => exportInventoryPdf(vehicles)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#c29f2e] text-black text-xs font-black uppercase transition-all cursor-pointer shadow"
            title="Export full wholesale catalog PDF with vehicle spec sheets"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPORT INVENTORY PDF</span>
          </button>

          <button
            onClick={handleSeedDatabase}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#050505] border border-[#1A1A1C] text-[#D4AF37] text-xs font-bold uppercase transition-all cursor-pointer"
            title="Reset to default initial inventory"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET INVENTORY</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>

          <button onClick={onClose} className="p-1.5 bg-[#050505] border border-[#1A1A1C] text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Admin Nav Tabs */}
      <div className="bg-[#080809] border-b border-[#1A1A1C] px-4 py-2 overflow-x-auto flex items-center gap-2 text-xs font-mono">
        {[
          { id: 'ANALYTICS', label: `OVERVIEW (${stats?.totalVehicles || 0})` },
          { id: 'VEHICLES', label: `VEHICLES (${vehicles.length})` },
          { id: 'SOURCING', label: `SOURCING LEADS (${sourcingList.length})` },
          { id: 'DEALERS', label: `DEALER LEADS (${dealerList.length})` },
          { id: 'ENQUIRIES', label: `WHATSAPP LEADS (${enquiryList.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#D4AF37] text-black font-black'
                : 'bg-[#050505] text-slate-400 hover:text-white border border-[#1A1A1C]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body Content */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-[#080809] border border-[#1A1A1C] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">TOTAL INVENTORY</span>
                <div className="text-3xl font-black text-[#D4AF37]">{stats?.totalVehicles || 0} UNITS</div>
                <div className="text-[11px] text-slate-500">Cataloged in database</div>
              </div>

              <div className="p-5 bg-[#080809] border border-[#1A1A1C] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">GHANA STOCK (TEMA)</span>
                <div className="text-3xl font-black text-[#00FF41]">{stats?.ghanaStockCount || 0} UNITS</div>
                <div className="text-[11px] text-slate-500">Ready at Tema Golf City Yard</div>
              </div>

              <div className="p-5 bg-[#080809] border border-[#1A1A1C] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">CHINA EXPORT BASE</span>
                <div className="text-3xl font-black text-[#D4AF37]">{stats?.chinaExportCount || 0} UNITS</div>
                <div className="text-[11px] text-slate-500">5,000 m² China Yard</div>
              </div>

              <div className="p-5 bg-[#080809] border border-[#1A1A1C] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">TOTAL LEADS & REQUESTS</span>
                <div className="text-3xl font-black text-cyan-400">
                  {(stats?.sourcingRequestsCount || 0) + (stats?.dealerRequestsCount || 0) + (stats?.enquiriesCount || 0)}
                </div>
                <div className="text-[11px] text-slate-500">Inbound wholesale queries</div>
              </div>
            </div>

            <div className="p-6 bg-[#080809] border border-[#1A1A1C] space-y-4">
              <h3 className="font-black text-xs uppercase text-[#D4AF37] tracking-wider">INVENTORY STATUS BREAKDOWN</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                  <span className="text-slate-500 text-[10px] uppercase block">AVAILABLE</span>
                  <span className="text-[#00FF41] font-bold text-lg">{stats?.availableCount || 0}</span>
                </div>
                <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                  <span className="text-slate-500 text-[10px] uppercase block">JUST ARRIVED</span>
                  <span className="text-cyan-400 font-bold text-lg">{stats?.justArrivedCount || 0}</span>
                </div>
                <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                  <span className="text-slate-500 text-[10px] uppercase block">RESERVED</span>
                  <span className="text-[#D4AF37] font-bold text-lg">{stats?.reservedCount || 0}</span>
                </div>
                <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                  <span className="text-slate-500 text-[10px] uppercase block">SOLD</span>
                  <span className="text-rose-400 font-bold text-lg">{stats?.soldCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VEHICLE MANAGEMENT */}
        {activeTab === 'VEHICLES' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black uppercase text-white font-mono tracking-wider">
                VEHICLE CATALOG MANAGEMENT
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportInventoryPdf(vehicles)}
                  className="flex items-center gap-1.5 bg-[#050505] hover:bg-[#1A1A1C] border border-[#D4AF37] text-[#D4AF37] font-extrabold text-[10px] px-3.5 py-2.5 uppercase tracking-wider cursor-pointer transition-colors"
                  title="Export Wholesale Catalog PDF"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="hidden sm:inline">EXPORT CATALOG PDF</span>
                </button>

                <button
                  onClick={() => {
                    setEditingVehicle({
                      stockId: `TA-2024-${Math.floor(100 + Math.random() * 900)}`,
                      make: 'Toyota',
                      model: '',
                      year: 2024,
                      trim: '',
                      type: 'SUV',
                      priceGhs: 350000,
                      priceUsd: 26000,
                      mileageKm: 0,
                      condition: 'NEW',
                      fuel: 'PETROL',
                      transmission: 'AUTOMATIC',
                      drivetrain: 'AWD',
                      color: 'White',
                      engine: '2.5L 4-Cyl',
                      location: 'GHANA',
                      status: 'AVAILABLE',
                      images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'],
                      features: ['Air Conditioning', 'Power Windows', 'ABS']
                    });
                    setIsCreatingNew(true);
                  }}
                  className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-extrabold text-[10px] px-4 py-2.5 uppercase tracking-widest cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW VEHICLE</span>
                </button>
              </div>
            </div>

            {/* Vehicle Editor Modal Form */}
            {(editingVehicle || isCreatingNew) && (
              <div className="p-6 bg-[#080809] border border-[#D4AF37] space-y-4 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-3">
                  <h3 className="font-black text-[#D4AF37] uppercase text-xs tracking-wider">
                    {editingVehicle?.id ? `EDIT VEHICLE (${editingVehicle.stockId})` : 'CREATE NEW VEHICLE ENTRY'}
                  </h3>
                  <button onClick={() => setEditingVehicle(null)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveVehicle} className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">STOCK ID</label>
                    <input
                      type="text"
                      required
                      value={editingVehicle?.stockId || ''}
                      onChange={e => setEditingVehicle({ ...editingVehicle, stockId: e.target.value })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">MAKE</label>
                    <input
                      type="text"
                      required
                      value={editingVehicle?.make || ''}
                      onChange={e => setEditingVehicle({ ...editingVehicle, make: e.target.value })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">MODEL</label>
                    <input
                      type="text"
                      required
                      value={editingVehicle?.model || ''}
                      onChange={e => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">YEAR</label>
                    <input
                      type="number"
                      value={editingVehicle?.year || 2024}
                      onChange={e => setEditingVehicle({ ...editingVehicle, year: parseInt(e.target.value) })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">TRIM / SPEC</label>
                    <input
                      type="text"
                      value={editingVehicle?.trim || ''}
                      onChange={e => setEditingVehicle({ ...editingVehicle, trim: e.target.value })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">VEHICLE TYPE</label>
                    <select
                      value={editingVehicle?.type || 'SUV'}
                      onChange={e => setEditingVehicle({ ...editingVehicle, type: e.target.value as any })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    >
                      <option value="SUV">SUV</option>
                      <option value="PICKUP">PICKUP</option>
                      <option value="SEDAN">SEDAN</option>
                      <option value="VAN">VAN</option>
                      <option value="TRUCK">TRUCK</option>
                      <option value="LUXURY">LUXURY</option>
                      <option value="HATCHBACK">HATCHBACK</option>
                      <option value="COMMERCIAL">COMMERCIAL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">PRICE (GHS)</label>
                    <input
                      type="number"
                      value={editingVehicle?.priceGhs || 0}
                      onChange={e => setEditingVehicle({ 
                        ...editingVehicle, 
                        priceGhs: parseInt(e.target.value) || 0,
                        priceUsd: Math.round((parseInt(e.target.value) || 0) / 13.5)
                      })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">LOCATION</label>
                    <select
                      value={editingVehicle?.location || 'GHANA'}
                      onChange={e => setEditingVehicle({ ...editingVehicle, location: e.target.value as any })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    >
                      <option value="GHANA">GHANA STOCK (TEMA)</option>
                      <option value="CHINA EXPORT">CHINA EXPORT BASE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">AVAILABILITY STATUS</label>
                    <select
                      value={editingVehicle?.status || 'AVAILABLE'}
                      onChange={e => setEditingVehicle({ ...editingVehicle, status: e.target.value as any })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="JUST ARRIVED">JUST ARRIVED</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="SOLD">SOLD</option>
                      <option value="COMING SOON">COMING SOON</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 md:col-span-3">
                    <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">IMAGE URL (PRIMARY)</label>
                    <input
                      type="text"
                      value={editingVehicle?.images?.[0] || ''}
                      onChange={e => setEditingVehicle({ ...editingVehicle, images: [e.target.value] })}
                      className="w-full bg-[#050505] border border-[#1A1A1C] p-2 text-white text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingVehicle(null)}
                      className="px-4 py-2 bg-[#050505] border border-[#1A1A1C] text-slate-300 font-bold uppercase text-[10px]"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={loadingAction}
                      className="px-6 py-2 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black uppercase text-[10px] tracking-wider"
                    >
                      SAVE VEHICLE
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Vehicle List Table */}
            <div className="bg-[#080809] border border-[#1A1A1C] overflow-hidden font-mono text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#050505] text-slate-400 border-b border-[#1A1A1C] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">STOCK ID</th>
                      <th className="p-3">VEHICLE</th>
                      <th className="p-3">PRICE (GHS)</th>
                      <th className="p-3">LOCATION</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1C]">
                    {vehicles.map(v => (
                      <tr key={v.id} className="hover:bg-[#050505]">
                        <td className="p-3 font-bold text-[#D4AF37]">{v.stockId}</td>
                        <td className="p-3">
                          <div className="font-bold text-white font-sans">{v.year} {v.make} {v.model}</div>
                          <div className="text-[10px] text-slate-400">{v.trim}</div>
                        </td>
                        <td className="p-3 font-bold">{formatGhs(v.priceGhs)}</td>
                        <td className="p-3 text-[10px]">{v.location}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 text-[10px] font-bold ${
                            v.status === 'AVAILABLE' ? 'bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41]' :
                            v.status === 'SOLD' ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400' : 'bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          <button
                            onClick={() => exportSingleVehiclePdf(v)}
                            className="p-1.5 bg-[#050505] border border-[#1A1A1C] text-[#D4AF37] hover:border-[#D4AF37]"
                            title="Export Vehicle Spec Sheet PDF"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingVehicle(v)}
                            className="p-1.5 bg-[#050505] border border-[#1A1A1C] text-[#D4AF37] hover:border-[#D4AF37]"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(v.id)}
                            className="p-1.5 bg-[#050505] border border-[#1A1A1C] text-rose-400 hover:border-rose-500"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SOURCING REQUESTS */}
        {activeTab === 'SOURCING' && (
          <div className="space-y-4 font-mono text-xs">
            <h2 className="text-base font-black uppercase text-white tracking-wider">CUSTOMER SOURCING LEADS ({sourcingList.length})</h2>
            <div className="bg-[#080809] border border-[#1A1A1C] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#050505] text-slate-400 border-b border-[#1A1A1C] text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3">REF</th>
                      <th className="p-3">CUSTOMER</th>
                      <th className="p-3">VEHICLE REQUESTED</th>
                      <th className="p-3">BUDGET</th>
                      <th className="p-3">UNITS</th>
                      <th className="p-3">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1C]">
                    {sourcingList.map(s => (
                      <tr key={s.id} className="hover:bg-[#050505]">
                        <td className="p-3 font-bold text-[#D4AF37]">{s.refNumber}</td>
                        <td className="p-3">
                          <div className="font-bold text-white font-sans">{s.customerName}</div>
                          <div className="text-[10px] text-slate-400">{s.phone} • {s.email}</div>
                        </td>
                        <td className="p-3 font-bold">{s.make} {s.model} ({s.minYear}-{s.maxYear})</td>
                        <td className="p-3">{formatGhs(s.budgetGhs)}</td>
                        <td className="p-3 font-bold">{s.quantity}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] font-bold text-[10px]">
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEALER REQUESTS */}
        {activeTab === 'DEALERS' && (
          <div className="space-y-4 font-mono text-xs">
            <h2 className="text-base font-black uppercase text-white tracking-wider">DEALER WHOLESALE INQUIRIES ({dealerList.length})</h2>
            <div className="bg-[#080809] border border-[#1A1A1C] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#050505] text-slate-400 border-b border-[#1A1A1C] text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3">REF</th>
                      <th className="p-3">COMPANY</th>
                      <th className="p-3">FLEET QUANTITY</th>
                      <th className="p-3">VEHICLE MIX</th>
                      <th className="p-3">LOCATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1C]">
                    {dealerList.map(d => (
                      <tr key={d.id} className="hover:bg-[#050505]">
                        <td className="p-3 font-bold text-[#D4AF37]">{d.refNumber}</td>
                        <td className="p-3">
                          <div className="font-bold text-white font-sans">{d.companyName}</div>
                          <div className="text-[10px] text-slate-400">{d.contactPerson} • {d.phone}</div>
                        </td>
                        <td className="p-3 font-bold text-[#00FF41]">{d.fleetQuantityNeeded} UNITS</td>
                        <td className="p-3">{d.vehicleMix}</td>
                        <td className="p-3">{d.businessLocation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WHATSAPP & ENQUIRIES */}
        {activeTab === 'ENQUIRIES' && (
          <div className="space-y-4 font-mono text-xs">
            <h2 className="text-base font-black uppercase text-white tracking-wider">WHATSAPP & DIRECT ENQUIRIES ({enquiryList.length})</h2>
            <div className="bg-[#080809] border border-[#1A1A1C] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#050505] text-slate-400 border-b border-[#1A1A1C] text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3">CUSTOMER</th>
                      <th className="p-3">VEHICLE INQUIRY</th>
                      <th className="p-3">MESSAGE</th>
                      <th className="p-3">SOURCE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1C]">
                    {enquiryList.map(e => (
                      <tr key={e.id} className="hover:bg-[#050505]">
                        <td className="p-3 font-bold text-white">
                          <span className="font-sans">{e.customerName}</span>
                          <div className="text-[10px] text-slate-400">{e.phone}</div>
                        </td>
                        <td className="p-3 font-bold text-[#D4AF37]">{e.vehicleStockId || 'General Inquiry'}</td>
                        <td className="p-3 max-w-xs truncate">{e.message}</td>
                        <td className="p-3 text-[#00FF41] font-bold">{e.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
