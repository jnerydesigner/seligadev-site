import "dotenv/config";
import z from "zod";

export const envSchema = z.object({
  // URL do banco de dados (ex: PostgreSQL, usado pelo Prisma)
  DATABASE_URL: z.string(),
  // URL base do frontend Next.js (obrigatória para o app)
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  // URL base do BFF (Backend for Frontend, opcional)
  NEXT_PUBLIC_BASE_BFF: z.string().optional(),
  // Chave API para serviços externos (opcional)
  NEXT_PUBLIC_API_KEY: z.string().optional(),
  // URL do Directus (opcional, fallback para NEXT_PUBLIC_BASE_URL)
  NEXT_PUBLIC_DIRECTUS_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);

