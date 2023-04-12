import { ReactNode } from "react";

import * as S from "./AuthLayout.styles";
import { Logo, Typography } from "@/ui";

type Props = {
  children: ReactNode;
  title: string;
};

export function AuthLayout({ children, title }: Props) {
  return (
    <S.Container>
      <S.Content>{children}</S.Content>
      <S.TitleContainer>
        <Logo />
        <Typography.Title as="h1" size="h1" weight="black" color="neutral">
          {title}
        </Typography.Title>
        <Typography.Text size="caption" color="neutral" weight="bold">
          © 2023. Powered by Nhaí
        </Typography.Text>
      </S.TitleContainer>
    </S.Container>
  );
}
