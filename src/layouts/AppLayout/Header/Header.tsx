import { Avatar, Button, Logo, Tag, Typography } from "@/ui";
import { InputSearch } from "@/ui/Input/Search";
import { AddCircleIcon, NotificationIcon } from "@/ui/_icons";

import * as S from "./Header.styles";
import Link from "next/link";

export function Header() {
  return (
    <S.Container>
      <S.Content>
        <Link href="/">
          <Logo variant="rainbow" />
        </Link>
        <S.Actions>
          <InputSearch />
          <Button icon variant="transparent">
            <AddCircleIcon />
          </Button>
          <Button icon variant="transparent">
            <NotificationIcon />
          </Button>
          <S.UserContainer>
            <Avatar
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="Colm Tuite"
              fallback="CT"
            />
            <S.UserInfo>
              <Typography.Text color="primary" weight="medium">
                Colm Tuite
              </Typography.Text>
              <Tag variant="pink">Nível 56</Tag>
            </S.UserInfo>
          </S.UserContainer>
        </S.Actions>
      </S.Content>
    </S.Container>
  );
}
