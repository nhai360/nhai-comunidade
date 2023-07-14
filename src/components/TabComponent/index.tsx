"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import { useState } from "react";
import ProgramSlider from "../ProgramSlider";
import ForumArea from "../ForumArea";
import { useUserFromNickname } from "@/client/users";
import { IWatchedVideo } from "@/services/firebase/progress";
import { ICourses } from "@/@types/cousers";
import useWindowDimensions from "@/hooks/useWindowDimension";
import { AddCircleIcon, SettingsIcon } from "@/ui/_icons";
import { CourseManagerDialog } from "@/features/negociosdeorgulho/CourseManagerDialog";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";
import { useAuthContext } from "@/contexts";

type IProps = {
  isSigned: boolean;
  cursos: ICourses[];
};

const TabComponent = ({ isSigned, cursos }: IProps) => {
  const { session } = useAuthContext();
  const [active, setActive] = useState(1);
  const [showManager, setShowManager] = useState(false);
  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  const { width } = useWindowDimensions();
  const isMobile = !!width && width < 1024;

  const { user } = useUserFromNickname({
    nickname: process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO,
  });

  const isAmstel =
    user?.nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO;

  return (
    <>
      <div className={styles.buttonWrapper}>
        <div style={{ display: "flex" }}>
          <a
            className={`${active === 1 && styles.active}`}
            onClick={() => setActive(1)}
            href="javascript:void(0)"
            style={{ textTransform: "uppercase" }}
          >
            {isSigned ? "Programas" : "Cursos"}
          </a>
          <a
            className={`${active === 2 && styles.active}`}
            onClick={() => isSigned && setActive(2)}
            href={isSigned ? "javascript:void(0)" : "/auth/register"}
          >
            {isSigned ? "FÓRUM AMSTEL" : "VISITAR FÓRUM"}
          </a>
        </div>
        {!isMobile && active === 1 && isAmstel && (
          <div
            className={styles.settingsButton}
            onClick={() => setShowManager(true)}
          >
            <p>Gerenciar</p>
            <SettingsIcon size={24} color="#ee0014" />
          </div>
        )}
        {active === 2 && isAmstel && (
          <div
            className={styles.settingsButton}
            onClick={() => setIsCreatePostDialogVisible(true)}
          >
            <p>Nova publicação</p>
            <AddCircleIcon size={24} color="#ee0014" />
          </div>
        )}
      </div>

      {active === 1 && (
        <>
          <ProgramSlider cursos={cursos} user={user as any} />
        </>
      )}

      {active === 2 && (
        <>
          <ForumArea user={user as any} />
        </>
      )}

      {isCreatePostDialogVisible && (
        <CreatePostDialog onClose={() => setIsCreatePostDialogVisible(false)} />
      )}
      {showManager && (
        <CourseManagerDialog
          courses={cursos}
          onClose={() => setShowManager(false)}
        />
      )}
    </>
  );
};

export default TabComponent;
