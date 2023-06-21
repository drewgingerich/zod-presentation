import { parseEnv } from "./env-zod-extra";

describe("parseEnv", () => {
    it("succeeds when env is valid", () => {
        const env = {
            CI_ACTION: "test",
            FALLBACK_ENVIRONMENT: "test",
            NONEMPTY_STRING: "nonempty",
            UPPERCASE_STRING: "SOME UPPERCASE STRING",
            NUMBER_ARRAY: [0, 1, 2],
        };

        const act = () => parseEnv(env);

        expect(act).not.toThrow();
    });
});
