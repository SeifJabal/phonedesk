export interface Shop {
  _id: string;
  businessName: string;
  slug: string;
  description: string;
  shortDescription: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    complement?: string;
    postalCode: string;
    city: string;
    citySlug: string;
    region: string;
    regionSlug: string;
    country: string;
    coordinates: {
      type: 'Point';
      coordinates: [number, number]; // [lng, lat]
    };
  };
  hours: {
    [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  deviceTypes: string[];
  brands: string[];
  serviceTypes: string[];
  features: {
    atHomeService: boolean;
    expressRepair: boolean;
    warranty: boolean;
    warrantyDuration?: number;
    originalParts: boolean;
    dataRecovery: boolean;
    freeEstimate: boolean;
  };
  logo?: string;
  coverImage?: string;
  photos: Array<{
    url: string;
    caption?: string;
    order: number;
  }>;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
    snapchat?: string;
  };
  rating: {
    average: number;
    count: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  verified: boolean;
  status: 'pending' | 'active' | 'suspended' | 'closed';
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    startDate: string;
    endDate: string;
    autoRenew: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  shopId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  serviceType?: string;
  deviceType?: string;
  repairDate?: string;
  photos?: string[];
  response?: {
    content: string;
    respondedAt: string;
    respondedBy: string;
  };
  verified: boolean;
  helpful: {
    yes: number;
    no: number;
  };
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface Quote {
  _id: string;
  quoteNumber: string;
  shopId: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  deviceType: string;
  brand: string;
  model: string;
  serviceType: string;
  issueDescription: string;
  photos?: string[];
  urgency: 'standard' | 'urgent' | 'express';
  preferredDate?: string;
  preferredTime?: string;
  atHomeService: boolean;
  response?: {
    price: number;
    duration: number;
    availableDate: string;
    notes: string;
    respondedAt: string;
  };
  status: 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  updatedAt: string;
}

export interface Region {
  _id: string;
  name: string;
  slug: string;
  code: string;
  country: string;
  stats: {
    shopCount: number;
    cityCount: number;
    reviewCount: number;
    averageRating: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    content: string;
    keywords: string[];
  };
  isActive: boolean;
  order: number;
}

export interface City {
  _id: string;
  name: string;
  slug: string;
  postalCodes: string[];
  regionId: string;
  regionSlug: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
  stats: {
    shopCount: number;
    reviewCount: number;
    averageRating: number;
    population?: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    content: string;
    keywords: string[];
  };
  isActive: boolean;
  featured: boolean;
  order: number;
}

export interface User {
  _id: string;
  email: string;
  role: 'customer' | 'business' | 'admin';
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  shopId?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  shopId: string;
  name: string;
  description: string;
  deviceType: string;
  brand: string;
  model: string;
  serviceType: string;
  price: number;
  priceRange?: {
    min: number;
    max: number;
  };
  currency: string;
  duration: number;
  partsInfo: {
    type: 'original' | 'oem' | 'aftermarket';
    warranty: number;
    inStock: boolean;
  };
  available: boolean;
  isActive: boolean;
}
