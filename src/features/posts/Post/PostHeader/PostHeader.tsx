import { useState } from "react";

import { Avatar, Button, Tooltip, Typography } from "@/ui";
import { CheckIcon, LinkIcon } from "@/ui/_icons";

import { theme } from "@/../stitches.config";

import { Post } from "@/client/posts";
import { getInitials } from "@/lib/string";
import { formatDistanceToNow } from "@/lib/date-fns";

import * as S from "./PostHeader.styles";

type Props = {
  post: Post;
};

export function PostHeader({ post }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const createdAtFormatted = formatDistanceToNow(new Date(post.createdAt));

  function handleCopyPostUrl() {
    navigator.clipboard.writeText(
      `${window.location.origin}?postId=${post.id}`,
    );

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

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
        <Tooltip message={isCopied ? "Copiado" : "Copiar link"}>
          <Button icon variant="transparent" onClick={handleCopyPostUrl}>
            {isCopied ? (
              <CheckIcon size={20} color={theme.colors.textSecondary.value} />
            ) : (
              <LinkIcon color={theme.colors.textSecondary.value} />
            )}
          </Button>
        </Tooltip>
      </S.Actions>
    </S.Container>
  );
}
