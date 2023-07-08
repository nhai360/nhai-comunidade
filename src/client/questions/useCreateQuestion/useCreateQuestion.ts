import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostQuestionAnswerParams, invalidateQuestionQueries } from "..";

async function createQuestionRequest(params: PostQuestionAnswerParams) {
  const { videoId, question } = params;
  const response = await authenticatedAPI.post(
    `/videos/${videoId}/questions`,
    question
  );

  return response?.data;
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  const { mutate: createQuestion, ...rest } = useMutation({
    mutationFn: createQuestionRequest,
    onSuccess: () => {
      invalidateQuestionQueries(queryClient);
    },
  });

  return {
    createQuestion,
    ...rest,
  };
}
