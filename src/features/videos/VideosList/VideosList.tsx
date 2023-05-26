import { VideoCard } from "@/features/videos";

import { useVideos } from "@/client/videos";

import * as S from "./VideosList.styles";
import { Typography } from "@/ui";

export function VideosList() {
  const { videos } = useVideos();

  return (
    <S.Container>
      <Typography.Title size="h3">Podcast</Typography.Title>
      <S.VideoScrollContainer>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </S.VideoScrollContainer>
      <Typography.Title size="h3">Vídeos sugeridos</Typography.Title>
      <S.VideosGridContainer>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </S.VideosGridContainer>
    </S.Container>
  );
}
