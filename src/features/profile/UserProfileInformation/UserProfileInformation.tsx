import { Avatar, Divider, Typography } from "@/ui";

import * as S from "./UserProfileInformation.styles";
import { GeneralInformation } from "./GeneralInformation";

import { Statistics } from "./Statistics";

export function UserProfileInformation() {
  return (
    <S.Container>
      <Avatar
        size="xlarge"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
        fallback="CT"
        css={{ border: "8px solid $neutral100" }}
      />
      <GeneralInformation />
      <Divider css={{ marginBlock: "$6", borderTopWidth: "2px" }} />
      <Typography.Title size="subHeadline" weight="bold">
        Estatísticas
      </Typography.Title>
      <Statistics />
    </S.Container>
  );
}
