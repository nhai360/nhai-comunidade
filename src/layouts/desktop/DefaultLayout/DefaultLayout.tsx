import { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import * as S from "./DefaultLayout.styles";

type Props = {
  children: ReactNode;
  hasSider?: boolean;
};

export function DefaultLayout({ children, hasSider = true }: Props) {
  return (
    <S.Wrapper>
      <Header />
      {hasSider && <Sidebar />}
      {children}
    </S.Wrapper>
  );
}

DefaultLayout.Content = S.Content;
DefaultLayout.Sider = S.Sider;
DefaultLayout.SimpleGrid = S.SimpleGrid;
DefaultLayout.GridWithSider = S.GridWithSider;
