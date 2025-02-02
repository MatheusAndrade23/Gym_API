import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("production"),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3000),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid Environment Variables", _env.error);
  throw new Error("Invalid Environment Variables");
}

export const env = _env.data;
