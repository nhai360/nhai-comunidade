import { useState } from "react";
import { Post } from "@/client/posts";

import { Button } from "@/ui";

import { PostDialog } from "@/features/posts";

import { LikeButton } from "./LikeButton";
import { CopyPostUrlButton } from "./CopyPostUrlButton";

import * as S from "./AppPostCardFooter.styles";

type Props = {
  post: Post;
};

export function AppPostCardFooter({ post }: Props) {
  const [isPostDialogVisible, setIsPostDialogVisible] = useState(false);

  return (
    <S.Container>
      <LikeButton post={post} />
      <S.Action>
        <Button
          variant="text"
          size="small"
          ghost
          css={{ color: "$blueDark", fontSize: "$body3", fontWeight: 500 }}
          onClick={() => setIsPostDialogVisible(true)}
        >
          {`${post.stats.comments} comentários`}
        </Button>
        <CopyPostUrlButton post={post} />
      </S.Action>

      {isPostDialogVisible && (
        <PostDialog
          postId={post.id}
          onClose={() => setIsPostDialogVisible(false)}
        />
      )}
    </S.Container>
  );
}
