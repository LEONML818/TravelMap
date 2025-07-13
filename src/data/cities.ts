import { City } from '../types';

export const WORLD_CITIES: Omit<City, 'visited' | 'visitedDate'>[] = [
  // Europe - Major Cities
  { id: 'london', name: 'London', country: 'United Kingdom', coordinates: [51.5074, -0.1278], emoji: '🏰', importance: 'major', population: 9000000 },
  { id: 'paris', name: 'Paris', country: 'France', coordinates: [48.8566, 2.3522], emoji: '🗼', importance: 'major', population: 11000000 },
  { id: 'rome', name: 'Rome', country: 'Italy', coordinates: [41.9028, 12.4964], emoji: '🏛️', importance: 'major', population: 4300000 },
  { id: 'berlin', name: 'Berlin', country: 'Germany', coordinates: [52.5200, 13.4050], emoji: '🍺', importance: 'major', population: 3700000 },
  { id: 'madrid', name: 'Madrid', country: 'Spain', coordinates: [40.4168, -3.7038], emoji: '💃', importance: 'major', population: 6600000 },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', coordinates: [41.3851, 2.1734], emoji: '🏖️', importance: 'major', population: 5500000 },
  { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', coordinates: [52.3676, 4.9041], emoji: '🌷', importance: 'major', population: 2400000 },
  { id: 'vienna', name: 'Vienna', country: 'Austria', coordinates: [48.2082, 16.3738], emoji: '🎼', importance: 'major', population: 1900000 },
  { id: 'prague', name: 'Prague', country: 'Czech Republic', coordinates: [50.0755, 14.4378], emoji: '🏰', importance: 'major', population: 1300000 },
  { id: 'stockholm', name: 'Stockholm', country: 'Sweden', coordinates: [59.3293, 18.0686], emoji: '🐻', importance: 'major', population: 2400000 },
  
  // Europe - Medium Cities
  { id: 'florence', name: 'Florence', country: 'Italy', coordinates: [43.7696, 11.2558], emoji: '🎨', importance: 'medium', population: 380000 },
  { id: 'venice', name: 'Venice', country: 'Italy', coordinates: [45.4408, 12.3155], emoji: '🚤', importance: 'medium', population: 260000 },
  { id: 'milan', name: 'Milan', country: 'Italy', coordinates: [45.4642, 9.1900], emoji: '👗', importance: 'major', population: 3200000 },
  { id: 'naples', name: 'Naples', country: 'Italy', coordinates: [40.8518, 14.2681], emoji: '🍕', importance: 'medium', population: 970000 },
  { id: 'lyon', name: 'Lyon', country: 'France', coordinates: [45.7640, 4.8357], emoji: '🍷', importance: 'medium', population: 2300000 },
  { id: 'marseille', name: 'Marseille', country: 'France', coordinates: [43.2965, 5.3698], emoji: '⛵', importance: 'medium', population: 1800000 },
  { id: 'nice', name: 'Nice', country: 'France', coordinates: [43.7102, 7.2620], emoji: '🌊', importance: 'medium', population: 340000 },
  { id: 'munich', name: 'Munich', country: 'Germany', coordinates: [48.1351, 11.5820], emoji: '🍻', importance: 'major', population: 1500000 },
  { id: 'hamburg', name: 'Hamburg', country: 'Germany', coordinates: [53.5511, 9.9937], emoji: '⚓', importance: 'medium', population: 1900000 },
  { id: 'cologne', name: 'Cologne', country: 'Germany', coordinates: [50.9375, 6.9603], emoji: '⛪', importance: 'medium', population: 1100000 },
  
  // Europe - Small Cities
  { id: 'bruges', name: 'Bruges', country: 'Belgium', coordinates: [51.2093, 3.2247], emoji: '🏘️', importance: 'small', population: 118000 },
  { id: 'ghent', name: 'Ghent', country: 'Belgium', coordinates: [51.0543, 3.7174], emoji: '🏰', importance: 'small', population: 260000 },
  { id: 'salzburg', name: 'Salzburg', country: 'Austria', coordinates: [47.8095, 13.0550], emoji: '🎵', importance: 'small', population: 150000 },
  { id: 'innsbruck', name: 'Innsbruck', country: 'Austria', coordinates: [47.2692, 11.4041], emoji: '⛷️', importance: 'small', population: 130000 },
  { id: 'heidelberg', name: 'Heidelberg', country: 'Germany', coordinates: [49.3988, 8.6724], emoji: '🏫', importance: 'small', population: 160000 },
  { id: 'rothenburg', name: 'Rothenburg', country: 'Germany', coordinates: [49.3755, 10.1796], emoji: '🏰', importance: 'small', population: 11000 },
  
  // North America - Major Cities
  { id: 'new-york', name: 'New York', country: 'United States', coordinates: [40.7128, -74.0060], emoji: '🗽', importance: 'major', population: 20000000 },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', coordinates: [34.0522, -118.2437], emoji: '🎬', importance: 'major', population: 13000000 },
  { id: 'chicago', name: 'Chicago', country: 'United States', coordinates: [41.8781, -87.6298], emoji: '🌆', importance: 'major', population: 9500000 },
  { id: 'san-francisco', name: 'San Francisco', country: 'United States', coordinates: [37.7749, -122.4194], emoji: '🌉', importance: 'major', population: 4700000 },
  { id: 'toronto', name: 'Toronto', country: 'Canada', coordinates: [43.6532, -79.3832], emoji: '🍁', importance: 'major', population: 6200000 },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', coordinates: [49.2827, -123.1207], emoji: '🏔️', importance: 'major', population: 2500000 },
  { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', coordinates: [19.4326, -99.1332], emoji: '🌮', importance: 'major', population: 21800000 },
  
  // North America - Medium Cities
  { id: 'miami', name: 'Miami', country: 'United States', coordinates: [25.7617, -80.1918], emoji: '🏖️', importance: 'medium', population: 6100000 },
  { id: 'seattle', name: 'Seattle', country: 'United States', coordinates: [47.6062, -122.3321], emoji: '☕', importance: 'medium', population: 4000000 },
  { id: 'boston', name: 'Boston', country: 'United States', coordinates: [42.3601, -71.0589], emoji: '🦞', importance: 'medium', population: 4900000 },
  { id: 'las-vegas', name: 'Las Vegas', country: 'United States', coordinates: [36.1699, -115.1398], emoji: '🎰', importance: 'medium', population: 2300000 },
  { id: 'montreal', name: 'Montreal', country: 'Canada', coordinates: [45.5017, -73.5673], emoji: '🥐', importance: 'medium', population: 4300000 },
  { id: 'calgary', name: 'Calgary', country: 'Canada', coordinates: [51.0447, -114.0719], emoji: '🤠', importance: 'medium', population: 1400000 },
  
  // North America - Small Cities
  { id: 'charleston', name: 'Charleston', country: 'United States', coordinates: [32.7765, -79.9311], emoji: '🏛️', importance: 'small', population: 140000 },
  { id: 'savannah', name: 'Savannah', country: 'United States', coordinates: [32.0835, -81.0998], emoji: '🌳', importance: 'small', population: 150000 },
  { id: 'quebec-city', name: 'Quebec City', country: 'Canada', coordinates: [46.8139, -71.2080], emoji: '🏰', importance: 'small', population: 540000 },
  { id: 'banff', name: 'Banff', country: 'Canada', coordinates: [51.1784, -115.5708], emoji: '🏔️', importance: 'small', population: 8000 },
  
  // Asia - Major Cities
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', coordinates: [35.6762, 139.6503], emoji: '🍣', importance: 'major', population: 37400000 },
  { id: 'osaka', name: 'Osaka', country: 'Japan', coordinates: [34.6937, 135.5023], emoji: '🍜', importance: 'major', population: 19300000 },
  { id: 'beijing', name: 'Beijing', country: 'China', coordinates: [39.9042, 116.4074], emoji: '🏮', importance: 'major', population: 21500000 },
  { id: 'shanghai', name: 'Shanghai', country: 'China', coordinates: [31.2304, 121.4737], emoji: '🏙️', importance: 'major', population: 27000000 },
  { id: 'hong-kong', name: 'Hong Kong', country: 'Hong Kong', coordinates: [22.3193, 114.1694], emoji: '🦄', importance: 'major', population: 7500000 },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', coordinates: [1.3521, 103.8198], emoji: '🦁', importance: 'major', population: 5900000 },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', coordinates: [13.7563, 100.5018], emoji: '🐘', importance: 'major', population: 10500000 },
  { id: 'seoul', name: 'Seoul', country: 'South Korea', coordinates: [37.5665, 126.9780], emoji: '🎮', importance: 'major', population: 25600000 },
  { id: 'mumbai', name: 'Mumbai', country: 'India', coordinates: [19.0760, 72.8777], emoji: '🕌', importance: 'major', population: 20400000 },
  { id: 'delhi', name: 'Delhi', country: 'India', coordinates: [28.7041, 77.1025], emoji: '🐅', importance: 'major', population: 32900000 },
  
  // Asia - Medium Cities
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', coordinates: [35.0116, 135.7681], emoji: '⛩️', importance: 'medium', population: 1500000 },
  { id: 'hiroshima', name: 'Hiroshima', country: 'Japan', coordinates: [34.3853, 132.4553], emoji: '🕊️', importance: 'medium', population: 1200000 },
  { id: 'chiang-mai', name: 'Chiang Mai', country: 'Thailand', coordinates: [18.7883, 98.9853], emoji: '🏯', importance: 'medium', population: 130000 },
  { id: 'phuket', name: 'Phuket', country: 'Thailand', coordinates: [7.8804, 98.3923], emoji: '🏝️', importance: 'medium', population: 420000 },
  { id: 'busan', name: 'Busan', country: 'South Korea', coordinates: [35.1796, 129.0756], emoji: '🌊', importance: 'medium', population: 3400000 },
  { id: 'jeju', name: 'Jeju', country: 'South Korea', coordinates: [33.4996, 126.5312], emoji: '🌺', importance: 'medium', population: 670000 },
  
  // Asia - Small Cities
  { id: 'takayama', name: 'Takayama', country: 'Japan', coordinates: [36.1397, 137.2530], emoji: '🏘️', importance: 'small', population: 88000 },
  { id: 'nikko', name: 'Nikko', country: 'Japan', coordinates: [36.7500, 139.6000], emoji: '🌲', importance: 'small', population: 80000 },
  { id: 'luang-prabang', name: 'Luang Prabang', country: 'Laos', coordinates: [19.8845, 102.1348], emoji: '🏯', importance: 'small', population: 56000 },
  { id: 'hoi-an', name: 'Hoi An', country: 'Vietnam', coordinates: [15.8801, 108.3380], emoji: '🏮', importance: 'small', population: 120000 },
  
  // South America - Major Cities
  { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', coordinates: [-23.5505, -46.6333], emoji: '⚽', importance: 'major', population: 22400000 },
  { id: 'rio-de-janeiro', name: 'Rio de Janeiro', country: 'Brazil', coordinates: [-22.9068, -43.1729], emoji: '🏖️', importance: 'major', population: 13700000 },
  { id: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina', coordinates: [-34.6118, -58.3960], emoji: '💃', importance: 'major', population: 15200000 },
  { id: 'lima', name: 'Lima', country: 'Peru', coordinates: [-12.0464, -77.0428], emoji: '🦙', importance: 'major', population: 10700000 },
  { id: 'santiago', name: 'Santiago', country: 'Chile', coordinates: [-33.4489, -70.6693], emoji: '🍷', importance: 'major', population: 6800000 },
  
  // South America - Medium Cities
  { id: 'cusco', name: 'Cusco', country: 'Peru', coordinates: [-13.5319, -71.9675], emoji: '🏔️', importance: 'medium', population: 430000 },
  { id: 'cartagena', name: 'Cartagena', country: 'Colombia', coordinates: [10.3910, -75.4794], emoji: '🏰', importance: 'medium', population: 1000000 },
  { id: 'mendoza', name: 'Mendoza', country: 'Argentina', coordinates: [-32.8895, -68.8458], emoji: '🍇', importance: 'medium', population: 1100000 },
  { id: 'valparaiso', name: 'Valparaíso', country: 'Chile', coordinates: [-33.0472, -71.6127], emoji: '🎨', importance: 'medium', population: 300000 },
  
  // South America - Small Cities
  { id: 'bariloche', name: 'Bariloche', country: 'Argentina', coordinates: [-41.1335, -71.3103], emoji: '🏔️', importance: 'small', population: 140000 },
  { id: 'ushuaia', name: 'Ushuaia', country: 'Argentina', coordinates: [-54.8019, -68.3030], emoji: '🐧', importance: 'small', population: 80000 },
  { id: 'atacama', name: 'San Pedro de Atacama', country: 'Chile', coordinates: [-22.9083, -68.2000], emoji: '🌵', importance: 'small', population: 6000 },
  
  // Africa - Major Cities
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa', coordinates: [-33.9249, 18.4241], emoji: '🦁', importance: 'major', population: 4600000 },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', coordinates: [30.0444, 31.2357], emoji: '🐪', importance: 'major', population: 20900000 },
  { id: 'marrakech', name: 'Marrakech', country: 'Morocco', coordinates: [31.6295, -7.9811], emoji: '🕌', importance: 'major', population: 930000 },
  { id: 'lagos', name: 'Lagos', country: 'Nigeria', coordinates: [6.5244, 3.3792], emoji: '🎭', importance: 'major', population: 15400000 },
  
  // Africa - Medium Cities
  { id: 'casablanca', name: 'Casablanca', country: 'Morocco', coordinates: [33.5731, -7.5898], emoji: '🏛️', importance: 'medium', population: 3400000 },
  { id: 'fez', name: 'Fez', country: 'Morocco', coordinates: [34.0181, -5.0078], emoji: '🏺', importance: 'medium', population: 1200000 },
  { id: 'luxor', name: 'Luxor', country: 'Egypt', coordinates: [25.6872, 32.6396], emoji: '🏺', importance: 'medium', population: 500000 },
  { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', coordinates: [-26.2041, 28.0473], emoji: '💎', importance: 'major', population: 5600000 },
  
  // Africa - Small Cities
  { id: 'chefchaouen', name: 'Chefchaouen', country: 'Morocco', coordinates: [35.1689, -5.2636], emoji: '💙', importance: 'small', population: 42000 },
  { id: 'aswan', name: 'Aswan', country: 'Egypt', coordinates: [24.0889, 32.8998], emoji: '⛵', importance: 'small', population: 290000 },
  { id: 'stellenbosch', name: 'Stellenbosch', country: 'South Africa', coordinates: [-33.9321, 18.8602], emoji: '🍷', importance: 'small', population: 160000 },
  
  // Oceania - Major Cities
  { id: 'sydney', name: 'Sydney', country: 'Australia', coordinates: [-33.8688, 151.2093], emoji: '🦘', importance: 'major', population: 5300000 },
  { id: 'melbourne', name: 'Melbourne', country: 'Australia', coordinates: [-37.8136, 144.9631], emoji: '☕', importance: 'major', population: 5200000 },
  { id: 'auckland', name: 'Auckland', country: 'New Zealand', coordinates: [-36.8485, 174.7633], emoji: '🐑', importance: 'major', population: 1700000 },
  
  // Oceania - Medium Cities
  { id: 'brisbane', name: 'Brisbane', country: 'Australia', coordinates: [-27.4698, 153.0251], emoji: '🌞', importance: 'medium', population: 2600000 },
  { id: 'perth', name: 'Perth', country: 'Australia', coordinates: [-31.9505, 115.8605], emoji: '🏖️', importance: 'medium', population: 2100000 },
  { id: 'wellington', name: 'Wellington', country: 'New Zealand', coordinates: [-41.2865, 174.7762], emoji: '🌬️', importance: 'medium', population: 420000 },
  { id: 'christchurch', name: 'Christchurch', country: 'New Zealand', coordinates: [-43.5321, 172.6362], emoji: '🌸', importance: 'medium', population: 380000 },
  
  // Oceania - Small Cities
  { id: 'cairns', name: 'Cairns', country: 'Australia', coordinates: [-16.9186, 145.7781], emoji: '🐠', importance: 'small', population: 150000 },
  { id: 'uluru', name: 'Uluru', country: 'Australia', coordinates: [-25.3444, 131.0369], emoji: '🪨', importance: 'small', population: 400 },
  { id: 'queenstown', name: 'Queenstown', country: 'New Zealand', coordinates: [-45.0312, 168.6626], emoji: '🏔️', importance: 'small', population: 16000 },
  { id: 'rotorua', name: 'Rotorua', country: 'New Zealand', coordinates: [-38.1368, 176.2497], emoji: '♨️', importance: 'small', population: 58000 },
];

// Country to continent mapping
export const COUNTRY_CONTINENT_MAP: Record<string, string> = {
  'United Kingdom': 'Europe',
  'France': 'Europe',
  'Italy': 'Europe',
  'Germany': 'Europe',
  'Spain': 'Europe',
  'Netherlands': 'Europe',
  'Austria': 'Europe',
  'Czech Republic': 'Europe',
  'Sweden': 'Europe',
  'Belgium': 'Europe',
  'United States': 'North America',
  'Canada': 'North America',
  'Mexico': 'North America',
  'Japan': 'Asia',
  'China': 'Asia',
  'Hong Kong': 'Asia',
  'Singapore': 'Asia',
  'Thailand': 'Asia',
  'South Korea': 'Asia',
  'India': 'Asia',
  'Laos': 'Asia',
  'Vietnam': 'Asia',
  'Brazil': 'South America',
  'Argentina': 'South America',
  'Peru': 'South America',
  'Chile': 'South America',
  'Colombia': 'South America',
  'South Africa': 'Africa',
  'Egypt': 'Africa',
  'Morocco': 'Africa',
  'Nigeria': 'Africa',
  'Australia': 'Oceania',
  'New Zealand': 'Oceania',
};