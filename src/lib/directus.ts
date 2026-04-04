/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDirectus, rest, readSingleton, readItems, aggregate } from '@directus/sdk'
import type { Service, TechId, TechnologyGeneral } from '@/types/consult.type'
import { env } from './zod-env'
import { ByMyCoofeType } from '@/types/bymycoffe.type'
import { PostData, PostDirectusType } from '@/types/post-directus.type'

export type Global = {
    title: string
    description: string
    image_url: string
}

export type Technology = TechId

export type TechnologyRelation = {
    tech_id: Technology
}

export type ServiceRelation = {
    services_id: Service
}

export type Technologies = TechnologyGeneral

export type Consult = {
    title: string
    bio: string
    image: string
}

type Schema = {
    global: Global
    consult: Consult
    technologies: Technologies[]
    bymycoffe: any;
    blog: any;
    post: PostDirectusType
}

const directus = createDirectus<Schema>(
    env.NEXT_PUBLIC_DIRECTUS_URL || env.NEXT_PUBLIC_BASE_URL
).with(rest())

export async function getGlobals(): Promise<Global> {
    return directus.request(readSingleton('global')) as unknown as Promise<Global>
}

export async function getConsult(): Promise<Consult> {
    return directus.request(readSingleton('consult')) as unknown as Promise<Consult>
}

export async function getByMyCoffe(): Promise<ByMyCoofeType> {
    return directus.request(readSingleton('bymycoffe')) as unknown as Promise<ByMyCoofeType>
}

export async function getTechnologies(): Promise<Technologies[]> {
    const data = await directus.request(
        readItems('technologies' as any, {
            fields: [
                '*',
                'tech.tech_id.*',
                'services.services_id.*'
            ] as any
        })
    )

    return data as unknown as Technologies[]
}


export async function getPosts(page: number = 1, limit: number = 10): Promise<PostDirectusType> {
    const [items, [{ count }]] = await Promise.all([
        directus.request(
            readItems('post' as any, {
                fields: [
                    '*',
                    'blog.blog_id.*',
                    'post_author.author_id.*',
                    'post_author.author_id.author_social_medias.*',
                    'post_author.author_id.author_social_medias.social_media_id.*',
                ] as any,
                page,
                limit,
            })
        ),
        directus.request(
            aggregate('post' as any, {
                aggregate: { count: '*' },
            })
        ),
    ])

    return {
        data: items as unknown as PostData[],
        meta: {
            filter_count: Number(count),
        },
    }
}


export async function getPostBySlug(slug: string): Promise<PostData | null> {
    const data = await directus.request(
        readItems('post' as any, {
            fields: [
                '*',
                'blog.blog_id.*',
                'post_author.author_id.*',
                'post_author.author_id.author_social_medias.*',
                'post_author.author_id.author_social_medias.social_media_id.*',
            ] as any,
            filter: {
                slug: { _eq: slug }
            },
            limit: 1,
        })
    )

    const result = data as unknown as PostData[]
    return result[0] ?? null
}

export async function getBlog(): Promise<any[]> {
    const data = await directus.request(
        readItems('blog' as any, {
            fields: [
                '*',
                "post_blog.post_id.*",
            ] as any
        })
    )

    return data as unknown as any[]
}

export default directus
