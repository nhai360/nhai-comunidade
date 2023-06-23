"use client";

import styles from "./index.module.scss";
import StepProgram from "@/components/StepProgram";
import StartButton from "@/components/StartButton";
import TabComponent from "@/components/TabComponent";
import { Header } from "@/layouts/desktop/DefaultLayout/Header";
import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleProgramas } from "@/services/firebase/programas";

function NegociosDeOrgulho() {
  const router = useRouter();
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const [programas, setProgramas] = useState<any[]>([]);

  useEffect(() => {
    handleProgramas(setProgramas);
  }, []);

  return (
    <>
      <div className={styles.Container}>
        <Header
          user={user as any}
          canCreate={
            user?.nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO
          }
        />
        <div className={styles.BannerProgram}>
          <div className={styles.Row}>
            <div className={styles.Breadcrumb}>
              <span className={styles.BreadcrumbText}>
                {"Contaí Comunidade > Episódios > "}{" "}
                <strong>Espaço Amstel</strong>
              </span>
            </div>

            <StepProgram steps={0} stepsTotal={programas?.length} />
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

        <TabComponent isSigned={!!session?.userId} programas={programas} />
      </div>
    </>
  );
}

export default NegociosDeOrgulho;
