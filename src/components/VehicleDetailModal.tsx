import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MapPin, 
  Globe2, 
  ShieldCheck, 
  Gauge, 
  Fuel, 
  Building2, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  Maximize2, 
  Sparkles, 
  TrendingUp, 
  Calendar,
  Layers,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  FileDown,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { Vehicle } from '../types';
import { formatGhs, formatUsd, getWhatsAppVehicleLink } from '../utils/formatters';
import { exportSingleVehiclePdf } from '../utils/pdfExport';
import { handleImageError } from '../utils/imageUtils';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  currency: 'GHS' | 'USD';
  onClose: () => void;
  onRequestWholesalePrice: (v: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  currency,
  onClose,
  onRequestWholesalePrice
}) => {
  if (!vehicle) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Smooth Zoom state
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [zoomScale, setZoomScale] = useState(2.2);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  // Filmstrip Slideshow state
  const [isPlaying, setIsPlaying] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const imagesList = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images 
    : ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'];

  const currentImage = imagesList[activeImageIdx] || imagesList[0];

  // Auto Slideshow Effect
  useEffect(() => {
    let timer: any;
    if (isPlaying && imagesList.length > 1) {
      timer = setInterval(() => {
        setActiveImageIdx(prev => (prev + 1) % imagesList.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, imagesList.length]);

  // Handle stage mouse move for smooth zoom panning
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  // Scroll filmstrip smoothly left/right
  const scrollFilmstrip = (direction: 'left' | 'right') => {
    if (filmstripRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const whatsappUrl = getWhatsAppVehicleLink(vehicle);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn font-sans">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-[#080809] border border-[#1A1A1C] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#1A1A1C] bg-[#050505] text-white sticky top-0 z-20 font-mono">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className={`text-[10px] font-bold px-2.5 py-1 border flex items-center gap-1.5 uppercase tracking-wider ${
              vehicle.location === 'GHANA'
                ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]'
                : 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]'
            }`}>
              {vehicle.location === 'GHANA' ? <MapPin className="w-3.5 h-3.5" /> : <Globe2 className="w-3.5 h-3.5" />}
              <span>{vehicle.location === 'GHANA' ? 'GHANA STOCK (TEMA)' : 'CHINA EXPORT BASE'}</span>
            </span>

            <span className="text-[10px] font-bold bg-[#080809] text-slate-300 px-2.5 py-1 border border-[#1A1A1C] uppercase tracking-wider">
              STOCK ID: {vehicle.stockId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportSingleVehiclePdf(vehicle)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-[10px] uppercase tracking-wider cursor-pointer"
              title="Export Vehicle Spec Sheet PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>EXPORT SPEC PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 bg-[#080809] hover:bg-[#1A1A1C] border border-[#1A1A1C] text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-[#F0F0F0]">
          
          {/* Main Title Banner & Pricing */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1A1A1C]">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider mb-1">
                <span>{vehicle.year}</span>
                <span>•</span>
                <span>{vehicle.make}</span>
                <span>•</span>
                <span className="text-slate-400">{vehicle.condition}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase text-white font-sans">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-slate-400 text-xs font-mono mt-0.5">
                {vehicle.trim}
              </p>
            </div>

            <div className="text-left md:text-right bg-[#050505] p-3.5 border border-[#1A1A1C] font-mono shrink-0">
              <div className="text-[9px] text-slate-400 uppercase tracking-widest">WHOLESALE PRICING</div>
              {vehicle.priceOnRequest ? (
                <div className="text-[#D4AF37] font-black text-lg uppercase">PRICE ON REQUEST</div>
              ) : (
                <div>
                  <div className="text-[#D4AF37] font-black text-2xl sm:text-3xl tracking-tight">
                    {currency === 'GHS' ? formatGhs(vehicle.priceGhs) : formatUsd(vehicle.priceUsd)}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {currency === 'GHS' ? `(~${formatUsd(vehicle.priceUsd)})` : `(~${formatGhs(vehicle.priceGhs)})`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* UPGRADED IMAGE GALLERY SHOWCASE WITH SMOOTH ZOOM & FILMSTRIP */}
          <div className="space-y-3 font-mono">
            
            {/* Gallery Control Toolbar Header */}
            <div className="flex items-center justify-between bg-[#050505] border border-[#1A1A1C] p-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>HIGH-FIDELITY MEDIA VIEW</span>
                </span>
                <span className="text-[9px] bg-[#080809] border border-[#1A1A1C] text-slate-400 px-2 py-0.5">
                  FRAME {String(activeImageIdx + 1).padStart(2, '0')} / {String(imagesList.length).padStart(2, '0')}
                </span>
              </div>

              {/* Interactive Zoom Toolbar Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsZoomMode(!isZoomMode)}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 border transition-colors cursor-pointer ${
                    isZoomMode 
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                      : 'bg-[#080809] text-slate-300 border-[#1A1A1C] hover:text-white'
                  }`}
                  title="Toggle Smooth Zoom Lens Mode"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isZoomMode ? 'LENS ACTIVE' : 'ENABLE ZOOM'}</span>
                </button>

                {isZoomMode && (
                  <>
                    <button
                      onClick={() => setZoomScale(prev => Math.min(prev + 0.5, 4.0))}
                      className="p-1 bg-[#080809] border border-[#1A1A1C] text-slate-300 hover:text-white"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomScale(prev => Math.max(prev - 0.5, 1.2))}
                      className="p-1 bg-[#080809] border border-[#1A1A1C] text-slate-300 hover:text-white"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setZoomScale(2.2);
                        setMousePos({ x: 50, y: 50 });
                      }}
                      className="p-1 bg-[#080809] border border-[#1A1A1C] text-slate-300 hover:text-white"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => setFullscreenImage(currentImage)}
                  className="p-1 bg-[#080809] border border-[#1A1A1C] text-slate-300 hover:text-white"
                  title="Fullscreen View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Interactive Stage Container */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringStage(true)}
              onMouseLeave={() => setIsHoveringStage(false)}
              onClick={() => setIsZoomMode(!isZoomMode)}
              className="relative h-72 sm:h-[420px] bg-[#050505] border border-[#1A1A1C] overflow-hidden group cursor-crosshair select-none"
            >
              <img
                src={currentImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                style={{
                  transform: isZoomMode 
                    ? `scale(${zoomScale})` 
                    : isHoveringStage ? 'scale(1.03)' : 'scale(1)',
                  transformOrigin: isZoomMode 
                    ? `${mousePos.x}% ${mousePos.y}%` 
                    : 'center center',
                  transition: isHoveringStage && isZoomMode
                    ? 'transform-origin 0.05s ease-out, transform 0.15s ease-out'
                    : 'transform 0.3s ease-out'
                }}
                className="w-full h-full object-cover"
              />

              {/* Status overlay badge on image stage */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
                <span className="bg-[#050505]/90 text-[10px] text-slate-300 px-3 py-1 border border-[#1A1A1C] tracking-wider uppercase font-mono">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>

                {isZoomMode && (
                  <span className="bg-[#D4AF37] text-black font-bold text-[10px] px-2.5 py-1 tracking-wider uppercase font-mono shadow">
                    ZOOM {Math.round(zoomScale * 100)}% (MOVE CURSOR TO PAN)
                  </span>
                )}
              </div>

              {!isZoomMode && (
                <div className="absolute top-3 right-3 bg-[#050505]/80 text-[10px] text-slate-400 px-2.5 py-1 border border-[#1A1A1C] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  CLICK TO ENABLE LENS ZOOM
                </div>
              )}
            </div>

            {/* FILMSTRIP NAVIGATION COMPONENT */}
            <div className="bg-[#050505] border border-[#1A1A1C] p-3 space-y-2">
              
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-[#1A1A1C] pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#D4AF37] uppercase tracking-wider">FILMSTRIP GALLERY NAVIGATION</span>
                  <span>•</span>
                  <span>{imagesList.length} HIGH RESOLUTION SHOTS</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1 px-2.5 py-0.5 bg-[#080809] border border-[#1A1A1C] text-slate-300 hover:text-[#D4AF37] uppercase font-bold text-[9px] cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isPlaying ? 'PAUSE ROTATION' : 'AUTOPLAY SLIDESHOW'}</span>
                  </button>
                </div>
              </div>

              {/* Filmstrip Thumbnails Track */}
              <div className="relative flex items-center gap-2">
                {imagesList.length > 4 && (
                  <button
                    onClick={() => scrollFilmstrip('left')}
                    className="p-1.5 bg-[#080809] border border-[#1A1A1C] text-slate-300 hover:text-white shrink-0 z-10 cursor-pointer"
                    title="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                <div 
                  ref={filmstripRef}
                  className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none w-full scroll-smooth"
                >
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-24 h-16 border transition-all shrink-0 cursor-pointer group/item overflow-hidden ${
                        activeImageIdx === idx 
                          ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' 
                          : 'border-[#1A1A1C] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" onError={handleImageError} className="w-full h-full object-cover" />
                      
                      {/* Filmstrip Frame Tag */}
                      <span className={`absolute bottom-0 left-0 right-0 text-[8px] font-mono text-center py-0.5 font-bold ${
                        activeImageIdx === idx ? 'bg-[#D4AF37] text-black' : 'bg-black/80 text-slate-300'
                      }`}>
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </button>
                  ))}
                </div>

                {imagesList.length > 4 && (
                  <button
                    onClick={() => scrollFilmstrip('right')}
                    className="p-1.5 bg-[#080809] border border-[#1A1A1C] text-slate-300 hover:text-white shrink-0 z-10 cursor-pointer"
                    title="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Visual Specs Display */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
              VEHICLE SPECIFICATIONS LOG
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">YEAR OF MANUFACTURE</div>
                <div className="text-white font-bold text-xs mt-0.5">{vehicle.year}</div>
              </div>

              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">ENGINE SPEC</div>
                <div className="text-white font-bold text-xs mt-0.5 truncate">{vehicle.engine}</div>
              </div>

              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">TRANSMISSION</div>
                <div className="text-white font-bold text-xs mt-0.5 uppercase">{vehicle.transmission}</div>
              </div>

              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">FUEL SYSTEM</div>
                <div className="text-white font-bold text-xs mt-0.5 uppercase">{vehicle.fuel}</div>
              </div>

              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">MILEAGE</div>
                <div className="text-white font-bold text-xs mt-0.5">
                  {vehicle.mileageKm === 0 ? '0 KM (NEW)' : `${vehicle.mileageKm.toLocaleString()} KM`}
                </div>
              </div>

              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">DRIVETRAIN</div>
                <div className="text-white font-bold text-xs mt-0.5">{vehicle.drivetrain}</div>
              </div>

              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">EXTERIOR COLOR</div>
                <div className="text-white font-bold text-xs mt-0.5">{vehicle.color}</div>
              </div>

              <div className="p-3 bg-[#050505] border border-[#1A1A1C]">
                <div className="text-slate-500 text-[9px] uppercase tracking-wider">CONDITION STATUS</div>
                <div className="text-[#00FF41] font-bold text-xs mt-0.5 uppercase">{vehicle.condition}</div>
              </div>
            </div>
          </div>

          {/* TRUST AUTO INSIGHT SECTION */}
          <div className="p-5 bg-[#050505] border border-[#D4AF37] space-y-4 font-mono">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-widest">
                TRUST AUTO INSIGHT REPORT
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase block tracking-wider">BEST SUITED FOR</span>
                <p className="text-slate-200 text-xs">{vehicle.insight?.bestSuitedFor}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase block tracking-wider">VEHICLE CONDITION SUMMARY</span>
                <p className="text-slate-200 text-xs">{vehicle.insight?.conditionSummary}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase block tracking-wider">AVAILABILITY TIMELINE</span>
                <p className="text-[#00FF41] font-mono text-xs font-bold">{vehicle.insight?.availabilityTimeline}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase block tracking-wider">DEALER SUITABILITY INDEX</span>
                <p className="text-[#D4AF37] font-bold font-mono text-xs uppercase">{vehicle.insight?.dealerSuitabilityIndex || 'HIGH'} SUITABILITY</p>
              </div>
            </div>
          </div>

          {/* Key Installed Features */}
          {vehicle.features && vehicle.features.length > 0 && (
            <div>
              <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                KEY FACTORY & AFTERMARKET EQUIPMENT
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {vehicle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-[#050505] border border-[#1A1A1C] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="text-[11px]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="pt-4 border-t border-[#1A1A1C] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 font-mono">
            <button
              onClick={() => exportSingleVehiclePdf(vehicle)}
              className="flex items-center justify-center gap-2 bg-[#050505] border border-[#D4AF37] text-[#D4AF37] font-bold text-xs px-6 py-3.5 uppercase tracking-wider hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>EXPORT SPEC SHEET (PDF)</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#00FF41] text-black font-bold text-xs px-6 py-3.5 uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>CHAT ON WHATSAPP (0533877588)</span>
            </a>

            <button
              onClick={() => onRequestWholesalePrice(vehicle)}
              className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-black text-xs px-6 py-3.5 uppercase tracking-widest transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>REQUEST WHOLESALE PRICE</span>
            </button>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div 
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer font-mono"
        >
          <div className="relative max-w-full max-h-full">
            <img src={fullscreenImage} alt="" referrerPolicy="no-referrer" onError={handleImageError} className="max-w-full max-h-[90vh] object-contain border border-[#1A1A1C]" />
            <div className="absolute top-2 left-2 bg-black/80 text-[10px] text-[#D4AF37] px-3 py-1 border border-[#1A1A1C]">
              {vehicle.year} {vehicle.make} {vehicle.model} - FULLSCREEN SPEC PREVIEW
            </div>
          </div>
          <button className="absolute top-4 right-4 p-2 bg-[#080809] border border-[#1A1A1C] text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
};
