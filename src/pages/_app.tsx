import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { globalStyles } from "@/../stitches.config";

import { AuthProvider } from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
