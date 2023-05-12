import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { Video, VideoDecoder } from "@/client/videos/types";

async function getVideos() {
  const response = await authenticatedAPI.get(`/videos`);

  return decodeResponse<Video[]>(response, VideoDecoder.array());
}

export function useVideos() {
  const { data: videos = [], ...rest } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  return {
    videos,
    ...rest,
  };
}
