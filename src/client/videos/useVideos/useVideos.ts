import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetVideosParams, Video, VideoDecoder } from "@/client/videos/types";

export async function getVideos({
  orderBy = "createdAt",
  orderDirection = "desc",
  search,
}: GetVideosParams) {
  const response = await authenticatedAPI.get("/videos", {
    params: {
      // orderBy: `${orderBy}:${orderDirection}`,
      search,
    },
  });

  return decodeResponse<Video[]>(response, VideoDecoder.array());
}

export function useVideos(params: GetVideosParams = {}) {
  const { data: videos, ...rest } = useQuery<Video[]>({
    queryKey: "videos",
    queryFn: () => getVideos(params),
  });

  return {
    videos,
    ...rest,
  };
}
