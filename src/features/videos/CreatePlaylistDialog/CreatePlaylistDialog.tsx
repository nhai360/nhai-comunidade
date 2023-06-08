import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateVideo } from "@/client/videos";
import { MediaCategory, useUpload } from "@/client/media";
import { Button, Dialog, Divider, Field, Success } from "@/ui";

import {
  CreateVideoResolver,
  CreateVideoParams,
  CreatePlaylistParams,
} from "@/client/videos/types";

import * as S from "./CreatePlaylistDialog.styles";
import { useCreatePlaylist } from "@/client/videos/useCreatePlaylist";

type Props = {
  onClose: () => void;
};

export function CreatePlaylistDialog({ onClose }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVideoParams>({
    resolver: zodResolver(CreateVideoResolver),
  });

  const {
    createPlaylist,
    isLoading: isCreatingPlaylist,
    isSuccess,
  } = useCreatePlaylist();

  const isLoading = isCreatingPlaylist;

  function handleCreatePlaylist({ title }: CreatePlaylistParams) {
    console.log("To aqui");
    createPlaylist(
      {
        title,
      },
      {
        onSuccess: (media) => {},
        onError: () => {
          toast.error("Não foi possível criar a playlist. Tente novamente!");
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
              title="Sua playlist foi criada com sucesso!"
              description="Agora pode adicionar seus vídeos a essa playlist."
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
        <Dialog.Header title={"Nova playlist"} closable />
        <Dialog.Body>
          <S.FormContainer onSubmit={handleSubmit(handleCreatePlaylist)}>
            <Field.Input
              label="Nome da playlist"
              placeholder="Escreva o nome da sua playlist"
              errorText={errors.title?.message}
              {...register("title")}
            />
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
            onClick={() => handleSubmit(handleCreatePlaylist)()}
          >
            Criar playlist
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
