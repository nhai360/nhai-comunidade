import { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import * as S from "./AppLayout.styles";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Sidebar />
      <S.Content>{children}</S.Content>
    </>
  );
}
