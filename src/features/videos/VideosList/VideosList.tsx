import { VideoCard } from "@/features/videos";

import { useVideos } from "@/client/videos";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./VideosList.styles";
import { Typography } from "@/ui";
import { useVideoContext } from "@/contexts/VideoContext";
import { useLiveContext } from "@/contexts/LiveContext";
import { LiveWatchCard } from "@/features/lives/LiveWatchCard";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";

export function VideosList() {
  const { videos } = useVideoContext();
  const { lives } = useLiveContext();

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  return (
    <S.Container>
      {/* <S.PlaylistHighlight>
        <Typography.Text size="h3" style={{ marginLeft: 24 }}>
          Podcast
        </Typography.Text>
        <Swiper
          style={{ paddingTop: 16, paddingLeft: 24 }}
          spaceBetween={12}
          slidesPerView={"auto"}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index} style={{ width: 320 }}>
              <VideoCard key={video.id} video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </S.PlaylistHighlight> */}
      {lives?.length > 0 && (
        <>
          <Typography.Text size="h3">Lives para assistir</Typography.Text>
          <S.VideosGridContainer>
            {lives.map((live) => (
              <LiveWatchCard key={live.id} live={live} />
            ))}
          </S.VideosGridContainer>
        </>
      )}

      <Typography.Text size="h3">Vídeos sugeridos</Typography.Text>
      <S.VideosGridContainer>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </S.VideosGridContainer>
    </S.Container>
  );
}
