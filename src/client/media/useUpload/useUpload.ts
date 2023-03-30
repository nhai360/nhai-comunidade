import { authenticatedAPI, decodeResponse } from "@/client";
import { Media, MediaCategoryDecoder, MediaDecoder } from "@/client/media";
import { useMutation } from "react-query";

async function uploadRequest(file: File) {
  const response = await authenticatedAPI.post("/media", {
    category: MediaCategoryDecoder.Values.IMAGE,
  });

  const media = decodeResponse<Media>(response, MediaDecoder);

  if (media.id) {
    await authenticatedAPI.putForm(`/media/${media.id}/upload`, {
      file,
    });

    return media;
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
