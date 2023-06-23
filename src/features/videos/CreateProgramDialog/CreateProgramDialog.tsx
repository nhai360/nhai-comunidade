import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateVideo } from "@/client/videos";
import { MediaCategory, useUpload } from "@/client/media";
import { Button, Dialog, Divider, Field, Success } from "@/ui";

import * as S from "./CreateProgramDialog.styles";
import { useCreatePlaylist } from "@/client/videos/useCreatePlaylist";
import {
  CreatePlaylistParams,
  CreatePlaylistResolver,
} from "@/client/playlists";
import { handleCreatePrograma } from "@/services/firebase/programas";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export function CreateProgramDialog({ onClose }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePlaylistParams>({
    resolver: zodResolver(CreatePlaylistResolver),
  });

  const [loading, setLoading] = useState(false);

  const handleCreatePlaylist = async ({ title }: CreatePlaylistParams) => {
    setLoading(true);
    await handleCreatePrograma(title)
      .then(() => {
        onClose();
        toast.success("Programa criado com sucesso!");
      })
      .catch(() =>
        toast.error("Não foi possível criar o programa. Tente novamente!")
      );
    setLoading(false);
  };

  return (
    <Dialog open>
      <Dialog.Content>
        <Dialog.Header title={"Novo programa"} onClose={onClose} closable />
        <Dialog.Body>
          <S.FormContainer onSubmit={handleSubmit(handleCreatePlaylist)}>
            <Field.Input
              label="Nome do programa"
              placeholder="Escreva o nome do seu programa"
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
            loading={loading}
            onClick={() => handleSubmit(handleCreatePlaylist)()}
          >
            Criar programa
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
