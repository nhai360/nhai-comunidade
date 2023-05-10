import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateVideo } from "@/client/videos";
import { MediaCategory, useUpload } from "@/client/media";
import {
  Button,
  Dialog,
  Divider,
  Dropzone,
  Field,
  Loading,
  Success,
  TextArea,
  Typography,
} from "@/ui";
import { CheckCircleIcon } from "@/ui/_icons";

import { CreateVideoResolver, CreateVideoParams } from "@/client/videos/types";

import * as S from "./UploadVideoDialog.styles";

type Props = {
  onClose: () => void;
};

export function UploadVideoDialog({ onClose }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVideoParams>({
    resolver: zodResolver(CreateVideoResolver),
  });

  const file = watch("file");

  const { upload, data: source, isSuccess: isSuccessUpload } = useUpload();
  const { createVideo, isLoading, isSuccess } = useCreateVideo();

  function handleUpload(files: File[]) {
    upload(
      {
        file: files[0],
        category: MediaCategory.IMAGE,
      },
      {
        onSuccess: () => {
          toast.success("O upload do seu vídeo foi concluído!");
        },
        onError: () => {
          toast.error(
            "Não foi possível completar o upload do seu vídeo. Tente novamente",
          );
        },
      },
    );
  }

  function handleCreateVideo({ title, description, tags }: CreateVideoParams) {
    console.log(source);

    if (!source) {
      return toast.error(
        "Você precisa fazer um novo upload de vídeo, o anterior falhou!",
      );
    }

    const tagsInArray = tags.split(",").map((tag) => tag.trim());

    createVideo(
      {
        title,
        description,
        source,
        tags: tagsInArray,
      },
      {
        onError: () => {
          toast.error("Não foi possível postar o seu vídeo. Tente novamente");
        },
      },
    );
  }

  if (isSuccess) {
    return (
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header closable={false} />
          <Dialog.Body>
            <Success
              title="Seu vídeo foi publicado com sucesso!"
              description="Agora que compartilhou seu vídeo com sua comunidade, é só esperar para ver as discussões interessantes que podem surgir."
              onClose={onClose}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header title={file ? file.name : "Enviar vídeo"} closable />
        <Dialog.Body>
          {file ? (
            <S.FormContainer onSubmit={handleSubmit(handleCreateVideo)}>
              <Field.Input
                label="Título do vídeo"
                placeholder="Escreva o título do seu vídeo"
                errorText={errors.title?.message}
                {...register("title")}
              />
              <Field.Input
                label="Tags"
                placeholder="Adicionar tags"
                errorText={errors.tags?.message}
                {...register("tags")}
              />
              <Field label="Descrição" required={false}>
                <TextArea
                  control={control}
                  name="description"
                  placeholder="Escreva a descrição do seu vídeo"
                  emojiSelectPosition="bottom"
                  shouldUnregister
                  css={{
                    minHeight: "160px",

                    ".public-DraftEditor-content": {
                      maxHeight: "200px",
                    },
                  }}
                />
              </Field>
            </S.FormContainer>
          ) : (
            <Dropzone
              {...register("file", { shouldUnregister: true })}
              control={control}
              onDropAccepted={handleUpload}
              accept={{ "video/*": [] }}
            >
              Selecione arquivos de vídeo para fazer o envio
            </Dropzone>
          )}
        </Dialog.Body>
        <Divider />
        {file && (
          <Dialog.Footer
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "$4",
            }}
          >
            <Typography.Text
              size="body3"
              color="secondary"
              weight="bold"
              css={{ display: "inline-flex", alignItems: "center", gap: "$3" }}
            >
              {isSuccessUpload ? (
                <>
                  <CheckCircleIcon />
                  Vídeo carregado e pronto para ser postado
                </>
              ) : (
                <>
                  <Loading />
                  Enviando vídeo
                </>
              )}
            </Typography.Text>
            <Button
              type="submit"
              loading={isLoading}
              disabled={!isSuccessUpload}
              onClick={() => handleSubmit(handleCreateVideo)()}
            >
              Postar vídeo
            </Button>
          </Dialog.Footer>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
