import { Avatar, Typography } from "@/ui";

import { Post } from "@/client/posts";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import * as S from "./LikedBy.styles";

type Props = {
  post: Post;
};

export function LikedBy({ post }: Props) {
  const likesCount = post.stats.likes;

  const hasLikes = likesCount > 0;
  const hasMoreLikes = likesCount >= 2;

  const usersLiked = post.likes.slice(0, 3).map((like) => like.author);
  const firstUserLiked = usersLiked.at(0);

  const firstUserLikedAndLikesCount = [
    `Curtido por ${getFirstNameAndLastName(firstUserLiked?.fullName)}`,
    hasMoreLikes ? `e mais ${likesCount - 1} pessoas` : "",
  ].join(" ");

  const likedBy = hasLikes
    ? firstUserLikedAndLikesCount
    : "Essa publicação não possui curtidas";

  return (
    <S.Container>
      {hasLikes && (
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
      )}
      <Typography.Text size="body3" color="secondary">
        {likedBy}
      </Typography.Text>
    </S.Container>
  );
}
