import Link from "next/link";

import { useAuthContext } from "@/contexts";

import { Avatar, Card, Typography } from "@/ui";
import { useUser } from "@/client/users";
import { Video } from "@/client/videos";
import { format } from "@/lib/date-fns";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import * as S from "./VideoCard.styles";
import { useRef } from "react";

type Props = {
  video: Video;
  hasHover?: boolean;
};

export function VideoCard({ video, hasHover = true }: Props) {
  const imageRef: any = useRef(null);
  const createdAtFormatted = format(new Date(video.createdAt), "dd MMM");

  const hoverCss = hasHover
    ? {
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }
    : {
        margin: "4px 0",
      };

  const handleImageError = () => {
    if (imageRef.current) {
      imageRef.current.src = "/images/empty.jpg";
    }
  };

  return (
    <Link href={`/videos/${video.id}`}>
      <Card
        css={{
          transition: "all 0.2s",
          cursor: "pointer",
          width: "100%",
          height: 320,
          ...hoverCss,
        }}
      >
        {video.thumbnail?.url ? (
          <S.ThumbnailImage
            ref={imageRef}
            src={video?.thumbnail?.url}
            onError={handleImageError}
            alt={video.title}
          />
        ) : (
          <S.ThumbnailImage
            ref={imageRef}
            src={"/images/empty.jpg"}
            onError={handleImageError}
            alt={video.title}
          />
        )}
        <Typography.Text
          css={{ display: "block", marginTop: "$3", color: "$textTitle" }}
        >
          {video.title.length > 74
            ? `${video.title.substring(0, 73)}...`
            : video.title}
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
