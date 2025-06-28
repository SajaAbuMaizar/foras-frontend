declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    BACKEND_URL: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
