export interface HostingerDataType {
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
    hostingerDescription: HostingerDescription[]
    hostingerDiscountDdescription: HostingerDiscountDdescription[]
}

export interface HostingerDescription {
    id: number
    line: string
}

export interface HostingerDiscountDdescription {
    id: number
    line: string
}
