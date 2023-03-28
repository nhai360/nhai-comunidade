import { theme } from "@/../stitches.config";

import { Button, Typography } from "@/ui";
import { DeleteIcon, EditIcon, ReplyIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { Comment } from "@/client/comments/types";
import { format } from "@/lib/date-fns";

import * as S from "./Actions.styles";

type Props = {
  comment: Comment;
};

export function Actions({ comment }: Props) {
  const { session } = useAuthContext();

  const isUserIdFromSessionIsEqualAuthorId =
    comment.author.id === session?.userId;

  const createdAtFormatted = format(
    new Date(comment.createdAt),
    "dd 'de' MMMM",
  );

  return (
    <S.Container>
      <Typography.Text size="caption" color="secondary" weight="medium">
        173 Gostaram
      </Typography.Text>
      <Typography.Text size="caption" color="title">
        {createdAtFormatted}
      </Typography.Text>
      {isUserIdFromSessionIsEqualAuthorId && (
        <S.Box>
          <Button ghost icon variant="transparent" size="small">
            <EditIcon color={theme.colors.textSecondary.value} />
          </Button>
          <Button ghost icon variant="transparent" size="small">
            <DeleteIcon color={theme.colors.textSecondary.value} />
          </Button>
          <Button ghost icon variant="transparent" size="small">
            <ReplyIcon color={theme.colors.textSecondary.value} />
          </Button>
        </S.Box>
      )}
    </S.Container>
  );
}