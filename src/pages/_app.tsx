import type { AppProps } from "next/app";

import { globalStyles } from "@/../stitches.config";

import { AuthProvider } from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
