"use client";
import styles from "./index.module.scss";
import { useState } from "react";
import ProgramSlider from "../ProgramSlider";
import ForumArea from "../ForumArea";
import { useUser, useUserFromNickname } from "@/client/users";
import { IWatchedVideo } from "@/services/firebase/progress";
import { ICourses } from "@/@types/cousers";
import useWindowDimensions from "@/hooks/useWindowDimension";
import { AddCircleIcon, SettingsIcon } from "@/ui/_icons";
import { CourseManagerDialog } from "@/features/negociosdeorgulho/CourseManagerDialog";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";
import { IconAddForm, IconSettings } from "@/ui/_icons/icons";
import { QuizManagerDialog } from "@/features/negociosdeorgulho/QuizManagerDialog";
import { useAuthContext } from "@/contexts";

type IProps = {
  isSigned: boolean;
  cursos: ICourses[];
};

const TabComponent = ({ isSigned, cursos }: IProps) => {
  const [active, setActive] = useState(1);
  const [showManager, setShowManager] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  const { session } = useAuthContext();
  const { width } = useWindowDimensions();
  const isMobile = !!width && width < 1024;

  const { user: userAmstel } = useUserFromNickname({
    nickname: process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO,
  });

  const { user } = useUser({ id: session?.userId, });

  const isAmstel = userAmstel?.nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO;
  const isAdmin = user?.role?.name === "ADMIN";

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
            {isSigned ? "FÓRUM DE DISCUSSÃO" : "VISITAR FÓRUM"}
          </a>
        </div>
        {!isMobile && active === 1 && isAmstel && isAdmin && (
          <div className={styles.settingsButtonsWrapper}>
            <button type="button" onClick={() => setShowManager(true)}>
              <p>Gerenciar</p>
              <IconSettings size={20} />
            </button>
            <button type="button" onClick={() => setShowForms(true)}>
              Formulários
              <IconAddForm size={18} />
            </button>
          </div>
        )}
        {active === 2 && isAmstel && (
          <div className={styles.settingsButtonsWrapper}>
            <button type="button" onClick={() => setIsCreatePostDialogVisible(true)}>
              <p>Nova publicação</p>
              <AddCircleIcon size={24} color="#ee0014" />
            </button>
          </div>
        )}
      </div>

      {active === 1 && <ProgramSlider cursos={cursos} user={user as any} />}
      {active === 2 && <ForumArea user={user as any} />}
      {isCreatePostDialogVisible && (
        <CreatePostDialog onClose={() => setIsCreatePostDialogVisible(false)} />
      )}

      {showManager && (
        <CourseManagerDialog courses={cursos} onClose={() => setShowManager(false)} />
      )}

      {showForms && (
        <QuizManagerDialog onClose={() => setShowForms(false)} />
      )}
    </>
  );
};

export default TabComponent;
