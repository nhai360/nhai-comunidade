import { ReactNode } from "react";

import * as S from "./AuthLayout.styles";
import { Logo, Typography } from "@/ui";
import Image from "next/image";

type Props = {
  children: ReactNode;
  title: string;
  layoutAmstel?: boolean;
};

export function AuthLayout({ children, title, layoutAmstel }: Props) {
  return layoutAmstel ? (
    <S.Container style={{ background: "white" }}>
      <S.Content>{children}</S.Content>
      <S.TitleContainer
        css={{
          backgroundImage: "url(/amstel-auth-banner.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Logo />
        <Image
          width={400}
          height={90}
          src={"/amstel-auth-logo.png"}
          alt={"amstel-auth-logo"}
          style={{objectFit: 'contain'}}
        />
        <Typography.Text size="caption" color="neutral" weight="bold">
          © 2023. Powered by Nhaí
        </Typography.Text>
      </S.TitleContainer>
    </S.Container>
  ) : (
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
