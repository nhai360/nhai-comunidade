import { Card, Divider } from "@/ui";
import { Post } from "@/features/posts";
import { Post as PostType } from "@/client/posts";

import { AppPostCardFooter } from "./AppPostCardFooter";
import { DesktopPostCardFooter } from "./DesktopPostCardFooter";
import { Wrapper } from "./DesktopPostCardFooter/DesktopPostCardFooter.styles";

type Props = {
  post: PostType;
};

export function PostCard({ post }: Props) {
  return (
    <Card ghost>
      <Wrapper>
        <Post.Header post={post} />
        <Post.Content post={post} />
      </Wrapper>
      <Divider
        css={{
          marginBlock: "$6",

          "@mobile": {
            marginBlock: 0,
          },
        }}
      />
      <DesktopPostCardFooter post={post} />
      <AppPostCardFooter post={post} />
    </Card>
  );
}
