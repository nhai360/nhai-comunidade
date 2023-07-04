"use client";

import styles from "./index.module.scss";
import StepProgram from "@/components/StepProgram";
import StartButton from "@/components/StartButton";
import TabComponent from "@/components/TabComponent";
import { useAuthContext } from "@/contexts";
import { useEffect, useState } from "react";
import { handleProgramas } from "@/services/firebase/programas";
import { GetUserProgress, IWatchedVideo } from "@/services/firebase/progress";
import { Amstel } from "@/features/negociosdeorgulho";
import { ConvertCourses } from "@/utils/convert-courses";

function NegociosDeOrgulho() {
  const { session } = useAuthContext();

  const [programas, setProgramas] = useState<any[]>([]);
  const [watchedVideos, setWatchedVideos] = useState<IWatchedVideo[]>([]);

  useEffect(() => {
    handleProgramas(setProgramas);
  }, []);

  useEffect(() => {
    session?.userId && GetUserProgress(session?.userId, setWatchedVideos);
  }, []);

  const cursos = ConvertCourses(programas, watchedVideos, "");

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
