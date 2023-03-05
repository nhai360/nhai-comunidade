import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Avatar, Button, Dialog } from "@/ui";
import {
  CreatePostFields,
  CreatePostSuccess,
  CreatePostUpload,
} from "@/features/timeline";

import { ColorSelect } from "./ColorSelect";
import { UploadButton } from "./UploadButton";

import * as S from "./CreatePostDialog.styles";

type Props = {
  onClose: () => void;
};

export type Tabs = "color" | "upload";

export function CreatePostDialog({ onClose }: Props) {
  const form = useForm();
  const [selectedTab, setSelectedTab] = useState<Tabs>();

  const [isSuccess, setIsSuccess] = useState(false);

  const { handleSubmit, control } = form;
  const isUpload = selectedTab === "upload";

  function handleCreatePost() {
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <Dialog.Root open onOpenChange={onClose}>
        <Dialog closable={false}>
          <CreatePostSuccess onClose={onClose} />
        </Dialog>
      </Dialog.Root>
    );
  }

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog title="Criar novo post">
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

              <Button type="submit">Publicar</Button>
            </S.Footer>
          </S.Form>
        </S.Container>
      </Dialog>
    </Dialog.Root>
  );
}
