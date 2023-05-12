import { VideoCard } from "@/features/videos";

import { useVideos } from "@/client/videos";

import * as S from "./VideosList.styles";

export function VideosList() {
  const { videos } = useVideos();

  return (
    <S.Container>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </S.Container>
  );
}
