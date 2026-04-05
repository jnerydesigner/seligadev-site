export interface ResumeDirectusTypeData {
    data: ResumeDirectusType[]
}

export interface ResumeDirectusType {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    title: string
    location: string
    slug: string
    summary: string
    User: User[]
    resume_experience: ResumeExperience[]
    resume_education: ResumeEducation[]
}

export interface User {
    User_id: AuthorDirectusType
}

export interface AuthorDirectusType {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    name_full: string
    bio_one: string
    bio_two: string
    slug: string
    phone: string
    email: string
    portfolio: string
    user_author: UserAuthor[]
    resume: number[]
    user_resume: number[]
}

export interface UserAuthor {
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
    post: Post[]
    User: number[]
}

export interface AuthorSocialMedia {
    social_media_id: SocialMediaId
}

export interface SocialMediaId {
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
    font_link?: string
    font_title: string
    banner: string
    slug: string
    blog: number[]
    post_author: number[]
}

export interface ResumeExperience {
    experience_id: ExperienceId
}

export interface ExperienceId {
    id: number
    user_created?: string
    date_created: string
    user_updated?: string
    date_updated: string
    company: string
    position: string
    technologies: string
    period: string
    admission: string
    resignation?: string
    current_job: boolean
    resume: number[]
}

export interface ResumeEducation {
    education_id: EducationId
}

export interface EducationId {
    id: number
    user_created: string
    date_created: string
    user_updated: string
    date_updated: string
    degree: string
    institution: string
    period: string
    education_user: number[]
    resume: number[]
}
