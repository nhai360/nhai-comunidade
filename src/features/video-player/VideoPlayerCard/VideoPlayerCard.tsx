import { Avatar, Button, Card, MuxVideo, Typography } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import * as S from "./VideoPlayerCard.styles";

export function VideoPlayerCard() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  return (
    <Card css={{ display: "flex", flexDirection: "column", gap: "$4" }}>
      <MuxVideo
        playbackId="enuT7USShHEGQ1alVQgOsLPfFOM02x01KAqJGn9tQjsW8"
        streamType="on-demand"
        metadata={{
          viewer_user_id: session?.userId,
        }}
      />
      <Typography.Title size="subHeadline" weight="bold">
        Explorando o potencial da colaboração em uma comunidade diversificada
      </Typography.Title>

      <S.UserAndLikeContainer>
        <S.UserContainer>
          <Avatar.Square
            size="medium"
            src={user?.profilePicture?.url}
            fallback={getInitials(user?.fullName)}
          />
          <S.UserInformationContainer>
            <Typography.Text css={{ color: "$textTitle" }}>
              {getFirstNameAndLastName(user?.fullName)}
              <S.TimeLabel>23 Jan</S.TimeLabel>
            </Typography.Text>
            <Typography.Text size="body3" color="secondary">
              @{user?.nickname}
            </Typography.Text>
          </S.UserInformationContainer>
        </S.UserContainer>

        <Button>
          <HeartIcon />
          Curtir
        </Button>
      </S.UserAndLikeContainer>
    </Card>
  );
}
