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
      auto: {
        Row: {
          date: string | null
          destination_zip: string | null
          e_make: string | null
          e_model: string | null
          e_year: string | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          origin_zip: string | null
          phone_number: string | null
        }
        Insert: {
          date?: string | null
          destination_zip?: string | null
          e_make?: string | null
          e_model?: string | null
          e_year?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          origin_zip?: string | null
          phone_number?: string | null
        }
        Update: {
          date?: string | null
          destination_zip?: string | null
          e_make?: string | null
          e_model?: string | null
          e_year?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          origin_zip?: string | null
          phone_number?: string | null
        }
        Relationships: []
      }
      equipment: {
        Row: {
          date: string | null
          destination_zip: string | null
          e_make: string | null
          e_model: string | null
          e_year: string | null
          email: string | null
          first_name: string | null
          height: string | null
          id: number
          last_name: string | null
          length: string | null
          machine_weight: string | null
          origin_zip: string | null
          phone_number: string | null
          width: string | null
        }
        Insert: {
          date?: string | null
          destination_zip?: string | null
          e_make?: string | null
          e_model?: string | null
          e_year?: string | null
          email?: string | null
          first_name?: string | null
          height?: string | null
          id?: number
          last_name?: string | null
          length?: string | null
          machine_weight?: string | null
          origin_zip?: string | null
          phone_number?: string | null
          width?: string | null
        }
        Update: {
          date?: string | null
          destination_zip?: string | null
          e_make?: string | null
          e_model?: string | null
          e_year?: string | null
          email?: string | null
          first_name?: string | null
          height?: string | null
          id?: number
          last_name?: string | null
          length?: string | null
          machine_weight?: string | null
          origin_zip?: string | null
          phone_number?: string | null
          width?: string | null
        }
        Relationships: []
      }
      ftl_ltl: {
        Row: {
          commodity: string | null
          count: string | null
          destination_zip: string | null
          email: string | null
          first_name: string | null
          height: string | null
          id: number
          last_name: string | null
          length: string | null
          ltl_value: string | null
          machine_weight: string | null
          origin_zip: string | null
          phone_number: string | null
          width: string | null
        }
        Insert: {
          commodity?: string | null
          count?: string | null
          destination_zip?: string | null
          email?: string | null
          first_name?: string | null
          height?: string | null
          id?: number
          last_name?: string | null
          length?: string | null
          ltl_value?: string | null
          machine_weight?: string | null
          origin_zip?: string | null
          phone_number?: string | null
          width?: string | null
        }
        Update: {
          commodity?: string | null
          count?: string | null
          destination_zip?: string | null
          email?: string | null
          first_name?: string | null
          height?: string | null
          id?: number
          last_name?: string | null
          length?: string | null
          ltl_value?: string | null
          machine_weight?: string | null
          origin_zip?: string | null
          phone_number?: string | null
          width?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
