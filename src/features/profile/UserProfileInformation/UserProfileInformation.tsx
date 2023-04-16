import { useAuthContext } from "@/contexts";
import { Avatar, Divider, Typography } from "@/ui";

import { useUser } from "@/client/users";

import { getInitials } from "@/lib/string";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

import { Statistics } from "./Statistics";
import { GeneralInformation } from "./GeneralInformation";
import * as S from "./UserProfileInformation.styles";

export function UserProfileInformation() {
  const { isEnabled: isEnabledProfileStatistics } = useFeatureFlag(
    FeatureDecoder.Values.PROFILE_LOCATION,
  );

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
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
      {isEnabledProfileStatistics && (
        <>
          <Divider css={{ marginBlock: "$6", borderTopWidth: "2px" }} />
          <Typography.Title size="subHeadline" weight="bold">
            Estatísticas
          </Typography.Title>
          <Statistics />
        </>
      )}
    </S.Container>
  );
}
