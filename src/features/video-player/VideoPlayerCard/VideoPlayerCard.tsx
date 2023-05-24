import { useRouter } from "next/router";

import { Avatar, Card, MuxVideo, Typography } from "@/ui";

import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { useVideo } from "@/client/videos";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import {
  LikeButton,
  VideoCommentField,
  VideoCommentList,
} from "@/features/video-player";

import * as S from "./VideoPlayerCard.styles";
import { format } from "date-fns";

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

  const createdAt = format(new Date(video?.createAt), "dd MMM");
  const isCreator = video?.author?.id === user?.id;

  return (
    <Card css={{ display: "flex", flexDirection: "column", gap: "$4" }}>
      <MuxVideo
        playbackId={video.playbackId}
        streamType="on-demand"
        metadata={{
          video_id: video.playbackId,
          video_title: video.title,
          viewer_user_id: session?.userId,
        }}
        isCreator={isCreator}
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
              <S.TimeLabel>{createdAt}</S.TimeLabel>
            </Typography.Text>
            <Typography.Text size="body3" color="secondary">
              @{user?.nickname}
            </Typography.Text>
          </S.UserInformationContainer>
        </S.UserContainer>

        <LikeButton video={video} />
      </S.UserAndLikeContainer>

      <Typography.Text size="caption" color="secondary">
        {video?.description}
      </Typography.Text>
      <VideoCommentField video={video} />
      <VideoCommentList video={video} expanded />
    </Card>
  );
}
