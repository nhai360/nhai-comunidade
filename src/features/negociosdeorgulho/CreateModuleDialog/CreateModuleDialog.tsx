import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Dialog, Divider, Field, Success } from "@/ui";
import { useState } from "react";
import { ICourses } from "@/@types/cousers";
import { handleCreateCourseModule } from "@/services/firebase/courses";
import { UploadThumbnail } from "@/features/videos/UploadVideoDialog/UploadThumbnail";
import { MediaCategory, useUpload } from "@/client/media";

type Props = {
  course: ICourses;
  onClose: () => void;
};

export function CreateModuleDialog({ onClose, course }: Props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();

  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm<any>();

  const { upload: uploadThumbnail, isLoading: isUploadingThumbnail } =
    useUpload();

  const handleCreate = async () => {
    const photo = getValues()?.bannerUrl;
    if (!!name && photo) {
      uploadThumbnail(
        {
          file: photo,
          category: MediaCategory.IMAGE,
        },
        {
          onSuccess: async (media) => {
            setLoading(true);
            await handleCreateCourseModule(course, {
              name,
              bannerUrl: media?.url,
            })
              .then(() => {
                toast.success("Módulo criado com sucesso!");
                onClose();
              })
              .catch(() => toast.error("Falha ao criar o módulo"));
            setLoading(false);
          },
          onError: () => {
            toast.error(
              "Não foi possível completar o upload da sua thumbnail. Tente novamente"
            );
          },
        }
      );
    } else {
      toast.error("Preencha todos os campos");
    }
  };

  return (
    <Dialog open>
      <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
        <Dialog.Header title={"Novo módulo"} onClose={onClose} closable />
        <Dialog.Body>
          <Field.Input
            label="Nome do módulo"
            placeholder="Escreva o nome do novo módulo"
            onChange={(c) => setName(c.target.value as any)}
            value={name}
            style={{ marginBottom: "2rem" }}
          />
          <Field
            label="Foto de capa do módulo"
            helperText="A foto de capa deve ser 160 x 320"
          >
            <UploadThumbnail
              {...register("bannerUrl", { shouldUnregister: true })}
              control={control}
            >
              Selecione a foto de capa
            </UploadThumbnail>
          </Field>
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
            loading={isUploadingThumbnail || loading}
            onClick={handleCreate}
          >
            Criar módulo
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
