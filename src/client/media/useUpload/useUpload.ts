import { useMutation } from "react-query";
import * as UpChunk from "@mux/upchunk";

import { authenticatedAPI, decodeResponse } from "@/client";
import { Media, MediaDecoder, PostParams } from "@/client/media";
import axios from "axios";
import { getToken } from "@/lib/auth";
import { toast } from "react-toastify";

async function uploadRequest({ file, setPercentage, ...params }: PostParams) {
  function formatFileSize(sizeInBytes: number) {
    const fileSizeInMegabytes = sizeInBytes / (1024 * 1024);
    return fileSizeInMegabytes.toFixed(2); // Arredonda para 2 casas decimais
  }

  console.log(`${file?.name} | ${formatFileSize(file?.size)}Mb`);

  if (params?.category === "VIDEO") {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    };

    const uploadmux = await axios.post("/api/uploadmux", {}, { headers });

    if (!uploadmux?.data?.url) {
      throw new Error("Upload request failed");
    }

    const fileSize = file.size;
    const maxChunkSize = 1024 * 5;

    const numberOfChunks = Math.ceil(fileSize / maxChunkSize);

    const upload = UpChunk.createUpload({
      endpoint: uploadmux?.data?.url,
      file: file,
      chunkSize: Math.ceil(fileSize / numberOfChunks),
    });

    // subscribe to events
    upload.on("error", (err) => {
      console.error("💥 🙀", err?.detail);
      throw new Error("Upload request failed");
    });

    upload.on("progress", (progress) => {
      setPercentage && setPercentage(progress?.detail?.toFixed(2));
    });

    // subscribe to events
    upload.on("success", () => {
      toast.success("O upload do seu vídeo comprimido foi concluído!");
      console.log("Wrap it up, we're done here. 👋\n");
    });

    const { data: videoUrl } = await axios.post<{ sourceUrl: string }>(
      "/api/uploadurl",
      { uploadId: uploadmux?.data?.id },
      { headers }
    );

    const { data: media } = await authenticatedAPI.post<Media>("/media", {
      ...params,
      sourceUrl: videoUrl.sourceUrl,
      category: "VIDEO",
    });

    return media;
  } else {
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
    } else {
      throw new Error("Upload request failed");
    }
  }
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
