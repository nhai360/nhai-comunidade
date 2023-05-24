import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

import { globalStyles } from "@/../stitches.config";

import { AuthProvider, ScoreProvider } from "@/contexts";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

import { setDefaultOptions } from "date-fns";
import { pt } from "date-fns/locale";

// Definindo a localização padrão para português
setDefaultOptions({ locale: pt });

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <Head>
        <title>Contaí Comunidade</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ScoreProvider>
            <Component {...pageProps} />
          </ScoreProvider>
        </AuthProvider>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}
