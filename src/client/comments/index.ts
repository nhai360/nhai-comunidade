import { QueryClient } from "react-query";

export function invalidateCommentsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("comments");
}

export * from "./useComments";
export * from "./useCreateComment";
export * from "./useDeleteComment";
export * from "./types";
