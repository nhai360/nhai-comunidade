import { Button, Typography } from "@/ui";
import { useAuthContext, useCommentContext } from "@/contexts";

import { Comment, useLikeComment } from "@/client/comments";

import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

import * as S from "./LikeAndReplyButtons.styles";

type Props = {
  comment: Comment;
  showReplyButton?: boolean;
};

export function LikeAndReplyButtons({
  comment,
  showReplyButton = true,
}: Props) {
  const { session } = useAuthContext();

  const { setReplyTo, fieldRef } = useCommentContext();

  const { likeComment } = useLikeComment();

  const { isEnabled: isEnabledLikesComments } = useFeatureFlag(
    FeatureDecoder.Values.LIKES_COMMENTS,
  );

  const alreadyLikedComment = Boolean(
    comment.likes.find((like) => like.authorId === session?.userId),
  );

  function handleReply() {
    setReplyTo(comment);
    fieldRef?.current?.focus();
  }

  function handleLike() {
    likeComment({
      commentId: comment.id,
      alreadyLiked: alreadyLikedComment,
    });
  }

  return (
    <S.Container>
      {isEnabledLikesComments && (
        <Button ghost variant="text" onClick={handleLike}>
          <Typography.Text
            size="caption"
            color={alreadyLikedComment ? "blue" : "primary"}
          >
            {alreadyLikedComment ? "Curtido" : "Curtir"}
          </Typography.Text>
        </Button>
      )}
      {showReplyButton && (
        <Button ghost variant="text" onClick={handleReply}>
          <Typography.Text size="caption">Responder</Typography.Text>
        </Button>
      )}
    </S.Container>
  );
}
