export interface AdvertisingDirectusTypeData {
    data: AdvertisingDirectusType[]
}

export interface AdvertisingDirectusType {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    slug: string
    image: string
    position: string
    is_active: boolean
}
