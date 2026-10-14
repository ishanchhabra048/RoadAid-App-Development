import { useState, useCallback } from 'react';
import { reverseGeocodeMock } from '../services/mockApi';

export function useGeolocation() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'requesting' | 'success' | 'error'
  const [coords, setCoords] = useState(null); // { lat, lng, accuracy }
  const [addressDetails, setAddressDetails] = useState(null);
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    setStatus('requesting');
    setError(null);

    if (!('geolocation' in navigator)) {
      // Fallback if browser doesn't support geolocation
      fallbackMockLocation("Browser geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setCoords({ lat: latitude, lng: longitude, accuracy: Math.round(accuracy) || 12 });
        try {
          const details = await reverseGeocodeMock(latitude, longitude);
          setAddressDetails(details);
        } catch {
          setAddressDetails({
            formatted: `GPS Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            accuracyMeters: 12,
          });
        }
        setStatus('success');
      },
      (err) => {
        let msg = "Could not access location. Please check browser permissions.";
        if (err.code === 1) msg = "Location permission was denied.";
        if (err.code === 2) msg = "GPS position unavailable.";
        if (err.code === 3) msg = "Location request timed out.";
        setError(msg);
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const setManualAddress = useCallback(async (customAddress) => {
    setStatus('requesting');
    setError(null);
    try {
      // Simulate geocoding delay
      await new Promise(r => setTimeout(r, 600));
      // Standard mock Indian coordinates (e.g., Bengaluru central / Outer Ring Road)
      const lat = 12.9279;
      const lng = 77.6271;
      setCoords({ lat, lng, accuracy: 25 });
      setAddressDetails({
        formatted: customAddress,
        accuracyMeters: 25,
      });
      setStatus('success');
    } catch {
      setError("Failed to geocode address");
      setStatus('error');
    }
  }, []);

  const fallbackMockLocation = useCallback(async (reason) => {
    setStatus('requesting');
    await new Promise(r => setTimeout(r, 600));
    const lat = 12.9279;
    const lng = 77.6271;
    setCoords({ lat, lng, accuracy: 12 });
    const details = await reverseGeocodeMock(lat, lng);
    setAddressDetails(details);
    setStatus('success');
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setCoords(null);
    setAddressDetails(null);
    setError(null);
  }, []);

  return {
    status,
    coords,
    addressDetails,
    error,
    requestLocation,
    setManualAddress,
    fallbackMockLocation,
    reset,
  };
}
