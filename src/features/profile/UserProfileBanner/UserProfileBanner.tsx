import { useMemo, useState } from "react";
import ReactDropzone from "react-dropzone";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

import { theme } from "@/../stitches.config";

import { useAuthContext } from "@/contexts";

import { useUpload } from "@/client/media";
import { useUpdateUser, useUserFromNickname } from "@/client/users";

import { EditIcon } from "@/ui/_icons";

import * as S from "./UserProfileBanner.styles";

const MAX_SIZE = 1024 * 1024; // 1mb

export function UserProfileBanner() {
  const router = useRouter();

  const { session } = useAuthContext();

  const { nickname } = router.query;

  const { user } = useUserFromNickname({
    nickname: nickname as string,
  });

  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { upload, isLoading: isUploading } = useUpload();

  function handleDropRejected() {
    toast.error("Imagem não suportada. Use apenas imagens com até 1MB");
  }

  function handleDropAccepted(acceptedFiles: File[]) {
    if (!session) return;

    upload(acceptedFiles[0], {
      onSuccess: (banner) => {
        updateUser(
          {
            userId: session.userId,
            banner,
          },
          {
            onError: () => {
              toast.error(
                "Não foi possível atualizar seu perfil. Tente novamente.",
              );
            },
          },
        );
      },
    });
  }

  const isLoading = isUpdating || isUploading;

  return (
    <S.Container>
      {user?.banner?.url ? (
        <S.Banner src={user.banner.url} />
      ) : (
        <S.Placeholder />
      )}

      {user?.id === session?.userId && (
        <ReactDropzone
          accept={{ "image/*": [] }}
          onDropRejected={handleDropRejected}
          onDropAccepted={handleDropAccepted}
          maxSize={MAX_SIZE}
        >
          {({ getRootProps, getInputProps }) => (
            <S.EditButton
              icon
              variant="transparent"
              loading={isLoading}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <EditIcon size={24} color={theme.colors.textSecondary.value} />
            </S.EditButton>
          )}
        </ReactDropzone>
      )}
    </S.Container>
  );
}
