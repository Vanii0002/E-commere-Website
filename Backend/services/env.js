import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
    CLIENT_ID: z.string().min(1),
    CLIENT_SECRET: z.string().min(1),
    REDIRECT_URI: z.string().min(1),
    SESSION_SECRET: z.string().trim().min(1),
    JWT_SECRET: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
