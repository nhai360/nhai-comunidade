import { Avatar, Button, Divider, Typography } from "@/ui";
import {
  ArticlesIcon,
  ClockIcon,
  EditIcon,
  FireIcon,
  JoystickIcon,
  RewardIcon,
  StarIcon,
  WatchedVideosIcon,
} from "@/ui/_icons";

import * as S from "./UserProfileInformation.styles";

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
      <S.GeneralInformation>
        <S.InformationField>
          <Typography.Text size="h3">Calm Tuite</Typography.Text>
          <Button icon variant="transparent" size="small">
            <EditIcon size={24} />
          </Button>
        </S.InformationField>
        <S.InformationField>
          <img src="/flags/brasil.svg" />
          <Typography.Text color="secondary" size="body3">
            Brasil, São Paulo
          </Typography.Text>
        </S.InformationField>
        <S.InformationField css={{ marginBlock: "$4" }}>
          <Typography.Text size="body3">@calmtuite</Typography.Text>
          <Typography.Text size="body3">•</Typography.Text>
          <ClockIcon />
          <Typography.Text size="body3">
            Por aqui desde fevereiro de 2016
          </Typography.Text>
          <Typography.Text size="body3">•</Typography.Text>
          <WatchedVideosIcon />
          <Typography.Text size="body3">
            36 mil minutos de vídeo assistido
          </Typography.Text>
          <Typography.Text size="body3">•</Typography.Text>
          <ArticlesIcon />
          <Typography.Text size="body3">27 artigos lidos</Typography.Text>
        </S.InformationField>
        <S.Description size="caption" color="secondary">
          Olá! Meu nome é Jéssica Padilha e sou uma empreendedora LGBT+. Estou
          sempre em busca de novos desafios e oportunidades para crescer como
          profissional.
        </S.Description>
      </S.GeneralInformation>
      <Divider css={{ marginBlock: "$6", borderTopWidth: "2px" }} />
      <Typography.Title size="subHeadline" weight="bold">
        Estatísticas
      </Typography.Title>
      <S.Statistics>
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
          <RewardIcon />
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
      </S.Statistics>
    </S.Container>
  );
}
