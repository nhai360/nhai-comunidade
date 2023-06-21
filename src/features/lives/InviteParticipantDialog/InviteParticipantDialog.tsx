import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Field,
  Success,
  Typography,
} from "@/ui";

import * as S from "./InviteParticipantDialog.styles";
import styles from "./guestsCard.module.scss";
import {
  UserNicknameDecoder,
  UserNicknameParams,
  useUserFromNickname,
} from "@/client/users";
import { useCreateLiveInvite } from "@/client/lives/useCreateLiveInvite";
import { useRouter } from "next/router";
import { Guest } from "@/client/lives";

import { getInitials, getProfileUrl } from "@/lib/string";
import { Info } from "@phosphor-icons/react";

type Props = {
  onClose: () => void;
  guests: Guest[];
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
  let shareLink = "";

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
        const guestMatch = guests.find((g) => g.guest?.id == r.id);

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
      .catch((err) => {
        console.log(err);
        toast.error("Este usuário não existe.");
      });
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
          {guests.length < 5 && (
            <S.FormContainer onSubmit={handleSubmit(handleCreatePlaylist)}>
              <Field.Input
                label="Nickname"
                placeholder="Digite o nickname do usuário"
                errorText={errors.nickname?.message}
                {...register("nickname")}
              />
            </S.FormContainer>
          )}

          <div style={{ width: "100%", overflow: "auto" }}>
            {guests.map((d, k) => (
              <>
                <div key={k} className={styles.cardGuests}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <Avatar.Square
                      alt={d.guest?.fullName}
                      src={d.guest?.profilePicture?.url}
                      fallback={getInitials(d.guest?.fullName)}
                      level={d.guest?.score?.level}
                      size={"small"}
                      css={{
                        borderRadius: 32,
                        "@laptop": {
                          width: "32px",
                          height: "32px",
                          borderRadius: "32px",
                        },
                        "@mobile": {
                          width: "24px",
                          height: "24px",
                          borderRadius: "24px",
                        },
                      }}
                    />
                    <span>{d.guest?.fullName}</span>
                  </div>
                  <div></div>
                </div>
              </>
            ))}
          </div>
        </Dialog.Body>
        <Divider />
        <Dialog.Footer
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: guests.length < 5 ? "flex-end" : "space-between",
            padding: "$4",
          }}
        >
          {guests.length >= 5 && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Info size={32} />
                <Typography.Text
                  size="body2"
                  color="primary"
                  align="center"
                  weight="regular"
                >
                  Limite de participantes atingido...
                </Typography.Text>
              </div>
            </>
          )}
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
