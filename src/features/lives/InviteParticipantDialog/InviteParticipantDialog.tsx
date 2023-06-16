import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateVideo } from "@/client/videos";
import { MediaCategory, useUpload } from "@/client/media";
import { Button, Dialog, Divider, Field, Success } from "@/ui";

import * as S from "./InviteParticipantDialog.styles";
import { useCreatePlaylist } from "@/client/videos/useCreatePlaylist";
import {
  CreatePlaylistParams,
  CreatePlaylistResolver,
} from "@/client/playlists";
import {
  User,
  UserNicknameDecoder,
  UserNicknameParams,
  useUserFromNickname,
} from "@/client/users";
import { useStateManager } from "react-select";
import { useState } from "react";
import { useCreateLiveInvite } from "@/client/lives/useCreateLiveInvite";

type Props = {
  onClose: () => void;
  guests: User[];
  spaceId: string;
  liveId: string;
};

export function InviteParticipantDialog({
  onClose,
  guests,
  spaceId,
  liveId,
}: Props) {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UserNicknameParams>({
    resolver: zodResolver(UserNicknameDecoder),
  });
  const {
    createLiveInvite,
    isLoading: isInviteLoading,
    isError: isInviteError,
  } = useCreateLiveInvite();

  const { getUser, user, isLoading, isError, isSuccess } = useUserFromNickname({
    nickname: "" as string,
  });

  function handleCreatePlaylist({ nickname }: UserNicknameParams) {
    getUser({ nickname })
      .then((r) => {
        const guestMatch = guests.find((g) => g.id == r.id);

        if (guestMatch) {
          setError("nickname", {
            message: "Esse usuário já está na transmissão...",
          });
        } else {
          createLiveInvite(
            {
              guestId: r.id,
              liveId,
              spaceId,
            },
            {
              onSuccess: () => {
                toast.success("Convite enviado com sucesso!");
              },
              onError: () => {
                toast.error(
                  "Não foi possível enviar sua publicação. Tente novamente."
                );
              },
            }
          );
        }
      })
      .catch((err) => console.log(err));
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
    <Dialog open>
      <Dialog.Content>
        <Dialog.Header title={"Convidar"} onClose={onClose} closable />
        <Dialog.Body>
          <S.FormContainer onSubmit={handleSubmit(handleCreatePlaylist)}>
            <Field.Input
              label="Nickname"
              placeholder="Digite o nickname do usuário"
              errorText={errors.nickname?.message}
              {...register("nickname")}
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
            Procurar
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
