import { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import * as S from "./AppLayout.styles";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <S.Wrapper>
      <Header />
      <Sidebar />
      {children}
    </S.Wrapper>
  );
}

AppLayout.Content = S.Content;
AppLayout.Sider = S.Sider;
AppLayout.SimpleGrid = S.SimpleGrid;
AppLayout.GridWithSider = S.GridWithSider;
