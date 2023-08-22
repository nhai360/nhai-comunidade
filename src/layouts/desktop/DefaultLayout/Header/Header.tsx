import Link from "next/link";
import { useState } from "react";

import { Avatar, Button, Logo, Popover, Tooltip, Typography } from "@/ui";
import { InputSearch } from "@/ui/Input/Search";
import { AddCircleIcon } from "@/ui/_icons";

import { User } from "@/client/users";
import { useSearch } from "@/lib/search";
import {
  getFirstNameAndLastName,
  getInitials,
  getProfileUrl,
} from "@/lib/string";

import { useAuthContext } from "@/contexts";
import { CreateBroadcastDialog } from "@/features/broadcast/CreateBroadcastCard";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";
import { UploadVideoDialog } from "@/features/videos";

import { authenticatedAPI } from "@/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as S from "./Header.styles";

const CreateArticleDialog = dynamic(
  () => import("../../../../features/articles/CreateArticleDialog"),
  { ssr: false }
);

interface IHeader {
  canCreate?: boolean;
  loginAmstel?: boolean;
  user: User;
}

export function Header({ canCreate = true, user, loginAmstel }: IHeader) {
  const router = useRouter();
  const { searchTerm, handleChange, handleSearch } = useSearch();

  const { logout } = useAuthContext();

  const isAdmin = user?.role?.name === "ADMIN";
  const isEnabled = isAdmin;
  const isAmstel =
    user && user?.nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO;

  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  const [isUploadVideoDialogVisible, setIsUploadVideoDialogVisible] =
    useState(false);

  const [isCreateBroadcastDialogVisible, setIsCreateBroadcastDialogVisible] =
    useState(false);

  const [isCreateArticleVisible, setIsCreateArticleVisible] = useState(false);

  function handleLogout() {
    logout();
    authenticatedAPI.defaults.headers.Authorization = null;

    loginAmstel
      ? router.push("/auth/login/?layout=negocios-de-orgulho")
      : router.push("/auth/login");
  }

  return (
    <>
      {isCreatePostDialogVisible && (
        <CreatePostDialog onClose={() => setIsCreatePostDialogVisible(false)} />
      )}

      {isUploadVideoDialogVisible && (
        <UploadVideoDialog
          onClose={() => setIsUploadVideoDialogVisible(false)}
        />
      )}

      {isCreateBroadcastDialogVisible && (
        <CreateBroadcastDialog
          onClose={() => setIsCreateBroadcastDialogVisible(false)}
        />
      )}

      {isCreateArticleVisible && (
        <CreateArticleDialog
          type="create"
          onClose={() => setIsCreateArticleVisible(false)}
        />
      )}

      <S.Container
        style={
          loginAmstel
            ? { backgroundColor: "#ee0014" }
            : { backgroundColor: "$neutral100" }
        }
      >
        <S.Content>
          {loginAmstel ? (
            <Link href="/">
              <img src="/logo-white.svg" width={120} />
            </Link>
          ) : (
            <Link href="/">
              <Logo variant="rainbow" />
            </Link>
          )}

          <S.Actions>
            <InputSearch
              value={searchTerm}
              onChange={handleChange}
              onSearch={handleSearch}
            />
            {canCreate && !isAmstel && (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <div>
                    <Tooltip message="Criar" position="bottom">
                      <Button icon variant="transparent">
                        <AddCircleIcon
                          color={loginAmstel ? "#efefef" : "#333"}
                        />
                      </Button>
                    </Tooltip>
                  </div>
                </Popover.Trigger>

                <Popover side="bottom" sideOffset={8} align="center">
                  <Popover.Action
                    onClick={() => setIsCreatePostDialogVisible(true)}
                  >
                    <Typography.Text>Publicação</Typography.Text>
                  </Popover.Action>
                  {isEnabled && (
                    <Popover.Action
                      onClick={() => setIsUploadVideoDialogVisible(true)}
                    >
                      <Typography.Text>Vídeo</Typography.Text>
                    </Popover.Action>
                  )}
                  {isEnabled && (
                    <Popover.Action
                      onClick={() => setIsCreateArticleVisible(true)}
                    >
                      <Typography.Text>Artigo</Typography.Text>
                    </Popover.Action>
                  )}
                </Popover>
              </Popover.Root>
            )}
            {/* <Tooltip message="Novo post" position="bottom">
              
            </Tooltip> */}
            {/* <Tooltip message="Notificações" position="bottom">
              <Button icon variant="transparent">
                <NotificationIcon />
              </Button>
            </Tooltip> */}
            {user ? (
              <Link href={getProfileUrl(user?.nickname)}>
                <S.UserContainer>
                  {user && (
                    <Avatar
                      progressBar
                      alt={user?.fullName}
                      src={user.profilePicture?.url}
                      fallback={getInitials(user.fullName)}
                    />
                  )}
                  <S.UserInfo>
                    <Typography.Text
                      color={loginAmstel ? "neutral" : "primary"}
                      weight="medium"
                    >
                      {getFirstNameAndLastName(user?.fullName)}
                    </Typography.Text>
                    {user?.nickname && (
                      <Typography.Text
                        size="body3"
                        color={
                          !isAdmin
                            ? "secondary"
                            : loginAmstel
                            ? "neutral"
                            : "pink"
                        }
                      >
                        @{user?.nickname}
                      </Typography.Text>
                    )}
                  </S.UserInfo>
                </S.UserContainer>
              </Link>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant={"text"}
                  style={{
                    height: 48,
                    color: "#fefefe",
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
            )}
          </S.Actions>
        </S.Content>
      </S.Container>
    </>
  );
}
