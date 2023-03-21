import { Avatar, Button, Tag, Typography } from "@/ui";
import { HorizontalDotsIcon, LinkIcon } from "@/ui/_icons";

import { theme } from "@/../stitches.config";

import { Post } from "@/client/posts";
import { getInitials } from "@/lib/string";
import { formatDistanceToNow } from "@/lib/date-fns";

import * as S from "./PostHeader.styles";

type Props = {
  post: Post;
};

export function PostHeader({ post }: Props) {
  const createdAtFormatted = formatDistanceToNow(new Date(post.createdAt));

  return (
    <S.Container>
      <S.User>
        <Avatar.Square
          src=""
          alt={post.author.fullName}
          fallback={getInitials(post.author.fullName)}
        />

        <S.Info>
          <S.FullName>
            {post.author.fullName}
            <Tag variant="blue">ADMIN</Tag>
            <Typography.Text color="secondary" size="caption">
              {createdAtFormatted} atrás
            </Typography.Text>
          </S.FullName>
          <Typography.Text color="secondary" size="caption">
            {post.author.nickname}
          </Typography.Text>
        </S.Info>
      </S.User>
      <S.Actions>
        <Button icon variant="transparent">
          <HorizontalDotsIcon color={theme.colors.textSecondary.value} />
        </Button>
        <Button icon variant="transparent">
          <LinkIcon color={theme.colors.textSecondary.value} />
        </Button>
      </S.Actions>
    </S.Container>
  );
}
