import { useRouter } from "next/router";

import { Avatar, Card, MuxVideo, Typography } from "@/ui";

import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { useVideo } from "@/client/videos";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import { LikeButton } from "@/features/video-player";

import * as S from "./VideoPlayerCard.styles";

export function VideoPlayerCard() {
  const router = useRouter();

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const { videoId } = router.query;

  const { video } = useVideo({
    videoId: videoId as string,
  });

  if (!video || !video.playbackId) {
    return null;
  }

  return (
    <Card css={{ display: "flex", flexDirection: "column", gap: "$4" }}>
      <MuxVideo
        playbackId={video.playbackId}
        streamType="on-demand"
        envKey="bua0bfe03e8818lbkjb5g2g0j"
        metadata={{
          video_id: video.playbackId,
          video_title: video.title,
          viewer_user_id: session?.userId,
        }}
      />
      <Typography.Title size="subHeadline" weight="bold">
        {video?.title}
      </Typography.Title>

      <S.UserAndLikeContainer>
        <S.UserContainer>
          <Avatar.Square
            size="medium"
            src={video?.author?.profilePicture?.url}
            fallback={getInitials(video?.author?.fullName)}
          />
          <S.UserInformationContainer>
            <Typography.Text css={{ color: "$textTitle" }}>
              {getFirstNameAndLastName(video?.author?.fullName)}
              <S.TimeLabel>23 Jan</S.TimeLabel>
            </Typography.Text>
            <Typography.Text size="body3" color="secondary">
              @{user?.nickname}
            </Typography.Text>
          </S.UserInformationContainer>
        </S.UserContainer>

        <LikeButton video={video} />
      </S.UserAndLikeContainer>
    </Card>
  );
}
