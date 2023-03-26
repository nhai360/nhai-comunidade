import Link from "next/link";
import { useRouter } from "next/router";

import { Tooltip } from "@/ui";
import {
  CameraIcon,
  HomeIcon,
  ListLineParagraphSquareIcon,
  SettingsIcon,
} from "@/ui/_icons";

import { authenticatedAPI } from "@/client";
import { useAuthContext } from "@/contexts";

import * as S from "./Sidebar.styles";

export function Sidebar() {
  const router = useRouter();

  const { logout } = useAuthContext();

  function handleLogout() {
    logout();

    authenticatedAPI.defaults.headers.Authorization = null;

    router.push("/auth/login");
  }

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

      <div>
        <Tooltip message="Configurações" position="right">
          <S.NavItem>
            <SettingsIcon />
          </S.NavItem>
        </Tooltip>
        <Tooltip message="Sair" position="right">
          <S.NavItem onClick={handleLogout}>
            <SettingsIcon />
          </S.NavItem>
        </Tooltip>
      </div>
    </S.Container>
  );
}
