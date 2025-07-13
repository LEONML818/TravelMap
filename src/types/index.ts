export interface City {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  visited: boolean;
  visitedDate?: string;
  emoji: string;
  isCustom?: boolean;
  importance: 'major' | 'medium' | 'small'; // City importance level
  population?: number;
}

export interface Country {
  name: string;
  code: string;
  continent: string;
  visitedCities: number;
  totalCities: number;
  completionPercentage: number;
}

export interface Continent {
  name: string;
  countries: number;
  visitedCountries: number;
  cities: number;
  visitedCities: number;
  completionPercentage: number;
}

export interface GeocodingResult {
  address: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    county?: string;
    state?: string;
    country?: string;
  };
  display_name: string;
}

export interface MapStats {
  totalCities: number;
  visitedCities: number;
  totalCountries: number;
  visitedCountries: number;
  totalContinents: number;
  visitedContinents: number;
  completionPercentage: number;
  countries: Country[];
  continents: Continent[];
}