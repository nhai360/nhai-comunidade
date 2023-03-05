import Link from "next/link";

import {
  CameraIcon,
  HomeIcon,
  ListLineParagraphSquareIcon,
  SettingsIcon,
} from "@/ui/_icons";

import * as S from "./Sidebar.styles";

export function Sidebar() {
  return (
    <S.Container>
      <nav>
        <S.NavigationList>
          <Link href="/">
            <S.NavItem active>
              <HomeIcon />
            </S.NavItem>
          </Link>
          <Link href="/">
            <S.NavItem>
              <CameraIcon />
            </S.NavItem>
          </Link>
          <Link href="/">
            <S.NavItem>
              <ListLineParagraphSquareIcon />
            </S.NavItem>
          </Link>
        </S.NavigationList>
      </nav>

      <S.NavItem>
        <SettingsIcon />
      </S.NavItem>
    </S.Container>
  );
}
