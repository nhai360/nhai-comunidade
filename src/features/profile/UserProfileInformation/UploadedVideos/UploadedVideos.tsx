import { useAuthContext } from "@/contexts";
import { useVideosFromUser } from "@/client/videos";

import { VideoCard } from "@/features/videos";

import * as S from "./UploadedVideos.styles";

export function UploadedVideos() {
  const { session } = useAuthContext();

  const { videos } = useVideosFromUser({
    userId: session?.userId,
  });

  return (
    <S.Container>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </S.Container>
  );
}
