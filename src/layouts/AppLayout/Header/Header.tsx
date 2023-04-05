import { useRef, useState } from "react";
import Link from "next/link";

import { Avatar, Button, Logo, Tooltip, Typography } from "@/ui";
import { InputSearch } from "@/ui/Input/Search";
import { AddCircleIcon } from "@/ui/_icons";

import { getFirstNameAndLastName, getInitials } from "@/lib/string";
import { useUser } from "@/client/users";

import { useAuthContext, useFeedContext } from "@/contexts";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";

import * as S from "./Header.styles";

export function Header() {
  const timerId = useRef(0);
  const { searchTerm, setSearchTerm, handleSearch } = useFeedContext();

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  function handleSearchAfterTyping() {
    if (timerId.current !== 0) {
      clearTimeout(timerId.current);
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 800);

    timerId.current = Number(timer);
  }

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
              onChange={(event) => {
                setSearchTerm(event.currentTarget.value);
                handleSearchAfterTyping();
              }}
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
                  {getFirstNameAndLastName(user?.fullName)}
                </Typography.Text>
                {user?.nickname && (
                  <Typography.Text size="body3" color="secondary">
                    @{user?.nickname}
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
