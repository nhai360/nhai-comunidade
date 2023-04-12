import { ReactNode } from "react";

import * as S from "./DefaultLayout.styles";

import { Header } from "./Header";
import { BottomBar } from "./BottomBar";
import { CreatePostButton } from "./CreatePostButton";

type Props = {
  children: ReactNode;
};

export function DefaultLayout({ children }: Props) {
  return (
    <S.Wrapper>
      <Header />
      <S.Content>{children}</S.Content>
      <CreatePostButton />
      <BottomBar />
    </S.Wrapper>
  );
}
