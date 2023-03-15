import { ReactNode } from "react";

import { Logo, Typography } from "@/ui";

import * as S from "./PasswordLayout.styles";
import { ArrowLeftIcon } from "@/ui/_icons";

type Props = {
  children: ReactNode;
};

export function PasswordLayout({ children }: Props) {
  return (
    <S.Container>
      <Logo variant="rainbow" />
      <S.Content>
        {children}
        <S.BackLink href="/auth/login">
          <ArrowLeftIcon />
          Voltar para o login
        </S.BackLink>
      </S.Content>
      <S.Footer>
        <Typography.Text size="caption" weight="bold">
          © 2023. Powered by Nhaí
        </Typography.Text>
      </S.Footer>
    </S.Container>
  );
}
