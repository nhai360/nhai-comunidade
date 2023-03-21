import { useState } from "react";

import { Button } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { PostDialog } from "@/features/posts";
import { Post as PostType, useLikePost } from "@/client/posts";

import { LikedBy } from "./LikedBy";

import * as S from "./PostStats.styles";

type Props = {
  post: PostType;
  expanded?: boolean;
};

export function PostStats({ post, expanded = false }: Props) {
  const [isPostDialogVisible, setIsPostDialogVisible] = useState(false);

  const { likePost, isLoading: isLoadingLike } = useLikePost();

  const { session } = useAuthContext();

  const alreadyLikedPost = Boolean(
    post.likes.find((like) => like.authorId === session?.userId),
  );

  function handleLikePost() {
    likePost({
      postId: post.id,
      alreadyLiked: alreadyLikedPost,
    });
  }

  return (
    <S.Container>
      <LikedBy post={post} />

      <S.Actions>
        {!expanded && post.stats.comments > 0 && (
          <Button
            size="medium"
            variant="transparent"
            onClick={() => setIsPostDialogVisible(true)}
          >
            Ver mais {post.stats.comments} comentários
          </Button>
        )}
        <Button
          loading={isLoadingLike}
          variant={alreadyLikedPost ? "primary" : "light"}
          size="medium"
          onClick={handleLikePost}
        >
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
