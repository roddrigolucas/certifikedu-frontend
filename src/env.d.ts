/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPLICATION_NAME: string;
  readonly VITE_APPLICATION_URL: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
