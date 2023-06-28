import { Card, Divider } from "@/ui";
import { Post } from "@/features/posts";
import { Post as PostType } from "@/client/posts";

import { AppPostCardFooter } from "./AppPostCardFooter";
import { DesktopPostCardFooter } from "./DesktopPostCardFooter";
import { Wrapper } from "./DesktopPostCardFooter/DesktopPostCardFooter.styles";

type Props = {
  post: PostType;
  isAmstel?: boolean;
};

export function PostCardAmstel({ post, isAmstel }: Props) {
  return (
    <Card
      css={
        isAmstel
          ? {
              borderRadius: 4,
              fontFamily: "RingMedium",
            }
          : {}
      }
      ghost
    >
      <Wrapper>
        <Post.Header isAmstel post={post} />
        <Post.Content isAmstel post={post} />
      </Wrapper>
      <Divider
        css={{
          marginBlock: "$6",

          "@mobile": {
            marginBlock: 0,
          },
        }}
      />
      <DesktopPostCardFooter isAmstel post={post} />
      <AppPostCardFooter isAmstel post={post} />
    </Card>
  );
}
