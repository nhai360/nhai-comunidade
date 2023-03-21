import type { AppProps } from "next/app";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";

import { globalStyles } from "@/../stitches.config";

import { AuthProvider } from "@/contexts";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
