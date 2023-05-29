import { VideoCard } from "@/features/videos";

import * as S from "./VideosSuggestions.styles";
import { useVideoSuggestions } from "@/client/videos/useVideoSuggestions";
import { useRouter } from "next/router";

export function VideosSuggestions() {
  const router = useRouter();
  const { videoId }: any = router.query;
  const { videosuggestions } = useVideoSuggestions({ videoId });

  return (
    <S.Container>
      {videosuggestions.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </S.Container>
  );
}
