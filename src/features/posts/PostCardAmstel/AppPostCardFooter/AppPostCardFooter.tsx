import { useState } from "react";
import { Post } from "@/client/posts";

import { Button } from "@/ui";

import { PostDialogAmstel } from "@/features/posts";

import { LikeButton } from "./LikeButton";
import { CopyPostUrlButton } from "./CopyPostUrlButton";

import * as S from "./AppPostCardFooter.styles";

type Props = {
  post: Post;
  isAmstel?: boolean;
};

export function AppPostCardFooter({ post, isAmstel }: Props) {
  const [isPostDialogVisible, setIsPostDialogVisible] = useState(false);

  return (
    <S.Container>
      <LikeButton isAmstel post={post} />
      <S.Action>
        {post.stats.comments > 0 && (
          <Button
            variant="text"
            size="small"
            ghost
            css={
              isAmstel
                ? {
                    color: "red",
                    fontSize: "$body3",
                    fontWeight: 500,
                    fontFamily: "RingBold",
                  }
                : { color: "$blueDark", fontSize: "$body3", fontWeight: 500 }
            }
            onClick={() => setIsPostDialogVisible(true)}
          >
            {`${post.stats.comments} comentário(s)`}
          </Button>
        )}
        <CopyPostUrlButton isAmstel post={post} />
      </S.Action>

      {isPostDialogVisible && (
        <PostDialogAmstel
          postId={post.id}
          isAmstel
          onClose={() => setIsPostDialogVisible(false)}
        />
      )}
    </S.Container>
  );
}
