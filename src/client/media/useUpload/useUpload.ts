import { useMutation } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { Media, MediaDecoder, PostParams } from "@/client/media";

async function uploadRequest({ file, ...params }: PostParams) {
  const response = await authenticatedAPI.post("/media", params);

  const media = decodeResponse<Media>(response, MediaDecoder);

  if (media.id) {
    const uploadFile = await authenticatedAPI.putForm(
      `/media/${media.id}/upload`,
      {
        file,
      }
    );
    return { ...media, url: uploadFile?.data?.url };
  }

  throw new Error("Upload request failed");
}

export function useUpload() {
  const { mutate: upload, ...rest } = useMutation({
    mutationFn: uploadRequest,
  });

  return {
    upload,
    ...rest,
  };
}
