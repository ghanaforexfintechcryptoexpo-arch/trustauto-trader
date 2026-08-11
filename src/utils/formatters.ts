// Currency and string formatters for Trust Auto Trader

export function formatGhs(amount?: number | null): string {
  if (!amount || isNaN(amount)) return 'GHS 0';
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    maximumFractionDigits: 0
  }).format(amount).replace('GHS', 'GHS ');
}

export function formatUsd(amount?: number | null): string {
  if (!amount || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num?: number | null): string {
  if (!num || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function normalizeStatus(status?: string): 'draft' | 'showcase' | 'available' | 'reserved' | 'sold' | 'coming_soon' {
  if (!status) return 'showcase';
  const s = status.toString().toLowerCase().trim().replace(/[\s_-]+/g, '');
  if (s === 'draft') return 'draft';
  if (s === 'showcase') return 'showcase';
  if (s === 'available') return 'available';
  if (s === 'reserved') return 'reserved';
  if (s === 'sold') return 'sold';
  if (s === 'comingsoon') return 'coming_soon';
  if (s === 'justarrived') return 'available';
  return 'showcase';
}

export function getStatusBadgeInfo(status?: string) {
  const norm = normalizeStatus(status);
  switch (norm) {
    case 'available':
      return {
        label: 'AVAILABLE',
        bg: 'bg-[#00FF41]/10',
        text: 'text-[#00FF41]',
        border: 'border-[#00FF41]/40',
        isAvailable: true
      };
    case 'showcase':
      return {
        label: 'SHOWCASE VEHICLE',
        bg: 'bg-[#D4AF37]/10',
        text: 'text-[#D4AF37]',
        border: 'border-[#D4AF37]/40',
        isAvailable: false
      };
    case 'reserved':
      return {
        label: 'RESERVED',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
        isAvailable: false
      };
    case 'sold':
      return {
        label: 'SOLD',
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/40',
        isAvailable: false
      };
    case 'coming_soon':
      return {
        label: 'COMING SOON',
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/40',
        isAvailable: false
      };
    case 'draft':
      return {
        label: 'DRAFT (PRIVATE)',
        bg: 'bg-gray-800',
        text: 'text-gray-400',
        border: 'border-gray-700',
        isAvailable: false
      };
  }
}

export function getVehicleSlug(vehicle: { make: string; model: string; year?: number; stockId: string; slug?: string }): string {
  if (vehicle.slug) return vehicle.slug;
  const name = `${vehicle.make}-${vehicle.model}-${vehicle.year || ''}-${vehicle.stockId}`;
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Generate pre-filled WhatsApp link for a vehicle
export function getWhatsAppVehicleLink(vehicle: {
  stockId: string;
  year?: number;
  make: string;
  model: string;
  trim?: string;
}): string {
  const phone = '233533877588'; // 0533877588 in international format
  const vehicleName = `${vehicle.year ? vehicle.year + ' ' : ''}${vehicle.make} ${vehicle.model}`.trim();
  const text = `Hello Trust Auto Trader, I am interested in ${vehicleName}, Stock ID ${vehicle.stockId}. Please provide more information.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// Generate general WhatsApp link for sourcing or dealer request
export function getWhatsAppSourcingLink(refNumber?: string, details?: string): string {
  const phone = '233533877588';
  const text = refNumber
    ? `Hello Trust Auto Trader, I just submitted Sourcing Request ${refNumber}. ${details || ''} Please confirm availability.`
    : `Hello Trust Auto Trader, I would like to inquire about wholesale vehicle sourcing and availability in Ghana and China.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

