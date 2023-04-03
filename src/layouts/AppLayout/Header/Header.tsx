import { useState } from "react";
import Link from "next/link";

import { Avatar, Button, Logo, Tooltip, Typography } from "@/ui";
import { InputSearch } from "@/ui/Input/Search";
import { AddCircleIcon } from "@/ui/_icons";

import { getFullName, getInitials } from "@/lib/string";
import { useUser } from "@/client/users";

import { useAuthContext, useFeedContext } from "@/contexts";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";

import * as S from "./Header.styles";

export function Header() {
  const { searchTerm, setSearchTerm, handleSearch } = useFeedContext();

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  return (
    <>
      {isCreatePostDialogVisible && (
        <CreatePostDialog onClose={() => setIsCreatePostDialogVisible(false)} />
      )}

      <S.Container>
        <S.Content>
          <Link href="/">
            <Logo variant="rainbow" />
          </Link>
          <S.Actions>
            <InputSearch
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              onSearch={handleSearch}
            />
            <Tooltip message="Novo post" position="bottom">
              <Button
                icon
                variant="transparent"
                onClick={() => setIsCreatePostDialogVisible(true)}
              >
                <AddCircleIcon />
              </Button>
            </Tooltip>
            {/* <Tooltip message="Notificações" position="bottom">
              <Button icon variant="transparent">
                <NotificationIcon />
              </Button>
            </Tooltip> */}
            {/* <Link href="/profile"> */}
            <S.UserContainer>
              {user && (
                <Avatar
                  progressBar
                  alt={user?.fullName}
                  fallback={getInitials(user.fullName)}
                />
              )}
              <S.UserInfo>
                <Typography.Text color="primary" weight="medium">
                  {getFullName(user?.fullName)}
                </Typography.Text>
                {user?.nickname && (
                  <Typography.Text size="body3" color="secondary">
                    {user?.nickname}
                  </Typography.Text>
                )}
                {/* <Tag variant="pink">Nível 56</Tag> */}
              </S.UserInfo>
            </S.UserContainer>
            {/* </Link> */}
          </S.Actions>
        </S.Content>
      </S.Container>
    </>
  );
}
