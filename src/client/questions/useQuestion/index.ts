import { QueryClient } from "react-query";

export function invalidateQuestionQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("video-question");
}

export * from "./useQuestion";
