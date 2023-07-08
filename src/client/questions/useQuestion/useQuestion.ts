import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetQuestionParams, Question, QuestionDecoder } from "../types";

async function getQuestion({ videoId }: GetQuestionParams) {
  if (videoId) {
    const response = await authenticatedAPI.get(`/videos/${videoId}/questions`);

    return !response?.data
      ? null
      : decodeResponse<Question>(response, QuestionDecoder);
  }

  return null;
}

export function useQuestion({ videoId }: GetQuestionParams) {
  const { data: question, ...rest } = useQuery({
    enabled: !!videoId,
    queryKey: ["video-question", { videoId }],
    queryFn: () => getQuestion({ videoId }),
  });

  return {
    question,
    ...rest,
  };
}
