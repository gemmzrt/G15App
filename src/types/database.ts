export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invites: {
        Row: {
          id: string
          code: string
          email: string
          segment: 'YOUNG' | 'ADULT'
          used: boolean
          claimed_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          email: string
          segment: 'YOUNG' | 'ADULT'
          used?: boolean
          claimed_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          email?: string
          segment?: 'YOUNG' | 'ADULT'
          used?: boolean
          claimed_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          is_celiac: boolean
          avatar_url: string | null
          segment: 'YOUNG' | 'ADULT'
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          is_celiac?: boolean
          avatar_url?: string | null
          segment: 'YOUNG' | 'ADULT'
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          is_celiac?: boolean
          avatar_url?: string | null
          segment?: 'YOUNG' | 'ADULT'
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      rsvps: {
        Row: {
          id: string
          user_id: string
          status: 'PENDING' | 'CONFIRMED' | 'DECLINED'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status: 'PENDING' | 'CONFIRMED' | 'DECLINED'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'PENDING' | 'CONFIRMED' | 'DECLINED'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      table_assignments: {
        Row: {
          id: string
          user_id: string
          table_number: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          table_number: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          table_number?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      claim_invite_code: {
        Args: { code: string }
        Returns: { success: boolean; message: string }
      }
    }
  }
}
