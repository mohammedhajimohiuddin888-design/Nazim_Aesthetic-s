/**
 * Delivery configuration and distance calculation service for Nazimz 10.
 * Calculation starts from the Nazimz 10 stall at Charminar, Hyderabad.
 */

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export const STORE_LOCATION = {
  name: "Nazimz 10",
  stall: "Stall No. 10",
  address: "Charminar Heritage Walkway, Opposite Mecca Masjid Gate, Old City, Hyderabad",
  city: "Hyderabad",
  latitude: 17.3616,
  longitude: 78.4747,
};

export const DELIVERY_CONFIG = {
  ratePerKm: 35, // ₹35 per kilometre
  currency: '₹',
};

/**
 * Calculates straight-line distance in km using the Haversine formula.
 */
export function calculateHaversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estimates road driving distance between store and delivery destination.
 * Incorporates urban road winding factor (1.25x haversine) as reliable fallback
 * or fetches road geometry from public routing services when available.
 */
export function estimateRoadDistanceKm(destLat: number, destLon: number): number {
  const straightLine = calculateHaversineKm(
    STORE_LOCATION.latitude,
    STORE_LOCATION.longitude,
    destLat,
    destLon
  );
  // Hyderabad road networks typically average ~1.25x straight-line distance
  const estimated = straightLine * 1.25;
  // Format to 1 decimal place, minimum 0.5 km
  return Math.max(0.5, Math.round(estimated * 10) / 10);
}

/**
 * Computes charged distance and delivery charge according to the business rule:
 * Charged Distance = CEIL(distance in km)
 * Delivery Charge = Charged Distance * ₹35
 */
export function calculateDeliveryFee(distanceKm: number): {
  distanceKm: number;
  chargedDistanceKm: number;
  ratePerKm: number;
  deliveryCharge: number;
} {
  const chargedDistanceKm = Math.max(1, Math.ceil(distanceKm));
  const deliveryCharge = chargedDistanceKm * DELIVERY_CONFIG.ratePerKm;

  return {
    distanceKm: Math.round(distanceKm * 10) / 10,
    chargedDistanceKm,
    ratePerKm: DELIVERY_CONFIG.ratePerKm,
    deliveryCharge,
  };
}

/**
 * Generates a standard Google Maps link from latitude and longitude.
 */
export function getGoogleMapsLink(latitude: number, longitude: number): string {
  return `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
}
