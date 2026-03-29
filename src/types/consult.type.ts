export interface TechnologyGeneral {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    techs_title: string
    qrcode: string
    footer: string
    tech: Tech[]
    services: Service[]
}

export interface Tech {
    tech_id: TechId
}

export interface TechId {
    id: number
    name: string
    description: string
    image: string
    technologies: number[]
}

export interface Service {
    services_id: ServicesId
}

export interface ServicesId {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    description_large: string
    services: number[]
}
