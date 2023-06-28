import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostQuestionAnswersParams, invalidateQuestionQueries } from "..";

async function createAnswersRequest(params: PostQuestionAnswersParams) {
  const { questionId, answers } = params;
  const response = await authenticatedAPI.post(
    `/questions/${params.questionId}/answers`,
    answers
  );

  return response?.data;
}

export function useCreateAnswers() {
  const queryClient = useQueryClient();

  const { mutate: createAnswers, ...rest } = useMutation({
    mutationFn: createAnswersRequest,
    onSuccess: () => {
      invalidateQuestionQueries(queryClient);
    },
  });

  return {
    createAnswers,
    ...rest,
  };
}
