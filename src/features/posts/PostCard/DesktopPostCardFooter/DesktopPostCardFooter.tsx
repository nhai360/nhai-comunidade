import { Post } from "@/features/posts";
import { CommentProvider } from "@/contexts";
import { Post as PostType } from "@/client/posts";

import * as S from "./DesktopPostCardFooter.styles";

type Props = {
  post: PostType;
};

export function DesktopPostCardFooter({ post }: Props) {
  return (
    <S.Wrapper
      css={{
        paddingBottom: "$6",

        "@mobile": {
          display: "none",
        },
      }}
    >
      <Post.Stats post={post} />

      <CommentProvider>
        <Post.CommentList post={post} />
        <Post.CommentField post={post} />
      </CommentProvider>
    </S.Wrapper>
  );
}
