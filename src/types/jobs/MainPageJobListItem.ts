export interface MainPageJobListItem {
  id: number
  imageUrl: string
  salary: string
  jobTitle: string
  employer:{
    id: number
    companyName: string
    companyLogoUrl: string
  }
  jobDescription: string
  requiredQualifications: string

  hebrewRequired: boolean
  transportationAvailable: boolean
  jobType: string
  cityName: string
  industryName: string
  latitude: number
  longitude: number

  publishDate: string

}