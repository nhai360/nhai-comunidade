import { Avatar, Button, Tag, Tooltip, Typography } from "@/ui";
import { LinkIcon } from "@/ui/_icons";

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
        <Tooltip message="Copiar link">
          <Button icon variant="transparent">
            <LinkIcon color={theme.colors.textSecondary.value} />
          </Button>
        </Tooltip>
      </S.Actions>
    </S.Container>
  );
}
