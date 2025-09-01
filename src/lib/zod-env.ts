import "dotenv/config";
import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_BASE_BFF: z.string(),
  NEXT_PUBLIC_API_KEY: z.string(),
});

const env = envSchema.parse(process.env);

export { env };
