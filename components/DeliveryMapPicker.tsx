'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Navigation, Crosshair, AlertCircle, Info } from 'lucide-react';
import { STORE_LOCATION, estimateRoadDistanceKm, calculateDeliveryFee, getGoogleMapsLink } from '@/lib/delivery';

interface DeliveryMapPickerProps {
  latitude: number | null;
  longitude: number | null;
  addressArea?: string;
  onLocationSelect: (lat: number, lng: number, distanceKm: number) => void;
}

export default function DeliveryMapPicker({
  latitude,
  longitude,
  onLocationSelect,
}: DeliveryMapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const deliveryMarkerRef = useRef<any>(null);
  const routeLineRef = useRef<any>(null);
  const locationHandlerRef = useRef<(lat: number, lng: number) => void>(() => {});

  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const initialLat = latitude || 17.385;
  const initialLng = longitude || 78.4867;

  // Stable helper to update connection line
  const updateRouteLine = useCallback(async (destLat: number, destLon: number) => {
    if (!mapInstanceRef.current) return;
    const L = (await import('leaflet')).default;

    if (routeLineRef.current) {
      mapInstanceRef.current.removeLayer(routeLineRef.current);
    }

    const latlngs: [number, number][] = [
      [STORE_LOCATION.latitude, STORE_LOCATION.longitude],
      [destLat, destLon],
    ];

    const polyline = L.polyline(latlngs, {
      color: '#B88E3E',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.8,
    }).addTo(mapInstanceRef.current);

    routeLineRef.current = polyline;
  }, []);

  // Update selected location on map and invoke parent callback
  const applySelectedLocation = useCallback(
    async (lat: number, lng: number) => {
      const distanceKm = estimateRoadDistanceKm(lat, lng);
      onLocationSelect(lat, lng, distanceKm);

      if (mapInstanceRef.current) {
        const L = (await import('leaflet')).default;

        const deliveryIcon = L.divIcon({
          className: 'custom-delivery-pin',
          html: `
            <div style="background:#8E2333; color:white; padding:6px 12px; border-radius:18px; font-weight:700; font-size:11px; display:flex; align-items:center; gap:5px; box-shadow:0 4px 12px rgba(142,35,51,0.35); border:2px solid #FAF8F5; white-space:nowrap; transform:translate(-50%, -100%); cursor:grab;">
              <span>📍</span>
              Deliver Here
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        if (deliveryMarkerRef.current) {
          deliveryMarkerRef.current.setLatLng([lat, lng]);
        } else {
          const marker = L.marker([lat, lng], {
            icon: deliveryIcon,
            draggable: true,
          }).addTo(mapInstanceRef.current);

          marker.on('dragend', (e: any) => {
            const pos = e.target.getLatLng();
            locationHandlerRef.current(pos.lat, pos.lng);
          });

          deliveryMarkerRef.current = marker;
        }

        updateRouteLine(lat, lng);
      }
    },
    [onLocationSelect, updateRouteLine]
  );

  useEffect(() => {
    locationHandlerRef.current = applySelectedLocation;
  }, [applySelectedLocation]);

  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      try {
        const L = (await import('leaflet')).default;

        if (!isMounted || !mapContainerRef.current) return;

        const storeIcon = L.divIcon({
          className: 'custom-store-pin',
          html: `
            <div style="background:#1C523E; color:white; padding:6px 10px; border-radius:18px; font-weight:700; font-size:11px; display:flex; align-items:center; gap:5px; box-shadow:0 3px 10px rgba(0,0,0,0.25); border:2px solid #C5A059; white-space:nowrap; transform:translate(-50%, -100%);">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#C5A059;"></span>
              Nazimz 10 (Charminar)
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const deliveryIcon = L.divIcon({
          className: 'custom-delivery-pin',
          html: `
            <div style="background:#8E2333; color:white; padding:6px 12px; border-radius:18px; font-weight:700; font-size:11px; display:flex; align-items:center; gap:5px; box-shadow:0 4px 12px rgba(142,35,51,0.35); border:2px solid #FAF8F5; white-space:nowrap; transform:translate(-50%, -100%); cursor:grab;">
              <span>📍</span>
              Deliver Here
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: latitude && longitude ? 13 : 12,
          scrollWheelZoom: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        const storeMarker = L.marker([STORE_LOCATION.latitude, STORE_LOCATION.longitude], {
          icon: storeIcon,
        }).addTo(map);
        storeMarker.bindPopup(
          `<strong>${STORE_LOCATION.name} Stall</strong><br/>${STORE_LOCATION.address}`
        );

        mapInstanceRef.current = map;

        if (latitude && longitude) {
          const deliveryMarker = L.marker([latitude, longitude], {
            icon: deliveryIcon,
            draggable: true,
          }).addTo(map);

          deliveryMarker.on('dragend', (e: any) => {
            const pos = e.target.getLatLng();
            locationHandlerRef.current(pos.lat, pos.lng);
          });

          deliveryMarkerRef.current = deliveryMarker;
          updateRouteLine(latitude, longitude);
        }

        map.on('click', (e: any) => {
          locationHandlerRef.current(e.latlng.lat, e.latlng.lng);
        });
      } catch (err) {
        console.error('Failed to load map:', err);
      }
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialLat, initialLng, latitude, longitude, updateRouteLine]);

  // Browser Geolocation API Handler
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude: lat, longitude: lng } = position.coords;
        applySelectedLocation(lat, lng);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 14, { animate: true });
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError(
              'Location permission was denied. Please select your location on the map manually below.'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError(
              'Location information is unavailable. Please click on the map to set your pin.'
            );
            break;
          case error.TIMEOUT:
            setGeoError('Location request timed out. Please tap your location on the map.');
            break;
          default:
            setGeoError('Unable to detect location. Please tap your delivery location on the map.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const HYDERABAD_PRESETS = [
    { name: 'Charminar / Old City', lat: 17.3616, lng: 78.4747 },
    { name: 'Abids / Koti', lat: 17.3895, lng: 78.4767 },
    { name: 'Banjara Hills', lat: 17.4156, lng: 78.435 },
    { name: 'Jubilee Hills', lat: 17.4319, lng: 78.4073 },
    { name: 'Secunderabad', lat: 17.4399, lng: 78.4983 },
    { name: 'Gachibowli / Hitec', lat: 17.4401, lng: 78.3489 },
  ];

  const currentDistanceKm = latitude && longitude ? estimateRoadDistanceKm(latitude, longitude) : 0;
  const deliveryCalculation = calculateDeliveryFee(currentDistanceKm);

  return (
    <div className="space-y-4">
      {/* Top Location Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="flex-1 py-3 px-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-70"
        >
          {isLocating ? (
            <>
              <Crosshair className="w-4 h-4 animate-spin" />
              <span>Detecting Current Location...</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              <span>Use My Current Location</span>
            </>
          )}
        </button>

        <span className="text-center text-xs text-stone-400 font-medium sm:px-2">OR</span>

        <div className="text-center sm:text-right text-xs text-stone-600 bg-white/70 border border-[#EAE3D2] px-3.5 py-2.5 rounded-xs flex items-center justify-center sm:justify-end gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#B88E3E]" />
          <span>Tap/Click anywhere on the map to place delivery pin</span>
        </div>
      </div>

      {geoError && (
        <div className="p-3 bg-[#FAF0F1] border border-[#F2CCD1] text-[#8E2333] text-xs rounded-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{geoError}</p>
        </div>
      )}

      {/* Quick Localities in Hyderabad */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] uppercase tracking-wider text-stone-500 shrink-0 font-medium">
          Quick Areas:
        </span>
        {HYDERABAD_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => {
              applySelectedLocation(preset.lat, preset.lng);
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setView([preset.lat, preset.lng], 13, { animate: true });
              }
            }}
            className="px-2.5 py-1 rounded-xs bg-white border border-[#E5DEC9] text-stone-700 hover:text-stone-950 hover:border-[#C5A059] shrink-0 text-[11px] transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Leaflet Map Frame */}
      <div className="relative rounded-xs overflow-hidden border border-[#E2D8C3] shadow-sm bg-[#F5EFE4]">
        <div
          ref={mapContainerRef}
          className="w-full h-[280px] sm:h-[340px] z-10"
          style={{ background: '#FAF8F5' }}
        />

        {latitude && longitude ? (
          <div className="p-4 bg-[#FCFAF7] border-t border-[#EAE3D2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1C523E]" />
                <span className="font-semibold text-stone-900">Delivery from Charminar Stall:</span>
                <span className="font-mono text-[#8F6E2B] font-bold">
                  {deliveryCalculation.distanceKm} km
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-600">
                  Charged: <strong>{deliveryCalculation.chargedDistanceKm} km</strong> (@ ₹35/km)
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Pin Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </p>
            </div>

            <div className="text-right flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                  Delivery Charge
                </span>
                <span className="text-sm font-bold text-stone-900 tabular-nums">
                  ₹{deliveryCalculation.deliveryCharge.toLocaleString('en-IN')}
                </span>
              </div>

              <a
                href={getGoogleMapsLink(latitude, longitude)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#B88E3E] hover:underline whitespace-nowrap"
              >
                View on Google Maps &rarr;
              </a>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE3D2] text-center text-xs text-stone-500">
            <Info className="w-3.5 h-3.5 inline-block mr-1 text-[#C5A059]" />
            Please click on the map or tap &ldquo;Use My Current Location&rdquo; to calculate delivery to your address.
          </div>
        )}
      </div>
    </div>
  );
}
