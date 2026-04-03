export interface AuthorDirectusTypeData {
    data: AuthorDirectusType[]
}

export interface AuthorDirectusType {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    name_full: string
    bio_one: string;
    bio_two: string;
    user_author: UserAuthor[]
}

export interface UserAuthor {
    author_id: Author
}

export interface Author {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    name: string
    avatar_url: string
    author_social_medias: AuthorSocialMedia[]
    post: Post[]
    User: number[]
}

export interface AuthorSocialMedia {
    social_media_id: SocialMedia
}

export interface SocialMedia {
    id: number
    user_created: string
    date_created: string
    user_updated?: string
    date_updated?: string
    name: string
    slug: string
    url: string
    icone: string
    author: number[]
}

export interface Post {
    post_id: Post
}

export interface Post {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    content: string
    font_link?: string
    font_title: string
    banner: string
    slug: string
    blog: number[]
    post_author: number[]
}
