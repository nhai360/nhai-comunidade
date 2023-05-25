import { QueryClient } from "react-query";

export function invalidateVideoCommentsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("videoscomments");
}

export * from "./useVideoComments";
export * from "./useCreateVideoComment";
export * from "./types";
