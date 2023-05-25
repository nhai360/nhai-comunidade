import { authenticatedAPI, decodeResponse } from "@/client";

import {
  VideoCommentDecoder,
  VideoComment,
  GetParams,
} from "@/client/videoscomments";
import { UseQueryOptions, useQuery } from "react-query";

async function getVideoComments({ videoId }: GetParams) {
  const response = await authenticatedAPI.get(`/videos/${videoId}/comments`);

  return decodeResponse<VideoComment[]>(response, VideoCommentDecoder.array());
}

export function useVideoComments(
  params: GetParams,
  options?: UseQueryOptions<VideoComment[]>
) {
  const { data: comments, ...rest } = useQuery({
    enabled: !!params.videoId,
    queryKey: ["videoscomments", params],
    queryFn: () => getVideoComments(params),
    ...options,
  });

  return {
    comments: comments || [],
    ...rest,
  };
}
