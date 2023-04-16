import { useMemo } from "react";
import ReactDropzone from "react-dropzone";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";

import { Avatar } from "@/ui";
import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";

import { AddPhotoIcon } from "@/ui/_icons";
import { getInitials } from "@/lib/string";

import * as S from "./UploadAvatar.styles";

const MAX_SIZE = 1024 * 1024; // 1mb

export function UploadAvatar() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const { setValue, watch } = useFormContext();

  const avatarAttached = watch("avatar");

  const previewUrl = useMemo(() => {
    if (avatarAttached) {
      return URL.createObjectURL(avatarAttached);
    }

    return user?.profilePicture?.url;
  }, [avatarAttached, user]);

  function handleDropRejected() {
    toast.error("Imagem não suportada. Use apenas imagens com até 1MB");
  }

  function handleDropAccepted(acceptedFiles: File[]) {
    setValue("avatar", acceptedFiles[0]);
  }

  return (
    <ReactDropzone
      accept={{ "image/*": [] }}
      onDropRejected={handleDropRejected}
      onDropAccepted={handleDropAccepted}
      maxSize={MAX_SIZE}
    >
      {({ getRootProps, getInputProps }) => (
        <S.Container {...getRootProps()}>
          <input {...getInputProps()} />
          <Avatar.Square
            size="large"
            src={previewUrl}
            fallback={getInitials(user?.fullName)}
            alt={user?.fullName}
          />
          <button type="button" title="Upload avatar">
            <AddPhotoIcon />
          </button>
        </S.Container>
      )}
    </ReactDropzone>
  );
}
