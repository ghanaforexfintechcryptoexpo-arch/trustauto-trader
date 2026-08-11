import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  X, 
  Send, 
  CheckCircle2, 
  Truck, 
  Building2, 
  Globe2,
  Info
} from 'lucide-react';
import { getWhatsAppSourcingLink } from '../utils/formatters';

interface ShowcaseCategory {
  id: string;
  typeGroup: 'passenger' | 'suv' | 'ev' | 'pickup_mpv' | 'commercial';
  isChineseBrand?: boolean;
  title: string;
  buttonLabel: string;
  subtitle: string;
  image: string;
  popularModels: string[];
  specsSummary: string;
  powertrains: string;
  originBase: string;
  description: string;
}

const SHOWCASE_ITEMS: ShowcaseCategory[] = [
  {
    id: 'byd',
    typeGroup: 'ev',
    isChineseBrand: true,
    title: 'BYD ELECTRIC & HYBRID RANGE',
    buttonLabel: 'EXPLORE BYD',
    subtitle: 'World-Leading Blade Battery, DM-i Hybrids & EV Innovation',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['BYD Seal AWD Sport Sedan (523 HP)', 'BYD Song Plus DM-i / Atto 3 Crossover', 'BYD Tang 7-Seater EV / PHEV', 'BYD Dolphin & Seagull Urban EVs', 'BYD Han Executive Flagship'],
    specsSummary: 'Ultra-Safe Flame-Proof Blade Battery, DM-i Super Hybrid Efficiency (3.8L/100km), 800V e-Platform 3.0',
    powertrains: '100% Pure Electric (BEV), DM-i Super Hybrid (PHEV)',
    originBase: '5,000m² China Export Base',
    description: 'As China\'s premier EV & Hybrid manufacturer, BYD vehicles are sourced directly through our 5,000m² Guangdong export base with complete factory inspection certifications and international export compliance.'
  },
  {
    id: 'chery',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'CHERY & JETOUR AUTOMOTIVE',
    buttonLabel: 'EXPLORE CHERY & JETOUR',
    subtitle: 'High-Reliability Kunpeng Turbo Engines & Modern Luxury Crossovers',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Chery Tiggo 8 Pro Max AWD (7-Seater)', 'Jetour Dashing Turbo Crossover', 'Jetour Traveller T2 4WD Off-Roader', 'Chery Arrizo 8 Executive Sedan', 'Chery Omoda 5 Futuristic Crossover'],
    specsSummary: '2.0 TGDI Kunpeng Turbo Engine (254 HP, 390 Nm), 7-Speed Wet DCT / 8AT, All-Terrain AWD',
    powertrains: 'Turbo Petrol, C-DM Super Plug-in Hybrid',
    originBase: '5,000m² China Export Base',
    description: 'Chery is one of China\'s top automotive exporters worldwide. Through our Guangdong export staging facility, Trust Auto Trader sources factory-new Chery Tiggo and Jetour crossovers engineered for high mechanical durability.'
  },
  {
    id: 'gwm',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'GREAT WALL MOTORS (GWM)',
    buttonLabel: 'EXPLORE GWM RANGE',
    subtitle: 'Rugged HAVAL SUVs, Premium TANK 4x4s & Heavy Duty POER Pickups',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['GWM Tank 300 / Tank 500 Off-Road 4WD', 'GWM Poer / Cannon 4x4 Double Cab Pickup', 'HAVAL H6 HEV & GT Sport Crossover', 'HAVAL Jolion Compact SUV', 'GWM Ora Good Cat EV'],
    specsSummary: '3.0T V6 Twin-Turbo (354 HP) / 2.0T Diesel, 9AT Transmission, Triple Differential Lockers, 3.5T Towing',
    powertrains: 'Turbo Diesel, Petrol, HEV Hybrid, Hi4 Plug-In 4WD',
    originBase: '5,000m² China Export Base',
    description: 'Great Wall Motors dominates heavy utility and luxury off-road segments. We source GWM Poer pickups for mining and agricultural fleets alongside Haval and Tank 4x4s for premium off-roading.'
  },
  {
    id: 'geely',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'GEELY AUTOMOTIVE RANGE',
    buttonLabel: 'EXPLORE GEELY',
    subtitle: 'Volvo-Engineered Tech & Modern SUV Design',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Monjaro (Xingyue L) 2.0T AWD', 'Tugella 2.0T Coupe SUV', 'Azkarra / Boyue Pro 1.5T AWD', 'Coolray Sport Turbo'],
    specsSummary: '2.0T Drive-E Volvo Engine (238 HP), 8-Speed Aisin Transmission, BorgWarner AWD',
    powertrains: 'Turbo Petrol, 48V Mild Hybrid (MHEV)',
    originBase: '5,000m² China Export Base',
    description: 'Combining Swedish engineering with cutting-edge infotainment. Geely SUVs are among the highest-demand executive utility vehicles sourced through our China export base.'
  },
  {
    id: 'changan',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'CHANGAN AUTOMOTIVE',
    buttonLabel: 'EXPLORE CHANGAN',
    subtitle: 'Futuristic Styling & High-Efficiency Blue Core Powertrains',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['UNI-K AWD Executive Crossover', 'UNI-T Cyberpunk Sport Crossover', 'CS75 Plus 2.0T Family SUV', 'Hunter 4x4 Turbo Pickup'],
    specsSummary: '2.0T Blue Core Engine (233 HP, 390 Nm), Aisin 8AT, Level 2+ Autonomous ADAS',
    powertrains: 'Turbo Petrol, iDD Plug-in Hybrid (PHEV)',
    originBase: '5,000m² China Export Base',
    description: 'Recognized for stunning futuristic architecture and ultra-reliable Blue Core turbo engines, Changan models deliver top-tier luxury amenities at wholesale import economics.'
  },
  {
    id: 'li_auto',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'LI AUTO (LIXIANG) SMART SUVs',
    buttonLabel: 'EXPLORE LI AUTO',
    subtitle: 'Ultra-Luxury Extended-Range (EREV) Smart Family Crossovers',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Li L9 Ultra Flagship 6-Seater', 'Li L8 Max Executive SUV', 'Li L7 Pro Luxury 5-Seater', 'Li Mega All-Electric MPV (544 HP)'],
    specsSummary: 'Dual Motor Intelligent 4WD (449 HP, 620 Nm), 1,315km Combined Range (CLTC), Air Suspension, Dual OLED Rear Screens',
    powertrains: 'Range Extended Electric (EREV), 100% Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'Li Auto is China\'s premier luxury smart family SUV manufacturer. Features ultra-quiet range-extended electric drivetrains that eliminate range anxiety for West African long-distance trips while providing airliner first-class seating.'
  },
  {
    id: 'zeekr',
    typeGroup: 'ev',
    isChineseBrand: true,
    title: 'ZEEKR PREMIUM ELECTRIC RANGE',
    buttonLabel: 'EXPLORE ZEEKR',
    subtitle: 'Geely Group\'s High-Performance Luxury EV Division',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Zeekr 001 Shooting Brake (544 HP, 3.8s 0-100)', 'Zeekr 009 VIP Executive MPV', 'Zeekr X Urban Luxury Crossover', 'Zeekr 007 Performance Sedan (646 HP)'],
    specsSummary: '800V High-Voltage Silicon Carbide Architecture, CATL Qilin Battery (100 kWh - 140 kWh), Air Suspension, Yamaha Audio',
    powertrains: '100% Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'Geely\'s ultra-luxury electric brand engineered on the SEA architecture. Sourced with factory warranty certification for discerning private buyers and VIP executive fleets.'
  },
  {
    id: 'xiaomi',
    typeGroup: 'ev',
    isChineseBrand: true,
    title: 'XIAOMI AUTO (SU7 ELECTRIC)',
    buttonLabel: 'EXPLORE XIAOMI SU7',
    subtitle: 'Ultra-Fast 673 HP Electric Super-Sedan & HyperOS Connectivity',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Xiaomi SU7 Max AWD (673 HP, 2.78s 0-100)', 'Xiaomi SU7 Pro Long Range (830km)', 'Xiaomi SU7 Ultra Track Edition', 'Xiaomi SU7 Standard (800V e-Platform)'],
    specsSummary: '21,000 RPM HyperEngine V6s, 800V HyperCharge (510km in 15 mins), Cd 0.195 Aerodynamic Body, Xiaomi HyperOS Tech',
    powertrains: '100% Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'Xiaomi\'s breakthrough high-performance EV sedan. Sourced directly from Beijing production staging facilities with complete export documentation and software integration support.'
  },
  {
    id: 'hongqi',
    typeGroup: 'passenger',
    isChineseBrand: true,
    title: 'HONGQI LUXURY AUTOMOTIVE',
    buttonLabel: 'EXPLORE HONGQI',
    subtitle: 'China\'s Iconic Flagship Presidential & Executive Brand',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Hongqi H9 Executive Flagship Sedan', 'Hongqi E-HS9 VIP SUV (551 HP AWD)', 'Hongqi HS5 Turbo Crossover', 'Hongqi HQ9 Luxury MPV'],
    specsSummary: '3.0T V6 Mechanical Supercharged (283 HP) / Dual Motor EV, Air Suspension, Executive Massage Recliners',
    powertrains: 'Turbo Petrol, Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'The legendary official state car of China. Sourced for corporate executives, government officials, and luxury motorcades demanding prestige and opulent interior craftsmanship.'
  },
  {
    id: 'gac',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'GAC MOTOR & AION EV',
    buttonLabel: 'EXPLORE GAC & AION',
    subtitle: 'GS8 Flagship 7-Seater SUVs & AION Electric Innovation',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['GAC GS8 2.0T AWD 7-Seater', 'GAC Trumpchi M8 Master MPV', 'GAC AION Y Plus Urban Crossover', 'GAC AION LX Plus (1000km Range)'],
    specsSummary: '2.0T MegaWave Engine (252 HP, 400 Nm), Aisin 8AT, BorgWarner Smart 4WD, G-CP pilot autonomous system',
    powertrains: 'Turbo Petrol, HEV Hybrid, Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'GAC Group is renowned for world-class manufacturing quality. We source GS8 7-seater family SUVs and AION electric crossovers with proven durability.'
  },
  {
    id: 'voyah_mhero',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'VOYAH & M-HERO LUXURY 4WD',
    buttonLabel: 'EXPLORE VOYAH & M-HERO',
    subtitle: 'Dongfeng Luxury EV Division & Extreme Tactical Off-Roaders',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['M-Hero 917 Tactical 4WD (1,088 HP Quad Motor)', 'Voyah Free AWD Performance SUV (490 HP)', 'Voyah Dreamer Luxury VIP Lounge MPV', 'Voyah Passion Executive Sedan'],
    specsSummary: '1,088 HP Quad Motor Tank Turn 4WD, 1,000Nm Torque, Adjustable Air Suspension, Night Vision System',
    powertrains: 'Range Extended (EREV), Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'Extreme performance, military-grade tactical 4x4s and high-luxury executive EVs sourced for specialized security, VIP transport, and off-road expeditions.'
  },
  {
    id: 'aito',
    typeGroup: 'suv',
    isChineseBrand: true,
    title: 'AITO & SERES (HUAWEI INSIDE)',
    buttonLabel: 'EXPLORE AITO',
    subtitle: 'Powered by Huawei HarmonyOS Smart Cockpit & ADS 2.0 Driving',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['AITO M9 Flagship 6-Seater SUV (530 HP)', 'AITO M7 Intelligent 6-Seater PHEV', 'AITO M5 Sport Crossover', 'Seres 5 AWD Performance EV'],
    specsSummary: 'Huawei HarmonyOS Smart Cockpit, Huawei DriveONE Dual Motors, Huawei ADS 2.0 LiDAR Autonomous Driving',
    powertrains: 'Range Extended (EREV), Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'Featuring Huawei\'s industry-leading software and intelligent driving tech. Sourced through our Guangdong logistics export base.'
  },
  {
    id: 'toyota',
    typeGroup: 'passenger',
    title: 'TOYOTA & JAPANESE BRANDS',
    buttonLabel: 'EXPLORE TOYOTA',
    subtitle: 'Proven Durability & High Resale Retention',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Land Cruiser Prado / 300 Series', 'RAV4 Hybrid & Petrol', 'Hilux Revo 4x4 Double Cab', 'Camry & Corolla Executive'],
    specsSummary: '2.0L - 3.5L V6 Twin-Turbo, Dual VVT-i, AWD & 4WD Heavy Duty Chassis',
    powertrains: 'Petrol, Hybrid (HEV), Diesel (GD-6)',
    originBase: 'Tema Staging Yard & Global Wholesale Channels',
    description: 'The backbone of West African automotive demand. Trust Auto Trader sources factory-grade Toyota Land Cruisers, RAV4s, and Hilux double cabs tailored for commercial fleet reliability and personal prestige.'
  },
  {
    id: 'suvs',
    typeGroup: 'suv',
    title: 'SUVs & CROSSOVERS',
    buttonLabel: 'EXPLORE SUVs',
    subtitle: 'Compact, Mid-size & 7-Seater Family Off-Roaders',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['GAC GS8 7-Seater AWD', 'GWM Tank 300 Off-Road 4WD', 'Honda CR-V Turbo Touring', 'Jetour Dashing & X70 Plus'],
    specsSummary: 'All-Wheel Drive (AWD), Intelligent Terrain Modes, High Ground Clearance',
    powertrains: 'Petrol, Hybrid, PHEV, EV',
    originBase: 'Tema Yard & China Export Base',
    description: 'Versatile SUVs built for rough road conditions, diplomatic escort fleets, and family travel. Available in diverse seating configurations and trim levels.'
  },
  {
    id: 'sedans',
    typeGroup: 'passenger',
    title: 'SEDANS & EXECUTIVE CARS',
    buttonLabel: 'EXPLORE SEDANS',
    subtitle: 'Sleek Fuel Efficiency & Diplomatic Luxury Comfort',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['BYD Seal Sport Sedan', 'BMW 5 Series & 3 Series', 'Toyota Camry Executive', 'Chery Arrizo 8 Turbo'],
    specsSummary: 'Aerodynamic Drag Efficiency (Cd 0.21), Premium Nappa Leather, Surround Sound',
    powertrains: 'Petrol, Mild Hybrid, Electric',
    originBase: 'Tema Yard & China Export Base',
    description: 'Sleek executive sedans offering quiet highway acoustics, low running costs, and impressive corporate executive appeal.'
  },
  {
    id: 'pickups',
    typeGroup: 'pickup_mpv',
    title: 'PICKUP TRUCKS & 4x4 UTILITY',
    buttonLabel: 'EXPLORE PICKUPS',
    subtitle: 'Heavy Commercial Payloads & Off-Road Fleet Durability',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Ford Ranger Wildtrak Bi-Turbo 4x4', 'Toyota Hilux Revo Rocco 2.8L GD-6', 'ISUZU D-Max V-Cross', 'Great Wall Poer 4x4'],
    specsSummary: '1-Ton Payload Capability, 3.5-Ton Towing Rating, Low-Range 4WD Lockers',
    powertrains: 'Turbo Diesel, Petrol 4x4',
    originBase: 'Tema Yard & China Export Base',
    description: 'Engineered for mining, agriculture, construction, and security fleets. Rugged 4x4 utility pickups equipped with reinforced chassis frame rails.'
  },
  {
    id: 'mpvs',
    typeGroup: 'pickup_mpv',
    title: 'MINIVANS & MPVs (7-9 SEATERS)',
    buttonLabel: 'EXPLORE MINIVANS',
    subtitle: 'First-Class Executive Lounges & Large Family Carriers',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['BYD Denza D9 Luxury EV/PHEV MPV', 'Toyota Alphard / Vellfire 3.5L Executive Lounge', 'GAC Trumpchi M8 Master Edition', 'Hyundai Staria 9-Seater', 'Maxus G90 VIP Shuttle'],
    specsSummary: 'Captain Ottoman Seats with Massage, Dual Electric Sliding Doors, Rear Entertainment Screen',
    powertrains: 'Hybrid (HEV), Plug-in Hybrid (PHEV), Electric (BEV)',
    originBase: '5,000m² China Export Base & Global Channels',
    description: 'Ultra-luxurious 7-to-9 seater MPVs built for VIP hotel airport transfers, executive corporate shuttles, and comfortable multi-family long-distance transport.'
  },
  {
    id: 'offroad',
    typeGroup: 'suv',
    title: 'OFF-ROAD & EXPEDITION 4x4',
    buttonLabel: 'EXPLORE OFF-ROAD',
    subtitle: 'Extreme Terrain Off-Roaders & Expedition Vehicles',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['GWM Tank 500 V6 Twin-Turbo', 'Jetour Traveller T2 4WD', 'FangChengBao Bao 5 Off-Road EV', 'Land Rover Defender 110', 'Mercedes-Benz G63 AMG'],
    specsSummary: 'Triple Differential Lockers, Crawl Control, 700mm+ Wading Depth, Heavy-Duty Skid Plates',
    powertrains: 'V6 Turbo Petrol, Super Hybrid 4x4, EV 4WD',
    originBase: '5,000m² China Export Base & Tema Yard',
    description: 'Bespoke off-road expedition vehicles designed to tackle demanding West African safari routes, unpaved mining access roads, and rugged terrain with luxury comfort.'
  },
  {
    id: 'luxury_sports',
    typeGroup: 'passenger',
    title: 'LUXURY & PERFORMANCE SPORTS',
    buttonLabel: 'EXPLORE LUXURY',
    subtitle: 'High-Performance Supercars & Flagship Grand Tourers',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Zeekr 001 Shooting Brake (544 HP)', 'Li Auto L9 Ultra Max Flagship', 'Porsche Taycan EV', 'BMW M5 Competition', 'Yangwang U8 Amphibious SUV'],
    specsSummary: '800V Ultra-Fast Architecture, Air Suspension, 0-100km/h in under 3.5 seconds',
    powertrains: 'Dual-Motor AWD Electric, Biturbo V8, Range-Extended EV',
    originBase: '5,000m² China Export Base & VIP Procurement',
    description: 'Top-tier luxury vehicles and performance grand tourers sourced for discerning collectors, government dignitaries, and VIP corporate executives.'
  },
  {
    id: 'buses',
    typeGroup: 'commercial',
    title: 'BUSES, SHUTTLES & COACHES',
    buttonLabel: 'EXPLORE BUSES',
    subtitle: '15 to 55-Seater Commuter Buses & Luxury Tourist Coaches',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Yutong 30-Seater Commuter Bus', 'Toyota Coaster Executive 23-Seater', 'King Long Luxury Tourist Coach 55-Seater', 'Golden Dragon Electric City Shuttle'],
    specsSummary: 'Cummins Diesel / EV Motors, Air Brakes, Reinforced Roll-Cage Safety Frame, Air Conditioning',
    powertrains: 'Turbo Diesel, Pure Electric (BEV)',
    originBase: 'China Bus Manufacturer Staging Base',
    description: 'Reliable mass transit solutions for school districts, intercity transport fleets, luxury tourism operators, and church congregation shuttles.'
  },
  {
    id: 'electric_cargo',
    typeGroup: 'ev',
    isChineseBrand: true,
    title: 'ELECTRIC CARGO VANS & FLEETS',
    buttonLabel: 'EXPLORE EV VANS',
    subtitle: 'Zero-Emission Last-Mile Logistics & Urban Freight',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['Farizon V6E Electric Cargo Van', 'Maxus eDeliver 9 Heavy Van', 'BYD T3 Electric Panel Van', 'JAC Sunray EV Express Cargo'],
    specsSummary: '6.5 m³ to 11 m³ Cargo Volume, CATL Lithium Iron Phosphate Battery, 280km Range',
    powertrains: '100% Pure Electric (BEV)',
    originBase: '5,000m² China Export Base',
    description: 'Purpose-built commercial electric panel vans designed to eliminate fuel costs and optimize last-mile courier delivery fleets in urban centers.'
  },
  {
    id: 'commercial',
    typeGroup: 'commercial',
    title: 'COMMERCIAL & HEAVY TRUCKS',
    buttonLabel: 'EXPLORE TRUCKS',
    subtitle: 'Tractor Heads, Tipper Dumpers & Industrial Fleets',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['FAW Jiefang J6P 380HP 6x4 Tractor Head', 'Sinotruk HOWO 371HP Dumper', 'Shacman F3000 Heavy Tipper', 'Foton Auman Heavy Duty'],
    specsSummary: '380HP - 430HP Weichai / FAW Diesel Engines, 12-Speed FAST Gearbox, 40-Ton Payload',
    powertrains: 'Heavy Duty Intercooled Turbo Diesel',
    originBase: 'Direct China Heavy Machinery Export Staging',
    description: 'Direct procurement channels for heavy-duty construction transport, logistics tractor units, and mining dumpers directly sourced from China manufacturer bases.'
  },
  {
    id: 'machinery',
    typeGroup: 'commercial',
    title: 'HEAVY MACHINERY & EARTHMOVERS',
    buttonLabel: 'EXPLORE MACHINERY',
    subtitle: 'Excavators, Wheel Loaders, Cranes & Road Compactors',
    image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&w=1200&q=80',
    popularModels: ['SANY SY215C 22-Ton Heavy Excavator', 'XCMG LW500FN 5-Ton Wheel Loader', 'Zoomlion 25-Ton Mobile Crane', 'Shantui SD22 Heavy Crawler Bulldozer'],
    specsSummary: 'Kawasaki Hydraulic Systems, Heavy Duty Boom & Arm, High-Altitude Engine Cooling',
    powertrains: 'Heavy Duty Industrial Turbo Diesel',
    originBase: 'China Heavy Equipment Export Hub',
    description: 'Industrial-grade earthmoving and construction equipment for roadworks, quarrying, mining, and civil infrastructure projects across Africa.'
  }
];

