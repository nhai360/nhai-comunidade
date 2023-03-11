import { Post } from "@/client/posts";

import { PostCounter } from "@/features/timeline/Post/PostCounter";
import { PostCommentList } from "@/features/timeline/Post/PostCommentList";
import { PostCommentField } from "@/features/timeline/Post/PostCommentField";

import * as S from "./PostFooter.styles";

type Props = {
  post: Post;
  expanded?: boolean;
};

export function PostFooter({ post, expanded = false }: Props) {
  return (
    <S.Container>
      <PostCounter post={post} expanded={expanded} />

      <PostCommentList expanded={expanded} />
      <PostCommentField />
    </S.Container>
  );
}
