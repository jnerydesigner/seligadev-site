export interface HostingerDirectusType {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    priceOriginalTotal: number
    price: number
    priceAndDiscount: string
    link: string
    hostinger_description: HostingerDescription[]
    hostinger_discount_description: HostingerDiscountDescription[]
}

export interface HostingerDescription {
    id: number
    Hostinger_id: number
    HostingerDescription_id: HostingerDescriptionId
}

export interface HostingerDescriptionId {
    id: number
    line: string
    Hostinger: number[]
}

export interface HostingerDiscountDescription {
    id: number
    Hostinger_id: number
    HostingerDiscountDescription_id: HostingerDiscountDescriptionId
}

export interface HostingerDiscountDescriptionId {
    id: number
    line: string
    Hostinger: number[]
}

export interface DirectusItemsResponse<T> {
    data: T[]
}

export interface DirectusItemResponse<T> {
    data: T
}
