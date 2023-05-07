import { Card, Typography } from "@/ui";

import * as S from "./KeepWatchingCard.styles";

export function KeepWatchingCard() {
  return (
    <Card>
      <Typography.Text size="body1" weight="bold" color="title">
        Continuar assistindo
      </Typography.Text>
      <S.Container>
        {[1, 2, 3, 4, 5, 6].map((video) => (
          <img key={video} src="/video-thumb.png" />
        ))}
      </S.Container>
    </Card>
  );
}
