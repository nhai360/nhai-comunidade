import Link from "next/link";
import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { Avatar, Button, Logo, Popover, Typography } from "@/ui";
import { ChevronLeftIcon, SettingsIcon } from "@/ui/_icons";

import { useUser } from "@/client/users";
import { authenticatedAPI } from "@/client";
import { getInitials } from "@/lib/string";

import * as S from "./Header.styles";

type Props = {
  backUrl?: string;
};

export function Header({ backUrl }: Props) {
  const router = useRouter();
  const { session, logout } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  function handleLogout() {
    logout();

    authenticatedAPI.defaults.headers.Authorization = null;

    router.push("/auth/login");
  }

  return (
    <S.Container>
      {backUrl ? (
        <Link href={backUrl}>
          <Button icon variant="transparent">
            <ChevronLeftIcon />
          </Button>
        </Link>
      ) : (
        <Avatar
          size="small"
          progressBar
          alt={user?.fullName}
          src={user?.profilePicture?.url}
          fallback={getInitials(user?.fullName)}
        />
      )}

      <Link href="/">
        <Logo variant="rainbow" />
      </Link>

      <Popover.Root>
        <Popover.Trigger asChild>
          <div>
            <Button icon variant="transparent">
              <SettingsIcon />
            </Button>
          </div>
        </Popover.Trigger>

        <Popover side="bottom" sideOffset={8} align="center">
          <Popover.Action onClick={handleLogout}>
            <Typography.Text>Sair</Typography.Text>
          </Popover.Action>
        </Popover>
      </Popover.Root>
    </S.Container>
  );
}
