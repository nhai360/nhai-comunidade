import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useAuthContext } from "@/contexts";
import { Avatar, Button, Dialog, Success } from "@/ui";
import { CreatePostFields, CreatePostUpload } from "@/features/posts";
import {
  CreatePostParams,
  CreatePostDecoder,
  useCreatePost,
} from "@/client/posts";
import { useUpload } from "@/client/media";
import { useUser } from "@/client/users";
import { getInitials } from "@/lib/string";

import { ColorSelect } from "./ColorSelect";
import { UploadButton } from "./UploadButton";

import * as S from "./CreatePostDialog.styles";

type Props = {
  onClose: () => void;
};

export type Tabs = "color" | "upload";

export function CreatePostDialog({ onClose }: Props) {
  const { session } = useAuthContext();

  const form = useForm<CreatePostParams>({
    resolver: zodResolver(CreatePostDecoder),
  });

  const [selectedTab, setSelectedTab] = useState<Tabs>();

  const { user } = useUser({
    id: session?.userId,
  });

  const { createPost, isSuccess, isLoading: isCreating } = useCreatePost();
  const { upload, isLoading: isUploading } = useUpload();

  const { handleSubmit, control } = form;
  const isUpload = selectedTab === "upload";

  const isLoading = isCreating || isUploading;

  async function handleCreatePost(data: CreatePostParams) {
    if (data.image) {
      upload(data.image, {
        onSuccess: (media) => {
          createPost(
            {
              title: data.title,
              content: data.content,
              color: data.color,
              images: [media],
            },
            {
              onError: () => {
                toast.error(
                  "Não foi possível enviar sua publicação. Tente novamente.",
                );
              },
            },
          );
        },
        onError: () => {
          toast.error("Não foi possível enviar sua imagem. Tente novamente.");
        },
      });

      return;
    }

    createPost(data, {
      onError: () => {
        toast.error("Não foi possível enviar sua publicação. Tente novamente.");
      },
    });
  }

  if (isSuccess) {
    return (
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header closable={false} />
          <Dialog.Body>
            <Success
              title="Seu post foi publicado com sucesso!"
              description="Agora que compartilhou seus pensamentos com sua comunidade, só aguardar
        para ver as discussões interessantes que podem surgir."
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
        <Dialog.Header title="Criar novo post" closable />
        <Dialog.Body>
          <S.Container>
            {user && (
              <Avatar.Square
                size="large"
                alt={user.fullName}
                src={user.profilePicture?.url}
                fallback={getInitials(user.fullName)}
                css={{
                  "@mobile": {
                    display: "none",
                  },
                }}
              />
            )}
            <S.Form onSubmit={handleSubmit(handleCreatePost)}>
              <FormProvider {...form}>
                {isUpload ? <CreatePostUpload /> : <CreatePostFields />}
              </FormProvider>
              <S.Footer>
                <S.Actions>
                  <ColorSelect
                    name="color"
                    control={control}
                    selected={selectedTab === "color"}
                    onSelectTab={setSelectedTab}
                  />

                  <UploadButton
                    selected={selectedTab === "upload"}
                    onSelectTab={setSelectedTab}
                  />
                </S.Actions>

                <Button type="submit" loading={isLoading}>
                  Publicar
                </Button>
              </S.Footer>
            </S.Form>
          </S.Container>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  );
}
