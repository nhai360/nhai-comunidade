import Link from "next/link";

import { useAuthContext } from "@/contexts";

import { Avatar, Card, Typography } from "@/ui";
import { useUser } from "@/client/users";
import { Live } from "@/client/lives";
import { format } from "@/lib/date-fns";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import * as S from "./LiveCard.styles";
import { useRef } from "react";

type Props = {
  live: Live;
  hasHover?: boolean;
};

export function LiveCard({ live, hasHover = true }: Props) {
  const imageRef: any = useRef(null);
  // const createdAtFormatted = format(new Date(live.createdAt), "dd MMM");

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
    <Link href={`/lives/${live.id}`}>
      <Card
        css={{
          transition: "all 0.2s",
          cursor: "pointer",
          width: "100%",
          height: 320,
          ...hoverCss,
        }}
      >
        {live.source?.url ? (
          <S.ThumbnailImage
            ref={imageRef}
            src={live?.source?.url}
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
        </S.UserContainer>
      </Card>
    </Link>
  );
}
