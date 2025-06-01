// src/lib/api.ts
import { api } from './axios';
import { Option } from '../types/postJobTypes';

export async function fetchCities(): Promise<Option[]> {
  try {
    const response = await api.get('/api/cities');
    return response.data as Option[];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

export async function fetchIndustries(): Promise<Option[]> {
  try {
    const response = await api.get('/api/industries');
    return response.data as Option[];
  } catch (error) {
    console.error('Error fetching industries:', error);
    return [];
  }
}