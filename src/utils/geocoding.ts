import { GeocodingResult } from '../types';

const RANDOM_EMOJIS = [
  '🏙️', '🌆', '🏘️', '🏞️', '🌄', '🏔️', '🏖️', '🌊', '🌴', '🌸',
  '🌺', '🌻', '🌷', '🌹', '🌿', '🍀', '🌳', '🌲', '🎋', '🎍',
  '🏰', '🏯', '🗼', '🎡', '🎢', '🎠', '⛩️', '🕌', '⛪', '🏛️',
  '🏗️', '🏭', '🏢', '🏬', '🏪', '🏫', '🏨', '🏦', '🏤', '🏣'
];

export const reverseGeocode = async (lat: number, lng: number): Promise<{ city: string; country: string; emoji: string } | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }
    
    const data: GeocodingResult = await response.json();
    
    // Extract city name with fallback hierarchy
    const city = data.address.city || 
                 data.address.town || 
                 data.address.village || 
                 data.address.municipality || 
                 data.address.county || 
                 'Unknown Location';
    
    const country = data.address.country || 'Unknown Country';
    
    // Get a random emoji for the custom city
    const emoji = RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];
    
    return { city, country, emoji };
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return null;
  }
};

export const generateCityId = (name: string, lat: number, lng: number): string => {
  return `custom-${name.toLowerCase().replace(/\s+/g, '-')}-${lat.toFixed(4)}-${lng.toFixed(4)}`;
};