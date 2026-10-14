/**
 * RoadAid API Service.
 * Connects to the Express backend (http://localhost:5000/api) when online,
 * with seamless simulated fallback promises for offline / instant client preview.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const MOCK_MECHANICS = [
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
    latOffset: 0.006,
    lngOffset: 0.007,
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
    latOffset: -0.008,
    lngOffset: 0.005,
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
    latOffset: 0.009,
    lngOffset: -0.006,
  },
];

export const ISSUE_TYPES = [
  {
    id: "flat-tire",
    title: "Flat Tire",
    description: "Puncture repair, spare wheel replacement, or tire pressure refill.",
    iconName: "Disc",
    estimatedCost: "₹350 - ₹600",
  },
  {
    id: "engine-dead",
    title: "Engine Failure",
    description: "Overheating, stalling, unusual smoke, or refusal to start.",
    iconName: "AlertTriangle",
    estimatedCost: "₹800 - ₹2,500",
  },
  {
    id: "battery-jump",
    title: "Battery Jumpstart",
    description: "Dead battery, booster cables, alternator check, or quick replacement.",
    iconName: "Zap",
    estimatedCost: "₹400 - ₹750",
  },
  {
    id: "out-of-fuel",
    title: "Fuel Delivery",
    description: "Emergency 5L petrol or diesel delivery directly to your roadside spot.",
    iconName: "Fuel",
    estimatedCost: "₹500 + Fuel cost",
  },
];

/**
 * Reverse geocode: checks Express backend, falls back to simulated data
 */
export async function reverseGeocodeMock(lat, lng) {
  try {
    const res = await fetch(`${API_BASE_URL}/geocode/reverse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng }),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    // Backend offline: use simulated data
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address: "Outer Ring Road, Near HSR Layout Flyover",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560102",
        formatted: "Outer Ring Road, Near HSR Layout Sector 2, Bengaluru, Karnataka 560102",
        accuracyMeters: 12,
      });
    }, 600);
  });
}

/**
 * Fetch nearby mechanics: checks backend, falls back to mock list
 */
export async function fetchNearbyMechanics(lat, lng) {
  try {
    const res = await fetch(`${API_BASE_URL}/mechanics?lat=${lat || ''}&lng=${lng || ''}`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    // Backend offline: fallback
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_MECHANICS), 500);
  });
}

/**
 * Create a new roadside assistance dispatch request
 */
export async function createAssistanceRequest(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return {
        success: true,
        requestId: json.data.id,
        createdAt: json.data.createdAt,
        status: json.data.status,
        ...data,
      };
    }
  } catch (err) {
    // Backend offline: fallback
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const requestId = `RA-${Math.floor(1000 + Math.random() * 9000)}`;
      resolve({
        success: true,
        requestId,
        createdAt: new Date().toISOString(),
        status: "finding_mechanics",
        ...data,
      });
    }, 800);
  });
}

/**
 * Cancel an active request
 */
export async function cancelAssistanceRequest(requestId, reason = "") {
  try {
    const res = await fetch(`${API_BASE_URL}/requests/${requestId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    // Backend offline: fallback
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        requestId,
        status: "cancelled",
        cancelledAt: new Date().toISOString(),
        reason,
      });
    }, 450);
  });
}
