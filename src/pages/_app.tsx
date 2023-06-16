import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

import { globalStyles } from "@/../stitches.config";

import { AuthProvider, ScoreProvider } from "@/contexts";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";

import { setDefaultOptions } from "date-fns";
import { pt } from "date-fns/locale";
import { SpaceProvider } from "@/contexts/Space";
import { ParticipantProvider } from "@/contexts/Participant";
import { ParticipantMediaProvider } from "@/contexts/ParticipantMedia";

const queryClient = new QueryClient();
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
            <ParticipantProvider>
              <ParticipantMediaProvider>
                <SpaceProvider>
                  <Component {...pageProps} />
                </SpaceProvider>
              </ParticipantMediaProvider>
            </ParticipantProvider>
          </ScoreProvider>
        </AuthProvider>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}
