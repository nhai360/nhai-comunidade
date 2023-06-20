import Link from "next/link";

import * as S from "./LiveWatchCard.styles";
import { useRef } from "react";
import { Live } from "@/client/lives";
import { format } from "date-fns";
import { Avatar, Card, Typography } from "@/ui";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

type Props = {
  live: Live;
  hasHover?: boolean;
};

export function LiveWatchCard({ live, hasHover = true }: Props) {
  const imageRef: any = useRef(null);
  const createdAtFormatted = format(new Date(live.startTime), "dd MMM");

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
    <Link href={`/lives/watch/${live.id}`}>
      <Card
        css={{
          transition: "all 0.2s",
          cursor: "pointer",
          width: "100%",
          height: 320,
          ...hoverCss,
        }}
      >
        <S.ThumbContainer>
          {live.thumbnail?.url ? (
            <S.ThumbnailImage
              ref={imageRef}
              src={live?.thumbnail?.url}
              onError={handleImageError}
              alt={live.title}
            />
          ) : (
            <S.ThumbnailImage
              ref={imageRef}
              src={"/images/empty.jpg"}
              onError={handleImageError}
              alt={live.title}
            />
          )}
        </S.ThumbContainer>
        <Typography.Text
          css={{ display: "block", marginTop: "$3", color: "$textTitle" }}
        >
          {live.title}
        </Typography.Text>
        <S.UserContainer>
          <Avatar
            size="medium"
            src={live.author?.profilePicture?.url}
            fallback={getInitials(live.author?.fullName)}
          />
          <S.UserInformationContainer>
            <Typography.Text css={{ color: "$textTitle" }}>
              {getFirstNameAndLastName(live.author?.fullName)}
            </Typography.Text>
            <Typography.Text size="body3" color="secondary">
              @{live.author?.nickname}
            </Typography.Text>
          </S.UserInformationContainer>
          <S.UserInformationContainer
            style={{ flex: 1, alignItems: "flex-end" }}
          >
            <S.LiveIndicator>
              <S.Circle />
              <Typography.Text css={{ color: "$neutral100", fontSize: 12 }}>
                LIVE
              </Typography.Text>
            </S.LiveIndicator>
            <S.TimeLabel>{createdAtFormatted}</S.TimeLabel>
          </S.UserInformationContainer>
        </S.UserContainer>
      </Card>
    </Link>
  );
}
