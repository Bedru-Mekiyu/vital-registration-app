export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          blockchain_hash: string | null
          certificate_data: Json
          certificate_number: string
          certificate_type: Database["public"]["Enums"]["certificate_type"]
          created_at: string
          holder_name: string
          id: string
          issued_at: string | null
          qr_code_data: string | null
          status: Database["public"]["Enums"]["certificate_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          blockchain_hash?: string | null
          certificate_data?: Json
          certificate_number: string
          certificate_type: Database["public"]["Enums"]["certificate_type"]
          created_at?: string
          holder_name: string
          id?: string
          issued_at?: string | null
          qr_code_data?: string | null
          status?: Database["public"]["Enums"]["certificate_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          blockchain_hash?: string | null
          certificate_data?: Json
          certificate_number?: string
          certificate_type?: Database["public"]["Enums"]["certificate_type"]
          created_at?: string
          holder_name?: string
          id?: string
          issued_at?: string | null
          qr_code_data?: string | null
          status?: Database["public"]["Enums"]["certificate_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      consent_records: {
        Row: {
          consent_type: string
          created_at: string
          expires_at: string | null
          granted: boolean
          id: string
          institution_id: string
          user_id: string
        }
        Insert: {
          consent_type: string
          created_at?: string
          expires_at?: string | null
          granted: boolean
          id?: string
          institution_id: string
          user_id: string
        }
        Update: {
          consent_type?: string
          created_at?: string
          expires_at?: string | null
          granted?: boolean
          id?: string
          institution_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_consent_institution"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          applicant_id: string
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          clerk_id: string | null
          created_at: string
          event_data: Json
          event_type: Database["public"]["Enums"]["certificate_type"]
          id: string
          institution_id: string | null
          priority_level: number | null
          regional_admin_id: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          supporting_documents: Json | null
          updated_at: string
        }
        Insert: {
          applicant_id: string
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          clerk_id?: string | null
          created_at?: string
          event_data?: Json
          event_type: Database["public"]["Enums"]["certificate_type"]
          id?: string
          institution_id?: string | null
          priority_level?: number | null
          regional_admin_id?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          supporting_documents?: Json | null
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          clerk_id?: string | null
          created_at?: string
          event_data?: Json
          event_type?: Database["public"]["Enums"]["certificate_type"]
          id?: string
          institution_id?: string | null
          priority_level?: number | null
          regional_admin_id?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          supporting_documents?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_events_institution"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      family_relationships: {
        Row: {
          certificate_id: string | null
          created_at: string
          id: string
          person_id: string
          related_person_id: string | null
          relationship_type: string
        }
        Insert: {
          certificate_id?: string | null
          created_at?: string
          id?: string
          person_id: string
          related_person_id?: string | null
          relationship_type: string
        }
        Update: {
          certificate_id?: string | null
          created_at?: string
          id?: string
          person_id?: string
          related_person_id?: string | null
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_relationships_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      gamification_rewards: {
        Row: {
          badge_type: string
          description: string | null
          earned_at: string
          id: string
          points_earned: number
          user_id: string
        }
        Insert: {
          badge_type: string
          description?: string | null
          earned_at?: string
          id?: string
          points_earned: number
          user_id: string
        }
        Update: {
          badge_type?: string
          description?: string | null
          earned_at?: string
          id?: string
          points_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      institutions: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          license_number: string | null
          name: string
          type: Database["public"]["Enums"]["institution_type"]
          updated_at: string
          verification_score: number | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          license_number?: string | null
          name: string
          type: Database["public"]["Enums"]["institution_type"]
          updated_at?: string
          verification_score?: number | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          license_number?: string | null
          name?: string
          type?: Database["public"]["Enums"]["institution_type"]
          updated_at?: string
          verification_score?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          related_certificate_id: string | null
          related_event_id: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          related_certificate_id?: string | null
          related_event_id?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          related_certificate_id?: string | null
          related_event_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_notifications_certificate"
            columns: ["related_certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_notifications_event"
            columns: ["related_event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string
          gender: string | null
          id: string
          institution_id: string | null
          nationality: string | null
          phone_number: string | null
          place_of_birth: string | null
          points: number | null
          preferred_language: string | null
          profile_completion_percentage: number | null
          profile_picture_url: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name: string
          gender?: string | null
          id?: string
          institution_id?: string | null
          nationality?: string | null
          phone_number?: string | null
          place_of_birth?: string | null
          points?: number | null
          preferred_language?: string | null
          profile_completion_percentage?: number | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          institution_id?: string | null
          nationality?: string | null
          phone_number?: string | null
          place_of_birth?: string | null
          points?: number | null
          preferred_language?: string | null
          profile_completion_percentage?: number | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_institution"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_logs: {
        Row: {
          certificate_id: string
          created_at: string
          id: string
          verification_details: Json | null
          verification_result: boolean
          verifier_ip: string | null
        }
        Insert: {
          certificate_id: string
          created_at?: string
          id?: string
          verification_details?: Json | null
          verification_result: boolean
          verifier_ip?: string | null
        }
        Update: {
          certificate_id?: string
          created_at?: string
          id?: string
          verification_details?: Json | null
          verification_result?: boolean
          verifier_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_logs_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_certificate_number: {
        Args: { cert_type: Database["public"]["Enums"]["certificate_type"] }
        Returns: string
      }
    }
    Enums: {
      certificate_status: "pending" | "processing" | "completed" | "rejected"
      certificate_type: "birth" | "marriage" | "death" | "divorce" | "adoption"
      event_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "cancelled"
      institution_type:
        | "hospital"
        | "court"
        | "religious"
        | "civil_registry"
        | "other"
      notification_type:
        | "event_approved"
        | "event_rejected"
        | "certificate_ready"
        | "verification_request"
        | "system_update"
      user_role:
        | "citizen"
        | "institutional_user"
        | "clerk"
        | "regional_admin"
        | "national_admin"
        | "auditor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      certificate_status: ["pending", "processing", "completed", "rejected"],
      certificate_type: ["birth", "marriage", "death", "divorce", "adoption"],
      event_status: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "cancelled",
      ],
      institution_type: [
        "hospital",
        "court",
        "religious",
        "civil_registry",
        "other",
      ],
      notification_type: [
        "event_approved",
        "event_rejected",
        "certificate_ready",
        "verification_request",
        "system_update",
      ],
      user_role: [
        "citizen",
        "institutional_user",
        "clerk",
        "regional_admin",
        "national_admin",
        "auditor",
      ],
    },
  },
} as const
