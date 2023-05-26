import Link from "next/link";

import { useAuthContext } from "@/contexts";

import { Avatar, Card, Typography } from "@/ui";
import { useUser } from "@/client/users";
import { Video } from "@/client/videos";
import { format } from "@/lib/date-fns";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import * as S from "./VideoCard.styles";

type Props = {
  video: Video;
};

export function VideoCard({ video }: Props) {
  const createdAtFormatted = format(new Date(video.createAt), "dd MMM");

  return (
    <Link href={`/videos/${video.id}`}>
      <Card
        css={{
          transition: "all 0.2s",
          cursor: "pointer",
          width: "100%",
          height: 320,
          "&:hover": {
            transform: "translateY(-8px)",
          },
        }}
      >
        {video.thumbnail?.url && (
          <S.ThumbnailImage src={video?.thumbnail?.url} />
        )}
        <Typography.Text
          css={{ display: "block", marginTop: "$3", color: "$textTitle" }}
        >
          {video.title}
        </Typography.Text>
        <S.UserContainer>
          <Avatar
            size="medium"
            src={video.author?.profilePicture?.url}
            fallback={getInitials(video.author?.fullName)}
          />
          <S.UserInformationContainer>
            <Typography.Text css={{ color: "$textTitle" }}>
              {getFirstNameAndLastName(video.author?.fullName)}
            </Typography.Text>
            <Typography.Text size="body3" color="secondary">
              @{video.author?.nickname}
            </Typography.Text>
          </S.UserInformationContainer>
          <S.TimeLabel>{createdAtFormatted}</S.TimeLabel>
        </S.UserContainer>
      </Card>
    </Link>
  );
}
