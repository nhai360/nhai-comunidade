import { QueryClient } from "react-query";

export function invalidatePostsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries(["posts"]);
}

export * from "./usePosts";
export * from "./useCreatePost";
export * from "./types";
