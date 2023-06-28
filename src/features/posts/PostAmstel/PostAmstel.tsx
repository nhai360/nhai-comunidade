import { Divider } from "@/ui";
import { Post as PostType } from "@/client/posts";

import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostStats } from "./PostStats";
import { PostFooter } from "./PostFooter";
import { PostCommentList } from "./PostCommentList";
import { PostCommentField } from "./PostCommentField";

type Props = {
  post: PostType;
  expanded?: boolean;
  isAmstel?: boolean;
};

export function PostAmstel({ post, expanded }: Props) {
  return (
    <>
      <PostHeader post={post} />
      <PostContent post={post} />
      <Divider />
      <PostFooter post={post} expanded={expanded} />
    </>
  );
}

PostAmstel.Header = PostHeader;
PostAmstel.Content = PostContent;
PostAmstel.Stats = PostStats;
PostAmstel.CommentList = PostCommentList;
PostAmstel.CommentField = PostCommentField;
