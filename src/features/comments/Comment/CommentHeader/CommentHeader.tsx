import { Typography } from "@/ui";
import { Comment } from "@/client/comments";

import { Actions } from "./Actions";
import * as S from "./CommentHeader.styles";

type Props = {
  comment: Comment;
};

export function CommentHeader({ comment }: Props) {
  return (
    <S.Container>
      <Typography.Title size="h5" weight="bold">
        {comment.author.fullName}
      </Typography.Title>
      <Actions comment={comment} />
    </S.Container>
  );
}
