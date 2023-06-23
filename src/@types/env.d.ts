/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_API_URL: string;
      NEXT_PUBLIC_ENVIRONMENT: string;
      NEXT_PUBLIC_MUX_ENV_KEY: string;
      NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO: string;
    }
  }
}
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
