import { useState } from "react";

import { Button } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { PostDialog } from "@/features/posts";
import { Post as PostType, useLikePost } from "@/client/posts";

import { LikedBy } from "./LikedBy";

import * as S from "./PostStats.styles";
import { PostDialogAmstel } from "../../PostDialogAmstel";

type Props = {
  post: PostType;
  expanded?: boolean;
  isAmstel?: boolean;
};

export function PostStats({ post, isAmstel, expanded = false }: Props) {
  const [isPostDialogVisible, setIsPostDialogVisible] = useState(false);

  const { likePost, isLoading } = useLikePost();

  const { session } = useAuthContext();

  const alreadyLikedPost = Boolean(
    post.likes.find((like) => like.authorId === session?.userId)
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
            css={
              isAmstel
                ? {
                    fontFamily: "RingBold",
                    color: "red",
                    borderRadius: 0,
                    "&:not(:disabled):hover": {
                      background: "red !important",
                    },
                  }
                : {}
            }
          >
            Ver mais {post.stats.comments} comentários
          </Button>
        )}
        <Button
          size="medium"
          loading={isLoading}
          variant="primary"
          onClick={handleLikePost}
          css={
            isAmstel
              ? {
                  fontFamily: "RingBold",
                  color: "black",
                  borderRadius: 0,
                  backgroundColor: "white",
                  textTransform: "uppercase",
                  "&:not(:disabled):hover": {
                    background: "#f1f1f1 !important",
                  },
                }
              : {}
          }
        >
          <HeartIcon
            color={!isAmstel ? "white" : "red"}
            fill={
              alreadyLikedPost && isAmstel
                ? "red"
                : alreadyLikedPost
                ? "currentColor"
                : "none"
            }
          />
          <span
            style={
              isAmstel
                ? {
                    textTransform: "uppercase",
                    fontFamily: "RingBold",
                    color: "black",
                  }
                : {
                    textTransform: "unset",
                  }
            }
          >
            {alreadyLikedPost ? "Curtido" : "Curtir"}
          </span>
        </Button>
      </S.Actions>

      {isPostDialogVisible && isAmstel && (
        <PostDialogAmstel
          postId={post.id}
          onClose={() => setIsPostDialogVisible(false)}
        />
      )}

      {isPostDialogVisible && !isAmstel && (
        <PostDialog
          postId={post.id}
          onClose={() => setIsPostDialogVisible(false)}
        />
      )}
    </S.Container>
  );
}
