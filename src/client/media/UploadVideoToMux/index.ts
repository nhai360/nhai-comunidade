import * as UpChunk from "@mux/upchunk";

import { authenticatedAPI } from "@/client";
import { Media, PostMuxVideoParams } from "@/client/media";
import axios from "axios";
import { getToken } from "@/lib/auth";
import { toast } from "react-toastify";

export async function UploadVideoToMux({
  file,
  setUploadPercent,
  setIsUploadError,
  setIsUploadSuccess,
  setSource,
}: PostMuxVideoParams) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  const uploadmux = await axios.post("/api/uploadmux", {}, { headers });

  const uploadUrl = uploadmux?.data?.url;
  const uploadId = uploadmux?.data?.id;

  if (!uploadUrl) {
    setIsUploadError(true);
    return;
  }

  const upchunk = UpChunk.createUpload({
    endpoint: uploadUrl,
    file: file,
    chunkSize: 5120, // 5Mb
  });

  // subscribe to events
  upchunk.on("error", (err) => {
    console.error("💥 🙀", err?.detail);
    toast.error("Falha no upload para o servidor!");
    setIsUploadError(true);
  });

  upchunk.on("progress", (progress) => {
    setUploadPercent && setUploadPercent(progress?.detail?.toFixed(2));
  });

  upchunk.on("success", async () => {
    toast.success("O upload do seu vídeo comprimido foi concluído!");
    console.log("Upload realizado com sucesso! 👋");
    const { data: videoUrl } = await axios.post<{ sourceUrl: string }>(
      "/api/uploadurl",
      { uploadId },
      { headers }
    );

    const { data: media } = await authenticatedAPI.post<Media>("/media", {
      sourceUrl: videoUrl.sourceUrl,
      category: "VIDEO",
    });
    setIsUploadSuccess(true);

    setSource(media);
  });
}
