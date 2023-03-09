import { Button, Card, Divider } from "@/ui";
import { Post } from "@/client/posts";

import { Header } from "./Header";
import { Content } from "./Content";
import { LikedBy } from "./LikedBy";
import { LikeButton } from "./LikeButton";
import { Comment } from "./Comment";
import { CommentField } from "./CommentField";

import * as S from "./PostCard.styles";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  return (
    <Card ghost>
      <Header />
      <Content post={post} />
      <Divider />
      <S.Footer>
        <S.Likes>
          <LikedBy />

          <S.LikeActions>
            <Button size="medium" variant="transparent">
              Ver mais 369 comentários
            </Button>
            <LikeButton />
          </S.LikeActions>
        </S.Likes>

        <Comment />

        <CommentField />
      </S.Footer>
    </Card>
  );
}
