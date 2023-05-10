import { useMutation } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostParams } from "@/client/videos";

async function createVideoRequest(params: PostParams) {
  const response = await authenticatedAPI.post("/videos", params);

  console.log(response.data);
}

export function useCreateVideo() {
  const { mutate: createVideo, ...rest } = useMutation({
    mutationFn: createVideoRequest,
  });

  return {
    createVideo,
    ...rest,
  };
}
