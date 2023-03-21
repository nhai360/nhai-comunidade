import { Avatar, Typography } from "@/ui";

import { Post } from "@/client/posts";
import { getInitials } from "@/lib/string";

import * as S from "./LikedBy.styles";

type Props = {
  post: Post;
};

export function LikedBy({ post }: Props) {
  const likesCount = post.stats.likes;

  const hasMoreLikes = likesCount >= 2;

  const usersLiked = post.likes.slice(0, 3).map((like) => like.author);
  const firstUserLiked = usersLiked.at(0);

  const firstUserLikedAndLikesCount = [
    `Curtido por ${firstUserLiked?.nickname}`,
    hasMoreLikes ? `e mais ${likesCount - 1} pessoas` : "",
  ].join(" ");

  const likedBy =
    likesCount > 0
      ? firstUserLikedAndLikesCount
      : "Essa publicação não possui curtidas";

  return (
    <S.Container>
      <S.AvatarGroup>
        {usersLiked.map((user) => (
          <Avatar.Square
            key={user.id}
            size="small"
            alt={user.fullName}
            fallback={getInitials(user.fullName)}
          />
        ))}
      </S.AvatarGroup>
      <Typography.Text size="body3" color="secondary">
        {likedBy}
      </Typography.Text>
    </S.Container>
  );
}
