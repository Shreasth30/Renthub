import { Property } from "@/types";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Luxury 3BHK with Sea View",
    description: "Stunning luxury 3-bedroom apartment with panoramic sea view overlooking the Arabian Sea. Features high ceilings, modern amenities, and premium finishes throughout.",
    city: "Mumbai",
    address: "Bandra West, Mumbai",
    bhk_type: "3BHK",
    property_type: "fully_furnished",
    rent: 85000,
    deposit: 300000,
    maintenance: 8000,
    photos: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop"],
    is_active: true,
    is_boosted: true,
    created_at: new Date().toISOString(),
    owner_id: "owner-1",
    floor_number: 12,
    total_floors: 20,
    available_from: "2024-04-01",
    occupancy_type: "independent",
    preferred_tenant: "any",
    parking: "both",
    pet_friendly: true,
    is_negotiable: true,
    furnishing_items: ["AC", "Wardrobe", "Sofa", "Bed", "Dining Table", "TV"],
    nearby_landmarks: [
      { name: "Bandra Station", distance: "0.5 km" },
      { name: "Worli Sea Face", distance: "2 km" }
    ],
    views_count: 120
  },
  {
    id: "2",
    title: "Modern Studio near Metro",
    description: "Compact and modern studio apartment located within walking distance of Indiranagar Metro Station. Perfect for working professionals with minimalist design and smart space utilization.",
    city: "Bengaluru",
    address: "Indiranagar, Bengaluru",
    bhk_type: "Studio",
    property_type: "semi_furnished",
    rent: 25000,
    deposit: 100000,
    maintenance: 2000,
    photos: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"],
    is_active: true,
    is_boosted: false,
    created_at: new Date().toISOString(),
    owner_id: "owner-2",
    floor_number: 3,
    total_floors: 5,
    available_from: "2024-03-25",
    occupancy_type: "independent",
    preferred_tenant: "working_professional",
    parking: "2_wheeler",
    pet_friendly: false,
    is_negotiable: false,
    furnishing_items: ["AC", "Bed"],
    nearby_landmarks: [
      { name: "Indiranagar Metro", distance: "0.3 km" },
      { name: "Commercial Street", distance: "1 km" }
    ],
    views_count: 45
  },
  {
    id: "3",
    title: "Spacious 2BHK in Gated Community",
    description: "Beautiful 2-bedroom apartment in a premium gated community with 24/7 security and excellent amenities. Ideal for families with modern infrastructure and green spaces.",
    city: "Hyderabad",
    address: "Gachibowli, Hyderabad",
    bhk_type: "2BHK",
    property_type: "raw",
    rent: 35000,
    deposit: 70000,
    maintenance: 3500,
    photos: [
      "https://images.unsplash.com/photo-1560448204-61dc36dc98ce?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop"
    ],
    is_active: true,
    is_boosted: false,
    created_at: new Date().toISOString(),
    owner_id: "owner-1",
    floor_number: 5,
    total_floors: 10,
    available_from: "2024-04-15",
    occupancy_type: "independent",
    preferred_tenant: "family",
    parking: "4_wheeler",
    pet_friendly: true,
    is_negotiable: true,
    furnishing_items: null,
    nearby_landmarks: [
      { name: "Gachibowli IT Park", distance: "0.8 km" },
      { name: "IKEA", distance: "2 km" }
    ],
    views_count: 89
  }
];

export const MOCK_USER_PROFILE = {
  id: "owner-1",
  full_name: "Vikram Malhotra",
  role: "owner" as const,
  avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  phone: "+91 98765 43210",
  is_verified: true,
  created_at: new Date().toISOString(),
};
