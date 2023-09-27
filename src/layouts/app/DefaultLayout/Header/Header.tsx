import Link from "next/link";
import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { Avatar, Button, Logo, Popover, Typography } from "@/ui";
import { ChevronLeftIcon, SettingsIcon } from "@/ui/_icons";

import { useUser } from "@/client/users";
import { authenticatedAPI } from "@/client";
import { getInitials, getProfileUrl } from "@/lib/string";

import * as S from "./Header.styles";

type Props = {
  backUrl?: string;
  loginAmstel?: boolean;
};

export function Header({ backUrl, loginAmstel }: Props) {
  const router = useRouter();
  const { session, logout } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  function handleLogout() {
    logout();
    authenticatedAPI.defaults.headers.Authorization = null;
    loginAmstel
      ? router.push("/auth/login/?layout=negocios-de-orgulho")
      : router.push("/auth/login");
  }

  return (
    <S.Container
      style={{
        backgroundColor: loginAmstel ? "#ee0014" : "#ffffff",
        borderColor: loginAmstel ? "#e63432" : "#efefef"
      }}
    >
      {user
        ? <>
            {backUrl ? (
              <Link href={backUrl}>
                <Button icon variant="transparent">
                  <ChevronLeftIcon />
                </Button>
              </Link>
            ) : (
              <Link href={getProfileUrl(user?.nickname)} className="avatarLink">
                <Avatar
                  size="small"
                  progressBar
                  alt={user?.fullName}
                  src={user?.profilePicture?.url}
                  fallback={getInitials(user?.fullName)}
                />
              </Link>
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
          </>
        : <>
            <Link href="/">
              <Logo variant={loginAmstel ? "white" : "rainbow"} />
            </Link>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant={"text"}
                style={{
                  height: 48,
                  color: loginAmstel ? "#ffffff" : "#454545",
                }}
                onClick={handleLogout}
              >
                Login
              </Button>
              <Button
                variant={"primary"}
                style={{
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: "#01a1ff",
                }}
                onClick={() =>
                  loginAmstel
                    ? router.push(
                        "/auth/register/?layout=negocios-de-orgulho"
                      )
                    : router.push("auth/register")
                }
              >
                Registrar-se
              </Button>
            </div>
          </>
      }
    </S.Container>
  );
}
