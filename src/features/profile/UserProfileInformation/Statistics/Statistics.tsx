import { Typography } from "@/ui";
import {
  FireIcon,
  JoystickIcon,
  TierTwoRewardIcon,
  StarIcon,
} from "@/ui/_icons";

import * as S from "./Statistics.styles";

export function Statistics() {
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
            2004
          </Typography.Text>
          <Typography.Text size="body2" color="secondary">
            Total de XP
          </Typography.Text>
        </S.StatisticInformation>
      </S.StatisticCard>
      <S.StatisticCard>
        <TierTwoRewardIcon
          primaryColor="#FB8E00"
          tertiaryColor="#FFAF47"
          secondaryColor="#FDEA67"
        />
        <S.StatisticInformation>
          <Typography.Text size="body2" weight="bold">
            Ouro
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
            56
          </Typography.Text>
          <Typography.Text size="body2" color="secondary">
            Nível
          </Typography.Text>
        </S.StatisticInformation>
      </S.StatisticCard>
    </S.Container>
  );
}
