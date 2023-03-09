import { useState } from "react";

import { Button } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

import { PostDialog } from "@/features/timeline";
import { Post as PostType } from "@/client/posts";

import { LikedBy } from "./LikedBy";

import * as S from "./PostCounter.styles";

type Props = {
  post: PostType;
};

export function PostCounter({ post }: Props) {
  const [isPostDialogVisible, setIsPostDialogVisible] = useState(false);

  return (
    <S.Container>
      <LikedBy />

      <S.Actions>
        <Button
          size="medium"
          variant="transparent"
          onClick={() => setIsPostDialogVisible(true)}
        >
          Ver mais 369 comentários
        </Button>
        <Button size="medium">
          <HeartIcon />
          Curtir
        </Button>
      </S.Actions>

      {isPostDialogVisible && (
        <PostDialog post={post} onClose={() => setIsPostDialogVisible(false)} />
      )}
    </S.Container>
  );
}
