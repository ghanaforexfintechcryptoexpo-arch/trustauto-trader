import { Vehicle } from '../types';

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-001',
    stockId: 'TA-2024-001',
    make: 'Toyota',
    model: 'RAV4',
    year: 2023,
    trim: '2.5L XLE AWD Luxury',
    type: 'SUV',
    priceGhs: 420000,
    priceUsd: 31000,
    mileageKm: 14200,
    condition: 'USED',
    fuel: 'PETROL',
    transmission: 'AUTOMATIC',
    drivetrain: 'AWD',
    color: 'Midnight Obsidian Black',
    engine: '2.5L 4-Cyl Dual VVT-i (203 HP)',
    location: 'GHANA',
    status: 'AVAILABLE',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'AWD Dynamic Torque Vectoring',
      '360 Panoramic View Camera',
      'Adaptive Radar Cruise Control',
      'Power Tailgate',
      'Apple CarPlay & Android Auto',
      'Dual-Zone Climate Control',
      'Blind Spot Monitor'
    ],
    insight: {
      bestSuitedFor: 'Ghanaian road conditions, long-distance highway cruises, and executive urban commuting.',
      conditionSummary: 'Full inspection verified at Tema Facility. Zero frame damage, immaculate interior.',
      availabilityTimeline: 'Immediate pickup at Tema Yard or direct flatbed delivery nationwide.',
      dealerSuitabilityIndex: 'HIGH',
      resalePotential: 'Top-tier liquidity in West Africa. Rapid resale turnaround.'
    },
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'veh-002',
    stockId: 'TA-2024-002',
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2024,
    trim: '2.8L D-4D Turbo Diesel TX-L 7-Seater',
    type: 'SUV',
    priceGhs: 1150000,
    priceUsd: 85000,
    mileageKm: 0,
    condition: 'NEW',
    fuel: 'DIESEL',
    transmission: 'AUTOMATIC',
    drivetrain: '4WD',
    color: 'Titanium White Pearl',
    engine: '2.8L Turbocharger Diesel (201 HP, 500 Nm)',
    location: 'CHINA EXPORT',
    status: 'AVAILABLE',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Full 4WD Crawl Control System',
      'Multi-Terrain Select (MTS)',
      'JBL Premium 14-Speaker Sound System',
      'Cooler Box Center Console',
      'Ventilated Memory Leather Seats',
      'Keyless Entry & Remote Engine Start'
    ],
    insight: {
      bestSuitedFor: 'Government tenders, mining fleet executives, and high-status private transportation.',
      conditionSummary: 'Brand new 2024 factory unit at China Export Yard (5,000m² facility). Pre-shipment inspected.',
      availabilityTimeline: 'Container loading inside 5 business days. Tema Port arrival estimated 22 days.',
      dealerSuitabilityIndex: 'EXCELLENT',
      resalePotential: 'Highest residual value retention across sub-Saharan Africa.'
    },
    createdAt: '2026-08-02T11:30:00Z',
    updatedAt: '2026-08-02T11:30:00Z'
  },
  {
    id: 'veh-003',
    stockId: 'TA-2024-003',
    make: 'Geely',
    model: 'Coolray',
    year: 2024,
    trim: '1.5T DCT Flagship Sport Edition',
    type: 'SUV',
    priceGhs: 310000,
    priceUsd: 23000,
    mileageKm: 0,
    condition: 'NEW',
    fuel: 'PETROL',
    transmission: 'AUTOMATIC',
    drivetrain: 'FWD',
    color: 'Velocity Cyber Gray',
    engine: '1.5L Direct Injection Turbo (177 HP)',
    location: 'CHINA EXPORT',
    status: 'JUST ARRIVED',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Automatic Park Assist (APA)',
      '10.25-inch Digital Instrument Cluster',
      'Sport Exhaust with Quad Pipes',
      'Carbon Fiber Aero Accents',
      'Panoramic Skylight Roof',
      '360 HD Surround View Monitor'
    ],
    insight: {
      bestSuitedFor: 'Modern tech-forward urban drivers and rental company fleets looking for high profit margin.',
      conditionSummary: 'Brand new export batch direct from Geely China logistics hub.',
      availabilityTimeline: 'Ready at China Export Yard. Bulk container slots available.',
      dealerSuitabilityIndex: 'PRIME DEMAND',
      resalePotential: 'Rapidly growing popularity in Accra & Tema. Very high wholesale demand.'
    },
    createdAt: '2026-08-03T09:15:00Z',
    updatedAt: '2026-08-03T09:15:00Z'
  },
  {
    id: 'veh-004',
    stockId: 'TA-2024-004',
    make: 'BYD',
    model: 'Song Plus EV',
    year: 2024,
    trim: 'Flagship 505km Electric SUV',
    type: 'SUV',
    priceGhs: 480000,
    priceUsd: 35500,
    mileageKm: 0,
    condition: 'NEW',
    fuel: 'ELECTRIC',
    transmission: 'AUTOMATIC',
    drivetrain: 'FWD',
    color: 'Snow Mountain White',
    engine: 'BYD Blade Battery Ultra Safe (71.7 kWh)',
    location: 'CHINA EXPORT',
    status: 'COMING SOON',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'BYD Blade Battery Technology',
      '15.6-inch Rotating Screen Display',
      'VTOL Mobile Power Output (Vehicle-to-Load)',
      'DiPilot Intelligent Driving Assistant',
      'NFC Smartphone Key Unlock',
      'DC Fast Charging (30 min 30%-80%)'
    ],
    insight: {
      bestSuitedFor: 'Forward-thinking corporate fleets and eco-conscious private buyers seeking zero fuel expenses.',
      conditionSummary: 'Zero mileage, factory fresh, includes home Wallbox charger bundle.',
      availabilityTimeline: 'En route from China Export Yard to Tema Port. Vessel ETA 14 days.',
      dealerSuitabilityIndex: 'HIGH',
      resalePotential: 'High margin opportunity for EV adopters in major West African cities.'
    },
    createdAt: '2026-08-04T14:20:00Z',
    updatedAt: '2026-08-04T14:20:00Z'
  },
  {
    id: 'veh-005',
    stockId: 'TA-2024-005',
    make: 'Changan',
    model: 'CS55 Plus',
    year: 2023,
    trim: '1.5T 7DCT Tech Limited',
    type: 'SUV',
    priceGhs: 295000,
    priceUsd: 21800,
    mileageKm: 8500,
    condition: 'USED',
    fuel: 'PETROL',
    transmission: 'AUTOMATIC',
    drivetrain: 'FWD',
    color: 'Gunmetal Titanium Gray',
    engine: 'Blue Core 1.5T High Pressure Direct Injection',
    location: 'GHANA',
    status: 'AVAILABLE',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Pioneer Audio System',
      'Adaptive Cruise Control',
      'Leatherette Sport Bucket Seats',
      'Smart Voice Control Command',
      'Rear Parking Sensors & Camera'
    ],
    insight: {
      bestSuitedFor: 'Compact executive transport with exceptional fuel economy.',
      conditionSummary: 'Inspected at Tema Yard. Impeccable bodywork, fully serviced engine.',
      availabilityTimeline: 'Available immediately for test drive and payment at Tema Golf City branch.',
      dealerSuitabilityIndex: 'HIGH',
      resalePotential: 'Strong buyer interest among young professionals in Tema & Accra.'
    },
    createdAt: '2026-08-05T08:00:00Z',
    updatedAt: '2026-08-05T08:00:00Z'
  },
  {
    id: 'veh-006',
    stockId: 'TA-2024-006',
    make: 'ISUZU',
    model: 'D-Max',
    year: 2024,
    trim: '3.0L V6 4x4 Heavy Duty Double Cab Pickup',
    type: 'PICKUP',
    priceGhs: 540000,
    priceUsd: 40000,
    mileageKm: 0,
    condition: 'NEW',
    fuel: 'DIESEL',
    transmission: 'AUTOMATIC',
    drivetrain: '4WD',
    color: 'Mineral Black Metallic',
    engine: '3.0L 4JJ3-TCX Turbo Diesel (190 HP, 450 Nm)',
    location: 'GHANA',
    status: 'AVAILABLE',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '3.5 Tonne Towing Capacity',
      'Reinforced Underbody Armor Protection',
      'Diff Lock & Hill Descent Control',
      'Heavy-Duty Bedliner pre-installed',
      'Touchscreen Infotainment with Car Play'
    ],
    insight: {
      bestSuitedFor: 'Construction logistics, agricultural transport, and rugged off-road operations.',
      conditionSummary: 'Brand new 0km vehicle staged at Tema Yard.',
      availabilityTimeline: 'On-site in Tema. Commercial billing ready.',
      dealerSuitabilityIndex: 'EXCELLENT',
      resalePotential: 'High commercial demand. Extremely low depreciation rate.'
    },
    createdAt: '2026-08-05T12:00:00Z',
    updatedAt: '2026-08-05T12:00:00Z'
  },
  {
    id: 'veh-007',
    stockId: 'TA-2024-007',
    make: 'Sinotruk',
    model: 'Howo 371',
    year: 2023,
    trim: '371HP 10-Wheeler Heavy Tipper Dump Truck (20m³)',
    type: 'TRUCK',
    priceGhs: 820000,
    priceUsd: 60700,
    mileageKm: 0,
    condition: 'NEW',
    fuel: 'DIESEL',
    transmission: 'MANUAL',
    drivetrain: 'RWD',
    color: 'Safety Red / White',
    engine: 'WD615.47 Euro II Heavy Duty Diesel (371 HP)',
    location: 'CHINA EXPORT',
    status: 'AVAILABLE',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '20 Cubic Meter High Tensile Cargo Box',
      'HW19710 10-Speed Heavy Duty Transmission',
      'Air Conditioning HW76 Sleeper Cab',
      'Hydraulic Front Lifting System',
      'Reinforced Double Reduction Axles'
    ],
    insight: {
      bestSuitedFor: 'Road construction, quarry mining operations, and bulk material transport in Ghana.',
      conditionSummary: 'Brand new industrial unit stored at China Export Base (5,000m² facility).',
      availabilityTimeline: 'RoRo or Flat-rack shipping available from China to Tema Port inside 20 days.',
      dealerSuitabilityIndex: 'VERY HIGH',
      resalePotential: 'Essential equipment for infrastructure projects. Immediate contractor interest.'
    },
    createdAt: '2026-08-06T10:00:00Z',
    updatedAt: '2026-08-06T10:00:00Z'
  },
  {
    id: 'veh-008',
    stockId: 'TA-2024-008',
    make: 'Mercedes-Benz',
    model: 'GLE 450',
    year: 2024,
    trim: '4MATIC AMG Line 3.0L EQ Boost',
    type: 'LUXURY',
    priceGhs: 1450000,
    priceUsd: 107000,
    mileageKm: 4100,
    condition: 'USED',
    fuel: 'HYBRID',
    transmission: 'AUTOMATIC',
    drivetrain: 'AWD',
    color: 'Obsidian Black Metallic',
    engine: '3.0L Inline-6 Turbo with EQ Boost (362 HP + 21 HP)',
    location: 'GHANA',
    status: 'RESERVED',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'AMG Styling Package with 21-inch Wheels',
      'MBUX Augmented Reality Navigation',
      'Burmester Surround Sound System',
      'AIRMATIC Air Suspension with Adaptive Damping',
      'Panoramic Sliding Glass Sunroof'
    ],
    insight: {
      bestSuitedFor: 'Ultra-executive luxury driving and VIP escort duty.',
      conditionSummary: 'Mint condition specimen held under buyer reservation protocol.',
      availabilityTimeline: 'Currently reserved. Contact sales for secondary match sourcing.',
      dealerSuitabilityIndex: 'HIGH',
      resalePotential: 'Top luxury segment value retention.'
    },
    createdAt: '2026-08-06T16:00:00Z',
    updatedAt: '2026-08-06T16:00:00Z'
  },
  {
    id: 'veh-009',
    stockId: 'TA-2024-009',
    make: 'Haval',
    model: 'H6',
    year: 2023,
    trim: '2.0T Ultra AWD 7DCT',
    type: 'SUV',
    priceGhs: 340000,
    priceUsd: 25000,
    mileageKm: 0,
    condition: 'NEW',
    fuel: 'PETROL',
    transmission: 'AUTOMATIC',
    drivetrain: 'AWD',
    color: 'Hamilton White',
    engine: '2.0L Direct Injection Turbo (201 HP)',
    location: 'CHINA EXPORT',
    status: 'AVAILABLE',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Autonomous Emergency Braking',
      'Head-Up Display (HUD)',
      'Wireless Phone Charging Pad',
      'Ambient 64-Color Interior Lighting',
      'Multi-Terrain Mode Selector'
    ],
    insight: {
      bestSuitedFor: 'Families needing maximum luxury features at an unbeatable wholesale entry price.',
      conditionSummary: 'Brand new 0km vehicle at China Export Base.',
      availabilityTimeline: 'Direct shipment booking ready upon inquiry.',
      dealerSuitabilityIndex: 'HIGH',
      resalePotential: 'Fast growing market share in West Africa.'
    },
    createdAt: '2026-08-07T11:00:00Z',
    updatedAt: '2026-08-07T11:00:00Z'
  },
  {
    id: 'veh-010',
    stockId: 'TA-2024-010',
    make: 'Lexus',
    model: 'RX 350',
    year: 2022,
    trim: 'F-Sport AWD Luxury Package',
    type: 'LUXURY',
    priceGhs: 680000,
    priceUsd: 50000,
    mileageKm: 26000,
    condition: 'USED',
    fuel: 'PETROL',
    transmission: 'AUTOMATIC',
    drivetrain: 'AWD',
    color: 'Caviar Metallic Black',
    engine: '3.5L V6 Dual VVT-i (295 HP)',
    location: 'GHANA',
    status: 'SOLD',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Mark Levinson 15-Speaker Audio',
      'F-Sport Tuned Adaptive Variable Suspension',
      'Triple-Beam LED Headlamps',
      'Heated & Ventilated F-Sport Seats',
      'Power Folding Rear Seats'
    ],
    insight: {
      bestSuitedFor: 'Executive luxury commuting.',
      conditionSummary: 'Sold & delivered through Trust Auto Trader Tema yard.',
      availabilityTimeline: 'Unit completed sale. Sourcing available upon request.',
      dealerSuitabilityIndex: 'EXCELLENT',
      resalePotential: 'Proven track record of instant buyer clearance.'
    },
    createdAt: '2026-08-08T09:00:00Z',
    updatedAt: '2026-08-08T09:00:00Z'
  },
  {
    id: 'veh-011',
    stockId: 'TA-2024-011',
    make: 'Nissan',
    model: 'NP300 Hardbody',
    year: 2023,
    trim: '2.5 TDI 4x4 Workhorse Double Cab',
    type: 'PICKUP',
    priceGhs: 320000,
    priceUsd: 23700,
    mileageKm: 19000,
    condition: 'USED',
    fuel: 'DIESEL',
    transmission: 'MANUAL',
    drivetrain: '4WD',
    color: 'Arctic Solid White',
    engine: '2.5L Turbocharged Intercooled Diesel',
    location: 'GHANA',
    status: 'JUST ARRIVED',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Heavy Duty Payload Suspension',
      'High Ground Clearance (220mm)',
      'Dual Airbags & ABS',
      'Reinforced Cargo Hooks',
      'All-Terrain Tires'
    ],
    insight: {
      bestSuitedFor: 'Site logistics, farm transport, and rugged utility fleets in rural & urban Ghana.',
      conditionSummary: 'Just arrived at Tema facility. Thoroughly tested.',
      availabilityTimeline: 'Ready at Tema location.',
      dealerSuitabilityIndex: 'HIGH',
      resalePotential: 'Consistently top-demanded utility truck.'
    },
    createdAt: '2026-08-09T15:00:00Z',
    updatedAt: '2026-08-09T15:00:00Z'
  },
  {
    id: 'veh-012',
    stockId: 'TA-2024-012',
    make: 'Toyota',
    model: 'HiAce',
    year: 2024,
    trim: '2.5L Turbo Diesel 16-Seater High Roof Commuter',
    type: 'VAN',
    priceGhs: 510000,
    priceUsd: 37800,
    mileageKm: 0,
    condition: 'NEW',
    fuel: 'DIESEL',
    transmission: 'MANUAL',
    drivetrain: 'RWD',
    color: 'Silver Metallic',
    engine: '2.5L 2KD-FTV Turbo Diesel',
    location: 'CHINA EXPORT',
    status: 'AVAILABLE',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '16 Individual Ergonomic Passenger Seats',
      'Dual Air Conditioning Outlets for every row',
      'Sliding Door with Wide Entry Step',
      'Heavy Duty Brake System',
      'Commercial Passenger Transport License Ready'
    ],
    insight: {
      bestSuitedFor: 'Trotro / Inter-city transport operators, school shuttle fleets, and tourism transport.',
      conditionSummary: 'Brand new export spec vehicle in China Export Yard.',
      availabilityTimeline: 'Container or RoRo shipping directly to Tema Port.',
      dealerSuitabilityIndex: 'EXCELLENT',
      resalePotential: 'Extreme demand in West African commercial transport market.'
    },
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-08-10T10:00:00Z'
  }
];
