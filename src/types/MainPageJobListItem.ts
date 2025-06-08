export interface MainPageJobListItem {
  id: number
  imageUrl: string
  salary: string
  jobTitle: string
  employerCompanyLogoUrl: string
  employerCompanyName: string
  employerId: number
  jobDescription: string
  requiredQualifications: string

  hebrewRequired: boolean
  transportationAvailable: boolean
  jobType: string
  cityName: string
  industryName: string
  latitude: number
  longitude: number

}