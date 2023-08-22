"use client";

import styles from "./index.module.scss";
import StepProgram from "@/components/StepProgram";
import StartButton from "@/components/StartButton";
import TabComponent from "@/components/TabComponent";
import { useAuthContext } from "@/contexts";
import { useEffect, useState } from "react";
import { GetUserProgress, IWatchedVideo } from "@/services/firebase/progress";
import { Amstel } from "@/features/negociosdeorgulho";
import { ConvertCourses } from "@/utils/convert-courses";
import { useUserFromNickname } from "@/client/users";
import { GetFirebaseCourses } from "@/services/firebase/courses";

function NegociosDeOrgulho() {
  const { session } = useAuthContext();

  const [programas, setProgramas] = useState<any[]>([]);
  const [watchedVideos, setWatchedVideos] = useState<IWatchedVideo[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);

  useEffect(() => {
    GetFirebaseCourses(setProgramas);
  }, []);

  useEffect(() => {
    session?.userId && GetUserProgress(session?.userId, setWatchedVideos);
  }, [session]);

  const { user } = useUserFromNickname({ id: session?.userId });

  useEffect(() => {
    const cur = ConvertCourses(programas, watchedVideos, user?.nickname);
    setCursos(cur);
  }, [programas, watchedVideos, user?.nickname]);

  return (
    <>
      <div className={styles.Container}>
        <Amstel.DesktopLayout hasSider={false}></Amstel.DesktopLayout>
        <Amstel.AppLayout></Amstel.AppLayout>
        <div className={styles.BannerProgram}>
          <div className={styles.Row}>
            <div className={styles.Breadcrumb}>
              {/* <span className={styles.BreadcrumbText}>
                {"Contaí Comunidade > "} <strong>Negócios de orgulho</strong>
              </span> */}
            </div>

            <StepProgram
              steps={cursos?.filter((c) => c.watchedPercent === 100)?.length}
              stepsTotal={cursos?.length}
            />
          </div>

          <div className={styles.LogoAmstel}>
            <img src="logonhaiamstel.png" alt="" />
            <img src="negociosdeorgulhologo.png" alt="" />
          </div>
          <span className={styles.textBanner}>
            Um programa para impulsionar negócios liderados por pessoas
            LGBTQIAPN+. Veja abaixo os conteúdos disponíveis no programa.
          </span>
          {!session?.userId && (
            <div className={styles.buttonWrapper}>
              <StartButton isSigned={!!session?.userId} />
            </div>
          )}
        </div>
        <TabComponent isSigned={!!session?.userId} cursos={cursos as any} />
      </div>
    </>
  );
}

export default NegociosDeOrgulho;
