export interface SetupItemDataType {
    id: number
    slug: string
    title: string
    setup_items: SetupItem[]
}

export interface SetupItem {
    id: number
    name: string
    price: number
    productUrl: string
    imageUrl: string
    slug: string
    nameFull: string
}
