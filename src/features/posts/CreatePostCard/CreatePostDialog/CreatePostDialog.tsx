import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "@/contexts";
import { Avatar, Button, Dialog } from "@/ui";
import {
  CreatePostFields,
  CreatePostSuccess,
  CreatePostUpload,
} from "@/features/posts";
import {
  CreatePostParams,
  CreatePostDecoder,
  useCreatePost,
} from "@/client/posts";
import { useUpload } from "@/client/media";
import { getInitials } from "@/lib/string";

import { ColorSelect } from "./ColorSelect";
import { UploadButton } from "./UploadButton";

import * as S from "./CreatePostDialog.styles";
import { useUser } from "@/client/users";
import { toast } from "react-toastify";

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
            <CreatePostSuccess onClose={onClose} />
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
