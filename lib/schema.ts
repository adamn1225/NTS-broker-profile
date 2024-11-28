import { Database } from './database.types';

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Auto = Database['public']['Tables']['auto']['Row'];
export type Equipment = Database['public']['Tables']['equipment']['Row'];
export type TruckLoads = Database['public']['Tables']['ftl_ltl']['Row'];
export type Testimonials = Database['public']['Tables']['testimonials']['Row'];