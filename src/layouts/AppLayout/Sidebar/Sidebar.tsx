import Link from "next/link";
import { useRouter } from "next/router";

import { Popover, Tooltip, Typography } from "@/ui";
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
            <Tooltip message="Em breve" position="right">
              <S.NavItem disabled>
                <CameraIcon />
              </S.NavItem>
            </Tooltip>
          </Link>
          <Link href="/">
            <Tooltip message="Em breve" position="right">
              <S.NavItem disabled>
                <ListLineParagraphSquareIcon />
              </S.NavItem>
            </Tooltip>
          </Link>
        </S.NavigationList>
      </nav>

      <Popover.Root>
        <Tooltip message="Configurações" position="right">
          <Popover.Trigger asChild>
            <S.NavItem>
              <SettingsIcon />
            </S.NavItem>
          </Popover.Trigger>
        </Tooltip>

        <Popover
          side="top"
          sideOffset={16}
          align="start"
          css={{ width: "148px" }}
        >
          <Popover.Action onClick={handleLogout}>
            <Typography.Text>Sair</Typography.Text>
          </Popover.Action>
        </Popover>
      </Popover.Root>
    </S.Container>
  );
}
