export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          category: string
          content: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_trending: boolean | null
          published_at: string
          source: string | null
          title: string
          updated_at: string
          url: string | null
          views: number | null
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_trending?: boolean | null
          published_at?: string
          source?: string | null
          title: string
          updated_at?: string
          url?: string | null
          views?: number | null
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_trending?: boolean | null
          published_at?: string
          source?: string | null
          title?: string
          updated_at?: string
          url?: string | null
          views?: number | null
        }
        Relationships: []
      }
      asset_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      assets: {
        Row: {
          category_id: string | null
          created_at: string
          current_value: number | null
          description: string | null
          id: string
          image_url: string | null
          purchase_date: string | null
          purchase_price: number | null
          serial_number: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          current_value?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          current_value?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "asset_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          amount: number
          application_date: string
          application_month: string
          created_at: string
          due_date: string
          id: string
          interest_rate: number
          monthly_limit_used: number
          paid_date: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          application_date?: string
          application_month?: string
          created_at?: string
          due_date: string
          id?: string
          interest_rate?: number
          monthly_limit_used?: number
          paid_date?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          application_date?: string
          application_month?: string
          created_at?: string
          due_date?: string
          id?: string
          interest_rate?: number
          monthly_limit_used?: number
          paid_date?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      overdue_charges: {
        Row: {
          charge_amount: number
          charge_date: string
          created_at: string
          id: string
          loan_application_id: string
        }
        Insert: {
          charge_amount?: number
          charge_date?: string
          created_at?: string
          id?: string
          loan_application_id: string
        }
        Update: {
          charge_amount?: number
          charge_date?: string
          created_at?: string
          id?: string
          loan_application_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "overdue_charges_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          location_lat: number | null
          location_lng: number | null
          phone_number: string | null
          province: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          last_name?: string | null
          location_lat?: number | null
          location_lng?: number | null
          phone_number?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          location_lat?: number | null
          location_lng?: number | null
          phone_number?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string
          id: string
          provider_id: string
          rating: number
          service_request_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          provider_id: string
          rating: number
          service_request_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          provider_id?: string
          rating?: number
          service_request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          bio: string | null
          created_at: string | null
          daily_rate: number | null
          hourly_rate: number | null
          id: string
          id_document_url: string | null
          is_online: boolean | null
          last_seen: string | null
          rating: number | null
          service_category: Database["public"]["Enums"]["service_category"]
          status: Database["public"]["Enums"]["provider_status"] | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string
          verification_document_url: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          daily_rate?: number | null
          hourly_rate?: number | null
          id?: string
          id_document_url?: string | null
          is_online?: boolean | null
          last_seen?: string | null
          rating?: number | null
          service_category: Database["public"]["Enums"]["service_category"]
          status?: Database["public"]["Enums"]["provider_status"] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id: string
          verification_document_url?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          daily_rate?: number | null
          hourly_rate?: number | null
          id?: string
          id_document_url?: string | null
          is_online?: boolean | null
          last_seen?: string | null
          rating?: number | null
          service_category?: Database["public"]["Enums"]["service_category"]
          status?: Database["public"]["Enums"]["provider_status"] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string
          verification_document_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_providers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          address: string | null
          assigned_provider_id: string | null
          budget_max: number | null
          budget_min: number | null
          created_at: string | null
          customer_id: string
          description: string
          id: string
          location_lat: number
          location_lng: number
          preferred_date: string | null
          service_category: Database["public"]["Enums"]["service_category"]
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          assigned_provider_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string | null
          customer_id: string
          description: string
          id?: string
          location_lat: number
          location_lng: number
          preferred_date?: string | null
          service_category: Database["public"]["Enums"]["service_category"]
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          assigned_provider_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string | null
          customer_id?: string
          description?: string
          id?: string
          location_lat?: number
          location_lng?: number
          preferred_date?: string | null
          service_category?: Database["public"]["Enums"]["service_category"]
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_assigned_provider_id_fkey"
            columns: ["assigned_provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stolen_reports: {
        Row: {
          asset_id: string
          id: string
          notes: string | null
          police_report_number: string | null
          report_date: string
          status: string | null
          user_id: string
        }
        Insert: {
          asset_id: string
          id?: string
          notes?: string | null
          police_report_number?: string | null
          report_date?: string
          status?: string | null
          user_id: string
        }
        Update: {
          asset_id?: string
          id?: string
          notes?: string | null
          police_report_number?: string | null
          report_date?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stolen_reports_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      student_activities: {
        Row: {
          activity_id: string
          completed_date: string | null
          created_at: string
          evidence_urls: string[] | null
          id: string
          mentor_feedback: string | null
          started_date: string | null
          status: string
          student_id: string
          student_notes: string | null
          updated_at: string
        }
        Insert: {
          activity_id: string
          completed_date?: string | null
          created_at?: string
          evidence_urls?: string[] | null
          id?: string
          mentor_feedback?: string | null
          started_date?: string | null
          status?: string
          student_id: string
          student_notes?: string | null
          updated_at?: string
        }
        Update: {
          activity_id?: string
          completed_date?: string | null
          created_at?: string
          evidence_urls?: string[] | null
          id?: string
          mentor_feedback?: string | null
          started_date?: string | null
          status?: string
          student_id?: string
          student_notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "work_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      time_logs: {
        Row: {
          employee_id: string
          event_type: string
          id: string
          notes: string | null
          timestamp: string
        }
        Insert: {
          employee_id: string
          event_type: string
          id?: string
          notes?: string | null
          timestamp?: string
        }
        Update: {
          employee_id?: string
          event_type?: string
          id?: string
          notes?: string | null
          timestamp?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          account_holder_name: string | null
          account_number: string | null
          account_type: string | null
          bank_name: string | null
          branch_code: string | null
          clothing: number | null
          contact_number: string | null
          created_at: string | null
          education: number | null
          employer_company_name: string | null
          employment_status: string | null
          first_name: string
          groceries: number | null
          id: string
          id_number: string | null
          insurance: number | null
          is_admin: boolean | null
          last_name: string
          loan_overdraft: number | null
          medical_aid: number | null
          mortgage_rent: number | null
          net_salary: number
          next_of_kin_contact: string | null
          next_of_kin_first_name: string | null
          next_of_kin_last_name: string | null
          next_of_kin_relationship: string | null
          transport_costs: number | null
          updated_at: string | null
          user_id: string
          username: string | null
          utilities: number | null
          vehicle_installment: number | null
          work_address: string | null
          work_contact_number: string | null
        }
        Insert: {
          account_holder_name?: string | null
          account_number?: string | null
          account_type?: string | null
          bank_name?: string | null
          branch_code?: string | null
          clothing?: number | null
          contact_number?: string | null
          created_at?: string | null
          education?: number | null
          employer_company_name?: string | null
          employment_status?: string | null
          first_name: string
          groceries?: number | null
          id?: string
          id_number?: string | null
          insurance?: number | null
          is_admin?: boolean | null
          last_name: string
          loan_overdraft?: number | null
          medical_aid?: number | null
          mortgage_rent?: number | null
          net_salary?: number
          next_of_kin_contact?: string | null
          next_of_kin_first_name?: string | null
          next_of_kin_last_name?: string | null
          next_of_kin_relationship?: string | null
          transport_costs?: number | null
          updated_at?: string | null
          user_id: string
          username?: string | null
          utilities?: number | null
          vehicle_installment?: number | null
          work_address?: string | null
          work_contact_number?: string | null
        }
        Update: {
          account_holder_name?: string | null
          account_number?: string | null
          account_type?: string | null
          bank_name?: string | null
          branch_code?: string | null
          clothing?: number | null
          contact_number?: string | null
          created_at?: string | null
          education?: number | null
          employer_company_name?: string | null
          employment_status?: string | null
          first_name?: string
          groceries?: number | null
          id?: string
          id_number?: string | null
          insurance?: number | null
          is_admin?: boolean | null
          last_name?: string
          loan_overdraft?: number | null
          medical_aid?: number | null
          mortgage_rent?: number | null
          net_salary?: number
          next_of_kin_contact?: string | null
          next_of_kin_first_name?: string | null
          next_of_kin_last_name?: string | null
          next_of_kin_relationship?: string | null
          transport_costs?: number | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
          utilities?: number | null
          vehicle_installment?: number | null
          work_address?: string | null
          work_contact_number?: string | null
        }
        Relationships: []
      }
      work_activities: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          module_id: string
          order_index: number
          requires_evidence: boolean
          title: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          module_id: string
          order_index: number
          requires_evidence?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          module_id?: string
          order_index?: number
          requires_evidence?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_activities_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "work_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      work_modules: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          order_index: number
          title: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_distance: {
        Args: { lat1: number; lng1: number; lat2: number; lng2: number }
        Returns: number
      }
      create_overdue_charges: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_nearby_providers: {
        Args: {
          user_lat: number
          user_lng: number
          service_type?: Database["public"]["Enums"]["service_category"]
          max_distance?: number
        }
        Returns: {
          provider_id: string
          user_id: string
          name: string
          avatar_url: string
          service_category: Database["public"]["Enums"]["service_category"]
          hourly_rate: number
          bio: string
          rating: number
          total_reviews: number
          is_online: boolean
          distance: number
          location_lat: number
          location_lng: number
        }[]
      }
      get_user_role: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      increment_views: {
        Args: { article_id: string }
        Returns: undefined
      }
    }
    Enums: {
      provider_status: "pending" | "verified" | "suspended"
      service_category:
        | "plumber"
        | "electrician"
        | "gardener"
        | "painter"
        | "welder"
      user_role: "customer" | "service_provider" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      provider_status: ["pending", "verified", "suspended"],
      service_category: [
        "plumber",
        "electrician",
        "gardener",
        "painter",
        "welder",
      ],
      user_role: ["customer", "service_provider", "admin"],
    },
  },
} as const
