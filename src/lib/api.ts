// src/lib/api.ts
import { api } from './axios';
import { Option } from '../types/postJobTypes';
import { MainPageJobListItem } from '@/types/MainPageJobListItem'
import { EmployerJobDetailsItem } from '@/types/EmployerJobDetailsItem';
import { EmployerLogoUrlItem } from '@/types/EmployerLogoUrlItem';

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

// Fetch all jobs for the main page
export async function fetchJobs(): Promise<MainPageJobListItem[]> {
  try {
    const response = await api.get('/api/job/all');
    return response.data as MainPageJobListItem[];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
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
