export interface SetupPageDirectusDataType {
    data: SetupPageDirectusType
}

export interface SetupPageDirectusType {
    id: number
    slug: string
    title: string
    setup_items: SetupItem[]
}

export interface SetupItem {
    id: number
    setup_id: number
    setup_items_id: SetupItemsId
}

export interface SetupItemsId {
    id: number
    name: string
    price: number
    productUrl: string
    imageUrl: string
    slug: string
    nameFull: string
    setup: number[]
}
