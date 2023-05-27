import { Button, Card, Typography } from "@/ui";
import { ExclamationCircleIcon, PlayIcon } from "@/ui/_icons";

import styles from "./styles.module.scss";
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
    <Card>
      <S.FlexContainer>
        <S.Content>
          <Typography.Title size="h2" weight="bold" color="title">
            Semana +Digital: A diversidade como potência
          </Typography.Title>
          <Typography.Text>
            Nesta primeira semana do mês do Orgulho, acontecerá na nossa
            Plataforma Contaí Comunidade o evento Reconstruindo Sistemas - A
            Diversidade como Potência.
          </Typography.Text>
          <S.Actions>
            <Button onClick={handleWatch} className={styles.customButton}>
              <PlayIcon />
              Assistir
            </Button>
            <Button
              className={styles.customButton}
              variant="transparent"
              onClick={handleMoreInformation}
            >
              <ExclamationCircleIcon />
              Mais informações
            </Button>
          </S.Actions>
        </S.Content>

        <S.Thumbnail
          src={featuredVideo?.thumbnail?.url || "/featured-video-thumbnail.png"}
        />
      </S.FlexContainer>
    </Card>
  );
}
