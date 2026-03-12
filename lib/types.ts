export type ComplaintStatus = "pending" | "approved" | "rejected" | "resolved";

export interface User {
  id: string;
  name: string;
  whatsapp_number: string;
  email: string | null;
  created_at: string;
}

export interface Complaint {
  id: string;
  user_id: string;
  description: string;
  category: string;
  location: string;
  media_urls: string[];
  status: ComplaintStatus;
  admin_notes: string | null;
  created_at: string;
  // joined
  user?: User;
}

export interface Message {
  id: string;
  complaint_id: string;
  sender: "user" | "didi" | "admin";
  content: string;
  created_at: string;
}

export const CATEGORIES = [
  "water_supply",
  "roads_transport",
  "electricity",
  "sanitation",
  "healthcare",
  "education",
  "corruption",
  "public_safety",
  "housing",
  "other",
] as const;

export const BILASPUR_WARDS = [
  "Ward 1 - Torwa",
  "Ward 2 - Sarkanda",
  "Ward 3 - Mangla",
  "Ward 4 - Vyapar Vihar",
  "Ward 5 - Uslapur",
  "Ward 6 - Tarbahar",
  "Ward 7 - Tifra",
  "Ward 8 - Seepat Road",
  "Ward 9 - Sakri",
  "Ward 10 - Kota",
  "Ward 11 - Nehru Nagar",
  "Ward 12 - Chakarbhata",
  "Ward 13 - Masturi Road",
  "Ward 14 - Sirgitti",
  "Ward 15 - Civil Lines",
  "Ward 16 - Railway Colony",
  "Ward 17 - Jarhabhata",
  "Ward 18 - Amanaka",
  "Ward 19 - Link Road",
  "Ward 20 - Mopka",
] as const;

export type Locale = "en" | "hi" | "cg";
