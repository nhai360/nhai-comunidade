import { Button, Card, Typography } from "@/ui";
import { ExclamationCircleIcon, PlayIcon } from "@/ui/_icons";

import * as S from "./FeaturedVideoCard.styles";
import { useVideos } from "@/client/videos";
import { useRouter } from "next/router";

export function FeaturedVideoCard() {
  const router = useRouter();
  const { videos } = useVideos();

  const featuredVideo = videos[0];

  const handleWatch = () => {
    featuredVideo && router.push(`/videos/${featuredVideo.id}`);
  };

  const handleMoreInformation = () => {
    const novaAba: any = window.open(
      "https://www.nhai.com.br/semana-digital",
      "_blank"
    );
    novaAba.focus();
  };

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
          +Digital: A diversidade como potência
        </Typography.Title>
        <Typography.Text>
          Nesta primeira semana do mês do Orgulho, acontecerá na nossa
          Plataforma Contaí Comunidade o evento Reconstruindo Sistemas - A
          Diversidade como Potência.
        </Typography.Text>
        <S.Actions>
          <Button onClick={handleWatch}>
            <PlayIcon />
            Assistir
          </Button>
          <Button variant="transparent" onClick={handleMoreInformation}>
            <ExclamationCircleIcon />
            Mais informações
          </Button>
        </S.Actions>
      </S.Content>

      <S.Thumbnail
        src={featuredVideo?.thumbnail?.url || "/featured-video-thumbnail.png"}
      />
    </Card>
  );
}
