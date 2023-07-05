import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Switch from "react-switch";

import { Button, Dialog, Divider } from "@/ui";

import * as S from "./CourseManagerDialog.styles";
import { useState } from "react";
import { ICourses } from "@/@types/cousers";
import { handleEditProgram } from "@/services/firebase/courses";

type Props = {
  onClose: () => void;
  courses: ICourses[];
};

export function CourseManagerDialog({ onClose, courses }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {};

  const handleClose = () => onClose();

  const handleSwitchPublic = (program: ICourses) => {
    handleEditProgram({ ...program, public: !program.public });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
        <S.QuestionHeader>
          <S.QuestionHeaderTitleContainer>
            <S.QuestionHeaderTitle>Programas</S.QuestionHeaderTitle>
            <S.QuestionHeaderSubtitle>
              Gerencie os programas
            </S.QuestionHeaderSubtitle>
          </S.QuestionHeaderTitleContainer>
        </S.QuestionHeader>
        <Dialog.Body>
          <div className={styles.table}>
            {courses?.map((program, index) => {
              return (
                <div key={index} className={styles.row}>
                  <p>{program?.name}</p>
                  <Switch
                    onChange={() => handleSwitchPublic(program)}
                    checked={program.public}
                    offColor={"#c9c9c9"}
                    onColor="#EE0014"
                  />
                </div>
              );
            })}
          </div>
        </Dialog.Body>
        <Divider />
      </Dialog.Content>
    </Dialog>
  );
}
