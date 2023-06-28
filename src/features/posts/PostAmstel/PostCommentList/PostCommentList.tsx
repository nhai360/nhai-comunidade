import { Divider } from "@/ui";

import { Post } from "@/client/posts";
import { Comment } from "@/features/comments";
import { useComments } from "@/client/comments";

import * as S from "./PostCommentList.styles";

type Props = {
  origin: any;
  originType: "posts" | "videos";
  expanded?: boolean;
};

export function PostCommentList({
  origin,
  originType,
  expanded = false,
}: Props) {
  const { comments } = useComments(
    {
      originId: origin.id,
      originType,
    },
    {
      enabled: expanded,
    }
  );

  const commentsToShow = expanded ? comments : comments.slice(0, 1);
  const maxReplies = expanded ? undefined : 2;

  return (
    <>
      <Divider css={{ marginBlock: "$6" }} />
      <S.Container>
        {commentsToShow.map((comment) => (
          <Comment
            origin={origin}
            key={comment.id}
            comment={comment}
            maxReplies={maxReplies}
          />
        ))}
      </S.Container>
    </>
  );
}
