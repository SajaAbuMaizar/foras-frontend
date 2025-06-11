// src/lib/api.ts
import { api } from './axios';
import { Option } from '../types/postJobTypes';
import { MainPageJobListItem } from '@/types/MainPageJobListItem'
import { EmployerJobDetailsItem } from '@/types/EmployerJobDetailsItem';
import { EmployerLogoUrlItem } from '@/types/EmployerLogoUrlItem';
import { PaginatedResponse } from '@/types/PaginatedResponseItem';

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

export async function fetchGenders(): Promise<Option[]> {
  try {
    const response = await api.get("/api/enums/genders");
    return response.data as Option[];
  } catch (error) {
    console.error('Error fetching genders:', error);
    return [];
  }
}

export async function fetchJobs(page = 0, searchParams?: Record<string, string>): Promise<PaginatedResponse<MainPageJobListItem>> {
  const params = new URLSearchParams({ ...searchParams, page: page.toString(), size: "9" }).toString();
  const response = await api.get(`/api/job${searchParams && Object.keys(searchParams).length > 0 ? "/search" : ""}?${params}`);
  console.log('fetchJobs response:', response.data);
  return response.data as MainPageJobListItem; // ✅ Return paginated response
}



export async function getJobDetails(id: string): Promise<EmployerJobDetailsItem> {
  try {
    const response = await api.get(`/api/job/job-details/${id}`);
    return response.data as EmployerJobDetailsItem;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
}

export async function fetchEmployerLogos(): Promise<EmployerLogoUrlItem[]> {
  try {
    const response = await api.get(`/api/logos`);
    return response.data as EmployerLogoUrlItem[];
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
}
