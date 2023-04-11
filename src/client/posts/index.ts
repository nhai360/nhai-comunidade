import { QueryClient } from "react-query";

export function invalidatePostsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("posts");
  queryClient.invalidateQueries("trending");
}

export * from "./usePost";
export * from "./usePosts";
export * from "./useTrending";
export * from "./useLikePost";
export * from "./useDeletePost";
export * from "./useCreatePost";
export * from "./types";
