import { FiBell, FiPlusCircle } from "react-icons/fi";

import { Avatar, Button, Logo, Tag, Typography } from "@/ui";
import { theme } from "@/../stitches.config";

import * as S from "./Header.styles";
import { InputSearch } from "@/ui/Input/Search";

export function Header() {
  return (
    <S.Container>
      <S.Content>
        <Logo variant="rainbow" />
        <S.Actions>
          <InputSearch />
          <Button title="Criar post" variant="transparent" size="small">
            <FiPlusCircle size={24} color={theme.colors.textPrimary.value} />
          </Button>
          <Button title="Notifications" variant="transparent" size="small">
            <FiBell size={24} color={theme.colors.textPrimary.value} />
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
