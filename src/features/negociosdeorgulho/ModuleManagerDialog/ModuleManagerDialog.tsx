import styles from "./styles.module.scss";
import Switch from "react-switch";

import { Button, Dialog, Divider } from "@/ui";

import * as S from "./ModuleManagerDialog.styles";
import { useState } from "react";
import { ICourseModule, ICourses } from "@/@types/cousers";
import { handleEditProgram } from "@/services/firebase/courses";
import { toast } from "react-toastify";
import { CreateModuleDialog } from "../CreateModuleDialog";
import { VideosManagerDialog } from "../VideosManagerDialog";
import { AppWindow } from "@phosphor-icons/react";

type Props = {
  onClose: () => void;
  courseId: string;
  courses: ICourses[];
};

export function ModuleManagerDialog({ onClose, courseId, courses }: Props) {
  const [loading, setLoading] = useState(false);
  const [showNewModule, setShowNewModule] = useState(false);
  const [moduleId, setModuleId] = useState("");
  const course = courses.find((c) => c?._id === courseId);

  const handleSwitchPublic = (modulo: ICourseModule) => {
    course &&
      handleEditProgram({
        ...course,
        modules: [
          ...course?.modules.map((a) => {
            return a?._id === modulo?._id
              ? { ...modulo, public: !modulo.public, updatedAt: new Date() }
              : a;
          }),
        ],
      }).catch((err) => {
        toast.error("Não foi possível alterar a privacidade do módulo");
        console.log("Error =>", err);
      });
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <S.QuestionHeader>
            <S.QuestionHeaderTitleContainer style={{ background: "white" }}>
              <S.QuestionHeaderTitle
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <AppWindow size={32} /> Programa: {course?.name}
              </S.QuestionHeaderTitle>
              <S.QuestionHeaderSubtitle style={{ color: "#414141" }}>
                Gerencie abaixo seus módulos.
              </S.QuestionHeaderSubtitle>
            </S.QuestionHeaderTitleContainer>
          </S.QuestionHeader>
          <Dialog.Body>
            <div className={styles.table}>
              {course &&
                course.modules?.map((modulo, index) => {
                  return (
                    <div key={index} className={styles.cardProgram}>
                      <div
                        style={{ flex: 1 }}
                        onClick={() => setModuleId(modulo?._id)}
                      >
                        <p>{modulo?.name}</p>
                      </div>
                      <Switch
                        onChange={() => handleSwitchPublic(modulo)}
                        checked={modulo.public}
                        offColor={"#c9c9c9"}
                        onColor="#EE0014"
                      />
                    </div>
                  );
                })}
              <div
                className={styles.cardProgram}
                style={{ justifyContent: "center" }}
                onClick={() => setShowNewModule(true)}
              >
                <p>Novo módulo +</p>
              </div>
            </div>
          </Dialog.Body>
          <Divider />
        </Dialog.Content>
      </Dialog>

      {showNewModule && course && (
        <CreateModuleDialog
          course={course}
          onClose={() => setShowNewModule(false)}
        />
      )}
      {moduleId && course && (
        <VideosManagerDialog
          courseId={course?._id}
          moduleId={moduleId}
          courses={courses}
          onClose={() => setModuleId("")}
        />
      )}
    </>
  );
}
