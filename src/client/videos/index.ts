import { QueryClient } from "react-query";

export function invalidateVideosQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("video");
  queryClient.invalidateQueries("videos");
}

export * from "./types";
export * from "./useVideo";
export * from "./useVideos";
export * from "./useCreateVideo";
export * from "./useVideosFromUser";
export * from "./useLikeVideo";