interface VehicleShowcaseProps {
  onSourceRequest: (categoryOrBrand: string) => void;
}

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({ onSourceRequest }) => {
  const [selectedCategory, setSelectedCategory] = useState<ShowcaseCategory | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>('all');

  const filteredItems = activeGroup === 'all' 
    ? SHOWCASE_ITEMS 
    : activeGroup === 'chinese'
    ? SHOWCASE_ITEMS.filter(item => item.isChineseBrand)
    : SHOWCASE_ITEMS.filter(item => item.typeGroup === activeGroup);

  return (
    <section id="showcase" className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1C] pb-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080809] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>WHOLESALE VEHICLE CATALOGUE ({SHOWCASE_ITEMS.length} CATEGORIES)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            EXPLORE OUR <span className="text-[#D4AF37]">VEHICLE RANGE</span>
          </h2>

          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Visually showcasing our direct China export sourcing strengths across premier manufacturers like BYD, Chery, GWM, Geely, Changan, Li Auto, Zeekr, Xiaomi Auto, Hongqi, GAC, and heavy commercial fleets.
          </p>
        </div>

        <div className="font-mono text-xs text-slate-400 bg-[#080809] border border-[#1A1A1C] p-3 shrink-0">
          <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">
            CATALOGUE NOTICE:
          </div>
          <p className="text-[11px] leading-tight font-sans">
            Showcasing sourcing capabilities & specifications.<br />
            Submit a request for exact model availability.
          </p>
        </div>
      </div>

      {/* Category Type Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#1A1A1C]">
        {[
          { id: 'all', label: 'ALL VEHICLE TYPES', count: SHOWCASE_ITEMS.length },
          { id: 'chinese', label: 'CHINESE MANUFACTURERS (BYD, CHERY, GWM, GEELY, LI AUTO, ZEEKR, XIAOMI)', count: SHOWCASE_ITEMS.filter(i => i.isChineseBrand).length },
          { id: 'passenger', label: 'PASSENGER & SEDANS', count: SHOWCASE_ITEMS.filter(i => i.typeGroup === 'passenger').length },
          { id: 'suv', label: 'SUVs & 4x4 OFF-ROAD', count: SHOWCASE_ITEMS.filter(i => i.typeGroup === 'suv').length },
          { id: 'ev', label: 'ELECTRIC & HYBRID (EV)', count: SHOWCASE_ITEMS.filter(i => i.typeGroup === 'ev').length },
          { id: 'pickup_mpv', label: 'PICKUPS & MINIVANS (MPV)', count: SHOWCASE_ITEMS.filter(i => i.typeGroup === 'pickup_mpv').length },
          { id: 'commercial', label: 'COMMERCIAL & HEAVY DUTY', count: SHOWCASE_ITEMS.filter(i => i.typeGroup === 'commercial').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveGroup(tab.id)}
            className={`whitespace-nowrap px-4 py-2.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
              activeGroup === tab.id
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-black'
                : 'bg-[#080809] border-[#1A1A1C] text-slate-400 hover:text-white hover:border-[#D4AF37]'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 text-[9px] font-bold ${activeGroup === tab.id ? 'bg-black text-[#D4AF37]' : 'bg-[#121215] text-slate-400'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <motion.div 
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.45,
                delay: (index % 4) * 0.06,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group bg-[#080809] border border-[#1A1A1C] hover:border-[#D4AF37] transition-all flex flex-col overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-black/20" />
                
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono text-[#D4AF37] font-bold uppercase border border-[#2A2A30]">
                  {item.originBase}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-black uppercase tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>

                  {/* Micro Models preview */}
                  <div className="pt-2 border-t border-[#1A1A1C]/80 space-y-1 font-mono text-[10px]">
                    <span className="text-slate-500 uppercase tracking-wider block font-bold">POPULAR SOURCING MODELS:</span>
                    <p className="text-slate-300 line-clamp-2">
                      {item.popularModels.join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedCategory(item)}
                  className="w-full py-3 bg-[#121215] group-hover:bg-[#D4AF37] text-white group-hover:text-black font-mono font-black text-xs uppercase tracking-widest transition-all border border-[#2A2A30] group-hover:border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer mt-auto"
                >
                  <span>{item.buttonLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Sourcing Callout Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#080809] border border-[#D4AF37]/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>CUSTOM VEHICLE & FLEET SOURCING</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white font-sans">
            NEED A SPECIFIC MAKE, MODEL, OR COMMERCIAL SPECIFICATION?
          </h3>
          <p className="text-xs text-slate-400 font-sans font-light max-w-2xl">
            We source any brand, powertrain, or heavy utility truck directly through our 5,000m² China export base and global automotive channels.
          </p>
        </div>

        <button
          onClick={() => onSourceRequest('All Brands & Categories')}
          className="whitespace-nowrap px-8 py-4 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-mono font-black text-xs uppercase tracking-widest transition-colors cursor-pointer shrink-0"
        >
          SOURCE A CUSTOM VEHICLE →
        </button>
      </motion.div>

      {/* Detail / Sourcing Spec Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#0A0A0C] border border-[#2A2A30] max-w-2xl w-full p-6 sm:p-8 space-y-6 relative text-[#F0F0F0]"
            >
            
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-[#121215] border border-[#2A2A30] hover:text-[#D4AF37] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest block">
                VEHICLE RANGE & SPECIFICATION CATALOGUE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {selectedCategory.title}
              </h3>
              <p className="text-slate-400 text-xs font-light">
                {selectedCategory.subtitle}
              </p>
            </div>

            {/* Image */}
            <div className="aspect-video w-full overflow-hidden border border-[#1A1A1C]">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Specifications Breakdown */}
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 bg-[#121215] border border-[#1A1A1C] space-y-2">
                <span className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider block">OVERVIEW & SOURCING FIT:</span>
                <p className="text-slate-300 font-sans font-light leading-relaxed">
                  {selectedCategory.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#121215] border border-[#1A1A1C]">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1">POPULAR MODELS:</span>
                  <ul className="space-y-1 text-white font-sans text-xs">
                    {selectedCategory.popularModels.map((m, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-[#D4AF37]"></span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-[#121215] border border-[#1A1A1C] space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">POWERTRAIN OPTIONS:</span>
                    <span className="text-white text-xs">{selectedCategory.powertrains}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">ORIGIN CHANNEL:</span>
                    <span className="text-[#D4AF37] text-xs font-bold">{selectedCategory.originBase}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#1A1A1C] flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const categoryName = selectedCategory.title;
                  setSelectedCategory(null);
                  onSourceRequest(categoryName);
                }}
                className="flex-1 py-4 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-mono font-black text-xs uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                REQUEST SOURCING FOR THIS RANGE →
              </button>

              <a
                href={getWhatsAppSourcingLink(`Hi Trust Auto Trader, I am interested in sourcing ${selectedCategory.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                WHATSAPP ENQUIRY
              </a>
            </div>

          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </section>
  );
};
