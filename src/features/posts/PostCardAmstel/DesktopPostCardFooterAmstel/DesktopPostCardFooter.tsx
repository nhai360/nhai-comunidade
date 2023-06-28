import { Post } from "@/features/posts";
import { CommentProvider } from "@/contexts";
import { Post as PostType } from "@/client/posts";

import * as S from "./DesktopPostCardFooter.styles";

type Props = {
  post: PostType;
  isAmstel?: boolean;
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
      <Post.Stats isAmstel post={post} />

      <CommentProvider>
        <Post.CommentList origin={post} originType="posts" />
        <Post.CommentField origin={post} originType="posts" />
      </CommentProvider>
    </S.Wrapper>
  );
}
