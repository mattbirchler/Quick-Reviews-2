// Database types for Supabase
// These correspond to the SQL schema that should be run in Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          metadata: string | null;
          review_text: string | null;
          score: number;
          poster_url: string | null;
          poster_source: string | null;
          theme_key: string;
          custom_colors: Json | null;
          score_names: string[];
          font_sizes: Json;
          media_type: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          metadata?: string | null;
          review_text?: string | null;
          score?: number;
          poster_url?: string | null;
          poster_source?: string | null;
          theme_key?: string;
          custom_colors?: Json | null;
          score_names?: string[];
          font_sizes?: Json;
          media_type?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          metadata?: string | null;
          review_text?: string | null;
          score?: number;
          poster_url?: string | null;
          poster_source?: string | null;
          theme_key?: string;
          custom_colors?: Json | null;
          score_names?: string[];
          font_sizes?: Json;
          media_type?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_preferences: {
        Row: {
          user_id: string;
          default_theme: string;
          default_score_names: string[] | null;
          default_layout: string;
        };
        Insert: {
          user_id: string;
          default_theme?: string;
          default_score_names?: string[] | null;
          default_layout?: string;
        };
        Update: {
          user_id?: string;
          default_theme?: string;
          default_score_names?: string[] | null;
          default_layout?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_preferences_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export interface CustomColors {
  background?: string;
  scores?: {
    poor?: string;
    okay?: string;
    good?: string;
    great?: string;
  };
}

export interface FontSizes {
  title: number;
  metadata: number;
  body: number;
}

// Helper types
export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];
