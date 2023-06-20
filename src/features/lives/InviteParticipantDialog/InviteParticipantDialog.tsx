import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateVideo } from "@/client/videos";
import { MediaCategory, useUpload } from "@/client/media";
import { Button, Dialog, Divider, Field, Success, Typography } from "@/ui";

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
import { useRouter } from "next/router";

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
    isSuccess,
  } = useCreateLiveInvite();

  const router = useRouter();
  let shareLink = ""

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    shareLink = hostname + router.asPath;
  }


  const { getUser, user, isLoading, isError } = useUserFromNickname({
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
                  "Não foi possível enviar seu convite. Tente novamente."
                );
              },
            }
          );
        }
      })
      .catch((err) => toast.error("Este usuário não existe."));
  }

  if (isSuccess) {
    return (
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header closable={false} />
          <Dialog.Body>
            <Success
              title="Convite enviado com sucesso!"
              description={`Agora você só precisa copiar o link abaixo e enviar para o convidado.`}
              onClose={onClose}
              automaticClose={false}
              link={`https://${shareLink}`}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
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
