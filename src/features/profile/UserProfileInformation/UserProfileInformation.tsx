import { useRouter } from "next/router";

import { Avatar, Divider, Typography } from "@/ui";

import { useUserFromNickname } from "@/client/users";

import { getInitials } from "@/lib/string";

import { Score } from "./Score";
import { GeneralInformation } from "./GeneralInformation";
import * as S from "./UserProfileInformation.styles";

export function UserProfileInformation() {
  const router = useRouter();

  const { nickname } = router.query;

  const { user } = useUserFromNickname({
    nickname: nickname as string,
  });

  return (
    <S.Container>
      <Avatar
        size="xlarge"
        alt={user?.fullName}
        src={user?.profilePicture?.url}
        fallback={getInitials(user?.fullName)}
        css={{ border: "8px solid $neutral100" }}
      />
      <GeneralInformation />
      <Divider css={{ marginBlock: "$6", borderTopWidth: "2px" }} />
      <Typography.Title size="subHeadline" weight="bold">
        Estatísticas
      </Typography.Title>
      <Score />
    </S.Container>
  );
}
