import { useState, useEffect } from 'react';
import { City } from '../types';
import { WORLD_CITIES as defaultCities } from '../data/cities';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAddingCity, setIsAddingCity] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(2);

  // Load cities on mount
  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    setIsLoading(true);
    try {
      // For now, use local storage until Supabase is properly set up
      const savedCities = localStorage.getItem('travelMapCities');
      if (savedCities) {
        try {
          const parsed = JSON.parse(savedCities);
          setCities(parsed);
        } catch {
          setCities(defaultCities.map(city => ({ ...city, visited: false })));
        }
      } else {
        setCities(defaultCities.map(city => ({ ...city, visited: false })));
      }
    } catch (error) {
      console.error('Error loading cities:', error);
      setCities(defaultCities.map(city => ({ ...city, visited: false })));
    } finally {
      setIsLoading(false);
    }
  };

  const saveCitiesToStorage = (updatedCities: City[]) => {
    localStorage.setItem('travelMapCities', JSON.stringify(updatedCities));
  };

  const toggleCityVisited = (cityId: string) => {
    const updatedCities = cities.map(city => {
      if (city.id === cityId) {
        return {
          ...city,
          visited: !city.visited,
          visitedDate: !city.visited ? Date.now() : undefined
        };
      }
      return city;
    });

    setCities(updatedCities);
    saveCitiesToStorage(updatedCities);
  };

  const updateCityName = (cityId: string, newName: string) => {
    const updatedCities = cities.map(city => {
      if (city.id === cityId) {
        return { ...city, name: newName };
      }
      return city;
    });

    setCities(updatedCities);
    saveCitiesToStorage(updatedCities);
  };

  const addCustomCity = (newCity: Omit<City, 'id'>) => {
    setIsAddingCity(true);
    
    const customCity: City = {
      ...newCity,
      id: `custom-${Date.now()}-${Math.random()}`,
      isCustom: true,
      visited: false
    };

    const updatedCities = [...cities, customCity];
    setCities(updatedCities);
    saveCitiesToStorage(updatedCities);
    
    setIsAddingCity(false);
  };

  const removeCustomCity = (cityId: string) => {
    const updatedCities = cities.filter(city => city.id !== cityId);
    setCities(updatedCities);
    saveCitiesToStorage(updatedCities);
  };

  const updateZoom = (zoom: number) => {
    setCurrentZoom(zoom);
  };

  // Computed values
  const allCities = cities;
  const visitedCities = cities.filter(city => city.visited);
  const visitedCountries = [...new Set(visitedCities.map(city => city.country))];
  const totalCities = cities.length;

  const mapStats = {
    totalCities: cities.length,
    visitedCities: visitedCities.length,
    visitedCountries: visitedCountries,
    visitedPercentage: cities.length > 0 ? Math.round((visitedCities.length / cities.length) * 100) : 0,
    customCities: cities.filter(city => city.isCustom).length,
    visitedContinents: [...new Set(visitedCities.map(city => {
      // You'll need to add continent mapping logic here
      // For now, returning empty array to prevent the error
      return [];
    }).flat())]
  };

  return {
    cities,
    allCities,
    visitedCities,
    visitedCountries,
    toggleCityVisited,
    updateCityName,
    addCustomCity,
    removeCustomCity,
    isAddingCity,
    totalCities,
    updateZoom,
    currentZoom,
    mapStats,
    isLoading,
    isSyncing
  };
}