import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateVideo } from "@/client/videos";
import { MediaCategory, useUpload } from "@/client/media";
import { Button, Dialog, Divider, Field, Success } from "@/ui";
import { useState } from "react";
import { ICourses } from "@/@types/cousers";
import { handleCreateCourse } from "@/services/firebase/courses";

type Props = {
  courses: ICourses[];
  onClose: () => void;
};

export function CreateCourseDialog({ onClose, courses }: Props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();

  const handleCreate = async () => {
    const order = courses.length + 1;
    if (!!name && order) {
      setLoading(true);
      await handleCreateCourse({ name, order: order })
        .then(() => {
          toast.success("Programa criado com sucesso!");
          onClose();
        })
        .catch(() => toast.error("Falha ao criar o programa programa"));
      setLoading(false);
    } else {
      toast.error("Insira o nome do programa");
    }
  };

  return (
    <Dialog open>
      <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
        <Dialog.Header title={"Novo programa"} onClose={onClose} closable />
        <Dialog.Body>
          <Field.Input
            label="Nome do programa"
            placeholder="Escreva o nome do novo programa"
            onChange={(c) => setName(c.target.value as any)}
            value={name}
          />
        </Dialog.Body>
        <Divider />
        <Dialog.Footer
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "$4",
          }}
        >
          <Button
            style={{
              backgroundColor: "#EE0014",
              borderRadius: 0,
              height: 48,
              fontFamily: "RingBold",
            }}
            type="submit"
            loading={loading}
            onClick={handleCreate}
          >
            Criar programa
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
