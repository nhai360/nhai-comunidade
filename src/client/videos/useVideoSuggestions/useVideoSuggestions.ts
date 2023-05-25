import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetVideoParams, Video, VideoDecoder } from "@/client/videos/types";

async function getVideoSuggestions({ videoId }: GetVideoParams) {
  const response = await authenticatedAPI.get(`/videos/${videoId}/suggestions`);

  return decodeResponse<Video[]>(response, VideoDecoder.array());
}

export function useVideoSuggestions({ videoId }: GetVideoParams) {
  const { data: videosuggestions, ...rest } = useQuery({
    enabled: !!videoId,
    queryKey: ["videosuggestion", { videoId }],
    queryFn: () => getVideoSuggestions({ videoId }),
  });

  return {
    videosuggestions: videosuggestions || [],
    ...rest,
  };
}
