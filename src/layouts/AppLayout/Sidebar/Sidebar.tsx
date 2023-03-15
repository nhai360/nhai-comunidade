import Link from "next/link";

import {
  CameraIcon,
  HomeIcon,
  ListLineParagraphSquareIcon,
  SettingsIcon,
} from "@/ui/_icons";

import * as S from "./Sidebar.styles";
import { Tooltip } from "@/ui";

export function Sidebar() {
  return (
    <S.Container>
      <nav>
        <S.NavigationList>
          <Link href="/">
            <Tooltip message="Feed" position="right">
              <S.NavItem active>
                <HomeIcon />
              </S.NavItem>
            </Tooltip>
          </Link>
          <Link href="/">
            <Tooltip message="Vídeos" position="right">
              <S.NavItem>
                <CameraIcon />
              </S.NavItem>
            </Tooltip>
          </Link>
          <Link href="/">
            <Tooltip message="Artigos" position="right">
              <S.NavItem>
                <ListLineParagraphSquareIcon />
              </S.NavItem>
            </Tooltip>
          </Link>
        </S.NavigationList>
      </nav>

      <Tooltip message="Configurações" position="right">
        <S.NavItem>
          <SettingsIcon />
        </S.NavItem>
      </Tooltip>
    </S.Container>
  );
}
