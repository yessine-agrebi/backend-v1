declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_HOST: string;
        DATABASE_PORT: string;
        DATABASE_USERNAME: string;
        DATABASE_PASSWORD: string;
        DATABASE_NAME: string;
        NODE_ENV: string;
        JWT_SECRET: string;
        JWT_REFRESH_TOKEN_KEY: string;
    }
}