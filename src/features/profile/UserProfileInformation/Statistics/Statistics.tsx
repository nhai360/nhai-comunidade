import { useUser } from "@/client/users";

import { Typography } from "@/ui";
import { useAuthContext } from "@/contexts";
import {
  FireIcon,
  JoystickIcon,
  TierTwoRewardIcon,
  StarIcon,
  TierOneRewardIcon,
} from "@/ui/_icons";
import { Division } from "@/client/score/types";

import * as S from "./Statistics.styles";
import { ReactNode } from "react";

const DIVISIONS: Record<Division, string> = {
  [Division.WOOD]: "Madeira",
  [Division.BRASS]: "Latão",
  [Division.IRON]: "Ferro",
  [Division.RUBY]: "Rubi",
  [Division.DIAMOND]: "Diamante",
  [Division.GOLD]: "Ouro",
  [Division.PLATINUM]: "Platina",
  [Division.SILVER]: "Prata",
  [Division.BRONZE]: "Bronze",
};

const ICON: Record<Division, ReactNode> = {
  [Division.WOOD]: (
    <TierOneRewardIcon primaryColor="#955B36" secondaryColor="#522508" />
  ),
  [Division.BRASS]: "Latão",
  [Division.IRON]: "Ferro",
  [Division.RUBY]: "Rubi",
  [Division.DIAMOND]: "Diamante",
  [Division.GOLD]: "Ouro",
  [Division.PLATINUM]: "Platina",
  [Division.SILVER]: "Prata",
  [Division.BRONZE]: "Bronze",
};

export function Statistics() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  if (!user?.score) {
    return null;
  }

  const division = DIVISIONS[user.score.division];
  const icon = ICON[user.score.division];

  return (
    <S.Container>
      <S.StatisticCard>
        <FireIcon />
        <S.StatisticInformation>
          <Typography.Text size="body2" weight="bold" color="secondary">
            0
          </Typography.Text>
          <Typography.Text size="body2" color="secondary">
            Dias seguidos
          </Typography.Text>
        </S.StatisticInformation>
      </S.StatisticCard>
      <S.StatisticCard>
        <StarIcon />
        <S.StatisticInformation>
          <Typography.Text size="body2" weight="bold">
            {user?.score?.totalXp}
          </Typography.Text>
          <Typography.Text size="body2" color="secondary">
            Total de XP
          </Typography.Text>
        </S.StatisticInformation>
      </S.StatisticCard>
      <S.StatisticCard>
        {/* <TierTwoRewardIcon
          primaryColor="#FB8E00"
          tertiaryColor="#FFAF47"
          secondaryColor="#FDEA67"
        /> */}
        {icon}
        <S.StatisticInformation>
          <Typography.Text size="body2" weight="bold">
            {division}
          </Typography.Text>
          <Typography.Text size="body2" color="secondary">
            Divisão
          </Typography.Text>
        </S.StatisticInformation>
      </S.StatisticCard>
      <S.StatisticCard>
        <JoystickIcon />
        <S.StatisticInformation>
          <Typography.Text size="body2" weight="bold">
            {user?.score?.level}
          </Typography.Text>
          <Typography.Text size="body2" color="secondary">
            Nível
          </Typography.Text>
        </S.StatisticInformation>
      </S.StatisticCard>
    </S.Container>
  );
}
