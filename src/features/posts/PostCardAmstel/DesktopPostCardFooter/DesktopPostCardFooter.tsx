import { PostAmstel } from "@/features/posts";
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
      <PostAmstel.Stats isAmstel post={post} />

      <CommentProvider>
        <PostAmstel.CommentList origin={post} originType="posts" />
        <PostAmstel.CommentField origin={post} originType="posts" />
      </CommentProvider>
    </S.Wrapper>
  );
}
