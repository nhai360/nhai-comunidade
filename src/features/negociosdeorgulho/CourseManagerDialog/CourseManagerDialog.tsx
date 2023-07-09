import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Switch from "react-switch";

import { Button, Dialog, Divider } from "@/ui";

import * as S from "./CourseManagerDialog.styles";
import { useState } from "react";
import { ICourses } from "@/@types/cousers";
import { handleEditProgram } from "@/services/firebase/courses";
import { ModuleManagerDialog } from "../ModuleManagerDialog";
import { CreateCourseDialog } from "../CreateCourseDialog";
import { AppWindow } from "@phosphor-icons/react";

type Props = {
  onClose: () => void;
  courses: ICourses[];
};

export function CourseManagerDialog({ onClose, courses }: Props) {
  const [showManager, setShowManager] = useState("");
  const [showNewCourse, setShowNewCourse] = useState(false);

  const handleSwitchPublic = (program: ICourses) => {
    handleEditProgram({ ...program, public: !program.public }).catch((err) => {
      toast.error("Não foi possível alterar a privacidade do programa");
      console.log("Error =>", err);
    });
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <Dialog.Header isAmstel title={"Gerenciamento Amstel"} closable />

          <Dialog.Body>
            {courses?.map((program, index) => {
              return (
                <div
                  key={index}
                  className={styles.cardProgram}
                  onClick={() => setShowManager(program?._id)}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      {" "}
                      <AppWindow size={20} />
                      {program?.name}
                    </p>
                  </div>
                  <Switch
                    onChange={() => handleSwitchPublic(program)}
                    checked={program.public}
                    offColor={"#c9c9c9"}
                    onColor="#EE0014"
                  />
                </div>
              );
            })}
            <div
              className={styles.cardProgram}
              style={{ justifyContent: "center", backgroundColor: "white" }}
              onClick={() => setShowNewCourse(true)}
            >
              <p>Novo programa +</p>
            </div>
          </Dialog.Body>
          <Divider />
        </Dialog.Content>
      </Dialog>
      {showManager && (
        <ModuleManagerDialog
          courseId={showManager}
          courses={courses}
          onClose={() => setShowManager("")}
        />
      )}
      {showNewCourse && (
        <CreateCourseDialog
          courses={courses}
          onClose={() => setShowNewCourse(false)}
        />
      )}
    </>
  );
}
