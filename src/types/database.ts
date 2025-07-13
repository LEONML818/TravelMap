export interface Database {
  public: {
    Tables: {
      user_cities: {
        Row: {
          id: string;
          user_id: string;
          city_id: string;
          city_name: string;
          country: string;
          latitude: number;
          longitude: number;
          emoji: string;
          visited: boolean;
          is_custom: boolean;
          importance: string;
          population: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          city_id: string;
          city_name: string;
          country: string;
          latitude: number;
          longitude: number;
          emoji: string;
          visited: boolean;
          is_custom: boolean;
          importance: string;
          population?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          city_id?: string;
          city_name?: string;
          country?: string;
          latitude?: number;
          longitude?: number;
          emoji?: string;
          visited?: boolean;
          is_custom?: boolean;
          importance?: string;
          population?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}