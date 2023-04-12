import { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import * as S from "./DefaultLayout.styles";

type Props = {
  children: ReactNode;
};

export function DefaultLayout({ children }: Props) {
  return (
    <S.Wrapper>
      <Header />
      <Sidebar />
      {children}
    </S.Wrapper>
  );
}

DefaultLayout.Content = S.Content;
DefaultLayout.Sider = S.Sider;
DefaultLayout.SimpleGrid = S.SimpleGrid;
DefaultLayout.GridWithSider = S.GridWithSider;
