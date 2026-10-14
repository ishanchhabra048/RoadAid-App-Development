import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { 
  mechanicsDB, 
  createRequest, 
  getRequestById, 
  cancelRequest 
} from './data/mockDatabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RoadAid Dispatch API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Fetch all nearby verified mechanics
app.get('/api/mechanics', (req, res) => {
  const { lat, lng } = req.query;
  res.json({
    success: true,
    count: mechanicsDB.length,
    data: mechanicsDB,
  });
});

// Create a new roadside emergency request
app.post('/api/requests', (req, res) => {
  const { location, issue, note } = req.body;

  if (!location || !issue) {
    return res.status(400).json({
      success: false,
      error: 'Location and Issue are mandatory fields to dispatch assistance.',
    });
  }

  const newRequest = createRequest({ location, issue, note });
  res.status(201).json({
    success: true,
    message: 'Roadside dispatch initialized successfully.',
    data: newRequest,
  });
});

// Fetch live status of a request
app.get('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const request = getRequestById(id);

  if (!request) {
    return res.status(404).json({
      success: false,
      error: `Request #${id} not found.`,
    });
  }

  res.json({
    success: true,
    data: request,
  });
});

// Cancel an active request
app.post('/api/requests/:id/cancel', (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const cancelled = cancelRequest(id, reason);
  if (!cancelled) {
    return res.status(404).json({
      success: false,
      error: `Request #${id} not found to cancel.`,
    });
  }

  res.json({
    success: true,
    message: 'Assistance request cancelled.',
    data: cancelled,
  });
});

// Reverse Geocode helper
app.post('/api/geocode/reverse', (req, res) => {
  const { lat, lng } = req.body;
  res.json({
    success: true,
    data: {
      address: "Outer Ring Road, Near HSR Layout Flyover",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102",
      formatted: "Outer Ring Road, Near HSR Layout Sector 2, Bengaluru, Karnataka 560102",
      accuracyMeters: 12,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n===========================================`);
  console.log(`🚀 RoadAid Dispatch Server listening on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===========================================\n`);
});
