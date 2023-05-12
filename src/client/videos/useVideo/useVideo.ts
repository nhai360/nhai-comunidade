import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetVideoParams, Video, VideoDecoder } from "@/client/videos/types";

async function getVideo({ videoId }: GetVideoParams) {
  const response = await authenticatedAPI.get(`/videos/${videoId}`);

  return decodeResponse<Video>(response, VideoDecoder);
}

export function useVideo({ videoId }: GetVideoParams) {
  const { data: video, ...rest } = useQuery({
    enabled: !!videoId,
    queryKey: ["video", { videoId }],
    queryFn: () => getVideo({ videoId }),
  });

  return {
    video,
    ...rest,
  };
}
