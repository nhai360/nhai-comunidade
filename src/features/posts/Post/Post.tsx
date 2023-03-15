import { Divider } from "@/ui";
import { Post as PostType } from "@/client/posts";

import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostCounter } from "./PostCounter";
import { PostFooter } from "./PostFooter";
import { PostCommentList } from "./PostCommentList";
import { PostCommentField } from "./PostCommentField";

type Props = {
  post: PostType;
  expanded?: boolean;
};

export function Post({ post, expanded }: Props) {
  return (
    <>
      <PostHeader />
      <PostContent post={post} />
      <Divider />
      <PostFooter post={post} expanded={expanded} />
    </>
  );
}

Post.Header = PostHeader;
Post.Content = PostContent;
Post.Counter = PostCounter;
Post.CommentList = PostCommentList;
Post.CommentField = PostCommentField;
