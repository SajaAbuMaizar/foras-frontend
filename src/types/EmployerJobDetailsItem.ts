import { Candidate } from './candidate'

export interface EmployerJobDetailsItem {
  id: number
  imageUrl: string
  salary: string
  jobTitle: string
  jobDescription: string
  industryName: {
    nameAr: string
    nameHe: string
  }
  requiredQualifications: string

  hebrewRequired: boolean
  transportationAvailable: boolean
  jobType: string
  cityName: {
    nameAr: string
    nameHe: string
  }
  candidates: Candidate[]

  createdAt: string

}