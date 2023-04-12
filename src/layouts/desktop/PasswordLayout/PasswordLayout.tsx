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

PasswordLayout.Title = function Title({ children }: Props) {
  return (
    <Typography.Title
      size="h1"
      weight="black"
      color="title"
      css={{
        "@mobile": {
          textAlign: "center",
          lineHeight: "120%",
          fontSize: "$h3",
        },
      }}
    >
      {children}
    </Typography.Title>
  );
};

PasswordLayout.Description = function Description({ children }: Props) {
  return (
    <Typography.Text
      size="body2"
      color="secondary"
      align="center"
      css={{
        "@mobile": {
          textAlign: "center",
        },
      }}
    >
      {children}
    </Typography.Text>
  );
};
