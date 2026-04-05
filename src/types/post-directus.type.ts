export interface PostDirectusType {
    data: PostData[]
    meta: Meta
}

export type PostHomeDirectusTypeHome = PostDirectusType
export type PostHomeDirectusTypeData = PostData

export interface Meta {
    filter_count: number
}

export interface PostData {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    content: string
    font_link: string | null
    font_title: string | null
    banner: string | null
    slug: string
    blog: BlogRelation[]
    post_author: PostAuthorRelation[]
}

export interface BlogRelation {
    blog_id: BlogId
}

export interface BlogId {
    id: number
    post_blog: number[]
}

export interface PostAuthorRelation {
    author_id: AuthorId
}

export interface AuthorId {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    name: string
    avatar_url: string
    author_social_medias: AuthorSocialMedia[]
    post: number[]
}

export interface AuthorSocialMedia {
    id: number
    author_id: number
    social_media_id: SocialMediaId
}

export interface SocialMediaId {
    id: number
    user_created: string
    date_created: string
    user_updated: string | null
    date_updated: string | null
    name: string
    slug: string
    url: string
    icone: string
    author: number[]
}
