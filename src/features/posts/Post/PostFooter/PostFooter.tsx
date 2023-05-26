import { Post } from "@/client/posts";

import { PostStats } from "@/features/posts/Post/PostStats";
import { PostCommentList } from "@/features/posts/Post/PostCommentList";
import { PostCommentField } from "@/features/posts/Post/PostCommentField";

import * as S from "./PostFooter.styles";

type Props = {
  post: Post;
  expanded?: boolean;
};

export function PostFooter({ post, expanded = false }: Props) {
  return (
    <S.Container>
      <PostStats post={post} expanded={expanded} />

      <PostCommentList origin={post} originType="posts" expanded={expanded} />
      <PostCommentField origin={post} originType="posts" />
    </S.Container>
  );
}
