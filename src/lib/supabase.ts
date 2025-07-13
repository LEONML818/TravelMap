import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client only if configured, otherwise use null
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Auth helper functions
export const auth = {
  signUp: async (email: string, password: string) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured. Please set up your environment variables.') };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured. Please set up your environment variables.') };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    if (!supabase) {
      return { error: new Error('Supabase not configured') };
    }
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    if (!supabase) {
      return { user: null, error: null };
    }
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    if (!supabase) {
      // Return a mock subscription that does nothing
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helper functions
export const db = {
  // Get user's visited cities
  getUserCities: async (userId: string) => {
    if (!supabase) {
      return { data: [], error: new Error('Supabase not configured') };
    }
    const { data, error } = await supabase
      .from('user_cities')
      .select('*')
      .eq('user_id', userId);
    return { data, error };
  },

  // Add or update a city for user
  upsertUserCity: async (userId: string, cityData: {
    city_id: string;
    city_name: string;
    country: string;
    latitude: number;
    longitude: number;
    emoji: string;
    visited: boolean;
    is_custom: boolean;
    importance: string;
    population?: number;
  }) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') };
    }
    const { data, error } = await supabase
      .from('user_cities')
      .upsert({
        user_id: userId,
        ...cityData,
        updated_at: new Date().toISOString()
      });
    return { data, error };
  },

  // Remove a city for user
  removeUserCity: async (userId: string, cityId: string) => {
    if (!supabase) {
      return { error: new Error('Supabase not configured') };
    }
    const { error } = await supabase
      .from('user_cities')
      .delete()
      .eq('user_id', userId)
      .eq('city_id', cityId);
    return { error };
  },

  // Sync multiple cities at once
  syncUserCities: async (userId: string, cities: any[]) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') };
    }
    
    // First, delete all existing cities for this user
    await supabase
      .from('user_cities')
      .delete()
      .eq('user_id', userId);

    // Then insert all current cities
    const citiesToInsert = cities.map(city => ({
      user_id: userId,
      city_id: city.id,
      city_name: city.name,
      country: city.country,
      latitude: city.coordinates[0],
      longitude: city.coordinates[1],
      emoji: city.emoji,
      visited: city.visited,
      is_custom: city.isCustom || false,
      importance: city.importance,
      population: city.population || null,
      updated_at: new Date().toISOString()
    }));

    if (citiesToInsert.length > 0) {
      const { data, error } = await supabase
        .from('user_cities')
        .insert(citiesToInsert);
      return { data, error };
    }

    return { data: null, error: null };
  }
};