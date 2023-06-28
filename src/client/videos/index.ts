import { QueryClient } from "react-query";

export function invalidateVideosQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("video");
  queryClient.invalidateQueries("videos");
  queryClient.invalidateQueries("videos");
  queryClient.invalidateQueries("userplaylists");
}

export function invalidatePlaylistsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("userplaylists");
}

export * from "./types";
export * from "./useVideo";
export * from "./useVideos";
export * from "./useCreateVideo";
export * from "./useVideosFromUser";
export * from "./useLikeVideo";
