import { QueryClient } from "react-query";

export function invalidateQuestionAnswersQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("question-answers");
}

export * from "./useQuestionAnswers";
