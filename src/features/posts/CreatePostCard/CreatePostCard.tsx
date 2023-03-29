import { useState } from "react";

import { Avatar, Card, Input } from "@/ui";
import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";

import { CreatePostDialog } from "./CreatePostDialog";
import * as S from "./CreatePostCard.styles";
import { getInitials } from "@/lib/string";

export function CreatePostCard() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  return (
    <Card>
      <S.Content>
        {user && (
          <Avatar.Square
            alt={user?.fullName}
            fallback={getInitials(user?.fullName)}
          />
        )}
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
