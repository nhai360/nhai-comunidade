import { Divider } from "@/ui";

import { Comment } from "@/features/comments";

import * as S from "./PostCommentList.styles";
import { Post } from "@/client/posts";

type Props = {
  post: Post;
  expanded?: boolean;
};

export function PostCommentList({ post, expanded = false }: Props) {
  const comments = post.comments;
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
