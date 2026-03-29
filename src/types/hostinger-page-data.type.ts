export interface HostingerPageDataType {
    id: number
    slug: string
    title: string;
    HostingerPageHotingerObject: HostingerPageHotingerObject[]
}

export interface HostingerPageHotingerObject {
    id: number
    HostingerPage_id: number
    Hostinger_id: HostingerId
}

export interface HostingerId {
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
    HostingerPage: number[]
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
