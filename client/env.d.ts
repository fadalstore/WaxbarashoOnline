/// <reference types="vite/client" />

// Environment variables for Google integrations
interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_GOOGLE_ADSENSE_CLIENT_ID: string;
  readonly VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}