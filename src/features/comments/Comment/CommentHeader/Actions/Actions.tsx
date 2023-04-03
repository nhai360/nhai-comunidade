import { theme } from "@/../stitches.config";

import { Button, Typography } from "@/ui";
import { DeleteIcon, EditIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { Comment } from "@/client/comments/types";
import { format } from "@/lib/date-fns";

import * as S from "./Actions.styles";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

type Props = {
  comment: Comment;
};

export function Actions({ comment }: Props) {
  const { session } = useAuthContext();

  const { isEnabled: isEnabledLikesComments } = useFeatureFlag(
    FeatureDecoder.Values.LIKES_COMMENTS,
  );

  const isUserIdFromSessionIsEqualAuthorId =
    comment.author.id === session?.userId;

  const createdAtFormatted = format(
    new Date(comment.createdAt),
    "dd 'de' MMMM",
  );

  return (
    <S.Container>
      {isEnabledLikesComments && (
        <Typography.Text
          size="caption"
          color="secondary"
          weight="medium"
          css={{ "@mobile": { display: "none" } }}
        >
          173 Gostaram
        </Typography.Text>
      )}
      <Typography.Text
        size="caption"
        color="title"
        css={{ "@mobile": { display: "none" } }}
      >
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
        </S.Box>
      )}
    </S.Container>
  );
}
