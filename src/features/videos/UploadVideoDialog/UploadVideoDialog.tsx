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
import { UploadThumbnail } from "./UploadThumbnail";
import { useState } from "react";
import { CreatePlaylistDialog } from "../CreatePlaylistDialog";

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
  const [isCreatePlaylistDialogVisible, setIsCreatePlaylistDialogVisible] =
    useState(false);

  const { upload, data: source, isSuccess: isSuccessUpload } = useUpload();

  const { upload: uploadThumbnail, isLoading: isUploadingThumbnail } =
    useUpload();

  const {
    createVideo,
    isLoading: isCreatingVideo,
    isSuccess,
  } = useCreateVideo();

  const isLoading = isUploadingThumbnail || isCreatingVideo;

  function handleUpload(files: File[]) {
    upload(
      {
        file: files[0],
        category: MediaCategory.VIDEO,
        mimeType: "video",
      },
      {
        onSuccess: () => {
          toast.success("O upload do seu vídeo foi concluído!");
        },
        onError: () => {
          toast.error(
            "Não foi possível completar o upload do seu vídeo. Tente novamente"
          );
        },
      }
    );
  }

  function handleCreateVideo({
    title,
    description,
    thumbnail,
    tags,
    playlist,
  }: CreateVideoParams) {
    if (!source) {
      return toast.error(
        "Você precisa fazer um novo upload de vídeo, o anterior falhou!"
      );
    }

    const tagsInArray = tags.split(",").map((tag) => tag.trim());

    uploadThumbnail(
      {
        file: thumbnail,
        category: MediaCategory.IMAGE,
      },
      {
        onSuccess: (media) => {
          createVideo(
            {
              title,
              description,
              source,
              thumbnail: media,
              tags: tagsInArray,
            },
            {
              onError: () => {
                toast.error(
                  "Não foi possível postar o seu vídeo. Tente novamente"
                );
              },
            }
          );
        },
        onError: () => {
          toast.error(
            "Não foi possível completar o upload da sua thumbnail. Tente novamente"
          );
        },
      }
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
    <>
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
                  helperText="Use a ',' para separar as tags do seu vídeo. Exemplo: tag 1, tag 2"
                  {...register("tags")}
                />
                <Field.Input
                  label="Playlist"
                  placeholder="Selecione a playlist do vídeo"
                  {...register("playlist")}
                  onClick={() => setIsCreatePlaylistDialogVisible(true)}
                />
                <Field label="Descrição" required={false}>
                  <TextArea
                    control={control}
                    name="description"
                    placeholder="Escreva a descrição do seu vídeo"
                    emojiSelectPosition="bottom"
                    shouldUnregister
                    css={{
                      minHeight: "120px",

                      ".public-DraftEditor-content": {
                        maxHeight: "200px",
                      },
                    }}
                  />
                </Field>
                <Field
                  label="Foto de capa"
                  helperText="A foto de capa deve ser 306 x 161"
                  errorText={errors.thumbnail?.message as string}
                >
                  <UploadThumbnail
                    {...register("thumbnail", { shouldUnregister: true })}
                    control={control}
                  >
                    Selecione a foto de capa
                  </UploadThumbnail>
                </Field>
              </S.FormContainer>
            ) : (
              <Dropzone
                {...register("file", { shouldUnregister: true })}
                control={control}
                onDropAccepted={handleUpload}
                accept={{ "video/*": [] }}
                maxSize={1024 * 1024 * 1024}
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
                css={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "$3",
                }}
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
      {isCreatePlaylistDialogVisible && (
        <CreatePlaylistDialog
          onClose={() => setIsCreatePlaylistDialogVisible(false)}
        />
      )}
    </>
  );
}
