
export interface AdminJobDetailsItem {
  id: number
  imageUrl: string
  salary: string
  jobType: string

  titleOriginal: string
  titleTranslated: string
  descriptionOriginal: string
  descriptionTranslated: string
  qualificationsOriginal: string
  qualificationsTranslated: string

  hebrewRequired: boolean
  transportationAvailable: boolean
  status: string


  industryName: {
    nameAr: string
    nameHe: string
  }

  cityName: {
    nameAr: string
    nameHe: string
  }

  createdAt: string

}