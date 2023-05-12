import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { useVideosFromUser } from "@/client/videos";

import { VideoCard } from "@/features/videos";

import * as S from "./UploadedVideos.styles";

export function UploadedVideos() {
  const router = useRouter();

  const { nickname } = router.query;

  const { videos } = useVideosFromUser({
    nickname: nickname as string,
  });

  return (
    <S.Container>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </S.Container>
  );
}
