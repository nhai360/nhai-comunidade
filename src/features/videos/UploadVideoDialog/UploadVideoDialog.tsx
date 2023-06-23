import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateVideo } from "@/client/videos";
import { Media, MediaCategory, useUpload } from "@/client/media";
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
import { CheckCircleIcon, CloseIcon } from "@/ui/_icons";

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
import { useAuthContext } from "@/contexts";
import { useVideoPlaylist } from "@/client/videos/useAddVideoPlaylist";
import { UploadVideoToMux } from "@/client/media/UploadVideoToMux";
import { PlaylistsSelector } from "../PlaylistsSelector";
import { useUser } from "@/client/users";
import { ProgramSelector } from "../ProgramSelector";
import { CreateProgramDialog } from "../CreateProgramDialog";
import {
  handleAddProgramaModule,
  handleProgramas,
} from "@/services/firebase/programas";

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
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const [program, setProgram] = useState<any>();
  const [playlist, setPlaylist] = useState<any>();
  const [source, setSource] = useState<Media>();

  const [isCreatePlaylistDialogVisible, setIsCreatePlaylistDialogVisible] =
    useState(false);
  const [isCreateProgramVisible, setIsCreateProgramVisible] = useState(false);

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAmstel =
    user?.nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO;

  const { upload: uploadThumbnail, isLoading: isUploadingThumbnail } =
    useUpload();

  const {
    add: { addVideoPlaylist, isLoading: isPlaylistAddLoading },
    remove: { removeVideoPlaylist, isLoading: isPlaylistRemoveLoading },
  } = useVideoPlaylist();

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

  const [programas, setProgramas] = useState<any[]>([]);

  useEffect(() => {
    handleProgramas(setProgramas);
  }, []);

  const isLoading =
    isUploadingThumbnail ||
    isCreatingVideo ||
    isPlaylistAddLoading ||
    isPlaylistRemoveLoading ||
    isUpdatingVideo;

  function handleUpload(files: File[]) {
    const currentFile = files[0];
    if (!currentFile) {
      return;
    }

    UploadVideoToMux({
      file: currentFile,
      setUploadPercent,
      setIsUploadError,
      setIsUploadSuccess,
      setSource: setSource as any,
    });
  }

  const handleCreateVideo = async ({
    title,
    description,
    thumbnail,
    tags,
  }: CreateVideoParams) => {
    if (!source) {
      console.log("Source:", source);
      return toast.error(
        "Você precisa fazer um novo upload de vídeo, o anterior falhou!"
      );
    }

    if (isAmstel && (!playlist || !program)) {
      return toast.error("Programa e módulo são obrigatórios!");
    }

    if (isAmstel) {
      await handleAddProgramaModule(program?.value, [
        ...programas
          ?.find((p) => p?._id === program?.value)
          ?.modules?.filter((m: any) => m !== playlist?.value),
        playlist?.value,
      ]);
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
                playlist?.value &&
                  addVideoPlaylist(
                    {
                      videoId: video?.id,
                      playlistId: playlist?.value,
                    },
                    {
                      onError: () => {
                        toast.error(
                          "Não foi possível adicionar o vídeo na playlist. Tente novamente"
                        );
                      },
                    }
                  );
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
  };

  function handleUpdateVideo({
    title,
    description,
    tags = "",
  }: CreateVideoParams) {
    const tagsInArray = tags.split(",").map((tag) => tag.trim());
    const hasChangePlaylist = video?.playlist?.id != playlist?.value;
    if (hasChangePlaylist) {
      if (playlist?.value) {
        addVideoPlaylist(
          {
            videoId: video?.id,
            playlistId: playlist?.value,
          },
          {
            onError: () => {
              toast.error(
                "Não foi alterar a playlist do vídeo. Tente novamente"
              );
            },
          }
        );
      } else {
        removeVideoPlaylist(
          {
            videoId: video?.id,
            playlistId: video?.playlist?.id,
          },
          {
            onError: () => {
              toast.error(
                "Não foi remover o vídeo da playlist. Tente novamente"
              );
            },
          }
        );
      }
    }

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

  useEffect(() => {
    video?.playlist &&
      setPlaylist({
        value: video?.playlist?.id,
        label: video.playlist?.title,
      });
  }, [video]);

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

  const videoString = isAmstel ? "episódio" : "vídeo";

  return (
    <>
      <Dialog open>
        <Dialog.Content>
          <Dialog.Header
            title={
              video
                ? `Editar ${videoString}`
                : file
                ? file.name
                : `Enviar ${videoString}`
            }
            closable
            onClose={onClose}
          />
          <Dialog.Body>
            {file || video ? (
              <S.FormContainer
                onSubmit={handleSubmit(
                  video ? handleUpdateVideo : handleCreateVideo
                )}
              >
                <Field.Input
                  label={`Título do ${videoString}`}
                  placeholder={`Escreva o título do seu ${videoString}`}
                  errorText={errors.title?.message}
                  {...register("title")}
                />
                {isAmstel && (
                  <ProgramSelector
                    playlist={program}
                    setPlaylist={setProgram}
                    handleCreatePlaylist={() => setIsCreateProgramVisible(true)}
                    programas={programas}
                  />
                )}
                <PlaylistsSelector
                  playlist={playlist}
                  setPlaylist={setPlaylist}
                  isOpicional={!isAmstel}
                  handleCreatePlaylist={() =>
                    setIsCreatePlaylistDialogVisible(true)
                  }
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
                  {uploadPercent < 100 ? (
                    <>
                      <Loading />
                      {uploadPercent >= 100
                        ? `Processando vídeo`
                        : `Enviando vídeo ${
                            uploadPercent && `(${uploadPercent}%)`
                          }`}
                    </>
                  ) : isUploadError ? (
                    <>
                      <CloseIcon />
                      Falha no upload do vídeo
                    </>
                  ) : (
                    isUploadSuccess && (
                      <>
                        <CheckCircleIcon />
                        Vídeo carregado e pronto para ser postado
                      </>
                    )
                  )}
                </Typography.Text>
              )}
              {!video ? (
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!isUploadSuccess || uploadPercent < 100}
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
      {isCreateProgramVisible && (
        <CreateProgramDialog onClose={() => setIsCreateProgramVisible(false)} />
      )}
    </>
  );
};

export default UploadVideoDialog;
