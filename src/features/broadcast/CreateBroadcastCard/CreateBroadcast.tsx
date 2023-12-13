import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { MediaCategory, useUpload } from "@/client/media";
import {
  Button,
  Checkbox,
  Dialog,
  Divider,
  Field,
  TextArea,
} from "@/ui";

import { CreateVideoResolver, CreateVideoParams } from "@/client/videos/types";

import * as S from "./CreateBroadcastDialog.styles";
import { UploadThumbnail } from "./UploadThumbnail";
import { useCreateLive } from "@/client/lives/useCreateLive";
import { useRouter } from "next/router";
import { authenticatedAPI } from "@/client";

type Props = {
  onClose: () => void;
};

export function CreateBroadcastDialog({ onClose }: Props) {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVideoParams>({
    resolver: zodResolver(CreateVideoResolver),
  });

  const { upload: uploadThumbnail, isLoading: isUploadingThumbnail } =
    useUpload();

  const { createLive, isLoading: isCreatingLive } = useCreateLive();

  const isLoading = isUploadingThumbnail || isCreatingLive;

  const handleCreateVideo = async ({
    title,
    description,
    thumbnail,
    tags,
    visible,
  }: CreateVideoParams) => {
    const tagsInArray = tags.split(",").map((tag) => tag.trim());

    const source = await authenticatedAPI.post("/media", {
      category: MediaCategory?.VIDEO,
    });

    if (!source?.data?.id) {
      toast.error("Não foi possível criar a mídia :(");
      return;
    }

    uploadThumbnail(
      { file: thumbnail, category: MediaCategory.IMAGE },
      {
        onSuccess: (media) => {
          createLive(
            {
              title,
              description,
              thumbnail: {
                id: media?.id,
              },
              source: {
                id: source?.data?.id,
              },
              visible,
              tags: tagsInArray,
              startTime: new Date(),
            },
            {
              onSuccess: (live) => {
                router.push(`/lives/${live?.live.liveId}`);
              },
              onError: () => {
                toast.error("Não foi possível criar a live. Tente novamente");
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

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header title={"Nova Transmissão"} closable />
        <Dialog.Body>
          <S.FormContainer onSubmit={handleSubmit(handleCreateVideo)}>
            <Field.Input
              label="Título da transmissão"
              placeholder="Escreva o título da transmissão"
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
            <Field errorText={errors.visible?.message as string}>
              <Checkbox
                name="visible"
                defaultChecked={true}
                label="Deixar a gravação dessa live disponivel?"
                control={control}
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
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            onClick={() => handleSubmit(handleCreateVideo)()}
          >
            Criar transmissão
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
