import { useAuthContext } from "@/contexts";

import { Avatar, Card, Typography } from "@/ui";
import { useUser } from "@/client/users";
import { Video } from "@/client/videos";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import * as S from "./VideoCard.styles";
import { format } from "@/lib/date-fns";

type Props = {
  video: Video;
};

export function VideoCard({ video }: Props) {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const createdAtFormatted = format(new Date(video.createAt), "dd MMM");

  return (
    <Card
      css={{
        transition: "all 0.2s",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-16px)",
        },
      }}
    >
      <S.ThumbnailImage src="/video-thumb.png" />
      <Typography.Text css={{ display: "block", marginTop: "$3" }}>
        {video.title}
      </Typography.Text>
      <S.UserContainer>
        <Avatar
          size="medium"
          src={user?.profilePicture?.url}
          fallback={getInitials(user?.fullName)}
        />
        <S.UserInformationContainer>
          <Typography.Text>
            {getFirstNameAndLastName(user?.fullName)}
          </Typography.Text>
          <Typography.Text size="body3" color="secondary">
            @{user?.nickname}
          </Typography.Text>
        </S.UserInformationContainer>
        <S.TimeLabel>{createdAtFormatted}</S.TimeLabel>
      </S.UserContainer>
    </Card>
  );
}
