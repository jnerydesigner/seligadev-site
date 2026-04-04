import { api } from "@/lib/axios"

export const getDirectusHostingerData = async <T = unknown>(endpoint: string): Promise<T> => {
    const response = await api.get<T>(endpoint);
    return response.data;
};


export const getDirectusSetupData = async <T = unknown>(endpoint: string) => {
    const response = await api.get<T>(endpoint);
    return response.data;
}

export const getDirectusSetupProduct = async <T = unknown>(slug: string) => {
    const response = await api.get<T>(`/items/setup_items?filter[slug][_eq]=${slug}`);
    return response.data;
}

export const getDirectusShorts = async <T = unknown>() => {
    const response = await api.get<T>(`/items/shorts?sort=date_created`);
    return response.data
}

export const getDirectusAuthor = async <T = unknown>() => {
    const response = await api.get<T>(`/items/User?fields=*,user_author.author_id.*,user_author.author_id.author_social_medias.social_media_id.*,user_author.author_id.post.post_id.*);
    return response.data`);

    return response.data
}

export const getDirectusConsult = async <T = unknown>() => {
    const response = await api.get<T>(`/items/consult`);
    return response.data

}
