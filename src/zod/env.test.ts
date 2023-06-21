import type { Env } from "./env";
import { parseEnv } from "./env";

function getValidEnv(): Env {
    return {
        DATABASE_URL: "some-database-url",
        ENVIRONMENT: "dev",
        LOG_LEVEL: "error",
        SGK_APP: "UNKNOWN_SGK_APP",
        REGION: "some-aws-region",
        BUCKET_NAME: "some-bucket-name",
    };
}

describe("parseEnv", () => {
    test.each<[string, any]>([
        ["DATABASE_URL", "some-other-database-url"],
        ["ENVIRONMENT", "dev"],
        ["ENVIRONMENT", "test"],
        ["ENVIRONMENT", "prod"],
        ["LOG_LEVEL", "trace"],
        ["LOG_LEVEL", "info"],
        ["LOG_LEVEL", "error"],
        ["LOG_LEVEL", "fatal"],
        ["SGK_APP", "some-sgk-app"],
        ["REGION", "some-aws-region"],
        ["BUCKET_NAME", "some-other-bucket-name"],
    ])("returns valid env when %p is valid value %p", (field, goodVal) => {
        const goodEnv = { ...getValidEnv(), [field]: goodVal };

        const act = () => parseEnv(goodEnv);

        expect(act).not.toThrow();
    });

    test.each<[keyof Env]>([
        ["ENVIRONMENT"],
        ["LOG_LEVEL"],
        ["SGK_APP"],
        ["REGION"],
        ["BUCKET_NAME"],
    ])("returns valid env when optional value %p is missing", (field) => {
        const env = getValidEnv();
        delete env[field];

        const act = () => parseEnv(env);

        expect(act).not.toThrow();
    });

    test.each<[string, any]>([
        ["DATABASE_URL", undefined],
        ["ENVIRONMENT", "not-a-real-env"],
        ["LOG_LEVEL", "not-a-real-log-level"],
    ])("throws error when %p is invalid value %p", (field, badVal) => {
        const badEnv = { ...getValidEnv(), [field]: badVal };

        const act = () => parseEnv(badEnv);

        expect(act).toThrow();
    });
});
