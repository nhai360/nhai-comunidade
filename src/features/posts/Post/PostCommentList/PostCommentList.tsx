import { Divider } from "@/ui";

import { Comment } from "@/features/comments";
import { useComments } from "@/client/comments";

import * as S from "./PostCommentList.styles";

type Props = {
  expanded?: boolean;
};

export function PostCommentList({ expanded = false }: Props) {
  const comments = useComments();

  const slicedComments = expanded ? comments : comments.slice(0, 1);

  return (
    <>
      <Divider css={{ marginBlock: "$6" }} />
      <S.Container>
        {slicedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </S.Container>
    </>
  );
}
