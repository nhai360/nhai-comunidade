import { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import * as S from "./DefaultLayout.styles";
import styles from "./defaultLayout.module.scss";
import { Button } from "@/ui";
import { PencilSimpleLine } from "@phosphor-icons/react";

type Props = {
  children: ReactNode;
  hasSider?: boolean;
};

export function DefaultLayout({ children, hasSider = true }: Props) {
  return (
    <S.Wrapper>
      <div className={styles.containerHightlight}>
        <h4>
          • 6 Edição do Contaí! Encontro que geram negócios!{" "}
          <span>| 70% das vagas preenchidas, esperamos por vocês!</span>{" "}
        </h4>
        <Button variant={"primary"} style={{ height: 48, borderRadius: 8 }}>
          Cadastrar <PencilSimpleLine size={24} />
        </Button>
      </div>
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
