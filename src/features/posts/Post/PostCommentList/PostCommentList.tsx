import { Divider } from "@/ui";

import { Post } from "@/client/posts";
import { Comment } from "@/features/comments";
import { useComments } from "@/client/comments";

import * as S from "./PostCommentList.styles";

type Props = {
  post: Post;
  expanded?: boolean;
};

export function PostCommentList({ post, expanded = false }: Props) {
  const { comments = post.comments } = useComments(
    {
      postId: post.id,
    },
    {
      enabled: expanded,
    },
  );

  const commentsToShow = expanded ? comments : comments.slice(0, 1);
  const maxReplies = expanded ? undefined : 2;

  return (
    <>
      <Divider css={{ marginBlock: "$6" }} />
      <S.Container>
        {commentsToShow.map((comment) => (
          <Comment
            post={post}
            key={comment.id}
            comment={comment}
            maxReplies={maxReplies}
          />
        ))}
      </S.Container>
    </>
  );
}
