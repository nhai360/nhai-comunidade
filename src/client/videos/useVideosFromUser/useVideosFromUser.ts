import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetParams, Video, VideoDecoder } from "@/client/videos/types";

async function getVideosFromUser({ nickname }: GetParams) {
  const response = await authenticatedAPI.get(`/users/${nickname}/videos`);

  return decodeResponse<Video[]>(response, VideoDecoder.array());
}

export function useVideosFromUser({ nickname }: GetParams) {
  const { data: videos = [], ...rest } = useQuery({
    enabled: !!nickname,
    queryKey: ["videos", { nickname }],
    queryFn: () => getVideosFromUser({ nickname }),
  });

  return {
    videos,
    ...rest,
  };
}
