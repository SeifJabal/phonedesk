import api from '../api';
import type { Shop } from '@/types';

export const shopService = {
  // Get all shops with filters
  getShops: async (params?: {
    region?: string;
    city?: string;
    deviceType?: string;
    brand?: string;
    serviceType?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) => {
    const response = await api.get<{ success: boolean; data: Shop[]; pagination: any }>('/shops', { params });
    return response.data;
  },

  // Get shop by ID
  getShopById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Shop }>(`/shops/${id}`);
    return response.data.data;
  },

  // Get shop by slug
  getShopBySlug: async (slug: string) => {
    const response = await api.get<{ success: boolean; data: Shop }>(`/shops/slug/${slug}`);
    return response.data.data;
  },

  // Get shops by city
  getShopsByCity: async (citySlug: string, params?: any) => {
    const response = await api.get<{ success: boolean; data: Shop[] }>(`/cities/${citySlug}/shops`, { params });
    return response.data.data;
  },

  // Search shops
  searchShops: async (query: string, params?: any) => {
    const response = await api.get<{ success: boolean; data: Shop[] }>('/shops/search', {
      params: { q: query, ...params },
    });
    return response.data.data;
  },
};

export const reviewService = {
  // Get reviews for a shop
  getShopReviews: async (shopId: string, params?: { page?: number; limit?: number; sort?: string }) => {
    const response = await api.get(`/shops/${shopId}/reviews`, { params });
    return response.data;
  },

  // Create a review
  createReview: async (shopId: string, data: {
    rating: number;
    title: string;
    content: string;
    serviceType?: string;
    deviceType?: string;
  }) => {
    const response = await api.post(`/shops/${shopId}/reviews`, data);
    return response.data.data;
  },
};

export const quoteService = {
  // Create a quote request
  createQuote: async (data: {
    shopId: string;
    customerEmail: string;
    customerPhone: string;
    customerName: string;
    deviceType: string;
    brand: string;
    model: string;
    serviceType: string;
    issueDescription: string;
    urgency: string;
    preferredDate?: string;
    atHomeService: boolean;
  }) => {
    const response = await api.post('/quotes', data);
    return response.data.data;
  },

  // Get quote by ID
  getQuoteById: async (id: string) => {
    const response = await api.get(`/quotes/${id}`);
    return response.data.data;
  },
};

export const regionService = {
  // Get all regions
  getRegions: async () => {
    const response = await api.get('/regions');
    return response.data.data;
  },

  // Get region by slug
  getRegionBySlug: async (slug: string) => {
    const response = await api.get(`/regions/${slug}`);
    return response.data.data;
  },

  // Get cities in region
  getCitiesByRegion: async (regionSlug: string) => {
    const response = await api.get(`/regions/${regionSlug}/cities`);
    return response.data.data;
  },
};

export const cityService = {
  // Get city by slug
  getCityBySlug: async (slug: string) => {
    const response = await api.get(`/cities/${slug}`);
    return response.data.data;
  },
};
