import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initialVehicles } from './src/data/initialInventory';
import { Vehicle, SourcingRequest, DealerRequest, Enquiry } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// File-based persistence setup
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

interface DatabaseSchema {
  vehicles: Vehicle[];
  sourcingRequests: SourcingRequest[];
  dealerRequests: DealerRequest[];
  enquiries: Enquiry[];
}

function ensureDbExists(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DatabaseSchema = {
      vehicles: initialVehicles,
      sourcingRequests: [
        {
          id: 'src-101',
          refNumber: 'SRC-98214',
          buyerType: 'DEALER / WHOLESALE',
          customerName: 'Kofi Mensah',
          companyName: 'GoldCoast Logistics Ltd',
          phone: '0541234567',
          email: 'kmensah@goldcoast.com.gh',
          make: 'Toyota',
          model: 'Hilux / Land Cruiser Prado',
          minYear: 2022,
          maxYear: 2024,
          budgetGhs: 1200000,
          quantity: 3,
          condition: 'NEW',
          fuel: 'DIESEL',
          transmission: 'AUTOMATIC',
          preferredLocation: 'China Export Base',
          destinationPort: 'Tema Port, Ghana',
          additionalNotes: 'Need heavy duty diesel 4x4 specification with tow hitch pre-fitted.',
          status: 'NEW',
          createdAt: new Date().toISOString()
        }
      ],
      dealerRequests: [
        {
          id: 'dlr-201',
          refNumber: 'DLR-44120',
          companyName: 'Tema Auto Imports Gh',
          contactPerson: 'Emmanuel Osei',
          phone: '0244987654',
          email: 'e.osei@temaauto.gh',
          businessLocation: 'Tema Community 1, Ghana',
          fleetQuantityNeeded: 5,
          vehicleMix: '3x SUV (Geely Coolray / Changan CS55) + 2x Pickups (ISUZU D-Max)',
          targetDeliveryDate: '2026-09-15',
          additionalNotes: 'Looking for container batch shipment pricing from China Export facility.',
          status: 'NEW',
          createdAt: new Date().toISOString()
        }
      ],
      enquiries: [
        {
          id: 'enq-301',
          vehicleStockId: 'TA-2024-001',
          vehicleTitle: '2023 Toyota RAV4 2.5L XLE AWD',
          customerName: 'Abena Ofori',
          phone: '0555112233',
          email: 'abena.ofori@gmail.com',
          message: 'Hello Trust Auto Trader, I am interested in the 2023 Toyota RAV4, Stock TA-2024-001. Please send me the wholesale price and availability.',
          source: 'WHATSAPP',
          status: 'NEW',
          createdAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.vehicles) parsed.vehicles = initialVehicles;
    if (!parsed.sourcingRequests) parsed.sourcingRequests = [];
    if (!parsed.dealerRequests) parsed.dealerRequests = [];
    if (!parsed.enquiries) parsed.enquiries = [];
    return parsed;
  } catch (err) {
    console.error('Failed reading DB file, resetting to initial', err);
    const initialDb: DatabaseSchema = {
      vehicles: initialVehicles,
      sourcingRequests: [],
      dealerRequests: [],
      enquiries: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
}

function saveDb(db: DatabaseSchema) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// REST API ROUTES

// 1. Get Vehicles with Filtering
app.get('/api/vehicles', (req, res) => {
  const db = ensureDbExists();
  let result = [...db.vehicles];

  const search = (req.query.search as string || '').toLowerCase().trim();
  const make = (req.query.make as string || '').toLowerCase().trim();
  const type = (req.query.type as string || '').toUpperCase().trim();
  const location = (req.query.location as string || '').toUpperCase().trim();
  const status = (req.query.status as string || '').toUpperCase().trim();
  const fuel = (req.query.fuel as string || '').toUpperCase().trim();
  const transmission = (req.query.transmission as string || '').toUpperCase().trim();
  const condition = (req.query.condition as string || '').toUpperCase().trim();
  const minYear = parseInt(req.query.minYear as string) || 0;
  const maxYear = parseInt(req.query.maxYear as string) || 9999;
  const minPrice = parseInt(req.query.minPrice as string) || 0;
  const maxPrice = parseInt(req.query.maxPrice as string) || 999999999;
  const sortBy = req.query.sortBy as string || 'newest';

  if (search) {
    result = result.filter(v =>
      v.make.toLowerCase().includes(search) ||
      v.model.toLowerCase().includes(search) ||
      v.stockId.toLowerCase().includes(search) ||
      v.trim.toLowerCase().includes(search) ||
      v.engine.toLowerCase().includes(search) ||
      v.type.toLowerCase().includes(search) ||
      v.location.toLowerCase().includes(search) ||
      v.fuel.toLowerCase().includes(search) ||
      v.color.toLowerCase().includes(search) ||
      v.year.toString().includes(search) ||
      v.condition.toLowerCase().includes(search) ||
      v.drivetrain.toLowerCase().includes(search) ||
      v.features.some(f => f.toLowerCase().includes(search))
    );
  }

  if (make && make !== 'all') {
    result = result.filter(v => v.make.toLowerCase() === make);
  }

  if (type && type !== 'ALL') {
    result = result.filter(v => v.type.toUpperCase() === type);
  }

  if (location && location !== 'ALL') {
    result = result.filter(v => v.location.toUpperCase() === location);
  }

  if (status && status !== 'ALL') {
    result = result.filter(v => v.status.toUpperCase() === status);
  }

  if (fuel && fuel !== 'ALL') {
    result = result.filter(v => v.fuel.toUpperCase() === fuel);
  }

  if (transmission && transmission !== 'ALL') {
    result = result.filter(v => v.transmission.toUpperCase() === transmission);
  }

  if (condition && condition !== 'ALL') {
    result = result.filter(v => v.condition.toUpperCase() === condition);
  }

  if (minYear) result = result.filter(v => v.year >= minYear);
  if (maxYear) result = result.filter(v => v.year <= maxYear);
  if (minPrice) result = result.filter(v => v.priceGhs >= minPrice);
  if (maxPrice) result = result.filter(v => v.priceGhs <= maxPrice);

  // Sorting
  if (sortBy === 'price-asc') {
    result.sort((a, b) => a.priceGhs - b.priceGhs);
  } else if (sortBy === 'price-desc') {
    result.sort((a, b) => b.priceGhs - a.priceGhs);
  } else if (sortBy === 'year-desc') {
    result.sort((a, b) => b.year - a.year);
  } else if (sortBy === 'featured') {
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else {
    // default newest
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  res.json({ success: true, count: result.length, data: result });
});

// 2. Get Single Vehicle
app.get('/api/vehicles/:id', (req, res) => {
  const db = ensureDbExists();
  const vehicle = db.vehicles.find(v => v.id === req.params.id || v.stockId.toLowerCase() === req.params.id.toLowerCase());
  if (!vehicle) {
    return res.status(404).json({ success: false, message: 'Vehicle not found' });
  }
  res.json({ success: true, data: vehicle });
});

// 3. Admin: Create Vehicle
app.post('/api/vehicles', (req, res) => {
  const db = ensureDbExists();
  const body = req.body;

  const now = new Date().toISOString();
  const newVehicle: Vehicle = {
    id: `veh-${Date.now()}`,
    stockId: body.stockId || `TA-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    make: body.make || 'Toyota',
    model: body.model || 'Unknown',
    year: parseInt(body.year) || new Date().getFullYear(),
    trim: body.trim || 'Standard Trim',
    type: body.type || 'SUV',
    priceGhs: parseInt(body.priceGhs) || 0,
    priceUsd: parseInt(body.priceUsd) || Math.round((parseInt(body.priceGhs) || 0) / 13.5),
    priceOnRequest: body.priceOnRequest || false,
    mileageKm: parseInt(body.mileageKm) || 0,
    condition: body.condition || 'NEW',
    fuel: body.fuel || 'PETROL',
    transmission: body.transmission || 'AUTOMATIC',
    drivetrain: body.drivetrain || 'FWD',
    color: body.color || 'Black',
    engine: body.engine || 'Standard Engine',
    location: body.location || 'GHANA',
    status: body.status || 'AVAILABLE',
    featured: !!body.featured,
    images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    features: Array.isArray(body.features) ? body.features : ['Air Conditioning', 'Power Steering', 'ABS Brakes'],
    insight: body.insight || {
      bestSuitedFor: 'Ghanaian road conditions and commercial executive transport.',
      conditionSummary: 'Full inspection verified at Tema Facility.',
      availabilityTimeline: 'Immediate pickup at Tema Yard or China Export delivery.',
      dealerSuitabilityIndex: 'HIGH',
      resalePotential: 'Strong demand retention in sub-Saharan Africa.'
    },
    createdAt: now,
    updatedAt: now
  };

  db.vehicles.unshift(newVehicle);
  saveDb(db);
  res.status(201).json({ success: true, data: newVehicle });
});

// 4. Admin: Update Vehicle
app.put('/api/vehicles/:id', (req, res) => {
  const db = ensureDbExists();
  const index = db.vehicles.findIndex(v => v.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Vehicle not found' });
  }

  const existing = db.vehicles[index];
  const updated: Vehicle = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.vehicles[index] = updated;
  saveDb(db);
  res.json({ success: true, data: updated });
});

// 5. Admin: Delete Vehicle
app.delete('/api/vehicles/:id', (req, res) => {
  const db = ensureDbExists();
  const initialLength = db.vehicles.length;
  db.vehicles = db.vehicles.filter(v => v.id !== req.params.id);

  if (db.vehicles.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Vehicle not found' });
  }

  saveDb(db);
  res.json({ success: true, message: 'Vehicle removed successfully' });
});

// 6. Submit Sourcing Request
app.post('/api/sourcing', (req, res) => {
  const db = ensureDbExists();
  const body = req.body;

  const refNumber = `SRC-${Math.floor(10000 + Math.random() * 90000)}`;
  const newRequest: SourcingRequest = {
    id: `src-${Date.now()}`,
    refNumber,
    buyerType: body.buyerType || 'INDIVIDUAL BUYER',
    customerName: body.customerName || 'Anonymous',
    companyName: body.companyName || '',
    phone: body.phone || '',
    email: body.email || '',
    make: body.make || '',
    model: body.model || '',
    minYear: parseInt(body.minYear) || 2020,
    maxYear: parseInt(body.maxYear) || 2024,
    budgetGhs: parseInt(body.budgetGhs) || 0,
    quantity: parseInt(body.quantity) || 1,
    condition: body.condition || 'Any',
    fuel: body.fuel || 'Any',
    transmission: body.transmission || 'Any',
    preferredLocation: body.preferredLocation || 'Ghana Stock',
    destinationPort: body.destinationPort || 'Tema Port, Ghana',
    additionalNotes: body.additionalNotes || '',
    status: 'NEW',
    createdAt: new Date().toISOString()
  };

  db.sourcingRequests.unshift(newRequest);
  saveDb(db);

  res.status(201).json({
    success: true,
    refNumber,
    data: newRequest,
    message: 'Your sourcing request has been submitted to Trust Auto Trader sourcing desk.'
  });
});

// 7. Get Sourcing Requests (Admin)
app.get('/api/sourcing', (req, res) => {
  const db = ensureDbExists();
  res.json({ success: true, data: db.sourcingRequests });
});

// Update Sourcing Status
app.put('/api/sourcing/:id', (req, res) => {
  const db = ensureDbExists();
  const item = db.sourcingRequests.find(s => s.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Request not found' });
  if (req.body.status) item.status = req.body.status;
  saveDb(db);
  res.json({ success: true, data: item });
});

// 8. Submit Dealer Request
app.post('/api/dealer-requests', (req, res) => {
  const db = ensureDbExists();
  const body = req.body;

  const refNumber = `DLR-${Math.floor(10000 + Math.random() * 90000)}`;
  const newDealerReq: DealerRequest = {
    id: `dlr-${Date.now()}`,
    refNumber,
    companyName: body.companyName || 'Unknown Dealer',
    contactPerson: body.contactPerson || '',
    phone: body.phone || '',
    email: body.email || '',
    businessLocation: body.businessLocation || '',
    fleetQuantityNeeded: parseInt(body.fleetQuantityNeeded) || 1,
    vehicleMix: body.vehicleMix || '',
    targetDeliveryDate: body.targetDeliveryDate || '',
    additionalNotes: body.additionalNotes || '',
    status: 'NEW',
    createdAt: new Date().toISOString()
  };

  db.dealerRequests.unshift(newDealerReq);
  saveDb(db);

  res.status(201).json({
    success: true,
    refNumber,
    data: newDealerReq,
    message: 'Dealer wholesale inquiry registered with Trust Auto Trader executive team.'
  });
});

// Get Dealer Requests (Admin)
app.get('/api/dealer-requests', (req, res) => {
  const db = ensureDbExists();
  res.json({ success: true, data: db.dealerRequests });
});

// Update Dealer Request Status
app.put('/api/dealer-requests/:id', (req, res) => {
  const db = ensureDbExists();
  const item = db.dealerRequests.find(d => d.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Request not found' });
  if (req.body.status) item.status = req.body.status;
  saveDb(db);
  res.json({ success: true, data: item });
});

// 9. Submit General Enquiry / WhatsApp Lead
app.post('/api/enquiries', (req, res) => {
  const db = ensureDbExists();
  const body = req.body;

  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    vehicleId: body.vehicleId || '',
    vehicleStockId: body.vehicleStockId || '',
    vehicleTitle: body.vehicleTitle || '',
    customerName: body.customerName || 'Prospect',
    phone: body.phone || '',
    email: body.email || '',
    message: body.message || '',
    source: body.source || 'WHATSAPP',
    status: 'NEW',
    createdAt: new Date().toISOString()
  };

  db.enquiries.unshift(newEnquiry);
  saveDb(db);

  res.status(201).json({ success: true, data: newEnquiry });
});

// Get Enquiries (Admin)
app.get('/api/enquiries', (req, res) => {
  const db = ensureDbExists();
  res.json({ success: true, data: db.enquiries });
});

// Update Enquiry Status
app.put('/api/enquiries/:id', (req, res) => {
  const db = ensureDbExists();
  const item = db.enquiries.find(e => e.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  if (req.body.status) item.status = req.body.status;
  saveDb(db);
  res.json({ success: true, data: item });
});

// 10. Admin Analytics Stats
app.get('/api/stats', (req, res) => {
  const db = ensureDbExists();
  const vehicles = db.vehicles;

  const stats = {
    totalVehicles: vehicles.length,
    ghanaStockCount: vehicles.filter(v => v.location === 'GHANA').length,
    chinaExportCount: vehicles.filter(v => v.location === 'CHINA EXPORT').length,
    availableCount: vehicles.filter(v => v.status === 'AVAILABLE').length,
    justArrivedCount: vehicles.filter(v => v.status === 'JUST ARRIVED').length,
    reservedCount: vehicles.filter(v => v.status === 'RESERVED').length,
    soldCount: vehicles.filter(v => v.status === 'SOLD').length,
    sourcingRequestsCount: db.sourcingRequests.length,
    dealerRequestsCount: db.dealerRequests.length,
    enquiriesCount: db.enquiries.length
  };

  res.json({ success: true, data: stats });
});

// 11. Reset / Seed DB endpoint
app.post('/api/seed', (req, res) => {
  const initialDb: DatabaseSchema = {
    vehicles: initialVehicles,
    sourcingRequests: [],
    dealerRequests: [],
    enquiries: []
  };
  saveDb(initialDb);
  res.json({ success: true, message: 'Database reset to initial verified inventory' });
});

// 12. Admin Authentication check
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  // Default pass code for Trust Auto Trader command center: trustauto2024 or admin
  if (password === 'trustauto2024' || password === 'admin') {
    res.json({
      success: true,
      token: 'tat_admin_auth_token_98314',
      message: 'Authenticated as Trust Auto Trader Administrator'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
});

async function startServer() {
  ensureDbExists();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Trust Auto Trader Command Center API active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
