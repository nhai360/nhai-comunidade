import { useState } from "react";

import { AddCircleIcon } from "@/ui/_icons";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";

import * as S from "./CreatePostButton.styles";

export function CreatePostButton() {
  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  return (
    <>
      {isCreatePostDialogVisible && (
        <CreatePostDialog onClose={() => setIsCreatePostDialogVisible(false)} />
      )}

      <S.Container onClick={() => setIsCreatePostDialogVisible(true)}>
        <AddCircleIcon />
      </S.Container>
    </>
  );
}
