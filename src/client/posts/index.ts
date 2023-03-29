import { QueryClient } from "react-query";

export function invalidatePostsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("posts");
}

export * from "./usePost";
export * from "./usePosts";
export * from "./useLikePost";
export * from "./useCreatePost";
export * from "./types";
