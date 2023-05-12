import { Button, Card, Typography } from "@/ui";
import { ExclamationCircleIcon, PlayIcon } from "@/ui/_icons";

import * as S from "./FeaturedVideoCard.styles";

export function FeaturedVideoCard() {
  return (
    <Card
      css={{
        display: "flex",
        justifyContent: "space-between",
        gap: "$6",
      }}
    >
      <S.Content>
        <Typography.Title size="h2" weight="bold" color="title">
          Venha experimentar a força de uma comunidade unida!
        </Typography.Title>
        <Typography.Text>
          Experimente o poder da colaboração entre indivíduos de diferentes
          histórias e ideias inovadoras enquanto faz parte de nossa comunidade.
        </Typography.Text>
        <S.Actions>
          <Button>
            <PlayIcon />
            Assistir
          </Button>
          <Button variant="transparent">
            <ExclamationCircleIcon />
            Mais informações
          </Button>
        </S.Actions>
      </S.Content>

      <S.Thumbnail src="/featured-video-thumbnail.png" />
    </Card>
  );
}
