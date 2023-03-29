import { Button, Typography } from "@/ui";
import { useCommentContext } from "@/contexts";

import { Comment } from "@/client/comments";

import * as S from "./LikeAndReplyButtons.styles";

type Props = {
  comment: Comment;
};

export function LikeAndReplyButtons({ comment }: Props) {
  const { setReplyTo, fieldRef } = useCommentContext();

  function handleReply() {
    setReplyTo(comment);
    fieldRef?.current?.focus();
  }

  return (
    <S.Container>
      <Button ghost variant="text">
        <Typography.Text size="caption">Curtir</Typography.Text>
      </Button>
      <Button ghost variant="text" onClick={handleReply}>
        <Typography.Text size="caption">Responder</Typography.Text>
      </Button>
    </S.Container>
  );
}
