import { Button, Card, Typography } from "@/ui";
import { ExclamationCircleIcon, PlayIcon } from "@/ui/_icons";

import styles from "./styles.module.scss";
import * as S from "./FeaturedVideoCard.styles";
import { useRouter } from "next/router";
import { useVideoContext } from "@/contexts/VideoContext";

interface IFeaturedVideoCard {
  isMobile?: boolean;
}

export function FeaturedVideoCard({ isMobile = false }: IFeaturedVideoCard) {
  const router = useRouter();
  const { videos } = useVideoContext();

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
      <S.FlexContainer style={{ maxHeight: isMobile ? 420 : 360 }}>
        <S.Content>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {isMobile ? (
              <Typography.Title size="h3" weight="bold" color="title">
                Semana +Digital: A diversidade como potência
              </Typography.Title>
            ) : (
              <Typography.Title size="h2" weight="bold" color="title">
                Semana +Digital: A diversidade como potência
              </Typography.Title>
            )}
            <Typography.Text>
              Nesta primeira semana do mês do Orgulho, acontecerá na nossa
              Plataforma Contaí Comunidade o evento Reconstruindo Sistemas - A
              Diversidade como Potência.
            </Typography.Text>
          </div>
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
              Saiba mais
            </Button>
          </S.Actions>
        </S.Content>
        {!isMobile && (
          <div style={{ flex: 0.4 }}>
            <S.Thumbnail src={"/featured-video-thumbnail.png"} />
          </div>
        )}
      </S.FlexContainer>
    </Card>
  );
}
