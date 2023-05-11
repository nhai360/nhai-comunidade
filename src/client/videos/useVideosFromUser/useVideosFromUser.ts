import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetParams, Video, VideoDecoder } from "@/client/videos/types";

async function getVideosFromUser({ userId }: GetParams) {
  const response = await authenticatedAPI.get(`/users/${userId}/playlists`);

  return decodeResponse<Video[]>(response, VideoDecoder.array());
}

export function useVideosFromUser({ userId }: GetParams) {
  const { data: videos = [], ...rest } = useQuery({
    enabled: !!userId,
    queryKey: ["videos", { userId }],
    queryFn: () => getVideosFromUser({ userId }),
  });

  return {
    videos,
    ...rest,
  };
}
