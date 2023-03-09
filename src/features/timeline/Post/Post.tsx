import { Divider } from "@/ui";
import { Post as PostType } from "@/client/posts";

import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostCounter } from "./PostCounter";
import { PostHighlightComment } from "./PostHighlightComment";
import { PostCommentField } from "./PostCommentField";

import * as S from "./Post.styles";

type Props = {
  post: PostType;
};

export function Post({ post }: Props) {
  return (
    <>
      <PostHeader />
      <PostContent post={post} />
      <Divider />
      <S.Footer>
        <PostCounter post={post} />

        <PostHighlightComment />

        <PostCommentField />
      </S.Footer>
    </>
  );
}

Post.Header = PostHeader;
Post.Content = PostContent;
Post.Counter = PostCounter;
Post.CommentField = PostCommentField;
