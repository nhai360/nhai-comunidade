import { ReactNode } from "react";

import { useRouter } from "next/router";

import { useUserFromNickname } from "@/client/users";

import { Typography } from "@/ui";
import {
  FireIcon,
  JoystickIcon,
  TierTwoRewardIcon,
  StarIcon,
  TierOneRewardIcon,
  TierThreeRewardIcon,
} from "@/ui/_icons";
import { Division } from "@/client/score/types";

import * as S from "./Score.styles";

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
  [Division.BRASS]: (
    <TierOneRewardIcon primaryColor="#EDD5D3" secondaryColor="#907878" />
  ),
  [Division.IRON]: (
    <TierOneRewardIcon primaryColor="#B9B9B9" secondaryColor="#535353" />
  ),
  [Division.BRONZE]: (
    <TierTwoRewardIcon
      primaryColor="#B67639"
      secondaryColor="#E3AD7E"
      tertiaryColor="#C7884C"
    />
  ),
  [Division.SILVER]: (
    <TierTwoRewardIcon
      primaryColor="#91A6B9"
      secondaryColor="#D2DBE2"
      tertiaryColor="#A8B8C7"
    />
  ),
  [Division.GOLD]: (
    <TierTwoRewardIcon
      primaryColor="#FB8E00"
      secondaryColor="#FDEA67"
      tertiaryColor="#FFAF47"
    />
  ),
  [Division.PLATINUM]: (
    <TierThreeRewardIcon
      primaryColor="#BCD3D9"
      secondaryColor="#D0DFE4"
      tertiaryColor="#A4C3CB"
    />
  ),
  [Division.DIAMOND]: (
    <TierThreeRewardIcon
      primaryColor="#018ECB"
      secondaryColor="#5DCBFC"
      tertiaryColor="#018ECB"
    />
  ),
  [Division.RUBY]: (
    <TierThreeRewardIcon
      primaryColor="#E63432"
      secondaryColor="#FE8687"
      tertiaryColor="#DA1D1B"
    />
  ),
};

export function Score() {
  const router = useRouter();

  const { nickname } = router.query;

  const { user } = useUserFromNickname({
    nickname: nickname as string,
  });

  if (!user?.score) {
    return null;
  }

  const division = DIVISIONS[user.score.division];
  const icon = ICON[user.score.division];

  const hasConsecutiveDays =
    user.stats?.consecutiveDays && user.stats?.consecutiveDays > 0;

  return (
    <S.Container>
      <S.StatisticCard>
        <FireIcon
          fill={hasConsecutiveDays ? "#FFC800" : "#E7E7E7"}
          stroke={hasConsecutiveDays ? "#FF9600" : "#DADADA"}
        />
        <S.StatisticInformation>
          <Typography.Text size="body2" weight="bold" color="secondary">
            {user.stats?.consecutiveDays ?? 0}
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
