declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASS: string;
    POSTGRES_NAME: string;
    JWT_SECRET: string;
    TOKEN_EXPIRY: string;
  }
}
