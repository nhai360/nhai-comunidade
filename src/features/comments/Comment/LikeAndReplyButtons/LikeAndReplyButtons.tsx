import { Button, Typography } from "@/ui";
import { useCommentContext } from "@/contexts";

import { Comment } from "@/client/comments";

import * as S from "./LikeAndReplyButtons.styles";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

type Props = {
  comment: Comment;
  showReplyButton?: boolean;
};

export function LikeAndReplyButtons({
  comment,
  showReplyButton = true,
}: Props) {
  const { setReplyTo, fieldRef } = useCommentContext();

  const { isEnabled: isEnabledLikesComments } = useFeatureFlag(
    FeatureDecoder.Values.LIKES_COMMENTS,
  );

  function handleReply() {
    setReplyTo(comment);
    fieldRef?.current?.focus();
  }

  return (
    <S.Container>
      {isEnabledLikesComments && (
        <Button ghost variant="text">
          <Typography.Text size="caption">Curtir</Typography.Text>
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
