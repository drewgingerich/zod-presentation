export interface Env {
    ENVIRONMENT: string;
    LOG_LEVEL: string;
    DATABASE_URL: string;
    SGK_APP: string;
    REGION: string;
    BUCKET_NAME: string;
}

const envDefaults = {
    ENVIRONMENT: "dev",
    LOG_LEVEL: "error",
    SGK_APP: "UNKNOWN_SGK_APP",
    REGION: "us-east-1",
    BUCKET_NAME: "ithaka-micro-frontends",
};

export function parseEnv(unvalidatedEnv: object): Env {
    const env: Record<string, string> = {
        ...envDefaults,
        ...unvalidatedEnv,
    };

    if (env.DATABASE_URL === undefined) {
        throw Error("DATABASE_URL is required");
    }

    if (!["dev", "test", "prod"].includes(env.ENVIRONMENT)) {
        console.log(env);
        throw Error('ENVIRONMENT must be "dev", "test", or "prod"');
    }

    if (!["fatal", "error", "info", "trace"].includes(env.LOG_LEVEL)) {
        throw Error('LOG_LEVEL must be "fatal", "error", "info", "trace"');
    }

    function isEnv(value: any): value is Env {
        return (
            typeof value.ENVIRONMENT === "string" &&
            typeof value.LOG_LEVEL === "string" &&
            typeof value.DATABASE_URL === "string" &&
            typeof value.SGK_APP === "string" &&
            typeof value.REGION === "string" &&
            typeof value.BUCKET_NAME === "string"
        );
    }

    if (!isEnv(env)) {
        throw Error("Environment is invalid");
    }

    return env;
}
