import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

import { globalStyles } from "@/../stitches.config";

import "../styles/fonts.scss";
import "../styles/swiper.scss";

import { AuthProvider, ScoreProvider } from "@/contexts";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "@/components/Cookies";
import { setDefaultOptions } from "date-fns";
import { pt } from "date-fns/locale";
import { SpaceProvider } from "@/contexts/Space";
import { ParticipantProvider } from "@/contexts/Participant";
import { ParticipantMediaProvider } from "@/contexts/ParticipantMedia";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
        <Cookies />
        <GoogleAnalytics />
      </QueryClientProvider>
    </>
  );
}
