import type { DeployActionEnv, TestActionEnv, Env } from "./env-zod-extra";
import { parseEnv } from "./env-zod-extra";

function getValidDeployActionEnv(): Record<string, unknown> {
    return {
        CI_ACTION: "deploy",
        ENVIRONMENT: "test",
        PORT: "9001",
        API_URL: "https://example.com",
    };
}

function getValidTestActionEnv(): Record<string, unknown> {
    return {
        CI_ACTION: "test",
        ENVIRONMENT: "test",
        NONEMPTY_STRING: "nonempty",
        SHORT_ARRAY: [0, 1, 2],
        UPPERCASE_STRING: "SOME UPPERCASE STRING",
    };
}

describe("parseEnv", () => {
    it("succeeds when env is valid", () => {
        const env = getValidTestActionEnv();

        const act = () => parseEnv(env);

        expect(act).not.toThrow();
    });
});
