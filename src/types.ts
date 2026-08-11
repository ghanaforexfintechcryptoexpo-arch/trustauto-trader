export type VehicleType = 
  | 'SUV' 
  | 'SEDAN' 
  | 'PICKUP' 
  | 'HATCHBACK' 
  | 'VAN' 
  | 'TRUCK' 
  | 'LUXURY' 
  | 'COMMERCIAL'
  | string;

export type VehicleCondition = 'NEW' | 'USED' | 'CERTIFIED RECONDITIONED' | string;

export type FuelType = 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC' | string;

export type TransmissionType = 'AUTOMATIC' | 'MANUAL' | string;

export type LocationType = 'GHANA' | 'CHINA EXPORT' | string;

export type VehicleStatus = 
  | 'draft' 
  | 'showcase' 
  | 'available' 
  | 'reserved' 
  | 'sold' 
  | 'coming_soon'
  | 'DRAFT'
  | 'SHOWCASE'
  | 'AVAILABLE'
  | 'RESERVED'
  | 'SOLD'
  | 'COMING_SOON'
  | 'JUST ARRIVED'
  | 'COMING SOON'
  | (string & {});

export interface VehicleImage {
  id: string;
  vehicleId?: string;
  imageUrl: string;
  sortOrder: number;
  altText?: string;
  createdAt?: string;
}

export interface VehicleInsight {
  bestSuitedFor?: string;
  conditionSummary?: string;
  availabilityTimeline?: string;
  dealerSuitabilityIndex?: string;
  resalePotential?: string;
}

export interface Vehicle {
  id: string;
  stockId: string;
  make: string;
  model: string;
  year: number;
  slug?: string;
  trim?: string;
  type?: VehicleType;
  bodyType?: string;
  priceGhs?: number | null;
  priceUsd?: number | null;
  price?: number | null;
  currency?: string;
  priceOnRequest?: boolean;
  mileageKm?: number;
  mileage?: number;
  condition?: VehicleCondition;
  fuel?: FuelType;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  drivetrain?: 'AWD' | '4WD' | 'FWD' | 'RWD' | string;
  color?: string;
  engine?: string;
  location?: LocationType;
  description?: string;
  status: VehicleStatus;
  featured?: boolean;
  images: (string | VehicleImage)[];
  vehicleImages?: VehicleImage[];
  features?: string[];
  insight?: VehicleInsight;
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
  location: string;
  status: string;
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
  availableCount: number;
  showcaseCount: number;
  reservedCount: number;
  soldCount: number;
  comingSoonCount: number;
  draftCount?: number;
  ghanaStockCount?: number;
  chinaExportCount?: number;
  sourcingRequestsCount?: number;
  dealerRequestsCount?: number;
  enquiriesCount?: number;
}
