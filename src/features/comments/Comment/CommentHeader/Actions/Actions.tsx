import { toast } from "react-toastify";

import { theme } from "@/../stitches.config";

import { Button, Typography } from "@/ui";
import { DeleteIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { Comment } from "@/client/comments/types";
import { useDeleteComment } from "@/client/comments";
import { format } from "@/lib/date-fns";

import * as S from "./Actions.styles";

type Props = {
  comment: Comment;
};

export function Actions({ comment }: Props) {
  const { session } = useAuthContext();

  const { deleteComment, isLoading: isDeleting } = useDeleteComment();

  function handleDeleteComment() {
    deleteComment(
      {
        commentId: comment.id,
      },
      {
        onSuccess: () => {
          toast.success("O seu comentário foi deletado com sucesso!");
        },
        onError: () => {
          toast.error(
            "Ocorreu um erro ao deletar seu comentário. Tente novamente",
          );
        },
      },
    );
  }

  const isUserIdFromSessionIsEqualAuthorId =
    comment.author.id === session?.userId;

  const createdAtFormatted = format(
    new Date(comment.createdAt),
    "dd 'de' MMMM",
  );

  return (
    <S.Container>
      <Typography.Text
        size="caption"
        color="secondary"
        weight="medium"
        css={{ "@mobile": { display: "none" } }}
      >
        {comment.stats.likes} Gostaram
      </Typography.Text>
      <Typography.Text
        size="caption"
        color="title"
        css={{ "@mobile": { display: "none" } }}
      >
        {createdAtFormatted}
      </Typography.Text>
      {isUserIdFromSessionIsEqualAuthorId && (
        <Button
          ghost
          icon
          variant="transparent"
          size="small"
          onClick={handleDeleteComment}
          loading={isDeleting}
        >
          <DeleteIcon color={theme.colors.textSecondary.value} />
        </Button>
      )}
    </S.Container>
  );
}
