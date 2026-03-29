export interface PostBlogType {
    id: number
    post_blog: PostBlog[]
}

export interface PostBlog {
    post_id: PostId
}

export interface PostId {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    content: string
    blog: number[]
}
