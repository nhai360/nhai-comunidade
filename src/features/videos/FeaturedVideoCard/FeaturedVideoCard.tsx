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
            <div className={styles.LogoAmstel}>
              <img src="logonhaiamstel2.png" alt="" />
              <img src="negociosdeorgulhologo.png" alt="" />
            </div>

            {isMobile ? (
              <Typography.Title size="h3" weight="bold" color="title">
                Negócios de Orgulho.
              </Typography.Title>
            ) : (
              <Typography.Title size="h2" weight="bold" color="title">
                Negócios de Orgulho.
              </Typography.Title>
            )}
            <Typography.Text>
              Um programa para impulsionar negócios liderados por pessoas
              LGBTQIAPN+. Clique abaixo para ver os conteúdos disponíveis nos programa.
            </Typography.Text>
          </div>
          <S.Actions>
            <Button
              onClick={handleWatch}
              css={{
                borderRadius: 4,
                backgroundColor: "red",
                fontFamily: "RingBold",
                textTransform: "uppercase",
                "&:not(:disabled):hover": {
                  background: "#f12f32 !important",
                },
              }}
              className={styles.customButton}
            >
              <ExclamationCircleIcon />
              Saiba Mais
            </Button>
            {/* <Button
              className={styles.customButton}
              variant="transparent"
              onClick={handleMoreInformation}
            >
              <ExclamationCircleIcon />
              Saiba mais
            </Button> */}
          </S.Actions>
        </S.Content>
        {!isMobile && (
          <div style={{ flex: 0.4 }}>
            <S.Thumbnail
              css={{ objectFit: "cover", imageOrientation: "revert" }}
              src={"/amstel-banner.png"}
            />
          </div>
        )}
      </S.FlexContainer>
    </Card>
  );
}
