import type { AppProps } from "next/app";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

import { globalStyles } from "@/../stitches.config";

import { AuthProvider } from "@/contexts";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <Head>
        <title>Contaí Comunidade</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <ToastContainer position="bottom-left" />
      </QueryClientProvider>
    </>
  );
}
