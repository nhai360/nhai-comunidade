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
import { useUser } from "@/client/users";
import { Broadcast } from "@phosphor-icons/react";

export function Sidebar() {
  const router = useRouter();

  const { session, logout } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  function handleLogout() {
    logout();

    authenticatedAPI.defaults.headers.Authorization = null;

    router.push("/auth/login");
  }

  return (
    <S.Container>
      <nav>
        <S.NavigationList>
          <NavigationItem tooltip="Feed">
            <HomeIcon />
          </NavigationItem>
          <NavigationItem href="/videos" tooltip="Vídeos">
            <CameraIcon />
          </NavigationItem>
          <NavigationItem href="/articles" tooltip="Materiais Didáticos">
            <ListLineParagraphSquareIcon />
          </NavigationItem>
          {isAdmin && (
            <NavigationItem href="/lives" tooltip="Transmissões">
              <Broadcast size={22} color="currentColor" />
            </NavigationItem>
          )}
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
