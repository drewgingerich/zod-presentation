import { z } from "zod";

const envSchema = z.object({
    ENVIRONMENT: z.enum(["dev", "test", "prod"]).default("dev"),
    LOG_LEVEL: z.enum(["fatal", "error", "info", "trace"]).default("error"),
    DATABASE_URL: z.string(),
    SGK_APP: z.string().default("UNKNOWN_SGK_APP"),
    REGION: z.string().default("us-east-1"),
    BUCKET_NAME: z.string().default("ithaka-micro-frontends"),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(env: unknown) {
    return envSchema.parse(env);
}
