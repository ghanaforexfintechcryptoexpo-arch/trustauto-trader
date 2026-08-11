// Currency and string formatters for Trust Auto Trader

export function formatGhs(amount: number): string {
  if (!amount || isNaN(amount)) return 'GHS 0';
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    maximumFractionDigits: 0
  }).format(amount).replace('GHS', 'GHS ');
}

export function formatUsd(amount: number): string {
  if (!amount || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (!num || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

// Generate pre-filled WhatsApp link for a vehicle
export function getWhatsAppVehicleLink(vehicle: {
  stockId: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
}): string {
  const phone = '233533877588'; // 0533877588 in international format
  const text = `Hello Trust Auto Trader, I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.trim || ''}), Stock ID: ${vehicle.stockId}. Please send me the wholesale price, inspection report, and availability.`;
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
