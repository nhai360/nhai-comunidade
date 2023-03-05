import { useState } from "react";

import { Avatar, Card, Input } from "@/ui";
import { CreatePostDialog } from "@/features/timeline";

import * as S from "./CreatePostCard.styles";

export function CreatePostCard() {
  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  return (
    <Card>
      <S.Content>
        <Avatar.Square
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
          fallback="CT"
        />
        <Input
          placeholder="Começar nova publicação"
          onFocus={() => setIsCreatePostDialogVisible(true)}
        />
      </S.Content>

      {isCreatePostDialogVisible && (
        <CreatePostDialog onClose={() => setIsCreatePostDialogVisible(false)} />
      )}
    </Card>
  );
}
