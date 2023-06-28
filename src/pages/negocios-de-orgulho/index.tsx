"use client";

import styles from "./index.module.scss";
import StepProgram from "@/components/StepProgram";
import StartButton from "@/components/StartButton";
import TabComponent from "@/components/TabComponent";
import { Header } from "@/layouts/desktop/DefaultLayout/Header";
import { useUser, useUserFromNickname } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleProgramas } from "@/services/firebase/programas";
import { GetUserProgress, IWatchedVideo } from "@/services/firebase/progress";
import { Amstel } from "@/features/negociosdeorgulho";
import { useUserPlaylists } from "@/client/videos/useUserPlaylists";
import { useVideosFromUser } from "@/client/videos";

function NegociosDeOrgulho() {
  const router = useRouter();
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const [programas, setProgramas] = useState<any[]>([]);
  const [watchedVideos, setWatchedVideos] = useState<IWatchedVideo[]>([]);

  useEffect(() => {
    handleProgramas(setProgramas);
  }, []);

  useEffect(() => {
    user && GetUserProgress(user?.id, setWatchedVideos);
  }, [user]);

  const { user: amstelUser } = useUserFromNickname({
    nickname: process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO,
  });

  const { userplaylists } = useUserPlaylists({
    userId: amstelUser?.id,
  });

  const validPlaylists = userplaylists?.filter((a) => a?.videos?.length > 0);

  const cursos = programas?.map((programa) => {
    const modulos = programa?.modules?.map((id: string) => {
      const findPlaylist = validPlaylists?.find((v) => v?.id === id);

      const watchedEpis =
        findPlaylist?.videos.map((v) => {
          return { ...v, watched: watchedVideos.find((w) => w.id === v.id) };
        }) || [];

      const watchedPercent = (
        (watchedEpis.filter((e) => e.watched).length / watchedEpis?.length) *
        100
      ).toFixed(0);

      return {
        id: id,
        title: findPlaylist?.title,
        thumbnail: findPlaylist?.videos[0]?.thumbnail?.url,
        watched: parseInt(watchedPercent) || 0,
        episodes: findPlaylist?.videos?.length,
      };
    });

    const percentTotal = modulos
      ?.map((m: any) => m.watched)
      .reduce(function (acumulador: any, valorAtual: any) {
        return acumulador + valorAtual;
      }, 0);

    const modulesWatchedPercent = (percentTotal / modulos?.length).toFixed(0);

    return {
      id: 0,
      title: programa?.name,
      watched: parseInt(modulesWatchedPercent) || 0,
      modules: programa?.modules?.length,
      modulos: modulos,
    };
  });

  return (
    <>
      <div className={styles.Container}>
        <Amstel.DesktopLayout hasSider={false}></Amstel.DesktopLayout>
        <Amstel.AppLayout></Amstel.AppLayout>
        <div className={styles.BannerProgram}>
          <div className={styles.Row}>
            <div className={styles.Breadcrumb}>
              <span className={styles.BreadcrumbText}>
                {"Contaí Comunidade > Episódios > "}{" "}
                <strong>Espaço Amstel</strong>
              </span>
            </div>

            <StepProgram
              steps={cursos?.filter((c) => c.watched === 100)?.length}
              stepsTotal={cursos?.length}
            />
          </div>

          <div className={styles.LogoAmstel}>
            <img src="logonhaiamstel.png" alt="" />
            <img src="negociosdeorgulhologo.png" alt="" />
          </div>
          <span className={styles.textBanner}>
            Um programa para impulsionar negócios liderados por pessoas
            LGBTQIAPN+
          </span>
          <div className={styles.buttonWrapper}>
            <StartButton isSigned={!!session?.userId} />
          </div>
        </div>

        <TabComponent isSigned={!!session?.userId} cursos={cursos} />
      </div>
    </>
  );
}

export default NegociosDeOrgulho;
