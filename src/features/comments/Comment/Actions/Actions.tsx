import { theme } from "@/../stitches.config";

import { Button, Typography } from "@/ui";
import {
  DeleteIcon,
  EditIcon,
  HorizontalDotsIcon,
  ReplyIcon,
} from "@/ui/_icons";

import * as S from "./Actions.styles";
import { Comment } from "@/client/comments/types";

type Props = {
  comment: Comment;
};

export function Actions({ comment }: Props) {
  const isAuthor = comment.author.id === "1";

  return (
    <S.Container>
      <Typography.Text size="caption" color="secondary" weight="medium">
        173 Gostaram
      </Typography.Text>
      <Typography.Text size="caption" color="title">
        07 de Maio
      </Typography.Text>
      {isAuthor ? (
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
      ) : (
        <Button ghost icon variant="transparent" size="small">
          <HorizontalDotsIcon
            size={19}
            color={theme.colors.textSecondary.value}
          />
        </Button>
      )}
    </S.Container>
  );
}
