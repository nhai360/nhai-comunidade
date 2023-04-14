import ReactDropzone from "react-dropzone";
import { toast } from "react-toastify";

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

  function handleDropRejected() {
    toast.error("Imagem não suportada. Use apenas imagens com até 1MB");
  }

  function handleDropAccepted(acceptedFiles: File[]) {
    // field.onChange(acceptedFiles[0]);
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
