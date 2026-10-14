import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';

// Custom Glowing Driver Pin
const createDriverIcon = () => {
  return L.divIcon({
    className: 'custom-driver-pin',
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(255, 159, 28, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: relative; width: 20px; height: 20px; border-radius: 9999px; background: #FF9F1C; border: 3px solid #0B0F1A; box-shadow: 0 0 16px #FF9F1C;"></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

// Custom Mechanic Icon
const createMechanicIcon = () => {
  return L.divIcon({
    className: 'custom-mech-pin',
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(56, 189, 248, 0.35); animation: pulse 2s infinite;"></div>
        <div style="position: relative; width: 22px; height: 22px; border-radius: 9999px; background: #38BDF8; border: 3px solid #0B0F1A; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px #38BDF8;">
          <svg style="width: 12px; height: 12px; color: #0B0F1A;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/></svg>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

// Map Recenter Helper component
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

export const LeafletMap = ({
  center = [12.9279, 77.6271],
  zoom = 14,
  driverPos = null,
  mechanicPos = null,
  accuracy = 12,
  className = "h-48 w-full rounded-xl overflow-hidden",
}) => {
  const pos = driverPos || center;

  return (
    <div className={className}>
      <MapContainer
        center={pos}
        zoom={zoom}
        scrollWheelZoom={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <ChangeView center={pos} zoom={zoom} />
        {/* CartoDB Dark Matter dark tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
          subdomains="abcd"
        />

        {/* Driver Location Marker + Accuracy Circle */}
        {driverPos && (
          <>
            <Circle
              center={driverPos}
              radius={accuracy || 20}
              pathOptions={{
                color: '#FF9F1C',
                fillColor: '#FF9F1C',
                fillOpacity: 0.12,
                weight: 1,
              }}
            />
            <Marker position={driverPos} icon={createDriverIcon()}>
              <Popup className="dark-popup">
                <span className="text-xs font-mono font-medium text-slate-800">Your Breakdown Pin</span>
              </Popup>
            </Marker>
          </>
        )}

        {/* En-Route Mechanic Marker */}
        {mechanicPos && (
          <Marker position={mechanicPos} icon={createMechanicIcon()}>
            <Popup className="dark-popup">
              <span className="text-xs font-mono font-medium text-slate-800">Assigned Mechanic</span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
