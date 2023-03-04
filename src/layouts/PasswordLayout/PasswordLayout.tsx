import { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { Logo, Typography } from "@/ui";

import * as S from "./PasswordLayout.styles";

type Props = {
  children: ReactNode;
};

export function PasswordLayout({ children }: Props) {
  return (
    <S.Container>
      <Logo variant="rainbow" />
      <S.Content>
        {children}{" "}
        <S.BackLink href="/auth/login">
          <FiArrowLeft size={20} />
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
