export interface ProductItem {
  id: string;
  category: string;
  name: string;
  gsm: string;
  composition: string;
  silhouette: string;
  description: string;
  features: string[];
  image: string;
  macroDetail: string;
}

export interface ManufacturingHub {
  id: string;
  city: string;
  state: string;
  specialty: string;
  capabilities: string[];
  capacity: string;
  leadTime: string;
  lat: number; // For map projection
  lng: number;
  description: string;
}

export interface CustomizationTech {
  id: string;
  name: string;
  type: string;
  durability: string;
  minOrder: string;
  description: string;
  bestFor: string;
}

export interface ProjectInquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  productType: string;
  estimatedQuantity: string;
  targetDate: string;
  details: string;
}
