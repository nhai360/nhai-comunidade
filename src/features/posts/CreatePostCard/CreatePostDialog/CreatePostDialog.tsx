import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Avatar, Button, Dialog } from "@/ui";
import {
  CreatePostFields,
  CreatePostSuccess,
  CreatePostUpload,
} from "@/features/posts";
import {
  CreatePostParams,
  createPostSchema,
  useCreatePost,
} from "@/client/posts";

import { ColorSelect } from "./ColorSelect";
import { UploadButton } from "./UploadButton";

import * as S from "./CreatePostDialog.styles";

type Props = {
  onClose: () => void;
};

export type Tabs = "color" | "upload";

export function CreatePostDialog({ onClose }: Props) {
  const form = useForm<CreatePostParams>({
    resolver: zodResolver(createPostSchema),
  });

  const [selectedTab, setSelectedTab] = useState<Tabs>();

  const { createPost, isSuccess, isLoading } = useCreatePost();

  const { handleSubmit, control } = form;
  const isUpload = selectedTab === "upload";

  function handleCreatePost(data: CreatePostParams) {
    createPost(data);
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
            <Avatar.Square
              size="large"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="Colm Tuite"
              fallback="CT"
            />
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
