import { useMutation } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { Media, MediaDecoder, PostParams } from "@/client/media";

async function uploadRequest({ file, setPercentage, ...params }: PostParams) {
  function formatFileSize(sizeInBytes: number) {
    const fileSizeInMegabytes = sizeInBytes / (1024 * 1024);
    return fileSizeInMegabytes.toFixed(2); // Arredonda para 2 casas decimais
  }

  console.log(`${file?.name} | ${formatFileSize(file?.size)}Mb`);
  const response = await authenticatedAPI.post("/media", params);

  const media = decodeResponse<Media>(response, MediaDecoder);

  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: any) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setPercentage && setPercentage(percentage);
    },
  };

  if (media.id) {
    await authenticatedAPI.put(`/media/${media.id}/upload`, formData, config);

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
