export type Role = "owner" | "tenant" | "both";

export interface Profile {
  id: string;
  full_name: string | null;
  role: Role | null;
  phone: string | null;
  is_verified: boolean;
  avatar_url: string | null;
  created_at: string;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  rent: number;
  deposit: number;
  maintenance: number | null;
  is_negotiable: boolean;
  property_type: "raw" | "semi_furnished" | "fully_furnished";
  occupancy_type: "independent" | "with_owner";
  bhk_type: "1BHK" | "2BHK" | "3BHK" | "Studio";
  floor_number: number;
  total_floors: number;
  preferred_tenant: "family" | "bachelor" | "working_professional" | "students" | "any";
  parking: "2_wheeler" | "4_wheeler" | "both" | "none";
  pet_friendly: boolean;
  furnishing_items: string[] | null;
  nearby_landmarks: { name: string; distance: string }[] | null;
  available_from: string;
  photos: string[];
  is_boosted: boolean;
  is_active: boolean;
  views_count: number;
  created_at: string;
}

export interface SavedProperty {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: Property; // for joined queries
}
