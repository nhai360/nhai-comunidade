import { useRouter } from "next/router";

import { NavigationItem, Popover, Tooltip, Typography } from "@/ui";
import {
  CameraIcon,
  HomeIcon,
  ListLineParagraphSquareIcon,
  SettingsIcon,
} from "@/ui/_icons";
import { NavItem } from "@/ui/NavigationItem/NavigationItem.styles";

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
          <NavigationItem active tooltip="Feed">
            <HomeIcon />
          </NavigationItem>
          <NavigationItem tooltip="Em breve" disabled>
            <CameraIcon />
          </NavigationItem>
          <NavigationItem tooltip="Em breve" disabled>
            <ListLineParagraphSquareIcon />
          </NavigationItem>
        </S.NavigationList>
      </nav>

      <Popover.Root>
        <Tooltip message="Configurações" position="right">
          <Popover.Trigger asChild>
            <NavItem>
              <SettingsIcon />
            </NavItem>
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
