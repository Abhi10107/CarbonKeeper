import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  FRONTEND_URL: z.string().url().optional(),
  GEMINI_API_KEY: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().default(60)
});

export const env = envSchema.parse(process.env);
