/**
 * Simulated In-Memory Database for RoadAid.
 * Easily swappable with MongoDB / PostgreSQL models later.
 */

export const mechanicsDB = [
  {
    id: "mech-101",
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 4.95,
    reviewsCount: 382,
    specialty: "Master Technician & Diagnostics",
    vehicle: "Maruti Dzire Mobile Workshop",
    plateNumber: "DL 01 AB 9021",
    distanceKm: 1.2,
    etaMinutes: 4,
    phone: "+91 98112 45890",
    isOnline: true,
    badges: ["Top Rated", "EV Certified"],
    currentLocation: { lat: 12.9339, lng: 77.6341 },
  },
  {
    id: "mech-102",
    name: "Vikram Patel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4.88,
    reviewsCount: 247,
    specialty: "Tire, Suspension & Battery",
    vehicle: "Mahindra Bolero Rapid Assist",
    plateNumber: "MH 02 CK 4410",
    distanceKm: 2.1,
    etaMinutes: 7,
    phone: "+91 97234 11802",
    isOnline: true,
    badges: ["Heavy Duty", "Hydraulic Jack"],
    currentLocation: { lat: 12.9199, lng: 77.6321 },
  },
  {
    id: "mech-103",
    name: "Amit Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 4.91,
    reviewsCount: 512,
    specialty: "Electrical Systems & Jumpstarts",
    vehicle: "Tata Nexon EV Quick Patrol",
    plateNumber: "KA 05 MN 7820",
    distanceKm: 3.4,
    etaMinutes: 11,
    phone: "+91 99011 88421",
    isOnline: true,
    badges: ["Battery Specialist"],
    currentLocation: { lat: 12.9369, lng: 77.6211 },
  },
];

// Active requests store (in-memory)
export const requestsDB = new Map();

/**
 * Creates a new request and starts the automatic state progression
 */
export function createRequest({ location, issue, note }) {
  const requestId = `RA-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const newRequest = {
    id: requestId,
    status: 'sent', // 'sent' | 'finding' | 'assigned' | 'en_route' | 'completed' | 'cancelled'
    location,
    issue,
    note: note || '',
    createdAt: now,
    updatedAt: now,
    assignedMechanic: null,
    etaRemainingSeconds: 240,
    cancellationReason: null,
  };

  requestsDB.set(requestId, newRequest);

  // Simulate server-side async progression:
  // Step 1: sent -> finding (after 2.5s)
  setTimeout(() => {
    const req = requestsDB.get(requestId);
    if (req && req.status !== 'cancelled') {
      req.status = 'finding';
      req.updatedAt = new Date().toISOString();
    }
  }, 2500);

  // Step 2: finding -> assigned (after 6s)
  setTimeout(() => {
    const req = requestsDB.get(requestId);
    if (req && req.status !== 'cancelled') {
      req.status = 'assigned';
      req.assignedMechanic = mechanicsDB[0]; // Rahul Sharma
      req.updatedAt = new Date().toISOString();
    }
  }, 6000);

  // Step 3: assigned -> en_route (after 9.5s)
  setTimeout(() => {
    const req = requestsDB.get(requestId);
    if (req && req.status !== 'cancelled') {
      req.status = 'en_route';
      req.updatedAt = new Date().toISOString();
    }
  }, 9500);

  return newRequest;
}

export function getRequestById(id) {
  return requestsDB.get(id);
}

export function cancelRequest(id, reason) {
  const req = requestsDB.get(id);
  if (!req) return null;
  req.status = 'cancelled';
  req.cancellationReason = reason;
  req.cancelledAt = new Date().toISOString();
  req.updatedAt = new Date().toISOString();
  return req;
}
