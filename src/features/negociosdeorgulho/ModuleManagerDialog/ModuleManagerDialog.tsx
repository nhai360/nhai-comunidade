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
import { AppWindow, CaretLeft } from "@phosphor-icons/react";
import { EditIcon, TrashIcon } from "@/ui/_icons";

type Props = {
  onClose: () => void;
  courseId: string;
  courses: ICourses[];
};

export function ModuleManagerDialog({ onClose, courseId, courses }: Props) {
  const [loading, setLoading] = useState(false);
  const [showNewModule, setShowNewModule] = useState(false);
  const [showEdit, setShowEdit] = useState<ICourseModule | null>(null);
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

  const handleDelete = async (modulo: ICourseModule) => {
    course &&
      handleEditProgram({
        ...course,
        modules: [
          ...course?.modules.map((a) => {
            return a?._id === modulo?._id
              ? { ...modulo, deletedAt: new Date() }
              : a;
          }),
        ],
      }).catch((err) => {
        toast.error("Não foi possível deletar o módulo");
        console.log("Error =>", err);
      });
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <S.QuestionHeader>
            <S.QuestionHeaderTitleContainer style={{ background: "white" }}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  backgroundColor: "white",
                  border: "1px solid black",
                  marginBottom: 8,
                }}
              >
                <CaretLeft onClick={onClose} size={20} />
              </div>
              <S.QuestionHeaderTitle
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Programa: {course?.name}
              </S.QuestionHeaderTitle>
              <S.QuestionHeaderSubtitle style={{ color: "#414141" }}>
                Gerencie abaixo os módulos do {`"${course?.name}"`}.
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
                        onClick={() => setModuleId(modulo?._id)}
                        className={styles.clickableArea}
                      >
                        <p>{modulo?.name}</p>
                      </div>
                      <div style={{ display: "flex", columnGap: 12 }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowEdit(modulo)}
                          title={"Editar módulo"}
                        >
                          <EditIcon size={20} />
                        </div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(modulo)}
                          title={"Excluir módulo"}
                        >
                          <TrashIcon size={20} />
                        </div>

                        <Switch
                          onChange={() => handleSwitchPublic(modulo)}
                          checked={modulo.public}
                          offColor={"#c9c9c9"}
                          onColor="#EE0014"
                        />
                      </div>
                    </div>
                  );
                })}
              <div
                className={styles.cardProgram}
                style={{ justifyContent: "center", padding: "20px 1rem" }}
                onClick={() => setShowNewModule(true)}
              >
                <p>Novo módulo +</p>
              </div>
            </div>
          </Dialog.Body>
          <Divider />
        </Dialog.Content>
      </Dialog>

      {(showEdit || showNewModule) && course && (
        <CreateModuleDialog
          course={course}
          editModule={showEdit}
          onClose={() => {
            setShowNewModule(false);
            setShowEdit(null);
          }}
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
