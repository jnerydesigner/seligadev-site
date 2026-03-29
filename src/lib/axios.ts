import axios from "axios"
import { env } from "@/config/env"

export const api = axios.create({
    baseURL: env.NEXT_PUBLIC_DIRECTUS_URL,
    headers: {
        "Content-Type": "application/json",
    },
})