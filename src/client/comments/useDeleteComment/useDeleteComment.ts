import { authenticatedAPI } from "@/client";
import { DeleteParams } from "@/client/comments/types";
import { useMutation, useQueryClient } from "react-query";
import { invalidateCommentsQueries } from "..";

async function deleteCommentRequest({ commentId }: DeleteParams) {
  await authenticatedAPI.delete(`/comments/${commentId}`);
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, ...rest } = useMutation({
    mutationFn: deleteCommentRequest,
    onSuccess: () => {
      invalidateCommentsQueries(queryClient);
    },
  });

  return {
    deleteComment,
    ...rest,
  };
}
