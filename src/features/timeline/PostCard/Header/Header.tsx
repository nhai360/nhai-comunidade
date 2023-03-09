import { Avatar, Button, Tag, Typography } from "@/ui";
import { HorizontalDotsIcon, LinkIcon } from "@/ui/_icons";

import { theme } from "@/../stitches.config";

import * as S from "./Header.styles";

export function Header() {
  return (
    <S.Container>
      <S.User>
        <Avatar.Square
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
          fallback="CT"
        />

        <S.Info>
          <S.FullName>
            Colm Tuite
            <Tag variant="blue">ADMIN</Tag>
            <Typography.Text color="secondary" size="caption">
              10 dias atrás
            </Typography.Text>
          </S.FullName>
          <Typography.Text color="secondary" size="caption">
            Nhaí
          </Typography.Text>
        </S.Info>
      </S.User>
      <S.Actions>
        <Button icon variant="transparent">
          <HorizontalDotsIcon color={theme.colors.textSecondary.value} />
        </Button>
        <Button icon variant="transparent">
          <LinkIcon color={theme.colors.textSecondary.value} />
        </Button>
      </S.Actions>
    </S.Container>
  );
}
