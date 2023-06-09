import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { useVideosFromUser } from "@/client/videos";
import { Swiper, SwiperSlide } from "swiper/react";

import { VideoCard } from "@/features/videos";

import * as S from "./UploadedVideos.styles";
import { useUserPlaylists } from "@/client/videos/useUserPlaylists";
import { Typography } from "@/ui";

export function UploadedVideos() {
  const router = useRouter();
  const { session } = useAuthContext();

  const { nickname } = router.query;

  const { userplaylists } = useUserPlaylists({
    userId: session?.userId,
  });

  const { videos } = useVideosFromUser({
    nickname: nickname as string,
  });

  const validPlaylists = userplaylists?.filter((a) => a?.videos?.length > 0);
  const validOtherVideos = videos?.filter((a) => !a?.playlist);

  return (
    <>
      {validPlaylists?.map((playlist) => (
        <>
          <S.PlaylistHighlight>
            <Typography.Text size="h3" style={{ marginLeft: 24 }}>
              {playlist?.title}
            </Typography.Text>
            <Swiper
              style={{ paddingTop: 16, paddingLeft: 24 }}
              spaceBetween={12}
              slidesPerView={"auto"}
            >
              {playlist?.videos?.map((video, index) => (
                <SwiperSlide key={index} style={{ width: 320 }}>
                  <VideoCard
                    key={video.id}
                    video={{ ...video, author: playlist?.author }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </S.PlaylistHighlight>
        </>
      ))}
      {validOtherVideos?.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <Typography.Text size="h3">
            {validPlaylists ? "Outros vídeos" : "Vídeos"}
          </Typography.Text>
          <S.VideosGridContainer>
            {validOtherVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </S.VideosGridContainer>
        </div>
      )}
    </>
  );
}
