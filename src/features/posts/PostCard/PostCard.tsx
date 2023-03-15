import { Card, Divider } from "@/ui";
import { Post } from "@/features/posts";
import { Post as PostType } from "@/client/posts";

import * as S from "./PostCard.styles";

type Props = {
  post: PostType;
};

export function PostCard({ post }: Props) {
  return (
    <Card ghost>
      <S.Wrapper>
        <Post.Header />
        <Post.Content post={post} />
      </S.Wrapper>
      <Divider css={{ marginBlock: "$6" }} />
      <S.Wrapper css={{ paddingBottom: "$6" }}>
        <Post.Counter post={post} />

        <Post.CommentList />
        <Post.CommentField />
      </S.Wrapper>
    </Card>
  );
}
