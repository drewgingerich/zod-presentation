import { z } from "zod";

const commonEnvSchema = z.object({
    CI_ACTION: z.enum(["deploy", "test"]),
});

const environmentSchema = z.enum(["test", "prod"]);

const deployEnvSchema = z
    .object({
        CI_ACTION: z.literal("deploy"),
        ENVIRONMENT: environmentSchema,
        PORT: z.coerce.number(),
        API_URL: z.string().url(),
    })
    .and(commonEnvSchema);

export type DeployActionEnv = z.infer<typeof deployEnvSchema>;

const testEnvSchema = z
    .object({
        CI_ACTION: z.literal("test"),
        FALLBACK_ENVIRONMENT: environmentSchema,
        NONEMPTY_STRING: z.string().nonempty(),
        UPPERCASE_STRING: z.string().refine((val) => val === val.toUpperCase()),
        NUMBER_ARRAY: z.array(z.number()),
    })
    .and(commonEnvSchema);

export type TestActionEnv = z.infer<typeof testEnvSchema>;

const envSchema = z.union([deployEnvSchema, testEnvSchema]);

export type Env = z.infer<typeof envSchema>;

export function parseEnv(env: unknown) {
    return envSchema.parse(env);
}
