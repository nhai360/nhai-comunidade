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

import {
  CreateVideoResolver,
  CreateVideoParams,
  Video,
  UpdateVideoResolver,
} from "@/client/videos/types";

import * as S from "./UploadVideoDialog.styles";
import { UploadThumbnail } from "./UploadThumbnail";
import { useEffect, useState } from "react";
import { CreatePlaylistDialog } from "../CreatePlaylistDialog";
import { useUpdateVideo } from "@/client/videos/useUpdateVideo";
import { useUserPlaylists } from "@/client/videos/useUserPlaylists";
import { useAuthContext } from "@/contexts";
import { useAddVideoPlaylist } from "@/client/videos/useAddVideoPlaylist";

type Props = {
  onClose: () => void;
  video?: Video;
};

export const UploadVideoDialog = ({ onClose, video }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateVideoParams>({
    resolver: zodResolver(video ? UpdateVideoResolver : CreateVideoResolver),
  });

  useEffect(() => {
    if (video) {
      setValue("title", video?.title);
      setValue("description", video?.description);
      setValue("tags", `${video?.tags?.map((a) => a?.name)?.join(",")}`);
      // setValue("thumbnail", video?.thumbnail?.url);
    }
  }, [video]);

  const file = watch("file");
  const [isCreatePlaylistDialogVisible, setIsCreatePlaylistDialogVisible] =
    useState(false);

  const { session } = useAuthContext();
  const { userplaylists } = useUserPlaylists({ userId: session?.userId });
  const { upload, data: source, isSuccess: isSuccessUpload } = useUpload();

  const { upload: uploadThumbnail, isLoading: isUploadingThumbnail } =
    useUpload();

  const { addVideoPlaylist } = useAddVideoPlaylist();

  const {
    createVideo,
    isLoading: isCreatingVideo,
    isSuccess,
  } = useCreateVideo();

  const {
    updateVideo,
    isLoading: isUpdatingVideo,
    isSuccess: isUpdatingSuccess,
  } = useUpdateVideo();

  const isLoading = isUploadingThumbnail || isCreatingVideo || isUpdatingVideo;

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
              onSuccess: (video) => {
                // playlist && addVideoPlaylist(
                //   {
                //     videoId: video?.id,
                //     playlistId: playlist,
                //   },
                //   {
                //     onError: () => {
                //       toast.error(
                //         "Não foi possível adicionar o vídeo na playlist. Tente novamente"
                //       );
                //     },
                //   }
                // );
              },
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

  function handleUpdateVideo({
    title,
    description,
    tags = "",
  }: CreateVideoParams) {
    const tagsInArray = tags.split(",").map((tag) => tag.trim());
    video &&
      updateVideo(
        {
          videoId: video?.id,
          title,
          description,
          tags: tagsInArray,
        },
        {
          onError: () => {
            toast.error("Não foi possível editar o seu vídeo. Tente novamente");
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

  if (isUpdatingSuccess) {
    return (
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header closable={false} />
          <Dialog.Body>
            <Success
              title="Seu vídeo foi alterado com sucesso!"
              description="Agora que alterou seu vídeo, é só esperar para ver as discussões interessantes que podem surgir."
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
          <Dialog.Header
            title={video ? "Editar vídeo" : file ? file.name : "Enviar vídeo"}
            closable
          />
          <Dialog.Body>
            {file || video ? (
              <S.FormContainer
                onSubmit={handleSubmit(
                  video ? handleUpdateVideo : handleCreateVideo
                )}
              >
                <Field.Input
                  label="Título do vídeo"
                  placeholder="Escreva o título do seu vídeo"
                  errorText={errors.title?.message}
                  {...register("title")}
                />
                {!video && (
                  <Field.Input
                    label="Tags"
                    placeholder="Adicionar tags"
                    errorText={errors.tags?.message}
                    helperText="Use a ',' para separar as tags do seu vídeo. Exemplo: tag 1, tag 2"
                    {...register("tags")}
                  />
                )}
                {/* <Field.Select
                  label="Playlist"
                  placeholder="Selecione a playlist do vídeo"
                  {...register("playlist")}
                  onChange={setValue}
                  data={
                    userplaylists?.map((playlist) => {
                      return { value: playlist?.id, label: playlist?.title };
                    }) || []
                  }
                ></Field.Select> */}
                <Field label="Descrição" required={false}>
                  <TextArea
                    defaultValue={video?.description}
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
                {!video && (
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
                )}
              </S.FormContainer>
            ) : (
              <Dropzone
                {...register("file", { shouldUnregister: true })}
                control={control}
                onDropAccepted={handleUpload}
                accept={{ "video/*": [] }}
                maxSize={1024 * 1024 * (1024 * 5)}
              >
                Selecione arquivos de vídeo para fazer o envio
              </Dropzone>
            )}
          </Dialog.Body>
          <Divider />
          {(file || video) && (
            <Dialog.Footer
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: !video ? "space-between" : "flex-end",
                padding: "$4",
              }}
            >
              {!video && (
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
              )}
              {!video ? (
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!isSuccessUpload}
                  onClick={() => handleSubmit(handleCreateVideo)()}
                >
                  Postar vídeo
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={isLoading}
                  onClick={() => handleSubmit(handleUpdateVideo)()}
                >
                  Salvar alterações
                </Button>
              )}
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
};

export default UploadVideoDialog;
