import { VideoCard } from "@/features/videos";

import { useVideos } from "@/client/videos";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./VideosList.styles";
import { Typography } from "@/ui";

export function VideosList() {
  const { videos } = useVideos();

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
      <Typography.Text size="h3">Vídeos sugeridos</Typography.Text>
      <S.VideosGridContainer>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </S.VideosGridContainer>
    </S.Container>
  );
}
