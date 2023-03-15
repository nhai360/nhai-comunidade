import { Avatar, Typography } from "@/ui";

import * as S from "./LikedBy.styles";

export function LikedBy() {
  return (
    <S.Container>
      <S.AvatarGroup>
        <Avatar.Square
          size="small"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
          fallback="CT"
        />
        <Avatar.Square
          size="small"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
          fallback="CT"
        />
        <Avatar.Square
          size="small"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
          fallback="CT"
        />
      </S.AvatarGroup>
      <Typography.Text size="body3" color="secondary">
        Curtido por Mateus e mais 56 pessoas
      </Typography.Text>
    </S.Container>
  );
}
