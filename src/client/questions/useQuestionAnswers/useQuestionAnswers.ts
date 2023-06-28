import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import {
  GetQuestionAnswersParams,
  QuestionAnswers,
  QuestionAnswersDecoder,
} from "../types";

async function getQuestionAnswers({ questionId }: GetQuestionAnswersParams) {
  if (questionId) {
    const response = await authenticatedAPI.get(
      `/questions/${questionId}/answers`
    );

    return decodeResponse<QuestionAnswers[]>(
      response,
      QuestionAnswersDecoder.array()
    );
  }

  return [];
}

export function useQuestionAnswers({ questionId }: GetQuestionAnswersParams) {
  const { data: answers, ...rest } = useQuery({
    enabled: !!questionId,
    queryKey: ["question-answers", { questionId }],
    queryFn: () => getQuestionAnswers({ questionId }),
  });

  return {
    answers,
    ...rest,
  };
}
