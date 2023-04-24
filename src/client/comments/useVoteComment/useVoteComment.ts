import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { invalidatePostsQueries } from "@/client/posts";
import { VoteCommentParams, invalidateCommentsQueries } from "..";

async function voteCommentRequest({
  commentId,
  optionId,
  alreadyVoted,
}: VoteCommentParams) {
  if (alreadyVoted) {
    await authenticatedAPI.post(
      `/comments/${commentId}/options/${optionId}/unvote`,
    );
    return;
  }

  await authenticatedAPI.post(
    `/comments/${commentId}/options/${optionId}/vote`,
  );
}

export function useVoteComment() {
  const queryClient = useQueryClient();

  const { mutate: voteComment, ...rest } = useMutation({
    mutationFn: voteCommentRequest,
    onSuccess: () => {
      invalidatePostsQueries(queryClient);
      invalidateCommentsQueries(queryClient);
    },
  });

  return {
    voteComment,
    ...rest,
  };
}
