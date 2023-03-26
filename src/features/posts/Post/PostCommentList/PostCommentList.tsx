import { Divider } from "@/ui";

import { Comment } from "@/features/comments";
import { Comment as CommentType } from "@/client/comments";

import * as S from "./PostCommentList.styles";

type Props = {
  expanded?: boolean;
  comments: CommentType[];
};

export function PostCommentList({ comments, expanded = false }: Props) {
  const commentsToShow = expanded ? comments : comments.slice(0, 1);

  return (
    <>
      <Divider css={{ marginBlock: "$6" }} />
      <S.Container>
        {commentsToShow.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </S.Container>
    </>
  );
}
