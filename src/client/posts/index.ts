import { QueryClient } from "react-query";

export function invalidatePostsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("posts");
  queryClient.invalidateQueries("trendPosts");
}

export * from "./usePost";
export * from "./usePosts";
export * from "./useTrendPosts";
export * from "./useLikePost";
export * from "./useDeletePost";
export * from "./useCreatePost";
export * from "./types";
