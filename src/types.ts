export type VehicleType = 
  | 'SUV' 
  | 'SEDAN' 
  | 'PICKUP' 
  | 'HATCHBACK' 
  | 'VAN' 
  | 'TRUCK' 
  | 'LUXURY' 
  | 'COMMERCIAL';

export type VehicleCondition = 'NEW' | 'USED' | 'CERTIFIED RECONDITIONED';

export type FuelType = 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC';

export type TransmissionType = 'AUTOMATIC' | 'MANUAL';

export type LocationType = 'GHANA' | 'CHINA EXPORT';

export type VehicleStatus = 'AVAILABLE' | 'JUST ARRIVED' | 'RESERVED' | 'SOLD' | 'COMING SOON';

export interface VehicleInsight {
  bestSuitedFor: string;
  conditionSummary: string;
  availabilityTimeline: string;
  dealerSuitabilityIndex: 'HIGH' | 'EXCELLENT' | 'VERY HIGH' | 'PRIME DEMAND';
  resalePotential: string;
}

export interface Vehicle {
  id: string;
  stockId: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  type: VehicleType;
  priceGhs: number;
  priceUsd: number;
  priceOnRequest?: boolean;
  mileageKm: number;
  condition: VehicleCondition;
  fuel: FuelType;
  transmission: TransmissionType;
  drivetrain: 'AWD' | '4WD' | 'FWD' | 'RWD';
  color: string;
  engine: string;
  location: LocationType;
  status: VehicleStatus;
  featured?: boolean;
  images: string[];
  features: string[];
  insight: VehicleInsight;
  createdAt: string;
  updatedAt: string;
}

export interface SourcingRequest {
  id: string;
  refNumber: string;
  buyerType: 'INDIVIDUAL BUYER' | 'DEALER / WHOLESALE';
  customerName: string;
  companyName?: string;
  phone: string;
  email: string;
  make: string;
  model: string;
  minYear: number;
  maxYear: number;
  budgetGhs: number;
  quantity: number;
  condition: string;
  fuel: string;
  transmission: string;
  preferredLocation: string;
  destinationPort: string;
  additionalNotes: string;
  status: 'NEW' | 'CONTACTED' | 'SOURCING' | 'CLOSED';
  createdAt: string;
}

export interface DealerRequest {
  id: string;
  refNumber: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  businessLocation: string;
  fleetQuantityNeeded: number;
  vehicleMix: string;
  targetDeliveryDate: string;
  additionalNotes: string;
  status: 'NEW' | 'REVIEWING' | 'APPROVED' | 'CLOSED';
  createdAt: string;
}

export interface Enquiry {
  id: string;
  vehicleId?: string;
  vehicleStockId?: string;
  vehicleTitle?: string;
  customerName: string;
  phone: string;
  email: string;
  message: string;
  source: 'WHATSAPP' | 'DIRECT' | 'INSPECTION_BOOKING';
  status: 'NEW' | 'RESPONDED' | 'CLOSED';
  createdAt: string;
}

export interface VehicleFilterState {
  search: string;
  make: string;
  type: string;
  location: string; // 'ALL' | 'GHANA' | 'CHINA EXPORT'
  status: string;   // 'ALL' | 'AVAILABLE' | 'JUST ARRIVED' | 'RESERVED' | 'SOLD' | 'COMING SOON'
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  fuel: string;
  transmission: string;
  condition: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'newest';
}

export interface AdminStats {
  totalVehicles: number;
  ghanaStockCount: number;
  chinaExportCount: number;
  availableCount: number;
  justArrivedCount: number;
  reservedCount: number;
  soldCount: number;
  sourcingRequestsCount: number;
  dealerRequestsCount: number;
  enquiriesCount: number;
}
